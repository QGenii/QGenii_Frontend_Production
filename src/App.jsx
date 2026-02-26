import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/public/Login";
import LoginSignupPage from "./Pages/Loginpage";
import { Register } from "./Pages/public/Register";


//!pages
import InstructionDetails from "./Pages/InstructionDetails.jsx";
import SuccessPage from "./Pages/SuccessPage";
import MailPage from "./Pages/MailPage";
import MailConfirmationPage from "./Pages/MailConfirmationPage";
import TeamSuccessPage from "./Pages/TeamSuccessPage";
import Navbar from "./Components/Navbar";


import Home1 from "./Pages/Home1";
// import ForgotPassword from "./Pages/SecondLink/ForgotPassword.jsx";
//!What we do
//? By Need
import EnterpriseWide from "./Pages/WhatWedo/ByNeed/EnterpriseWideTraining/EnterpriseWide.jsx";
import ViewCourse from "./Pages/WhatWedo/ByNeed/EnterpriseWideTraining/ViewCourse.jsx";
// !small training team
import SmallTrainingPage1 from "./Pages/WhatWedo/ByNeed/SmallTrainingTeam/SmallTrainingPage1.jsx";
//! tech training team
import TechTrainingPage from "./Pages/WhatWedo/ByNeed/TechTraining/TechTrainingPage.jsx";
//!remote and hybrid team training
import RemoteAndHybridTraning from "./Pages/WhatWedo/ByNeed/RemoteAndHybrid/RemoteAndHybridTraning.jsx";
//! leadership development
import LeadershipDevelopementPage from "./Pages/WhatWedo/ByNeed/LeadershipDevelopment/LeadershipDevelopementPage.jsx";
import Dowload from "./Pages/WhatWedo/ByNeed/CertificatePrepAndBadges/Dowload.jsx";
import AiUpskilling from "./Pages/WhatWedo/ByNeed/AIUpskilling/AiUpskilling.jsx";
// aistarterpath in ai upskilling
import AiStarterPath from "./Pages/WhatWedo/ByNeed/AIUpskilling/AiStarterPath.jsx";
//! learning path for leader
import LearningPathForLeader from "./Pages/WhatWedo/ByNeed/AIUpskilling/LearningPathForLeader.jsx";

// !learning path for business professional
import AiToolForAllEmployee from "./Pages/WhatWedo/ByNeed/AIUpskilling/LearningPathForBusinessProfessional/AiToolForAllEmployee.jsx";
import AiProductivity from "./Pages/WhatWedo/ByNeed/AIUpskilling/LearningPathForBusinessProfessional/AiProductivity.jsx";
import AiSkillForDesign from "./Pages/WhatWedo/ByNeed/AIUpskilling/LearningPathForBusinessProfessional/AiSkillForDesign.jsx";
import AiSkillForHuman from "./Pages/WhatWedo/ByNeed/AIUpskilling/LearningPathForBusinessProfessional/AiSkillForHuman.jsx";
import AiSkillForFinance from "./Pages/WhatWedo/ByNeed/AIUpskilling/LearningPathForBusinessProfessional/AiSkillForFinance.jsx";
import AiSkillForMarketing from "./Pages/WhatWedo/ByNeed/AIUpskilling/LearningPathForBusinessProfessional/AiSkillForMarketing.jsx";
import AiSkillForProjectManagement from "./Pages/WhatWedo/ByNeed/AIUpskilling/LearningPathForBusinessProfessional/AiSkillForProjectManagements.jsx";
import AiSkillForProductManagements from "./Pages/WhatWedo/ByNeed/AIUpskilling/LearningPathForBusinessProfessional/AiSkillforProductManagements.jsx";
import AiSkillForSale from "./Pages/WhatWedo/ByNeed/AIUpskilling/LearningPathForBusinessProfessional/AiSkillForSale.jsx";
import AiSkillForCustomerService from "./Pages/WhatWedo/ByNeed/AIUpskilling/LearningPathForBusinessProfessional/AiSkillForCustomerService.jsx";
import AiIntroductionForAllEmployee from "./Pages/WhatWedo/ByNeed/AIUpskilling/LearningPathForBusinessProfessional/AiIntroductionForAllEmployee.jsx";
//!learning path for technical professional
import AiOnAzure from "./Pages/WhatWedo/ByNeed/AIUpskilling/LearningPathForTechnicalProfessional/AiOnAzure.jsx";
import AjenticAi from "./Pages/WhatWedo/ByNeed/AIUpskilling/LearningPathForTechnicalProfessional/AjenticAi.jsx";
import RagSystem from "./Pages/WhatWedo/ByNeed/AIUpskilling/LearningPathForTechnicalProfessional/RagSyatem.jsx";
import AiFoundationForTechTeam from "./Pages/WhatWedo/ByNeed/AIUpskilling/LearningPathForTechnicalProfessional/AiFoundationForTechTeam.jsx";
import AiOnGoogleCloud from "./Pages/WhatWedo/ByNeed/AIUpskilling/LearningPathForTechnicalProfessional/AiOnGoogleCloud.jsx";
import AiForCyberSecurity from "./Pages/WhatWedo/ByNeed/AIUpskilling/LearningPathForTechnicalProfessional/AiForCyberSecurity.jsx";

