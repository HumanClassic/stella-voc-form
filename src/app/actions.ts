"use server";

import { cookies } from "next/headers";
import { SurveyData } from "@/constants/survey";
import { checkRateLimit, validateOrigin } from "@/lib/security";
import { getGasWebhookUrl, validateSurveyData } from "@/lib/survey-validation";

/**
 * Server Action to submit survey data to Google Apps Script.
 * Keeps the external endpoint secret and validates the payload before sending.
 */
export async function submitSurveyAction(formData: SurveyData, utmParams: Record<string, string> = {}) {
  try {
    await validateOrigin();
    await checkRateLimit();

    const validation = validateSurveyData(formData);

    if (!validation.ok) {
      return {
        success: false,
        error: validation.error,
      };
    }

    const payload = {
      ...validation.normalized,
      ...utmParams,
      previousLearningLimitations:
        validation.normalized.previousLearningLimitations.join(", ") +
        (validation.normalized.otherPreviousLimitation ? ` (기타: ${validation.normalized.otherPreviousLimitation})` : ""),
    };

    const gasWebhookUrl = getGasWebhookUrl();

    const response = await fetch(gasWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      redirect: "follow",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("GAS Submission Error:", errorText);
      return {
        success: false,
        error: `서버 응답 오류 (Status: ${response.status})`,
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Server Action Exception:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "알 수 없는 서버 오류가 발생했습니다.",
    };
  }
}
