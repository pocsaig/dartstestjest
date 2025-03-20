import { BrowserRouter as Router, NavLink, Routes, Route } from "react-router-dom";
import { DartsListPage } from "./DartsListPage";
import { DartsSinglePage } from "./DartsSinglePage";
import { DartsCreatePage } from "./DartsCreatePage";
import { DartsModPage } from "./DartsModPage";
import { DartsDelPage } from "./DartsDelPage";
import './App.css';

export const App=()=> {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={'/'} className={({isActive}) => "nav-link" + (isActive ? "active" : "")}>
                <span className="nav-link">Dartsozók</span>
              </NavLink>
              </li>
              <li className="nav-item">
              <NavLink to={'/new-Darts'} className={({isActive}) => "nav-link" + (isActive ? "active" : "")}>
                <span className="nav-link">Új Dartsozó</span>
              </NavLink>
              </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" exact element={<DartsListPage />} />
        <Route path="/Darts/:DartsId" exact element={<DartsSinglePage />} />
        <Route path="/new-Darts" exact element={<DartsCreatePage />} />
        <Route path="/mod-Darts/:DartsId" exact element={<DartsModPage />} />
        <Route path="/del-Darts/:DartsId" exact element={<DartsDelPage />} />
      </Routes>
    </Router>
  );
}