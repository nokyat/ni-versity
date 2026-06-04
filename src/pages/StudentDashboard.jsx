import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseService } from '../services/courseService';
import { WalletService } from '../services/walletService';

const StudentDashboard = () => {
  const navigate = useNavigate();
  
  // Real App State
  const [courses, setCourses] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  // 1. Fetch Real Data on Load
  useEffect(() => {
    const fetchPlatformData = async () => {
      try {
        // Fetch real courses from our CourseService
        const liveCourses = await CourseService.getAllCourses();
        setCourses(liveCourses);
        
        // Fetch student's real balance from WalletService (using mock student ID 'u2')
        const balance = await WalletService.getBalance('u2');
        setWalletBalance(balance);
      } catch (error) {
        console.error("Error loading platform data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlatformData();
  }, []);

  // 2. Handle The Money Connection
  const handleEnroll = async (coursePrice) => {
    setStatusMessage('Processing secure transaction...');
    try {
      // Process enrollment (Student u2 pays Teacher u3)
      const receipt = await WalletService.processEnrollment('u2', 'u3', coursePrice);
      
      // Update the UI with new balance and success message
      setWalletBalance(receipt.newBalance);
      setStatusMessage('✅ ' + receipt.message);
      
      // Hide message after 3 seconds
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (error) {
      setStatusMessage('❌ Error: ' + error.message);
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  // Pagination Math
  const totalPages = Math.ceil(courses.length / coursesPerPage) || 1;
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginationButtonStyle = (disabled) => ({
    padding: '10px 20px',
    border: `1px solid ${disabled ? '#111' : '#2563EB'}`,
    borderRadius: '6px',
    backgroundColor: '#0A0A0A',
    color: disabled ? '#333' : '#FBFBFB',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: '"Avenir Next", sans-serif',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '12px'
  });

  return (
    <div style={{ padding: '40px', backgroundColor: '#000000', minHeight: '100vh', fontFamily: '"Avenir Next", sans-serif', color: '#FBFBFB' }}>
      
      {/* Header with Live Wallet Integration */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #111', paddingBottom: '20px' }}>
        <div>
            <h1 style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>🎓 Student Hub</h1>
            {/* Live Wallet Display */}
            <p style={{ margin: 0, color: '#10B981', fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px' }}>
                💳 WALLET: {isLoading ? '...' : walletBalance} Ni-Tokens
            </p>
        </div>
        <button 
          onClick={() => navigate('/login')}
          style={{ padding: '8px 16px', backgroundColor: 'transparent', color: '#ef4444', border: '1px solid #ef4444', borderRadius: '6px', cursor: 'pointer', fontFamily: '"Avenir Next", sans-serif', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}
        >
          Logout
        </button>
      </div>

      {/* Dynamic Status Message Pop-up */}
      {statusMessage && (
        <div style={{ padding: '15px', backgroundColor: '#0A0A0A', border: '1px solid #2563EB', color: '#FBFBFB', borderRadius: '8px', marginBottom: '30px', textAlign: 'center', fontWeight: 'bold' }}>
            {statusMessage}
        </div>
      )}

      {/* Live Course Grid */}
      {isLoading ? (
          <div style={{ textAlign: 'center', color: '#AAAAAA', padding: '50px' }}>Loading Live Catalog...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            {currentCourses.length === 0 && <p style={{ color: '#888' }}>No courses published yet.</p>}
            
            {currentCourses.map(course => (
            <div key={course.id} style={{ 
                backgroundColor: '#0A0A0A', padding: '25px', borderRadius: '12px', border: '1px solid #111', boxShadow: '0 0 10px rgba(37, 99, 235, 0.05)', transition: 'all 0.3s ease',
                ':hover': { boxShadow: '0 0 20px rgba(37, 99, 235, 0.2)', borderColor: '#2563EB' }
                }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#FBFBFB' }}>{course.title}</h3>
                <p style={{ margin: '0 0 15px 0', color: '#AAAAAA', fontSize: '14px' }}>👨‍🏫 {course.instructor}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                    <span style={{ fontWeight: 'bold', color: '#2563EB', fontSize: '18px' }}>${course.price} Ni</span>
                    <button 
                        onClick={() => handleEnroll(course.price)}
                        style={{ padding: '8px 16px', backgroundColor: '#2563EB', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontFamily: '"Avenir Next", sans-serif', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Enroll Now
                    </button>
                </div>
            </div>
            ))}
        </div>
      )}

      {/* Pagination Controls */}
      {!isLoading && currentCourses.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginTop: '50px' }}>
            <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={paginationButtonStyle(currentPage === 1)}
            >
            ◀ Prev
            </button>
            
            <span style={{ fontWeight: 'bold', color: '#AAAAAA', fontSize: '14px' }}>
            Page {currentPage} of {totalPages}
            </span>
            
            <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={paginationButtonStyle(currentPage === totalPages)}
            >
            Next ▶
            </button>
        </div>
      )}

    </div>
  );
};

export default StudentDashboard;
