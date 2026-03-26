interface SuccessViewProps {
  onReset: () => void;
}

export default function SuccessView({ onReset }: SuccessViewProps) {
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
          onClick={onReset}
          className="w-full bg-indigo-600 text-white font-semibold py-4 rounded-2xl hover:bg-indigo-700 transition-all duration-300 shadow-lg shadow-indigo-200"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}
