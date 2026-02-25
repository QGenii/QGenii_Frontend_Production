import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from '../../Components/layout/Sidebar';
import { Card, CardBody } from '../../Components/ui/Card';
import { Button } from '../../Components/ui/Button';
import { Badge } from '../../Components/ui/Badge';
import { Spinner } from '../../Components/ui/Spinner';
import ModuleEditForm from './ModuleEditForm';
import api from '../../lib/api';
import { 
  FileText, Video, Link as LinkIcon, HelpCircle, 
  FileQuestion, ClipboardList, Trash2, Edit, Plus, 
  ChevronDown, ChevronUp 
} from 'lucide-react';

export const CourseModuleManager = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedModules, setExpandedModules] = useState({});
  const [showModuleForm, setShowModuleForm] = useState(false);
  const [moduleFormData, setModuleFormData] = useState({ title: '', description: '' });
  const [editingModule, setEditingModule] = useState(null);

  useEffect(() => {
    fetchData();
  }, [courseId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [courseRes, modulesRes] = await Promise.all([
        api.get(`/courses/${courseId}`),
        api.get(`/courses/${courseId}/modules`),
      ]);
      setCourse(courseRes.data.data.course);
      setModules(modulesRes.data.data);
      
      // Expand all modules by default
      const expanded = {};
      modulesRes.data.data.forEach(mod => {
        expanded[mod._id] = true;
      });
      setExpandedModules(expanded);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      alert('Failed to load course modules');
    } finally {
      setLoading(false);
    }
  };

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const handleCreateModule = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/courses/${courseId}/modules`, moduleFormData);
      alert('Module created successfully!');
      setShowModuleForm(false);
      setModuleFormData({ title: '', description: '' });
      fetchData();
    } catch (error) {
      console.error('Failed to create module:', error);
      alert(error.response?.data?.message || 'Failed to create module');
    }
  };

  const handleDeleteModule = async (moduleId) => {
    if (!confirm('Are you sure you want to delete this module? All content will be deleted.')) return;

    try {
      await api.delete(`/modules/${moduleId}`);
      alert('Module deleted successfully!');
      fetchData();
    } catch (error) {
      console.error('Failed to delete module:', error);
      alert('Failed to delete module');
    }
  };

  const handleEditModuleSuccess = () => {
    setEditingModule(null);
    fetchData();
  };

  const handleDeleteContent = async (contentId) => {
    if (!confirm('Are you sure you want to delete this content?')) return;

    try {
      await api.delete(`/content/${contentId}`);
      alert('Content deleted successfully!');
      fetchData();
    } catch (error) {
      console.error('Failed to delete content:', error);
      alert('Failed to delete content');
    }
  };

  const getContentIcon = (type) => {
    switch (type) {
      case 'text':
        return <FileText className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'link':
        return <LinkIcon className="w-4 h-4" />;
      case 'question':
        return <HelpCircle className="w-4 h-4" />;
      case 'quiz':
        return <FileQuestion className="w-4 h-4" />;
      case 'assignment':
        return <ClipboardList className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getContentTypeColor = (type) => {
    switch (type) {
      case 'video':
        return 'primary';
      case 'question':
      case 'quiz':
        return 'warning';
      case 'assignment':
        return 'danger';
      default:
        return 'default';
    }
  };

  if (loading) {
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
      {/* <Sidebar /> */}
      <div className="flex-1 p-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Manage Course Content</h1>
            <p className="text-gray-600 mt-2">
              Course: <span className="font-semibold">{course?.title}</span>
            </p>
          </div>

          {/* Create Module Button */}
          <div className="mb-6">
            <Button onClick={() => setShowModuleForm(!showModuleForm)}>
              <Plus className="w-4 h-4 mr-2" />
              {showModuleForm ? 'Cancel' : 'Create New Module'}
            </Button>
          </div>

          {/* Create Module Form */}
          {showModuleForm && (
            <Card className="mb-6">
              <CardBody>
                <h3 className="text-lg font-semibold mb-4">Create New Module</h3>
                <form onSubmit={handleCreateModule} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Module Title *
                    </label>
                    <input
                      type="text"
                      value={moduleFormData.title}
                      onChange={(e) => setModuleFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      required
                      minLength={3}
                      placeholder="e.g., Introduction to React"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Module Description
                    </label>
                    <textarea
                      value={moduleFormData.description}
                      onChange={(e) => setModuleFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="Describe what this module covers..."
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button type="submit">Create Module</Button>
                    <Button type="button" variant="secondary" onClick={() => setShowModuleForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          )}

          {/* Modules List */}
          {modules.length === 0 ? (
            <Card>
              <CardBody>
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No modules yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Create your first module to start adding content
                  </p>
                  <Button onClick={() => setShowModuleForm(true)}>
                    Create First Module
                  </Button>
                </div>
              </CardBody>
            </Card>
          ) : (
            <div className="space-y-4">
              {modules.map((module, index) => (
                <Card key={module._id}>
                  <CardBody className="p-0">
                    {/* Module Header */}
                    <div className="p-6 bg-gray-50 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <button
                            onClick={() => toggleModule(module._id)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            {expandedModules[module._id] ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </button>
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <h3 className="text-lg font-semibold text-gray-900">
                                Module {index + 1}: {module.title}
                              </h3>
                              <Badge variant="default">
                                {module.contentCount || 0} items
                              </Badge>
                            </div>
                            {module.description && (
                              <p className="text-sm text-gray-600 mt-1">
                                {module.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setEditingModule(module)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteModule(module._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Module Edit Form */}
                    {editingModule?._id === module._id && (
                      <div className="px-6 pb-6">
                        <ModuleEditForm
                          module={module}
                          onCancel={() => setEditingModule(null)}
                          onSuccess={handleEditModuleSuccess}
                        />
                      </div>
                    )}

                    {/* Module Content */}
                    {expandedModules[module._id] && (
                      <div className="p-6">
                        {module.contents && module.contents.length > 0 ? (
                          <div className="space-y-3">
                            {module.contents.map((content, contentIndex) => (
                              <div
                                key={content._id}
                                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition"
                              >
                                <div className="flex items-center gap-3 flex-1">
                                  <div className="p-2 bg-gray-100 rounded">
                                    {getContentIcon(content.type)}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium text-gray-900">
                                        {contentIndex + 1}. {content.title}
                                      </span>
                                      <Badge variant={getContentTypeColor(content.type)}>
                                        {content.type}
                                      </Badge>
                                      {!content.isPublished && (
                                        <Badge variant="default">Draft</Badge>
                                      )}
                                      {content.isFree && (
                                        <Badge variant="success">Free</Badge>
                                      )}
                                    </div>
                                    {content.description && (
                                      <p className="text-sm text-gray-600 mt-1">
                                        {content.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => navigate(`/mentor/content/${content._id}/edit`)}
                                  >
                                    <Edit className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDeleteContent(content._id)}
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <p className="mb-4">No content in this module yet</p>
                          </div>
                        )}

                        {/* Add Content Button */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <Button
                            variant="primary"
                            onClick={() => navigate(`/mentor/modules/${module._id}/content/create`)}
                            className="w-full"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Content to This Module
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
