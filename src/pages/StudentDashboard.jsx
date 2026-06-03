import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock database of classes for Ni-versity
const DUMMY_COURSES = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  title: `Masterclass Module ${i + 1}`,
  instructor: i % 2 === 0 ? 'Lead Instructor' : 'Guest Lecturer',
  price: Math.floor(Math.random() * 50) + 10,
}));

const StudentDashboard = () => {
  const navigate = useNavigate();
  
  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;
  const totalPages = Math.ceil(DUMMY_COURSES.length / coursesPerPage);
  
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = DUMMY_COURSES.slice(indexOfFirstCourse, indexOfLastCourse);

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#f4f4f5', minHeight: '100vh' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ margin: 0, color: '#1f2937' }}>📚 Student Hub</h1>
        <button 
          onClick={() => navigate('/login')}
          style={{ padding: '8px 16px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Logout
        </button>
      </div>

      {/* Course Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        {currentCourses.map(course => (
          <div key={course.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#2563eb' }}>{course.title}</h3>
            <p style={{ margin: '0 0 5px 0', color: '#6b7280', fontSize: '14px' }}>👨‍🏫 {course.instructor}</p>
            <p style={{ margin: '0 0 15px 0', fontWeight: 'bold', color: '#10b981' }}>${course.price} Ni-Tokens</p>
            <button style={{ width: '100%', padding: '10px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
              Enroll Now
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px' }}>
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{ padding: '8px 16px', border: 'none', borderRadius: '6px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', backgroundColor: currentPage === 1 ? '#d1d5db' : '#1f2937', color: 'white' }}
        >
          ◀ Previous
        </button>
        
        <span style={{ fontWeight: 'bold', color: '#4b5563' }}>
          Page {currentPage} of {totalPages}
        </span>
        
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{ padding: '8px 16px', border: 'none', borderRadius: '6px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', backgroundColor: currentPage === totalPages ? '#d1d5db' : '#1f2937', color: 'white' }}
        >
          Next ▶
        </button>
      </div>

    </div>
  );
};

export default StudentDashboard;