import AiForPenetrationTester from "./Pages/WhatWedo/ByNeed/AIUpskilling/LearningPathForTechnicalProfessional/AiForPenetrationTester.jsx";
import DataAnalysisWithChatGpt from "./Pages/WhatWedo/ByNeed/AIUpskilling/LearningPathForTechnicalProfessional/DataAnalysisWithChatGpt.jsx";
import AiForSOCAnalysis from "./Pages/WhatWedo/ByNeed/AIUpskilling/LearningPathForTechnicalProfessional/AiForSOCAnalysis.jsx";
import StrategicEnablerForAi from "./Pages/WhatWedo/ByNeed/AIUpskilling/LearningPathForTechnicalProfessional/StrategicEnablerForAi.jsx";
import AiSkillForSoftware from "./Pages/WhatWedo/ByNeed/AIUpskilling/LearningPathForTechnicalProfessional/AiSkillForSoftware.jsx";
import Llmops from "./Pages/WhatWedo/ByNeed/AIUpskilling/LearningPathForTechnicalProfessional/Llmops.jsx";
import GenerativeAiForDataScience from "./Pages/WhatWedo/ByNeed/AIUpskilling/LearningPathForBusinessProfessional/GenerativeAiForDataScience.jsx";
import AjenticArchitecture from "./Pages/WhatWedo/ByNeed/AIUpskilling/LearningPathForTechnicalProfessional/AjenticArchitecture.jsx";
import LlmPerformance from "./Pages/WhatWedo/ByNeed/AIUpskilling/LearningPathForTechnicalProfessional/LlmPerformance.jsx";
import AiForDevOps from "./Pages/WhatWedo/ByNeed/AIUpskilling/LearningPathForTechnicalProfessional/AiForDevOps.jsx";
import AiDrivenForDeveloper from "./Pages/WhatWedo/ByNeed/AIUpskilling/LearningPathForTechnicalProfessional/AiDrivenForDeveloper.jsx";
import AiForQaSoftware from "./Pages/WhatWedo/ByNeed/AIUpskilling/LearningPathForTechnicalProfessional/AiForQaSoftware.jsx";
import BuildLLMPoweredApplication from "./Pages/WhatWedo/ByNeed/AIUpskilling/LearningPathForTechnicalProfessional/BuildLLMPoweredApplication.jsx";
import AiEngineering from "./Pages/WhatWedo/ByNeed/AIUpskilling/LearningPathForTechnicalProfessional/AiEngineering.jsx";
//? By team
//! leader and executive
import LeaderAndExecutivePage from "./Pages/WhatWedo/ByTeam/LeaderAndExecutive/LeaderAndExecutivePage.jsx";
import LearningAndDevelopment from "./Pages/WhatWedo/ByTeam/LearningAndDevelopment/LearningAndDevelopment.jsx";
import HumanResources from "./Pages/WhatWedo/ByTeam/HumanResources/HumanResources.jsx";
//! engineering
import Enginerring from "./Pages/WhatWedo/ByTeam/Engineering/Enginerring.jsx";
//! IT Operations
import ItOperation from "./Pages/WhatWedo/ByTeam/ITpoeration/ItOperation.jsx";
//! Data Science
import DataScience from "./Pages/WhatWedo/ByTeam/DataScience/DataScience.jsx";
import Forgotpassword from "./Pages/SecondLink/ForgetPassword.jsx";
import SendEmailStatus from "./Pages/SendEmailStatus.jsx";


//? By Industry
import Technology from "./Pages/WhatWedo/ByIndustry/Technology/Technology.jsx";
import ProfessionalService from "./Pages/WhatWedo/ByIndustry/ProfessionalService/ProfessionalService.jsx";
import FinancialService from "./Pages/WhatWedo/ByIndustry/FinancialService/FinancialService.jsx";
import Manufacture from "./Pages/WhatWedo/ByIndustry/Manufacture/Manufacture.jsx";
// !government
import Government from "./Pages/WhatWedo/ByIndustry/Government/Government.jsx";
import StateAndLocal from "./Pages/WhatWedo/ByIndustry/Government/StateAndLocal.jsx";
import Federal from "./Pages/WhatWedo/ByIndustry/Government/Federal.jsx";
import International from "./Pages/WhatWedo/ByIndustry/Government/International.jsx";
import ReadAboutUserManageMent from "./Pages/WhatWedo/ByIndustry/Government/International/ReadAboutUserManageMent.jsx";
import LearnAboutMoreReporting from "./Pages/WhatWedo/ByIndustry/Government/International/LearnAboutMoreReporting.jsx";
import ViewOurIntegration from "./Pages/WhatWedo/ByIndustry/Government/International/ViewOurIntegration.jsx";
import PartnerWithUs from "./Pages/WhatWedo/ByIndustry/Government/International/PartnerWithUs.jsx";
// !higher education
import HigherEducation from "./Pages/WhatWedo/ByIndustry/HigherEducation/HigherEducation.jsx";

//! financial service  in story
import TransformationStory from "./Pages/WhatWedo/ByIndustry/FinancialService/FinancialServiceStory/TransformationStory.jsx";
import SuccessStory from "./Pages/WhatWedo/ByIndustry/FinancialService/FinancialServiceStory/SuccessStory.jsx";
import CompanySuccess from "./Pages/WhatWedo/ByIndustry/FinancialService/FinancialServiceStory/CompanySuccess.jsx";
import TrainingTransformation from "./Pages/WhatWedo/ByIndustry/FinancialService/FinancialServiceStory/TrainingTranformation.jsx";

