import GameList from "./components/GameList";
import NavBar from "components/NavBar";
import Login from "components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "components/Signup";
import Home from "components/Home";
function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
