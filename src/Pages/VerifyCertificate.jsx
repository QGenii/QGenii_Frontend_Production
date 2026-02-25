import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Download, Share2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import api from '../lib/api';
import CertificateRenderer from '../components/certificates/CertificateRenderer';

const VerifyCertificate = () => {
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      verifyCertificate();
    }
  }, [id]);

  const verifyCertificate = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get(`/certificates/verify/${id}`);
      
      if (response.data.success) {
        setCertificate(response.data.data);
        setVerificationStatus('valid');
      } else {
        setVerificationStatus('invalid');
        setError(response.data.message);
      }
    } catch (err) {
      console.error('Error verifying certificate:', err);
      setVerificationStatus('error');
      setError(err.response?.data?.message || 'Failed to verify certificate');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      const shareUrl = window.location.href;
      
      if (navigator.share) {
        await navigator.share({
          title: certificate.title,
          text: `Check out this ${certificate.title} from QGenii!`,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert('Certificate link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing certificate:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying certificate...</p>
        </div>
      </div>
    );
  }

  if (verificationStatus === 'invalid' || verificationStatus === 'error') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          {verificationStatus === 'invalid' ? (
            <>
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <XCircle className="h-10 w-10 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Certificate</h2>
              <p className="text-gray-600 mb-6">{error || 'This certificate could not be verified.'}</p>
            </>
          ) : (
            <>
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-4">
                <AlertCircle className="h-10 w-10 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Error</h2>
              <p className="text-gray-600 mb-6">{error || 'An error occurred while verifying the certificate.'}</p>
            </>
          )}
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  if (!certificate) {
    return null;
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Verification Banner */}
      <div className="bg-green-600 text-white py-4 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <CheckCircle className="h-6 w-6 mr-2" />
            <span className="font-semibold">This certificate is verified and authentic</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white border-b border-gray-200 py-4 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Certificate Verification</h1>
            <div className="flex space-x-3">
              <button
                onClick={handleShare}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Download/Print
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Display */}
      <div className="py-8 print:py-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 print:px-0 print:max-w-none">
          <div className="bg-white shadow-2xl print:shadow-none" style={{ aspectRatio: '1.414/1' }}>
            <CertificateRenderer certificate={certificate} />
          </div>
        </div>
      </div>

      {/* Certificate Details */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:hidden">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Certificate Details</h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Certificate ID</dt>
              <dd className="mt-1 text-sm text-gray-900 font-mono">{certificate.certificateId}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Recipient</dt>
              <dd className="mt-1 text-sm text-gray-900">{certificate.recipientName}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Issue Date</dt>
              <dd className="mt-1 text-sm text-gray-900">{formatDate(certificate.issueDate)}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Type</dt>
              <dd className="mt-1 text-sm text-gray-900">{certificate.title}</dd>
            </div>
            <div className="md:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Verification Code</dt>
              <dd className="mt-1 text-sm text-gray-900 font-mono">{certificate.verificationCode}</dd>
            </div>
            <div className="md:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Verification Status</dt>
              <dd className="mt-1">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Verified & Authentic
                </span>
              </dd>
            </div>
          </dl>
        </div>

        {/* About QGenii */}
        <div className="mt-6 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">About QGenii Certificates</h3>
          <p className="text-sm text-blue-800">
            QGenii certificates are issued to recognize achievements in learning, professional development,
            and community contributions. Each certificate is uniquely verifiable and represents real accomplishments
            on the QGenii platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyCertificate;
