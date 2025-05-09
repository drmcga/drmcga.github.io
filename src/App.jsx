import React from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ImageComparison from "./components/ImageComparison";
import AdminPage from "./components/AdminPage";
import LoginPage from "./components/LoginPage";
import Sobre from "./components/Sobre";
import ComoUsar from "./components/Comousar";


import Navbar from "./components/navbar";


function App() {
  return (
    <main>
      <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<ImageComparison />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/comousar" element={<ComoUsar />} />

      </Routes>
    </Router>
    </main>
    
  );
}

export default App;