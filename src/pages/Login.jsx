import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'sans-serif', backgroundColor: '#f4f4f5' }}>
      
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'center' }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '28px' }}>Ni-versity</h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>Select your portal to continue</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <button 
            onClick={() => navigate('/student')}
            style={{ padding: '12px 24px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}
          >
            🎓 Enter Student Dashboard
          </button>
          
          <button 
            onClick={() => navigate('/teacher')}
            style={{ padding: '12px 24px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}
          >
            👨‍🏫 Enter Teacher Hub
          </button>
          
          <button 
            onClick={() => navigate('/admin')}
            style={{ padding: '12px 24px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#1f2937', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}
          >
            👑 Enter Master Admin
          </button>
        </div>
      </div>

    </div>
  );
};

export default Login;
