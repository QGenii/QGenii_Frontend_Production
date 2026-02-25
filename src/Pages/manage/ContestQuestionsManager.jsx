import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { listContestQuestions, createContestQuestion, updateContestQuestion, deleteContestQuestion, reorderContestQuestions, getContest } from '../../lib/contestApi';

const STARTER_TEMPLATES = {
  javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};
`,
  python: `def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    
`,
  java: `import java.io.*;

public class Main {
  static String solve(String input) {
    // TODO: write your solution here
    return "";
  }

  public static void main(String[] args) throws Exception {
    String input = new String(System.in.readAllBytes());
    System.out.print(solve(input));
  }
}
`,
  cpp: `#include <bits/stdc++.h>
using namespace std;

string solve(const string &input) {
  // TODO: write your solution here
  return "";
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  std::ostringstream ss;
  ss << cin.rdbuf();
  string input = ss.str();
  cout << solve(input);
  return 0;
}
`,
  c: `#include <stdio.h>
#include <stdlib.h>

int main() {
  // TODO: write your solution here
  return 0;
}
`,
};

export default function ContestQuestionsManager() {
  const { contestId } = useParams();
  const [contest, setContest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const normalizeType = (t) => {
    const upper = (t || 'MCQ').toString().toUpperCase();
    return ['MCQ', 'CODING', 'CODING_MCQ'].includes(upper) ? upper : 'MCQ';
  };

  const normalizeStarterCode = (starterCode) => {
    if (!starterCode) return {};
    if (typeof starterCode === 'object' && !Array.isArray(starterCode)) return starterCode;
    if (Array.isArray(starterCode)) {
      try {
        return Object.fromEntries(starterCode);
      } catch {
        return {};
      }
    }
    return {};
  };

  const supportedLanguages = useMemo(() => ['javascript', 'python', 'java', 'cpp', 'c'], []);
  const getDefaultEditor = (type = 'MCQ') => {
    const normalizedType = normalizeType(type);
    const base = {
      type: normalizedType,
      title: '',
      description: '',
      points: 1,
      difficulty: 'beginner',
    };
    if (normalizedType === 'MCQ') {
      return {
        ...base,
        options: [{ text: '', isCorrect: false }, { text: '', isCorrect: false }],
      };
    }
    if (normalizedType === 'CODING') {
      return {
        ...base,
        problemStatement: '',
        inputFormat: '',
        outputFormat: '',
        constraints: '',
        examples: [{ input: '', output: '', explanation: '', isPublic: true }],
        hints: [''],
        starterCode: { ...STARTER_TEMPLATES },
        tests: [{ input: '', expectedOutput: '', isPublic: true }],
        timeLimit: 2,
        memoryLimit: 256,
      };
    }
    if (normalizedType === 'CODING_MCQ') {
      return {
        ...base,
        options: [{ text: '', isCorrect: false }, { text: '', isCorrect: false }],
        codeSnippet: '',
        codeLanguage: 'javascript',
      };
    }
    // Default fallback
    return base;
  };

  const [editor, setEditor] = useState(() => getDefaultEditor('MCQ'));
  const [saving, setSaving] = useState(false);

  const [starterLang, setStarterLang] = useState('javascript');

  const starterCodeObj = useMemo(() => normalizeStarterCode(editor?.starterCode), [editor?.starterCode]);
  const availableLanguages = useMemo(() => {
    const keys = Object.keys(starterCodeObj || {});
    const preferred = supportedLanguages.filter((l) => keys.includes(l));
    const extras = keys.filter((k) => !preferred.includes(k));
    return [...preferred, ...extras, ...supportedLanguages.filter((l) => !keys.includes(l))];
  }, [starterCodeObj, supportedLanguages]);

  useEffect(() => {
    if (editor.type !== 'CODING') return;
    const keys = Object.keys(starterCodeObj || {});
    const next = keys.includes(starterLang)
      ? starterLang
      : (keys.includes('javascript') ? 'javascript' : (keys[0] || 'javascript'));
    if (next !== starterLang) setStarterLang(next);
  }, [editor.type, starterCodeObj, starterLang]);

  useEffect(() => {
    const load = async () => {
      setLoading(true); setError(null);
      try {
        const c = await getContest(contestId);
        setContest(c.data.contest);
        const res = await listContestQuestions(contestId);
        setQuestions(res.data.questions || []);
      } catch (e) {
        setError(e.response?.data?.message || e.message);
      } finally { setLoading(false); }
    };
    load();
  }, [contestId]);

  const onCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...editor };
      // Frontend validation prior to API call for clearer UX
      if (!payload.title.trim()) {
        alert('Title is required');
        return;
      }
      if (payload.points < 0) {
        alert('Points must be >= 0');
        return;
      }
      if (payload.type === 'MCQ') {
        if (!Array.isArray(payload.options) || payload.options.length < 2) {
          alert('MCQ needs at least 2 options');
          return;
        }
        if (!payload.options.some(o => o.isCorrect)) {
          alert('Mark at least one option as correct');
          return;
        }
        if (payload.options.some(o => !o.text.trim())) {
          alert('All MCQ options need non-empty text');
          return;
        }
      } else if (payload.type === 'CODING_MCQ') {
        if (!Array.isArray(payload.options) || payload.options.length < 2) {
          alert('Coding MCQ needs at least 2 options');
          return;
        }
        if (!payload.options.some(o => o.isCorrect)) {
          alert('Mark at least one option as correct');
          return;
        }
        if (payload.options.some(o => !o.text.trim())) {
          alert('All options need non-empty text');
          return;
        }
      } else if (payload.type === 'CODING') {
        if (!Array.isArray(payload.tests) || payload.tests.length === 0) {
          alert('Add at least one test case');
          return;
        }
        if (payload.tests.some(t => !t.expectedOutput || !t.expectedOutput.toString().trim().length)) {
          alert('Each test case requires an expected output');
          return;
        }
      }
      if (editor._id) {
        const res = await updateContestQuestion(contestId, editor._id, payload);
        setQuestions(qs => qs.map(q => q._id === editor._id ? res.data.question : q));
      } else {
        const res = await createContestQuestion(contestId, payload);
        setQuestions(qs => [...qs, res.data.question].sort((a,b) => a.order - b.order));
      }
      setEditor(getDefaultEditor('MCQ'));
    } catch (e) {
      alert(e.response?.data?.message || e.message);
    } finally { setSaving(false); }
  };

  const onDelete = async (id) => {
    if (!window.confirm('Delete this question?')) return;
    try {
      await deleteContestQuestion(contestId, id);
      setQuestions(qs => qs.filter(q => q._id !== id));
    } catch (e) { alert(e.response?.data?.message || e.message); }
  };

  const move = async (id, dir) => {
    const idx = questions.findIndex(q => q._id === id);
    const j = idx + dir;
    if (idx < 0 || j < 0 || j >= questions.length) return;
    const arr = [...questions];
    const [x] = arr.splice(idx, 1);
    arr.splice(j, 0, x);
    setQuestions(arr);
    try {
      await reorderContestQuestions(contestId, arr.map(q => q._id));
    } catch (e) {
      // soft-fail: leave UI order; user can refresh
      console.warn('Reorder failed', e);
    }
  };

  const TypeFields = useMemo(() => {
    if (editor.type === 'MCQ') {
      const options = Array.isArray(editor.options) ? editor.options : [];
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium">Options</label>
          {options.map((opt, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <input
                className="flex-1 border rounded px-2 py-1"
                value={opt.text}
                onChange={(e) => {
                  const arr = [...options];
                  arr[idx] = { ...arr[idx], text: e.target.value };
                  setEditor((ed) => ({ ...ed, options: arr }));
                }}
                placeholder={`Option ${idx + 1}`}
              />
              <label className="text-sm flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={!!opt.isCorrect}
                  onChange={(e) => {
                    const arr = [...options];
                    arr[idx] = { ...arr[idx], isCorrect: e.target.checked };
                    setEditor((ed) => ({ ...ed, options: arr }));
                  }}
                />
                Correct
              </label>
              <button
                type="button"
                className="text-red-600 text-sm"
                onClick={() => setEditor((ed) => ({ ...ed, options: (ed.options || []).filter((_, i) => i !== idx) }))}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="px-2 py-1 rounded border"
            onClick={() => setEditor((ed) => ({ ...ed, options: [...(ed.options || []), { text: '', isCorrect: false }] }))}
          >
            Add Option
          </button>
        </div>
      );
    }

    if (editor.type === 'CODING') {
      return (
      <div className="space-y-3">
        {/* Problem Statement */}
        <div>
          <label className="block text-sm font-medium mb-1">Problem Statement</label>
          <textarea className="w-full border rounded px-3 py-2" rows={4} value={editor.problemStatement || ''} 
            onChange={(e) => setEditor(ed => ({ ...ed, problemStatement: e.target.value }))} 
            placeholder="Describe the problem in detail..." />
        </div>

        {/* Input/Output Format */}
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Input Format</label>
            <textarea className="w-full border rounded px-3 py-2" rows={3} value={editor.inputFormat || ''} 
              onChange={(e) => setEditor(ed => ({ ...ed, inputFormat: e.target.value }))} 
              placeholder="e.g., First line: integer n..." />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Output Format</label>
            <textarea className="w-full border rounded px-3 py-2" rows={3} value={editor.outputFormat || ''} 
              onChange={(e) => setEditor(ed => ({ ...ed, outputFormat: e.target.value }))} 
              placeholder="e.g., Single integer..." />
          </div>
        </div>

        {/* Constraints */}
        <div>
          <label className="block text-sm font-medium mb-1">Constraints</label>
          <textarea className="w-full border rounded px-3 py-2" rows={2} value={editor.constraints || ''} 
            onChange={(e) => setEditor(ed => ({ ...ed, constraints: e.target.value }))} 
            placeholder="e.g., 1 ≤ n ≤ 10^5" />
        </div>

        {/* Time & Memory Limits */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Time Limit (seconds)</label>
            <input type="number" min="1" max="10" step="0.5" className="w-full border rounded px-3 py-2" 
              value={editor.timeLimit || 2} 
              onChange={(e) => setEditor(ed => ({ ...ed, timeLimit: Number(e.target.value) }))} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Memory Limit (MB)</label>
            <input type="number" min="64" max="512" step="64" className="w-full border rounded px-3 py-2" 
              value={editor.memoryLimit || 256} 
              onChange={(e) => setEditor(ed => ({ ...ed, memoryLimit: Number(e.target.value) }))} />
          </div>
        </div>

        {/* Examples */}
        <div>
          <label className="block text-sm font-medium mb-2">Examples </label>
          {(editor.examples || []).map((ex, idx) => (
            <div key={idx} className="border rounded p-3 mb-2 bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">Example {idx + 1}</span>
                  <label className="flex items-center gap-1 text-sm">
                    <input
                    className='bg-red-500'
                      type="checkbox"
                      checked={ex.isPublic !== false}
                      onChange={(e) => {
                        const arr = [...editor.examples]; 
                        arr[idx] = { ...arr[idx], isPublic: e.target.checked }; 
                        setEditor(ed => ({ ...ed, examples: arr }));
                      }}
                    />
                    <span className={ex.isPublic !== false ? 'text-green-600 font-medium' : 'text-gray-600'}>
                      {ex.isPublic !== false ? '🔓 Public' : '🔒 Private'}
                    </span>
                  </label>
                </div>
                <button type="button" className="text-red-600 text-sm" 
                  onClick={() => setEditor(ed => ({ ...ed, examples: ed.examples.filter((_, i) => i !== idx) }))}>
                  Remove
                </button>
              </div>
              <div className="space-y-2">
                <input className="w-full border rounded px-2 py-1 text-sm" placeholder="Input" 
                  value={ex.input || ''} 
                  onChange={(e) => {
                    const arr = [...editor.examples]; 
                    arr[idx] = { ...arr[idx], input: e.target.value }; 
                    setEditor(ed => ({ ...ed, examples: arr }));
                  }} />
                <input className="w-full border rounded px-2 py-1 text-sm" placeholder="Output" 
                  value={ex.output || ''} 
                  onChange={(e) => {
                    const arr = [...editor.examples]; 
                    arr[idx] = { ...arr[idx], output: e.target.value }; 
                    setEditor(ed => ({ ...ed, examples: arr }));
                  }} />
                <input className="w-full border rounded px-2 py-1 text-sm" placeholder="Explanation (optional)" 
                  value={ex.explanation || ''} 
                  onChange={(e) => {
                    const arr = [...editor.examples]; 
                    arr[idx] = { ...arr[idx], explanation: e.target.value }; 
                    setEditor(ed => ({ ...ed, examples: arr }));
                  }} />
              </div>
            </div>
          ))}
          <button type="button" className="px-3 py-1 rounded border text-sm" 
            onClick={() => setEditor(ed => ({ ...ed, examples: [...(ed.examples || []), { input: '', output: '', explanation: '', isPublic: true }] }))}>
            + Add Example
          </button>
          <p className="text-xs text-gray-500 mt-2">
            💡 Public examples are shown to users. Private examples are only used during "Run" and "Submit" but not displayed.
          </p>
        </div>

        {/* Hints */}
        <div>
          <label className="block text-sm font-medium mb-2">Hints</label>
          {(editor.hints || []).map((hint, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input className="flex-1 border rounded px-3 py-2 text-sm" placeholder={`Hint ${idx + 1}`} 
                value={hint || ''} 
                onChange={(e) => {
                  const arr = [...editor.hints]; 
                  arr[idx] = e.target.value; 
                  setEditor(ed => ({ ...ed, hints: arr }));
                }} />
              <button type="button" className="text-red-600 text-sm" 
                onClick={() => setEditor(ed => ({ ...ed, hints: ed.hints.filter((_, i) => i !== idx) }))}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" className="px-3 py-1 rounded border text-sm" 
            onClick={() => setEditor(ed => ({ ...ed, hints: [...(ed.hints || []), ''] }))}>
            + Add Hint
          </button>
        </div>

        {/* Starter Code */}
        <div>
          <label className="block text-sm font-medium mb-2">Starter Code</label>
          <div className="flex items-center gap-2 mb-2">
            <select
              className="border rounded px-3 py-1 text-sm"
              value={starterLang}
              onChange={(e) => setStarterLang(e.target.value)}
            >
              {availableLanguages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
            <span className="text-xs text-gray-500">Selected: {starterLang}</span>
          </div>
          <textarea
            className="w-full border rounded px-2 py-1 text-sm font-mono"
            rows={10}
            value={starterCodeObj?.[starterLang] || ''}
            onChange={(e) =>
              setEditor((ed) => ({
                ...ed,
                starterCode: { ...(normalizeStarterCode(ed.starterCode) || {}), [starterLang]: e.target.value },
              }))
            }
            placeholder={`Starter code for ${starterLang}...`}
          />
        </div>

        {/* Test Cases with Public/Private */}
        <div>
          <label className="block text-sm font-medium mb-2">Test Cases</label>
          {(editor.tests || []).map((t, idx) => (
            <div key={idx} className="border rounded p-3 mb-2 bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">Test Case {idx + 1}</span>
                  <label className="flex items-center gap-1 text-sm">
                    <input
                      type="checkbox"
                      checked={t.isPublic !== false}
                      onChange={(e) => {
                        const arr = [...editor.tests]; 
                        arr[idx] = { ...arr[idx], isPublic: e.target.checked }; 
                        setEditor(ed => ({ ...ed, tests: arr }));
                      }}
                    />
                    <span className={t.isPublic !== false ? 'text-green-600 font-medium' : 'text-gray-600'}>
                      {t.isPublic !== false ? '🔓 Public' : '🔒 Private'}
                    </span>
                  </label>
                </div>
                <button type="button" className="text-red-600 text-sm" 
                  onClick={() => setEditor(ed => ({ ...ed, tests: ed.tests.filter((_, i) => i !== idx) }))}>
                  Remove
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">Input</label>
                  <textarea className="w-full border rounded px-2 py-1 text-sm font-mono" rows={2} 
                    placeholder="Input (optional)" 
                    value={t.input || ''} 
                    onChange={(e) => {
                      const arr = [...editor.tests]; 
                      arr[idx] = { ...arr[idx], input: e.target.value }; 
                      setEditor(ed => ({ ...ed, tests: arr }));
                    }} />
                </div>
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">Expected Output *</label>
                  <textarea className="w-full border rounded px-2 py-1 text-sm font-mono" rows={2} 
                    placeholder="Expected output" 
                    value={t.expectedOutput || ''} 
                    onChange={(e) => {
                      const arr = [...editor.tests]; 
                      arr[idx] = { ...arr[idx], expectedOutput: e.target.value }; 
                      setEditor(ed => ({ ...ed, tests: arr }));
                    }} />
                </div>
              </div>
            </div>
          ))}
          <button type="button" className="px-3 py-1 rounded border text-sm" 
            onClick={() => setEditor(ed => ({ ...ed, tests: [...(ed.tests || []), { input: '', expectedOutput: '', isPublic: true }] }))}>
            + Add Test Case
          </button>
          <p className="text-xs text-gray-500 mt-2">
            💡 Public test cases are shown when users click "Run Code". Private test cases are only used during "Submit".
          </p>
        </div>
      </div>
      );
    }

    if (editor.type === 'CODING_MCQ') {
      const options = Array.isArray(editor.options) ? editor.options : [];
      return (
      <div className="space-y-4">
        {/* Code Snippet */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">Code Snippet</label>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={editor.codeLanguage || 'javascript'}
              onChange={(e) => setEditor(ed => ({ ...ed, codeLanguage: e.target.value }))}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="c">C</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="sql">SQL</option>
            </select>
          </div>
          <textarea
            className="w-full border rounded px-3 py-2 font-mono text-sm bg-gray-900 text-green-400"
            rows={8}
            value={editor.codeSnippet || ''}
            onChange={(e) => setEditor(ed => ({ ...ed, codeSnippet: e.target.value }))}
            placeholder={`// Enter code snippet here...\nfunction example() {\n  return 'Hello World';\n}`}
          />
        </div>

        {/* MCQ Options */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Options</label>
          {options.map((opt, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <input
                className="flex-1 border rounded px-2 py-1"
                value={opt.text}
                onChange={(e) => {
                  const arr = [...options];
                  arr[idx] = { ...arr[idx], text: e.target.value };
                  setEditor((ed) => ({ ...ed, options: arr }));
                }}
                placeholder={`Option ${idx + 1}`}
              />
              <label className="text-sm flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={!!opt.isCorrect}
                  onChange={(e) => {
                    const arr = [...options];
                    arr[idx] = { ...arr[idx], isCorrect: e.target.checked };
                    setEditor((ed) => ({ ...ed, options: arr }));
                  }}
                />
                Correct
              </label>
              <button
                type="button"
                className="text-red-600 text-sm"
                onClick={() => setEditor((ed) => ({ ...ed, options: (ed.options || []).filter((_, i) => i !== idx) }))}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="px-2 py-1 rounded border"
            onClick={() => setEditor((ed) => ({ ...ed, options: [...(ed.options || []), { text: '', isCorrect: false }] }))}
          >
            Add Option
          </button>
        </div>
      </div>
      );
    }

    return null;
  }, [editor]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Questions • {contest?.title}</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Question List</h2>
          <div className="space-y-2">
            {questions.map((q, idx) => (
              <div key={q._id} className="border rounded p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{idx+1}. {q.title}</div>
                    <div className="text-xs text-gray-600">{q.type} • {q.points} pts</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-2 py-1 rounded border" onClick={() => move(q._id, -1)} disabled={idx===0}>Up</button>
                    <button className="px-2 py-1 rounded border" onClick={() => move(q._id, +1)} disabled={idx===questions.length-1}>Down</button>
                    <button className="px-2 py-1 rounded border" onClick={() => {
                      // Load into editor for editing (merge with defaults so older/incomplete data still shows sections)
                      const type = normalizeType(q.type);
                      const defaults = getDefaultEditor(type);
                      const starterFromBackend = normalizeStarterCode(q.starterCode);
                      const mergedStarter = type === 'CODING'
                        ? { ...(defaults.starterCode || {}), ...(starterFromBackend || {}) }
                        : (starterFromBackend || defaults.starterCode || {});

                      // Normalize examples to ensure isPublic field exists (defaults to true for backward compatibility)
                      const normalizedExamples = q.examples?.length 
                        ? q.examples.map(ex => ({ ...ex, isPublic: ex.isPublic !== false }))
                        : (defaults.examples || [{ input: '', output: '', explanation: '', isPublic: true }]);
                      
                      setEditor({
                        ...defaults,
                        ...q,
                        type,
                        options: q.options?.length ? q.options : (defaults.options || [{ text: '', isCorrect: false }, { text: '', isCorrect: false }]),
                        tests: q.tests?.length ? q.tests : (defaults.tests || [{ input: '', expectedOutput: '', isPublic: true }]),
                        examples: normalizedExamples,
                        hints: q.hints?.length ? q.hints : (defaults.hints || ['']),
                        starterCode: mergedStarter,
                        problemStatement: q.problemStatement ?? defaults.problemStatement ?? '',
                        inputFormat: q.inputFormat ?? defaults.inputFormat ?? '',
                        outputFormat: q.outputFormat ?? defaults.outputFormat ?? '',
                        constraints: q.constraints ?? defaults.constraints ?? '',
                        timeLimit: q.timeLimit ?? defaults.timeLimit ?? 2,
                        memoryLimit: q.memoryLimit ?? defaults.memoryLimit ?? 256,
                        codeSnippet: q.codeSnippet ?? defaults.codeSnippet ?? '',
                        codeLanguage: q.codeLanguage ?? defaults.codeLanguage ?? 'javascript',
                      });

                      if (type === 'CODING') {
                        const keys = Object.keys(mergedStarter || {});
                        const nextLang = keys.includes('javascript') ? 'javascript' : (keys[0] || 'javascript');
                        setStarterLang(nextLang);
                      }
                    }}>Edit</button>
                    <button className="px-2 py-1 rounded bg-red-600 text-white" onClick={() => onDelete(q._id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
            {questions.length === 0 && <div className="text-sm text-gray-500">No questions yet. Create your first question.</div>}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">{editor._id ? 'Edit Question' : 'Create Question'}</h2>
          <form onSubmit={onCreate} className="space-y-3">
            <div className="grid md:grid-cols-3 gap-2">
              <div>
                <label className="block text-sm font-medium">Type</label>
                <select
                  className="border rounded px-2 py-1 w-full"
                  value={normalizeType(editor.type)}
                  onChange={(e) => {
                    const nextType = normalizeType(e.target.value);
                    setEditor((prev) => {
                      const next = getDefaultEditor(nextType);
                      return {
                        ...next,
                        _id: prev._id,
                        title: prev.title,
                        description: prev.description,
                        points: prev.points,
                        difficulty: prev.difficulty,
                      };
                    });
                  }}
                >
                  <option value="MCQ">MCQ</option>
                  <option value="CODING">Coding</option>
                  <option value="CODING_MCQ">Coding MCQ</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Points</label>
                <input type="number" min="0" className="border rounded px-2 py-1 w-full" value={editor.points} onChange={(e) => setEditor(ed => ({ ...ed, points: Number(e.target.value) }))} />
              </div>
              <div>
                <label className="block text-sm font-medium">Difficulty</label>
                <select className="border rounded px-2 py-1 w-full" value={editor.difficulty || 'beginner'} onChange={(e) => setEditor(ed => ({ ...ed, difficulty: e.target.value }))}>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Title</label>
              <input className="border rounded px-2 py-1 w-full" value={editor.title} onChange={(e) => setEditor(ed => ({ ...ed, title: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea className="border rounded px-2 py-1 w-full" rows={4} value={editor.description} onChange={(e) => setEditor(ed => ({ ...ed, description: e.target.value }))} />
            </div>
            {TypeFields}
            <div className="flex gap-2">
              <button type="submit" disabled={saving} className="px-3 py-2 rounded bg-blue-600 text-white disabled:opacity-50">{editor._id ? 'Update' : 'Create'}</button>
              <button type="button" className="px-3 py-2 rounded border" onClick={() => setEditor(getDefaultEditor('MCQ'))}>Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
