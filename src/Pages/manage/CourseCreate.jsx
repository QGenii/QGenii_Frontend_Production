import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody } from '../../Components/ui/Card';
import { Input } from '../../Components/ui/Input';
import { Select } from '../../Components/ui/Select';
import { Button } from '../../Components/ui/Button';
import { Spinner } from '../../Components/ui/Spinner';
import api from '../../lib/api';
import { useAuth } from '../../hooks/useAuth';

export const CourseCreate = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    category: '',
    type: 'text',
    level: 'beginner',
    thumbnail: '',
    videoUrl: '',
    duration: '',
    price: '0',
    isPaid: false,
    tags: '',
    isPublished: false,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories?limit=100');
      setCategories(response.data.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        shortDescription: formData.shortDescription || '',
        category: formData.category,
        type: formData.type,
        level: formData.level,
        thumbnail: formData.thumbnail || '',
        videoUrl: formData.videoUrl || '',
        duration: parseInt(formData.duration) || 0,
        price: parseFloat(formData.price) || 0,
        isPaid: formData.isPaid,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t) : [],
      };

      // Only include topic if selected
      if (selectedTopic) {
        payload.topic = selectedTopic;
      }

      // Only include isPublished for non-mentors
      if (user.role !== 'MENTOR') {
        payload.isPublished = formData.isPublished;
      }

      console.log('Sending payload:', payload);
      const path = user?.role === 'MENTOR' ? '/courses/mentor/create' : '/courses';
      const response = await api.post(path, payload);
      
      alert(
        user.role === 'MENTOR'
          ? 'Course created successfully! It will be published after admin approval.'
          : 'Course created and published successfully!'
      );
      
      navigate(user.role === 'MENTOR' ? '/mentor/dashboard' : '/dashboard/courses');
    } catch (error) {
      console.error('Failed to create course:', error);
      console.error('Error response:', error.response?.data);
      
      // Handle validation errors
      if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        const errorMessages = error.response.data.errors.join('\n• ');
        alert(`Validation failed:\n• ${errorMessages}`);
      } else {
        const errorMsg = error.response?.data?.message || 
                         error.response?.data?.error ||
                         'Failed to create course';
        alert(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const typeOptions = [
    { value: 'text', label: 'Text-based' },
    { value: 'video', label: 'Video-based' },
  ];

  const levelOptions = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];

  const categoryOptions = [
    { value: '', label: 'Select Category' },
    
    ...categories.map((cat) => ({ value: cat._id, label: cat.name })),
  ];

  // Topic templates with pre-filled course data
  const topicTemplates = {
    python: {
      title: 'Learn Python Programming',
      shortDescription: 'Master Python programming from basics to advanced concepts',
      description: 'Learn Python programming language within a month using our practical course. Understand the basic syntax, data structures, object-oriented programming, and build real-world projects. Perfect for beginners who want to start their programming journey.',
      thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800',
      tags: 'python, programming, beginner, coding',
      level: 'beginner',
      duration: '1440', // 24 hours
    },
    c: {
      title: 'Learn C Programming',
      shortDescription: 'Master the fundamentals of C programming language',
      description: 'Comprehensive C programming course covering variables, data types, control structures, functions, pointers, and memory management. Build a strong foundation in systems programming.',
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
      tags: 'c, programming, systems, fundamentals',
      level: 'beginner',
      duration: '1200',
    },
    cpp: {
      title: 'Learn C++ Programming',
      shortDescription: 'Advanced C++ programming with object-oriented concepts',
      description: 'Learn C++ programming with focus on object-oriented programming, STL, templates, and advanced features. Perfect for building high-performance applications.',
      thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
      tags: 'c++, programming, oop, advanced',
      level: 'intermediate',
      duration: '1800',
    },
    'machine-learning': {
      title: 'Machine Learning Fundamentals',
      shortDescription: 'Introduction to machine learning algorithms and applications',
      description: 'Learn machine learning concepts including supervised and unsupervised learning, neural networks, deep learning, and practical implementation using Python and popular ML libraries.',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
      tags: 'machine learning, ai, data science, python',
      level: 'intermediate',
      duration: '2400',
    },
    java: {
      title: 'Learn Java Programming',
      shortDescription: 'Complete Java course from basics to enterprise development',
      description: 'Master Java programming including core concepts, object-oriented programming, collections framework, multithreading, and Spring framework for enterprise applications.',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
      tags: 'java, programming, oop, enterprise',
      level: 'beginner',
      duration: '2000',
    },
    'web-development': {
      title: 'Web Development Bootcamp',
      shortDescription: 'Full-stack web development with modern technologies',
      description: 'Complete web development course covering HTML, CSS, JavaScript, React, Node.js, and databases. Build responsive websites and full-stack applications from scratch.',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
      tags: 'web development, html, css, javascript, react',
      level: 'beginner',
      duration: '3000',
    },
    'c-sharp': {
      title: 'Learn C# Programming',
      shortDescription: 'Master C# and .NET framework for application development',
      description: 'Comprehensive C# programming course covering syntax, object-oriented programming, LINQ, async/await, and .NET framework. Build desktop and web applications.',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
      tags: 'c#, dotnet, programming, oop',
      level: 'beginner',
      duration: '1800',
    },
    kotlin: {
      title: 'Learn Kotlin Programming',
      shortDescription: 'Modern Kotlin development for Android and backend',
      description: 'Learn Kotlin programming language for Android development and backend services. Cover coroutines, extension functions, and modern Kotlin features.',
      thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800',
      tags: 'kotlin, android, programming, mobile',
      level: 'intermediate',
      duration: '1500',
    },
    rust: {
      title: 'Learn Rust Programming',
      shortDescription: 'Systems programming with Rust language',
      description: 'Learn Rust programming language focusing on memory safety, concurrency, and systems programming. Build high-performance and secure applications.',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
      tags: 'rust, systems programming, performance, safety',
      level: 'advanced',
      duration: '2000',
    },
    go: {
      title: 'Learn Go Programming',
      shortDescription: 'Master Go language for backend and cloud development',
      description: 'Learn Go programming language for building scalable backend services, microservices, and cloud-native applications. Cover goroutines, channels, and Go best practices.',
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
      tags: 'go, golang, backend, microservices',
      level: 'intermediate',
      duration: '1600',
    },
    php: {
      title: 'Learn PHP Programming',
      shortDescription: 'PHP development for dynamic web applications',
      description: 'Master PHP programming for server-side web development. Learn PHP syntax, database integration, Laravel framework, and build dynamic web applications.',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
      tags: 'php, web development, laravel, backend',
      level: 'beginner',
      duration: '1800',
    },
  };

  const topicOptions = [
    { value: '', label: 'Select a Topic (Optional - Auto-fill form)' },
    { value: 'python', label: 'Learn Python' },
    { value: 'c', label: 'Learn C' },
    { value: 'cpp', label: 'Learn C++' },
    { value: 'machine-learning', label: 'Machine Learning' },
    { value: 'java', label: 'Learn Java' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'c-sharp', label: 'Learn C#' },
    { value: 'kotlin', label: 'Learn Kotlin' },
    { value: 'rust', label: 'Learn Rust' },
    { value: 'go', label: 'Learn Go' },
    { value: 'php', label: 'Learn PHP' },
  ];

  const handleTopicChange = (e) => {
    const topic = e.target.value;
    setSelectedTopic(topic);
    
    if (topic && topicTemplates[topic]) {
      const template = topicTemplates[topic];
      setFormData({
        ...formData,
        title: template.title,
        shortDescription: template.shortDescription,
        description: template.description,
        thumbnail: template.thumbnail,
        tags: template.tags,
        level: template.level,
        duration: template.duration,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
          <p className="text-gray-600 mt-2">
            Fill in the details to create your course
            {user.role === 'MENTOR' && ' (Requires admin approval before publishing)'}
          </p>
        </div>

        <Card>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Topic Selection Dropdown */}
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quick Start: Select a Topic to Auto-fill Form
                </label>
                <select
                  value={selectedTopic}
                  onChange={handleTopicChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {topicOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-600 mt-2">
                  Select a topic to automatically fill in course details. You can still edit any field after selection.
                </p>
              </div>

              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                <div className="space-y-4">
                  <Input
                    label="Course Title *"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Complete Web Development Bootcamp"
                    required
                    minLength={3}
                    maxLength={200}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum 3 characters required
                  </p>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Short Description
                    </label>
                    <input
                      type="text"
                      name="shortDescription"
                      value={formData.shortDescription}
                      onChange={handleChange}
                      className="input"
                      placeholder="Brief one-liner about the course"
                      maxLength="200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="input"
                      rows="5"
                      placeholder="Detailed description of what students will learn..."
                      required
                      minLength={10}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Minimum 10 characters required
                    </p>
                  </div>
                </div>
              </div>

              {/* Course Settings */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Course Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Topic (Optional)"
                    name="topic"
                    value={selectedTopic}
                    onChange={(e) => {
                      setSelectedTopic(e.target.value);
                      if (e.target.value && topicTemplates[e.target.value]) {
                        const template = topicTemplates[e.target.value];
                        setFormData({
                          ...formData,
                          title: template.title,
                          shortDescription: template.shortDescription,
                          description: template.description,
                          thumbnail: template.thumbnail,
                          tags: template.tags,
                          level: template.level,
                          duration: template.duration,
                        });
                      }
                    }}
                    options={topicOptions}
                  />

                  <Select
                    label="Category *"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    options={categoryOptions}
                    required
                  />

                  <Select
                    label="Course Type *"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    options={typeOptions}
                  />

                  <Select
                    label="Difficulty Level *"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    options={levelOptions}
                  />

                  <Input
                    label="Duration (minutes)"
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g., 480"
                    min="0"
                  />
                </div>
              </div>

              {/* Media */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Media</h3>
                <div className="space-y-4">
                  <div>
                  <Input
                      label="Thumbnail URL (Course Image)"
                    type="url"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                  />
                    <p className="text-xs text-gray-500 mt-1">
                      This image will be displayed in the course card and all courses section. Recommended size: 800x450px
                    </p>
                  </div>

                  {formData.type === 'video' && (
                    <Input
                      label="Video URL"
                      type="url"
                      name="videoUrl"
                      value={formData.videoUrl}
                      onChange={handleChange}
                      placeholder="https://example.com/video.mp4"
                    />
                  )}
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Pricing</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="isPaid"
                      name="isPaid"
                      checked={formData.isPaid}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <label htmlFor="isPaid" className="text-sm font-medium text-gray-700">
                      This is a paid course
                    </label>
                  </div>

                  {formData.isPaid && (
                    <Input
                      label="Price (USD)"
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="49.99"
                      min="0"
                      step="0.01"
                    />
                  )}
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                <Input
                  label="Tags (comma-separated)"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="react, javascript, web development"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate tags with commas to help students find your course
                </p>
              </div>

              {/* Publish Option (Admin only) */}
              {user.role !== 'MENTOR' && (
                <div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="isPublished"
                      name="isPublished"
                      checked={formData.isPublished}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
                      Publish course immediately
                    </label>
                  </div>
                </div>
              )}

              {/* Info Box for Mentors */}
              {user.role === 'MENTOR' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Your course will be saved as a draft and sent for admin approval.
                    Once approved by an administrator, it will be published and visible to students.
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Course'}
                </Button>
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
    </div>
  );
};
