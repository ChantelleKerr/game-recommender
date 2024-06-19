import NavBar from "components/NavBar";
import LoginPage from "pages/LoginPage";
import RatingsPage from "pages/RatingsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "pages/SignupPage";
import HomePage from "pages/HomePage";
import { AuthContext, AuthProvider } from "context/AuthContext";
import { useContext } from "react";

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserNavBar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/ratings" element={<RatingsPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
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