// import RestPassword from "./Pages/ResetPassword.jsx";
import ResetPasswordMessage from "./Pages/ResetPasswordMessage.jsx";


//! Dedicated Customer Success Team

import DedicatedCustomerSuccessTeam from "./Pages/DedicatedCustomerSuccessTeam/DedicatedCustomerSuccessTeam.jsx";
import RequestDemo from "./Pages/DedicatedCustomerSuccessTeam/RequestDemo.jsx";


//? By Industry
// import ProfessionalService from "./pages/WhatWedo/ByIndustry/ProfessionalService/ProfessionalService.jsx";
// import FinancialService from "./pages/WhatWedo/ByIndustry/FinancialService/FinancialService.jsx";
// import Manufacture from "./pages/WhatWedo/ByIndustry/Manufacture/Manufacture.jsx";
// !government
// import Government from "./pages/WhatWedo/ByIndustry/Government/Government.jsx";
// import StateAndLocal from "./pages/WhatWedo/ByIndustry/Government/StateAndLocal.jsx";
// import Federal from "./pages/WhatWedo/ByIndustry/Government/Federal.jsx";
// import International from "./pages/WhatWedo/ByIndustry/Government/International.jsx";
// import ReadAboutUserManageMent from "./pages/WhatWedo/ByIndustry/Government/International/ReadAboutUserManageMent.jsx";
// import LearnAboutMoreReporting from "./pages/WhatWedo/ByIndustry/Government/International/LearnAboutMoreReporting.jsx";
// import ViewOurIntegration from "./pages/WhatWedo/ByIndustry/Government/International/ViewOurIntegration.jsx";
// import PartnerWithUs from "./pages/WhatWedo/ByIndustry/Government/International/PartnerWithUs.jsx";
// // !higher education
// import HigherEducation from "./pages/WhatWedo/ByIndustry/HigherEducation/HigherEducation.jsx";

// //! financial service  in story
// import TransformationStory from "./pages/WhatWedo/ByIndustry/FinancialService/FinancialServiceStory/TransformationStory.jsx";
// import SuccessStory from "./pages/WhatWedo/ByIndustry/FinancialService/FinancialServiceStory/SuccessStory.jsx";
// import CompanySuccess from "./pages/WhatWedo/ByIndustry/FinancialService/FinancialServiceStory/CompanySuccess.jsx";
// import TrainingTransformation from "./pages/WhatWedo/ByIndustry/FinancialService/FinancialServiceStory/TrainingTranformation.jsx";

// ! how we do it
import AiEnabledLearning from "./Pages/HowWedoit/AiEnabledLearning/AiEnabledLearning.jsx";
import RealWorldInstructor from "./Pages/HowWedoit/RealWorldInstructor/RealWorldInstructor.jsx";
import MultiLanguageCollection from "./Pages/HowWedoit/MultiLanguageCollection/MultiLanguageCollection.jsx";
import CaseStudies from './Pages/HowWedoit/CaseStudies/CaseStudies.jsx';
import LeadingGenAiInovationprogram from './Pages/HowWedoit/LeadingGenAiInovationprogram/LeadingGenAiInovationprogram.jsx';
import InvestLeaderProgram from './Pages/HowWedoit/InvestLeaderProgram/InvestLeaderProgram.jsx';
import UnlockingGenAiWithAws from './Pages/HowWedoit/UnlockingGenAiWithAws/UnlockingGenAiWithAws.jsx';
import PartnerWithQgenii from './Pages/HowWedoit/PartnerWithQgenii/PartnerWithQgenii.jsx';

// !Second Link
import SignUp from "./Pages/SecondLink/SignUp.jsx";
import LoginPage from "./Pages/SecondLink/Login.jsx";
import ForgetPassword from "./Pages/SecondLink/ForgetPassword.jsx";
import ResetPassword from "./Pages/SecondLink/ResetPassword.jsx";
import PaymentDetails from './Pages/SecondLink/PaymentDetails.jsx';

//! Code IQ Genius
import CodeIQGenius from "./Pages/CodeIQGenius/MainPage/CodeIQGenius.jsx";
import DownloadGuide from './Pages/CodeIQGenius/DownloadGuide.jsx'
import CodeIqgeniusAccelerate
  from "./Pages/CodeIQGenius/MainPage/CodeIqgeniusAccelerate.jsx";

import ComparePlan from "./Pages/CodeIQGenius/ComparePlan.jsx";
import ProffessionService from "./Pages/CodeIQGenius/MainPage/ProffessionalService.jsx";
//? cohort learning request demo
import CohortLearningRequestdemo from "./Pages/CodeIQGenius/MainPage/CohortLeaningRequestdemo.jsx";
// ? cohort learning
import CohortLearning from "./Pages/CodeIQGenius/MainPage/CohortLearning.jsx";

import { useAuth } from "./hooks/useAuth";
import { Navigate } from "react-router-dom";
import Home from "./Pages/Home";

import Layout from "./Pages/Layout";

import { Toaster } from "react-hot-toast";

////!!!!!!!!
import "remixicon/fonts/remixicon.css";
import Homepage from "./Pages/Home.jsx";

import Home2 from "./Pages/HomeAfterLogin/Home2";


import ChangePassword from "./Pages/ChangePassword";

