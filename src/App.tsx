import { Link, Route, Routes } from 'react-router-dom'
import './App.css'

// Impordime sinu loodud lehed
import HomePage from './pages/HomePage'
import TotalScores from './pages/TotalScores'
import ManageAthletes from './pages/admin/ManageAthletes'
import AddAthletes from './pages/admin/AddAthlete'
import AddResults from './pages/admin/AddResult'

function App() {

  return (
    <>
      <nav>
        <Link to="/">
          <button>Avaleht</button>
        </Link>

        <Link to="/scores">
          <button>Edetabel</button>
        </Link>

        <Link to="/admin/add-athlete">
          <button>Lisa sportlane</button>
        </Link>

        <Link to="/admin/add-result">
          <button>Lisa tulemus</button>
        </Link>

        <Link to="/admin/manage-athletes">
          <button>Halda sportlasi</button>
        </Link>
      </nav>

      <hr /> 


      <Routes>
        {/* Avalikud vaated */}
        <Route path="/" element={ <HomePage /> } />
        <Route path="/scores" element={ <TotalScores /> } />

        {/* Admini vaated */}
        <Route path="/admin/add-athlete" element={ <AddAthletes /> } />
        <Route path="/admin/add-result" element={ <AddResults /> } />
        <Route path="/admin/manage-athletes" element={ <ManageAthletes /> } />

      </Routes>
    </>
  )
}

export default App