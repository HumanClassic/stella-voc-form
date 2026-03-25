"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * VOC Survey Form Component
 * Created for Stella Ssaem's Lecture Review
 * Technical Architecture: Next.js Client Component + Tailwind CSS
 * Backend: Google Apps Script Webhook (text/plain POST)
 */

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    skillImprovementScore: "",
    previousLearningLimitations: [] as string[],
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

  const previousLearningOptions = [
    "[응용력 마비 현상] 언어의 뼈대를 모른 채 통째로 외우기만 한 '맹목적 패턴 암기' 때문에 단어 하나, 상황 하나만 바뀌어도 입이 턱 막혀버리는 문제",
    "[실전 무용지물 현상] 교재 속 텍스트/남의 이야기만 외울 뿐 '내 삶에 맞춘 실전 적용 훈련의 부재'로 인해 정작 실상에서의 내 직무/일상 등 진짜 내 이야기는 한마디도 꺼내지 못하는 문제",
    "[실력 만년 정체 현상] 내 수준과 취약점은 철저히 배제된 '공장형 획일화 커리큘럼'으로 인해 시간과 돈을 쏟아도 고질적인 약점은 고쳐지지 않고 몇 년째 제자리걸음인 문제",
    "[영어 뇌정지 현상] 영어 어순 그대로 받아들이지 못하고 우리말로 먼저 해석하고 조립하려는 '한국어 개입(이중 번역) 습관' 때문에 문장이 조금만 길어져도 고장 난 듯 말문이 막히는 문제",
    "[청각 마비 현상] 영어 고유의 연음과 강세 규칙을 모른 채 눈으로 텍스트만 쫓는 '시각 의존적 묵독 학습'으로 인해 대본을 보면 다 아는 쉬운 문장도 귀로는 전혀 알아듣지 못하는 문제",
    "[물리적 버퍼링 현상] 눈과 귀로만 이해하고 넘어갈 뿐, 지식을 입 근육으로 빼내는 강제적 '아웃풋(반사신경) 훈련의 부재' 때문에 상대의 말을 다 알아듣고도 정작 내 입은 1~2초 내에 즉각 떨어지지 않는 문제",
    "[영어 울렁증 현상] 정답만 말해야 하고 문법이 틀리면 안 된다는 강박을 주입한 '한국식 완벽주의 교육' 때문에 머릿속으로 문법 체크(자기 검열)만 하다가 대화 타이밍을 다 놓치고 결국 꿀 먹은 벙어리가 되는 문제",
    "[실력 착시/정체 현상] 초급자의 머릿속 '한국어 원뜻'을 영어 구조로 치환하는 필수 과정을 생략한 채, 대충 의미만 유추하고 자기 발언으로 덮어버리고 가버리는 방임형 원어민 수업 환경으로 인해 정작 내가 내뱉고 싶은 문장은 구경도 못한 채, '원어민과의 대화'라는 후광 효과에 취해 실력이 늘고 있다는 착각에 빠져 결국 시간과 돈만 낭비하는 문제",
  ];

  const learningPurposeOptions = [
    "일상 회화",
    "비즈니스 및 업무",
    "취미 및 여행",
    "시험 대비",
    "자기계발",
    "기타",
  ];

  const ageGroupOptions = ["10대", "20대", "30대", "40대", "50대", "60대", "70대 이상"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzjr3ksIHTWmh-CMZUF8gadhrOc3QAXwppKVJEKWi8f468-YpEdVeAgJd33Mm689Xfr/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain",
          },
          body: JSON.stringify({
            ...formData,
            previousLearningLimitations: formData.previousLearningLimitations.join(", ") + (formData.otherPreviousLimitation ? ` (기타: ${formData.otherPreviousLimitation})` : ""),
          }),
        }
      );

      // Since mode is no-cors, we won't get a proper response status.
      // We assume success if no error was thrown during fetch.
      setSubmitted(true);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("제출 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (option: string) => {
    setFormData((prev) => {
      const exists = prev.previousLearningLimitations.includes(option);
      if (exists) {
        return {
          ...prev,
          previousLearningLimitations: prev.previousLearningLimitations.filter((item) => item !== option),
        };
      } else {
        return {
          ...prev,
          previousLearningLimitations: [...prev.previousLearningLimitations, option],
        };
      }
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">제출해주셔서 감사합니다!</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            소중한 의견을 반영하여 더 나은 강의를 <br /> 제공해드리는 스텔라 쌤이 되겠습니다.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="w-full bg-indigo-600 text-white font-semibold py-4 rounded-2xl hover:bg-indigo-700 transition-all duration-300 shadow-lg shadow-indigo-200"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          {/* Company Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full shadow-2xl overflow-hidden group/logo transition-all duration-500 hover:scale-110 hover:shadow-indigo-100/50">
              <Image 
                src="/logo_vibrant_amber.png" 
                alt="Easy English Logo" 
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 rounded-full">
            REAL EVIDENCE
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-6">
            Before & After 리얼 보이스
          </h1>
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-xl font-bold text-indigo-700 leading-tight">
              스텔라 쌤의 수업이 당신의 일상을 어떻게 바꾸었나요? <br /> 여러분의 생생한 목소리를 들려주세요.
            </p>
            <p className="text-base text-gray-500 leading-relaxed">
              여러분의 진심 어린 후기는 스텔라 쌤에게 큰 힘이 되며, <br className="hidden sm:block" />
              다음 강의의 퀄리티를 높이는 소중한 자산이 됩니다.
            </p>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: 학습 목적 (Moved from Q6) */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <label className="block text-lg font-bold text-gray-900 mb-6">
              Q1. 본 강의를 수강하신 주된 목적은 무엇인가요? <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {learningPurposeOptions.map((option) => (
                <label key={option} className="flex flex-col items-center cursor-pointer">
                  <input
                    type="radio"
                    name="learningPurpose"
                    value={option}
                    required
                    onChange={(e) => setFormData({ ...formData, learningPurpose: e.target.value })}
                    className="sr-only peer"
                  />
                  <div className="w-full py-4 text-center rounded-2xl bg-gray-50 border-2 border-transparent text-gray-600 font-semibold peer-checked:bg-indigo-50 peer-checked:text-indigo-700 peer-checked:border-indigo-600 hover:bg-gray-100 transition-all duration-200">
                    {option}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Section 2: 학습 한계점 (Remains Q2) */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow duration-300">
            <label className="block text-lg font-bold text-gray-900 mb-6 leading-relaxed">
              Q2. 본 강의를 만나기 전, 기존 영어 학습(타 강의/학습도구 등)에서 해결되지 않았던 고질적인 문제는 무엇인가요? (중복 선택 가능) <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 gap-3">
              {previousLearningOptions.map((option) => (
                <label key={option} className="relative flex items-center p-4 rounded-2xl bg-gray-50 border-2 border-transparent hover:bg-gray-100 cursor-pointer transition-all duration-200 group">
                  <input
                    type="checkbox"
                    checked={formData.previousLearningLimitations.includes(option)}
                    onChange={() => handleCheckboxChange(option)}
                    className="sr-only peer"
                  />
                  <div className="w-6 h-6 rounded-lg border-2 border-gray-300 mr-4 flex items-center justify-center peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-colors">
                    <svg className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium group-hover:text-gray-900 leading-snug">
                    {option.includes("] ") ? (
                      <>
                        <span className="font-bold">{option.split("] ")[0]}]</span> {option.split("] ")[1]}
                      </>
                    ) : (
                      option
                    )}
                  </span>
                </label>
              ))}
              
              {/* 기타 옵션 */}
              <div className="mt-2 space-y-3">
                <label className="relative flex items-center p-4 rounded-2xl bg-gray-50 border-2 border-transparent hover:bg-gray-100 cursor-pointer transition-all duration-200 group">
                  <input
                    type="checkbox"
                    checked={formData.previousLearningLimitations.includes("기타")}
                    onChange={() => handleCheckboxChange("기타")}
                    className="sr-only peer"
                  />
                  <div className="w-6 h-6 rounded-lg border-2 border-gray-300 mr-4 flex items-center justify-center peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-colors">
                    <svg className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-bold group-hover:text-gray-900">
                    기타 (직접 입력)
                  </span>
                </label>
                
                {formData.previousLearningLimitations.includes("기타") && (
                  <input
                    type="text"
                    placeholder="다른 한계점이 있다면 적어주세요..."
                    value={formData.otherPreviousLimitation}
                    onChange={(e) => setFormData({ ...formData, otherPreviousLimitation: e.target.value })}
                    className="w-full p-4 rounded-2xl bg-white border-2 border-indigo-100 focus:border-indigo-600 focus:outline-none transition-all duration-200 shadow-inner"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Section 3: 서술형 (Aha Moment) */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <label className="block text-lg font-bold text-gray-900 mb-2">
              Q3. 기존 학습법으로는 해결되지 않던 답답함이 본 강의를 통해 해결된 구체적 경험이 있다면 적어주세요. <span className="text-red-500">*</span>
            </label>
            <p className="text-indigo-600 text-sm mb-4 bg-indigo-50 p-4 rounded-xl leading-relaxed">
              예: "예전엔 단어만 툭툭 던졌는데 지금은 온전한 문장으로 말하게 됐어요", "외국인 전화가 덜 두려워졌어요" 등 본인이 체감한 구체적인 에피소드를 적어주시면 좋습니다!
            </p>
            <textarea
              required
              value={formData.ahaMomentExperience}
              onChange={(e) => setFormData({ ...formData, ahaMomentExperience: e.target.value })}
              className="w-full h-40 p-5 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white focus:outline-none transition-all duration-300 resize-none text-gray-700 leading-relaxed"
              placeholder="답변을 입력해주세요..."
            />
          </div>

          {/* Section 4: 스텔라만의 특별함 (NEW) */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <label className="block text-lg font-bold text-gray-900 mb-2">
              Q4. 다른 수업에는 없는 스텔라 쌤 수업에서만 경험할 수 있는 점은 무엇인가요? <span className="text-red-500">*</span>
            </label>
            <p className="text-indigo-600 text-sm mb-4 bg-indigo-50 p-4 rounded-xl leading-relaxed">
              예: "단순 암기가 아닌 영어의 생성 원리를 알려주는 점", "매일 진행되는 꼼꼼한 1:1 피드백" 등 본인이 느낀 가장 큰 차별점을 적어주세요.
            </p>
            <textarea
              required
              value={formData.stellaUniquePoint}
              onChange={(e) => setFormData({ ...formData, stellaUniquePoint: e.target.value })}
              className="w-full h-40 p-5 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white focus:outline-none transition-all duration-300 resize-none text-gray-700 leading-relaxed"
              placeholder="답변을 입력해주세요..."
            />
          </div>

          {/* Section 5: 실력 변화 */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <label className="block text-lg font-bold text-gray-900 mb-2">
              Q5. 수업 수강 전과 후 본인의 영어 실력에 나타난 가장 명확한 변화는 무엇인가요? <span className="text-red-500">*</span>
            </label>
            <p className="text-indigo-600 text-sm mb-4 bg-indigo-50 p-4 rounded-xl leading-relaxed">
              예: "망설임 없이 문장이 바로 나와요", "영어 이메일 작성이 한결 수월해졌어요" 등 본인이 체감하는 가장 큰 변화를 적어주세요.
            </p>
            <textarea
              required
              value={formData.skillImprovementProof}
              onChange={(e) => setFormData({ ...formData, skillImprovementProof: e.target.value })}
              className="w-full h-40 p-5 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white focus:outline-none transition-all duration-300 resize-none text-gray-700 leading-relaxed"
              placeholder="답변을 입력해주세요..."
            />
          </div>

          {/* Section 6: 실력 향상 점수 (Refined from Satisfaction) */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow duration-300">
            <label className="block text-lg font-bold text-gray-900 mb-2">
              Q6. 본 강의 수강 후, 스스로 느끼는 본인의 영어 실력 향상 정도는 10점 만점에 몇 점인가요? <span className="text-red-500">*</span>
            </label>
            <p className="text-gray-500 text-sm mb-6">수강 전과 비교하여 체감하는 실력의 변화를 수치로 선택해주세요.</p>
            <div className="flex flex-wrap gap-2 justify-between sm:justify-start">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                <label key={score} className="cursor-pointer group">
                  <input
                    type="radio"
                    name="skillImprovementScore"
                    value={score}
                    checked={formData.skillImprovementScore === score.toString()}
                    onChange={(e) => setFormData({ ...formData, skillImprovementScore: e.target.value })}
                    className="sr-only"
                    required
                  />
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl border-2 transition-all duration-200 font-bold text-lg
                    ${formData.skillImprovementScore === score.toString()
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-lg scale-110"
                      : "bg-white border-gray-200 text-gray-400 group-hover:border-indigo-300 group-hover:text-indigo-500"
                    }`}>
                    {score}
                  </div>
                </label>
              ))}
            </div>
            <div className="flex justify-between mt-3 text-xs font-bold text-gray-400 px-1">
              <span>미미함</span>
              <span>매우 크게 향상됨</span>
            </div>
          </div>

          {/* Section 7: 추천사 */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <label className="block text-lg font-bold text-gray-900 mb-4">
              Q7. 스텔라 쌤의 강의 수강을 망설이는 분들에게 전하고 싶은 단 한 문장의 추천사는? <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={formData.recommendationQuote}
              onChange={(e) => setFormData({ ...formData, recommendationQuote: e.target.value })}
              className="w-full h-40 p-5 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white focus:outline-none transition-all duration-300 resize-none text-gray-700 leading-relaxed"
              placeholder="답변을 입력해주세요..."
            />
          </div>

          {/* Section 8: 추가 니즈 */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <label className="block text-lg font-bold text-gray-900 mb-4">
              Q8. 앞으로 스텔라 쌤에게 추가로 배우고 싶은 내용이나 본 강의에 새롭게 도입되었으면 하는 학습 방식이 있다면 자유롭게 적어주세요.
            </label>
            <textarea
              value={formData.futureNeeds}
              onChange={(e) => setFormData({ ...formData, futureNeeds: e.target.value })}
              className="w-full h-32 p-5 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white focus:outline-none transition-all duration-300 resize-none text-gray-700 leading-relaxed"
              placeholder="자유롭게 적어주세요... (선택)"
            />
          </div>

          {/* Section 9 & 10: 성별 및 나이대 (Horizontal) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <label className="block text-lg font-bold text-gray-900 mb-6">
                Q9. 성별 <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                {["남성", "여성"].map((gender) => (
                  <label key={gender} className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      required
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="sr-only peer"
                    />
                    <div className="w-full py-3 text-center rounded-2xl bg-gray-50 border-2 border-transparent text-gray-600 font-semibold peer-checked:bg-indigo-50 peer-checked:text-indigo-700 peer-checked:border-indigo-600 hover:bg-gray-100 transition-all duration-200">
                      {gender}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <label className="block text-lg font-bold text-gray-900 mb-6">
                Q10. 나이대 <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.ageGroup}
                onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                className="w-full p-3 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white focus:outline-none transition-all duration-200 text-gray-700 font-semibold"
              >
                <option value="" disabled>나이대를 선택해주세요</option>
                {ageGroupOptions.map((age) => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Section 11: 동의 및 제출 */}
          <div className="bg-indigo-900 rounded-3xl p-8 text-white shadow-xl">
            <label className="flex items-start mb-8 cursor-pointer group">
              <input
                type="checkbox"
                required
                checked={formData.marketingConsent}
                onChange={(e) => setFormData({ ...formData, marketingConsent: e.target.checked })}
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
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-6 w-6 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  제출 중...
                </div>
              ) : (
                "설문 제출하기"
              )}
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
