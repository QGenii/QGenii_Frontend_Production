import LearnProgramingHeader from "./LearnProgramingHeader";
import { useState, useEffect } from "react";
import {
  Star,
  Award,
  BookOpen,
  Users,
  Target,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import pythonlogo from "/cib_python.png";
import badge from "/badge.png";
import flag from "/flag.png";
import lockIcon from "/Vector (2).png";
import certificate from "/solar_cup-star-bold.png";
import api from "../../../lib/api";
import { useAuth } from "../../../hooks/useAuth";
import enrollmentApi from "../../../lib/enrollmentApi";
import { toast } from "react-hot-toast";
// import { set } from "mongoose";
// Add this component to your file
const TestimonialBubble = () => {
  return (
    <div className="max-w-2xl mx-auto my-12 px-4">
      <div
        className="relative bg-white rounded-3xl shadow-md p-8
       pt-10"
      >
        {/* Quote mark */}
        <div className="absolute top-8 left-8">
          <svg
            width="24"
            height="20"
            viewBox="0 0 24 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 20H9.3645L14.0467 10V0H0V14.2857H9.3645L0 20Z"
              fill="#003366"
            />
            <path
              d="M14.0467 20H23.4112L28.0935 10V0H14.0467V14.2857H23.4112L14.0467 20Z"
              fill="#003366"
            />
          </svg>
        </div>

        {/* Testimonial content */}
        <p className="text-[#003366] text-lg leading-relaxed font-medium mt-4">
          The step-by-step process is great for learning, and the explanations
          help me understand the lessons better. Additionally, the email
          notifications are excellent reminders to keep me on track.
        </p>

        {/* User info */}
        <div className="mt-6">
          <p className="font-medium text-gray-800">Ed Site</p>
          <p className="text-gray-600 text-sm">Student</p>
        </div>

        {/* Star rating */}
        <div className="flex items-center mt-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5 text-[#003366] fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-gray-600">(5.0)</span>
        </div>

        {/* More reviews link */}
        <div className="mt-4">
          <a href="#" className="text-blue-600 hover:underline font-medium">
            More Reviews
          </a>
        </div>

        {/* Speech bubble triangle */}
        <div
          className="absolute -bottom-6 left-10 w-0 h-0"
          style={{
            borderLeft: "15px solid transparent",
            borderRight: "15px solid transparent",
            borderTop: "25px solid white",
          }}
        ></div>
      </div>
    </div>
  );
};

// Per-course configuration used to render different course details dynamically
const COURSE_DETAILS = {
  LearnPythonProgramming: {
    id: "LearnPythonProgramming",
    languageName: "Python",
    title: "Learn Python Programming",
    description:
      "Learn Python 3 programming language within a month using our practical course. Understand the basic syntax of Python using our online tutorial. Prepare for a future in data science, AI and ML.",
    logo: pythonlogo,
    rating: "4.6",
    reviewsText: "68197 reviews",
    lessonsText: "37 Lessons",
    levelText: "Beginner Level",
    learnersText: "255.3k",
  },
  LearnJava: {
    id: "LearnJava",
    languageName: "Java",
    title: "Learn Java Programming",
    description:
      "A practical Java course covering language fundamentals, object-oriented programming and common libraries — ideal for interview prep and backend development.",
    logo: "https://img.icons8.com/color/48/000000/java-coffee-cup-logo.png",
    rating: "4.7",
    reviewsText: "34k reviews",
    lessonsText: "36 Lessons",
    levelText: "Beginner - Intermediate",
    learnersText: "220k",
  },
  LearnC: {
    id: "LearnC",
    languageName: "C",
    title: "Learn C Programming",
    description:
      "Learn C programming language fundamentals and practical problem solving in C.",
    logo: "https://img.icons8.com/color/48/000000/c-programming.png",
    rating: "4.6",
    reviewsText: "68197 reviews",
    lessonsText: "28 Lessons",
    levelText: "Beginner Level",
    learnersText: "120k",
  },
  LearnCPP: {
    id: "LearnCPP",
    languageName: "C++",
    title: "Learn C++",
    description:
      "Practical C++ programming with modern techniques and STL usage.",
    logo: "https://img.icons8.com/color/48/000000/c-plus-plus-logo.png",
    rating: "4.7",
    reviewsText: "35k reviews",
    lessonsText: "35 Lessons",
    levelText: "Beginner - Intermediate",
    learnersText: "150k",
  },
  LearnWebDevelopment: {
    id: "LearnWebDevelopment",
    languageName: "Web Development",
    title: "Learn Web Development",
    description:
      "Front-end and back-end web development fundamentals and tooling.",
    logo: "https://img.icons8.com/color/48/000000/web.png",
    rating: "4.6",
    reviewsText: "40k reviews",
    lessonsText: "40 Lessons",
    levelText: "Beginner Level",
    learnersText: "200k",
  },
  LearnCSharp: {
    id: "LearnCSharp",
    languageName: "C#",
    title: "Learn C#",
    description:
      "Learn C# fundamentals and build a strong foundation for .NET development.",
    logo: "https://img.icons8.com/color/48/000000/c-sharp-logo.png",
    rating: "4.6",
    reviewsText: "32k reviews",
    lessonsText: "30 Lessons",
    levelText: "Beginner Level",
    learnersText: "180k",
  },
  LearnKotlin: {
    id: "LearnKotlin",
    languageName: "Kotlin",
    title: "Learn Kotlin",
    description:
      "Learn Kotlin for Android and backend development with hands-on examples.",
    logo: "https://img.icons8.com/color/48/000000/kotlin.png",
    rating: "4.7",
    reviewsText: "28k reviews",
    lessonsText: "32 Lessons",
    levelText: "Beginner - Intermediate",
    learnersText: "160k",
  },
  LearnRust: {
    id: "LearnRust",
    languageName: "Rust",
    title: "Learn Rust",
    description:
      "Learn Rust programming for high-performance and safe systems programming.",
    logo: "https://img.icons8.com/color/48/000000/rust-programming-language.png",
    rating: "4.7",
    reviewsText: "24k reviews",
    lessonsText: "36 Lessons",
    levelText: "Intermediate Level",
    learnersText: "140k",
  },
  LearnGolang: {
    id: "LearnGolang",
    languageName: "Golang",
    title: "Learn Golang",
    description:
      "Learn Go (Golang) for scalable backend and cloud-native development.",
    logo: "https://img.icons8.com/color/48/000000/golang.png",
    rating: "4.6",
    reviewsText: "26k reviews",
    lessonsText: "34 Lessons",
    levelText: "Beginner - Intermediate",
    learnersText: "150k",
  },
  LearnPHP: {
    id: "LearnPHP",
    languageName: "PHP",
    title: "Learn PHP",
    description: "Learn PHP for backend web development and dynamic websites.",
    logo: "https://img.icons8.com/officel/48/000000/php-logo.png",
    rating: "4.5",
    reviewsText: "20k reviews",
    lessonsText: "30 Lessons",
    levelText: "Beginner Level",
    learnersText: "120k",
  },
  LearnMachineLearning: {
    id: "LearnMachineLearning",
    languageName: "Machine Learning",
    title: "Learn Machine Learning",
    description:
      "Introduction to core machine learning concepts, models and evaluation.",
    logo: "https://img.icons8.com/color/48/000000/artificial-intelligence.png",
    rating: "4.4",
    reviewsText: "18k reviews",
    lessonsText: "30 Lessons",
    levelText: "Intermediate Level",
    learnersText: "110k",
  },
};

// You can place this component in your file where needed:
// <TestimonialBubble />
export default function LearnPythonDetailedPage({ courseKey: propCourseKey }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modules, setModules] = useState([]);
  const [courseTitle, setCourseTitle] = useState(null);
  const [courseDescription, setCourseDescription] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollmentLoading, setEnrollmentLoading] = useState(false);
  const { user } = useAuth();
  // const [contents, setContents] = useState([]);

  const location = useLocation();
  const { contentId } = useParams();

  // Safely get title and description from state, or use null
  const stateTitle = location?.state?.title || null;
  const stateDescription = location?.state?.description || null;


  // console.log(courseDescription);
  // console.log(contents);

  console.log(modules);
  // console.log(modules.map((module) => module.title))

  // console.log(courses.title);

  useEffect(() => {
    let isMounted = true;

    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get("/courses", {
          params: {
            page: 1,
            limit: 100,
            sort: "createdAt:-1",
          },
        });
        // console.log(response.data.data);
        const data = response?.data?.data || [];
        if (isMounted) {
          setCourses(data);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Failed to fetch courses", err);
          const message =
            err?.response?.data?.message || "Failed to load courses";
          setError(message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCourses();

    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch course details if state is not available
  useEffect(() => {
    async function fetchCourseDetails() {
      // If state has title and description, use them
      if (stateTitle && stateDescription) {
        setCourseTitle(stateTitle);
        setCourseDescription(stateDescription);
        return;
      }

      // Otherwise, fetch course by ID
      if (contentId) {
        try {
          const response = await api.get(`/courses/${contentId}`);
          const course = response?.data?.data?.course || response?.data?.course;
          if (course) {
            setCourseTitle(course.title || null);
            setCourseDescription(course.description || null);
          }
        } catch (err) {
          console.error("Failed to fetch course details", err);
        }
      }
    }

    fetchCourseDetails();
  }, [contentId, stateTitle, stateDescription]);

  console.log(contentId);

  useEffect(() => {
    async function getCourseContents() {
      if (!contentId) {
        console.warn("LearnPythonDetailedPage: missing contentId, skipping modules fetch");
        return;
      }
      try {
        const res = await api.get(`/courses/${contentId}/modules`);
        console.log(res.data);
        setModules(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    getCourseContents();
  }, [contentId]);

  useEffect(() => {
    const checkEnrollment = async () => {
      if (!user || !contentId) {
        setIsEnrolled(false);
        return;
      }
      try {
        const res = await enrollmentApi.getEnrollment(contentId);
        if (res.data.success || res.status === 200) {
          setIsEnrolled(true);
        }
      } catch (err) {
        if (err.response?.status === 400 || err.response?.status === 404) {
          setIsEnrolled(false);
        } else {
          console.error("Error checking enrollment:", err);
        }
      }
    };
    checkEnrollment();
  }, [contentId, user]);

  const handleEnrollmentAction = async () => {
    if (!user) {
      toast.error("Please login to enroll");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (isEnrolled) {
      // Find the first lesson to navigate to
      if (modules && modules.length > 0 && modules[0].contents?.length > 0) {
        const firstLessonId = modules[0].contents[0]._id;
        toast.success("Redirecting to course content...");
        navigate(`/coursecatalog/${contentId}/problems/${firstLessonId}`);
      } else if (modules && modules.length > 0 && modules[0].items?.length > 0) {
        // Fallback for different data structures
        const firstLessonId = modules[0].items[0]._id;
        toast.success("Redirecting to course content...");
        navigate(`/coursecatalog/${contentId}/problems/${firstLessonId}`);
      } else {
        toast.info("Course content is being prepared.");
      }
      return;
    }

    setEnrollmentLoading(true);
    try {
      await enrollmentApi.enroll(contentId);
      setIsEnrolled(true);
      toast.success("Successfully enrolled in the course!");
    } catch (err) {
      console.error("Enrollment failed:", err);
      toast.error(err.response?.data?.message || "Failed to enroll. Please try again.");
    } finally {
      setEnrollmentLoading(false);
    }
  };

  const handleUnenroll = async () => {
    if (!window.confirm("Are you sure you want to unenroll from this course? Your progress will be lost.")) {
      return;
    }

    setEnrollmentLoading(true);
    try {
      await enrollmentApi.unenroll(contentId);
      setIsEnrolled(false);
      toast.success("Successfully unenrolled from the course.");
    } catch (err) {
      console.error("Unenrollment failed:", err);
      toast.error(err.response?.data?.message || "Failed to unenroll. Please try again.");
    } finally {
      setEnrollmentLoading(false);
    }
  };

  const syllabusData = [
    {
      title: "Output / Print in Python",
      description:
        "Learn how to make Python print whatever you want, and learn to use it as a basic calculator.",
      lessons: [
        { name: "Introducing output / printing", type: "Lesson", isPro: false },
        { name: "Printing on multiple lines", type: "Lesson", isPro: true },
        {
          name: "Print text and numbers using single print",
          type: "Lesson",
          isPro: false,
        },
        {
          name: "Module Test: Output / Print in python",
          type: "Skill Test",
          isPro: false,
        },
      ],
    },
    {
      title: "Variables and datatypes",
      description: "Learn how to make Python store data and manipulate them",
      lessons: [
        { name: "Introducing output / printing", type: "Lesson", isPro: false },
        { name: "Printing on multiple lines", type: "Lesson", isPro: true },
        { name: "Quiz of variables", type: "Lesson", isPro: true },
        { name: "Type conversion", type: "Lesson", isPro: true },
        {
          name: "Module Test: Output / Print in python",
          type: "Skill Test",
          isPro: false,
        },
      ],
    },
    {
      title: "Variables and datatypes",
      description: "Learn how to make Python store data and manipulate them",
      lessons: [
        { name: "Introducing output / printing", type: "Lesson", isPro: false },
        { name: "Printing on multiple lines", type: "Lesson", isPro: true },
        { name: "Quiz of variables", type: "Lesson", isPro: true },
        { name: "Type conversion", type: "Lesson", isPro: true },
        {
          name: "Module Test: Output / Print in python",
          type: "Skill Test",
          isPro: false,
        },
      ],
    },
    {
      title: "Variables and datatypes",
      description: "Learn how to make Python store data and manipulate them",
      lessons: [
        { name: "Introducing output / printing", type: "Lesson", isPro: false },
        { name: "Printing on multiple lines", type: "Lesson", isPro: true },
        { name: "Quiz of variables", type: "Lesson", iPro: true },
        { name: "Type conversion", type: "Lesson", isPro: true },
        {
          name: "Module Test: Output / Print in python",
          type: "Skill Test",
          isPro: false,
        },
      ],
    },
  ];

  // Pick course based on explicit prop or route parameter; default to Python detail page
  const { coursePath } = useParams();
  const courseKey = propCourseKey || coursePath || "LearnPythonProgramming";
  const course =
    COURSE_DETAILS[courseKey] || COURSE_DETAILS.LearnPythonProgramming;

  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:gap-70 gap-6">
          {/* Left Sidebar - Exact width and spacing */}
          <div className="w-80 flex-shrink-0">
            <div className="space-y-4">
              {/* Certificate Notice - Yellow box */}
              <div className="flex items-center gap-3">
                {/* Certificate Frame */}
                <div className="w-16 h-12 border border-yellow-400 bg-[#1AA639] rounded-sm relative p-1 justify-center">
                  {/* Left Dashes */}
                  <img
                    src={badge}
                    alt="Certificate Badge"
                    className="absolute top-3 right-5  w-5 h-5 "
                  />
                </div>

                {/* Text */}
                <span className="text-sm text-gray-800 leading-snug max-w-[220px]">
                  Earn certificate after completing all the lessons.
                </span>
              </div>

              {/* Roadmap Card */}
              <div className="bg-white rounded-xl shadow-sm p-5 w-[320px]">
                {/* Top Heading */}
                <p className="text-sm text-gray-700 leading-snug mb-4">
                  This path is a part of{" "}
                  <span className="text-[#6B4F2C] font-medium">
                    {course?.languageName} roadmap ⚡
                  </span>
                </p>

                {/* Roadmap Section */}
                <div className="flex flex-col gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-semibold text-gray-900">
                        Learn {course?.languageName}
                      </span>
                    </div>
                    <span className="pl-6 text-xs text-gray-500">
                      2 courses
                    </span>
                  </div>
                  <hr className="border-gray-200" />

                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-semibold text-gray-900">
                        Beginner DSA in {course?.languageName}
                      </span>
                    </div>
                    <span className="pl-6 text-xs text-gray-500">
                      4 courses
                    </span>
                  </div>
                  <hr className="border-gray-200" />
                </div>

                {/* View Roadmap Link */}
                <a
                  href="#"
                  className="text-sm font-medium text-[#6B4F2C] hover:underline"
                >
                  View Roadmap &gt;
                </a>
              </div>
              <div>
                <TestimonialBubble />
              </div>

              {/* Testimonial Card - Updated Style */}
              {/* <div className="bg-[#EAF0FF] rounded-xl shadow-md p-6 w-[360px]"> */}
              {/* Quotation mark */}
              {/* <div className="text-[#0D2A63] text-4xl font-bold mb-3">“</div> */}

              {/* Review Text */}
              {/* <p className="text-[#0D2A63] text-[14px] leading-[22px] mb-4">
                  The step-by-step process is great for learning, and the explanations help
                  me understand the lessons better. Additionally, the email notifications are
                  excellent reminders to keep me on track.
                </p> */}

              {/* Name & Role */}
              {/* <div className="mb-3">
                  <p className="text-[#0D2A63] font-semibold text-sm">Ed Site</p>
                  <p className="text-[#6B7280] text-xs">Student</p>
                </div> */}

              {/* Rating */}
              {/* <div className="flex items-center gap-1 mb-3">
                  {Array(5)
                    .fill()
                    .map((_, i) => (
                      <Star key={i} className="text-[#FBBF24] fill-[#FBBF24]" size={16} />
                    ))}
                  <span className="text-[#0D2A63] text-xs">(5.0)</span>
                </div> */}

              {/* Link */}
              {/* <a
                  href="#"
                  className="text-[#1D4ED8] text-sm underline hover:text-[#153E75] transition-colors"
                >
                  More Reviews
                </a> */}
              {/* </div> */}

              <div className="max-w-full sm:max-w-sm mx-auto bg-white rounded-2xl shadow-md p-4 sm:p-6 text-center text-black w-full sm:w-[350px] h-auto sm:h-[330px] mt-4 sm:mt-6">
                {/* Certificate Image */}
                <div className="border-[3px] border-[#002366] rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                  <div className="flex flex-col items-center">
                    <img
                      src={certificate}
                      alt="Medal"
                      className="w-9 h-9 sm:w-10 sm:h-10 mb-3 sm:mb-4"
                    />
                    <p className="font-semibold text-[14px] sm:text-[16px] mb-2">
                      Up Next
                    </p>
                    <p className="font-semibold">
                      Completion: Completion obtain your certificate by
                      completeing the course
                    </p>
                    {/* <div className="w-28 sm:w-32 h-2 bg-[#e0e8ff] rounded-full mb-2" />
                    <div className="w-28 sm:w-32 h-2 bg-[#e0e8ff] rounded-full" /> */}
                  </div>
                </div>

                {/* Certification Text */}
                {/* <div className="text-left">

                  <h3 className="font-bold text-[14px] sm:text-[16px] mb-2 flex items-center">
                    Certification available
                    <span className="ml-2 bg-yellow-100 text-yellow-800 text-[11px] sm:text-[12px] px-2 py-1 rounded-full font-medium">
                      Included in premium
                    </span>
                  </h3>
                  <p className="text-sm text-gray-700">
                    On Completing all the courses in this roadmap, you'll get a roadmap completion certificate apart from course certificates as well
                  </p>
                </div> */}
              </div>

              {/* Up Next Card */}
              <div>
                <h3 className="font-medium text-gray-800 mb-3">Up Next</h3>
                <div className="flex flex-col gap-4 ">
                  {/* Card 1 */}
                  <div className="bg-white shadow-sm rounded-lg p-4 w-[220px]">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center justify-center rounded-lg bg-[#FEEBC8] w-12 h-12">
                        <img
                          src={course?.logo}
                          alt={`${course?.languageName} logo`}
                          className="object-contain w-8 h-8"
                        />
                      </div>
                      <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
                        Practice
                      </span>
                    </div>

                    <h3 className="mt-3 font-semibold text-gray-900 text-base">
                      Practice {course?.languageName}
                    </h3>
                    <p className="text-gray-600 text-xs mt-1 mb-4">
                      Learn the basics of {course?.languageName} data structures,
                      use practice...
                    </p>

                    <div className="mt-auto flex items-center gap-1 text-xs text-gray-500">
                      <img
                        src="/Grouppracticetest.png"
                        alt="Beginner level"
                        className="w-3.5 h-3.5"
                      />
                      <span>Beginner Level</span>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white shadow-sm rounded-lg p-4 w-[220px]">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center justify-center rounded-lg bg-[#FEEBC8] w-12 h-12">
                        <img
                          src={course?.logo}
                          alt={`${course?.languageName} logo`}
                          className="object-contain w-8 h-8"
                        />
                      </div>
                      <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
                        Practice
                      </span>
                    </div>

                    <h3 className="mt-3 font-semibold text-gray-900 text-base">
                      Practice {course?.languageName}
                    </h3>
                    <p className="text-gray-600 text-xs mt-1 mb-4">
                      Learn the basics of {course?.languageName} data structures,
                      use practice...
                    </p>

                    <div className="mt-auto flex items-center gap-1 text-xs text-gray-500">
                      <img
                        src="/Grouppracticetest.png"
                        alt="Beginner level"
                        className="w-3.5 h-3.5"
                      />
                      <span>Beginner Level</span>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white shadow-sm rounded-lg p-4 w-[220px]">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center justify-center rounded-lg bg-[#FEEBC8] w-12 h-12">
                        <img
                          src={course?.logo}
                          alt={`${course?.languageName} logo`}
                          className="object-contain w-8 h-8"
                        />
                      </div>
                      <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
                        Practice
                      </span>
                    </div>

                    <h3 className="mt-3 font-semibold text-gray-900 text-base">
                      Practice {course?.languageName}
                    </h3>
                    <p className="text-gray-600 text-xs mt-1 mb-4">
                      Learn the basics of {course?.languageName} data structures,
                      use practice...
                    </p>

                    <div className="mt-auto flex items-center gap-1 text-xs text-gray-500">
                      <img
                        src="/Grouppracticetest.png"
                        alt="Beginner level"
                        className="w-3.5 h-3.5"
                      />
                      <span>Beginner Level</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Main Course Info */}
          <div className="flex-1 ">
            {/* Header Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 w-full max-w-2xl shadow-sm ">
              {/* Header */}
              <div className="flex items-center gap-4 mb-4 w-[800px]">
                <div className="flex items-center justify-center rounded-lg bg-[#FEEBC8] w-12 h-12">
                  <img
                    src={course?.logo}
                    alt={`${course?.languageName} logo`}
                    className="object-contain w-8 h-8"
                  />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {courseTitle}
                </h1>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                {courseDescription}
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap items-center text-sm mb-6 divide-x divide-gray-300">
                {/* Rating */}
                <div className="flex items-center gap-1 pr-4">
                  <span className="font-semibold text-gray-900">
                    {course?.rating}
                  </span>
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-blue-600">({course?.reviewsText})</span>
                </div>

                {/* Lessons */}
                <div className="flex flex-col pl-4 pr-4">
                  <span className="font-medium text-gray-900">
                    {course?.lessonsText}
                  </span>
                  <span className="text-gray-500">{course?.levelText}</span>
                </div>

                {/* Learners */}
                <div className="flex flex-col pl-4">
                  <span className="font-medium text-gray-900">
                    {course?.learnersText}
                  </span>
                  <span className="text-gray-500">Learners</span>
                </div>
              </div>

              {/* Button Section */}
              {!isEnrolled ? (
                <button
                  onClick={handleEnrollmentAction}
                  disabled={enrollmentLoading}
                  className="bg-[#0D2A63] hover:bg-[#0b224e] text-white px-5 py-2 rounded-md text-sm font-medium mb-4 disabled:opacity-50"
                >
                  {enrollmentLoading ? "Processing..." : "Enroll Now"}
                </button>
              ) : (
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Enrolled
                  </div>
                  <button
                    onClick={handleEnrollmentAction}
                    className="bg-[#0D2A63] hover:bg-[#0b224e] text-white px-5 py-2 rounded-md text-sm font-medium"
                  >
                    Start Studying
                  </button>
                  <button
                    onClick={() => navigate('/mystudying')}
                    className="border border-[#0D2A63] text-[#0D2A63] hover:bg-gray-50 px-5 py-2 rounded-md text-sm font-medium"
                  >
                    My Studying
                  </button>
                  <button
                    onClick={handleUnenroll}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 px-5 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Unenroll
                  </button>
                </div>
              )}

              {/* Progress Bar with Flag on the same row */}
              {isEnrolled && (
                <div className="flex items-center gap-2 mb-2">
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 h-3 rounded-full">
                    <div className="bg-[#DCE3FF] h-3 rounded-full w-3/5"></div>
                  </div>

                  {/* Flag Icon */}
                  <img
                    src="/flag.png"
                    alt="Medal"
                    className="w-9 h-9 sm:w-10 sm:h-10"
                  />
                </div>
              )}

              {/* Login Message */}
              {!user && (
                <p className="text-sm">
                  Please{" "}
                  <a href="/login" className="text-red-500 font-medium">
                    login
                  </a>{" "}
                  to see the progress
                </p>
              )}
            </div>

            {/* Syllabus Section */}
            <h2 className="text-lg font-medium mb-4 text-gray-900">Syllabus</h2>

            <div className="space-y-4">
              {modules.map((module, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
                >
                  {/* Blue header section */}
                  <div className="bg-[#90E0EF] p-4 flex gap-3">
                    <div className="flex items-center justify-center w-8 h-8  border-4 border-white bg-[#F9A21E] text-gray-700 font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 text-base">
                        {module?.title} {index + 1}
                      </h5>
                      <p className="text-sm text-gray-700">
                        {module?.description}
                      </p>
                    </div>
                  </div>

                  {/* Lessons List */}
                  <div className="p-4 space-y-3">
                    {/* [
                        {
                          type: "Lesson",
                          name: "Introducing output / printing",
                          isPro: false,
                        },
                        {
                          type: "Lesson",
                          name: "Printing on multiple lines",
                          isPro: true,
                        },
                        {
                          type: "Lesson",
                          name: "Print text and numbers using single print",
                          isPro: false,
                        },
                        {
                          type: "Skill Test",
                          name: "Module Test: Output / Print in python",
                          isPro: false,
                        },
                      ] */}

                    {module.contents?.map((lesson, lessonIndex) => {
                      // Simplify logic: use lesson.isPro to determine status

                      return (
                        <div
                          key={lesson?._id}
                          className="flex items-center gap-3 text-sm "
                        >
                          {/* Status Indicator - Only show lock for Pro content */}
                          <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center">
                            {lesson.isPro ? (
                              <div className="w-6 h-6 bg-[#FFB039]  flex items-center justify-center">
                                <img
                                  src={lockIcon}
                                  alt="Lock icon"
                                  className="w-3 h-3 object-contain"
                                />
                              </div>
                            ) : (
                              <div className="w-5 h-5 bg-gray-300 "></div>
                            )}
                          </div>

                          {/* Lesson type - Fixed width for alignment */}
                          <span className="text-gray-800  bg-yellow-50 font-medium w-[80px] flex-shrink-0">
                            {lesson?.type}
                          </span>

                          {/* PRO badge column - Fixed width for alignment */}
                          <div className="w-[60px] flex-shrink-0">
                            {lesson?.isPro && (
                              <span className="bg-[#C5FFDB] text-[#244F22] px-2 py-0.5 rounded-full text-xs font-semibold">
                                PRO
                              </span>
                            )}
                          </div>

                          {/* Lesson name - Allow to fill remaining space */}
                          <span
                            className="text-blue-600 hover:underline cursor-pointer truncate"
                            onClick={() => {
                              if (!contentId) {
                                console.warn('Cannot navigate to problem: contentId is missing');
                                return;
                              }
                              // Open problem starting at the introductory/welcome step (q=0)
                              const target = `/coursecatalog/${contentId}/problems/${lesson._id}?q=0`;
                              navigate(target, {
                                state: {
                                  title: courseTitle,
                                  description: courseDescription,
                                  lesson,
                                },
                              });
                            }}
                          >
                            {lesson?.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