// import CoursesHome from './Pages/CourseCatalog/CoursesHome'
// import LearnPythonDetailedPage from './Pages/LearnProgrammingSections/LearnPythonDetailedPage';
import PythonRoadmap from "./Pages/DetailedRoadmapSection/PythonRoadmap";
import PythonTest from "./Pages/OnlineTests/PythonTest";
import PythonTestReport from "./Pages/ModuleTest/PythonTestReport";
import PrintLesson from "./Pages/Lessons/PrintLesson";
import OutputPrintTest from "./Pages/ModuleTest/OutputPrintTest";

// Dashboard pages
import { AdminDashboard } from "./Pages/dashboard/AdminDashboard";
import { SuperAdminDashboard } from "./Pages/dashboard/SuperAdminDashboard";
import { MentorDashboard } from "./Pages/dashboard/MentorDashboard";
import { UserDashboard } from "./Pages/dashboard/UserDashboard";
import { HiringPartnerDashboard } from "./Pages/dashboard/HiringPartnerDashboard";

// Profile pages
import UserProfile from "./Pages/user_profile/UserProfile.jsx";
import ViewUserProfile from "./Pages/user_profile/ViewUserProfile.jsx";

// Manage pages
import { Approvals } from "./Pages/manage/Approvals";
import { UsersManage } from "./Pages/manage/UsersManage";
import { CategoriesManage } from "./Pages/manage/CategoriesManage";
import { CoursesManage } from "./Pages/manage/CoursesManage";
import SkillTestManage from "./Pages/manage/Skill.test.jsx";
import { CourseCreate } from "./Pages/manage/CourseCreate";
import { CourseEdit } from "./Pages/manage/CourseEdit";
import { AdminCreate } from "./Pages/manage/AdminCreate";
import { CourseModuleManager } from "./Pages/manage/CourseModuleManager";
import CourseManageDashboard from "./Pages/manage/CourseManageDashboard";
import { ContentCreate } from "./Pages/manage/ContentCreate";
import ContentEdit from "./Pages/manage/ContentEdit";
import EnrollmentsManager from "./Pages/manage/EnrollmentsManager";
import ProblemDashboard from './components/PracticePage/PastProblems/ProblemDashboard';

// !job portal

import JobPortalPage from "./Components/JobPortal/JobPortalPage";
import JobDetailsPage from "./Components/JobPortal/JobDetailsPage";
// import JobApplicationPage from '../Components/JobPortal/JobApplicationPage';
import JobApplicationSuccess from "./Components/JobPortal/JobApplicationSuccess";
import SearchDetails from "./Components/JobPortal/JobApplicationForm";
import JobDetails from "./Components/JobPortal/JobCard";
import JobLandingPage from "./Components/NewJobPortal/JobLandingPage";
import JobApplication from "./Components/NewJobPortal/JobApplication";

// blogs
import BlogPage from "./Components/Blog/BlogPage";
import NewPostPage from "./Components/Blog/NewPostPage";
import EditPostPage from "./Components/Blog/EditPostPage";
import PostPreviewPage from "./Components/Blog/PostPreviewPage";
import PostSuccessPage from "./Components/Blog/PostSuccessPage";
import ViewPostPage from "./Components/Blog/ViewPostPage";

//  courses
import CourseDetail from "./Components/CourseDetails/CourseDetail.jsx";
import InstructorDetails from "./Components/CourseDetails/InstructorDetails.jsx";
import CourseDetailsTeam from "./Components/CourseDetails/CourseDetailsTeam.jsx";
// import PaymentDetails from "./Components/CourseDetails/PaymentDetails.jsx";
import CoursesHome from "./Components/CourseDetails/CourseCatalog/CoursesHome.jsx";

import ProblemView from "./Components/CourseDetails/Problems/ProblemView.jsx";
import AIHelpView from "./Components/CourseDetails/Problems/AIHelpView.jsx";
import ProblemNavbar from "./Components/CourseDetails/Problems/ProblemsNavbar.jsx";
import RightCodePanel from "./Components/CourseDetails/Problems/RightCodePanel.jsx";
import SolutionsView from "./Components/CourseDetails/Problems/SolutionsView.jsx";
import Submissions from "./Components/CourseDetails/Problems/SubmissionView.jsx";

// recent-contest
import BookmarkedProblems from "./Components/CourseDetails/Problems/Recent_Contest/BookmarkedProblems.jsx";
import ExplainedProblems from "./Components/CourseDetails/Problems/Recent_Contest/ExplainedProblems.jsx";
import RecentContestProblems from "./Components/CourseDetails/Problems/Recent_Contest/RecentContestProblems.jsx";

import LearnPythonDetailedPage from "./Components/CourseDetails/CourseCatalog/LearnPythonDetailedPage.jsx";

// compiler
import CompilerPage from "./Components/Compiler/CompilerPage.jsx";

