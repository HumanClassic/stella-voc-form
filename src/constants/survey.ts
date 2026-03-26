/**
 * Survey Configuration Constants
 * Decoupled from the UI to allow easy updates and maintenance.
 */

export const PREVIOUS_LEARNING_OPTIONS = [
  "[응용력 마비 현상] 언어의 뼈대를 모른 채 통째로 외우기만 한 '맹목적 패턴 암기' 때문에 단어 하나, 상황 하나만 바뀌어도 입이 턱 막혀버리는 문제",
  "[실전 무용지물 현상] 교재 속 텍스트/남의 이야기만 외울 뿐 '내 삶에 맞춘 실전 적용 훈련의 부재'로 인해 정작 실상에서의 내 직무/일상 등 진짜 내 이야기는 한마디도 꺼내지 못하는 문제",
  "[실력 만년 정체 현상] 내 수준과 취약점은 철저히 배제된 '공장형 획일화 커리큘럼'으로 인해 시간과 돈을 쏟아도 고질적인 약점은 고쳐지지 않고 몇 년째 제자리걸음인 문제",
  "[영어 뇌정지 현상] 영어 어순 그대로 받아들이지 못하고 우리말로 먼저 해석하고 조립하려는 '한국어 개입(이중 번역) 습관' 때문에 문장이 조금만 길어져도 고장 난 듯 말문이 막히는 문제",
  "[청각 마비 현상] 영어 고유의 연음과 강세 규칙을 모른 채 눈으로 텍스트만 쫓는 '시각 의존적 묵독 학습'으로 인해 대본을 보면 다 아는 쉬운 문장도 귀로는 전혀 알아듣지 못하는 문제",
  "[물리적 버퍼링 현상] 눈과 귀로만 이해하고 넘어갈 뿐, 지식을 입 근육으로 빼내는 강제적 '아웃풋(반사신경) 훈련의 부재' 때문에 상대의 말을 다 알아듣고도 정작 내 입은 1~2초 내에 즉각 떨어지지 않는 문제",
  "[영어 울렁증 현상] 정답만 말해야 하고 문법이 틀리면 안 된다는 강박을 주입한 '한국식 완벽주의 교육' 때문에 머릿속으로 문법 체크(자기 검열)만 하다가 대화 타이밍을 다 놓치고 결국 꿀 먹은 벙어리가 되는 문제",
  "[실력 착시/정체 현상] 초급자의 머릿속 '한국어 원뜻'을 영어 구조로 치환하는 필수 과정을 생략한 채, 대충 의미만 유추하고 자기 발언으로 덮어버리고 가버리는 방임형 원어민 수업 환경으로 인해 정작 내가 내뱉고 싶은 문장은 구경도 못한 채, '원어민과의 대화'라는 후광 효과에 취해 실력이 늘고 있다는 착각에 빠져 결국 시간과 돈만 낭비하는 문제",
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

export const GAS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzjr3ksIHTWmh-CMZUF8gadhrOc3QAXwppKVJEKWi8f468-YpEdVeAgJd33Mm689Xfr/exec";

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
    question: "Q2. 본 강의를 만나기 전, 기존 영어 학습에서 해결되지 않았던 고질적인 문제는 무엇인가요? (중복 선택)",
    type: "checkbox",
    options: PREVIOUS_LEARNING_OPTIONS,
    required: true,
    hasOther: true,
  },
  {
    id: "ahaMomentExperience",
    question: "Q3. 본 강의를 통해 답답함이 해결된 구체적인 경험이 있다면 적어주세요.",
    type: "textarea",
    description: "예: '전에는 문장을 통째로 외워도 단어 하나만 바뀌면 입이 막혔는데, 이제는 영어 말하기 뼈대(주어+결론)를 알고 보니까 다른 상황에서도 하고 싶은 말을 만들고 있는 제 자신이 너무 신기해요.', '머릿속에 파편처럼 흩어져 맴돌던 문법 지식들이 하나의 선으로 쫙 꿰어지면서 영어의 전체 지도가 펼쳐지는 경험을 했어요' 등 구체적인 에피소드를 적어주시면 좋습니다!",
    required: true,
  },
  {
    id: "stellaUniquePoint",
    question: "Q4. 다른 수업에는 없는 스텔라 쌤 수업에서만 경험할 수 있는 점은 무엇인가요?",
    type: "textarea",
    description: "예: '입 근육이 뻐근해질 때까지 뱉어내는 강도 높은 아웃풋 훈련', '쌤 전용 학습 앱 덕분에 24시간 스피킹 밀착 과외를 받는 듯한 기분' 등 가장 큰 차별점을 적어주세요.",
    required: true,
  },
  {
    id: "skillImprovementProof",
    question: "Q5. 수업 수강 전과 후 본인의 영어 실력에 나타난 가장 명확한 변화는 무엇인가요?",
    type: "textarea",
    description: "예: '영어식 어순대로 생각하고 내뱉는 훈련 덕분에 긴 문장도 덩어리째 이해돼요', '강세와 리듬 규칙을 배우고 나니 영어가 귀에 확 꽂혀요' 등 체험하는 가장 큰 변화를 적어주세요.",
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
