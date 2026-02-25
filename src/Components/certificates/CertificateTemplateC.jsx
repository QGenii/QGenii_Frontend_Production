import React from 'react';
import { QrCode, Award, Trophy, Crown, Star } from 'lucide-react';

/**
 * Certificate Template C - Winner / Award
 * Used for: hackathon winners, scholarship awards, top performers
 * Design: Luxurious gold-accented design for winners and awards with prestigious styling
 */
const CertificateTemplateC = ({ certificate }) => {
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
    <div className="certificate-container w-full bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-100 p-8 md:p-16" id="certificate">
      {/* Luxurious ornate border */}
      <div className="relative bg-gradient-to-br from-white via-amber-50 to-white shadow-2xl" style={{ minHeight: '850px' }}>
        {/* Golden corner ribbons */}
        <div className="absolute top-0 left-0 w-48 h-48">
          <div className="absolute top-0 left-0 w-36 h-36 border-t-8 border-l-8 border-amber-600"></div>
          <Crown className="absolute top-4 left-4 text-amber-500" size={40} />
          <Star className="absolute top-14 left-14 text-amber-400" size={20} />
        </div>
        <div className="absolute top-0 right-0 w-48 h-48">
          <div className="absolute top-0 right-0 w-36 h-36 border-t-8 border-r-8 border-amber-600"></div>
          <Crown className="absolute top-4 right-4 text-amber-500" size={40} />
          <Star className="absolute top-14 right-14 text-amber-400" size={20} />
        </div>
        <div className="absolute bottom-0 left-0 w-48 h-48">
          <div className="absolute bottom-0 left-0 w-36 h-36 border-b-8 border-l-8 border-amber-600"></div>
          <Star className="absolute bottom-14 left-14 text-amber-400" size={20} />
        </div>
        <div className="absolute bottom-0 right-0 w-48 h-48">
          <div className="absolute bottom-0 right-0 w-36 h-36 border-b-8 border-r-8 border-amber-600"></div>
          <Star className="absolute bottom-14 right-14 text-amber-400" size={20} />
        </div>
        
        {/* Multiple decorative golden borders */}
        <div className="absolute inset-8 border-8 border-amber-600"></div>
        <div className="absolute inset-10 border-4 border-amber-400"></div>
        <div className="absolute inset-12 border-2 border-amber-600"></div>
        <div className="absolute inset-14 border border-amber-300"></div>
        
        {/* Watermark trophy */}
        <div className="absolute inset-0 flex items-center justify-center opacity-4 pointer-events-none overflow-hidden">
          <Trophy className="text-amber-400" size={450} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-between p-16 md:p-20" style={{ minHeight: '850px' }}>
              
              {/* Luxurious Header */}
              <div className="text-center">
                <div className="inline-block px-12 py-6 border-4 border-double border-amber-600 bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-100 shadow-lg">
                  <h1 className="text-7xl font-bold bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 bg-clip-text text-transparent tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>QGenii</h1>
                  <div className="flex items-center justify-center gap-3 mt-4">
                    <div className="h-px w-20 bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
                    <Trophy className="text-amber-600" size={24} />
                    <p className="text-sm text-amber-700 uppercase tracking-widest font-bold">Celebrating Excellence</p>
                    <Trophy className="text-amber-600" size={24} />
                    <div className="h-px w-20 bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Prestigious Award Badge */}
              <div className="text-center mt-10">
                <div className="inline-block px-12 py-5 bg-gradient-to-br from-amber-500 via-amber-400 to-amber-500 rounded-full shadow-2xl transform hover:scale-105 transition-transform">
                  <div className="flex items-center justify-center gap-3">
                    <Crown className="text-white" size={32} />
                    <span className="text-2xl font-bold uppercase tracking-wider text-white" style={{ fontFamily: 'Georgia, serif' }}>Winner Certificate</span>
                    <Crown className="text-white" size={32} />
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="text-center mt-8">
                <div className="inline-block">
                  <p className="text-xl text-gray-600 mb-3 uppercase tracking-widest" style={{ letterSpacing: '0.3em' }}>Certificate of</p>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-800 via-amber-600 to-amber-800 bg-clip-text text-transparent uppercase tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>{title.replace('Certificate of ', '').replace('Certificate', '')}</h2>
                  <div className="h-1 w-full bg-gradient-to-r from-transparent via-amber-600 to-transparent mt-3"></div>
                </div>
              </div>

              {/* Main Content */}
              <div className="text-center my-12 max-w-3xl">
                <p className="text-xl text-gray-700 mb-10 italic uppercase tracking-wide" style={{ letterSpacing: '0.2em', fontFamily: 'Georgia, serif' }}>
                  This prestigious award is presented to
                </p>
                
                <div className="relative inline-block">
                  <div className="absolute -inset-4 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 transform rotate-1"></div>
                  <div className="relative bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-100 border-y-8 border-double border-amber-600 py-8 px-12 my-10">
                    <h3 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-amber-900 via-amber-700 to-amber-900 bg-clip-text text-transparent" style={{ fontFamily: 'Georgia, serif' }}>
                      {recipientName}
                    </h3>
                  </div>
                  {/* Decorative stars */}
                  <Star className="absolute -top-2 -left-2 text-amber-500" size={32} />
                  <Star className="absolute -top-2 -right-2 text-amber-500" size={32} />
                </div>
                
                <p className="text-2xl text-gray-800 leading-relaxed mt-12 mb-8" style={{ fontFamily: 'Georgia, serif' }}>
                  {achievementText}
                </p>

                {/* Position/Rank display with trophy */}
                {metadata.position && (
                  <div className="mt-10">
                    <div className="inline-block">
                      <div className="relative px-14 py-6 bg-gradient-to-br from-amber-500 via-amber-400 to-amber-500 rounded-2xl shadow-2xl">
                        <Trophy className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-amber-600 bg-white rounded-full p-2" size={48} />
                        <p className="text-3xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                          {metadata.position}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Prize amount with elegant display */}
                {metadata.prizeAmount && (
                  <div className="mt-6">
                    <div className="inline-block px-10 py-4 border-4 border-double border-amber-600 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg">
                      <p className="text-xl font-bold text-amber-800" style={{ fontFamily: 'Georgia, serif' }}>
                        Prize: {metadata.prizeAmount}
                      </p>
                    </div>
                  </div>
                )}

                {description && (
                  <p className="text-base text-gray-600 mt-8 italic" style={{ fontFamily: 'Georgia, serif' }}>{description}</p>
                )}
              </div>

              {/* Date with golden seal */}
              <div className="text-center mt-10">
                <div className="inline-block px-12 py-5 border-4 border-double border-amber-600 rounded-full bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-100 shadow-xl">
                  <p className="text-sm text-gray-700 font-bold uppercase tracking-widest">
                    Awarded on {formatDate(issueDate)}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-end w-full mt-12">
                {/* QR Code with golden frame */}
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="absolute -inset-3 bg-gradient-to-br from-amber-600 to-amber-400 rounded-full opacity-30"></div>
                    {qrCode ? (
                      <div className="relative border-6 border-amber-600 p-2 bg-white rounded-xl shadow-2xl">
                        <img src={qrCode} alt="QR Code" className="w-28 h-28" />
                      </div>
                    ) : (
                      <div className="relative w-28 h-28 border-6 border-amber-600 p-2 bg-white rounded-xl flex items-center justify-center shadow-2xl">
                        <QrCode size={56} className="text-amber-600" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-3 font-bold uppercase tracking-wider">Verify Award</p>
                </div>

                {/* Signature with prestigious seal */}
                <div className="text-center">
                  <div className="relative inline-block">
                    {/* Golden award seal */}
                    <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full border-6 border-amber-600 bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-100 flex items-center justify-center transform rotate-12 shadow-2xl">
                      <Award className="text-amber-600" size={40} />
                    </div>
                    <div className="border-t-4 border-amber-700 pt-4 w-72">
                      <p className="text-xl font-bold text-amber-900" style={{ fontFamily: 'Georgia, serif' }}>{signatureName}</p>
                      <p className="text-sm text-gray-700 mt-2 font-semibold">{signatureTitle}</p>
                      <p className="text-xs text-gray-600 mt-1">QGenii Platform</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certificate ID with elegant styling */}
              <div className="text-center mt-8 space-y-1">
                <p className="text-xs text-amber-700 font-mono font-semibold uppercase tracking-wider">Certificate ID: {certificateId}</p>
                <p className="text-xs text-amber-600 font-mono">Verification: {verificationCode}</p>
              </div>
            </div>
          </div>
        </div>
  );
};

export default CertificateTemplateC;
