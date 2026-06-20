import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Candidate from "./pages/Candidate.jsx";
import RecruiterList from "./pages/RecruiterList.jsx";
import RecruiterDetail from "./pages/RecruiterDetail.jsx";
import "./styles.css";

function Shell({ children }) {
  return (
    <div className="app">
      <header className="topbar">
        <strong>BPO Agent Screening</strong>
        <nav>
          <Link to="/screen">Candidate</Link>
          <Link to="/recruiter">Recruiter</Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route path="/" element={<Navigate to="/recruiter" />} />
          <Route path="/screen" element={<Candidate />} />
          <Route path="/recruiter" element={<RecruiterList />} />
          <Route path="/recruiter/:id" element={<RecruiterDetail />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  </React.StrictMode>
);
