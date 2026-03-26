"use server";

import { GAS_WEBHOOK_URL, SurveyData } from "@/constants/survey";

/**
 * Server Action to submit survey data to Google Apps Script
 * Bypasses CORS and provides proper error handling.
 */
export async function submitSurveyAction(formData: SurveyData) {
  try {
    // Prepare the data exactly as the GAS script expects
    const payload = {
      ...formData,
      previousLearningLimitations: 
        formData.previousLearningLimitations.join(", ") + 
        (formData.otherPreviousLimitation ? ` (기타: ${formData.otherPreviousLimitation})` : ""),
    };

    console.log("Submitting survey to GAS:", payload);

    const response = await fetch(GAS_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain", // GAS often expects text/plain for simpler doPost handling
      },
      body: JSON.stringify(payload),
      // Server-side fetch handles redirects (302) automatically
      redirect: "follow",
    });

    // Even if GAS returns a 302 or similar, fetch handles it.
    // We check if the response was ok.
    if (!response.ok) {
      const errorText = await response.text();
      console.error("GAS Submission Error:", errorText);
      return { 
        success: false, 
        error: `서버 응답 오류 (Status: ${response.status})` 
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Server Action Exception:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "알 수 없는 서버 오류가 발생했습니다." 
    };
  }
}
