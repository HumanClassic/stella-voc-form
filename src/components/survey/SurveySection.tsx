import { ReactNode } from "react";

interface SurveySectionProps {
  question: string;
  description?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export default function SurveySection({ 
  question, 
  description, 
  required = true, 
  children,
  className = ""
}: SurveySectionProps) {
  return (
    <div className={`bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow duration-300 ${className}`}>
      <label className="block text-lg font-bold text-gray-900 mb-2 leading-relaxed">
        {question} {required && <span className="text-red-500">*</span>}
      </label>
      {description && (
        <p className="text-indigo-600 text-sm mb-4 bg-indigo-50 p-4 rounded-xl leading-relaxed whitespace-pre-line">
          {description}
        </p>
      )}
      <div className="mt-6">
        {children}
      </div>
    </div>
  );
}
