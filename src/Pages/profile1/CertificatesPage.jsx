import { useState, useEffect } from 'react';
import { Card, CardBody } from '../../Components/ui/Card';
import { Spinner } from '../../Components/ui/Spinner';
import { userProfileApi } from '../../lib/userProfileApi';
import {
  Award,
  Download,
  Calendar,
  Trophy,
  TrendingUp,
  FileText,
  Star
} from 'lucide-react';

const CertificatesPage = () => {
  const [certificates, setCertificates] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(false);

  useEffect(() => {
    fetchCertificates();
    fetchStats();
  }, []);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const response = await userProfileApi.getUserCertificates();
      setCertificates(response.data.data.certificates);
    } catch (error) {
      console.error('Failed to fetch certificates:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      setStatsLoading(true);
      const response = await userProfileApi.getCertificateStats();
      setStats(response.data.data.stats);
    } catch (error) {
      console.error('Failed to fetch certificate stats:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  const handleRemoveCertificate = async (certificateId) => {
    if (!confirm('Are you sure you want to remove this certificate from your profile?')) {
      return;
    }

    try {
      await userProfileApi.removeCertificateFromUser(certificateId);
      await fetchCertificates();
      await fetchStats();
    } catch (error) {
      console.error('Failed to remove certificate:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Award className="text-amber-500" size={32} />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Certificates</h1>
          <p className="text-gray-600">
            Your earned certificates and achievements
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardBody className="p-4 text-center">
              <Trophy className="text-amber-500 mx-auto mb-2" size={24} />
              <div className="text-2xl font-bold text-gray-900">{stats.totalCertificates}</div>
              <div className="text-sm text-gray-600">Total Certificates</div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-4 text-center">
              <Calendar className="text-blue-500 mx-auto mb-2" size={24} />
              <div className="text-2xl font-bold text-gray-900">{stats.thisMonth}</div>
              <div className="text-sm text-gray-600">This Month</div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-4 text-center">
              <TrendingUp className="text-green-500 mx-auto mb-2" size={24} />
              <div className="text-2xl font-bold text-gray-900">{stats.thisYear}</div>
              <div className="text-sm text-gray-600">This Year</div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-4 text-center">
              <Star className="text-purple-500 mx-auto mb-2" size={24} />
              <div className="text-2xl font-bold text-gray-900">{stats.completionRate}%</div>
              <div className="text-sm text-gray-600">Completion Rate</div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Certificates Grid */}
      {certificates.length === 0 ? (
        <div className="text-center py-12">
          <Award size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No certificates yet</h2>
          <p className="text-gray-600 mb-6">
            Complete courses and contests to earn certificates and showcase your achievements
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Browse Courses
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
              Browse Contests
            </button>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate, index) => (
            <Card key={certificate._id || index} className="hover:shadow-lg transition-shadow">
              <CardBody className="p-6">
                {/* Certificate Header */}
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="text-white" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {certificate.title || `Certificate ${index + 1}`}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {certificate.course || 'Course Completion Certificate'}
                  </p>
                </div>

                {/* Certificate Details */}
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>Earned: {certificate.earnedDate || 'Recently'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText size={14} />
                    <span>Type: {certificate.type || 'Course Completion'}</span>
                  </div>
                  {certificate.score && (
                    <div className="flex items-center gap-2">
                      <Star size={14} />
                      <span>Score: {certificate.score}%</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                    title="Download Certificate"
                  >
                    <Download size={14} />
                    Download
                  </button>
                  <button
                    onClick={() => handleRemoveCertificate(certificate._id)}
                    className="px-3 py-2 text-red-600 border border-red-300 text-sm rounded-md hover:bg-red-50 transition-colors"
                    title="Remove Certificate"
                  >
                    Remove
                  </button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificatesPage;