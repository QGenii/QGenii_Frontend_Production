import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { oneDark } from '@codemirror/theme-one-dark';

const CodeEditor = ({ code, language, onChange }) => {
  // Map language strings to CodeMirror language extensions
  const getLanguageExtension = (lang) => {
    const langLower = (lang || 'javascript').toLowerCase();
    
    if (langLower === 'javascript' || langLower === 'js') {
      return javascript({ jsx: true, typescript: false });
    } else if (langLower === 'python' || langLower === 'py') {
      return python();
    } else if (langLower === 'java') {
      return java();
    } else if (langLower === 'cpp' || langLower === 'c++' || langLower === 'c') {
      return cpp();
    }
    
    // Default to JavaScript
    return javascript({ jsx: true, typescript: false });
  };

  const handleChange = (value) => {
    if (onChange) {
      // Match the expected interface: onChange receives event-like object with target.value
      onChange({ target: { value } });
    }
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <CodeMirror
        value={code || ''}
        height="100%"
        theme={oneDark}
        extensions={[getLanguageExtension(language)]}
        onChange={handleChange}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          foldGutter: true,
          dropCursor: false,
          allowMultipleSelections: false,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          highlightActiveLineGutter: true,
        }}
        style={{ 
          fontSize: '14px',
          fontFamily: 'Monaco, Menlo, "Ubuntu Mono", Consolas, "source-code-pro", monospace',
          height: '100%',
        }}
      />
    </div>
  );
};

export default CodeEditor;