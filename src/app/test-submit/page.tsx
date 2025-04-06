"use client";

import React, { useState } from "react";
import { submitQuestionnaireResponses } from "@/lib/services/questionnaire";
import { Button } from "@/components/ui/button";

export default function TestSubmit() {
  const [status, setStatus] = useState<string>("Idle");
  const [result, setResult] = useState<any>(null);

  const handleTestSubmit = async () => {
    setStatus("Submitting...");

    try {
      // Create a simple test payload
      const testPayload = {
        name: "Test User",
        email: "test@example.com",
        responses: [
          {
            question_id: "test-question-1",
            response_value: "Test response 1",
            response_text: "Test response 1",
          },
          {
            question_id: "age",
            response_value: "30",
            response_text: "Age",
          },
          {
            question_id: "gender",
            response_value: "male",
            response_text: "Gender",
          },
        ],
      };

      console.log("Test page: Submitting test payload", testPayload);
      const response = await submitQuestionnaireResponses(testPayload);
      console.log("Test page: Response received", response);

      setResult(response);
      setStatus(response.success ? "Success" : "Error");
    } catch (error) {
      console.error("Test page: Error during submission", error);
      setStatus("Error");
      setResult(error);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Test API Submission</h1>
      <div className="mb-4">
        <Button
          onClick={handleTestSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Test Submit
        </Button>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-medium mb-2">Status: {status}</h2>
        {result && (
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
