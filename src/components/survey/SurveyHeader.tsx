import Image from "next/image";

export default function SurveyHeader() {
  return (
    <header className="text-center mb-12">
      {/* Company Logo */}
      <div className="flex justify-center mb-8">
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full shadow-2xl overflow-hidden group/logo transition-all duration-500 hover:scale-110 hover:shadow-indigo-100/50">
          <Image 
            src="/logo.png" 
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
  );
}
