// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Header from '../Header';
// import CodeEditor from './CodeEditor.jsx';
// import { getCodeTemplate } from './codeTemplates';
// import { AiOutlineCode, AiOutlinePlayCircle } from 'react-icons/ai';
// import './Compiler.css';

// const LanguageCompilerPage = () => {
//   const { language } = useParams();
//   const navigate = useNavigate();
//   const [code, setCode] = useState('');
//   const [input, setInput] = useState('');
//   const [output, setOutput] = useState('');
//   const [isRunning, setIsRunning] = useState(false);
  
//   // Validate language and redirect if invalid
//   useEffect(() => {
//     const validLanguages = ['python', 'java', 'cpp', 'c', 'javascript', 'php', 'ruby'];
//     if (!validLanguages.includes(language)) {
//       navigate('/compiler');
//     } else {
//       // Set code template for the selected language
//       setCode(getCodeTemplate(language));
//     }
//   }, [language, navigate]);
  
//   const handleCodeChange = (e) => {
//     setCode(e.target.value);
//   };
  
//   const handleInputChange = (e) => {
//     setInput(e.target.value);
//   };
  
//   const handleRunCode = () => {
//     setIsRunning(true);
//     setOutput(''); // Clear previous output
    
//     // Simulate code execution with a timeout
//     setTimeout(() => {
//       // In a real application, this would make an API call to execute the code
//       let result = 'Program executed successfully.\n\n';
//       if (input.trim()) {
//         result += `Input received: ${input}\n\n`;
//       }
//       result += `Running ${language.toUpperCase()} code...\n\nOutput:\nHello, World!\nProgram completed with exit code 0`;
      
//       setOutput(result);
//       setIsRunning(false);
//     }, 1000);
//   };
  
//   // Language display name mapping
//   const getLanguageDisplayName = () => {
//     const names = {
//       'python': 'Python',
//       'java': 'Java',
//       'cpp': 'C++',
//       'c': 'C',
//       'javascript': 'JavaScript',
//       'php': 'PHP',
//       'ruby': 'Ruby'
//     };
//     return names[language] || language;

    
//   };

  

  

//   return (
//     <div className="compiler-page">
//       <Header />

//       <div className="container-fluid py-3">
//         <h2 className="compiler-title mb-3 px-2">Online {getLanguageDisplayName()} Compiler</h2>

//         <div className="row">
//           <div className="col-lg-8 col-md-7 mb-3">
//             <div className="compiler-header d-flex justify-content-between align-items-center mb-2">
//               <div className="d-flex align-items-center">
//                 <span className="language-label">{getLanguageDisplayName()}</span>
//               </div>
              
//               <button 
//                 className="btn run-btn d-flex align-items-center justify-content-center"
//                 onClick={handleRunCode}
//                 disabled={isRunning}
//               >
//                 {isRunning ? 'Running...' : 'Run'}
//               </button>
//             </div>
            
//             <div className="code-editor-container">
//               <CodeEditor 
//                 code={code}
//                 language={language}
//                 onChange={handleCodeChange}
//               />
//             </div>
//           </div>
          
//           <div className="col-lg-4 col-md-5">
//             <div className="input-container mb-3">
//               <div className="input-header">
//                 <h5 className="m-0">Input</h5>
//               </div>
//               <div className="input-content">
//                 <textarea 
//                   placeholder="Enter input here..."
//                   value={input}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>
            
//             <div className="output-container">
//               <div className="output-header">
//                 <h5 className="m-0">Output</h5>
//               </div>
//               <div className="output-content">
//                 <pre>{output || 'Run your code to see output'}</pre>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="row mt-4">
//           <div className="col-12">
//             <div className="info-section">
//               <h3 className="info-title">Online {getLanguageDisplayName()} Compiler</h3>
//               <p>Write, compile, and run your {getLanguageDisplayName()} code online.</p>
//               <p>Features:</p>
//               <ul>
//                 <li>Quick execution of {getLanguageDisplayName()} code</li>
//                 <li>Error highlighting and reporting</li>
//                 <li>Save and share your code</li>
//                 <li>No installation required</li>
//               </ul>
              
//               <h4>Try our other compilers</h4>
//               <ul>
//                 {language !== 'python' && <li><a href="/compiler/language/python">Python Compiler</a></li>}
//                 {language !== 'java' && <li><a href="/compiler/language/java">Java Compiler</a></li>}
//                 {language !== 'cpp' && <li><a href="/compiler/language/cpp">C++ Compiler</a></li>}
//                 {language !== 'c' && <li><a href="/compiler/language/c">C Compiler</a></li>}
//                 {language !== 'javascript' && <li><a href="/compiler/language/javascript">JavaScript Compiler</a></li>}
//                 {language !== 'php' && <li><a href="/compiler/language/php">PHP Compiler</a></li>}
//                 {language !== 'ruby' && <li><a href="/compiler/language/ruby">Ruby Compiler</a></li>}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LanguageCompilerPage;