/**
 * Survey Configuration Constants
 * Decoupled from the UI to allow easy updates and maintenance.
 */

export const PREVIOUS_LEARNING_OPTIONS = [
  "[응용력 마비 현상] 문장의 뼈대를 모른 채 통째로 암기만 해서 단어 하나만 바뀌어도 입이 막힘",
  "[실전 무용지물 현상] 교재만 외울 뿐, 정작 내 일상과 직무 이야기는 한마디도 못 함",
  "[실력 만년 정체 현상] 내 취약점은 방치된 획일화 커리큘럼 탓에 몇 년째 제자리걸음",
  "[영어 뇌정지 현상] 영어 어순 그대로 받아들이지 못하고 우리말로 재조립하느라 문장이 길어지면 턱 막힘",
  "[청각 마비 현상] 눈으로만 텍스트를 쫓아, 눈으로 보면 아는 문장도 귀(연음/강세)로는 전혀 알아듣지 못하는 문제",
  "[물리적 버퍼링 현상] 상대 말은 이해해도 입 밖으로 내뱉는 훈련이 안 돼 즉답이 안 됨",
  "[영어 울렁증 현상] 문법이 틀릴까 봐 머릿속으로 검열만 하다가 대화 타이밍을 다 놓침",
  "[실력 착시/정체 현상] 문장 구조에 대한 이해 없이 눈치껏 때우면서, '원어민과의 대화'라는 후광 효과에 취해 실력이 는다고 착각함",
];

export const LEARNING_PURPOSE_OPTIONS = [
  "일상 회화",
  "비즈니스 및 업무",
  "취미 및 여행",
  "시험 대비",
  "자기계발",
  "기타",
];

export const AGE_GROUP_OPTIONS = [
  "10대",
  "20대",
  "30대",
  "40대",
  "50대",
  "60대",
  "70대 이상"
];

export const GENDER_OPTIONS = ["남성", "여성"];

export const SCORE_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export interface SurveyData {
  skillImprovementScore: string;
  previousLearningLimitations: string[];
  ahaMomentExperience: string;
  stellaUniquePoint: string;
  skillImprovementProof: string;
  recommendationQuote: string;
  learningPurpose: string;
  futureNeeds: string;
  gender: string;
  ageGroup: string;
  marketingConsent: boolean;
  otherPreviousLimitation: string;
}

export interface Question {
  id: string;
  question: string;
  type: "radio" | "checkbox" | "textarea" | "score";
  options?: readonly string[] | readonly number[];
  required: boolean;
  description?: string;
  placeholder?: string;
  hasOther?: boolean;
}

/**
 * Question Definitions for mapped rendering
 */
export const QUESTIONS: readonly Question[] = [
  {
    id: "learningPurpose",
    question: "Q1. 본 강의를 수강하신 주된 목적은 무엇인가요?",
    type: "radio",
    options: LEARNING_PURPOSE_OPTIONS,
    required: true,
  },
  {
    id: "previousLearningLimitations",
    question: "Q2. 본 강의를 만나기 전, 기존 영어 학습에서 해결되지 않았던 고질적인 문제는 무엇인가요? (복수 선택 가능)",
    type: "checkbox",
    options: PREVIOUS_LEARNING_OPTIONS,
    required: true,
    hasOther: true,
  },
  {
    id: "ahaMomentExperience",
    question: "Q3. 본 강의를 통해 답답함이 해결된 구체적인 경험이 있다면 적어주세요.",
    type: "textarea",
    description: "예: '예전엔 단어 하나만 바뀌어도 입이 막혔는데, 말하기 뼈대(주어+결론)를 알고 나니 낯선 상황에서도 스스로 문장을 만들고 있어 신기해요.' 등 구체적인 에피소드를 적어주시면 좋습니다!",
    required: true,
  },
  {
    id: "stellaUniquePoint",
    question: "Q4. 다른 수업에는 없는 스텔라 쌤 수업에서만 경험할 수 있는 점은 무엇인가요?",
    type: "textarea",
    description: "예: '제스처까지 쓰는 완벽한 상황 몰입', '입이 뻐근해지는 스파르타식 훈련', '학습앱을 통한 24시간 밀착 케어' 등 가장 큰 차별점을 적어주세요.",
    required: true,
  },
  {
    id: "skillImprovementProof",
    question: "Q5. 수업 수강 전과 후 본인의 영어 실력에 나타난 가장 명확한 변화는 무엇인가요?",
    type: "textarea",
    description: "예: '긴 문장이 덩어리째 읽히는 경험', '리듬을 알고 난 뒤 확 뚫린 귀' 등 수강 후 가장 크게 체감한 변화를 적어주세요.",
    required: true,
  },
  {
    id: "skillImprovementScore",
    question: "Q6. 본인의 영어 실력 향상 정도는 10점 만점에 몇 점인가요?",
    type: "score",
    options: SCORE_OPTIONS,
    required: true,
  },
  {
    id: "recommendationQuote",
    question: "Q7. 수강을 망설이는 분들에게 전하고 싶은 단 한 문장의 추천사는?",
    type: "textarea",
    required: true,
  },
  {
    id: "futureNeeds",
    question: "Q8. 앞으로 추가로 배우고 싶은 내용이나 새롭게 도입되었으면 하는 학습 방식이 있다면?",
    type: "textarea",
    required: false,
    placeholder: "자유롭게 적어주세요... (선택 사항)",
  },
] as const;
