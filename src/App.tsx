import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import AddAthlete from "./pages/admin/AddAthletes";
import AddResult from "./pages/admin/AddResults";
import TotalScores from "./pages/TotalScores";

function App() {
  return (
    <>
      <Link to="/">
        <button>Avaleht</button>
      </Link>
      <Link to="/total-scores">
        <button>Kõik skoorid</button>
      </Link>
      <Link to="/add-athletes">
        <button>Lisa sportlane</button>
      </Link>
      <Link to="/add-results">
        <button>Lisa tulemused</button>
      </Link>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/total-scores" element={<TotalScores />} />
        <Route path="/add-athletes" element={<AddAthlete />} />
        <Route path="/add-results" element={<AddResult />} />
      </Routes>
    </>
  );
}

export default App;
