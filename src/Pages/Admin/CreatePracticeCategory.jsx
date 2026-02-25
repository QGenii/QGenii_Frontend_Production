import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody } from '../../Components/ui/Card';
import { Button } from '../../Components/ui/Button';
import { practiceApi } from '../../lib/practiceApi';
import { ArrowLeft, Save, Code, Layers, Zap, Database, GitBranch, Hash, Repeat, Grid } from 'lucide-react';

export default function CreatePracticeCategory() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'code',
    difficulty: 'beginner'
  });

  const iconOptions = [
    { value: 'code', label: 'Code', Icon: Code },
    { value: 'layers', label: 'Layers', Icon: Layers },
    { value: 'zap', label: 'Zap', Icon: Zap },
    { value: 'database', label: 'Database', Icon: Database },
    { value: 'git-branch', label: 'Git Branch', Icon: GitBranch },
    { value: 'hash', label: 'Hash', Icon: Hash },
    { value: 'repeat', label: 'Repeat', Icon: Repeat },
    { value: 'grid', label: 'Grid', Icon: Grid }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Please enter a category name');
      return;
    }

    if (!formData.description.trim()) {
      alert('Please enter a description');
      return;
    }

    try {
      setLoading(true);
      await practiceApi.createCategory(formData);
      alert('Category created successfully!');
      navigate('/practice');
    } catch (error) {
      console.error('Error creating category:', error);
      alert(error.response?.data?.message || 'Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/practice')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Categories
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Create Practice Category</h1>
          <p className="text-gray-600 mt-2">Add a new category for coding practice questions</p>
        </div>

        <Card>
          <CardBody className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Dynamic Programming, Trees & Graphs"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Brief description of what this category covers..."
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Icon Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Category Icon
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {iconOptions.map(({ value, label, Icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, icon: value }))}
                      className={`flex flex-col items-center gap-2 p-4 border-2 rounded-lg transition-all ${
                        formData.icon === value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${formData.icon === value ? 'text-blue-600' : 'text-gray-600'}`} />
                      <span className={`text-xs ${formData.icon === value ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty Level
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Creating...' : 'Create Category'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/practice')}
                  disabled={loading}
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
}
