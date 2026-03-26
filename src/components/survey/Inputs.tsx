import { AGE_GROUP_OPTIONS, GENDER_OPTIONS, SCORE_OPTIONS } from "@/constants/survey";

interface InputProps<T> {
  value: T;
  onChange: (val: T) => void;
  options?: readonly string[] | readonly number[];
  required?: boolean;
  placeholder?: string;
}

export function RadioGroup({ value, onChange, options, required }: InputProps<string>) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {options?.map((option) => (
        <label key={option} className="flex flex-col items-center cursor-pointer">
          <input
            type="radio"
            value={option}
            checked={value === option}
            required={required}
            onChange={(e) => onChange(e.target.value)}
            className="sr-only peer"
          />
          <div className="w-full py-4 text-center rounded-2xl bg-gray-50 border-2 border-transparent text-gray-600 font-semibold peer-checked:bg-indigo-50 peer-checked:text-indigo-700 peer-checked:border-indigo-600 hover:bg-gray-100 transition-all duration-200">
            {option}
          </div>
        </label>
      ))}
    </div>
  );
}

export function CheckboxGroup({ 
  value, 
  onChange, 
  options, 
  hasOther, 
  otherValue, 
  onOtherChange 
}: InputProps<string[]> & { hasOther?: boolean; otherValue?: string; onOtherChange?: (val: string) => void }) {
  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((item) => item !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-3">
      {options?.map((option) => (
        <label key={option} className="relative flex items-center p-4 rounded-2xl bg-gray-50 border-2 border-transparent hover:bg-gray-100 cursor-pointer transition-all duration-200 group">
          <input
            type="checkbox"
            checked={value.includes(option.toString())}
            onChange={() => toggleOption(option.toString())}
            className="sr-only peer"
          />
          <div className="w-6 h-6 rounded-lg border-2 border-gray-300 mr-4 flex items-center justify-center peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-colors">
            <svg className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-gray-700 font-medium group-hover:text-gray-900 leading-snug">
            {option.toString().includes("] ") ? (
              <>
                <span className="font-bold">{option.toString().split("] ")[0]}]</span> {option.toString().split("] ")[1]}
              </>
            ) : (
              option
            )}
          </span>
        </label>
      ))}
      
      {hasOther && (
        <div className="mt-2 space-y-3">
          <label className="relative flex items-center p-4 rounded-2xl bg-gray-50 border-2 border-transparent hover:bg-gray-100 cursor-pointer transition-all duration-200 group">
            <input
              type="checkbox"
              checked={value.includes("기타")}
              onChange={() => toggleOption("기타")}
              className="sr-only peer"
            />
            <div className="w-6 h-6 rounded-lg border-2 border-gray-300 mr-4 flex items-center justify-center peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-colors">
              <svg className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-gray-700 font-bold group-hover:text-gray-900">기타 (직접 입력)</span>
          </label>
          
          {value.includes("기타") && (
            <input
              type="text"
              placeholder="다른 한계점이 있다면 적어주세요..."
              value={otherValue}
              onChange={(e) => onOtherChange?.(e.target.value)}
              className="w-full p-4 rounded-2xl bg-white border-2 border-indigo-100 focus:border-indigo-600 focus:outline-none transition-all duration-200 shadow-inner"
            />
          )}
        </div>
      )}
    </div>
  );
}

export function TextArea({ value, onChange, placeholder, required }: InputProps<string>) {
  return (
    <textarea
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-40 p-5 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white focus:outline-none transition-all duration-300 resize-none text-gray-700 leading-relaxed"
      placeholder={placeholder || "답변을 입력해주세요..."}
    />
  );
}

export function ScoreGroup({ value, onChange }: InputProps<string>) {
  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-between sm:justify-start">
        {SCORE_OPTIONS.map((score) => (
          <label key={score} className="cursor-pointer group">
            <input
              type="radio"
              checked={value === score.toString()}
              onChange={() => onChange(score.toString())}
              className="sr-only"
              required
            />
            <div className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl border-2 transition-all duration-200 font-bold text-lg
              ${value === score.toString()
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
  );
}

export function GenderGroup({ value, onChange }: InputProps<string>) {
  return (
    <div className="flex gap-4">
      {GENDER_OPTIONS.map((gender) => (
        <label key={gender} className="flex-1 cursor-pointer">
          <input
            type="radio"
            checked={value === gender}
            required
            onChange={() => onChange(gender)}
            className="sr-only peer"
          />
          <div className="w-full py-3 text-center rounded-2xl bg-gray-50 border-2 border-transparent text-gray-600 font-semibold peer-checked:bg-indigo-50 peer-checked:text-indigo-700 peer-checked:border-indigo-600 hover:bg-gray-100 transition-all duration-200">
            {gender}
          </div>
        </label>
      ))}
    </div>
  );
}

export function AgeSelect({ value, onChange }: InputProps<string>) {
  return (
    <select
      required
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white focus:outline-none transition-all duration-200 text-gray-700 font-semibold"
    >
      <option value="" disabled>나이대를 선택해주세요</option>
      {AGE_GROUP_OPTIONS.map((age) => (
        <option key={age} value={age}>{age}</option>
      ))}
    </select>
  );
}
