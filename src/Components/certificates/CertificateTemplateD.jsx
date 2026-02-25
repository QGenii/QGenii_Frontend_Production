import React from 'react';
import { QrCode, Shield, CheckCircle, Star, Award } from 'lucide-react';

/**
 * Certificate Template D - Platform Achievement
 * Used for: trusted member, career readiness, platform milestones
 * Design: Modern branded design for platform-specific achievements with professional styling
 */
const CertificateTemplateD = ({ certificate }) => {
  const {
    recipientName,
    title,
    description,
    achievementText,
    metadata = {},
    issueDate,
    certificateId,
    verificationCode,
    qrCode,
    signatureName = 'QGenii Team',
    signatureTitle = 'Platform Director',
  } = certificate;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="certificate-container w-full bg-gradient-to-br from-cyan-100 via-white to-cyan-100 p-8 md:p-16" id="certificate">
      {/* Modern elegant border */}
      <div className="relative bg-white shadow-2xl" style={{ minHeight: '800px' }}>
        {/* Corner badges */}
        <div className="absolute top-0 left-0 w-36 h-36">
          <div className="absolute top-0 left-0 w-28 h-28 border-t-8 border-l-8 border-cyan-700"></div>
          <Shield className="absolute top-6 left-6 text-cyan-600" size={32} />
        </div>
        <div className="absolute top-0 right-0 w-36 h-36">
          <div className="absolute top-0 right-0 w-28 h-28 border-t-8 border-r-8 border-cyan-700"></div>
          <Shield className="absolute top-6 right-6 text-cyan-600" size={32} />
        </div>
        <div className="absolute bottom-0 left-0 w-36 h-36">
          <div className="absolute bottom-0 left-0 w-28 h-28 border-b-8 border-l-8 border-cyan-700"></div>
          <Star className="absolute bottom-6 left-6 text-cyan-500" size={28} />
        </div>
        <div className="absolute bottom-0 right-0 w-36 h-36">
          <div className="absolute bottom-0 right-0 w-28 h-28 border-b-8 border-r-8 border-cyan-700"></div>
          <Star className="absolute bottom-6 right-6 text-cyan-500" size={28} />
        </div>
        
        {/* Modern borders */}
        <div className="absolute inset-8 border-4 border-cyan-700"></div>
        <div className="absolute inset-10 border-2 border-cyan-500"></div>
        
        {/* Top and bottom accent bars */}
        <div className="absolute top-14 left-14 right-14 h-1 bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-500"></div>
        <div className="absolute bottom-14 left-14 right-14 h-1 bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-500"></div>
        
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden">
          <Shield className="text-cyan-300" size={380} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-between p-16 md:p-20" style={{ minHeight: '800px' }}>
            
            {/* Header with modern logo */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center mb-5">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-cyan-500 rounded-full animate-pulse opacity-20"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-br from-cyan-600 to-cyan-500 rounded-full flex items-center justify-center shadow-xl">
                    <span className="text-white font-bold text-3xl" style={{ fontFamily: 'Georgia, serif' }}>Q</span>
                  </div>
                </div>
              </div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-700 via-cyan-600 to-cyan-700 bg-clip-text text-transparent mb-3 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                QGenii
              </h1>
              <div className="flex items-center justify-center gap-3 mt-3">
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-cyan-600 to-transparent"></div>
                <p className="text-sm text-cyan-700 uppercase tracking-widest font-semibold">
                  Platform Excellence
                </p>
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-cyan-600 to-transparent"></div>
              </div>
            </div>

            {/* Achievement Badge */}
            <div className="text-center mt-8">
              <div className="inline-block px-10 py-4 bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-2xl shadow-xl">
                <div className="flex items-center justify-center gap-3">
                  <CheckCircle className="text-white" size={24} />
                  <span className="text-xl font-bold uppercase text-white tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>Platform Achievement</span>
                  <CheckCircle className="text-white" size={24} />
                </div>
              </div>
            </div>

            {/* Certificate Title */}
            <div className="text-center mt-8">
              <div className="inline-block">
                <p className="text-xl text-gray-600 mb-3 uppercase tracking-widest" style={{ letterSpacing: '0.3em' }}>Certificate of</p>
                <h2 className="text-3xl font-bold text-cyan-800 uppercase tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>{title.replace('Certificate of ', '').replace('Certificate', '')}</h2>
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-cyan-600 to-transparent mt-3"></div>
              </div>
            </div>

            {/* Main Content */}
            <div className="text-center my-12 max-w-3xl">
              <p className="text-lg text-gray-600 mb-10 uppercase tracking-wide" style={{ letterSpacing: '0.2em' }}>
                This is to certify that
              </p>
              
              <div className="relative inline-block">
                <div className="absolute -inset-3 bg-gradient-to-r from-cyan-200 via-cyan-100 to-cyan-200 opacity-30 blur-sm"></div>
                <div className="relative">
                  <h3 className="text-5xl md:text-6xl font-bold text-cyan-900 py-6 px-8" style={{ fontFamily: 'Georgia, serif' }}>
                    {recipientName}
                  </h3>
                  <div className="absolute bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-700 to-transparent"></div>
                </div>
              </div>
              
              <p className="text-xl text-gray-800 leading-relaxed mt-10 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                {achievementText}
              </p>

              {/* Member since with badge */}
              {metadata.memberSince && (
                <div className="mt-6">
                  <div className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-full shadow-lg">
                    <p className="text-base text-white font-semibold">
                      Member Since: {new Date(metadata.memberSince).getFullYear()}
                    </p>
                  </div>
                </div>
              )}

              {/* Contributions */}
              {metadata.contributions && (
                <p className="text-base text-gray-700 mt-4 font-semibold">
                  Platform Contributions: {metadata.contributions}
                </p>
              )}

              {/* Skills acquired with modern pills */}
              {metadata.skillsAcquired && Array.isArray(metadata.skillsAcquired) && (
                <div className="mt-8">
                  <p className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Skills Mastered:</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {metadata.skillsAcquired.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-400 text-white text-sm rounded-full shadow-md font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {description && (
                <p className="text-base text-gray-600 mt-6 italic" style={{ fontFamily: 'Georgia, serif' }}>{description}</p>
              )}
            </div>

            {/* Date with modern badge */}
            <div className="text-center mt-8">
              <div className="inline-block px-10 py-4 border-2 border-cyan-600 rounded-full bg-gradient-to-r from-cyan-50 to-white shadow-lg">
                <p className="text-sm text-gray-700 font-bold uppercase tracking-wide">
                  Issued on {formatDate(issueDate)}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-end w-full mt-12">
              {/* QR Code with modern frame */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-br from-cyan-600 to-cyan-500 rounded-lg opacity-20"></div>
                  {qrCode ? (
                    <div className="relative border-4 border-cyan-600 p-2 bg-white rounded-xl shadow-xl">
                      <img src={qrCode} alt="QR Code" className="w-24 h-24" />
                    </div>
                  ) : (
                    <div className="relative w-24 h-24 border-4 border-cyan-600 p-2 bg-white rounded-xl flex items-center justify-center shadow-xl">
                      <QrCode size={48} className="text-cyan-600" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-3 font-bold uppercase tracking-wide">Verify Certificate</p>
              </div>

              {/* Signature with shield seal */}
              <div className="text-center">
                <div className="relative inline-block">
                  {/* Shield seal */}
                  <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full border-4 border-cyan-600 bg-gradient-to-br from-cyan-100 to-white flex items-center justify-center transform rotate-12 shadow-xl">
                    <Award className="text-cyan-600" size={32} />
                  </div>
                  <div className="border-t-3 border-cyan-700 pt-4 w-64" style={{ borderTopWidth: '3px' }}>
                    <p className="text-base font-bold text-cyan-900" style={{ fontFamily: 'Georgia, serif' }}>{signatureName}</p>
                    <p className="text-sm text-gray-600 mt-1 font-semibold">{signatureTitle}</p>
                    <p className="text-xs text-gray-500 mt-1">QGenii Platform</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificate ID */}
            <div className="text-center mt-6 space-y-1">
              <p className="text-xs text-cyan-700 font-mono font-semibold uppercase tracking-wide">Certificate ID: {certificateId}</p>
              <p className="text-xs text-cyan-600 font-mono">Verification: {verificationCode}</p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CertificateTemplateD;
