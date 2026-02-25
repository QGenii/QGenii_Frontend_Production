import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardBody } from '../../Components/ui/Card';
import { Input } from '../../Components/ui/Input';
import { Select } from '../../Components/ui/Select';
import { Button } from '../../Components/ui/Button';
import { Spinner } from '../../Components/ui/Spinner';
import api from '../../lib/api';
import { useAuth } from '../../hooks/useAuth';
import { ArrowLeft } from 'lucide-react';

export const CourseEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
    fetchCourse();
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories?limit=100');
      setCategories(response.data.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchCourse = async () => {
    try {
      const response = await api.get(`/courses/${id}`);
      const course = response.data.data.course;
      
      setFormData({
        title: course.title || '',
        description: course.description || '',
        shortDescription: course.shortDescription || '',
        category: course.category?._id || '',
        type: course.type || 'text',
        level: course.level || 'beginner',
        thumbnail: course.thumbnail || '',
        videoUrl: course.videoUrl || '',
        duration: course.duration || '',
        price: course.price || '0',
        isPaid: course.isPaid || false,
        tags: course.tags?.join(', ') || '',
        isPublished: course.isPublished || false,
      });
    } catch (error) {
      console.error('Failed to fetch course:', error);
      alert('Failed to load course');
      navigate(-1);
    } finally {
      setLoading(false);
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
    setSaving(true);

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

      // Only include isPublished for non-mentors
      if (user.role !== 'MENTOR') {
        payload.isPublished = formData.isPublished;
      }

      console.log('Updating with payload:', payload);
      await api.patch(`/courses/${id}`, payload);
      
      alert('Course updated successfully!');
      navigate(user.role === 'MENTOR' ? '/mentor/dashboard' : '/dashboard/courses');
    } catch (error) {
      console.error('Failed to update course:', error);
      console.error('Error response:', error.response?.data);
      
      // Handle validation errors
      if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        const errorMessages = error.response.data.errors.join('\n• ');
        alert(`Validation failed:\n• ${errorMessages}`);
      } else {
        const errorMsg = error.response?.data?.message || 
                         error.response?.data?.error ||
                         'Failed to update course';
        alert(errorMsg);
      }
    } finally {
      setSaving(false);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Edit Course</h1>
          <p className="text-gray-600 mt-2">
            Update your course details
            {user.role === 'MENTOR' && ' (Changes require admin approval)'}
          </p>
        </div>

        <Card>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                      className="input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                  <Input
                    label="Thumbnail URL"
                    type="url"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                  />

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
                      Course is published
                    </label>
                  </div>
                </div>
              )}

              {/* Info Box for Mentors */}
              {user.role === 'MENTOR' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Changes to your course will be saved and may require admin re-approval before being visible to students.
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 border-t pt-6">
                <Button type="submit" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate(-1)}
                  disabled={saving}
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
