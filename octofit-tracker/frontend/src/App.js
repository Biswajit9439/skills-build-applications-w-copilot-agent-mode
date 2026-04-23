import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <Router className="App">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/">
            🐙 Octofit Tracker
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/activities">
                  <i className="bi bi-activity"></i> Activities
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">
                  <i className="bi bi-award"></i> Leaderboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">
                  <i className="bi bi-people"></i> Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  <i className="bi bi-person"></i> Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">
                  <i className="bi bi-graph-up"></i> Workouts
                </Link>
              </li>
            </ul>
            <div className="navbar-text ms-auto">
              <a 
                className="btn btn-outline-light btn-sm ms-2" 
                href="https://react.dev/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                📚 React Docs
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="App">
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          
          {/* Home Page */}
          <Route path="/" element={
            <div className="container">
              <div className="card welcome-card">
                <div className="card-body">
                  <h2 className="display-5 mb-3 text-white">Welcome to Octofit Tracker! 💪</h2>
                  <p className="lead mb-4">
                    Track your fitness activities, join teams, and compete on the leaderboard. 
                    Start your fitness journey today!
                  </p>
                  <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <Link className="btn btn-light btn-lg fw-bold" to="/activities">
                      Get Started →
                    </Link>
                    <a 
                      className="btn btn-outline-light btn-lg fw-bold" 
                      href="#about"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>

              {/* Features Section */}
              <div className="row g-4 my-5">
                <div className="col-md-6 col-lg-3">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <div className="mb-3" style={{ fontSize: '2rem' }}>📊</div>
                      <h5 className="card-title">Track Activities</h5>
                      <p className="card-text small">Log and track your workout activities with detailed metrics.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <div className="mb-3" style={{ fontSize: '2rem' }}>👥</div>
                      <h5 className="card-title">Join Teams</h5>
                      <p className="card-text small">Form teams and collaborate with fellow fitness enthusiasts.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <div className="mb-3" style={{ fontSize: '2rem' }}>🏆</div>
                      <h5 className="card-title">Leaderboard</h5>
                      <p className="card-text small">Compete and see where you rank on the global leaderboard.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <div className="mb-3" style={{ fontSize: '2rem' }}>💡</div>
                      <h5 className="card-title">Suggestions</h5>
                      <p className="card-text small">Get personalized workout suggestions based on your activity.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4 mt-5">
        <div className="container">
          <p className="mb-0">
            © 2024 Octofit Tracker. Built with <span style={{ color: '#ff6b6b' }}>❤</span> using React & Bootstrap.
          </p>
        </div>
      </footer>
    </Router>
  );
}

export default App;
