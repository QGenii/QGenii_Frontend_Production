import React from 'react';
import ProgrammingLanguageSection from './Language/ProgrammingLanguageSection';
import ProjectsSection from '../PracticePage/Project/ProjectsSection';
import BeginnerDSASection from './BeginnerfDSA/BeginnerDSASection';
import AlgorithmsSection from '../PracticePage/Algorithm/AlgorithmsSection';
import DataStructuresSection from '../PracticePage/DataStructureCard/DataStructuresSection';
import StarWisePathsSection from './StarWisePath/StarWisePathsSection';
import DifficultyRatingSection from './DifficultyRating/DifficultyRatingSection';
import InterviewQuestionsSection from './InterviewQuestions/InterviewQuestionsSection';
import CompanyBasedQuestionsSection from './ComapnhyBasedQuestions/CompanyBasedQuestionsSection';
import AdvancedChallengesSection from './AdvancedChallenges/AdvancedChallengesSection';
import CompanyBasedQ from './ComapnhyBasedQuestions/CompanyBasedQ';
import MainNavbar from '../MainNavbar';
import SectionNavbar from '../SectionNavbar';
import './PracticePage.css';

const PracticePage = () => {
  return (
    <div className="practice-page">
      <div className="container-fluid py-5">
        <div className="welcome-section shadow-sm p-5 mb-6">
          <h1 className="display-5 fw-bold mb-4">
            Welcome to{' '}
            <span className="text-gradient-purple">CodeIQGenius</span> Practice!
          </h1>
          <p className="lead">
            Whether you're a beginner or an experienced coder, we have practice
            paths for everyone. Choose a path below to start coding.
          </p>
          <p>
            Practice well-designed, real-world problems on topics you want to
            master. Filter by track, difficulty and solve coding problems on the
            go.
          </p>
        </div>

        <div className="section-container d-flex flex-column align-items-center mb-6">
          <div style={{ background: '#F7F8FC', border: '1px solid gray', maxWidth: '600px', width: '100%' }} className="browse-section p-4 rounded-3 text-center">
            <button className="btn rounded-lg px-8 py-3 hover:bg-gray-50 transition duration-300 shadow-sm">
              Browse practice paths
            </button>
          </div>
        </div>

        <div className="row g-0">
          {/* Sidebar Column */}
          <div className="col-lg-2 d-none d-lg-block">
            <div className="sticky-top" style={{ top: '80px' }}>
              <SectionNavbar />
            </div>
          </div>

          {/* Main Content Column */}
          <div className="col-lg-10 ps-lg-4">
            <div id="programming" className="section-container mb-6">
              <ProgrammingLanguageSection />
            </div>

            <div id="projects" className="section-container mb-6">
              <ProjectsSection />
            </div>

            <div id="beginner-dsa" className="section-container mb-6">
              <BeginnerDSASection />
            </div>

            <div id="algorithms" className="section-container mb-6">
              <AlgorithmsSection />
            </div>

            <div id="data-structures" className="section-container mb-6">
              <DataStructuresSection />
            </div>

            <div id="star-wise-path" className="section-container mb-6">
              <StarWisePathsSection />
            </div>

            <div id="difficulty-rating" className="section-container mb-6">
              <DifficultyRatingSection />
            </div>

            <div id="interview-questions" className="section-container mb-6">
              <InterviewQuestionsSection />
            </div>

            <div id="company-questions" className="section-container mb-6">
              <CompanyBasedQuestionsSection />
            </div>

            <div id="advanced-challenges" className="section-container advanced-section mb-6">
              <AdvancedChallengesSection />
            </div>

            <div id="company-based-q" className="section-container mb-6">
              <CompanyBasedQ />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticePage;