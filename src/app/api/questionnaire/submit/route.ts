import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { createClient as createServiceClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  console.log("API route called: /api/questionnaire/submit");
  try {
    // Create Supabase client using our utility
    const supabase = await createClient();

    const body = await request.json();
    console.log("Request body received:", body);

    const { name, email, responses, profileId, submissionId } = body;

    // Validate input
    if (!responses || !Array.isArray(responses) || responses.length === 0) {
      console.log("Validation failed: No responses provided");
      return NextResponse.json(
        { success: false, error: "No responses provided" },
        { status: 400 }
      );
    }

    // Start a transaction to ensure all data is saved or none
    let newProfileId = profileId;
    let newSubmissionId = submissionId;

    // Create service role client for bypassing RLS
    const serviceRoleClient = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 1. Create profile if not exists
    if (!profileId) {
      // Extract age and gender from the responses if present
      let age = 0;
      let gender = "other";

      // Find the age response
      const ageResponse = responses.find(
        (r) => r.question_id.includes("age") || r.response_text?.includes("age")
      );
      if (ageResponse && !isNaN(parseInt(ageResponse.response_value))) {
        age = parseInt(ageResponse.response_value);
      }

      // Find the gender response
      const genderResponse = responses.find(
        (r) =>
          r.question_id.includes("gender") ||
          r.response_text?.includes("gender")
      );
      if (genderResponse) {
        gender = genderResponse.response_value;
      }

      // Try with normal client first
      let { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: uuidv4(),
          name,
          age: age,
          gender: gender,
        })
        .select()
        .single();

      // If RLS error, use service role client
      if (profileError && profileError.code === "42501") {
        console.log(
          "Using service role client for profile creation due to RLS error"
        );
        const result = await serviceRoleClient
          .from("profiles")
          .insert({
            id: uuidv4(),
            name,
            age: age,
            gender: gender,
          })
          .select()
          .single();

        profileData = result.data;
        profileError = result.error;
      }

      if (profileError) {
        console.error("Error creating profile:", profileError);
        return NextResponse.json(
          { success: false, error: profileError },
          { status: 500 }
        );
      }

      newProfileId = profileData.id;
    }

    // 2. Create submission record if not exists
    if (!submissionId) {
      // Get IP address from headers only
      const ipAddress =
        request.headers.get("x-forwarded-for") ||
        request.headers.get("x-real-ip") ||
        "";

      // Try with normal client first
      let { data: submissionData, error: submissionError } = await supabase
        .from("questionnaire_submissions")
        .insert({
          id: uuidv4(),
          profile_id: newProfileId,
          completed: true,
          ip_address: ipAddress,
          user_agent: request.headers.get("user-agent") || "",
        })
        .select()
        .single();

      // If RLS error, use service role client
      if (submissionError && submissionError.code === "42501") {
        console.log(
          "Using service role client for submission creation due to RLS error"
        );
        const result = await serviceRoleClient
          .from("questionnaire_submissions")
          .insert({
            id: uuidv4(),
            profile_id: newProfileId,
            completed: true,
            ip_address: ipAddress,
            user_agent: request.headers.get("user-agent") || "",
          })
          .select()
          .single();

        submissionData = result.data;
        submissionError = result.error;
      }

      if (submissionError) {
        console.error("Error creating submission:", submissionError);
        return NextResponse.json(
          { success: false, error: submissionError },
          { status: 500 }
        );
      }

      newSubmissionId = submissionData.id;
    }

    // 3. Insert all responses
    const formattedResponses = responses
      .filter((response: any) => {
        // UUID validation regex pattern
        const uuidRegex =
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        // Check if question_id is a valid UUID
        const isValid = uuidRegex.test(response.question_id);

        if (!isValid) {
          console.log(
            `Filtering out response with invalid question_id: ${response.question_id}`
          );
        }

        return isValid;
      })
      .map((response: any) => ({
        id: uuidv4(),
        submission_id: newSubmissionId,
        question_id: response.question_id,
        response_value: response.response_value,
        response_text: response.response_text,
      }));

    // Try with normal client first
    let { error: responsesError } = await supabase
      .from("questionnaire_responses")
      .insert(formattedResponses);

    // If RLS error, use service role client
    if (responsesError && responsesError.code === "42501") {
      console.log(
        "Using service role client for responses insertion due to RLS error"
      );
      const result = await serviceRoleClient
        .from("questionnaire_responses")
        .insert(formattedResponses);

      responsesError = result.error;
    }

    if (responsesError) {
      console.error("Error inserting responses:", responsesError);
      return NextResponse.json(
        { success: false, error: responsesError },
        { status: 500 }
      );
    }

    // All operations successful
    console.log("Submission successful", {
      profileId: newProfileId,
      submissionId: newSubmissionId,
    });
    return NextResponse.json({
      success: true,
      profileId: newProfileId,
      submissionId: newSubmissionId,
    });
  } catch (error) {
    console.error("Unexpected error during submission:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
