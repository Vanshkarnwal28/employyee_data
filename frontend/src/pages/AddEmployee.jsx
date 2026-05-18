import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Save } from 'lucide-react';

const AddEmployee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    skills: '',
    performanceScore: '',
    experience: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Convert skills string to array
      const payload = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
        performanceScore: Number(formData.performanceScore),
        experience: Number(formData.experience)
      };

      await axios.post('https://perfanalytics-api.onrender.com/api/employees', payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding employee. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="page-header">
        <h1 className="page-title">Add New Employee</h1>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" name="name" className="form-input" required value={formData.name} onChange={handleChange} placeholder="Jane Doe" />
            </div>
            
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" name="email" className="form-input" required value={formData.email} onChange={handleChange} placeholder="jane@company.com" />
            </div>
            
            <div className="form-group">
              <label className="form-label">Department</label>
              <select name="department" className="form-input" required value={formData.department} onChange={handleChange}>
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR</option>
                <option value="Design">Design</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Years of Experience</label>
              <input type="number" name="experience" className="form-input" required min="0" step="0.5" value={formData.experience} onChange={handleChange} placeholder="e.g. 3.5" />
            </div>
          </div>
          
          <div className="form-group" style={{ marginTop: '1.5rem' }}>
            <label className="form-label">Skills (Comma separated)</label>
            <input type="text" name="skills" className="form-input" required value={formData.skills} onChange={handleChange} placeholder="React, Node.js, MongoDB" />
          </div>
          
          <div className="form-group">
            <label className="form-label">Performance Score (0-100)</label>
            <input type="number" name="performanceScore" className="form-input" required min="0" max="100" value={formData.performanceScore} onChange={handleChange} placeholder="85" />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/dashboard')}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : <><Save size={18} /> Save Employee</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
