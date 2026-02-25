import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Sidebar } from '../../Components/layout/Sidebar';
import { Card, CardBody } from '../../Components/ui/Card';
import { Button } from '../../Components/ui/Button';
import { Badge } from '../../Components/ui/Badge';
import { Spinner } from '../../Components/ui/Spinner';
import api from '../../lib/api';
import { FileText, Video, Link as LinkIcon, HelpCircle, FileQuestion, ClipboardList, Trash2, Edit } from 'lucide-react';

export const ContentList = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [courseId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [courseRes, contentRes] = await Promise.all([
        api.get(`/courses/${courseId}`),
        api.get(`/courses/${courseId}/content`),
      ]);
      setCourse(courseRes.data.data.course);
      setContents(contentRes.data.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      alert('Failed to load course content');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (contentId) => {
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
        return <FileText className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'link':
        return <LinkIcon className="w-5 h-5" />;
      case 'question':
        return <HelpCircle className="w-5 h-5" />;
      case 'quiz':
        return <FileQuestion className="w-5 h-5" />;
      case 'assignment':
        return <ClipboardList className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
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
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Course Content</h1>
              <p className="text-gray-600 mt-2">
                Manage content for: <span className="font-semibold">{course?.title}</span>
              </p>
            </div>
            <Button onClick={() => navigate(`/mentor/courses/${courseId}/content/create`)}>
              Add Content
            </Button>
          </div>

          {contents.length === 0 ? (
            <Card>
              <CardBody>
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No content yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Start adding content to your course
                  </p>
                  <Button onClick={() => navigate(`/mentor/courses/${courseId}/content/create`)}>
                    Add First Content
                  </Button>
                </div>
              </CardBody>
            </Card>
          ) : (
            <div className="space-y-4">
              {contents.map((content) => (
                <Card key={content._id}>
                  <CardBody>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-3 bg-gray-100 rounded-lg">
                          {getContentIcon(content.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {content.title}
                            </h3>
                            <Badge variant={getContentTypeColor(content.type)}>
                              {content.type}
                            </Badge>
                            {!content.isPublished && (
                              <Badge variant="default">Draft</Badge>
                            )}
                            {content.isFree && (
                              <Badge variant="success">Free Preview</Badge>
                            )}
                          </div>
                          {content.description && (
                            <p className="text-gray-600 text-sm mb-2">
                              {content.description}
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Order: {content.order}</span>
                            {content.type === 'video' && content.videoDuration > 0 && (
                              <span>{Math.floor(content.videoDuration / 60)}:{(content.videoDuration % 60).toString().padStart(2, '0')} min</span>
                            )}
                            {content.type === 'question' && content.options && (
                              <span>{content.options.length} options</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => navigate(`/mentor/courses/${courseId}/content/${content._id}/edit`)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(content._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
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
