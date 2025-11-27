import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './pages/HomePage.jsx'
import './App.css'
import PreschoolTracing from './pages/PreschoolTracing.jsx'
import PreschoolEnglish from './pages/PreschoolEnglish.jsx'
import PreschoolMaths from './pages/PreschoolMaths.jsx'
import PreschoolScience from './pages/PreSchoolScience.jsx'
import PreschoolHomework from './pages/PreschoolHomework.jsx'
import PreschoolPractice from './pages/PreschoolPractice.jsx'
import KindergartenNursery from './pages/KindergartenNursery.jsx'
import KindergartenLKG from './pages/KindergartenLKG.jsx'
import KindergartenUKG from './pages/KindergartenUKG.jsx'
import FirstGradeEnglish from './pages/FirstGradeEnglish.jsx'
import FirstGradeMaths from './pages/FirstGradeMaths.jsx'
import FirstGradeScience from './pages/FirstGradeScience.jsx'
import FirstGradeSocialStudies from './pages/FirstGradeSocialStudies.jsx'
import SecondGradeEnglish from './pages/SecondGradeEnglish.jsx'
import SecondGradeMaths from './pages/SecondGradeMaths.jsx'
import SecondGradeScience from './pages/SecondGradeScience.jsx'
import SecondGradeSocialStudies from './pages/SecondGradeSocialStudies.jsx'
import EnglishPage from "./pages/English.jsx";
import MathsPage from "./pages/Maths";
import SciencePage from "./pages/Science";
import ArtCraftsPage from "./pages/Art";
import ColoringPages from "./pages/Coloring";
import PuzzlesGames from "./pages/Puzzles";
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddWorksheet from "./pages/admin/AddWorksheet";
import ViewWorksheets from "./pages/admin/ViewWorksheets";
import TermsAndConditions from './pages/TermsAndConditions.jsx'
import ReactGA from "react-ga4";
import TrackPageView from './TrackPageView.jsx';

function App() {
  ReactGA.initialize("G-Z6YHQVY234");
  return (
    
    <Router>
      <TrackPageView />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/preschool/pre-school-tracing" element={<PreschoolTracing />} />
        <Route path="/preschool/english" element={<PreschoolEnglish />} />
        <Route path="/preschool/maths" element={<PreschoolMaths />} />
        <Route path="/preschool/science" element={<PreschoolScience/>} />
        <Route path="/preschool/homework" element={<PreschoolHomework/>} />
        <Route path="/preschool/practice" element={<PreschoolPractice/>} />
        <Route path="/kindergarten/nursery" element={<KindergartenNursery/>} />
        <Route path="/kindergarten/lkg" element={<KindergartenLKG/>} />
        <Route path="/kindergarten/ukg" element={<KindergartenUKG/>} />
        <Route path="/1st-grade/1st-grade-english" element={<FirstGradeEnglish/>} />
        <Route path="/1st-grade/1st-grade-maths" element={<FirstGradeMaths/>} />
        <Route path="/1st-grade/1st-grade-science" element={<FirstGradeScience/>} />
        <Route path="/1st-grade/1st-grade-social-studies" element={<FirstGradeSocialStudies/>} />
        <Route path="/2nd-grade/2nd-grade-english" element={<SecondGradeEnglish/>} />
        <Route path="/2nd-grade/2nd-grade-maths" element={<SecondGradeMaths/>} />
        <Route path="/2nd-grade/2nd-grade-science" element={<SecondGradeScience/>} />
        <Route path="/2nd-grade/2nd-grade-social-studies" element={<SecondGradeSocialStudies/>} />
        <Route path="/english" element={<EnglishPage />} />
        <Route path="/maths" element={<MathsPage />} />
        <Route path="/science" element={<SciencePage />} />
        <Route path="/art-crafts" element={<ArtCraftsPage />} />
        <Route path="/coloring" element={<ColoringPages />} />
        <Route path="/puzzles" element={<PuzzlesGames />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />


        {/* ---------- ADMIN ROUTES ---------- */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Admin sub-pages */}
        <Route path="/admin/add-worksheet" element={<AddWorksheet />} />
        <Route path="/admin/view-worksheets" element={<ViewWorksheets />} />

      </Routes>
    </Router>
    
  )
}

export default App
