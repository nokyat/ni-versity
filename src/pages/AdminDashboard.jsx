import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [fee, setFee] = useState(10);
  
  // Master directory mock data
  const mockUsers = [
    { id: 'u1', name: 'Nokyat', role: 'Master Admin', status: 'System Active' },
    { id: 'u2', name: 'Student A', role: 'Student', status: 'Active' },
    { id: 'u3', name: 'Instructor B', role: 'Teacher', status: 'Pending Payout' }
  ];

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#f4f4f5', minHeight: '100vh' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ margin: 0, color: '#1f2937' }}>👑 Master Admin Command Center</h1>
        <button 
          onClick={() => navigate('/login')}
          style={{ padding: '8px 16px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          System Logout
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
        
        {/* Global Settings & Vault */}
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', height: 'fit-content' }}>
          <h2 style={{ marginTop: 0, color: '#8b5cf6' }}>Platform Vault</h2>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ margin: '0 0 5px 0', color: '#6b7280' }}>Total Revenue Collected</p>
            <h3 style={{ margin: 0, fontSize: '28px', color: '#10b981' }}>$1,250.00</h3>
          </div>
          
          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Platform Commission (%)</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="number" 
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                style={{ width: '70%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
              />
              <button style={{ padding: '10px 20px', backgroundColor: '#8b5cf6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                Save
              </button>
            </div>
          </div>
        </div>

        {/* User Directory */}
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h2 style={{ marginTop: 0, color: '#3b82f6' }}>Network Directory</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb', color: '#6b7280' }}>
                <th style={{ padding: '12px' }}>Name</th>
                <th style={{ padding: '12px' }}>Role</th>
                <th style={{ padding: '12px' }}>Status</th>
                <th style={{ padding: '12px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map(user => (
                <tr key={user.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{user.name}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ backgroundColor: user.role === 'Master Admin' ? '#f3e8ff' : '#e0f2fe', color: user.role === 'Master Admin' ? '#7e22ce' : '#0369a1', padding: '4px 8px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold' }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                     <span style={{ color: user.status === 'Pending Payout' ? '#d97706' : '#059669', fontSize: '14px' }}>
                        {user.status}
                     </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <button style={{ padding: '6px 12px', backgroundColor: '#1f2937', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
