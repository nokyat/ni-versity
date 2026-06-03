import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import ALL active pages!
import Login from './pages/Login.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import TeacherDashboard from './pages/TeacherDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Route */}
        <Route path="/login" element={<Login />} />

        {/* Platform Core Dashboards */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Fallback routing */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<div style={{ padding: 20 }}><h2>404 - Page Not Found</h2></div>} />
      </Routes>
    </Router>
  );
}

export default App;
