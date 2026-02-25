import { useState, useEffect } from 'react';
import { Sidebar } from '../../Components/layout/Sidebar';
import { Card, CardBody } from '../../Components/ui/Card';
import { Button } from '../../Components/ui/Button';
import { Input } from '../../Components/ui/Input';
import { Spinner } from '../../Components/ui/Spinner';
import api from '../../lib/api';
import { Plus, Edit, Trash2 } from 'lucide-react';

export const CategoriesManage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get('/categories?limit=100');
      setCategories(response.data.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingCategory) {
        await api.patch(`/categories/${editingCategory._id}`, formData);
      } else {
        await api.post('/categories', formData);
      }

      setShowForm(false);
      setEditingCategory(null);
      setFormData({ name: '', description: '', image: '' });
      fetchCategories();
    } catch (error) {
      console.error('Failed to save category:', error);
      alert('Failed to save category');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      image: category.image || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (categoryId) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      await api.delete(`/categories/${categoryId}`);
      fetchCategories();
    } catch (error) {
      console.error('Failed to delete category:', error);
      alert(error.response?.data?.message || 'Failed to delete category');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-50">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
            <p className="text-gray-600 mt-2">Manage course categories</p>
          </div>
          <Button
            onClick={() => {
              setShowForm(true);
              setEditingCategory(null);
              setFormData({ name: '', description: '', image: '' });
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </div>

        {showForm && (
          <Card className="mb-6">
            <CardBody>
              <h2 className="text-xl font-semibold mb-4">
                {editingCategory ? 'Edit Category' : 'New Category'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Category Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    className="input"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows="3"
                  />
                </div>
                <Input
                  label="Image URL"
                  type="url"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
                <div className="flex gap-2">
                  <Button type="submit">Save</Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setShowForm(false);
                      setEditingCategory(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card key={category._id}>
                {category.image && (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-32 object-cover"
                  />
                )}
                <CardBody>
                  <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {category.description || 'No description'}
                  </p>
                  <div className="text-sm text-gray-500 mb-4">
                    {category.courseCount} courses
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      className="text-xs flex-1"
                      onClick={() => handleEdit(category)}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="text-xs flex-1"
                      onClick={() => handleDelete(category._id)}
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
