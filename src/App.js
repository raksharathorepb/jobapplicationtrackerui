import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/source/Navbar";
import AddJob from "./components/applications/Add";
import Applications from "./components/applications/List";
import { ToastContainer } from "react-toastify";
import Footer from "./components/source/Footer";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Navigate to="/applications" />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/add" element={<AddJob />} />
          <Route path="/edit/:id" element={<AddJob />} />

        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
