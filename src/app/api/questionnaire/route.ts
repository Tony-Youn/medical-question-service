import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { QuestionnaireData } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const formData: QuestionnaireData = await request.json();

    // Get IP address from headers (X-Forwarded-For)
    const ipAddress =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "";

    // Create Supabase client
    const supabase = await createClient();

    // First create a profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .insert({
        name: formData.basicInfo.name,
        age: formData.basicInfo.age,
        gender: formData.basicInfo.gender,
        nationality: formData.basicInfo.nationality,
        education_level: formData.basicInfo.educationLevel,
        household_composition: formData.basicInfo.householdComposition,
        economic_activity: formData.basicInfo.economicActivity === "yes",
        dental_insurance: formData.basicInfo.dentalInsurance === "yes",
        oral_health_interest: formData.basicInfo.oralHealthInterest,
      })
      .select("id")
      .single();

    if (profileError) {
      return NextResponse.json(
        { success: false, error: profileError.message },
        { status: 400 }
      );
    }

    // Then create a submission
    const { data: submission, error: submissionError } = await supabase
      .from("questionnaire_submissions")
      .insert({
        profile_id: profile.id,
        completed: true,
        submitted_at: new Date().toISOString(),
        ip_address: ipAddress,
        user_agent: request.headers.get("user-agent") || "",
      })
      .select("id")
      .single();

    if (submissionError) {
      return NextResponse.json(
        { success: false, error: submissionError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      profileId: profile.id,
      submissionId: submission.id,
    });
  } catch (error) {
    console.error("Error saving questionnaire:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
