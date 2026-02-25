import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sidebar } from "../../Components/layout/Sidebar";
import { Card, CardBody } from "../../Components/ui/Card";
import { Button } from "../../Components/ui/Button";
import { Spinner } from "../../Components/ui/Spinner";
import api from "../../lib/api";

	export const ContentCreate = () => {
	  const { moduleId } = useParams();
	  const navigate = useNavigate();
	  const [loading, setLoading] = useState(false);
	  const [module, setModule] = useState(null);
	  const [course, setCourse] = useState(null);
	  // Temporarily saved pieces (text blocks, questions, etc.) that will be
	  // combined into a single lesson when the mentor finally clicks "Add Content".
	  const [tempItems, setTempItems] = useState(() => {
	    const saved = sessionStorage.getItem("tempContentItems");
	    return saved ? JSON.parse(saved) : [];
	  });
	  // Title for the current piece inside the lesson (not the main content title)
	  const [partTitle, setPartTitle] = useState("");
	  // Selected content part type for adding new parts
	  const [selectedPartType, setSelectedPartType] = useState('text-content'); // 'text-content', 'questions', 'coding-questions', 'welcome-content'
	  // Code snippet for coding questions
	  const [codeSnippet, setCodeSnippet] = useState('');
	  // Currently editing item ID (null if creating new)
	  const [editingItemId, setEditingItemId] = useState(null);
	  // Welcome content form fields (simple format)
	  const [welcomeForm, setWelcomeForm] = useState({
	    welcomeTitle: '',
	    welcomeMessage: '',
	    learningTitle: 'What will you learn here?',
	    learningObjectives: '', // Newline-separated list
	    callToActionTitle: '',
	    callToActionText: '',
	    alternativeCourseText: '',
	    alternativeCourseLinkText: '',
	    alternativeCourseLinkUrl: '',
	    alternativeCourseTextAfter: '',
	    commonDoubtsTitle: 'Common doubts',
	    commonDoubts: '', // Newline-separated list
	    showListenButton: true,
	  });
	  const [formData, setFormData] = useState(() => {
	    const saved = sessionStorage.getItem("formData");
	    return saved
	      ? JSON.parse(saved)
	      : {
	          title: "",
	          type: "",
	          description: "",
	          isPublished: true,
	          isFree: false,
	          textContent: "",
	          videoUrl: "",
	          videoProvider: "youtube",
	          videoDuration: 0,
	          linkUrl: "",
	          linkDescription: "",
	          assignmentDescription: "",
	          assignmentDeadline: "",
	          questions: [
	            {
	              question: "",
	              options: [
	                { text: "", isCorrect: false },
	                { text: "", isCorrect: false },
	              ],
	              explanation: "",
	            },
	          ],
	        };
	  });

  useEffect(() => {
    fetchModuleAndCourse();
  }, [moduleId]);

	  useEffect(() => {
	    sessionStorage.setItem("formData", JSON.stringify(formData));
	  }, [formData]);

	  // Persist temporarily saved lesson items so a reload doesn't lose work
	  useEffect(() => {
	    sessionStorage.setItem("tempContentItems", JSON.stringify(tempItems));
	  }, [tempItems]);

	  useEffect(() => {
	    const tempFormData = sessionStorage.getItem("formData");
	    if (tempFormData) {
	      try {
	        setFormData(JSON.parse(tempFormData));
	      } catch (e) {
	        console.error("Failed to parse saved formData", e);
	      }
	    }
	  }, []);

  const fetchModuleAndCourse = async () => {
    try {
      // We'll need to get the module's course info
      // For now, store moduleId and fetch course separately if needed
      setModule({ _id: moduleId });
    } catch (error) {
      console.error("Failed to fetch module:", error);
      alert("Failed to load module");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...formData.options];
    newOptions[index][field] = value;

    // If marking an option as correct, unmark others
    if (field === "isCorrect" && value) {
      newOptions.forEach((opt, i) => {
        if (i !== index) opt.isCorrect = false;
      });
    }

    // NOTE: option changes are handled via question-specific helpers (`updateOption`).
  };

  /* ================= QUESTIONS HANDLERS ================= */

  const addQuestion = () => {
    setFormData((p) => ({
      ...p,
      questions: [
        ...p.questions,
        {
          question: "",
          options: [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
          ],
          explanation: "",
        },
      ],
    }));
  };

  const removeQuestion = (qIndex) => {
    setFormData((p) => ({
      ...p,
      questions: p.questions.filter((_, i) => i !== qIndex),
    }));
  };

  const updateQuestion = (qIndex, value) => {
    const questions = [...formData.questions];
    questions[qIndex].question = value;
    setFormData((p) => ({ ...p, questions }));
  };

  const updateExplanation = (qIndex, value) => {
    const questions = [...formData.questions];
    questions[qIndex].explanation = value;
    setFormData((p) => ({ ...p, questions }));
  };

	  const updateOption = (qIndex, oIndex, field, value) => {
	    const questions = [...formData.questions];

	    if (field === "isCorrect" && value) {
	      questions[qIndex].options.forEach((o) => (o.isCorrect = false));
	    }

	    questions[qIndex].options[oIndex][field] = value;
	    setFormData((p) => ({ ...p, questions }));
	  };

	  const addOption = (qIndex) => {
	    setFormData((prev) => {
	      const questions = [...prev.questions];
	      const opts = questions[qIndex]?.options || [];
	      questions[qIndex] = {
	        ...questions[qIndex],
	        options: [...opts, { text: "", isCorrect: false }],
	      };
	      return { ...prev, questions };
	    });
	  };

	  const removeOption = (qIndex, oIndex) => {
	    setFormData((prev) => {
	      const questions = [...prev.questions];
	      const opts = questions[qIndex]?.options || [];
	      questions[qIndex] = {
	        ...questions[qIndex],
	        options: opts.filter((_, idx) => idx !== oIndex),
	      };
	      return { ...prev, questions };
	    });
	  };

	  // Build payload for a simple, one-piece content (no temporary saved items)
	  const buildSimplePayload = () => {
	    // If welcome-content is selected, use "text" as default type
	    const contentType = selectedPartType === 'welcome-content' ? 'text' : (formData.type || 'text');
	    
	    const payload = {
	      title: formData.title,
	      type: contentType,
	      description: formData.description || '',
	      isPublished: formData.isPublished,
	      isFree: formData.isFree,
	    };

	    // Include welcomeContent if welcome-content is selected
	    if (selectedPartType === 'welcome-content') {
	      const welcomeContentJson = buildWelcomeContent();
	      if (welcomeContentJson) {
	        payload.welcomeContent = welcomeContentJson;
	      }
	      // For welcome content, set textContent to empty string
	      payload.textContent = '';
	      return payload;
	    }

	    switch (formData.type) {
	      case "text":
	        payload.textContent = formData.textContent || '';
	        break;

	      case "video":
	        payload.videoUrl = formData.videoUrl;
	        payload.videoProvider = formData.videoProvider;
	        payload.videoDuration = parseInt(formData.videoDuration) || 0;
	        break;

	      case "link":
	        payload.linkUrl = formData.linkUrl;
	        payload.linkDescription = formData.linkDescription;
	        break;

	      case "question":
	      case "quiz": {
	        // Optional lesson text + questions
	        if (formData.textContent && formData.textContent.trim() !== "") {
	          payload.textContent = formData.textContent;
	        } else {
	          payload.textContent = '';
	        }
	        const cleanedQuestions = (formData.questions || [])
	          .map((q) => ({
	            question: q.question,
	            options: (q.options || []).filter(
	              (opt) => opt.text && opt.text.trim() !== ""
	            ),
	            explanation: q.explanation || "",
	          }))
	          .filter((q) => q.question && q.question.trim() !== "");
		        if (cleanedQuestions.length > 0) {
		          payload.questions = cleanedQuestions;
		        } else {
		          payload.questions = [];
		        }
	        break;
	      }

	      case "assignment":
	        payload.assignmentDescription = formData.assignmentDescription;
	        if (formData.assignmentDeadline) {
	          payload.assignmentDeadline = formData.assignmentDeadline;
	        }
	        break;

	      default:
	        // Default to text type with empty textContent
	        payload.textContent = '';
	        break;
	    }

	    return payload;
	  };

	  // Build payload when mentor has saved multiple pieces (text + questions)
	  // into tempItems. All of them are combined into a single CourseContent.
	  const buildPayloadFromTempItems = () => {
	    const hasQuestions = tempItems.some(
	      (item) => item.type === "question" || item.type === "coding-question" || item.type === "quiz"
	    );

	    // Decide final content type: if any questions exist, treat as question lesson,
	    // otherwise it's a pure text content lesson.
	    const finalType = hasQuestions ? "question" : "text";

	    const textBlocks = tempItems
	      .filter((item) => item.type === "text")
	      .map((item, index) => {
	        if (item.partTitle && item.partTitle.trim() !== "") {
	          return `${index + 1}. ${item.partTitle}\n\n${item.textContent}`;
	        }
	        return item.textContent;
	      });

	    const aggregatedText = textBlocks.join("\n\n\n");

	    const questionBlocks = tempItems
	      .filter((item) => item.type === "question" || item.type === "coding-question" || item.type === "quiz")
	      .map((item) => item.question)
	      .filter(Boolean);

	    const payload = {
	      title: formData.title,
	      type: finalType,
	      description: formData.description,
	      isPublished: formData.isPublished,
	      isFree: formData.isFree,
	    };

	    // Include welcomeContent if welcome-content is selected
	    if (selectedPartType === 'welcome-content') {
	      const welcomeContentJson = buildWelcomeContent();
	      if (welcomeContentJson) {
	        payload.welcomeContent = welcomeContentJson;
	      }
	    }

	    if (aggregatedText && aggregatedText.trim() !== "") {
	      payload.textContent = aggregatedText;
	    }

	    if (questionBlocks.length > 0) {
	      payload.questions = questionBlocks;
	    }

	    return payload;
	  };

  // Helper to check if a question has code snippet (coding question)
  const hasCodeSnippet = (questionText) => {
    if (!questionText) return false;
    return /```[\s\S]*?```/.test(questionText) || /<code>[\s\S]*?<\/code>/.test(questionText);
  };

  // Reset welcome form fields
  const resetWelcomeFormFields = () => {
    setWelcomeForm({
      welcomeTitle: '',
      welcomeMessage: '',
      learningTitle: 'What will you learn here?',
      learningObjectives: '',
      callToActionTitle: '',
      callToActionText: '',
      alternativeCourseText: '',
      alternativeCourseLinkText: '',
      alternativeCourseLinkUrl: '',
      alternativeCourseTextAfter: '',
      commonDoubtsTitle: 'Common doubts',
      commonDoubts: '',
      showListenButton: true,
    });
  };

  // Reset form fields to empty state
  const resetFormFields = () => {
    setPartTitle("");
    setCodeSnippet("");
    setFormData((prev) => ({
      ...prev,
      textContent: "",
      questions: [
        {
          question: "",
          options: [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
          ],
          explanation: "",
        },
      ],
    }));
  };

  // Remove a tempItem
  const removeTempItem = (itemId) => {
    setTempItems((prev) => prev.filter((item) => item.id !== itemId));
    if (editingItemId === itemId) {
      setEditingItemId(null);
      resetFormFields();
    }
  };

  // Load a saved item into the form for editing
  const editTempItem = (itemId) => {
    const item = tempItems.find((i) => i.id === itemId);
    if (!item) return;

    setEditingItemId(itemId);
    setPartTitle(item.partTitle || "");

    if (item.type === "text") {
      setSelectedPartType("text-content");
      setFormData((prev) => ({
        ...prev,
        type: "text",
        textContent: item.textContent || "",
        questions: [
          {
            question: "",
            options: [
              { text: "", isCorrect: false },
              { text: "", isCorrect: false },
            ],
            explanation: "",
          },
        ],
      }));
      setCodeSnippet("");
    } else if (item.type === "question" || item.type === "coding-question") {
      const isCoding = item.type === "coding-question";
      setSelectedPartType(isCoding ? "coding-questions" : "questions");

      // Extract code snippet if it's a coding question
      let questionText = item.question?.question || "";
      let extractedCode = "";

      if (isCoding && questionText) {
        const codeBlockMatch = questionText.match(/```[\s\S]*?```/);
        if (codeBlockMatch) {
          extractedCode = codeBlockMatch[0].replace(/```/g, "").trim();
          questionText = questionText.replace(/```[\s\S]*?```/g, "").trim();
        }
      }

      setCodeSnippet(extractedCode);

      if (item.question && item.question.question) {
        setFormData((prev) => ({
          ...prev,
          type: isCoding ? "question" : "question",
          textContent: "",
          questions: [
            {
              question: questionText,
              explanation: item.question.explanation || "",
              options: item.question.options || [
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
              ],
            },
          ],
        }));
      }
    }
  };

  // Cancel editing and reset form
  const cancelEdit = () => {
    setEditingItemId(null);
    resetFormFields();
    // Also reset welcome form if we were editing welcome content
    if (selectedPartType === 'welcome-content') {
      resetWelcomeFormFields();
    }
  };

  // Build welcomeContent JSON from simple form fields
  const buildWelcomeContent = () => {
    const welcomeData = {};
    
    if (welcomeForm.welcomeTitle.trim()) {
      welcomeData.welcomeTitle = welcomeForm.welcomeTitle.trim();
    }
    if (welcomeForm.welcomeMessage.trim()) {
      welcomeData.welcomeMessage = welcomeForm.welcomeMessage.trim();
    }
    if (welcomeForm.learningTitle.trim() && welcomeForm.learningTitle !== 'What will you learn here?') {
      welcomeData.learningTitle = welcomeForm.learningTitle.trim();
    }
    if (welcomeForm.learningObjectives.trim()) {
      welcomeData.learningObjectives = welcomeForm.learningObjectives
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
    }
    if (welcomeForm.callToActionTitle.trim()) {
      welcomeData.callToActionTitle = welcomeForm.callToActionTitle.trim();
    }
    if (welcomeForm.callToActionText.trim()) {
      welcomeData.callToActionText = welcomeForm.callToActionText.trim();
    }
    if (welcomeForm.alternativeCourseText.trim() || welcomeForm.alternativeCourseLinkText.trim()) {
      welcomeData.alternativeCourse = {
        text: welcomeForm.alternativeCourseText.trim(),
        linkText: welcomeForm.alternativeCourseLinkText.trim(),
        linkUrl: welcomeForm.alternativeCourseLinkUrl.trim() || '#',
        textAfter: welcomeForm.alternativeCourseTextAfter.trim(),
      };
    }
    if (welcomeForm.commonDoubtsTitle.trim() && welcomeForm.commonDoubtsTitle !== 'Common doubts') {
      welcomeData.commonDoubtsTitle = welcomeForm.commonDoubtsTitle.trim();
    }
    if (welcomeForm.commonDoubts.trim()) {
      welcomeData.commonDoubts = welcomeForm.commonDoubts
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
    }
    if (welcomeForm.showListenButton === false) {
      welcomeData.showListenButton = false;
    }
    
    // Only return if there's at least one field with content
    if (Object.keys(welcomeData).length > 0) {
      return JSON.stringify(welcomeData);
    }
    return null;
  };

	  // Save the current piece (text content or question block) temporarily into
	  // tempItems. Later, when the mentor clicks "Add Content", all tempItems
	  // are combined into a single payload and sent to the backend.
	  const handleSaveTempPart = () => {
	    if (!formData.title || formData.title.trim() === "") {
	      alert("Please enter the main Content Title first.");
	      return;
	    }

	    if (selectedPartType === "text-content") {
	      if (!formData.textContent || formData.textContent.trim() === "") {
	        alert("Please enter some text content to save.");
	        return;
	      }

	      const newItem = {
	        id: editingItemId || `${Date.now()}-text`,
	        type: "text",
	        partTitle: partTitle.trim(),
	        textContent: formData.textContent,
	      };

	      if (editingItemId) {
	        setTempItems((prev) =>
	          prev.map((item) => (item.id === editingItemId ? newItem : item))
	        );
	        alert("Text content updated successfully.");
	      } else {
	        const updated = [...tempItems, newItem];
	        setTempItems(updated);
	        alert("Text content saved temporarily. It will be added when you click 'Add Content'.");
	      }

	      setEditingItemId(null);
	      resetFormFields();
	      return;
	    }

	    if (selectedPartType === "questions" || selectedPartType === "coding-questions") {
	      if (selectedPartType === "coding-questions" && (!codeSnippet || codeSnippet.trim() === "")) {
	        alert("Please enter a code snippet for coding questions.");
	        return;
	      }

	      const cleanedQuestions = (formData.questions || [])
	        .map((q) => {
	          let questionText = q.question;
	          if (selectedPartType === "coding-questions" && codeSnippet && codeSnippet.trim() !== "") {
	            questionText = `${questionText}\n\n\`\`\`\n${codeSnippet}\n\`\`\``;
	          }
	          return {
	            question: questionText,
	            options: (q.options || []).filter(
	              (opt) => opt.text && opt.text.trim() !== ""
	            ),
	            explanation: q.explanation || "",
	          };
	        })
	        .filter(
	          (q) =>
	            q.question &&
	            q.question.trim() !== "" &&
	            Array.isArray(q.options) &&
	            q.options.length >= 2
	        );

	      if (cleanedQuestions.length === 0) {
	        alert("Please add at least one valid question (with options) to save.");
	        return;
	      }

	      if (editingItemId) {
	        const updatedItem = {
	          id: editingItemId,
	          type: selectedPartType === "coding-questions" ? "coding-question" : "question",
	          partTitle: partTitle.trim(),
	          question: cleanedQuestions[0],
	        };
	        setTempItems((prev) =>
	          prev.map((item) => (item.id === editingItemId ? updatedItem : item))
	        );
	        alert("Question updated successfully.");
	        setEditingItemId(null);
	        resetFormFields();
	      } else {
	        const newItems = cleanedQuestions.map((q, idx) => ({
	          id: `${Date.now()}-q-${idx}`,
	          type: selectedPartType === "coding-questions" ? "coding-question" : "question",
	          partTitle: partTitle.trim(),
	          question: q,
	        }));

	        const updated = [...tempItems, ...newItems];
	        setTempItems(updated);
	        alert("Question(s) saved temporarily. They will be added when you click 'Add Content'.");
	        resetFormFields();
	      }
	      return;
	    }

	    alert("Temporary save is currently supported only for Text and Question/Quiz types.");
	  };

	  const handleSubmit = async (e) => {
	    e.preventDefault();

	    // Validate required fields
	    if (!formData.title || formData.title.trim() === '') {
	      alert('Please enter a Content Title');
	      return;
	    }

	    // If welcome-content is selected, validate that welcome content has data
	    if (selectedPartType === 'welcome-content') {
	      const welcomeContentJson = buildWelcomeContent();
	      if (!welcomeContentJson) {
	        alert('Please fill in at least one field in the Welcome Content section');
	        return;
	      }
	    }

	    setLoading(true);
	    try {
	      const hasTempItems = tempItems.length > 0;
	      const payload = hasTempItems
	        ? buildPayloadFromTempItems()
	        : buildSimplePayload();

	      console.log('Submitting payload:', payload);
	      await api.post(`/modules/${moduleId}/content`, payload);

	      alert("Content added successfully!");
	      // Clear any cached data so the next content starts fresh
	      sessionStorage.removeItem("formData");
	      sessionStorage.removeItem("tempContentItems");
	      setTempItems([]);
	      navigate(-1);
	    } catch (error) {
	      console.error("Failed to add content:", error);
	      alert(error.response?.data?.message || "Failed to add content");
	    } finally {
	      setLoading(false);
	    }
	  };

	  // For text content: save and immediately allow creating another text content
	  const handleSubmitAndAddAnother = async (e) => {
	    e.preventDefault();

	    // If user is using the temporary multi-part flow, we shouldn't chain
	    // "Add & Create Another" because this lesson might already contain
	    // multiple pieces.
	    if (tempItems.length > 0) {
	      return handleSubmit(e);
	    }

	    if (formData.type !== "text") {
	      return handleSubmit(e);
	    }

	    setLoading(true);
	    try {
	      const payload = buildSimplePayload();
	      await api.post(`/modules/${moduleId}/content`, payload);

	      alert("Content added successfully! You can add another text content.");

	      // Reset only the text-related fields so mentor can quickly add another
	      setFormData((prev) => ({
	        ...prev,
	        title: "",
	        description: "",
	        textContent: "",
	      }));
	    } catch (error) {
	      console.error("Failed to add content:", error);
	      alert(error.response?.data?.message || "Failed to add content");
	    } finally {
	      setLoading(false);
	    }
	  };


  if (!module) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex justify-center items-center">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Add Content</h1>
            <p className="text-gray-600 mt-2">Add new content to module</p>
          </div>

          <Card>
            <CardBody>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
	            disabled={tempItems.length > 0}
	            required
                    minLength={3}
                  />
	          {tempItems.length > 0 && (
	            <p className="mt-1 text-xs text-gray-500">
	              Content Title is fixed for this lesson. You can add more text or
	              questions below, then click "Add Content" once to save
	              everything together.
	            </p>
	          )}
                </div>

                {/* Content Part Type Selector Dropdown - For adding parts */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Content Type to Add
                  </label>
                  <select
                    value={selectedPartType}
                    onChange={(e) => {
                      const newType = e.target.value;
                      // Reset welcome form if switching away from welcome-content
                      if (selectedPartType === 'welcome-content' && newType !== 'welcome-content') {
                        resetWelcomeFormFields();
                      }
                      // Reset text content form if switching away from text-content
                      if (selectedPartType === 'text-content' && newType !== 'text-content') {
                        setFormData((prev) => ({ ...prev, textContent: '' }));
                        setPartTitle('');
                      }
                      // Reset welcome form if switching to text-content (to ensure isolation)
                      if (newType === 'text-content' && selectedPartType === 'welcome-content') {
                        resetWelcomeFormFields();
                      }
                      setSelectedPartType(newType);
                      setEditingItemId(null);
                      resetFormFields();
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="text-content">Text Content</option>
                    <option value="questions">Questions (MCQ)</option>
                    <option value="coding-questions">Coding Questions (MCQ with Code)</option>
                    <option value="welcome-content">Welcome Content</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

	        {/* Title for the current part/section inside this content */}
	        <div>
	          <label className="block text-sm font-medium text-gray-700 mb-2">
	            Title for this part
	          </label>
	          <input
	            type="text"
	            value={partTitle}
	            onChange={(e) => setPartTitle(e.target.value)}
	            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
	            placeholder="e.g. Introduction, Example 1, Practice Question Set"
	          />
	          <p className="mt-1 text-xs text-gray-500">
	            This is the heading for the specific text block or question set you are
	            adding inside this content.
	          </p>
	        </div>

	        {/* Overview of all temporarily saved parts for this content */}
	        {tempItems.length > 0 && (
	          <div className="border rounded-lg p-4 bg-gray-50">
	            <div className="font-medium text-sm mb-3">
	              Saved parts for this content ({tempItems.length}):
	            </div>
	            <ul className="space-y-2 text-sm">
	              {tempItems.map((item, idx) => {
	                let displayTitle = '';
	                if (item.type === 'text') {
	                  displayTitle = item.partTitle || 'Text Content';
	                  if (!item.partTitle && item.textContent) {
	                    const preview = item.textContent.substring(0, 50).trim();
	                    displayTitle = preview ? `${preview}...` : 'Text Content';
	                  }
	                } else if (item.type === 'coding-question') {
	                  displayTitle = item.partTitle || 'Coding Question';
	                  if (!item.partTitle && item.question?.question) {
	                    const preview = item.question.question.replace(/```[\s\S]*?```/g, '').substring(0, 50).trim();
	                    displayTitle = preview ? `${preview}...` : 'Coding Question';
	                  }
	                } else if (item.type === 'question') {
	                  displayTitle = item.partTitle || 'Question';
	                  if (!item.partTitle && item.question?.question) {
	                    const preview = item.question.question.substring(0, 50).trim();
	                    displayTitle = preview ? `${preview}...` : 'Question';
	                  }
	                }

	                return (
	                  <li key={item.id} className={`flex justify-between items-center p-3 rounded border ${editingItemId === item.id ? 'bg-blue-100 border-blue-300' : 'bg-white border-gray-200'}`}>
	                    <span className="flex-1">
	                      <span className="font-medium">
	                        {idx + 1}. 
	                        <span className="ml-2 px-2 py-0.5 rounded text-xs bg-gray-200">
	                          {item.type === 'coding-question' ? 'Coding Question' : item.type === 'text' ? 'Text' : 'Question'}
	                        </span>
	                      </span>
	                      <span className="ml-2">{displayTitle}</span>
	                      {editingItemId === item.id && (
	                        <span className="ml-2 text-blue-600 text-xs font-medium">(Editing...)</span>
	                      )}
	                    </span>
	                    <div className="flex gap-2 ml-4">
	                      <button
	                        type="button"
	                        onClick={() => editTempItem(item.id)}
	                        className="text-blue-500 text-xs hover:text-blue-700 px-3 py-1 border border-blue-300 rounded hover:bg-blue-50"
	                        disabled={editingItemId === item.id}
	                      >
	                        {editingItemId === item.id ? 'Editing' : 'Edit'}
	                      </button>
	                      <button
	                        type="button"
	                        onClick={() => removeTempItem(item.id)}
	                        className="text-red-500 text-xs hover:text-red-700 px-3 py-1 border border-red-300 rounded hover:bg-red-50"
	                      >
	                        Remove
	                      </button>
	                    </div>
	                  </li>
	                );
	              })}
	            </ul>
	          </div>
	        )}

	        {/* Show cancel edit button when editing */}
	        {editingItemId && (
	          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
	            <div className="flex justify-between items-center">
	              <span className="text-sm text-blue-700">
	                You are editing a saved part. Make your changes and click "Save this part" to update it.
	              </span>
	              <button
	                type="button"
	                onClick={cancelEdit}
	                className="text-sm text-blue-600 hover:text-blue-800 underline"
	              >
	                Cancel Edit
	              </button>
	            </div>
	          </div>
	        )}

	                {/* Show fields based on selected part type */}
	                {selectedPartType === 'text-content' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description / Text Content *
                    </label>
                    <textarea
                      name="textContent"
                      value={formData.textContent}
                      onChange={handleChange}
                      rows={10}
	                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
	                  required
	                  placeholder="Enter your text content here..."
                    />
                  </div>
                )}


	                {formData.type === "video" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Video URL *
                      </label>
                      <input
                        type="url"
                        name="videoUrl"
                        value={formData.videoUrl}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        required
                        placeholder="https://youtube.com/watch?v=..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Video Provider
                      </label>
                      <select
                        name="videoProvider"
                        value={formData.videoProvider}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="youtube">YouTube</option>
                        <option value="vimeo">Vimeo</option>
                        <option value="custom">Custom/Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Video Duration (seconds)
                      </label>
                      <input
                        type="number"
                        name="videoDuration"
                        value={formData.videoDuration}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        min={0}
                      />
                    </div>
                  </>
                )}

	                {formData.type === "link" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Link URL *
                      </label>
                      <input
                        type="url"
                        name="linkUrl"
                        value={formData.linkUrl}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        required
                        placeholder="https://example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Link Description
                      </label>
                      <textarea
                        name="linkDescription"
                        value={formData.linkDescription}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        placeholder="Describe what this link is about..."
                      />
                    </div>
                  </>
                )}

	      {/* QUESTIONS / QUIZ - Show when selectedPartType is questions or coding-questions */}
	      {(selectedPartType === "questions" || selectedPartType === "coding-questions") && (
	        <>
	          {/* Code snippet area for coding questions */}
	          {selectedPartType === 'coding-questions' && (
	            <div>
	              <label className="block text-sm font-medium text-gray-700 mb-2">
	                Code Snippet *
	              </label>
	              <textarea
	                rows={8}
	                value={codeSnippet}
	                onChange={(e) => setCodeSnippet(e.target.value)}
	                required
	                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-primary-500"
	                placeholder="Enter code snippet here (will be added to all questions in this set)..."
	              />
	              <p className="mt-1 text-xs text-gray-500">
	                This code snippet will be included with each question in this set.
	              </p>
	            </div>
	          )}

	          {formData.questions.map((q, qi) => (
	            <div key={qi} className="border p-4 rounded space-y-3">
	              <textarea
	                value={q.question}
	                onChange={(e) => updateQuestion(qi, e.target.value)}
	                placeholder={`Question ${qi + 1}`}
	                className="w-full p-2 border rounded"
	                required
	              />

	              {q.options.map((o, oi) => (
	                <div key={oi} className="flex gap-2">
	                  <input
	                    value={o.text}
	                    onChange={(e) =>
	                      updateOption(qi, oi, "text", e.target.value)
	                    }
	                    className="flex-1 p-2 border rounded"
	                    placeholder={`Option ${oi + 1}`}
	                  />
	                  <input
	                    type="checkbox"
	                    checked={o.isCorrect}
	                    onChange={(e) =>
	                      updateOption(
	                        qi,
	                        oi,
	                        "isCorrect",
	                        e.target.checked
	                      )
	                    }
	                  />
	                  {q.options.length > 2 && (
	                    <button
	                      type="button"
	                      onClick={() => removeOption(qi, oi)}
	                      className="text-red-500"
	                    >
	                      ✕
	                    </button>
	                  )}
	                </div>
	              ))}

	              <button
	                type="button"
	                onClick={() => addOption(qi)}
	                className="text-sm text-blue-600"
	              >
	                + Add Option
	              </button>

	              <textarea
	                value={q.explanation}
	                onChange={(e) => updateExplanation(qi, e.target.value)}
	                placeholder="Explanation (optional)"
	                className="w-full p-2 border rounded"
	              />

	              {formData.questions.length > 1 && (
	                <button
	                  type="button"
	                  onClick={() => removeQuestion(qi)}
	                  className="text-red-600 text-sm"
	                >
	                  Remove Question
	                </button>
	              )}
	            </div>
	          ))}

	          <Button type="button" onClick={addQuestion}>
	            + Add Question
	          </Button>
	        </>
	      )}

	      {/* Welcome Content Fields */}
	      {selectedPartType === 'welcome-content' && (
	        <>
	          <div className="space-y-4">
	            <div>
	              <label className="block text-sm font-medium text-gray-700 mb-2">
	                Welcome Title
	              </label>
	              <input
	                type="text"
	                value={welcomeForm.welcomeTitle}
	                onChange={(e) => setWelcomeForm(prev => ({ ...prev, welcomeTitle: e.target.value }))}
	                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
	                placeholder="e.g., Welcome!"
	              />
	            </div>

	            <div>
	              <label className="block text-sm font-medium text-gray-700 mb-2">
	                Welcome Message
	              </label>
	              <textarea
	                rows={3}
	                value={welcomeForm.welcomeMessage}
	                onChange={(e) => setWelcomeForm(prev => ({ ...prev, welcomeMessage: e.target.value }))}
	                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
	                placeholder="e.g., Welcome to the course on learning Python!"
	              />
	            </div>

	            <div>
	              <label className="block text-sm font-medium text-gray-700 mb-2">
	                Learning Section Title
	              </label>
	              <input
	                type="text"
	                value={welcomeForm.learningTitle}
	                onChange={(e) => setWelcomeForm(prev => ({ ...prev, learningTitle: e.target.value }))}
	                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
	                placeholder="What will you learn here?"
	              />
	            </div>

	            <div>
	              <label className="block text-sm font-medium text-gray-700 mb-2">
	                Learning Objectives (one per line)
	              </label>
	              <textarea
	                rows={4}
	                value={welcomeForm.learningObjectives}
	                onChange={(e) => setWelcomeForm(prev => ({ ...prev, learningObjectives: e.target.value }))}
	                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
	                placeholder="All the basic concepts of Python programming language&#10;By the end of this course, you will be able to write code in Python"
	              />
	              <p className="mt-1 text-xs text-gray-500">Enter each learning objective on a new line</p>
	            </div>

	            <div>
	              <label className="block text-sm font-medium text-gray-700 mb-2">
	                Call to Action Title
	              </label>
	              <input
	                type="text"
	                value={welcomeForm.callToActionTitle}
	                onChange={(e) => setWelcomeForm(prev => ({ ...prev, callToActionTitle: e.target.value }))}
	                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
	                placeholder="e.g., Let the fun begin!"
	              />
	            </div>

	            <div>
	              <label className="block text-sm font-medium text-gray-700 mb-2">
	                Call to Action Text
	              </label>
	              <textarea
	                rows={2}
	                value={welcomeForm.callToActionText}
	                onChange={(e) => setWelcomeForm(prev => ({ ...prev, callToActionText: e.target.value }))}
	                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
	                placeholder="e.g., Click on Next on the right hand side to start."
	              />
	            </div>

	            <div className="border-t pt-4">
	              <h4 className="text-sm font-semibold mb-3">Alternative Course Suggestion (Optional)</h4>
	              <div className="space-y-3">
	                <div>
	                  <label className="block text-sm font-medium text-gray-700 mb-2">
	                    Text Before Link
	                  </label>
	                  <input
	                    type="text"
	                    value={welcomeForm.alternativeCourseText}
	                    onChange={(e) => setWelcomeForm(prev => ({ ...prev, alternativeCourseText: e.target.value }))}
	                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
	                    placeholder="e.g., If you already know the basic syntax of Python you will find our"
	                  />
	                </div>
	                <div>
	                  <label className="block text-sm font-medium text-gray-700 mb-2">
	                    Link Text
	                  </label>
	                  <input
	                    type="text"
	                    value={welcomeForm.alternativeCourseLinkText}
	                    onChange={(e) => setWelcomeForm(prev => ({ ...prev, alternativeCourseLinkText: e.target.value }))}
	                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
	                    placeholder="e.g., Logic building in Python course"
	                  />
	                </div>
	                <div>
	                  <label className="block text-sm font-medium text-gray-700 mb-2">
	                    Link URL
	                  </label>
	                  <input
	                    type="text"
	                    value={welcomeForm.alternativeCourseLinkUrl}
	                    onChange={(e) => setWelcomeForm(prev => ({ ...prev, alternativeCourseLinkUrl: e.target.value }))}
	                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
	                    placeholder="e.g., # or full URL"
	                  />
	                </div>
	                <div>
	                  <label className="block text-sm font-medium text-gray-700 mb-2">
	                    Text After Link
	                  </label>
	                  <input
	                    type="text"
	                    value={welcomeForm.alternativeCourseTextAfter}
	                    onChange={(e) => setWelcomeForm(prev => ({ ...prev, alternativeCourseTextAfter: e.target.value }))}
	                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
	                    placeholder="e.g., more appropriate to your level."
	                  />
	                </div>
	              </div>
	            </div>

	            <div className="border-t pt-4">
	              <h4 className="text-sm font-semibold mb-3">Common Doubts (Optional)</h4>
	              <div>
	                <label className="block text-sm font-medium text-gray-700 mb-2">
	                  Section Title
	                </label>
	                <input
	                  type="text"
	                  value={welcomeForm.commonDoubtsTitle}
	                  onChange={(e) => setWelcomeForm(prev => ({ ...prev, commonDoubtsTitle: e.target.value }))}
	                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
	                  placeholder="Common doubts"
	                />
	              </div>
	              <div className="mt-3">
	                <label className="block text-sm font-medium text-gray-700 mb-2">
	                  Doubts (one per line)
	                </label>
	                <textarea
	                  rows={3}
	                  value={welcomeForm.commonDoubts}
	                  onChange={(e) => setWelcomeForm(prev => ({ ...prev, commonDoubts: e.target.value }))}
	                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
	                  placeholder="How long will this course take?&#10;What is the difficulty level?&#10;Are there any prerequisites?"
	                />
	                <p className="mt-1 text-xs text-gray-500">Enter each doubt on a new line</p>
	              </div>
	            </div>

	            <div>
	              <label className="flex items-center gap-2 text-sm">
	                <input
	                  type="checkbox"
	                  checked={welcomeForm.showListenButton}
	                  onChange={(e) => setWelcomeForm(prev => ({ ...prev, showListenButton: e.target.checked }))}
	                />
	                Show "Listen" Button
	              </label>
	            </div>
	          </div>

	          {/* Info message for welcome content */}
	          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
	            <p className="text-sm text-blue-800">
	              <strong>Note:</strong> Welcome content will be saved automatically when you click "Add Content" at the bottom of the form.
	              This content will be displayed on the first chapter page (q=0).
	            </p>
	          </div>
	        </>
	      )}

                {formData.type === "assignment" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Assignment Description *
                      </label>
                      <textarea
                        name="assignmentDescription"
                        value={formData.assignmentDescription}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        required
                        placeholder="Describe the assignment requirements..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Deadline (Optional)
                      </label>
                      <input
                        type="datetime-local"
                        name="assignmentDeadline"
                        value={formData.assignmentDeadline}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </>
                )}

	      {/* Save this part button - shown for text-content, questions, and coding-questions */}
	      {(selectedPartType === 'text-content' || selectedPartType === 'questions' || selectedPartType === 'coding-questions') && (
	      <div className="flex justify-end gap-2">
	        {editingItemId && (
	          <Button
	            type="button"
	            variant="secondary"
	            disabled={loading}
	            onClick={cancelEdit}
	          >
	            Cancel Edit
	          </Button>
	        )}
	        <Button
	          type="button"
	          variant="secondary"
	          disabled={loading}
	          onClick={handleSaveTempPart}
	        >
	          {editingItemId ? 'Update this part' : 'Save this part to lesson (temporary)'}
	        </Button>
	      </div>
	      )}

	      {/* Settings */}
	      <div className="flex gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isPublished"
                      checked={formData.isPublished}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Published
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isFree"
                      checked={formData.isFree}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Free Preview (accessible without enrollment)
                    </span>
                  </label>
                </div>

	      {/* Submit */}
	      <div className="flex gap-4 flex-wrap">
	        {/* Text-only content: original flow with optional chaining */}
	        {formData.type === "text" && (
	          <>
	            <Button type="submit" disabled={loading} className="flex-1">
	              {loading ? "Adding..." : "Add Content"}
	            </Button>
	            <Button
	              type="button"
	              disabled={loading || tempItems.length > 0}
	              onClick={handleSubmitAndAddAnother}
	              className="flex-1"
	            >
	              {loading ? "Adding..." : "Add & Create Another"}
	            </Button>
	          </>
	        )}

	        {/* Other types (including question/quiz when not using multi-part) */}
	        {formData.type !== "text" && (
	          <Button type="submit" disabled={loading} className="flex-1">
	            {loading ? "Saving..." : "Add Content"}
	          </Button>
	        )}

	        <Button
	          type="button"
	          variant="secondary"
	          onClick={() => window.history.back()}
	          className="flex-1"
	        >
	          Cancel
	        </Button>
	      </div>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
