import {
  AGE_GROUP_OPTIONS,
  GENDER_OPTIONS,
  LEARNING_PURPOSE_OPTIONS,
  PREVIOUS_LEARNING_OPTIONS,
  SurveyData,
} from "../constants/survey";

const LEARNING_PURPOSE_SET = new Set(LEARNING_PURPOSE_OPTIONS);
const GENDER_SET = new Set(GENDER_OPTIONS);
const AGE_GROUP_SET = new Set(AGE_GROUP_OPTIONS);
const PREVIOUS_LEARNING_SET = new Set(PREVIOUS_LEARNING_OPTIONS);

function normalizeText(value: unknown, fieldName: string, maxLength = 5000): string {
  if (typeof value !== "string") {
    throw new Error(`${fieldName} must be a string.`);
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  if (trimmed.length > maxLength) {
    throw new Error(`${fieldName} is too long.`);
  }

  return trimmed;
}

function normalizeArray(value: unknown, fieldName: string): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value.split(",").map((item) => item.trim()).filter(Boolean);
  }

  throw new Error(`${fieldName} must be an array or comma-separated string.`);
}

export function getGasWebhookUrl(): string {
  const rawUrl = process.env.GAS_WEBHOOK_URL?.trim();

  if (!rawUrl) {
    throw new Error("GAS_WEBHOOK_URL is not configured.");
  }

  try {
    const parsed = new URL(rawUrl);

    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      throw new Error("GAS_WEBHOOK_URL must use http or https.");
    }

    return parsed.toString();
  } catch {
    throw new Error("GAS_WEBHOOK_URL is invalid.");
  }
}

export function validateSurveyData(input: Partial<SurveyData> | Record<string, unknown>):
  | { ok: true; normalized: SurveyData }
  | { ok: false; error: string } {
  try {
    const data = input as Record<string, unknown>;

    const skillImprovementScore = normalizeText(data.skillImprovementScore, "skillImprovementScore", 20);
    const parsedScore = Number(skillImprovementScore);
    if (!Number.isFinite(parsedScore) || parsedScore < 1 || parsedScore > 10) {
      throw new Error("skillImprovementScore must be a number between 1 and 10.");
    }

    const previousLearningLimitations = normalizeArray(data.previousLearningLimitations, "previousLearningLimitations");
    const uniquePreviousLearning = Array.from(new Set(previousLearningLimitations)).filter(
      (value) => PREVIOUS_LEARNING_SET.has(value),
    );

    if (uniquePreviousLearning.length === 0) {
      throw new Error("previousLearningLimitations must contain at least one valid option.");
    }

    const learningPurpose = normalizeText(data.learningPurpose, "learningPurpose", 200);
    if (!LEARNING_PURPOSE_SET.has(learningPurpose)) {
      throw new Error("learningPurpose is not a valid option.");
    }

    const ahaMomentExperience = normalizeText(data.ahaMomentExperience, "ahaMomentExperience", 5000);
    const stellaUniquePoint = normalizeText(data.stellaUniquePoint, "stellaUniquePoint", 5000);
    const skillImprovementProof = normalizeText(data.skillImprovementProof, "skillImprovementProof", 5000);
    const recommendationQuote = normalizeText(data.recommendationQuote, "recommendationQuote", 2000);
    const futureNeeds = normalizeText(data.futureNeeds ?? "", "futureNeeds", 2000);
    const gender = normalizeText(data.gender, "gender", 50);
    if (!GENDER_SET.has(gender)) {
      throw new Error("gender is not a valid option.");
    }

    const ageGroup = normalizeText(data.ageGroup, "ageGroup", 50);
    if (!AGE_GROUP_SET.has(ageGroup)) {
      throw new Error("ageGroup is not a valid option.");
    }

    const marketingConsent = data.marketingConsent;
    if (typeof marketingConsent !== "boolean") {
      throw new Error("marketingConsent must be a boolean.");
    }

    const otherPreviousLimitation = typeof data.otherPreviousLimitation === "string"
      ? normalizeText(data.otherPreviousLimitation, "otherPreviousLimitation", 500)
      : "";

    return {
      ok: true,
      normalized: {
        skillImprovementScore: String(parsedScore),
        previousLearningLimitations: uniquePreviousLearning,
        ahaMomentExperience,
        stellaUniquePoint,
        skillImprovementProof,
        recommendationQuote,
        learningPurpose,
        futureNeeds,
        gender,
        ageGroup,
        marketingConsent,
        otherPreviousLimitation,
      },
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Invalid survey payload.",
    };
  }
}