// contest
import ContestPage from './Components/Contest/ContestPage.jsx'
import ContestDetailPage from './Components/Contest/ContestDetailPage.jsx'
import ContestDetailsPage from './Components/Contest/ContestDetailsPage.jsx'
import ContestStartPage from './Components/Contest/ContestStartPage.jsx'
import ContestAssessmentPage from './Components/Contest/ContestAssessmentPage.jsx'
import ContestSummaryPage from './Components/Contest/ContestSummaryPage.jsx'
import ContestResultsPage from './Components/Contest/ContestResultsPage.jsx'
import UpcomingContestDetails from './Components/Contest/UpcomingContestDetails.jsx'
import UpcomingContestDivisionPage from './Components/Contest/UpcomingContestDivisionPage.jsx'
import PastContestDetailsPage from './Components/Contest/PastContestDetailsPage.jsx'
import PastContestDivisionPage from './Components/Contest/PastContestDivisionPage.jsx'
import CodeOfConductPage from './Components/Contest/CodeOfConductPage.jsx'

// profile
// !Profile
import MyJobAndInternship from "./Pages/Profile/MyJobAndInternship.jsx";
import OrganizerDashboard from "./Pages/Profile/OrganizerDashboard.jsx";
import Profile from "./Pages/Profile/Profile.jsx";

import CertificateOfParticipant from "./Pages/Profile/MyJobInternshipComponentShared/CertificateOfParticipant.jsx";

// contest
import ContestsCatalog from './Pages/Contest/ContestsCatalog';
import ContestDetail from './Pages/Contest/ContestDetail';
import ContestAttempt from './Pages/Contest/ContestAttempt';
import ContestLeaderboard from './Pages/Contest/ContestLeaderboard';
import CodingContestAttempt from './Pages/Contest/CodingContestAttempt';
import ContestQuestionsList from './Pages/Contest/ContestQuestionsList';
import ContestCreate from './Pages/Contest/ContestCreate';
import ContestManageDashboard from './Pages/Contest/ContestManageDashboard';
import ContestQuestionsManager from './Pages/Contest/ContestQuestionsManager';
import ContactForm from './Components/ContactForm';


// UpperNavbar

import UpperNavbar from "./Components/CourseDetails/Problems/UpperNavbar.jsx";
// Nitesh routes and imports
import ContactPage from "./Pages/ContactPage.jsx";
import AdminContactManagement from "./Pages/Admin/AdminContactUs.jsx";
import PublicProfile from "./Pages/public/PublicProfile.jsx"
import PrivacySettings from "./Pages/PrivacySettings.jsx";
import UserProfile1 from "./Pages/profile1/UserProfile.jsx";

// Admin pages
import { AdminPracticeApproval } from "./Pages/Admin/AdminPracticeApproval.jsx";
import { BadgeManagement } from "./Pages/Admin/BadgeManagement.jsx";
import CreatePracticeCategory from "./Pages/Admin/CreatePracticeCategory.jsx";
import { LeaderboardConfig } from "./Pages/Admin/LeaderboardConfig.jsx";
import WalletDashboard from './Components/wallet/WalletDashboard';
import CatalogBrowser from './Components/wallet/CatalogBrowser';
import MyPurchases from './Components/wallet/MyPurchases';
import WalletItemManager from './Components/wallet/WalletItemManager';
import WalletConfigManager from './Components/wallet/WalletConfigManager';
import AboutUs from "./Components/AboutUs.jsx";

// My Studying Pages
import AiAssistance from "./MyStudingPages/AiAssistance";
import MyStudying from "./MyStudingPages/MyStudying";
import ReminderModal from "./MyStudingPages/ReminderModel";


// Certificate pages
import Certificates from './Pages/Certificates';
import VerifyCertificate from './Pages/VerifyCertificate';
// import CatalogBrowser from '../components/wallet/CatalogBrowser';
// import MyPurchases from '../components/wallet/MyPurchases';
// import WalletItemManager from '../components/wallet/WalletItemManager';
// import WalletConfigManager from '../components/wallet/WalletConfigManager';

// practice
import PracticePage from "./Components/PracticePage/PracticePage";
import PracticeDetail from "./Components/PracticePage/PracticeDetails.jsx";
import QuestionPage from "./Components/PracticePage/PracticeDetails/PracticeQuestion.jsx";

// study plan
import StudyPlan from "./Components/Skills/StudyPlan.jsx";
import PerformanceTrends from "./Components/Skills/PerformanceTrends.jsx";

import Footer from "./Components/Footer_Section/Footer/footer.jsx";
import BottomSection from "./Components/Footer_Section/BottomSection/BottomSection.jsx";
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/" />;
  }

  return children;
};

// Dashboard Route Handler
const DashboardRoute = () => {
  const { user, isAdmin, isSuperAdmin, isMentor } = useAuth();

  if (isSuperAdmin()) {
    return <SuperAdminDashboard />;
  } else if (isAdmin()) {
    return <AdminDashboard />;
  } else if (isMentor()) {
    return <MentorDashboard />;
  } else if (user?.role === "HIRING_PARTNER") {
    return <HiringPartnerDashboard />;
  } else {
    return <UserDashboard />;
  }
};

