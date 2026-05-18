import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Sparkles, ArrowLeft, TrendingUp, Award, BookOpen, MessageSquare } from 'lucide-react';

const AIRecommendations = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAIInsights = async () => {
      try {
        const res = await axios.post('http://localhost:5001/api/ai/recommend', 
          { employeeId: id },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        setData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch AI recommendations');
      } finally {
        setLoading(false);
      }
    };

    fetchAIInsights();
  }, [id]);

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={() => navigate('/dashboard')} className="btn btn-secondary" style={{ padding: '0.5rem' }}>
            <ArrowLeft size={20} />
          </button>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: 0 }}>
            <Sparkles color="#6366f1" /> AI Insights
          </h1>
        </div>
      </div>

      {loading ? (
        <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', animation: 'spin 2s linear infinite' }}>
            <Sparkles size={48} color="#6366f1" />
          </div>
          <h3 style={{ marginTop: '1.5rem' }}>AI is analyzing employee data...</h3>
          <p style={{ color: 'var(--text-muted)' }}>This might take a few seconds.</p>
        </div>
      ) : error ? (
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', color: '#ef4444' }}>
          <h3>Error Generating Insights</h3>
          <p>{error}</p>
        </div>
      ) : data ? (
        <div className="grid">
          <div className="card glass-panel" style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <TrendingUp color="#10b981" />
              <h3 className="card-title" style={{ margin: 0 }}>Promotion Recommendation</h3>
            </div>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>{data.promotionRecommendation}</p>
          </div>

          <div className="card glass-panel">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Award color="#f59e0b" />
              <h3 className="card-title" style={{ margin: 0 }}>Employee Ranking</h3>
            </div>
            <div style={{ 
              display: 'inline-block', 
              padding: '0.5rem 1rem', 
              background: 'rgba(245, 158, 11, 0.2)', 
              color: '#fcd34d', 
              borderRadius: '0.5rem', 
              fontWeight: 600,
              fontSize: '1.2rem'
            }}>
              {data.employeeRanking}
            </div>
          </div>

          <div className="card glass-panel">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <BookOpen color="#3b82f6" />
              <h3 className="card-title" style={{ margin: 0 }}>Training Suggestions</h3>
            </div>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-color)', lineHeight: 1.8 }}>
              {data.trainingSuggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>

          <div className="card glass-panel" style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <MessageSquare color="#a855f7" />
              <h3 className="card-title" style={{ margin: 0 }}>AI Feedback</h3>
            </div>
            <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', lineHeight: 1.6, borderLeft: '4px solid #a855f7', paddingLeft: '1rem' }}>
              "{data.aiFeedback}"
            </p>
          </div>
        </div>
      ) : null}
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
    </div>
  );
};

export default AIRecommendations;
