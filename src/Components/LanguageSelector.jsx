import { useState } from 'react';
import { Globe } from 'lucide-react';

const LanguageSelector = ({ value, onChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'english', name: 'English', flag: '🇺🇸' },
    { code: 'spanish', name: 'Español', flag: '🇪🇸' },
    { code: 'french', name: 'Français', flag: '🇫🇷' },
    { code: 'german', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'chinese', name: '中文', flag: '🇨🇳' },
    { code: 'japanese', name: '日本語', flag: '🇯🇵' },
    { code: 'hindi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'arabic', name: 'العربية', flag: '🇸🇦' },
  ];

  const currentLanguage = languages.find(lang => lang.code === value) || languages[0];

  const handleLanguageSelect = (language) => {
    onChange(language.code);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <Globe size={16} className="text-gray-500" />
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="text-sm text-gray-700">{currentLanguage.name}</span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-20 max-h-60 overflow-y-auto">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 transition-colors ${
                  language.code === value ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="text-sm">{language.name}</span>
                {language.code === value && (
                  <svg className="w-4 h-4 text-blue-600 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;