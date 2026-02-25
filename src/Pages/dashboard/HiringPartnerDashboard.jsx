import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Sidebar } from '../../Components/layout/Sidebar';
import { getMyJobPostings, getJobStatistics } from '../../lib/jobApi';
import { Briefcase, Users, CheckCircle, XCircle, Clock, TrendingUp, Plus, Eye } from 'lucide-react';

export const HiringPartnerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    pendingApplications: 0,
    acceptedCandidates: 0,
    shortlistedCandidates: 0
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [jobsByType, setJobsByType] = useState({
    JOB: 0,
    INTERNSHIP: 0,
    SCHOLARSHIP: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all job postings
      const jobsResponse = await getMyJobPostings();
      const jobs = jobsResponse.jobs || [];
      
      setRecentJobs(jobs.slice(0, 5)); // Get 5 most recent jobs
      
      // Calculate statistics
      const activeJobs = jobs.filter(j => j.status === 'ACTIVE');
      let totalApplications = 0;
      let pendingApplications = 0;
      let acceptedCandidates = 0;
      let shortlistedCandidates = 0;
      
      const typeCount = { JOB: 0, INTERNSHIP: 0, SCHOLARSHIP: 0 };
      
      jobs.forEach(job => {
        typeCount[job.type] = (typeCount[job.type] || 0) + 1;
        totalApplications += job.applicationsCount || 0;
      });
      
      // Fetch detailed statistics for each job
      const statsPromises = jobs.map(job => 
        getJobStatistics(job._id).catch(() => null)
      );
      
      const allStats = await Promise.all(statsPromises);
      
      allStats.forEach(stat => {
        if (stat && stat.statistics) {
          const statusCounts = stat.statistics.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
          }, {});
          
          pendingApplications += statusCounts.PENDING || 0;
          acceptedCandidates += statusCounts.ACCEPTED || 0;
          shortlistedCandidates += statusCounts.SHORTLISTED || 0;
        }
      });
      
      setStats({
        totalJobs: jobs.length,
        activeJobs: activeJobs.length,
        totalApplications,
        pendingApplications,
        acceptedCandidates,
        shortlistedCandidates
      });
      
      setJobsByType(typeCount);
      
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, bgColor, link }) => (
    <div 
      className={`${bgColor} p-6 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow`}
      onClick={() => link && navigate(link)}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <p className={`text-3xl font-bold ${color} mt-2`}>{value}</p>
        </div>
        <div className={`${color} ${bgColor} p-3 rounded-full`}>
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </div>
  );

  const JobTypeCard = ({ type, count, icon: Icon }) => {
    const colors = {
      JOB: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
      INTERNSHIP: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200' },
      SCHOLARSHIP: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' }
    };
    
    const style = colors[type] || colors.JOB;
    
    return (
      <div className={`${style.bg} p-5 rounded-lg border ${style.border}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">{type}</p>
            <p className={`text-2xl font-bold ${style.text} mt-1`}>{count}</p>
          </div>
          <Icon className={`w-6 h-6 ${style.text}`} />
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Hiring Partner Dashboard</h1>
                <p className="text-gray-600 mt-2">Welcome back, {user?.name}</p>
              </div>
              <button
                onClick={() => navigate('/dashboard/jobs/create')}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
              >
                <Plus className="w-5 h-5" />
                Create New Posting
              </button>
            </div>
          </div>

          {/* Main Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Total Job Postings"
              value={stats.totalJobs}
              icon={Briefcase}
              color="text-blue-600"
              bgColor="bg-blue-50"
              link="/dashboard/jobs"
            />
            <StatCard
              title="Active Postings"
              value={stats.activeJobs}
              icon={TrendingUp}
              color="text-green-600"
              bgColor="bg-green-50"
              link="/dashboard/jobs"
            />
            <StatCard
              title="Total Applications"
              value={stats.totalApplications}
              icon={Users}
              color="text-purple-600"
              bgColor="bg-purple-50"
            />
            <StatCard
              title="Pending Review"
              value={stats.pendingApplications}
              icon={Clock}
              color="text-orange-600"
              bgColor="bg-orange-50"
            />
            <StatCard
              title="Shortlisted"
              value={stats.shortlistedCandidates}
              icon={CheckCircle}
              color="text-yellow-600"
              bgColor="bg-yellow-50"
            />
            <StatCard
              title="Accepted"
              value={stats.acceptedCandidates}
              icon={CheckCircle}
              color="text-green-600"
              bgColor="bg-green-50"
            />
          </div>

          {/* Job Types Breakdown */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Postings by Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <JobTypeCard type="JOB" count={jobsByType.JOB} icon={Briefcase} />
              <JobTypeCard type="INTERNSHIP" count={jobsByType.INTERNSHIP} icon={Users} />
              <JobTypeCard type="SCHOLARSHIP" count={jobsByType.SCHOLARSHIP} icon={TrendingUp} />
            </div>
          </div>

          {/* Recent Job Postings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Recent Postings</h2>
                <Link 
                  to="/dashboard/jobs"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  View All →
                </Link>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {recentJobs.length > 0 ? (
                recentJobs.map((job) => (
                  <div 
                    key={job._id}
                    className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/dashboard/jobs/${job._id}/applications`)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            job.type === 'JOB' ? 'bg-green-100 text-green-800' :
                            job.type === 'INTERNSHIP' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {job.type}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            job.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                            job.status === 'CLOSED' ? 'bg-red-100 text-red-800' :
                            job.status === 'FILLED' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {job.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <span>📍 {job.location}</span>
                          <span>💼 {job.locationType}</span>
                          <span>📊 {job.experienceLevel}</span>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm">
                          <span className="flex items-center gap-1 text-gray-600">
                            <Eye className="w-4 h-4" />
                            {job.views || 0} views
                          </span>
                          <span className="flex items-center gap-1 text-blue-600 font-medium">
                            <Users className="w-4 h-4" />
                            {job.applicationsCount || 0} applications
                          </span>
                          <span className="text-gray-500">
                            Posted {new Date(job.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/dashboard/jobs/${job._id}/edit`);
                          }}
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/dashboard/jobs/${job._id}/applications`);
                          }}
                          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                        >
                          View Applications
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center">
                  <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No postings yet</h3>
                  <p className="text-gray-600 mb-6">Get started by creating your first job posting</p>
                  <button
                    onClick={() => navigate('/dashboard/jobs/create')}
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <Plus className="w-5 h-5" />
                    Create Job Posting
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div 
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate('/dashboard/jobs')}
            >
              <Briefcase className="w-10 h-10 text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage All Postings</h3>
              <p className="text-gray-600 text-sm">View, edit, and manage all your job postings</p>
            </div>
            
            <div 
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate('/dashboard/jobs/create')}
            >
              <Plus className="w-10 h-10 text-green-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Create New Posting</h3>
              <p className="text-gray-600 text-sm">Post a new job, internship, or scholarship</p>
            </div>
            
            <div 
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate('/jobs')}
            >
              <Eye className="w-10 h-10 text-purple-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">View Public Portal</h3>
              <p className="text-gray-600 text-sm">See how candidates view your postings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
