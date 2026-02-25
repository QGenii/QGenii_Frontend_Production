import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../../Components/layout/Sidebar';
import { Card } from '../../Components/ui/Card';
import { Badge } from '../../Components/ui/Badge';
import { Button } from '../../Components/ui/Button';
import { Input } from '../../Components/ui/Input';
import { Select } from '../../Components/ui/Select';
import { Spinner } from '../../Components/ui/Spinner';
import { Pagination } from '../../Components/ui/Pagination';
import api from '../../lib/api';
import { Eye, Edit, Trash2 } from 'lucide-react';

export const CoursesManage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    category: '',
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchCourses(currentPage);
  }, [currentPage, filters]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories?limit=100');
      setCategories(response.data.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchCourses = async (page) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page,
        limit: 10,
        ...(filters.search && { q: filters.search }),
        ...(filters.type && { type: filters.type }),
        ...(filters.category && { category: filters.category }),
      });

      const response = await api.get(`/courses?${params}`);
      setCourses(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

	  const handleApproveCourse = async (courseId) => {
	    try {
	      await api.patch(`/courses/${courseId}/approve`, { isApproved: true });
	      await fetchCourses(currentPage);
	      alert('Course approved successfully!');
	    } catch (error) {
	      console.error('Failed to approve course:', error);
	      const errorMessage =
	        error.response?.data?.message || 'Failed to approve course';
	      alert(errorMessage);
	    }
	  };

  const handleDelete = async (courseId) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      await api.delete(`/courses/${courseId}`);
      fetchCourses(currentPage);
    } catch (error) {
      console.error('Failed to delete course:', error);
      alert('Failed to delete course');
    }
  };

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'text', label: 'Text' },
    { value: 'video', label: 'Video' },
  ];

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...categories.map((cat) => ({ value: cat._id, label: cat.name })),
  ];

  return (
    <div className="flex">
      <Sidebar />
	      <div className="flex-1 p-8 bg-white">
	        <div className="mb-8 flex items-center justify-between gap-4">
	          <div>
	            <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
	            <p className="text-gray-600 mt-2">Manage all courses on the platform</p>
	          </div>
	          <Link to="/admin/courses/create">
	            <Button size="md" className="shadow-sm">
	              + Create Course
	            </Button>
	          </Link>
	        </div>

        {/* Filters */}
        <Card className="mb-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search courses..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
            <Select
              options={typeOptions}
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            />
            <Select
              options={categoryOptions}
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
            />
          </div>
        </Card>

        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Course
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Mentor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {courses.map((course) => (
                      <tr key={course._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {course.thumbnail && (
                              <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-16 h-16 object-cover rounded"
                              />
                            )}
                            <div>
                              <div className="font-medium text-gray-900">
                                {course.title}
                              </div>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="default">{course.type}</Badge>
                                <Badge variant="default">{course.level}</Badge>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {course.category?.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {course.mentor?.name}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            {course.isPublished ? (
                              <Badge variant="success">Published</Badge>
                            ) : (
                              <Badge variant="warning">Draft</Badge>
                            )}
                            {course.isApproved ? (
                              <Badge variant="success">Approved</Badge>
                            ) : (
                              <Badge variant="warning">Pending</Badge>
                            )}
                          </div>
                        </td>
	                        <td className="px-6 py-4 text-right">
	                          <div className="flex justify-end gap-2">
	                            <a
	                              href={`/courses/${course._id}`}
	                              target="_blank"
	                              rel="noopener noreferrer"
	                            >
	                              <Button variant="secondary" className="text-xs">
	                                <Eye className="w-3 h-3" />
	                              </Button>
	                            </a>

	                            {/* Edit course (admin) */}
	                            <Link to={`/admin/courses/edit/${course._id}`}>
	                              <Button
	                                variant="secondary"
	                                className="text-xs"
	                              >
	                                <Edit className="w-3 h-3" />
	                              </Button>
	                            </Link>

	                            {/* Approve button shown only when course is not approved */}
	                            {!course.isApproved && (
	                              <Button
	                                variant="success"
	                                className="text-xs"
	                                onClick={() => handleApproveCourse(course._id)}
	                              >
	                                Approve
	                              </Button>
	                            )}

	                            <Button
	                              variant="danger"
	                              className="text-xs"
	                              onClick={() => handleDelete(course._id)}
	                            >
	                              <Trash2 className="w-3 h-3" />
	                            </Button>
	                          </div>
	                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {pagination.totalPages > 1 && (
              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
