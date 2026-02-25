export const Input = ({ label, error, className = '', icon = null, ...props }) => {
  return (
    <label className="block">
      {label && (
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <span className="text-sm font-medium text-gray-700">{label}</span>
        </div>
      )}
      <input
        className={`w-[17.18rem] h-[2.125rem] bg-[#F1F3F7] border border-gray-200 rounded-[0.3125rem] placeholder-gray-400 ${
          error ? 'border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </label>
  );
};
