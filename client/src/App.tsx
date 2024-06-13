import NavBar from "components/NavBar";
import Login from "components/Login";
import RatingsPage from "pages/RatingsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "components/Signup";
import HomePage from "pages/HomePage";
import { AuthProvider } from "context/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/ratings" element={<RatingsPage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
