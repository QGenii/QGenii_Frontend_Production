import React from 'react';

// Language configurations
const LANGUAGE_CONFIG = {
  javascript: {
    label: 'JavaScript',
    defaultCode: '// Write your solution here\nfunction solve(input) {\n  // Your code here\n  return output;\n}\n\n// Read input\nconst input = require("fs").readFileSync("/dev/stdin", "utf8").trim();\nconsole.log(solve(input));',
  },
  python: {
    label: 'Python',
    defaultCode: '# Write your solution here\ndef solve(input_data):\n    # Your code here\n    return output\n\n# Read input\nimport sys\ninput_data = sys.stdin.read().strip()\nprint(solve(input_data))',
  },
  java: {
    label: 'Java',
    defaultCode: '// Write your solution here\nimport java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Your code here\n        sc.close();\ n    }\n}',
  },
  cpp: {
    label: 'C++',
    defaultCode: '// Write your solution here\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Your code here\n    return 0;\n}',
  },
  c: {
    label: 'C',
    defaultCode: '// Write your solution here\n#include <stdio.h>\n\nint main() {\n    // Your code here\n    return 0;\n}',
  },
};

export default function CodeEditor({ 
  value, 
  onChange, 
  language = 'javascript',
  onLanguageChange,
  supportedLanguages = ['javascript', 'python', 'java', 'cpp', 'c'],
  height = '500px',
  readOnly = false,
}) {
  const handleChange = (e) => {
    if (onChange && !readOnly) {
      onChange(e.target.value);
    }
  };

  const handleKeyDown = (e) => {
    // Handle tab key for indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      // Set cursor position after tab
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-800 text-white px-4 py-2 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium">Language:</label>
          <select
            value={language}
            onChange={(e) => onLanguageChange && onLanguageChange(e.target.value)}
            className="bg-gray-700 text-white px-3 py-1.5 rounded text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={readOnly}
          >
            {supportedLanguages.map((lang) => (
              <option key={lang} value={lang}>
                {LANGUAGE_CONFIG[lang]?.label || lang}
              </option>
            ))}
          </select>
        </div>
        <div className="text-xs text-gray-400">
          Tab for indent • Ctrl+/ for comment
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex-1 relative" style={{ height }}>
        <textarea
          value={value || LANGUAGE_CONFIG[language]?.defaultCode || ''}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          className="w-full h-full bg-gray-900 text-gray-100 font-mono text-sm p-4 focus:outline-none resize-none"
          style={{
            lineHeight: '1.5',
            tabSize: 2,
          }}
          spellCheck={false}
          placeholder="Start coding..."
        />
      </div>
    </div>
  );
}

export { LANGUAGE_CONFIG };
