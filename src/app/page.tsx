"use client";

import { useState } from "react";
import { QUESTIONS, SurveyData } from "@/constants/survey";
import { submitSurveyAction } from "./actions";

// Components
import SurveyHeader from "@/components/survey/SurveyHeader";
import SuccessView from "@/components/survey/SuccessView";
import SurveySection from "@/components/survey/SurveySection";
import { 
  RadioGroup, 
  CheckboxGroup, 
  TextArea, 
  ScoreGroup, 
  GenderGroup, 
  AgeSelect 
} from "@/components/survey/Inputs";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState<SurveyData>({
    skillImprovementScore: "",
    previousLearningLimitations: [],
    ahaMomentExperience: "",
    stellaUniquePoint: "",
    skillImprovementProof: "",
    recommendationQuote: "",
    learningPurpose: "",
    futureNeeds: "",
    gender: "",
    ageGroup: "",
    marketingConsent: false,
    otherPreviousLimitation: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const result = await submitSurveyAction(formData);
      if (result.success) {
        setSubmitted(true);
        window.scrollTo(0, 0);
      } else {
        setErrorMsg(result.error || "제출 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      setErrorMsg("통신 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof SurveyData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (submitted) return <SuccessView onReset={() => setSubmitted(false)} />;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <SurveyHeader />

        {errorMsg && (
          <div className="mb-8 p-4 bg-red-50 border-2 border-red-100 rounded-2xl text-red-700 font-semibold animate-in slide-in-from-top-4 flex items-center gap-3">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {QUESTIONS.map((q) => (
            <SurveySection 
              key={q.id} 
              question={q.question} 
              description={q.description} 
              required={q.required}
            >
              {q.type === "radio" && (
                <RadioGroup 
                  value={formData[q.id as keyof SurveyData] as string} 
                  onChange={(val) => updateField(q.id as keyof SurveyData, val)}
                  options={q.options}
                  required={q.required}
                />
              )}
              {q.type === "checkbox" && (
                <CheckboxGroup 
                  value={formData[q.id as keyof SurveyData] as string[]} 
                  onChange={(val) => updateField(q.id as keyof SurveyData, val)}
                  options={q.options}
                  hasOther={q.hasOther}
                  otherValue={formData.otherPreviousLimitation}
                  onOtherChange={(val) => updateField("otherPreviousLimitation", val)}
                />
              )}
              {q.type === "textarea" && (
                <TextArea 
                  value={formData[q.id as keyof SurveyData] as string} 
                  onChange={(val) => updateField(q.id as keyof SurveyData, val)}
                  placeholder={q.placeholder}
                  required={q.required}
                />
              )}
              {q.type === "score" && (
                <ScoreGroup 
                  value={formData[q.id as keyof SurveyData] as string} 
                  onChange={(val) => updateField(q.id as keyof SurveyData, val)}
                />
              )}
            </SurveySection>
          ))}

          {/* Fixed Bottom Sections (Gender, Age, Consent) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SurveySection question="Q9. 성별">
              <GenderGroup 
                value={formData.gender} 
                onChange={(val) => updateField("gender", val)} 
              />
            </SurveySection>
            <SurveySection question="Q10. 나이대">
              <AgeSelect 
                value={formData.ageGroup} 
                onChange={(val) => updateField("ageGroup", val)} 
              />
            </SurveySection>
          </div>

          {/* Consent & Submit */}
          <div className="bg-indigo-900 rounded-3xl p-8 text-white shadow-xl">
            <label className="flex items-start mb-8 cursor-pointer group">
              <input
                type="checkbox"
                required
                checked={formData.marketingConsent}
                onChange={(e) => updateField("marketingConsent", e.target.checked)}
                className="sr-only peer"
              />
              <div className="mt-1 w-6 h-6 rounded-lg border-2 border-indigo-400 flex items-center justify-center shrink-0 mr-4 peer-checked:bg-white peer-checked:border-white transition-colors">
                <svg className="w-4 h-4 text-indigo-900 opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm sm:text-base font-medium text-indigo-100 group-hover:text-white transition-colors leading-tight">
                작성해주신 후기를 익명으로 마케팅 및 홍보에 활용하는 것에 동의하십니까? <span className="text-indigo-300">*</span>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl ${
                loading
                  ? "bg-indigo-800 text-indigo-400 cursor-not-allowed"
                  : "bg-white text-indigo-900 hover:bg-indigo-50 hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {loading ? "제출 중..." : "설문 제출하기"}
            </button>
          </div>
        </form>

        <footer className="mt-12 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Stella Ssaem. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
