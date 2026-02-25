import React from 'react';
import { QrCode, Award, Medal } from 'lucide-react';

/**
 * Certificate Template B - Merit / Professional Recognition
 * Used for: leaderboard, instructor, mentor, speaker, professional recognition
 * Design: Premium design for professional achievements with elegant styling
 */
const CertificateTemplateB = ({ certificate }) => {
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
    <div className="certificate-container w-full bg-gradient-to-br from-slate-50 via-white to-sky-50 p-8 md:p-16" id="certificate">
      {/* Outer elegant border */}
      <div className="relative bg-white shadow-2xl" style={{ minHeight: '800px' }}>
        {/* Ornate corner decorations */}
        <div className="absolute top-0 left-0 w-40 h-40">
          <div className="absolute top-0 left-0 w-32 h-32 border-t-8 border-l-8 border-slate-900"></div>
          <Medal className="absolute top-6 left-6 text-sky-600" size={28} />
        </div>
        <div className="absolute top-0 right-0 w-40 h-40">
          <div className="absolute top-0 right-0 w-32 h-32 border-t-8 border-r-8 border-slate-900"></div>
          <Medal className="absolute top-6 right-6 text-sky-600" size={28} />
        </div>
        <div className="absolute bottom-0 left-0 w-40 h-40">
          <div className="absolute bottom-0 left-0 w-32 h-32 border-b-8 border-l-8 border-slate-900"></div>
          <Medal className="absolute bottom-6 left-6 text-sky-600" size={28} />
        </div>
        <div className="absolute bottom-0 right-0 w-40 h-40">
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-8 border-r-8 border-slate-900"></div>
          <Medal className="absolute bottom-6 right-6 text-sky-600" size={28} />
        </div>
        
        {/* Multiple decorative borders */}
        <div className="absolute inset-8 border-4 border-slate-800"></div>
        <div className="absolute inset-10 border-2 border-sky-600"></div>
        <div className="absolute inset-12 border border-slate-400"></div>
        
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-3 pointer-events-none overflow-hidden">
          <Medal className="text-slate-300" size={400} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-between p-16 md:p-20" style={{ minHeight: '800px' }}>
            
            {/* Header with elegant design */}
            <div className="text-center">
              <div className="inline-block px-10 py-5 border-4 border-double border-slate-900 bg-gradient-to-r from-sky-50 via-white to-sky-50">
                <h1 className="text-6xl font-bold text-slate-900 tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>QGenii</h1>
                <div className="flex items-center justify-center gap-3 mt-3">
                  <div className="h-px w-16 bg-slate-900"></div>
                  <p className="text-sm text-sky-700 uppercase tracking-widest font-semibold">Professional Excellence</p>
                  <div className="h-px w-16 bg-slate-900"></div>
                </div>
              </div>
            </div>

            {/* Merit Badge */}
            <div className="text-center mt-10">
              <div className="inline-block">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="h-px w-20 bg-gradient-to-r from-transparent via-sky-600 to-transparent"></div>
                  <Award className="text-sky-600" size={32} />
                  <div className="h-px w-20 bg-gradient-to-r from-transparent via-sky-600 to-transparent"></div>
                </div>
                <p className="text-xl text-gray-600 mb-3 uppercase tracking-widest" style={{ letterSpacing: '0.3em' }}>Certificate of</p>
                <h2 className="text-3xl font-bold text-slate-900 uppercase tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>{title.replace('Certificate of ', '').replace('Certificate', '')}</h2>
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-sky-600 to-transparent mt-3"></div>
              </div>
            </div>

            {/* Main Content */}
            <div className="text-center my-12 max-w-3xl">
              <p className="text-xl text-gray-600 mb-10 uppercase tracking-wide italic" style={{ letterSpacing: '0.2em', fontFamily: 'Georgia, serif' }}>
                This is hereby awarded to
              </p>
              
              <div className="relative inline-block">
                <div className="absolute -inset-3 bg-gradient-to-r from-sky-100 via-slate-50 to-sky-100 skew-y-1"></div>
                <div className="relative border-y-4 border-double border-sky-600 py-6 my-8 px-8">
                  <h3 className="text-6xl font-bold text-slate-900" style={{ fontFamily: 'Georgia, serif' }}>
                    {recipientName}
                  </h3>
                </div>
              </div>
              
              <p className="text-xl text-gray-800 leading-relaxed mt-10 mb-8" style={{ fontFamily: 'Georgia, serif' }}>
                {achievementText}
              </p>

              {/* Special recognition for rankings */}
              {metadata.rank && (
                <div className="mt-8">
                  <div className="inline-block px-10 py-4 bg-gradient-to-r from-sky-600 to-sky-500 rounded-full shadow-xl">
                    <Award className="inline-block mr-3 text-white" size={28} />
                    <span className="text-2xl font-bold text-white">
                      Rank: {metadata.rank}
                      {metadata.totalParticipants && ` of ${metadata.totalParticipants}`}
                    </span>
                  </div>
                </div>
              )}

              {description && (
                <p className="text-base text-gray-600 mt-6 italic" style={{ fontFamily: 'Georgia, serif' }}>{description}</p>
              )}
            </div>

            {/* Date with elegant seal */}
            <div className="text-center mt-8">
              <div className="inline-block px-10 py-4 border-2 border-slate-900 rounded-full bg-gradient-to-r from-slate-50 to-white shadow-md">
                <p className="text-sm text-gray-700 font-bold uppercase tracking-widest">
                  Issued on {formatDate(issueDate)}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-end w-full mt-12">
              {/* QR Code with professional design */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="absolute -inset-3 bg-gradient-to-br from-sky-600 to-slate-700 rounded-full opacity-20"></div>
                  {qrCode ? (
                    <img src={qrCode} alt="QR Code" className="relative w-28 h-28 p-2 bg-white rounded-lg border-4 border-slate-900 shadow-xl" />
                  ) : (
                    <div className="relative w-28 h-28 p-2 bg-white rounded-lg border-4 border-slate-900 flex items-center justify-center shadow-xl">
                      <QrCode size={56} className="text-slate-900" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-3 font-bold uppercase tracking-wider">Verify Authenticity</p>
              </div>

              {/* Signature with official seal */}
              <div className="text-center">
                <div className="relative inline-block">
                  {/* Official merit seal */}
                  <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full border-4 border-sky-600 bg-gradient-to-br from-sky-100 to-white flex items-center justify-center transform -rotate-12 shadow-lg">
                    <Medal className="text-sky-600" size={32} />
                  </div>
                  <div className="border-t-4 border-slate-900 pt-4 w-64">
                    <p className="text-lg font-bold text-slate-900" style={{ fontFamily: 'Georgia, serif' }}>{signatureName}</p>
                    <p className="text-sm text-gray-600 mt-1 font-semibold">{signatureTitle}</p>
                    <p className="text-xs text-gray-500 mt-1">QGenii Platform</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificate ID */}
            <div className="text-center mt-6 space-y-1">
              <p className="text-xs text-gray-600 font-mono uppercase tracking-wider">Certificate ID: {certificateId}</p>
              <p className="text-xs text-gray-500 font-mono">Verification: {verificationCode}</p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CertificateTemplateB;
