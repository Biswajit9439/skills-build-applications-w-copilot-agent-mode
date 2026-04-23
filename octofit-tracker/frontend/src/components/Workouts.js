import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    setLoading(true);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Fetched workouts:', results);
      })
      .catch(err => {
        console.error('Error fetching workouts:', err);
        setWorkouts([]);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  return (
    <div className="container">
      {/* Page Header */}
      <div className="row mb-4">
        <div className="col">
          <h1 className="display-6 mb-2">💪 Workouts</h1>
          <p className="text-muted">View and manage personalized workouts</p>
        </div>
        <div className="col-auto d-flex align-items-center">
          <button className="btn btn-primary btn-lg">
            <i className="bi bi-plus-circle"></i> New Workout
          </button>
        </div>
      </div>

      {/* Workout Statistics */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title text-muted small">Total Workouts</h5>
              <h2 className="text-primary fw-bold">{workouts.length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title text-muted small">Completed</h5>
              <h2 className="text-success fw-bold">0</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title text-muted small">In Progress</h5>
              <h2 className="text-warning fw-bold">0</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title text-muted small">Avg Duration</h5>
              <h2 className="text-info fw-bold">0 min</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Workouts Table */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">All Workouts</h5>
        </div>
        <div className="card-body">
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          
          {!loading && workouts.length === 0 && (
            <div className="alert alert-info d-flex align-items-center" role="alert">
              <i className="bi bi-info-circle me-2"></i>
              <div>No workouts found. Create a workout plan to get started!</div>
            </div>
          )}

          {!loading && workouts.length > 0 && (
            <div className="table-responsive">
              <table className="table table-hover table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    {workouts[0] && Object.keys(workouts[0]).map((key) => (
                      <th key={key} className="text-center">
                        <strong>{key.toUpperCase()}</strong>
                      </th>
                    ))}
                    <th className="text-center"><strong>ACTIONS</strong></th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout, idx) => (
                    <tr key={workout.id || idx}>
                      {Object.values(workout).map((val, i) => (
                        <td key={i} className="text-center">
                          {val?.toString() || '—'}
                        </td>
                      ))}
                      <td className="text-center">
                        <button className="btn btn-sm btn-outline-success me-2" title="Start">
                          <i className="bi bi-play-fill"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-primary me-2" title="Edit">
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-danger" title="Delete">
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Workouts;
