# AI-Based Employee Performance Analytics & Recommendation System

## Overview
This is a full-stack MERN application developed for the AI Driven Full Stack Development exam. It features an aesthetic UI, secure authentication, and integrates with the OpenRouter AI API to generate employee performance insights, promotion recommendations, and training suggestions.

## Requirements Checklist
- [x] **Q1: Frontend** (React, Components, Forms, API Integration)
- [x] **Q2: Backend** (Node.js/Express, REST APIs, Validation, Error Handling)
- [x] **Q3: Database** (MongoDB CRUD, Schema, Filtering)
- [x] **Q4: MERN Integration** (Frontend, Backend, DB Communication)
- [x] **Q5: AI Integration** (OpenRouter API for promotion, ranking, training, feedback)
- [x] **Q6: Authentication** (JWT, bcrypt, Protected Routes)
- [x] **Q8: Deployment** (Configured for Render)

## Local Setup Instructions

### 1. Prerequisites
- Node.js installed
- MongoDB installed (or an Atlas URI)

### 2. Backend Setup
\`\`\`bash
cd backend
npm install
\`\`\`

Create a `.env` file in the `backend` directory:
\`\`\`env
PORT=5000
MONGO_URI=mongodb://localhost:27017/employee-analytics
JWT_SECRET=your_super_secret_jwt_key
OPENROUTER_API_KEY=your_openrouter_api_key
\`\`\`

Start the backend:
\`\`\`bash
npm start # or node server.js
\`\`\`

### 3. Frontend Setup
\`\`\`bash
cd frontend
npm install
\`\`\`

Start the frontend:
\`\`\`bash
npm run dev
\`\`\`

## Features
- **Authentication**: Secure Login/Signup with JWT.
- **Dashboard**: View, search, and delete employees.
- **Add Employee**: Create new employee profiles with skills and performance scores.
- **AI Insights**: Automatically analyze an employee's data to suggest promotions, provide rankings, and suggest training.

## Deployment on Render
1. Push this repository to GitHub.
2. Connect the repository to your Render account.
3. Render will automatically detect the `render.yaml` file (Blueprint deployment) and set up both the backend API and the static React frontend.
4. Ensure you set the `MONGO_URI`, `JWT_SECRET`, and `OPENROUTER_API_KEY` environment variables in the Render dashboard for the API service.
