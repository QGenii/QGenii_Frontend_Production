import { useEffect, useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { Card, CardBody } from '../../Components/ui/Card';
import { Button } from '../../Components/ui/Button';
import { Spinner } from '../../Components/ui/Spinner';
import { Badge } from '../../Components/ui/Badge';
import api from '../../lib/api';
import EnrollmentsManager from './EnrollmentsManager';
import { CourseModuleManager } from './CourseModuleManager';
import CourseReviewsTab from './CourseReviewsTab';

export default function CourseManageDashboard() {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  const [tab, setTab] = useState(tabFromUrl || 'overview');
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // Update tab when URL param changes
  useEffect(() => {
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/courses/${courseId}`);
        setCourse(res.data.data.course);
      } catch (e) {
        console.error('Failed to load course', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Manage: {course?.title}</h1>
            <div className="flex gap-2 mt-2">
              {course?.isPublished ? <Badge variant="success">Published</Badge> : <Badge variant="warning">Draft</Badge>}
              {course?.isApproved ? <Badge variant="success">Approved</Badge> : <Badge variant="warning">Pending</Badge>}
            </div>
          </div>
          <div className="flex gap-2">
            <Link to={`/courses/${courseId}`} target="_blank"><Button variant="secondary">View</Button></Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b mb-6">
          <nav className="-mb-px flex gap-6" aria-label="Tabs">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'students', label: 'Students' },
              { id: 'reviews', label: 'Reviews' },
              { id: 'modules', label: 'Modules & Content' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  tab === t.id ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab content */}
        {tab === 'overview' && (
          <Card>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Course Details</h3>
                  <p className="text-gray-700 mb-2">{course?.description}</p>
                  <div className="text-sm text-gray-600">Level: {course?.level} • Type: {course?.type}</div>
                  <div className="text-sm text-gray-600">Duration: {course?.duration} min • Price: {course?.isPaid ? `$${course?.price}` : 'Free'}</div>
                </div>
                <div>
                  {course?.thumbnail && (
                    <img src={course.thumbnail} alt={course.title} className="w-full max-w-md rounded border" />
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        )}

        {tab === 'students' && (
          <EnrollmentsManager />
        )}

        {tab === 'reviews' && (
          <CourseReviewsTab />
        )}

        {tab === 'modules' && (
          <CourseModuleManager />
        )}
      </div>
    </div>
  );
}
