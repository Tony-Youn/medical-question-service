import { createClient as createBrowserClient } from "@/lib/supabase/client";
import { createClient } from "@/lib/supabase/server";
import {
  QuestionnaireQuestion,
  QuestionnaireResponse,
  QuestionnaireSection,
} from "@/lib/types";
import { PostgrestError } from "@supabase/supabase-js";

/**
 * Fetch all questionnaire sections from the database (client-side)
 */
export async function fetchSections(): Promise<QuestionnaireSection[]> {
  const supabase = createBrowserClient();

  try {
    const { data, error } = await supabase
      .from("questionnaire_sections")
      .select("*")
      .order("order_index");

    if (error) {
      console.error("Error fetching sections:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Unexpected error fetching sections:", err);
    return [];
  }
}

/**
 * Fetch questions for a specific section from the database (client-side)
 */
export async function fetchQuestionsBySection(
  sectionId: string
): Promise<QuestionnaireQuestion[]> {
  const supabase = createBrowserClient();

  try {
    const { data, error } = await supabase
      .from("questionnaire_questions")
      .select("*")
      .eq("section_id", sectionId)
      .order("order_index");

    if (error) {
      console.error("Error fetching questions:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Unexpected error fetching questions:", err);
    return [];
  }
}

/**
 * Fetch all questionnaire sections from the database (server-side)
 */
export async function fetchSectionsServer(): Promise<QuestionnaireSection[]> {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("questionnaire_sections")
      .select("*")
      .order("order_index");

    if (error) {
      console.error("Error fetching sections:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Unexpected error fetching sections:", err);
    return [];
  }
}

/**
 * Fetch questions for a specific section from the database (server-side)
 */
export async function fetchQuestionsBySectionServer(
  sectionId: string
): Promise<QuestionnaireQuestion[]> {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("questionnaire_questions")
      .select("*")
      .eq("section_id", sectionId)
      .order("order_index");

    if (error) {
      console.error("Error fetching questions:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Unexpected error fetching questions:", err);
    return [];
  }
}

interface SubmitQuestionnaireParams {
  profileId?: string;
  submissionId?: string;
  name: string;
  email?: string;
  responses: Array<{
    question_id: string;
    response_value: string;
    response_text: string | null;
  }>;
}

interface SubmitQuestionnaireResult {
  success: boolean;
  profileId?: string;
  submissionId?: string;
  error?: PostgrestError;
}

/**
 * Submit questionnaire responses via API route
 */
export async function submitQuestionnaireResponses(
  params: SubmitQuestionnaireParams
): Promise<SubmitQuestionnaireResult> {
  try {
    console.log("Service: Making API request to /api/questionnaire/submit");
    const response = await fetch("/api/questionnaire/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const result = await response.json();
    console.log(
      "Service: API response status:",
      response.status,
      "Response:",
      result
    );

    if (!response.ok) {
      console.error("Service: API returned error", result.error);
      return {
        success: false,
        error: result.error,
      };
    }

    return {
      success: true,
      profileId: result.profileId,
      submissionId: result.submissionId,
    };
  } catch (err) {
    console.error("Service: Error submitting questionnaire:", err);
    return {
      success: false,
      error: err as PostgrestError,
    };
  }
}
