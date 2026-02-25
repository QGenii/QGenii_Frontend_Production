import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardBody } from '../../Components/ui/Card';
import { Button } from '../../Components/ui/Button';
import { Spinner } from '../../Components/ui/Spinner';
import api from '../../lib/api';

export default function ContentEdit() {
  const { contentId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    isPublished: true,
    isFree: false,
    type: 'text',
    textContent: '',
    videoUrl: '',
    questions: [],
  });
  
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
  // Temporarily saved pieces (text blocks, questions, etc.) that will be
  // combined into the content when the mentor finally clicks "Save Changes".
  const [tempItems, setTempItems] = useState([]);
  // Title for the current piece inside the content (not the main content title)
  const [partTitle, setPartTitle] = useState("");
  // Selected content part type for adding new parts
  const [selectedPartType, setSelectedPartType] = useState('text-content'); // 'text-content', 'questions', 'coding-questions', 'welcome-content'
  // Code snippet for coding questions
  const [codeSnippet, setCodeSnippet] = useState('');
  // Currently editing item ID (null if creating new)
  const [editingItemId, setEditingItemId] = useState(null);
  // Ref to scroll to form when editing
  const formRef = useRef(null);

  // Persist temporarily saved items so a reload doesn't lose work
  useEffect(() => {
    sessionStorage.setItem(`tempContentItems_${contentId}`, JSON.stringify(tempItems));
  }, [tempItems, contentId]);

  // Parse existing content into tempItems format
  const parseContentIntoParts = (c) => {
    const parts = [];
    let itemCounter = 0;

    // Parse textContent if it exists
    if (c.textContent && c.textContent.trim() !== '') {
      // Split by triple newlines (how multi-part content is stored)
      const textSections = c.textContent.split(/\n{3,}/);
      
      textSections.forEach((section) => {
        const trimmed = section.trim();
        if (trimmed.length > 0) {
          // Try to extract title if format is "1. Title\n\nContent"
          const titleMatch = trimmed.match(/^\d+\.\s+(.+?)\n\n(.+)$/s);
          let partTitle = '';
          let textContent = trimmed;

          if (titleMatch) {
            partTitle = titleMatch[1].trim();
            textContent = titleMatch[2].trim();
          }

          parts.push({
            id: `existing-text-${itemCounter++}`,
            type: 'text',
            partTitle: partTitle,
            textContent: textContent,
          });
        }
      });
    }

    // Parse questions if they exist
    if (c.questions && Array.isArray(c.questions) && c.questions.length > 0) {
      c.questions.forEach((q) => {
        if (q.question && q.question.trim() !== '') {
          // Check if it's a coding question (has code blocks)
          const hasCode = /```[\s\S]*?```/.test(q.question);
          
          parts.push({
            id: `existing-q-${itemCounter++}`,
            type: hasCode ? 'coding-question' : 'question',
            partTitle: '', // Questions don't have part titles in the saved format
            question: {
              id: q.id,
              question: q.question || '',
              explanation: q.explanation || '',
              options: q.options && q.options.length
                ? q.options.map((o) => ({
                    text: o.text || '',
                    isCorrect: !!o.isCorrect,
                  }))
                : [],
            },
          });
        }
      });
    }

    return parts;
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/content/${contentId}`);
        const c = res.data.data.content || res.data.data;

        setContent(c); // keep full content object for type-specific rendering

        // Check if we already have tempItems in sessionStorage (user was editing)
        const savedTempItems = sessionStorage.getItem(`tempContentItems_${contentId}`);
        let shouldParseFromContent = true;
        
        if (savedTempItems) {
          // If sessionStorage has items, use those (user is in the middle of editing)
          try {
            const parsed = JSON.parse(savedTempItems);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setTempItems(parsed);
              shouldParseFromContent = false; // Don't parse from content if we have saved items
            }
          } catch (e) {
            console.error('Failed to parse saved tempItems', e);
            // If parsing fails, fall through to parse from content
            shouldParseFromContent = true;
          }
        }
        
        // If no saved tempItems or saved items were empty, parse from existing content
        if (shouldParseFromContent && (c.textContent || (c.questions && c.questions.length > 0))) {
          const parsedParts = parseContentIntoParts(c);
          if (parsedParts.length > 0) {
            setTempItems(parsedParts);
            // Save to sessionStorage so it persists
            sessionStorage.setItem(`tempContentItems_${contentId}`, JSON.stringify(parsedParts));
          }
        }

        setForm({
          title: c.title || '',
          description: c.description || '',
          isPublished: c.isPublished,
          isFree: c.isFree,
          type: c.type,
          textContent: '', // Don't pre-fill since we're showing parts instead
          videoUrl: c.videoUrl || '',
          questions: [], // Don't pre-fill since we're showing parts instead
        });
        
        // Parse welcomeContent into simple form fields
        let parsedWelcome = null;
        if (c.welcomeContent) {
          if (typeof c.welcomeContent === 'string') {
            try {
              parsedWelcome = JSON.parse(c.welcomeContent);
            } catch (e) {
              // If not JSON, treat as plain text
              parsedWelcome = { welcomeMessage: c.welcomeContent };
            }
          } else if (typeof c.welcomeContent === 'object') {
            parsedWelcome = c.welcomeContent;
          }
        }
        
        if (parsedWelcome) {
          setWelcomeForm({
            welcomeTitle: parsedWelcome.welcomeTitle || '',
            welcomeMessage: parsedWelcome.welcomeMessage || '',
            learningTitle: parsedWelcome.learningTitle || 'What will you learn here?',
            learningObjectives: Array.isArray(parsedWelcome.learningObjectives) 
              ? parsedWelcome.learningObjectives.join('\n') 
              : (parsedWelcome.learningObjectives || ''),
            callToActionTitle: parsedWelcome.callToActionTitle || '',
            callToActionText: parsedWelcome.callToActionText || '',
            alternativeCourseText: parsedWelcome.alternativeCourse?.text || '',
            alternativeCourseLinkText: parsedWelcome.alternativeCourse?.linkText || '',
            alternativeCourseLinkUrl: parsedWelcome.alternativeCourse?.linkUrl || '',
            alternativeCourseTextAfter: parsedWelcome.alternativeCourse?.textAfter || '',
            commonDoubtsTitle: parsedWelcome.commonDoubtsTitle || 'Common doubts',
            commonDoubts: Array.isArray(parsedWelcome.commonDoubts)
              ? parsedWelcome.commonDoubts.join('\n')
              : (parsedWelcome.commonDoubts || ''),
            showListenButton: parsedWelcome.showListenButton !== false,
          });
        }
      } catch (e) {
        console.error('Failed to load content', e);
        alert('Failed to load content');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [contentId]);

  const updateField = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

	  // ===== Question helpers (mirror create UI) =====
  const addQuestion = () => {
    setForm((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          id: undefined,
          question: '',
          explanation: '',
          options: [
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
          ],
        },
      ],
    }));
  };

  const removeQuestion = (qIndex) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== qIndex),
    }));
  };

  const updateQuestion = (qIndex, value) => {
    setForm((prev) => {
      const questions = [...prev.questions];
      questions[qIndex] = { ...questions[qIndex], question: value };
      return { ...prev, questions };
    });
  };

  const updateExplanation = (qIndex, value) => {
    setForm((prev) => {
      const questions = [...prev.questions];
      questions[qIndex] = { ...questions[qIndex], explanation: value };
      return { ...prev, questions };
    });
  };

  const addOption = (qIndex) => {
    setForm((prev) => {
      const questions = [...prev.questions];
      const options = [
        ...questions[qIndex].options,
        { text: '', isCorrect: false },
      ];
      questions[qIndex] = { ...questions[qIndex], options };
      return { ...prev, questions };
    });
  };

  const removeOption = (qIndex, oIndex) => {
    setForm((prev) => {
      const questions = [...prev.questions];
      const options = questions[qIndex].options.filter((_, i) => i !== oIndex);
      questions[qIndex] = { ...questions[qIndex], options };
      return { ...prev, questions };
    });
  };

  const updateOption = (qIndex, oIndex, field, value) => {
    setForm((prev) => {
      const questions = [...prev.questions];
      const options = [...questions[qIndex].options];

      if (field === 'isCorrect' && value) {
        // only one correct option per question
        options.forEach((opt, idx) => {
          options[idx] = { ...opt, isCorrect: idx === oIndex };
        });
      }

      options[oIndex] = {
        ...options[oIndex],
        [field]: value,
      };

      questions[qIndex] = { ...questions[qIndex], options };
      return { ...prev, questions };
    });
  };

  // Save the current piece (text content or question block) temporarily into
  // tempItems. Later, when the mentor clicks "Save Changes", all tempItems
  // are combined into the content.
  const handleSaveTempPart = () => {
    if (!form.title || form.title.trim() === "") {
      alert("Please enter the Content Title first.");
      return;
    }

    if (selectedPartType === "text-content") {
      if (!form.textContent || form.textContent.trim() === "") {
        alert("Please enter some text content to save.");
        return;
      }

      const newItem = {
        id: editingItemId || `${Date.now()}-text`,
        type: "text",
        partTitle: partTitle.trim(),
        textContent: form.textContent,
      };

      if (editingItemId) {
        // Update existing item
        setTempItems((prev) =>
          prev.map((item) => (item.id === editingItemId ? newItem : item))
        );
        alert("Text content updated successfully.");
      } else {
        // Add new item
        const updated = [...tempItems, newItem];
        setTempItems(updated);
        alert("Text content saved temporarily. It will be added when you click 'Save Changes'.");
      }

      setEditingItemId(null);
      resetFormFields();
      return;
    }

    if (selectedPartType === "questions" || selectedPartType === "coding-questions") {
      // For coding questions, validate code snippet
      if (selectedPartType === "coding-questions" && (!codeSnippet || codeSnippet.trim() === "")) {
        alert("Please enter a code snippet for coding questions.");
        return;
      }

      const cleanedQuestions = (form.questions || [])
        .map((q) => {
          let questionText = q.question;
          // For coding questions, prepend code snippet to question
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
        // Update existing item (handle single question for editing)
        const updatedItem = {
          id: editingItemId,
          type: selectedPartType === "coding-questions" ? "coding-question" : "question",
          partTitle: partTitle.trim(),
          question: cleanedQuestions[0], // When editing, we update the first (and likely only) question
        };
        setTempItems((prev) =>
          prev.map((item) => (item.id === editingItemId ? updatedItem : item))
        );
        alert("Question updated successfully.");
        setEditingItemId(null);
        resetFormFields();
      } else {
        // Add new items (can add multiple questions at once)
        const newItems = cleanedQuestions.map((q, idx) => ({
          id: `${Date.now()}-q-${idx}`,
          type: selectedPartType === "coding-questions" ? "coding-question" : "question",
          partTitle: partTitle.trim(),
          question: q,
        }));

        const updated = [...tempItems, ...newItems];
        setTempItems(updated);
        alert("Question(s) saved temporarily. They will be added when you click 'Save Changes'.");
        resetFormFields();
      }
      return;
    }

    alert("Temporary save is currently supported only for Text and Question/Quiz types.");
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

  // Build payload when mentor has saved multiple pieces (text + questions)
  // into tempItems. All of them are combined into the content.
  const buildPayloadFromTempItems = () => {
    const hasQuestions = tempItems.some(
      (item) => item.type === "question" || item.type === "coding-question" || item.type === "quiz"
    );

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

    const currentType = content?.type || form.type;
    const finalType = hasQuestions ? (currentType === "quiz" ? "quiz" : "question") : currentType;

    // Always use form.title to ensure user's title changes are saved
    const payload = {
      title: form.title || content?.title || "",
      type: finalType,
      description: form.description || content?.description || "",
      isPublished: form.isPublished !== undefined ? form.isPublished : (content?.isPublished ?? true),
      isFree: form.isFree !== undefined ? form.isFree : (content?.isFree ?? false),
    };

    // Include welcomeContent ONLY if welcome-content is selected
    if (selectedPartType === 'welcome-content') {
      const welcomeContentJson = buildWelcomeContent();
      if (welcomeContentJson) {
        payload.welcomeContent = welcomeContentJson;
      } else {
        payload.welcomeContent = null;
      }
    } else {
      // Preserve existing welcomeContent if not editing welcome content
      const existingWelcomeContent = content?.welcomeContent;
      if (existingWelcomeContent) {
        payload.welcomeContent = existingWelcomeContent;
      }
    }

    // If there's existing textContent in form, combine it with tempItems text
    // This handles the case where tempItems were parsed from existing content
    // but user also has direct form input
    if (form.textContent && form.textContent.trim() !== "") {
      // Format with partTitle if provided
      let formattedDirectText = form.textContent.trim();
      // Check if this textContent is already in tempItems (to avoid duplication)
      const isAlreadyInTempItems = tempItems.some(
        item => item.type === 'text' && item.textContent === form.textContent
      );
      
      if (!isAlreadyInTempItems && partTitle && partTitle.trim() !== "") {
        formattedDirectText = `1. ${partTitle.trim()}\n\n${formattedDirectText}`;
      }
      
      payload.textContent = aggregatedText 
        ? `${formattedDirectText}\n\n\n${aggregatedText}`
        : formattedDirectText;
    } else if (aggregatedText && aggregatedText.trim() !== "") {
      payload.textContent = aggregatedText;
    } else {
      // No text content in tempItems and no form textContent, explicitly clear
      payload.textContent = '';
    }

    // Combine existing questions with tempItems questions
    const existingQuestions = (form.questions || [])
      .filter((q) => q.question && q.question.trim() !== "")
      .map((q) => ({
        id: q.id,
        question: q.question,
        options: (q.options || [])
          .filter((opt) => opt.text && opt.text.trim() !== "")
          .map((opt) => ({
            text: opt.text,
            isCorrect: !!opt.isCorrect,
          })),
        explanation: q.explanation || "",
      }));

    if (questionBlocks.length > 0 || existingQuestions.length > 0) {
      payload.questions = [...existingQuestions, ...questionBlocks];
    } else {
      // No questions in tempItems and no existing questions, explicitly clear
      payload.questions = [];
    }

    // If no textContent from tempItems and no form textContent, explicitly clear
    if (!payload.textContent) {
      payload.textContent = '';
    }

    return payload;
  };

  // Build payload based on content type (reused for different save actions)
  const buildPayload = () => {
    const base = {
      title: form.title,
      description: form.description,
      isPublished: form.isPublished,
      isFree: form.isFree,
    };

    // Include welcomeContent ONLY if welcome-content is selected and has data
    // This ensures text content doesn't interfere with welcome content
    if (selectedPartType === 'welcome-content') {
      const welcomeContentJson = buildWelcomeContent();
      if (welcomeContentJson) {
        base.welcomeContent = welcomeContentJson;
      } else {
        // If welcome-content is selected but empty, clear it
        base.welcomeContent = null;
      }
    } else {
      // If not welcome-content, preserve existing welcomeContent or set to null
      // Don't include welcomeContent in payload if we're working with text content
      const existingWelcomeContent = content?.welcomeContent;
      if (existingWelcomeContent) {
        base.welcomeContent = existingWelcomeContent;
      }
    }

    const type = content?.type || form.type;
    const hasDirectTextContent = form.textContent && form.textContent.trim() !== '';
    const hasDirectQuestions = form.questions && form.questions.length > 0 && 
      form.questions.some(q => q.question && q.question.trim() !== '');

    // If tempItems exist, combine them with any direct form input
    if (tempItems.length > 0) {
      const payload = buildPayloadFromTempItems();
      
      // Always use form.title (user's current title)
      payload.title = form.title;
      
      // Include welcomeContent if provided
      const welcomeContentJson = buildWelcomeContent();
      if (welcomeContentJson) {
        payload.welcomeContent = welcomeContentJson;
      }
      
      // If user has filled textContent directly in the form (not saved as tempItem),
      // combine it with tempItems text content
      if (hasDirectTextContent && selectedPartType === 'text-content') {
        const textBlocks = tempItems
          .filter((item) => item.type === "text")
          .map((item, index) => {
            if (item.partTitle && item.partTitle.trim() !== "") {
              return `${index + 1}. ${item.partTitle}\n\n${item.textContent}`;
            }
            return item.textContent;
          });
        
        const aggregatedText = textBlocks.join("\n\n\n");
        
        // Check if current form textContent is already in tempItems (exact match)
        const isAlreadyInTempItems = tempItems.some(
          item => item.type === 'text' && item.textContent === form.textContent
        );
        
        // Combine direct form textContent with tempItems text (only if not already saved)
        if (!isAlreadyInTempItems && form.textContent.trim()) {
          // Format with partTitle if provided
          let formattedDirectText = form.textContent.trim();
          if (partTitle && partTitle.trim() !== "") {
            formattedDirectText = `1. ${partTitle.trim()}\n\n${formattedDirectText}`;
          }
          
          // Replace payload.textContent with combined version (formatted direct + tempItems)
          payload.textContent = aggregatedText 
            ? `${formattedDirectText}\n\n\n${aggregatedText}`
            : formattedDirectText;
        } else if (isAlreadyInTempItems && partTitle && partTitle.trim() !== "") {
          // If textContent is already in tempItems but user added/changed partTitle,
          // we should still format it. But this case is complex, so for now
          // just ensure the direct text with partTitle is included
          let formattedDirectText = `1. ${partTitle.trim()}\n\n${form.textContent.trim()}`;
          payload.textContent = aggregatedText 
            ? `${formattedDirectText}\n\n\n${aggregatedText}`
            : formattedDirectText;
        } else if (aggregatedText) {
          // Only set textContent if there's aggregated text from tempItems
          payload.textContent = aggregatedText;
        } else {
          // No text content in tempItems and no direct form textContent, clear it
          payload.textContent = '';
        }
      } else {
        // No direct textContent in form, get text only from tempItems
        const textBlocks = tempItems
          .filter((item) => item.type === "text")
          .map((item, index) => {
            if (item.partTitle && item.partTitle.trim() !== "") {
              return `${index + 1}. ${item.partTitle}\n\n${item.textContent}`;
            }
            return item.textContent;
          })
          .filter((text) => text && text.trim() !== "");
        
        const aggregatedText = textBlocks.join("\n\n\n");
        if (aggregatedText) {
          payload.textContent = aggregatedText;
        } else {
          // No text content in tempItems, clear it
          payload.textContent = '';
        }
      }
      
      // If user has filled questions directly in the form, combine with tempItems questions
      if (hasDirectQuestions && (selectedPartType === 'questions' || selectedPartType === 'coding-questions')) {
        const cleanedQuestions = (form.questions || [])
          .map((q) => {
            let questionText = q.question;
            // For coding questions, prepend code snippet if provided
            if (selectedPartType === 'coding-questions' && codeSnippet && codeSnippet.trim() !== "") {
              questionText = `${questionText}\n\n\`\`\`\n${codeSnippet}\n\`\`\``;
            }
            return {
              id: q.id,
              question: questionText,
              options: (q.options || [])
                .filter((opt) => opt.text && opt.text.trim() !== '')
                .map((opt) => ({
                  text: opt.text,
                  isCorrect: !!opt.isCorrect,
                })),
              explanation: q.explanation || '',
            };
          })
          .filter((q) => q.question && q.question.trim() !== '' && q.options.length >= 2);
        
        // Combine with existing questions from tempItems
        const tempItemQuestions = tempItems
          .filter((item) => item.type === "question" || item.type === "coding-question")
          .map((item) => item.question)
          .filter(Boolean);
        
        payload.questions = [...tempItemQuestions, ...cleanedQuestions];
      } else {
        // No direct questions in form, get questions only from tempItems
        const tempItemQuestions = tempItems
          .filter((item) => item.type === "question" || item.type === "coding-question")
          .map((item) => item.question)
          .filter(Boolean);
        
        if (tempItemQuestions.length > 0) {
          payload.questions = tempItemQuestions;
        } else {
          // No questions in tempItems, clear questions array
          payload.questions = [];
        }
      }
      
      return payload;
    }

    // No tempItems - save directly from form
    if (type === 'text' || hasDirectTextContent) {
      // Format textContent with partTitle if provided
      let formattedTextContent = form.textContent ? form.textContent.trim() : '';
      if (partTitle && partTitle.trim() !== "" && formattedTextContent) {
        // Format as "1. Title\n\nContent"
        formattedTextContent = `1. ${partTitle.trim()}\n\n${formattedTextContent}`;
      }
      
      const payload = {
        ...base,
        textContent: formattedTextContent || '', // Explicitly set empty string if no content
      };
      // Include welcomeContent ONLY if welcome-content is selected
      if (selectedPartType === 'welcome-content') {
        const welcomeContentJson = buildWelcomeContent();
        if (welcomeContentJson) {
          payload.welcomeContent = welcomeContentJson;
        } else {
          payload.welcomeContent = null;
        }
      } else {
        // Preserve existing welcomeContent if not editing welcome content
        const existingWelcomeContent = content?.welcomeContent;
        if (existingWelcomeContent) {
          payload.welcomeContent = existingWelcomeContent;
        }
      }
      return payload;
    }

    if (type === 'video') {
      const payload = {
        ...base,
        videoUrl: form.videoUrl || '',
      };
      // Include welcomeContent ONLY if welcome-content is selected
      if (selectedPartType === 'welcome-content') {
        const welcomeContentJson = buildWelcomeContent();
        if (welcomeContentJson) {
          payload.welcomeContent = welcomeContentJson;
        } else {
          payload.welcomeContent = null;
        }
      } else {
        // Preserve existing welcomeContent if not editing welcome content
        const existingWelcomeContent = content?.welcomeContent;
        if (existingWelcomeContent) {
          payload.welcomeContent = existingWelcomeContent;
        }
      }
      return payload;
    }

    if (type === 'question' || type === 'quiz' || hasDirectQuestions) {
      // Process questions with coding snippet if needed
      const cleanedQuestions = (form.questions || [])
        .map((q) => {
          let questionText = q.question;
          // For coding questions, prepend code snippet if provided
          if (selectedPartType === 'coding-questions' && codeSnippet && codeSnippet.trim() !== "") {
            questionText = `${questionText}\n\n\`\`\`\n${codeSnippet}\n\`\`\``;
          }
          return {
            id: q.id,
            question: questionText,
            options: (q.options || [])
              .filter((opt) => opt.text && opt.text.trim() !== '')
              .map((opt) => ({
                text: opt.text,
                isCorrect: !!opt.isCorrect,
              })),
            explanation: q.explanation || '',
          };
        })
        .filter((q) => q.question && q.question.trim() !== '' && q.options.length >= 2);

      const payload = { ...base };
      if (form.textContent && form.textContent.trim() !== '') {
        payload.textContent = form.textContent;
      } else {
        payload.textContent = ''; // Explicitly clear if no textContent
      }
      if (cleanedQuestions.length > 0) {
        payload.questions = cleanedQuestions;
      } else {
        payload.questions = []; // Explicitly clear if no questions
      }
      return payload;
    }

    // If no type matches and no tempItems, ensure content fields are cleared
    return {
      ...base,
      textContent: '',
      questions: [],
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if title and textContent are missing (and no tempItems)
    const hasTitle = form.title && form.title.trim() !== '';
    const hasTextContent = form.textContent && form.textContent.trim() !== '';
    const hasTempItems = tempItems.length > 0;
    const hasQuestions = form.questions && form.questions.length > 0 && 
      form.questions.some(q => q.question && q.question.trim() !== '');
    
    try {
      setSaving(true);
      const payload = buildPayload();
      
      // If all content is removed (no tempItems, no textContent, no questions), clear the content fields
      if (!hasTempItems && !hasTextContent && !hasQuestions) {
        // Clear content fields when everything is removed
        payload.textContent = '';
        payload.questions = [];
        console.log('All content removed, clearing fields:', payload);
      }
      
      // Ensure title is always included if it exists
      if (!payload.title && form.title) {
        payload.title = form.title;
      }
      
      console.log('Saving payload:', payload);
      console.log('Welcome Content JSON:', buildWelcomeContent());
      await api.patch(`/content/${contentId}`, payload);
      alert('Content updated');
      // Clear any cached tempItems after successful save
      sessionStorage.removeItem(`tempContentItems_${contentId}`);
      setTempItems([]);
      
      // Navigate back to manage page with modules tab active
      const courseId = content?.course?._id || content?.course;
      if (courseId) {
        navigate(`/mentor/courses/${courseId}/manage?tab=modules`);
      } else {
        navigate(-1);
      }
    } catch (e) {
      console.error('Update failed', e);
      alert(e.response?.data?.message || 'Failed to update content');
    } finally {
      setSaving(false);
    }
  };

  // Filter tempItems for display (show all in saved parts list)
  const filteredTempItems = tempItems;

  // Remove a tempItem
  const removeTempItem = (itemId) => {
    setTempItems((prev) => prev.filter((item) => item.id !== itemId));
    if (editingItemId === itemId) {
      // If we're editing the item being removed, reset form
      setEditingItemId(null);
      resetFormFields();
    }
  };

  // Reset welcome form fields
  const resetWelcomeFormFields = () => {
    setWelcomeForm({
      welcomeTitle: '',
      welcomeMessage: '',
      learningTitle: '',
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
    setForm((prev) => ({
      ...prev,
      textContent: "",
      questions: [
        {
          id: undefined,
          question: "",
          explanation: "",
          options: [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
          ],
        },
      ],
    }));
  };

  // Load a saved item into the form for editing
  const editTempItem = (itemId) => {
    const item = tempItems.find((i) => i.id === itemId);
    if (!item) return;

    setEditingItemId(itemId);
    setPartTitle(item.partTitle || "");

    if (item.type === "text") {
      setSelectedPartType("text-content");
      setForm((prev) => ({
        ...prev,
        textContent: item.textContent || "", // Ensure textContent is loaded
        questions: [
          {
            id: undefined,
            question: "",
            explanation: "",
            options: [
              { text: "", isCorrect: false },
              { text: "", isCorrect: false },
            ],
          },
        ],
      }));
      setCodeSnippet("");
      // Scroll to form after state updates
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else if (item.type === "question" || item.type === "coding-question") {
      const isCoding = item.type === "coding-question";
      setSelectedPartType(isCoding ? "coding-questions" : "questions");

      // Extract code snippet if it's a coding question
      let questionText = item.question?.question || "";
      let extractedCode = "";

      if (isCoding && questionText) {
        // Try to extract code from markdown code blocks
        const codeBlockMatch = questionText.match(/```[\s\S]*?```/);
        if (codeBlockMatch) {
          extractedCode = codeBlockMatch[0].replace(/```/g, "").trim();
          // Remove the code block from question text
          questionText = questionText.replace(/```[\s\S]*?```/g, "").trim();
        }
      }

      setCodeSnippet(extractedCode);

      // Load the question(s) - note: item.question is the question object
      if (item.question && item.question.question) {
        setForm((prev) => ({
          ...prev,
          textContent: "",
          questions: [
            {
              id: item.question.id,
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

	  // Save current text content and jump straight to "Add Content" for same module
	  const handleSaveAndAddAnother = async (e) => {
	    e.preventDefault();

	    const type = content?.type || form.type;
	    if (type !== 'text') {
	      // Fallback to normal save for non-text types
	      return handleSubmit(e);
	    }

	    try {
	      setSaving(true);
	      const payload = buildPayload();
	      await api.patch(`/content/${contentId}`, payload);
	      alert('Content updated. You can now add another text content.');

	      const moduleId = content?.module?._id || content?.module;
	      if (moduleId) {
	        navigate(`/mentor/modules/${moduleId}/content/create`);
	      } else {
	        // If no module, navigate to manage page with modules tab
	        const courseId = content?.course?._id || content?.course;
	        if (courseId) {
	          navigate(`/mentor/courses/${courseId}/manage?tab=modules`);
	      } else {
	        navigate(-1);
	        }
	      }
	    } catch (e) {
	      console.error('Update & add another failed', e);
	      alert(e.response?.data?.message || 'Failed to update content');
	    } finally {
	      setSaving(false);
	    }
	  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen"><Spinner size="lg" /></div>;
  }

  if (!content) {
    return <div className="p-8 text-center text-gray-600">Content not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        <CardBody>
          <h1 className="text-xl font-semibold mb-4">Edit Content</h1>

          {/* Content Part Type Selector Dropdown - Outside and above the form */}
          <div className="mb-6">
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
                  setForm((prev) => ({ ...prev, textContent: '' }));
                  setPartTitle('');
                }
                // Reset welcome form if switching to text-content (to ensure isolation)
                if (newType === 'text-content' && selectedPartType === 'welcome-content') {
                  resetWelcomeFormFields();
                }
                setSelectedPartType(newType);
                // Cancel any editing and reset form fields when changing type
                setEditingItemId(null);
                resetFormFields();
              }}
              className="w-full border rounded px-4 py-2 text-base"
            >
              <option value="text-content">Text Content</option>
              <option value="questions">Questions (MCQ)</option>
              <option value="coding-questions">Coding Questions (MCQ with Code)</option>
              <option value="welcome-content">Welcome Content</option>
            </select>
          </div>

          {/* Overview of all temporarily saved parts */}
          {tempItems.length > 0 && (
            <div className="mb-6 border rounded-lg p-4 bg-gray-50">
              <div className="font-medium text-sm mb-3">
                Saved parts for this content ({tempItems.length}):
              </div>
              <ul className="space-y-2 text-sm">
                {filteredTempItems.map((item, idx) => {
                  // Get display title for the item
                  let displayTitle = '';
                  if (item.type === 'text') {
                    displayTitle = item.partTitle || 'Text Content';
                    // If no title, show first 50 chars of text content as preview
                    if (!item.partTitle && item.textContent) {
                      const preview = item.textContent.substring(0, 50).trim();
                      displayTitle = preview ? `${preview}...` : 'Text Content';
                    }
                  } else if (item.type === 'coding-question') {
                    displayTitle = item.partTitle || 'Coding Question';
                    // If no title, show question text preview
                    if (!item.partTitle && item.question?.question) {
                      const preview = item.question.question.replace(/```[\s\S]*?```/g, '').substring(0, 50).trim();
                      displayTitle = preview ? `${preview}...` : 'Coding Question';
                    }
                  } else if (item.type === 'question') {
                    displayTitle = item.partTitle || 'Question';
                    // If no title, show question text preview
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

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => updateField('title', e.target.value)}
                
                className="w-full border rounded px-3 py-2"
                disabled={tempItems.length > 0}
              />
              {tempItems.length > 0 && (
                <p className="mt-1 text-xs text-gray-500">
                  Content Title is fixed for this lesson. You can add more text or
                  questions below, then click "Save Changes" once to save everything together.
                </p>
              )}
            </div>

            {/* Show fields based on selected part type */}
            {selectedPartType === 'text-content' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title for this part
                  </label>
                  <input
                    type="text"
                    value={partTitle}
                    onChange={(e) => setPartTitle(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    placeholder="e.g. Introduction, Example 1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description / Text Content *
                  </label>
                  <textarea
                    rows={10}
                    value={form.textContent}
                    onChange={(e) => updateField('textContent', e.target.value)}
                    
                    className="w-full border rounded px-3 py-2"
                    placeholder="Enter your text content here..."
                  />
                </div>
              </>
            )}

            {selectedPartType === 'welcome-content' && (
              <>
                {/* Welcome Content Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Welcome Title
                    </label>
                    <input
                      type="text"
                      value={welcomeForm.welcomeTitle}
                      onChange={(e) => setWelcomeForm(prev => ({ ...prev, welcomeTitle: e.target.value }))}
                      className="w-full border rounded px-3 py-2"
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
                      className="w-full border rounded px-3 py-2"
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
                      className="w-full border rounded px-3 py-2"
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
                      className="w-full border rounded px-3 py-2"
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
                      className="w-full border rounded px-3 py-2"
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
                      className="w-full border rounded px-3 py-2"
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
                          className="w-full border rounded px-3 py-2"
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
                          className="w-full border rounded px-3 py-2"
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
                          className="w-full border rounded px-3 py-2"
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
                          className="w-full border rounded px-3 py-2"
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
                        className="w-full border rounded px-3 py-2"
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
                        className="w-full border rounded px-3 py-2"
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
              </>
            )}

            {(selectedPartType === 'questions' || selectedPartType === 'coding-questions') && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title for this question set
                  </label>
                  <input
                    type="text"
                    value={partTitle}
                    onChange={(e) => setPartTitle(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    placeholder="e.g. Practice Questions, Chapter 1 Quiz"
                  />
                </div>

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
                      className="w-full border rounded px-3 py-2 font-mono text-sm"
                      placeholder="Enter code snippet here (will be added to all questions in this set)..."
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      This code snippet will be included with each question in this set.
                    </p>
                  </div>
                )}

                {/* Questions form */}
                {form.questions.map((q, qi) => (
                  <div key={q.id || qi} className="border p-4 rounded space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Question {qi + 1} *
                      </label>
                      <textarea
                        value={q.question}
                        onChange={(e) => updateQuestion(qi, e.target.value)}
                        placeholder="Enter your question here..."
                        className="w-full p-2 border rounded"
                        required
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Options *
                      </label>
                      {q.options.map((o, oi) => (
                        <div key={oi} className="flex gap-2 items-center mb-2">
                          <input
                            value={o.text}
                            onChange={(e) => updateOption(qi, oi, 'text', e.target.value)}
                            className="flex-1 p-2 border rounded"
                            placeholder={`Option ${String.fromCharCode(65 + oi)}`}
                            required
                          />
                          <label className="flex items-center gap-1 text-sm whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={o.isCorrect}
                              onChange={(e) =>
                                updateOption(qi, oi, 'isCorrect', e.target.checked)
                              }
                            />
                            Correct
                          </label>
                          {q.options.length > 2 && (
                            <button
                              type="button"
                              onClick={() => removeOption(qi, oi)}
                              className="text-red-500 text-sm px-2"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addOption(qi)}
                        className="text-sm text-blue-600 mt-2"
                      >
                        + Add Option
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Explanation (optional)
                      </label>
                      <textarea
                        value={q.explanation}
                        onChange={(e) => updateExplanation(qi, e.target.value)}
                        placeholder="Explain the correct answer..."
                        className="w-full p-2 border rounded"
                        rows={2}
                      />
                    </div>

                    {form.questions.length > 1 && (
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

                <Button type="button" onClick={addQuestion} variant="secondary">
                  + Add Question
                </Button>
              </>
            )}

            {/* Common fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => updateField('description', e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="Overall description for this content..."
              />
            </div>


            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(e) => updateField('isPublished', e.target.checked)}
                /> Published
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isFree}
                  onChange={(e) => updateField('isFree', e.target.checked)}
                /> Free
              </label>
            </div>
            {/* Handle existing content types that aren't using the new dropdown system */}
            {content.type === 'video' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Video URL *</label>
                <input
                  type="url"
                  value={form.videoUrl}
                  onChange={(e) => updateField('videoUrl', e.target.value)}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            )}

            {/* Save this part button - shown for text-content, questions, and coding-questions */}
            {(selectedPartType === 'text-content' || selectedPartType === 'questions' || selectedPartType === 'coding-questions') && (
            <div className="flex justify-end gap-2">
              {editingItemId && (
                <Button
                  type="button"
                  variant="secondary"
                  disabled={saving}
                  onClick={cancelEdit}
                >
                  Cancel Edit
                </Button>
              )}
              <Button
                type="button"
                variant="secondary"
                disabled={saving}
                onClick={handleSaveTempPart}
              >
                {editingItemId ? 'Update this part' : 'Save this part to lesson (temporary)'}
              </Button>
            </div>
            )}

            {/* Info message for welcome content */}
            {selectedPartType === 'welcome-content' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Welcome content will be saved automatically when you click "Save Changes" at the bottom of the form.
                  This content will be displayed on the first chapter page (q=0).
                </p>
              </div>
            )}

            <div className="flex gap-3 flex-wrap">
              <Button type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              {content.type === 'text' && (
                <Button
                  type="button"
                  disabled={saving}
                  onClick={handleSaveAndAddAnother}
                >
                  {saving ? 'Saving...' : 'Save & Add Another Text Content'}
                </Button>
              )}
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
