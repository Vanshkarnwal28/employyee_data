import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, Sparkles, User, Trash2 } from 'lucide-react';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchEmployees = async (query = '') => {
    try {
      setLoading(true);
      const url = query 
        ? `https://perfanalytics-api.onrender.com/api/employees/search?department=${query}` 
        : 'https://perfanalytics-api.onrender.com/api/employees';
        
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setEmployees(res.data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEmployees(searchQuery);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`https://perfanalytics-api.onrender.com/api/employees/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setEmployees(employees.filter(emp => emp._id !== id));
      } catch (err) {
        console.error('Error deleting employee:', err);
      }
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Employee Directory</h1>
        
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }}>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search by department..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '250px' }}
          />
          <button type="submit" className="btn btn-secondary">
            <Search size={18} />
          </button>
          {searchQuery && (
            <button type="button" className="btn btn-secondary" onClick={() => { setSearchQuery(''); fetchEmployees(''); }}>
              Clear
            </button>
          )}
        </form>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading employees...</div>
      ) : employees.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <User size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
          <h3>No employees found</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', marginTop: '0.5rem' }}>Start by adding employees to your organization.</p>
          <Link to="/add-employee" className="btn btn-primary">Add Employee</Link>
        </div>
      ) : (
        <div className="glass-panel table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Experience</th>
                <th>Score</th>
                <th>Skills</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp._id}>
                  <td>
                    <div style={{ fontWeight: 500 }}>{emp.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{emp.email}</div>
                  </td>
                  <td>{emp.department}</td>
                  <td>{emp.experience} yrs</td>
                  <td>
                    <span style={{ 
                      color: emp.performanceScore >= 80 ? 'var(--success)' : emp.performanceScore >= 50 ? 'var(--warning)' : 'var(--danger)',
                      fontWeight: 600
                    }}>
                      {emp.performanceScore}/100
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '200px' }}>
                      {emp.skills.slice(0, 2).map((skill, i) => (
                        <span key={i} className="tag">{skill}</span>
                      ))}
                      {emp.skills.length > 2 && <span className="tag">+{emp.skills.length - 2}</span>}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link to={`/ai-recommendations/${emp._id}`} className="btn btn-primary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.875rem' }} title="Get AI Recommendations">
                        <Sparkles size={14} /> AI Insight
                      </Link>
                      <button onClick={() => handleDelete(emp._id)} className="btn btn-danger" style={{ padding: '0.4rem 0.75rem' }} title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
