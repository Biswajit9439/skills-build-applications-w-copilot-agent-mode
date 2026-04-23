import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    setLoading(true);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Fetched teams:', results);
      })
      .catch(err => {
        console.error('Error fetching teams:', err);
        setTeams([]);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  return (
    <div className="container">
      {/* Page Header */}
      <div className="row mb-4">
        <div className="col">
          <h1 className="display-6 mb-2">👥 Teams</h1>
          <p className="text-muted">Manage and collaborate with teams</p>
        </div>
        <div className="col-auto d-flex align-items-center">
          <button className="btn btn-primary btn-lg">
            <i className="bi bi-plus-circle"></i> Create Team
          </button>
        </div>
      </div>

      {/* Teams Grid */}
      {!loading && teams.length > 0 && (
        <div className="row g-3 mb-4">
          {teams.slice(0, 4).map((team, idx) => (
            <div key={idx} className="col-md-6 col-lg-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    {team.name || team.team_name || 'Team #' + (idx + 1)}
                  </h5>
                  <p className="card-text text-muted small">
                    {team.description || 'No description'}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-primary fw-bold">
                      <i className="bi bi-person"></i> Members: {team.members_count || 0}
                    </small>
                  </div>
                </div>
                <div className="card-footer bg-white border-top">
                  <button className="btn btn-sm btn-outline-primary me-2">
                    <i className="bi bi-arrow-right"></i> View
                  </button>
                  <button className="btn btn-sm btn-outline-secondary">
                    <i className="bi bi-pencil"></i> Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Teams Table */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">All Teams</h5>
        </div>
        <div className="card-body">
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          
          {!loading && teams.length === 0 && (
            <div className="alert alert-info d-flex align-items-center" role="alert">
              <i className="bi bi-info-circle me-2"></i>
              <div>No teams found. Create your first team to get started!</div>
            </div>
          )}

          {!loading && teams.length > 0 && (
            <div className="table-responsive">
              <table className="table table-hover table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    {teams[0] && Object.keys(teams[0]).map((key) => (
                      <th key={key} className="text-center">
                        <strong>{key.toUpperCase()}</strong>
                      </th>
                    ))}
                    <th className="text-center"><strong>ACTIONS</strong></th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, idx) => (
                    <tr key={team.id || idx}>
                      {Object.values(team).map((val, i) => (
                        <td key={i} className="text-center">
                          {val?.toString() || '—'}
                        </td>
                      ))}
                      <td className="text-center">
                        <button className="btn btn-sm btn-outline-primary me-2" title="View">
                          <i className="bi bi-eye"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-secondary me-2" title="Edit">
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

export default Teams;
