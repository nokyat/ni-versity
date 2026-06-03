import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  
  // State for the course builder form
  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState('');
  
  // Mock state for published courses
  const [publishedCourses, setPublishedCourses] = useState([
    { id: 1, title: 'Introduction to Vocal Mixing', price: 25, students: 12 },
    { id: 2, title: 'Advanced Guitar Chords', price: 40, students: 8 }
  ]);

  const handleUpload = (e) => {
    e.preventDefault();
    if (!courseTitle || !coursePrice) return;

    const newCourse = {
      id: Date.now(),
      title: courseTitle,
      price: Number(coursePrice),
      students: 0
    };

    setPublishedCourses([newCourse, ...publishedCourses]);
    setCourseTitle('');
    setCoursePrice('');
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#f4f4f5', minHeight: '100vh' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ margin: 0, color: '#1f2937' }}>👨‍🏫 Teacher Hub</h1>
        <button 
          onClick={() => navigate('/login')}
          style={{ padding: '8px 16px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Logout
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
        
        {/* Course Builder Form */}
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', height: 'fit-content' }}>
          <h2 style={{ marginTop: 0, color: '#10b981' }}>Upload New Course</h2>
          <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Course Title</label>
              <input 
                type="text" 
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                placeholder="e.g. Masterclass in Design"
                style={{ width: '90%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Price (Ni-Tokens)</label>
              <input 
                type="number" 
                value={coursePrice}
                onChange={(e) => setCoursePrice(e.target.value)}
                placeholder="e.g. 50"
                style={{ width: '90%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
              />
            </div>
            <button 
              type="submit"
              style={{ padding: '12px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}
            >
              🚀 Publish Course
            </button>
          </form>
        </div>

        {/* Analytics & Published Courses */}
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h2 style={{ marginTop: 0, color: '#3b82f6' }}>My Published Courses</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {publishedCourses.map(course => (
              <div key={course.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0' }}>{course.title}</h3>
                  <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>👥 {course.students} Students Enrolled</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#10b981' }}>${course.price} Ni-Tokens</p>
                  <p style={{ margin: 0, color: '#8b5cf6', fontSize: '14px', fontWeight: 'bold' }}>Revenue: ${course.price * course.students}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TeacherDashboard;
