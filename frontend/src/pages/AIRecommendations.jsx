import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  Sparkles,
  ArrowLeft,
  TrendingUp,
  Award,
  BookOpen,
  MessageSquare,
  Activity,
  Brain,
  Target,
  Trophy,
  Flame,
  Users,
  Star,
} from 'lucide-react';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';

const COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981'];

const AIRecommendations = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAIInsights = async () => {
      try {
        const res = await axios.post(
          'https://perfanalytics-api.onrender.com/api/ai/recommend',
          { employeeId: id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        setData({
          ...res.data,

          performanceTrend: [
            { month: 'Jan', score: 68 },
            { month: 'Feb', score: 72 },
            { month: 'Mar', score: 78 },
            { month: 'Apr', score: 84 },
            { month: 'May', score: 91 },
            { month: 'Jun', score: 96 },
          ],

          skillData: [
            { skill: 'Leadership', value: 90 },
            { skill: 'Communication', value: 85 },
            { skill: 'Innovation', value: 80 },
            { skill: 'Teamwork', value: 95 },
            { skill: 'Efficiency', value: 88 },
            { skill: 'Problem Solving', value: 84 },
          ],

          pieData: [
            { name: 'Productivity', value: 40 },
            { name: 'Innovation', value: 25 },
            { name: 'Meetings', value: 15 },
            { name: 'Collaboration', value: 20 },
          ],

          weeklyData: [
            { day: 'Mon', value: 6 },
            { day: 'Tue', value: 8 },
            { day: 'Wed', value: 9 },
            { day: 'Thu', value: 7 },
            { day: 'Fri', value: 8 },
          ],
        });
      } catch (err) {
        setError(
          err.response?.data?.message ||
          'Failed to fetch AI recommendations'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAIInsights();
  }, [id]);

  if (loading) {
    return (
      <div className="loader-page">
        <div className="spinner"></div>
        <h2>AI is generating insights...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loader-page">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* HEADER */}
      <div className="header glass">
        <div className="header-left">
          <button
            className="back-btn"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft />
          </button>

          <div>
            <h1>
              <Sparkles size={30} />
              AI Performance Intelligence
            </h1>

            <p>Advanced employee analytics and predictive AI insights</p>
          </div>
        </div>

        <div className="live-badge">
          <Activity size={16} />
          LIVE ANALYSIS
        </div>
      </div>

      {/* TOP METRICS */}
      <div className="metrics-grid">
        <div className="metric-card glass">
          <TrendingUp color="#10b981" />
          <div>
            <h2>94%</h2>
            <p>Performance Score</p>
          </div>
        </div>

        <div className="metric-card glass">
          <Award color="#f59e0b" />
          <div>
            <h2>{data.employeeRanking}</h2>
            <p>Employee Ranking</p>
          </div>
        </div>

        <div className="metric-card glass">
          <Target color="#06b6d4" />
          <div>
            <h2>87%</h2>
            <p>Goal Completion</p>
          </div>
        </div>

        <div className="metric-card glass">
          <Flame color="#ef4444" />
          <div>
            <h2>High</h2>
            <p>Promotion Chance</p>
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="main-grid">
        {/* PERFORMANCE */}
        <div className="glass card large-card">
          <div className="card-header">
            <TrendingUp />
            <h3>Performance Trend</h3>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.performanceTrend}>
              <defs>
                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#333" />

              <XAxis dataKey="month" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="score"
                stroke="#8b5cf6"
                fillOpacity={1}
                fill="url(#color)"
                strokeWidth={4}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* RECOMMENDATION */}
        <div className="glass card">
          <div className="card-header">
            <Brain />
            <h3>Promotion Recommendation</h3>
          </div>

          <p className="text">{data.promotionRecommendation}</p>

          <div className="badges">
            <div className="badge green">
              <Trophy size={14} />
              Promotion Ready
            </div>

            <div className="badge purple">
              <Star size={14} />
              Leadership Potential
            </div>
          </div>
        </div>

        {/* RADAR */}
        <div className="glass card">
          <div className="card-header">
            <Users />
            <h3>Skill Analysis</h3>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={data.skillData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" stroke="#ddd" />
              <PolarRadiusAxis stroke="#888" />

              <Radar
                dataKey="value"
                stroke="#06b6d4"
                fill="#06b6d4"
                fillOpacity={0.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE */}
        <div className="glass card">
          <div className="card-header">
            <Activity />
            <h3>Work Distribution</h3>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.pieData}
                dataKey="value"
                outerRadius={100}
                label
              >
                {data.pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR */}
        <div className="glass card large-card">
          <div className="card-header">
            <TrendingUp />
            <h3>Weekly Productivity</h3>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="day" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />

              <Bar
                dataKey="value"
                fill="#f59e0b"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* TRAINING */}
        <div className="glass card">
          <div className="card-header">
            <BookOpen />
            <h3>Training Suggestions</h3>
          </div>

          <div className="training-list">
            {data.trainingSuggestions.map((item, index) => (
              <div key={index} className="training-item">
                <div className="number">{index + 1}</div>

                <div>
                  <h4>{item}</h4>

                  <p>
                    AI recommends this training to improve strategic and
                    leadership capabilities.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FEEDBACK */}
        <div className="glass card large-card">
          <div className="card-header">
            <MessageSquare />
            <h3>Executive AI Feedback</h3>
          </div>

          <p className="feedback">"{data.aiFeedback}"</p>
        </div>
      </div>

      {/* CSS */}
      <style>{`
        *{
          box-sizing:border-box;
        }

        body{
          margin:0;
        }

        .dashboard{
          min-height:100vh;
          padding:2rem;
          background:#0b1120;
          color:white;
        }

        .glass{
          background:rgba(255,255,255,0.05);
          border:1px solid rgba(255,255,255,0.08);
          backdrop-filter:blur(20px);
          box-shadow:0 8px 32px rgba(0,0,0,0.3);
        }

        .header{
          padding:1.5rem;
          border-radius:24px;
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:2rem;
        }

        .header-left{
          display:flex;
          gap:1rem;
          align-items:center;
        }

        .header-left h1{
          display:flex;
          align-items:center;
          gap:.7rem;
          margin:0;
        }

        .header-left p{
          margin-top:.4rem;
          color:#aaa;
        }

        .back-btn{
          width:50px;
          height:50px;
          border:none;
          border-radius:14px;
          background:rgba(255,255,255,0.08);
          color:white;
          cursor:pointer;
        }

        .live-badge{
          display:flex;
          align-items:center;
          gap:.5rem;
          padding:.8rem 1rem;
          border-radius:999px;
          background:rgba(16,185,129,0.15);
          color:#34d399;
          font-weight:600;
        }

        .metrics-grid{
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
          gap:1.5rem;
          margin-bottom:2rem;
        }

        .metric-card{
          padding:1.5rem;
          border-radius:24px;
          display:flex;
          gap:1rem;
          align-items:center;
          transition:.3s;
        }

        .metric-card:hover{
          transform:translateY(-5px);
        }

        .metric-card h2{
          margin:0;
          font-size:2rem;
        }

        .metric-card p{
          margin:0;
          color:#aaa;
        }

        .main-grid{
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(400px,1fr));
          gap:1.5rem;
        }

        .card{
          border-radius:24px;
          padding:1.5rem;
        }

        .large-card{
          grid-column:span 2;
        }

        .card-header{
          display:flex;
          align-items:center;
          gap:.7rem;
          margin-bottom:1rem;
        }

        .text{
          line-height:1.8;
          color:#ddd;
        }

        .badges{
          display:flex;
          gap:1rem;
          margin-top:1.5rem;
          flex-wrap:wrap;
        }

        .badge{
          display:flex;
          align-items:center;
          gap:.5rem;
          padding:.7rem 1rem;
          border-radius:999px;
          font-size:.9rem;
          font-weight:600;
        }

        .green{
          background:rgba(16,185,129,.15);
          color:#34d399;
        }

        .purple{
          background:rgba(139,92,246,.15);
          color:#a78bfa;
        }

        .training-list{
          display:flex;
          flex-direction:column;
          gap:1rem;
        }

        .training-item{
          display:flex;
          gap:1rem;
          padding:1rem;
          border-radius:18px;
          background:rgba(255,255,255,.04);
        }

        .number{
          width:40px;
          height:40px;
          border-radius:12px;
          background:linear-gradient(135deg,#6366f1,#8b5cf6);
          display:flex;
          align-items:center;
          justify-content:center;
          font-weight:bold;
        }

        .training-item h4{
          margin:0 0 .4rem 0;
        }

        .training-item p{
          margin:0;
          color:#aaa;
          line-height:1.6;
        }

        .feedback{
          line-height:2;
          color:#ddd;
          font-style:italic;
        }

        .loader-page{
          min-height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          flex-direction:column;
          background:#0b1120;
          color:white;
        }

        .spinner{
          width:80px;
          height:80px;
          border:6px solid rgba(255,255,255,.1);
          border-top:6px solid #8b5cf6;
          border-radius:50%;
          animation:spin 1s linear infinite;
          margin-bottom:1rem;
        }

        @keyframes spin{
          100%{
            transform:rotate(360deg);
          }
        }

        @media(max-width:1000px){
          .large-card{
            grid-column:span 1;
          }
        }

        @media(max-width:768px){
          .dashboard{
            padding:1rem;
          }

          .main-grid{
            grid-template-columns:1fr;
          }

          .header{
            flex-direction:column;
            gap:1rem;
            align-items:flex-start;
          }

          .header-left h1{
            font-size:1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AIRecommendations;