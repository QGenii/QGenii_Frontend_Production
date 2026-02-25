import React from 'react';
import { QrCode, Award, Star } from 'lucide-react';

/**
 * Certificate Template A - Participation Style
 * Used for: workshops, contests, hackathons, participation events
 * Design: Professional participation certificate with ornate borders
 */
const CertificateTemplateA = ({ certificate }) => {
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
    <div className="certificate-container w-full bg-gradient-to-br from-blue-50 via-white to-blue-50 p-8 md:p-16" id="certificate">
      {/* Outer decorative border */}
      <div className="relative bg-white shadow-2xl" style={{ minHeight: '800px' }}>
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t-8 border-l-8 border-blue-900"></div>
        <div className="absolute top-0 right-0 w-32 h-32 border-t-8 border-r-8 border-blue-900"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b-8 border-l-8 border-blue-900"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-8 border-r-8 border-blue-900"></div>
        
        {/* Decorative stars in corners */}
        <Star className="absolute top-4 left-4 text-blue-900 opacity-20" size={24} />
        <Star className="absolute top-4 right-4 text-blue-900 opacity-20" size={24} />
        <Star className="absolute bottom-4 left-4 text-blue-900 opacity-20" size={24} />
        <Star className="absolute bottom-4 right-4 text-blue-900 opacity-20" size={24} />
        
        {/* Main border */}
        <div className="absolute inset-8 border-4 border-blue-800"></div>
        <div className="absolute inset-10 border-2 border-blue-600"></div>
        <div className="absolute inset-12 border border-blue-400"></div>
        
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-3 pointer-events-none overflow-hidden">
          <Award className="text-blue-900" size={400} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-between p-16 md:p-20" style={{ minHeight: '800px' }}>
            
            {/* Header with ornate design */}
            <div className="text-center">
              <div className="inline-block px-8 py-4 border-4 border-double border-blue-900 bg-gradient-to-r from-blue-50 to-blue-100">
                <h1 className="text-5xl font-bold text-blue-900 tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>QGenii</h1>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="h-px w-12 bg-blue-900"></div>
                  <p className="text-sm text-blue-700 uppercase tracking-widest">Empowering Excellence</p>
                  <div className="h-px w-12 bg-blue-900"></div>
                </div>
              </div>
            </div>

            {/* Certificate Title */}
            <div className="text-center mt-12">
              <div className="inline-block">
                <p className="text-lg text-gray-600 mb-2 uppercase tracking-widest" style={{ letterSpacing: '0.3em' }}>Certificate of</p>
                <h2 className="text-3xl font-bold text-blue-900 uppercase tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>{title.replace('Certificate of ', '').replace('Certificate', '')}</h2>
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-blue-900 to-transparent mt-2"></div>
              </div>
            </div>

            {/* Main Content */}
            <div className="text-center my-12 max-w-3xl">
              <p className="text-lg text-gray-600 mb-8 uppercase tracking-wide" style={{ letterSpacing: '0.2em' }}>This is to certify that</p>
              
              <div className="relative inline-block">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 -skew-y-1"></div>
                <h3 className="relative text-5xl md:text-6xl font-bold text-blue-900 py-6 px-8" style={{ fontFamily: 'Georgia, serif' }}>
                  {recipientName}
                </h3>
                <div className="absolute bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-900 to-transparent"></div>
              </div>
              
              <p className="text-xl text-gray-700 leading-relaxed mt-10 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                {achievementText}
              </p>

              {metadata.eventName || metadata.contestName || metadata.workshopName || metadata.hackathonName ? (
                <div className="mt-8">
                  <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg shadow-lg">
                    <p className="text-xl font-semibold">
                      {metadata.eventName || metadata.contestName || metadata.workshopName || metadata.hackathonName}
                    </p>
                  </div>
                </div>
              ) : null}

              {description && (
                <p className="text-base text-gray-600 mt-6 italic">{description}</p>
              )}
              
              {metadata.problemsSolved && (
                <p className="text-sm text-blue-700 mt-4 font-semibold">
                  Successfully solved {metadata.problemsSolved} problem{metadata.problemsSolved !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            {/* Date with seal */}
            <div className="text-center mt-8">
              <div className="inline-block px-8 py-3 border-2 border-blue-900 rounded-full bg-gradient-to-r from-blue-50 to-white">
                <p className="text-sm text-gray-700 font-semibold uppercase tracking-wide">
                  Issued on {formatDate(issueDate)}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-end w-full mt-12">
              {/* QR Code with seal design */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full opacity-20"></div>
                  {qrCode ? (
                    <img src={qrCode} alt="QR Code" className="relative w-24 h-24 p-2 bg-white rounded-lg border-4 border-blue-900 shadow-lg" />
                  ) : (
                    <div className="relative w-24 h-24 p-2 bg-white rounded-lg border-4 border-blue-900 flex items-center justify-center shadow-lg">
                      <QrCode size={48} className="text-blue-900" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-3 font-semibold uppercase tracking-wide">Scan to Verify</p>
              </div>

              {/* Signature with official seal */}
              <div className="text-center">
                <div className="relative inline-block">
                  {/* Official seal */}
                  <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full border-4 border-blue-900 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center transform rotate-12">
                    <Award className="text-blue-900" size={24} />
                  </div>
                  <div className="border-t-3 border-blue-900 pt-3 w-56" style={{ borderTopWidth: '3px' }}>
                    <p className="text-base font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>{signatureName}</p>
                    <p className="text-sm text-gray-600 mt-1">{signatureTitle}</p>
                    <p className="text-xs text-gray-500 mt-1">QGenii Platform</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificate ID */}
            <div className="text-center mt-6 space-y-1">
              <p className="text-xs text-gray-600 font-mono">Certificate ID: {certificateId}</p>
              <p className="text-xs text-gray-500 font-mono">Verification: {verificationCode}</p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CertificateTemplateA;
