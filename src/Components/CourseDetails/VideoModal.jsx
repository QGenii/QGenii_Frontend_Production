import React, { useState } from 'react';
import { IoSettingsSharp } from 'react-icons/io5';
import { MdSubtitles } from 'react-icons/md';
// import MainNavbar from '.././MainNavbar';   

const VideoModal = ({ isOpen, onClose, videoUrl }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('1080p');
  const [selectedLanguage, setSelectedLanguage] = useState('English(Default)');

  const qualities = ['1080p', '720p', '576p', '432p', '360p', 'Auto'];
  const languages = [
    'English(Default)', 'Hindi', 'Bengali', 'Telugu',
    'Marathi', 'Tamil', 'Urdu', 'Gujarati',
    'Malayalam', 'Kannada', 'Odia', 'Punjabi'
  ];

  if (!isOpen) return null;

  return (
    <div>
        {/* <MainNavbar /> */}
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Video Player Container */}
      <div className="relative w-full h-full">
        {/* Video */}
        <video
          className="w-full h-full object-contain"
          controls
          src={videoUrl}
        />

        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent">
          <h3 className="text-white text-lg">Video Title Here</h3>
        </div>

        {/* Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
          <div className="flex justify-end items-center gap-4">
            {/* Subtitles Button */}
            <button 
              className="text-white hover:text-blue-400"
              onClick={() => setShowSettings(true)}
            >
              <MdSubtitles size={24} />
            </button>

            {/* Settings Button */}
            <button 
              className="text-white hover:text-blue-400"
              onClick={() => setShowSettings(true)}
            >
              <IoSettingsSharp size={24} />
            </button>
          </div>
        </div>

        {/* Settings Menu */}
        {showSettings && (
          <div className="absolute right-8 bottom-16 bg-black/90 text-white rounded-lg p-4 w-64">
            {/* Quality Settings */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Quality</h4>
              <div className="space-y-2">
                {qualities.map((quality) => (
                  <button
                    key={quality}
                    className={`block w-full text-left px-3 py-1 rounded ${
                      selectedQuality === quality ? 'bg-blue-600' : 'hover:bg-gray-700'
                    }`}
                    onClick={() => setSelectedQuality(quality)}
                  >
                    {quality}
                  </button>
                ))}
              </div>
            </div>

            {/* Subtitles Settings */}
            <div>
              <h4 className="text-sm font-medium mb-2">Subtitles</h4>
              <div className="max-h-48 overflow-y-auto space-y-2">
                {languages.map((language) => (
                  <button
                    key={language}
                    className={`block w-full text-left px-3 py-1 rounded ${
                      selectedLanguage === language ? 'bg-blue-600' : 'hover:bg-gray-700'
                    }`}
                    onClick={() => setSelectedLanguage(language)}
                  >
                    {language}
                  </button>
                ))}
              </div>
            </div>

            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => setShowSettings(false)}
            >
              ✕
            </button>
          </div>
        )}

        {/* Close Video Button */}
        <button
          className="absolute top-4 right-4 text-white hover:text-gray-300"
          onClick={onClose}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    </div>
  );
};

export default VideoModal;
