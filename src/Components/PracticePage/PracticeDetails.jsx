import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PracticeHeroCard from './PracticeDetails/PracticeHeroCard';
import BeneficialCourseCard from './PracticeDetails/BeneficialCourseCard';
import CertificateCard from '../Common/CertificateCard';
import ChapterProblemsCard from './PracticeDetails/chapterProblemsCard';
import LearnerTestimonials from './PracticeDetails/testimonial';
import LanguageCard from './PracticeDetails/NextLanguageCards';
// import MainNavbar from '../MainNavbar';
import UpperNavbar from '../upperNavbar';
const sampleCards = [
  {
    id: 'cpp-problem-solving',
    type: 'learn',
    title: 'C++ Problem Solving',
    problems: '5 Problems',
    learners: '255.3k Learners',
    description: 'Learn problem solving in C++ from our online course and tutorial. You will learn basic math, conditionals and step by step logic building to solve problems.',
    rating: '4.6',
    reviews: '1890',
    level: 'Beginner Level'
  },
  {
    id: 'basic-math',
    type: 'practice',
    title: 'Practice Basic Math',
    problems: '8 Problems',
    learners: '255.3k Learners',
    description: 'Basic Math includes problems on topics like arithmetic, sequences, and counting, which are fundamental to proper understanding of algorithmic thinking.',
    rating: '4.6',
    reviews: '1890',
    level: 'Beginner Level'
  },
  {
    id: 'strings',
    type: 'practice',
    title: 'Practice Strings',
    problems: '8 Problems',
    learners: '255.3k Learners',
    description: 'Practice String problems in C++, Python, Java and 10+ other languages. Solve these questions on Strings and prepare yourself for handling text-based data.',
    rating: '4.6',
    reviews: '1890',
    level: 'Beginner Level'
  }
];

const practiceData = {
  c: {
    title: "Practice C++",
    description: "Sharpen your C++ skills with curated problems and chapter-wise practice.",
    progress: 65,
    streak: 3,
    leaderboard: 5,
    chapters: [
      {
        id: 1,
        title: "Output & Basic math Operators",
        description: "Learn how to make Python print whatever you want, and learn to use it as a basic calculator.",
        problems: [
          { name: "Code Output - MCQ", status: true, level: "Easy", id: 101, type: "mcq" },
          { name: "Print Coding, Genius!", status: false, level: "Easy", id: 102, type: "coding" },
          { name: "Identify Correct Syntax", status: false, level: "Easy", id: 103, type: "mcq" }
        ]
      },
      {
        id: 2,
        title: "Output & Basic math Operators",
        description: "Learn how to make Python print whatever you want, and learn to use it as a basic calculator.",
        problems: [
          { name: "Code Output - MCQ", status: false, level: "Easy", id: 104, type: "mcq" },
          { name: "Print Coding, Genius!", status: false, level: "Easy", id: 105, type: "coding" },
          { name: "Identify Correct Syntax", status: false, level: "Easy", id: 106, type: "mcq" }
        ]
      },
      {
        id: 3,
        title: "Output & Basic math Operators",
        description: "Learn how to make Python print whatever you want, and learn to use it as a basic calculator.",
        problems: [
          { name: "Code Output - MCQ", status: false, level: "Easy", id: 107, type: "mcq" },
          { name: "Print Coding, Genius!", status: false, level: "Easy", id: 108, type: "coding" },
          { name: "Identify Correct Syntax", status: false, level: "Easy", id: 109, type: "mcq" }
        ]
      },
      {
        id: 4,
        title: "Output & Basic math Operators",
        description: "Learn how to make Python print whatever you want, and learn to use it as a basic calculator.",
        problems: [
          { name: "Code Output - MCQ", status: false, level: "Easy", id: 110, type: "mcq" },
          { name: "Print Coding, Genius!", status: false, level: "Easy", id: 111, type: "coding" },
          { name: "Identify Correct Syntax", status: false, level: "Easy", id: 112, type: "mcq" }
        ]
      },
      {
        id: 5,
        title: "Output & Basic math Operators",
        description: "Learn how to make Python print whatever you want, and learn to use it as a basic calculator.",
        problems: [
          { name: "Code Output - MCQ", status: false, level: "Easy", id: 113, type: "mcq" },
          { name: "Print Coding, Genius!", status: false, level: "Easy", id: 114, type: "coding" },
          { name: "Identify Correct Syntax", status: false, level: "Easy", id: 115, type: "mcq" }
        ]
      },
      {
        id: 6,
        title: "Output & Basic math Operators",
        description: "Learn how to make Python print whatever you want, and learn to use it as a basic calculator.",
        problems: [
          { name: "Code Output - MCQ", status: false, level: "Easy", id: 116, type: "mcq" },
          { name: "Print Coding, Genius!", status: false, level: "Easy", id: 117, type: "coding" },
          { name: "Identify Correct Syntax", status: false, level: "Easy", id: 118, type: "mcq" }
        ]
      },
      {
        id: 7,
        title: "Output & Basic math Operators",
        description: "Learn how to make Python print whatever you want, and learn to use it as a basic calculator.",
        problems: [
          { name: "Code Output - MCQ", status: false, level: "Easy", id: 119, type: "mcq" },
          { name: "Print Coding, Genius!", status: false, level: "Easy", id: 120, type: "coding" },
          { name: "Identify Correct Syntax", status: false, level: "Easy", id: 121, type: "mcq" }
        ]
      },
      {
        id: 8,
        title: "Output & Basic math Operators",
        description: "Learn how to make Python print whatever you want, and learn to use it as a basic calculator.",
        problems: [
          { name: "Code Output - MCQ", status: false, level: "Easy", id: 122, type: "mcq" },
          { name: "Print Coding, Genius!", status: false, level: "Easy", id: 123, type: "coding" },
          { name: "Identify Correct Syntax", status: false, level: "Easy", id: 124, type: "mcq" }
        ]
      }
    ]
  }
};

