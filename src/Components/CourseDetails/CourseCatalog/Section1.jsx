import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import LearnPythonDetailedPage from './LearnPythonDetailedPage';
// import Image from '../../../public/coursecatlogimage.png';
import CourseCatalog from './CourseCatalog.jsx';

import RoadMaps from './RoadMaps';
import SkillTest from './SkillTest';
import LearnPython from './LearnPython';
import LearnTopic from './LearnTopic';
import LearnC from './LearnC';
import LearnCHash from './LearnCHash';
import LearnCpp from './LearnCpp';
import LearnPhp from './LearnPhp';
import LearnKotlin from './LearnKotlin';
import LearnWebDevelopment from './WebDevelopment';
import LearnRust from './LearnRust';
import LearnJava from './LearnJava';
import LearnMachineLearning from './MachineLearning';
import LearnGo from './LearnGo';

// Topic configuration for filtering
const topicConfig = {
  'python': true,
  'c': true,
  'cpp': true,
  'machine-learning': true,
  'java': true,
  'web-development': true,
  'c-sharp': true,
  'kotlin': true,
  'rust': true,
  'go': true,
  'php': true,
};

export default function Section1() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sectionParam = searchParams.get('section');
  const [selectedSection, setSelectedSection] = useState(sectionParam || 'courses');
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Update selectedSection when URL param changes
  useEffect(() => {
    if (sectionParam) {
      setSelectedSection(sectionParam);
    }
  }, [sectionParam]);

  return (
    <section className="w-full bg-white px-4 md:px-12 py-8 font-sans flex justify-center ">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4">
          {/* Mobile View: Horizontal Scroll */}
          <div className="lg:hidden space-y-6 text-sm font-medium text-gray-700">
            {/* Catalog Group */}
            <div>
              <p className="font-semibold text-black mb-2">Catalog</p>
              <div className="flex overflow-x-auto space-x-4 whitespace-nowrap pb-2">
                <span
                  className={`cursor-pointer hover:text-blue-600 ${selectedSection === 'courses' ? 'text-blue-600 font-semibold' : ''
                    }`}
                  onClick={() => {
                    setSelectedSection('courses');
                    setSearchParams({});
                  }}
                >
                  All Courses
                </span>
                <span
                  className={`cursor-pointer hover:text-blue-600 ${selectedSection === 'roadmaps' ? 'text-blue-600 font-semibold' : ''
                    }`}
                  onClick={() => {
                    setSelectedSection('roadmaps');
                    setSearchParams({ section: 'roadmaps' });
                  }}
                >
                  All Road Maps
                </span>
                <span
                  className={`cursor-pointer hover:text-blue-600 ${selectedSection === 'skilltest' ? 'text-blue-600 font-semibold' : ''
                    }`}
                  onClick={() => {
                    setSelectedSection('skilltest');
                    setSearchParams({ section: 'skilltest' });
                  }}
                >
                  Skill Test
                </span>
              </div>
            </div>

            {/* Topics Group */}
            <div>
              <p className="font-semibold text-black mb-2">Topics</p>
              <div className="flex overflow-x-auto space-x-4 whitespace-nowrap pb-2">
                <span
                  className={`cursor-pointer hover:text-blue-600 ${selectedSection === 'learnpython' ? 'text-blue-600 font-semibold' : ''
                    }`}
                  onClick={() => {
                    setSelectedSection('courses');
                    setSelectedTopic('python');
                  }}
                >
                  Learn Python
                </span>
                <span className="cursor-pointer hover:text-blue-600" onClick={() => {
                  setSelectedSection('courses');
                  setSelectedTopic('c');
                }}>Learn C</span>
                <span className="cursor-pointer hover:text-blue-600" onClick={() => {
                  setSelectedSection('courses');
                  setSelectedTopic('cpp');
                }}>Learn C++</span>
                <span className="cursor-pointer hover:text-blue-600" onClick={() => {
                  setSelectedSection('courses');
                  setSelectedTopic('machine-learning');
                }}>Machine Learning</span>
                <span className="cursor-pointer hover:text-blue-600" onClick={() => {
                  setSelectedSection('courses');
                  setSelectedTopic('java');
                }}>Learn Java</span>
                <span className="cursor-pointer hover:text-blue-600" onClick={() => {
                  setSelectedSection('courses');
                  setSelectedTopic('web-development');
                }}>Web Development</span>
                <span className="cursor-pointer hover:text-blue-600" onClick={() => {
                  setSelectedSection('courses');
                  setSelectedTopic('c-sharp');
                }}>Learn C#</span>
                <span className="cursor-pointer hover:text-blue-600" onClick={() => {
                  setSelectedSection('courses');
                  setSelectedTopic('kotlin');
                }}>Learn Kotlin</span>
                <span className="cursor-pointer hover:text-blue-600" onClick={() => {
                  setSelectedSection('courses');
                  setSelectedTopic('rust');
                }}>Learn Rust</span>
                <span className="cursor-pointer hover:text-blue-600" onClick={() => {
                  setSelectedSection('courses');
                  setSelectedTopic('go');
                }}>Learn Go</span>
                <span className="cursor-pointer hover:text-blue-600" onClick={() => {
                  setSelectedSection('courses');
                  setSelectedTopic('php');
                }}>Learn Php</span>
              </div>
            </div>
          </div>

          {/* Desktop View: Vertical Sidebar - Styled as per screenshot */}
          <div className="hidden lg:flex flex-col space-y-5 text-sm font-medium text-black">
            <p className="cursor-default">Catalog</p>
            <p
              className={`cursor-pointer hover:text-blue-600 ${selectedSection === 'courses' ? 'text-blue-600 font-semibold' : ''
                }`}
              onClick={() => {
                setSelectedSection('courses');
                setSelectedTopic(null);
                setSearchParams({});
              }}
            >
              All Courses
            </p>
            <p
              className={`cursor-pointer hover:text-blue-600 ${selectedSection === 'roadmaps' ? 'text-blue-600 font-semibold' : ''
                }`}
              onClick={() => {
                setSelectedSection('roadmaps');
                setSearchParams({ section: 'roadmaps' });
              }}
            >
              All Road Maps
            </p>
            <p
              className={`cursor-pointer hover:text-blue-600 ${selectedSection === 'skilltest' ? 'text-blue-600 font-semibold' : ''
                }`}
              onClick={() => {
                setSelectedSection('skilltest');
                setSearchParams({ section: 'skilltest' });
              }}
            >
              Skill Test
            </p>

            <p className="cursor-default font-semibold mt-2">Topics</p>
            <p
              className={`cursor-pointer hover:text-blue-600 ${selectedSection === 'learnpython' ? 'text-blue-600 font-semibold' : ''
                }`}
              onClick={() => {
                setSelectedSection('courses');
                setSelectedTopic('python');
              }}
            >
              Learn Python
            </p>
            <p className={`cursor-pointer hover:text-blue-600 ${selectedSection === 'learnc' ? 'text-blue-600 font-semibold' : ''
              }`}
              onClick={() => {
                setSelectedSection('courses');
                setSelectedTopic('c');
              }}>Learn C</p>

            <p className={`cursor-pointer hover:text-blue-600 ${selectedSection === 'learncpp' ? 'text-blue-600 font-semibold' : ''
              }`}
              onClick={() => {
                setSelectedSection('courses');
                setSelectedTopic('cpp');
              }}>Learn C++</p>
            <p className={`cursor-pointer hover:text-blue-600 ${selectedSection === 'learnml' ? 'text-blue-600 font-semibold' : ''
              }`}
              onClick={() => {
                setSelectedSection('courses');
                setSelectedTopic('machine-learning');
              }}>Machine Learning</p>
            <p className={`cursor-pointer hover:text-blue-600 ${selectedSection === 'learnjava' ? 'text-blue-600 font-semibold' : ''
              }`}
              onClick={() => {
                setSelectedSection('courses');
                setSelectedTopic('java');
              }}>Learn Java</p>
            <p className={`cursor-pointer hover:text-blue-600 ${selectedSection === 'learnwebdev' ? 'text-blue-600 font-semibold' : ''
              }`}
              onClick={() => {
                setSelectedSection('courses');
                setSelectedTopic('web-development');
              }}>Web Development</p>
            <p className={`cursor-pointer hover:text-blue-600 ${selectedSection === 'learnchash' ? 'text-blue-600 font-semibold' : ''
              }`}
              onClick={() => {
                setSelectedSection('courses');
                setSelectedTopic('c-sharp');
              }}>Learn C#</p>
            <p className={`cursor-pointer hover:text-blue-600 ${selectedSection === 'learnkotlin' ? 'text-blue-600 font-semibold' : ''
              }`}
              onClick={() => {
                setSelectedSection('courses');
                setSelectedTopic('kotlin');
              }}>Learn Kotlin</p>
            <p className={`cursor-pointer hover:text-blue-600 ${selectedSection === 'learnrust' ? 'text-blue-600 font-semibold' : ''
              }`}
              onClick={() => {
                setSelectedSection('courses');
                setSelectedTopic('rust');
              }}>Learn Rust</p>
            <p className={`cursor-pointer hover:text-blue-600 ${selectedSection === 'learngo' ? 'text-blue-600 font-semibold' : ''
              }`}
              onClick={() => {
                setSelectedSection('courses');
                setSelectedTopic('go');
              }}>Learn Go</p>
            <p className={`cursor-pointer hover:text-blue-600 ${selectedSection === 'learnphp' ? 'text-blue-600 font-semibold' : ''
              }`}
              onClick={() => {
                setSelectedSection('courses');
                setSelectedTopic('php');
              }}>Learn Php</p>
          </div>
        </aside>

        {/* Main Content Renderer */}
        <div className="w-full lg:w-3/4">
          {selectedSection === 'courses' && !selectedTopic && <CourseCatalog selectedTopic={selectedTopic} />}
          {selectedSection === 'courses' && selectedTopic === 'python' && <LearnPython />}
          {selectedSection === 'courses' && selectedTopic && selectedTopic !== 'python' && topicConfig[selectedTopic] && <LearnTopic topic={selectedTopic} />}
          {selectedSection === 'courses' && selectedTopic && selectedTopic !== 'python' && !topicConfig[selectedTopic] && <CourseCatalog selectedTopic={selectedTopic} />}
          {selectedSection === 'roadmaps' && <RoadMaps />}
          {selectedSection === 'skilltest' && <SkillTest />}
          {/* {selectedSection === 'learnpython' && (
	            <LearnPythonDetailedPage courseKey="LearnPythonProgramming" />
	          )}
	          {selectedSection === 'learnc' && (
	            <LearnPythonDetailedPage courseKey="LearnC" />
	          )}
	          {selectedSection === 'learnchash' && (
	            <LearnPythonDetailedPage courseKey="LearnCSharp" />
	          )}
	          {selectedSection === 'learncpp' && (
	            <LearnPythonDetailedPage courseKey="LearnCPP" />
	          )}
	          {selectedSection === 'learnphp' && (
	            <LearnPythonDetailedPage courseKey="LearnPHP" />
	          )}
	          {selectedSection === 'learnkotlin' && (
	            <LearnPythonDetailedPage courseKey="LearnKotlin" />
	          )}
	          {selectedSection === 'learnwebdev' && (
	            <LearnPythonDetailedPage courseKey="LearnWebDevelopment" />
	          )}
	          {selectedSection === 'learnrust' && (
	            <LearnPythonDetailedPage courseKey="LearnRust" />
	          )}
	          {selectedSection === 'learnjava' && (
	            <LearnPythonDetailedPage courseKey="LearnJava" />
	          )}
	          {selectedSection === 'learnml' && (
	            <LearnPythonDetailedPage courseKey="LearnMachineLearning" />
	          )}
	          {selectedSection === 'learngo' && (
	            <LearnPythonDetailedPage courseKey="LearnGolang" />
	          )} */}
          {selectedSection === 'learnpython' && <LearnPython />}
          {selectedSection === 'learnc' && <LearnC />}
          {selectedSection === 'learnchash' && <LearnCHash />}
          {selectedSection === 'learncpp' && <LearnCpp />}
          {selectedSection === 'learnphp' && <LearnPhp />}
          {selectedSection === 'learnkotlin' && <LearnKotlin />}
          {selectedSection === 'learnwebdev' && <LearnWebDevelopment />}
          {selectedSection === 'learnrust' && <LearnRust />}
          {selectedSection === 'learnjava' && <LearnJava />}
          {selectedSection === 'learnml' && <LearnMachineLearning />}
          {selectedSection === 'learngo' && <LearnGo />}

        </div>
      </div>
    </section>
  );
}
