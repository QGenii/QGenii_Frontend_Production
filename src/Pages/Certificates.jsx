import React, { useState, useEffect } from 'react';
import { Download, Share2, Eye, Award, Filter, Search,  Calendar } from 'lucide-react';
import api from '../lib/api';
import { useAuth } from '../hooks/useAuth';

const Certificates = () => {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [filteredCertificates, setFilteredCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Template type labels
  const getTemplateLabel = (templateId) => {
    const labels = {
      'TEMPLATE_A': 'Participation',
      'TEMPLATE_B': 'Professional Merit',
      'TEMPLATE_C': 'Award Winner',
      'TEMPLATE_D': 'Platform Achievement',
      'TEMPLATE_E': 'Program Completion',
    };
    return labels[templateId] || 'Certificate';
  };

  // Get template color
  const getTemplateColor = (templateId) => {
    const colors = {
      'TEMPLATE_A': 'bg-blue-100 text-blue-800 border-blue-300',
      'TEMPLATE_B': 'bg-slate-100 text-slate-800 border-slate-300',
      'TEMPLATE_C': 'bg-amber-100 text-amber-800 border-amber-300',
      'TEMPLATE_D': 'bg-cyan-100 text-cyan-800 border-cyan-300',
      'TEMPLATE_E': 'bg-indigo-100 text-indigo-800 border-indigo-300',
    };
    return colors[templateId] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  useEffect(() => {
    fetchCertificates();
    fetchStats();
  }, []);

  useEffect(() => {
    filterCertificates();
  }, [selectedCategory, searchQuery, certificates]);

  const fetchCertificates = async () => {
    try {
      const response = await api.get('/certificates/my');
      setCertificates(response.data.data);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/certificates/stats');
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const filterCertificates = () => {
    let filtered = [...certificates];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(cert => cert.templateId === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(cert =>
        cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.certificateType.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCertificates(filtered);
  };

  const handleDownload = async (certificateId) => {
    try {
      const response = await api.get(`/certificates/${certificateId}/download`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `certificate-${certificateId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading certificate:', error);
      alert('Failed to download certificate');
    }
  };

  const handleShare = async (certificate) => {
    try {
      await api.post(`/certificates/${certificate._id}/share`);
      
      const shareUrl = `${window.location.origin}/verify/${certificate.certificateId}`;
      
      if (navigator.share) {
        await navigator.share({
          title: certificate.title,
          text: `Check out my ${certificate.title} from QGenii!`,
          url: shareUrl,
        });
      } else {
        navigator.clipboard.writeText(shareUrl);
        alert('Certificate link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing certificate:', error);
    }
  };

  const handleView = (certificateId) => {
    window.open(`/verify/${certificateId}`, '_blank');
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Certificates</h1>
          <p className="mt-2 text-gray-600">
            View, download, and share your achievement certificates
          </p>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Certificates</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Download className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Downloads</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalDownloads}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Share2 className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Shares</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalShares}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Filter className="h-8 w-8 text-amber-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Templates Used</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Object.keys(stats.byTemplate || {}).length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="inline-block w-4 h-4 mr-2" />
                Filter by Template
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Templates</option>
                <option value="TEMPLATE_A">Participation</option>
                <option value="TEMPLATE_B">Professional Merit</option>
                <option value="TEMPLATE_C">Award Winner</option>
                <option value="TEMPLATE_D">Platform Achievement</option>
                <option value="TEMPLATE_E">Program Completion</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search className="inline-block w-4 h-4 mr-2" />
                Search
              </label>
              <input
                type="text"
                placeholder="Search by title or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Certificates Grid */}
        {filteredCertificates.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Award className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No certificates found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {certificates.length === 0
                ? 'Complete courses and participate in events to earn certificates.'
                : 'Try adjusting your search or filter criteria.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map((certificate) => (
              <div
                key={certificate._id}
                className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`h-2 rounded-t-lg ${getTemplateColor(certificate.templateId).split(' ').slice(0, 1)}`}></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${getTemplateColor(certificate.templateId)}`}>
                        {getTemplateLabel(certificate.templateId)}
                      </span>
                      <h3 className="mt-3 text-lg font-semibold text-gray-900 line-clamp-2">
                        {certificate.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {certificate.description}
                  </p>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(certificate.issueDate)}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleView(certificate.certificateId)}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                    <button
                      onClick={() => handleDownload(certificate._id)}
                      className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </button>
                    <button
                      onClick={() => handleShare(certificate)}
                      className="px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Certificates;