const App = () => {
  const { user, loading, isAdmin } = useAuth();

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={user ? <Navigate to="/home" /> : <Homepage />}
          />
          <Route path="user1" element={<UserProfile1 />} />
          <Route path="contactus" element={<ContactPage />} />
          <Route path="/dashboard/contacts" element={<AdminContactManagement />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="/practice/:id" element={<PracticeDetail />} />
          <Route path="/question/:id" element={<QuestionPage />} />
          <Route path="profile/:username" element={<PublicProfile />} />
          <Route path="/profile/privacy" element={<PrivacySettings />} />
          <Route path="/aboutus" element={<AboutUs />} />
          {/* Homepage */}
          {/* <Route index element={<HomePage />} /> */}
          <Route path="/home" element={<Home2 />} />
          <Route path="/login" element={<LoginSignupPage />} />
          <Route path="/forgot-password" element={<Forgotpassword />} />
          <Route path="/send-emailstatus" element={<SendEmailStatus />} />
          <Route
            path="/resetpassword-status"
            element={<ResetPasswordMessage />}
          />
          <Route path="/changepassword" element={<ChangePassword />} />

          <Route path="/coursecatalog" element={<CoursesHome />} />
          <Route
            path="/coursecatalog/:contentId/"
            element={<LearnPythonDetailedPage />}
          />
          <Route path="/roadmaps/:roadmapSlug" element={<PythonRoadmap />} />
          <Route path="/practicetests/:skillName" element={<PythonTest />} />
          <Route
            path="/module-test/python/output-print"
            element={<PythonTestReport />}
          />
          <Route path="/learn-python/print-lesson" element={<PrintLesson />} />
          <Route
            path="/module-test/python-output-print"
            element={<OutputPrintTest />}
          />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/practice/:id" element={<PracticeDetail />} />

          {/* Study Plan Routes */}
          <Route path="/skills/study-plan" element={<StudyPlan />} />
          <Route
            path="/skills/study-plan/performance"
            element={<PerformanceTrends />}
          />


          <Route path='/home1' element={<Home1 />} />
          <Route path='/HOME1' element={<Home1 />} />

          {/* Second Link */}

          <Route path="secondlinksignup" element={<SignUp />} />
          <Route path="secondlinklogin" element={<LoginPage />} />
          <Route path="secondlinkforgetpassword" element={<ForgetPassword />} />
          <Route path="secondlinkresetpassword" element={<ResetPassword />} />
          <Route path="paymentdetails" element={<PaymentDetails />} />


          {/* By Team */}


          {/* leader and executive */}
          <Route path="leaderandexecutivepage" element={<LeaderAndExecutivePage />} />
          {/* learning and development */}
          <Route path="learninganddevelopment" element={<LearningAndDevelopment />} />
          {/* human resources */}
          <Route path="humanresources" element={<HumanResources />} />
          {/* engineering */}
          <Route path="enginerring" element={<Enginerring />} />
          {/* IT Operations */}
          <Route path="itoperation" element={<ItOperation />} />
          {/* Data Science */}
          <Route path="datascience" element={<DataScience />} />
          {/* By Industry */}
          <Route path="technology" element={<Technology />} />
          {/* professional service */}
          <Route path="professionalservice" element={<ProfessionalService />} />
          {/* financial service */}
          <Route path="financialservice" element={<FinancialService />} />
          {/* financial service story */}
          <Route path="transformationstory" element={<TransformationStory />} />
          <Route path="successstory" element={<SuccessStory />} />
          <Route path="companysuccess" element={<CompanySuccess />} />
          <Route path="trainingtransformation" element={<TrainingTransformation />} />
          {/* manufacture */}
          <Route path="manufacture" element={<Manufacture />} />
          {/* government */}
          <Route path="government" element={<Government />} />
          <Route path="/stateandlocal" element={<StateAndLocal />} />
          <Route path="/federal" element={<Federal />} />
          <Route path='international' element={<International />} />
          <Route path='readaboutusermanagement' element={<ReadAboutUserManageMent />} />
          <Route path='learnaboutmorereporting' element={<LearnAboutMoreReporting />} />
          <Route path='viewourintegration' element={<ViewOurIntegration />} />
          <Route path='partnerwithus' element={<PartnerWithUs />} />
          {/* Higher Education */}
          <Route path='highereducation' element={<HigherEducation />} />


 {/* sucess page */}


 <Route path="instructiondetails" element={<InstructionDetails />} />
          <Route path="successpage" element={<SuccessPage />} />

          <Route path="mailPage" element={<MailPage />} />
          <Route
            path="mailconfirmationpage"
            element={<MailConfirmationPage />}
          />
          <Route path="teamsuccesspage" element={<TeamSuccessPage />} />




          {/* how we do it */}
          <Route path='aienabledlearning' element={<AiEnabledLearning />} />
          <Route path='realworldinstructor' element={<RealWorldInstructor />} />
          <Route path='multilanguagecollection' element={<MultiLanguageCollection />} />
          <Route path='casestudies' element={<CaseStudies />} />
          <Route path='leadinggenaiinovationprogram' element={<LeadingGenAiInovationprogram />} />
          <Route path='investleaderprogram' element={<InvestLeaderProgram />} />
          <Route path='unlockinggenaiwithaws' element={<UnlockingGenAiWithAws />} />
          <Route path='partnerwithqgenii' element={<PartnerWithQgenii />} />



          {/* Certificate routes */}
          <Route path="/verify/:id" element={<VerifyCertificate />} />
          <Route
            path="/certificates"
            element={
              <ProtectedRoute>
                <Certificates />
              </ProtectedRoute>
            }
          />
          {/* Dedicated Customer Success Team */}

          <Route
            path="dedicatedcustomersuccessteam"
            element={<DedicatedCustomerSuccessTeam />}
          />
          <Route path="requestdemo" element={<RequestDemo />} />
          {/* What we do */}
          {/* By Need */}
          <Route path="enterprisewide" element={<EnterpriseWide />} />
          <Route path="viewcourse" element={<ViewCourse />} />
          {/* small traing team */}
          <Route path="smalltrainingpage" element={<SmallTrainingPage1 />} />
          {/* tech training team */}
          <Route path="techtrainingpage" element={<TechTrainingPage />} />
          {/* remote and hybrid team training */}

          <Route path="remoteandhybridtraning" element={<RemoteAndHybridTraning />} />
          {/* leadership development */}
          <Route path="leadershipdevelopementpage" element={<LeadershipDevelopementPage />} />


          {/* My studing section */}
          <Route path="mystudying" element={<MyStudying />} />
          <Route path="remider" element={<ReminderModal />} />
          <Route path="aiassistance" element={<AiAssistance />} />
          {/* Wallet routes */}
          <Route
            path="/wallet"
            element={
              <WalletDashboard />

            }
          />
          <Route
            path="/wallet/catalog"
            element={

              <CatalogBrowser />

            }
          />
          <Route
            path="/wallet/purchases"
            element={

              <MyPurchases />

            }
          />

          {/* Job Portal Routes */}
          <Route path="/job-portal" element={<JobLandingPage />} />
          <Route path="/jobs" element={<JobPortalPage />} />
          <Route path="/jobs/search" element={<SearchDetails />} />
          <Route path="/jobs/:id/details" element={<JobDetailsPage />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/jobs/:id/apply" element={<JobApplication />} />
          <Route
            path="/jobs/:id/application-success"
            element={<JobApplicationSuccess />}
          />

          {/* blogs */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/new-post" element={<NewPostPage />} />
          <Route path="/blog/new-post/edit" element={<EditPostPage />} />
          <Route path="/blog/new-post/preview" element={<PostPreviewPage />} />
          <Route path="/blog/post-success" element={<PostSuccessPage />} />
          <Route path="/blog/view-post" element={<ViewPostPage />} />

          {/* courses */}
          <Route path="/courses/allCourses" element={<CoursesHome />} />
          <Route path="/courses/course-detail" element={<CourseDetail />} />
          <Route
            path="/courses/instructor-detail"
            element={<InstructorDetails />}
          />
          <Route
            path="/courses/course-details-team"
            element={<CourseDetailsTeam />}
          />
          {/* <Route path="/courses/payment" element={<PaymentDetails />} /> */}
          {/* <Route path='/courses/coursecatalog' element={<CoursesHome />}/> */}
          {/* Dynamic course detail route driven by course.path from CourseCatalog */}
          <Route
            path="/courses/coursecatalog/:coursePath"
            element={<LearnPythonDetailedPage />}
          />

          {/* <Route path='/courses/roadmaps/pythonroadmap' element={<PythonRoadmap />}/> */}
          {/* <Route path='/courses/practicetests/python' element={<PythonTest />}/> */}
          {/* <Route path="/courses/module-test/python/output-print" element={<PythonTestReport />} /> */}
          {/* <Route path="/courses/learn-python/print-lesson" element={<PrintLesson />} /> */}
          {/* <Route path="/courses/module-test/python-output-print" element={<OutputPrintTest />} /> */}

          {/* Problems */}
          <Route path="/coursecatalog/:contentId/problems/:id" element={<ProblemView />} />
          <Route path="/coursecatalog/:contentId/problems/:id/submissions" element={<Submissions />} />
          <Route path="/coursecatalog/:contentId/problems/:id/solutions" element={<SolutionsView />} />
          <Route path="/coursecatalog/:contentId/problems/:id/ai-help" element={<AIHelpView />} />

          <Route path="/users/:username/dashboard" element={<ProblemDashboard />} />


          {/* Recent Context */}
          <Route
            path="/recent-context/bookmarked"
            element={<BookmarkedProblems />}
          />
          <Route
            path="/recent-context/explained"
            element={<ExplainedProblems />}
          />
          <Route
            path="/recent-context/contest"
            element={<RecentContestProblems />}
          />

          {/* compiler */}
          <Route path="/compiler" element={<CompilerPage />} />

          {/* Contest Routes */}
          <Route path="/contest" element={<ContestPage />} />
          <Route path="/contest/code-of-conduct" element={<CodeOfConductPage />} />
          <Route
            path="/contest/history/:contestId"
            element={<PastContestDetailsPage />}
          />
          <Route
            path="/contest/history/:contestId/division/:divisionId"
            element={<PastContestDivisionPage />}
          />

          {/* Contest Routes */}
          <Route
            path="/contest/ongoing/:contestId"
            element={<ContestDetailsPage />}
          />
          <Route
            path="/contest/ongoing/:contestId/start"
            element={<ContestStartPage />}
          />
          <Route
            path="/contest/ongoing/:contestId/assessment"
            element={<ContestAssessmentPage />}
          />
          <Route
            path="/contest/ongoing/:contestId/summary"
            element={<ContestSummaryPage />}
          />
          <Route
            path="/contest/ongoing/:contestId/results"
            element={<ContestResultsPage />}
          />

          {/* Upcoming Contest Practice Problems */}
          <Route
            path="/contest/upcoming/:contestId"
            element={<UpcomingContestDetails />}
          />
          <Route
            path="/contest/upcoming/:contestId/division/:divisionId"
            element={<UpcomingContestDivisionPage />}
          />
          {/* <Route path="/contest/upcoming/:contestId/practice-problems" element={<UpcomingContestPracticeProblemsPage />} /> */}

          {/*   profile - Protected Routes */}
          <Route
            path="myjobandinternship"
            element={
              <ProtectedRoute>
                <MyJobAndInternship />
              </ProtectedRoute>
            }
          />
          <Route
            path="organizerdashboard"
            element={
              <ProtectedRoute>
                <OrganizerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="certificateofparticipant"
            element={
              <ProtectedRoute>
                <CertificateOfParticipant />
              </ProtectedRoute>
            }
          />

          {/* Dashboard - Dynamic based on role */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardRoute />
              </ProtectedRoute>
            }
          />

          {/* User Dashboard */}
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* Profile routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />


          {/* Mentor Routes */}
          <Route
            path="/mentor/dashboard"
            element={
              <ProtectedRoute>
                <MentorDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mentor/courses/create"
            element={
              <ProtectedRoute>
                <CourseCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mentor/courses/edit/:id"
            element={
              <ProtectedRoute>
                <CourseEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mentor/courses/:courseId/modules"
            element={
              <ProtectedRoute>
                <CourseModuleManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mentor/courses/:courseId/manage"
            element={
              <ProtectedRoute>
                <CourseManageDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mentor/courses/:courseId/enrollments"
            element={
              <ProtectedRoute>
                <EnrollmentsManager />

              </ProtectedRoute>
            }
          />
          <Route
            path="/mentor/modules/:moduleId/content/create"
            element={
              <ProtectedRoute>
                <ContentCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mentor/content/:contentId/edit"
            element={
              <ProtectedRoute>
                <ContentEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mentor/contests/create"
            element={
              <ProtectedRoute>
                <ContestCreate />
              </ProtectedRoute>
            }
          />

          {/* Admin routes */}
          <Route
            path="/dashboard/approvals"
            element={
              <ProtectedRoute requireAdmin>
                <Approvals />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/users"
            element={
              <ProtectedRoute requireAdmin>
                <UsersManage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/categories"
            element={
              <ProtectedRoute requireAdmin>
                <CategoriesManage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/courses"
            element={
              <ProtectedRoute requireAdmin>
                <CoursesManage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/skill-test"
            element={
              <ProtectedRoute requireAdmin>
                <SkillTestManage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/courses/create"
            element={
              <ProtectedRoute requireAdmin>
                <CourseCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/courses/edit/:id"
            element={
              <ProtectedRoute requireAdmin>
                <CourseEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admins/create"
            element={
              <ProtectedRoute requireAdmin>
                <AdminCreate />
              </ProtectedRoute>
            }
          />


          <Route path="/contests" element={<ContestsCatalog />} />
          <Route path="/contests/:id" element={<ContestDetail />} />
          <Route path="/dashboard/contactf" element={<ContactForm />} />
          <Route
            path="/contests/:id/attempt"
            element={
              <ProtectedRoute>
                <ContestAttempt />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contests/:id/code"
            element={
              <ProtectedRoute>
                <CodingContestAttempt />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contests/:id/questions"
            element={
              <ProtectedRoute>
                <ContestQuestionsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contests/:id/questions/:questionId/solve"
            element={
              <ProtectedRoute>
                <CodingContestAttempt />
              </ProtectedRoute>
            }
          />
          <Route path="/contests/:id/leaderboard" element={<ContestLeaderboard />} />

          <Route
            path="/contests/create"
            element={
              <ProtectedRoute>
                <ContestCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage/contests"
            element={
              <ProtectedRoute>
                <ContestManageDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage/contests/:contestId/questions"
            element={
              <ProtectedRoute>
                <ContestQuestionsManager />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/dashboard/practice-approval"
            element={
              <ProtectedRoute requireAdmin>
                <AdminPracticeApproval />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/badge-management"
            element={
              <ProtectedRoute requireAdmin>
                <BadgeManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/create-practice-category"
            element={
              <ProtectedRoute>
                <CreatePracticeCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/leaderboard-config"
            element={
              <ProtectedRoute requireAdmin>
                <LeaderboardConfig />
              </ProtectedRoute>
            }
          />

        </Route>




      </Routes>

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 1400,
          style: {
            borderRadius: "8px",
            padding: "12px 16px",
            fontSize: "15px",
            color: "#fff",
          },

          // Success Toast
          success: {
            style: {
              background: "linear-gradient(135deg, #28a745, #4ece69)",
              boxShadow: "0 4px 14px rgba(40,167,69,.4)",
            },
            iconTheme: {
              primary: "white",
              secondary: "#28a745",
            },
          },

          // Error Toast
          error: {
            style: {
              background: "linear-gradient(135deg, #d9534f, #f44336)",
              boxShadow: "0 4px 14px rgba(244,67,54,.4)",
            },
            iconTheme: {
              primary: "white",
              secondary: "#d9534f",
            },
          },

          // Loading Toast
          loading: {
            style: {
              background: "linear-gradient(135deg, #0275d8, #3b8ef3)",
              boxShadow: "0 4px 14px rgba(2,117,216,.4)",
            },
          },

          // Custom Warning
          custom: {
            style: {
              background: "linear-gradient(135deg, #f0ad4e, #ffb647)",
              boxShadow: "0 4px 14px rgba(240,173,78,.4)",
            },
          },
        }}
      />
      <Footer />
      <BottomSection />
    </div>
  );
};

export default App;
