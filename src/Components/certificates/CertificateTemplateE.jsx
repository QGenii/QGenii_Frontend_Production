import React from 'react';
import { QrCode, BookOpen, GraduationCap, Award, Star } from 'lucide-react';

/**
 * Certificate Template E - Program Completion
 * Used for: mentorship completion, roadmap completion, course completion
 * Design: Formal academic-style for program completions with traditional dignified appearance
 */
const CertificateTemplateE = ({ certificate }) => {
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
    <div className="certificate-container w-full bg-gradient-to-br from-blue-100 via-white to-blue-100 p-8 md:p-16" id="certificate">
      {/* Academic formal border */}
      <div className="relative bg-white shadow-2xl" style={{ minHeight: '850px' }}>
        {/* Traditional academic corners */}
        <div className="absolute top-0 left-0 w-40 h-40">
          <div className="absolute top-0 left-0 w-32 h-32 border-t-8 border-l-8 border-blue-900"></div>
          <Star className="absolute top-6 left-6 text-blue-700" size={28} />
        </div>
        <div className="absolute top-0 right-0 w-40 h-40">
          <div className="absolute top-0 right-0 w-32 h-32 border-t-8 border-r-8 border-blue-900"></div>
          <Star className="absolute top-6 right-6 text-blue-700" size={28} />
        </div>
        <div className="absolute bottom-0 left-0 w-40 h-40">
          <div className="absolute bottom-0 left-0 w-32 h-32 border-b-8 border-l-8 border-blue-900"></div>
          <Star className="absolute bottom-6 left-6 text-blue-700" size={28} />
        </div>
        <div className="absolute bottom-0 right-0 w-40 h-40">
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-8 border-r-8 border-blue-900"></div>
          <Star className="absolute bottom-6 right-6 text-blue-700" size={28} />
        </div>
        
        {/* Multiple academic borders */}
        <div className="absolute inset-8 border-8 border-blue-900"></div>
        <div className="absolute inset-10 border-4 border-blue-700"></div>
        <div className="absolute inset-12 border-2 border-blue-900"></div>
        <div className="absolute inset-14 border border-blue-600"></div>
        
        {/* Top and bottom decorative lines */}
        <div className="absolute top-16 left-16 right-16 h-px bg-gradient-to-r from-transparent via-blue-700 to-transparent"></div>
        <div className="absolute bottom-16 left-16 right-16 h-px bg-gradient-to-r from-transparent via-blue-700 to-transparent"></div>
        
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-4 pointer-events-none overflow-hidden">
          <GraduationCap className="text-blue-300" size={400} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-between p-16 md:p-22" style={{ minHeight: '850px' }}>
              
              {/* Header with graduation cap emblem */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center mb-6">
                  <div className="relative w-28 h-28">
                    <div className="absolute inset-0 border-8 border-double border-blue-800 rounded-full bg-gradient-to-br from-blue-50 to-white flex items-center justify-center shadow-lg">
                      <GraduationCap size={48} className="text-blue-800" />
                    </div>
                  </div>
                </div>
                <h1 className="text-7xl font-bold text-blue-900 mb-3 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                  QGenii
                </h1>
                <div className="flex items-center justify-center gap-3 mt-3">
                  <div className="h-px w-20 bg-gradient-to-r from-transparent via-blue-800 to-transparent"></div>
                  <p className="text-sm text-blue-700 uppercase tracking-widest font-semibold">
                    Excellence Through Learning
                  </p>
                  <div className="h-px w-20 bg-gradient-to-r from-transparent via-blue-800 to-transparent"></div>
                </div>
              </div>

              {/* Certificate Title with academic formality */}
              <div className="text-center mt-10">
                <div className="inline-block">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-blue-700 to-transparent"></div>
                    <BookOpen className="text-blue-700" size={28} />
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-blue-700 to-transparent"></div>
                  </div>
                  <p className="text-2xl uppercase tracking-widest text-blue-800 mb-4" style={{ letterSpacing: '0.3em', fontFamily: 'Georgia, serif' }}>Certificate of</p>
                  <h2 className="text-3xl font-bold text-blue-900 uppercase tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>{title.replace('Certificate of ', '').replace('Certificate', '')}</h2>
                  <div className="h-1 w-full bg-gradient-to-r from-transparent via-blue-800 to-transparent mt-4"></div>
                </div>
              </div>

              {/* Main Content */}
              <div className="text-center my-12 max-w-3xl">
                <p className="text-xl text-gray-700 mb-10 italic uppercase tracking-wide" style={{ letterSpacing: '0.2em', fontFamily: 'Georgia, serif' }}>
                  This is to certify that
                </p>
                
                <div className="relative my-10">
                  <div className="absolute -inset-3 bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 -skew-y-1"></div>
                  <div className="relative border-b-4 border-double border-blue-900 pb-6">
                    <h3 className="text-6xl md:text-7xl font-bold text-blue-900" style={{ fontFamily: 'Georgia, serif' }}>
                      {recipientName}
                    </h3>
                  </div>
                </div>
                
                <p className="text-xl text-gray-800 leading-relaxed mt-10 mb-8" style={{ fontFamily: 'Georgia, serif' }}>
                  {achievementText}
                </p>

                {/* Course/Program Name with book icon */}
                {(metadata.courseName || metadata.roadmapName || metadata.programName) && (
                  <div className="mt-10">
                    <div className="inline-block px-10 py-5 border-4 border-double border-blue-700 bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-lg">
                      <div className="flex items-center justify-center gap-3">
                        <BookOpen className="text-blue-700" size={28} />
                        <p className="text-2xl font-bold text-blue-900" style={{ fontFamily: 'Georgia, serif' }}>
                          {metadata.courseName || metadata.roadmapName || metadata.programName}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Duration */}
                {metadata.duration && (
                  <p className="text-base text-gray-700 mt-6 font-semibold">
                    Program Duration: {metadata.duration}
                  </p>
                )}

                {/* Score/Grade with academic presentation */}
                {(metadata.score || metadata.grade) && (
                  <div className="mt-6">
                    <div className="inline-block px-8 py-3 bg-gradient-to-r from-blue-700 to-blue-600 rounded-full shadow-lg">
                      {metadata.score && (
                        <p className="text-lg font-bold text-white">
                          Score: {metadata.score}
                          {metadata.percentile && ` (${metadata.percentile}th percentile)`}
                        </p>
                      )}
                      {metadata.grade && (
                        <p className="text-lg font-bold text-white">
                          Grade: {metadata.grade}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Mentor name for mentorship completion */}
                {metadata.mentorName && (
                  <p className="text-base text-gray-700 mt-6 font-semibold">
                    Under the mentorship of: {metadata.mentorName}
                  </p>
                )}

                {description && (
                  <p className="text-base text-gray-600 mt-6 italic" style={{ fontFamily: 'Georgia, serif' }}>{description}</p>
                )}
              </div>

              {/* Date with academic seal design */}
              <div className="text-center mt-10">
                <div className="inline-block relative">
                  <div className="absolute -left-16 top-1/2 transform -translate-y-1/2">
                    <div className="w-20 h-20 border-6 border-blue-800 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-white shadow-lg" style={{ borderWidth: '6px' }}>
                      <span className="text-xs text-blue-800 font-bold text-center leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                        {new Date(issueDate).getFullYear()}
                      </span>
                    </div>
                  </div>
                  <div className="px-10 py-4 border-2 border-blue-900 rounded-full bg-gradient-to-r from-blue-50 to-white shadow-md">
                    <p className="text-sm text-gray-800 font-bold uppercase tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                      Date of Completion: {formatDate(issueDate)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-end w-full mt-12">
                {/* QR Code with academic frame */}
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-br from-blue-800 to-blue-700 rounded-lg opacity-20"></div>
                    {qrCode ? (
                      <div className="relative border-4 border-blue-800 p-2 bg-white rounded-lg shadow-xl">
                        <img src={qrCode} alt="QR Code" className="w-24 h-24" />
                      </div>
                    ) : (
                      <div className="relative w-24 h-24 border-4 border-blue-800 p-2 bg-white rounded-lg flex items-center justify-center shadow-xl">
                        <QrCode size={48} className="text-blue-800" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-3 font-bold uppercase tracking-wide">Verify Credential</p>
                </div>

                {/* Signature with academic seal */}
                <div className="text-center">
                  <div className="relative inline-block">
                    {/* Academic seal with graduation cap */}
                    <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full border-6 border-blue-800 bg-gradient-to-br from-blue-100 to-white flex items-center justify-center transform -rotate-12 shadow-xl" style={{ borderWidth: '6px' }}>
                      <GraduationCap className="text-blue-800" size={36} />
                    </div>
                    <div className="border-t-4 border-blue-900 pt-4 w-72">
                      <p className="text-lg font-bold text-blue-900" style={{ fontFamily: 'Georgia, serif' }}>{signatureName}</p>
                      <p className="text-sm text-gray-700 mt-2 font-semibold">{signatureTitle}</p>
                      <p className="text-xs text-gray-600 mt-1">QGenii Platform</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certificate ID with formal styling */}
              <div className="text-center mt-8 space-y-1">
                <p className="text-xs text-blue-800 font-mono uppercase tracking-wider font-semibold">
                  Certificate ID: {certificateId}
                </p>
                <p className="text-xs text-blue-700 font-mono">Verification: {verificationCode}</p>
              </div>
            </div>
          </div>
        </div>
  );
};

export default CertificateTemplateE;
