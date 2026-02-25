import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../Components/layout/Sidebar';
import { Card } from '../../Components/ui/Card';
import { Button } from '../../Components/ui/Button';
import api from '../../lib/api';

export default function SkillTestManage() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [skillForm, setSkillForm] = useState({ skillName: '', description: '' });

  const [showQuestionsFor, setShowQuestionsFor] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [questionForm, setQuestionForm] = useState({ questionText: '', options: '', correctAnswer: '', difficultyLevel: 'easy' });
  // Question type: 'mcq', 'content', 'mcq-coding'
  const [questionType, setQuestionType] = useState('mcq');
  // MCQ style options state (used in modal)
  const [mcqOptions, setMcqOptions] = useState([{ text: '', isCorrect: false }, { text: '', isCorrect: false }]);
  const [mcqExplanation, setMcqExplanation] = useState('');
  // Content state (array of content items)
  const [contentItems, setContentItems] = useState([{ title: '', description: '', type: 'text' }]);
  // MCQ with coding state
  const [codingContent, setCodingContent] = useState('');
  const [editingQuestion, setEditingQuestion] = useState(null); // Track which question is being edited
  // Course and modules state
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [syllabusItems, setSyllabusItems] = useState([]); // Syllabus items for dropdown (includes "Print statement..." + rest)
  const [selectedModule, setSelectedModule] = useState('');
  const [loadingModules, setLoadingModules] = useState(false);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    setLoading(true);
    try {
      const res = await api.get('/skills');
      setSkills(res.data.data);
    } catch (err) {
      console.error('Failed to load skills, falling back to dummy', err);
      setSkills([
        { _id: '1', skillName: 'JavaScript', description: 'JS fundamentals', totalQuestions: 0 },
        { _id: '2', skillName: 'React', description: 'React basics', totalQuestions: 0 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const createSkill = async () => {
    try {
      await api.post('/skills', skillForm);
      alert('Skill created');
      setShowAddSkill(false);
      loadSkills();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to create skill');
    }
  };

  const deleteSkill = async (id) => {
    if (!confirm('Delete this skill?')) return;
    try {
      await api.delete(`/skills/${id}`);
      loadSkills();
    } catch (err) {
      console.error(err);
      alert('Failed to delete');
    }
  };

  // Helper function to get language name from course or skill name
  const getLanguageName = (course, skillName) => {
    if (course) {
      const title = course.title.toLowerCase();
      if (title.includes('python')) return 'Python';
      if (title.includes('java')) return 'Java';
      if (title.includes('c++') || title.includes('cpp') || title.includes('c plus plus')) return 'C++';
      if (title.includes('c programming') || title.includes('learn c')) return 'C';
      if (title.includes('javascript')) return 'JavaScript';
      if (title.includes('typescript')) return 'TypeScript';
      if (title.includes('go') || title.includes('golang')) return 'Go';
      if (title.includes('rust')) return 'Rust';
      if (title.includes('php')) return 'PHP';
      if (title.includes('ruby')) return 'Ruby';
      if (title.includes('swift')) return 'Swift';
      if (title.includes('kotlin')) return 'Kotlin';
      if (title.includes('scala')) return 'Scala';
    }
    // Fallback to skill name
    if (skillName) {
      const testName = skillName.toLowerCase();
      if (testName.includes('python')) return 'Python';
      if (testName.includes('java')) return 'Java';
      if (testName.includes('c++') || testName.includes('cpp')) return 'C++';
      if (testName.includes('c')) return 'C';
      if (testName.includes('javascript')) return 'JavaScript';
      if (testName.includes('typescript')) return 'TypeScript';
      if (testName.includes('go')) return 'Go';
      if (testName.includes('rust')) return 'Rust';
      if (testName.includes('php')) return 'PHP';
      if (testName.includes('ruby')) return 'Ruby';
      if (testName.includes('swift')) return 'Swift';
      if (testName.includes('kotlin')) return 'Kotlin';
      if (testName.includes('scala')) return 'Scala';
    }
    return 'Programming';
  };

  // Build syllabus items list (first item + rest from course.syllabus or modules)
  const buildSyllabusItems = (course, modules) => {
    const languageName = getLanguageName(course, showQuestionsFor?.skillName);
    const firstItem = {
      _id: 'first-module',
      title: `Print statement and ${languageName} Syntax`,
      isFirst: true
    };

    const items = [firstItem];

    // Priority: course.syllabus > modules (starting from second module)
    if (course?.syllabus && Array.isArray(course.syllabus) && course.syllabus.length > 0) {
      // Use syllabus items
      const sortedSyllabus = [...course.syllabus].sort((a, b) => {
        if (a.order !== undefined && b.order !== undefined) {
          return a.order - b.order;
        }
        return 0;
      });
      items.push(...sortedSyllabus.map(item => ({
        _id: item._id || item,
        title: item.title || item,
        isFirst: false
      })));
    } else if (modules.length > 0) {
      // Use modules starting from second module
      const sortedModules = [...modules].sort((a, b) => {
        if (a.order !== undefined && b.order !== undefined) {
          return a.order - b.order;
        }
        return 0;
      });
      // Start from second module (skip first, index 0)
      const modulesFromSecond = sortedModules.slice(1);
      items.push(...modulesFromSecond.map(module => ({
        _id: module._id,
        title: module.title,
        isFirst: false
      })));
    }

    return items;
  };

  const openQuestions = async (skill) => {
    setShowQuestionsFor(skill);
    setSelectedModule(''); // Reset selected module
    setCourse(null);
    setModules([]);
    setSyllabusItems([]);

    try {
      const res = await api.get(`/skills/${skill._id}/questions`);
      setQuestions(res.data.data);
    } catch (err) {
      console.error(err);
      setQuestions([]);
    }

    // Fetch course based on skill name (e.g., "python test" -> "Learn Python Programming")
    if (skill?.skillName) {
      try {
        setLoadingModules(true);
        const courseRes = await api.get(`/courses/practice-test/${skill.skillName}`);
        const fetchedCourse = courseRes.data.data.course;
        setCourse(fetchedCourse);

        // Fetch modules for the course
        if (fetchedCourse._id) {
          try {
            const modulesRes = await api.get(`/courses/${fetchedCourse._id}/modules`);
            const modulesData = modulesRes.data.data || [];
            // Sort modules by order if available
            const sortedModules = [...modulesData].sort((a, b) => {
              if (a.order !== undefined && b.order !== undefined) {
                return a.order - b.order;
              }
              return 0;
            });
            setModules(sortedModules);

            // Build syllabus items list
            const syllabusList = buildSyllabusItems(fetchedCourse, sortedModules);
            setSyllabusItems(syllabusList);

            // Auto-select first item (either first-module or first actual module)
            if (syllabusList.length > 0) {
              // If first item is "first-module", select it; otherwise select the first actual module
              if (syllabusList[0]._id === 'first-module' && sortedModules.length > 0) {
                // Map "first-module" to the first actual module ID
                setSelectedModule(sortedModules[0]._id);
              } else if (syllabusList[0]._id !== 'first-module') {
                setSelectedModule(syllabusList[0]._id);
              }
            }
          } catch (err) {
            console.error('Error fetching modules:', err);
            setModules([]);
            setSyllabusItems([]);
          }
        } else {
          // Build syllabus items even if no modules
          const syllabusList = buildSyllabusItems(fetchedCourse, []);
          setSyllabusItems(syllabusList);
        }
      } catch (err) {
        console.error('Error fetching course:', err);
        setCourse(null);
        setModules([]);
        setSyllabusItems([]);
      } finally {
        setLoadingModules(false);
      }
    }
  };

  const addQuestion = async () => {
    if (!showQuestionsFor) return;

    // Validate module selection
    if (!selectedModule) {
      alert('Please select a module');
      return;
    }

    let payload = {};

    if (questionType === 'mcq') {
      // Validation
      if (!questionForm.questionText.trim()) {
        alert('Please enter a question text');
        return;
      }
      const validOptions = mcqOptions.filter(o => o.text.trim());
      if (validOptions.length < 2) {
        alert('Please add at least 2 options');
        return;
      }
      if (!validOptions.some(o => o.isCorrect)) {
        alert('Please select a correct answer');
        return;
      }

      // MCQ payload
      payload = {
        type: 'mcq',
        questionText: questionForm.questionText.trim(),
        options: validOptions.map(o => ({ text: o.text.trim(), isCorrect: !!o.isCorrect })),
        correctAnswer: validOptions.find(o => o.isCorrect)?.text.trim() || '',
        difficultyLevel: questionForm.difficultyLevel,
        explanation: mcqExplanation.trim(),
      };
    } else if (questionType === 'content') {
      // Validation
      const validContent = contentItems.filter(item => item.title?.trim() || item.description?.trim());
      if (validContent.length === 0) {
        alert('Please add at least one content item with title or description');
        return;
      }

      // Content payload
      payload = {
        type: 'content',
        content: validContent.map(item => ({
          title: item.title?.trim() || '',
          description: item.description?.trim() || '',
          type: item.type || 'text',
        })),
        difficultyLevel: questionForm.difficultyLevel,
      };
    } else if (questionType === 'mcq-coding') {
      // Validation
      if (!questionForm.questionText.trim()) {
        alert('Please enter a question text');
        return;
      }
      if (!codingContent.trim()) {
        alert('Please enter coding content');
        return;
      }
      const validOptions = mcqOptions.filter(o => o.text.trim());
      if (validOptions.length < 2) {
        alert('Please add at least 2 options');
        return;
      }
      if (!validOptions.some(o => o.isCorrect)) {
        alert('Please select a correct answer');
        return;
      }

      // MCQ with coding payload
      payload = {
        type: 'mcq-coding',
        questionText: questionForm.questionText.trim(),
        codingContent: codingContent.trim(),
        options: validOptions.map(o => ({ text: o.text.trim(), isCorrect: !!o.isCorrect })),
        correctAnswer: validOptions.find(o => o.isCorrect)?.text.trim() || '',
        difficultyLevel: questionForm.difficultyLevel,
        explanation: mcqExplanation.trim(),
      };
    }

    // Add module ID to payload if selected
    // If "first-module" is selected, map it to the first actual module ID
    if (selectedModule) {
      if (selectedModule === 'first-module' && modules.length > 0) {
        payload.module = modules[0]._id;
      } else {
        payload.module = selectedModule;
      }
    }

    console.log('Sending payload:', payload);

    try {
      const response = await api.post(`/skills/${showQuestionsFor._id}/questions`, payload);
      console.log('Response:', response.data);
      // Get module title for display
      let moduleTitle = 'Selected Module';
      if (selectedModule === 'first-module' && modules.length > 0) {
        moduleTitle = syllabusItems.find(item => item._id === 'first-module')?.title || modules[0].title;
      } else {
        const foundModule = modules.find(m => m._id === selectedModule);
        const foundSyllabus = syllabusItems.find(item => item._id === selectedModule);
        moduleTitle = foundModule?.title || foundSyllabus?.title || 'Selected Module';
      }
      alert(`Question added successfully to module: ${moduleTitle}`);

      // Reload questions without resetting module selection
      try {
        const res = await api.get(`/skills/${showQuestionsFor._id}/questions`);
        setQuestions(res.data.data);
      } catch (err) {
        console.error(err);
      }

      // Reset form but keep module selection
      resetQuestionForm();
    } catch (err) {
      console.error('Error adding question:', err);
      console.error('Error response:', err.response?.data);
      alert(err.response?.data?.message || 'Failed to add question');
    }
  };

  const resetQuestionForm = () => {
    setQuestionForm({ questionText: '', options: '', correctAnswer: '', difficultyLevel: 'easy' });
    setQuestionType('mcq');
    setMcqOptions([{ text: '', isCorrect: false }, { text: '', isCorrect: false }]);
    setMcqExplanation('');
    setContentItems([{ title: '', description: '', type: 'text' }]);
    setCodingContent('');
    setEditingQuestion(null);
    // Don't reset selectedModule - keep it selected
  };

  const editQuestion = (question) => {
    setEditingQuestion(question);

    // Set selected module if question has a module
    // Check if it's the first module (which should map to "first-module" in dropdown)
    if (question.module) {
      // If the question's module is the first actual module, map it to "first-module"
      if (modules.length > 0 && question.module === modules[0]._id) {
        setSelectedModule('first-module');
      } else {
        setSelectedModule(question.module);
      }
    }

    // Determine question type
    const qType = question.type || (question.codingContent ? 'mcq-coding' : (question.content ? 'content' : 'mcq'));
    setQuestionType(qType);

    setQuestionForm({
      questionText: question.questionText || '',
      options: '',
      correctAnswer: question.correctAnswer || '',
      difficultyLevel: question.difficultyLevel || 'easy'
    });

    if (qType === 'mcq' || qType === 'mcq-coding') {
      // Set MCQ options from question
      if (question.options && question.options.length > 0) {
        setMcqOptions(question.options.map(opt => ({
          text: opt.text || '',
          isCorrect: opt.isCorrect || false
        })));
      } else {
        setMcqOptions([{ text: '', isCorrect: false }, { text: '', isCorrect: false }]);
      }
      setMcqExplanation(question.explanation || '');

      if (qType === 'mcq-coding') {
        setCodingContent(question.codingContent || '');
      }
    } else if (qType === 'content') {
      // Set content items
      if (question.content && Array.isArray(question.content) && question.content.length > 0) {
        setContentItems(question.content);
      } else {
        setContentItems([{ title: '', description: '', type: 'text' }]);
      }
    }
  };

  const updateQuestion = async () => {
    if (!showQuestionsFor || !editingQuestion) return;

    let payload = {};

    if (questionType === 'mcq') {
      // Validation
      if (!questionForm.questionText.trim()) {
        alert('Please enter a question text');
        return;
      }
      const validOptions = mcqOptions.filter(o => o.text.trim());
      if (validOptions.length < 2) {
        alert('Please add at least 2 options');
        return;
      }
      if (!validOptions.some(o => o.isCorrect)) {
        alert('Please select a correct answer');
        return;
      }

      // MCQ payload
      payload = {
        type: 'mcq',
        questionText: questionForm.questionText.trim(),
        options: validOptions.map(o => ({ text: o.text.trim(), isCorrect: !!o.isCorrect })),
        correctAnswer: validOptions.find(o => o.isCorrect)?.text.trim() || '',
        difficultyLevel: questionForm.difficultyLevel,
        explanation: mcqExplanation.trim(),
      };
    } else if (questionType === 'content') {
      // Validation
      const validContent = contentItems.filter(item => item.title?.trim() || item.description?.trim());
      if (validContent.length === 0) {
        alert('Please add at least one content item with title or description');
        return;
      }

      // Content payload
      payload = {
        type: 'content',
        content: validContent.map(item => ({
          title: item.title?.trim() || '',
          description: item.description?.trim() || '',
          type: item.type || 'text',
        })),
        difficultyLevel: questionForm.difficultyLevel,
      };
    } else if (questionType === 'mcq-coding') {
      // Validation
      if (!questionForm.questionText.trim()) {
        alert('Please enter a question text');
        return;
      }
      if (!codingContent.trim()) {
        alert('Please enter coding content');
        return;
      }
      const validOptions = mcqOptions.filter(o => o.text.trim());
      if (validOptions.length < 2) {
        alert('Please add at least 2 options');
        return;
      }
      if (!validOptions.some(o => o.isCorrect)) {
        alert('Please select a correct answer');
        return;
      }

      // MCQ with coding payload
      payload = {
        type: 'mcq-coding',
        questionText: questionForm.questionText.trim(),
        codingContent: codingContent.trim(),
        options: validOptions.map(o => ({ text: o.text.trim(), isCorrect: !!o.isCorrect })),
        correctAnswer: validOptions.find(o => o.isCorrect)?.text.trim() || '',
        difficultyLevel: questionForm.difficultyLevel,
        explanation: mcqExplanation.trim(),
      };
    }

    // Add module ID to payload if selected
    // If "first-module" is selected, map it to the first actual module ID
    if (selectedModule) {
      if (selectedModule === 'first-module' && modules.length > 0) {
        payload.module = modules[0]._id;
      } else {
        payload.module = selectedModule;
      }
    }

    console.log('Updating with payload:', payload);

    try {
      const response = await api.patch(`/skills/${showQuestionsFor._id}/questions/${editingQuestion._id}`, payload);
      console.log('Update response:', response.data);
      alert('Question updated successfully');

      // Reload questions without resetting module selection
      try {
        const res = await api.get(`/skills/${showQuestionsFor._id}/questions`);
        setQuestions(res.data.data);
      } catch (err) {
        console.error(err);
      }

      resetQuestionForm();
    } catch (err) {
      console.error('Error updating question:', err);
      console.error('Error response:', err.response?.data);
      alert(err.response?.data?.message || 'Failed to update question');
    }
  };

  const deleteQuestion = async (questionId) => {
    if (!confirm('Delete question?')) return;
    try {
      await api.delete(`/skills/${showQuestionsFor._id}/questions/${questionId}`);
      openQuestions(showQuestionsFor);
    } catch (err) {
      console.error(err);
      alert('Failed to delete question');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Skill Test Management</h1>
            <p className="text-gray-600 text-sm md:text-base">Create and manage skill test sets with MCQ questions</p>
          </div>
          <button
            onClick={() => setShowAddSkill(true)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Skill
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : skills.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No skills yet</h3>
            <p className="text-gray-600 mb-4">Get started by creating your first skill test</p>
            <button
              onClick={() => setShowAddSkill(true)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Create Skill
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((s) => (
              <div key={s._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 capitalize">{s.skillName}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{s.description || 'No description'}</p>
                    </div>
                    <div className="ml-4 bg-blue-100 rounded-full p-3">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">{s.questions?.length ?? 0} Questions</span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => openQuestions(s)}
                      className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Manage
                    </button>
                    <button
                      onClick={() => deleteSkill(s._id)}
                      className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-lg transition-colors border border-red-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Skill Modal */}
        {showAddSkill && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Create New Skill</h2>
                  <button
                    onClick={() => setShowAddSkill(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Skill Name *</label>
                  <input
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="e.g., Python, JavaScript, React"
                    value={skillForm.skillName}
                    onChange={(e) => setSkillForm((p) => ({ ...p, skillName: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                    rows="4"
                    placeholder="Brief description of this skill test..."
                    value={skillForm.description}
                    onChange={(e) => setSkillForm((p) => ({ ...p, description: e.target.value }))}
                  />
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => setShowAddSkill(false)}
                  className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createSkill}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Create Skill
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Questions Modal with MCQ UI */}
        {showQuestionsFor && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 capitalize">Manage Questions</h2>
                    <p className="text-sm text-gray-600 mt-1">{showQuestionsFor.skillName} • {questions.length} questions</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowQuestionsFor(null);
                      resetQuestionForm();
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-white rounded-lg"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">

                {editingQuestion && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <p className="text-sm font-semibold text-blue-900">
                        Editing Question: <span className="font-normal">{editingQuestion.questionText}</span>
                      </p>
                    </div>
                  </div>
                )}

                {/* Add/Edit Question Form */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">
                      {editingQuestion ? 'Edit Question' : 'Add New Question'}
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-semibold text-gray-700">Module:</label>
                        <textarea
                          value={selectedModule}
                          onChange={(e) => setSelectedModule(e.target.value)}
                          disabled={loadingModules || !!editingQuestion}
                          placeholder="Enter module name or ID manually..."
                          className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all font-medium min-w-[250px] resize-none"
                          rows="2"
                        />
                        {selectedModule && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-semibold">
                            ✓ Selected
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-semibold text-gray-700">Question Type:</label>
                        <select
                          value={questionType}
                          onChange={(e) => {
                            setQuestionType(e.target.value);
                            if (!editingQuestion) {
                              resetQuestionForm();
                              setQuestionType(e.target.value);
                            }
                          }}
                          disabled={!!editingQuestion}
                          className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all font-medium"
                        >
                          <option value="mcq">MCQ</option>
                          <option value="content">Content</option>
                          <option value="mcq-coding">MCQ with Coding</option>
                        </select>
                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${questionType === 'mcq' ? 'bg-blue-100 text-blue-700' :
                          questionType === 'content' ? 'bg-purple-100 text-purple-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                          {questionType === 'mcq' ? 'MCQ' : questionType === 'content' ? 'Content' : 'MCQ + Coding'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* MCQ and MCQ-Coding: Question Text */}
                    {(questionType === 'mcq' || questionType === 'mcq-coding') && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Question Text *</label>
                        <textarea
                          className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                          rows="3"
                          placeholder="Enter your question here..."
                          value={questionForm.questionText}
                          onChange={(e) => setQuestionForm((p) => ({ ...p, questionText: e.target.value }))}
                        />
                      </div>
                    )}

                    {/* MCQ-Coding: Coding Content */}
                    {questionType === 'mcq-coding' && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Coding Content *</label>
                        <textarea
                          className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none font-mono text-sm"
                          rows="8"
                          placeholder="Enter code or coding-related content here..."
                          value={codingContent}
                          onChange={(e) => setCodingContent(e.target.value)}
                        />
                      </div>
                    )}

                    {/* Content: Content Items Array */}
                    {questionType === 'content' && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Content Items *</label>
                        <div className="space-y-3">
                          {contentItems.map((item, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-lg border-2 border-gray-200">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium text-gray-600">Item {idx + 1}</span>
                                {contentItems.length > 1 && (
                                  <button
                                    onClick={() => setContentItems(prev => prev.filter((_, i) => i !== idx))}
                                    className="text-red-500 hover:text-red-700 text-sm"
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>
                              <div className="space-y-3">
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                                  <input
                                    type="text"
                                    className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                    placeholder="Content title..."
                                    value={item.title}
                                    onChange={(e) => {
                                      const newItems = [...contentItems];
                                      newItems[idx].title = e.target.value;
                                      setContentItems(newItems);
                                    }}
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                                  <textarea
                                    className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                                    rows="3"
                                    placeholder="Content description..."
                                    value={item.description}
                                    onChange={(e) => {
                                      const newItems = [...contentItems];
                                      newItems[idx].description = e.target.value;
                                      setContentItems(newItems);
                                    }}
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
                                  <select
                                    className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                    value={item.type}
                                    onChange={(e) => {
                                      const newItems = [...contentItems];
                                      newItems[idx].type = e.target.value;
                                      setContentItems(newItems);
                                    }}
                                  >
                                    <option value="text">Text</option>
                                    <option value="code">Code</option>
                                    <option value="image">Image</option>
                                    <option value="video">Video</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          ))}
                          <button
                            onClick={() => setContentItems(prev => [...prev, { title: '', description: '', type: 'text' }])}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Content Item
                          </button>
                        </div>
                      </div>
                    )}

                    {/* MCQ and MCQ-Coding: Options */}
                    {(questionType === 'mcq' || questionType === 'mcq-coding') && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Answer Options *</label>
                        <div className="space-y-3">
                          {mcqOptions.map((opt, oi) => (
                            <div key={oi} className="flex items-center gap-3 bg-white p-3 rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-colors">
                              <input
                                type="radio"
                                name={`correct-${showQuestionsFor?._id}`}
                                checked={!!opt.isCorrect}
                                onChange={() => {
                                  setMcqOptions(prev => prev.map((o, i) => i === oi ? { ...o, isCorrect: true } : { ...o, isCorrect: false }));
                                }}
                                className="w-5 h-5 text-blue-600"
                              />
                              <input
                                value={opt.text}
                                onChange={(e) => setMcqOptions(prev => prev.map((o, i) => i === oi ? { ...o, text: e.target.value } : o))}
                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                                placeholder={`Option ${oi + 1}`}
                              />
                              {mcqOptions.length > 2 && (
                                <button
                                  className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                  onClick={() => setMcqOptions(prev => prev.filter((_, i) => i !== oi))}
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                        <button
                          className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
                          onClick={() => setMcqOptions(prev => [...prev, { text: '', isCorrect: false }])}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Add Option
                        </button>
                      </div>
                    )}

                    {/* Difficulty and Explanation (for MCQ and MCQ-Coding) */}
                    {(questionType === 'mcq' || questionType === 'mcq-coding') && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty Level</label>
                          <select
                            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                            value={questionForm.difficultyLevel}
                            onChange={(e) => setQuestionForm((p) => ({ ...p, difficultyLevel: e.target.value }))}
                          >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Explanation (Optional)</label>
                          <textarea
                            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                            rows="3"
                            placeholder="Add explanation for the answer..."
                            value={mcqExplanation}
                            onChange={(e) => setMcqExplanation(e.target.value)}
                          />
                        </div>
                      </div>
                    )}

                    {/* Difficulty for Content type */}
                    {questionType === 'content' && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty Level</label>
                        <select
                          className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                          value={questionForm.difficultyLevel}
                          onChange={(e) => setQuestionForm((p) => ({ ...p, difficultyLevel: e.target.value }))}
                        >
                          <option value="easy">Easy</option>
                          <option value="medium">Medium</option>
                          <option value="hard">Hard</option>
                        </select>
                      </div>
                    )}

                    <div className="flex gap-3 pt-4">
                      {editingQuestion ? (
                        <>
                          <button
                            onClick={updateQuestion}
                            className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
                          >
                            Update Question
                          </button>
                          <button
                            onClick={resetQuestionForm}
                            className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={addQuestion}
                          className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Add Question
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Existing Questions List */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Existing Questions ({questions.length})</h3>
                  </div>
                  <div className="space-y-3">
                    {questions.length === 0 ? (
                      <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-gray-600 font-medium">No questions yet</p>
                        <p className="text-sm text-gray-500 mt-1">Add your first question above</p>
                      </div>
                    ) : (
                      questions.map((q) => {
                        const qType = q.type || (q.codingContent ? 'mcq-coding' : (q.content ? 'content' : 'mcq'));
                        // Find module title - handle both string and ObjectId comparisons
                        const moduleTitle = q.module ? (
                          modules.find(m =>
                            m._id?.toString() === q.module?.toString() ||
                            m._id === q.module ||
                            (typeof q.module === 'string' && m._id?.toString() === q.module)
                          )?.title
                        ) : null;

                        return (
                          <div key={q._id} className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all">
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex-1">
                                {/* Question Type Badge and Module Info */}
                                <div className="flex items-center gap-2 mb-3 flex-wrap">
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${qType === 'mcq' ? 'bg-blue-100 text-blue-700' :
                                    qType === 'content' ? 'bg-purple-100 text-purple-700' :
                                      'bg-green-100 text-green-700'
                                    }`}>
                                    {qType === 'mcq' ? 'MCQ' : qType === 'content' ? 'Content' : 'MCQ + Coding'}
                                  </span>
                                  <span className="flex items-center gap-1 text-sm text-gray-600">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Difficulty: <span className="font-medium capitalize">{q.difficultyLevel || 'easy'}</span>
                                    {q.module && (() => {
                                      // Find module title - check if it's the first module (map to "Print statement...")
                                      let displayTitle = null;
                                      if (modules.length > 0 && q.module === modules[0]._id) {
                                        // It's the first module, show "Print statement..." title
                                        const firstItem = syllabusItems.find(item => item._id === 'first-module');
                                        displayTitle = firstItem?.title || modules[0].title;
                                      } else {
                                        // Regular module lookup
                                        const foundModule = modules.find(m => m._id?.toString() === q.module?.toString() || m._id === q.module);
                                        const foundSyllabus = syllabusItems.find(item => item._id?.toString() === q.module?.toString() || item._id === q.module);
                                        displayTitle = foundModule?.title || foundSyllabus?.title;
                                      }
                                      return displayTitle ? (
                                        <span className="ml-2 text-sm text-gray-600">
                                          • Module: <span className="font-medium text-indigo-700">{displayTitle}</span>
                                        </span>
                                      ) : null;
                                    })()}
                                  </span>
                                </div>

                                {/* MCQ and MCQ-Coding: Show Question Text */}
                                {(qType === 'mcq' || qType === 'mcq-coding') && (
                                  <>
                                    <div className="font-semibold text-gray-900 mb-3">{q.questionText}</div>

                                    {/* MCQ-Coding: Show Coding Content */}
                                    {qType === 'mcq-coding' && q.codingContent && (
                                      <div className="mb-3 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                                        <pre className="whitespace-pre-wrap">{q.codingContent}</pre>
                                      </div>
                                    )}

                                    {/* Show Options */}
                                    {q.options && q.options.length > 0 && (
                                      <div className="space-y-1 mb-3">
                                        {q.options.map((o, idx) => (
                                          <div key={idx} className={`text-sm p-2 rounded ${o.isCorrect ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-gray-50 text-gray-700'}`}>
                                            {o.isCorrect && <span className="font-semibold mr-2">✓</span>}
                                            {o.text}
                                          </div>
                                        ))}
                                      </div>
                                    )}

                                    {q.explanation && (
                                      <div className="mt-3 text-sm text-gray-600 italic bg-blue-50 p-2 rounded border border-blue-100">
                                        <strong>Explanation:</strong> {q.explanation}
                                      </div>
                                    )}
                                  </>
                                )}

                                {/* Content Type: Show Content Items */}
                                {qType === 'content' && q.content && Array.isArray(q.content) && (
                                  <div className="space-y-3">
                                    {q.content.map((item, idx) => (
                                      <div key={idx} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                        {item.title && (
                                          <div className="font-semibold text-gray-900 mb-1">{item.title}</div>
                                        )}
                                        {item.description && (
                                          <div className="text-sm text-gray-700">{item.description}</div>
                                        )}
                                        {item.type && (
                                          <span className="inline-block mt-2 px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                                            {item.type}
                                          </span>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col gap-2">
                                <button
                                  onClick={() => editQuestion(q)}
                                  className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded-lg transition-colors flex items-center gap-2"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                  Edit
                                </button>
                                <button
                                  onClick={() => deleteQuestion(q._id)}
                                  className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 font-medium rounded-lg transition-colors flex items-center gap-2"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
