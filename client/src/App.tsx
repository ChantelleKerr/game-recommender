import NavBar from "components/NavBar";
import LoginPage from "pages/LoginPage";
import RatingsPage from "pages/RatingsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "pages/SignupPage";
import HomePage from "pages/HomePage";
import BrowsePage from "pages/BrowsePage";
import { AuthContext, AuthProvider } from "context/AuthContext";
import { useContext } from "react";
import RecommendedPage from "pages/RecommendedPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserNavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/ratings" element={<RatingsPage />} />
          <Route path="/recommend" element={<RecommendedPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

const UserNavBar = () => {
  const { authTokens } = useContext<any>(AuthContext);
  return authTokens ? <NavBar /> : null;
};

export default App;
