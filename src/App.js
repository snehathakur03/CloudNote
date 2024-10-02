import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import NoteState from './context/notes/NoteState';
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="You can save your notes here...."/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />}>{" "}</Route>
              <Route exact path="/about" element={<About />}>{" "}</Route>
              <Route exact path="/login" element={<Login />}>{" "}</Route>
              <Route exact path="/signup" element={<Signup />}>{" "}</Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
