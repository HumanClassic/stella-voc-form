import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { validateSurveyData, getGasWebhookUrl } from "../src/lib/survey-validation.ts";

describe("survey validation", () => {
  it("accepts a valid submission payload", () => {
    const payload = {
      skillImprovementScore: "8",
      previousLearningLimitations: ["일상 회화"],
      ahaMomentExperience: "문장이 길어도 구조를 잡고 말할 수 있게 됐습니다.",
      stellaUniquePoint: "실전 중심 훈련이 좋습니다.",
      skillImprovementProof: "말하기 속도가 빨라졌습니다.",
      recommendationQuote: "한 번 해보면 바뀝니다.",
      learningPurpose: "비즈니스 및 업무",
      futureNeeds: "더 많은 회화 실습이 필요합니다.",
      gender: "여성",
      ageGroup: "20대",
      marketingConsent: true,
      otherPreviousLimitation: "",
    };

    const result = validateSurveyData(payload);
    assert.equal(result.ok, true);

    if (result.ok) {
      assert.deepEqual(result.normalized.previousLearningLimitations, ["일상 회화"]);
    }
  });

  it("rejects invalid gender values", () => {
    const payload = {
      skillImprovementScore: "7",
      previousLearningLimitations: [],
      ahaMomentExperience: "좋았습니다.",
      stellaUniquePoint: "좋았습니다.",
      skillImprovementProof: "향상됐습니다.",
      recommendationQuote: "추천합니다.",
      learningPurpose: "일상 회화",
      futureNeeds: "",
      gender: "기타",
      ageGroup: "30대",
      marketingConsent: false,
      otherPreviousLimitation: "",
    };

    const result = validateSurveyData(payload);
    assert.equal(result.ok, false);

    if (!result.ok) {
      assert.match(result.error, /gender/i);
    }
  });
});

describe("gas webhook config", () => {
  it("requires a valid GAS URL", () => {
    process.env.GAS_WEBHOOK_URL = "";
    assert.throws(() => getGasWebhookUrl(), /GAS_WEBHOOK_URL/i);
  });
});
