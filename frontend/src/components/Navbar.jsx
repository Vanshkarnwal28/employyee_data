import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Activity, Users, PlusCircle, LogOut, LogIn } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <Activity color="#6366f1" size={28} />
        <span>PerfAnalytics AI</span>
      </Link>
      
      <div className="nav-links">
        {token ? (
          <>
            <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
              <Users size={18} style={{display: 'inline', marginRight: '5px'}}/> Employees
            </Link>
            <Link to="/add-employee" className={`nav-link ${isActive('/add-employee')}`}>
              <PlusCircle size={18} style={{display: 'inline', marginRight: '5px'}}/> Add New
            </Link>
            <button onClick={handleLogout} className="btn btn-secondary" style={{padding: '0.5rem 1rem'}}>
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-secondary" style={{padding: '0.5rem 1rem'}}>
              <LogIn size={16} /> Login
            </Link>
            <Link to="/signup" className="btn btn-primary" style={{padding: '0.5rem 1rem'}}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
