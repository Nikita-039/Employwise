import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Users from "./pages/Users";

function App() {
  return (
    <div className="container mt-4">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
