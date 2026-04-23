import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    setLoading(true);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Fetched activities:', results);
      })
      .catch(err => {
        console.error('Error fetching activities:', err);
        setActivities([]);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  return (
    <div className="container">
      {/* Page Header */}
      <div className="row mb-4">
        <div className="col">
          <h1 className="display-6 mb-2">📊 Activities</h1>
          <p className="text-muted">Track and manage all fitness activities</p>
        </div>
        <div className="col-auto d-flex align-items-center">
          <button className="btn btn-primary btn-lg">
            <i className="bi bi-plus-circle"></i> New Activity
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card h-100">
            <div className="card-body text-center">
              <h5 className="card-title text-muted small">Total Activities</h5>
              <h2 className="text-primary fw-bold">{activities.length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card h-100">
            <div className="card-body text-center">
              <h5 className="card-title text-muted small">This Week</h5>
              <h2 className="text-success fw-bold">0</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card h-100">
            <div className="card-body text-center">
              <h5 className="card-title text-muted small">This Month</h5>
              <h2 className="text-info fw-bold">0</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card h-100">
            <div className="card-body text-center">
              <h5 className="card-title text-muted small">Avg Per Day</h5>
              <h2 className="text-warning fw-bold">0</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Activities Table */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Recent Activities</h5>
        </div>
        <div className="card-body">
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          
          {!loading && activities.length === 0 && (
            <div className="alert alert-info d-flex align-items-center" role="alert">
              <i className="bi bi-info-circle me-2"></i>
              <div>No activities found. Start by logging your first activity!</div>
            </div>
          )}

          {!loading && activities.length > 0 && (
            <div className="table-responsive">
              <table className="table table-hover table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    {activities[0] && Object.keys(activities[0]).map((key) => (
                      <th key={key} className="text-center">
                        <strong>{key.toUpperCase()}</strong>
                      </th>
                    ))}
                    <th className="text-center"><strong>ACTIONS</strong></th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, idx) => (
                    <tr key={activity.id || idx}>
                      {Object.values(activity).map((val, i) => (
                        <td key={i} className="text-center">
                          {val?.toString() || '—'}
                        </td>
                      ))}
                      <td className="text-center">
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

export default Activities;