const PracticeDetail = () => {
  const { id } = useParams();
  const data = practiceData[id] || practiceData['c'];

  return (
    <div style={{ background: "#f4f6f9", minHeight: "100vh" }}>
      {/* <MainNavbar />
      <UpperNavbar /> */}
      {/* Breadcrumb Bar */}
      <div style={{
        background: "#0d2c6b",
        padding: "0 32px",
        height: "38px",
        display: "flex",
        alignItems: "center",
        fontSize: "1.05rem"
      }}>
        <Link to="/" style={{ color: "#fff", textDecoration: "underline", fontWeight: 500 }}>
          Practice
        </Link>
        <span style={{ color: "#fff", margin: "0 8px" }}>&#187;</span>
        <span style={{ color: "#fff", textDecoration: "underline", fontWeight: 500 }}>
          {data.title}
        </span>
      </div>
      <div className="col-lg-12" style={{ padding: "20px", width: "100%" }}>
        <PracticeHeroCard
          title={data.title}
          description="Solve C++ Practice problems online with the Practice C++ path on CodeIqGenius. Answer MCQs exercises and write code for over 200 C++ coding challenges."
          courses={6}
          duration="6 months"
          problems={710}
          level="Beginner Level"
          learners="255.3k"
          progress={data.progress}
          onStart={() => { }}
        />
      </div>
      <div className="container py-4" style={{ maxWidth: "1200px" }}>
        <div className="row" style={{ alignItems: "flex-start" }}>
          {/* Sidebar - left */}
          <div className="col-lg-3 d-flex flex-column gap-3">
            <div style={{ width: "100%" }}>
              <CertificateCard />
            </div>
            <div style={{ width: "100%" }}>
              <BeneficialCourseCard />
            </div>
            {/* Up Next Section */}
            <div style={{ padding: '20px' }}>
              <h2>UP NEXT</h2>
              <LanguageCard cards={sampleCards} />
            </div>
            {/* Add more sidebar cards here if needed */}
          </div>
          {/* Main Content - right */}
          <div className="col-lg-9">
            {/* Chapter/Problem List */}
            <div style={{ marginTop: 24 }}>
              {data.chapters.map((chap) => (
                <ChapterProblemsCard
                  key={chap.id}
                  number={chap.id}
                  title={chap.title}
                  description={chap.description}
                  problems={chap.problems}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Up Next Section */}

        {/* Testimonials Section */}
        <LearnerTestimonials />
      </div>
    </div>
  );
};

export default PracticeDetail;