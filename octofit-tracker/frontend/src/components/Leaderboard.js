import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    setLoading(true);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaders(results);
        console.log('Fetched leaderboard:', results);
      })
      .catch(err => {
        console.error('Error fetching leaderboard:', err);
        setLeaders([]);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  const getMedalEmoji = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '•';
  };

  return (
    <div className="container">
      {/* Page Header */}
      <div className="row align-items-center mb-4">
        <div className="col">
          <h1 className="display-6 mb-2">🏆 Leaderboard</h1>
          <p className="text-muted">Top performers and rankings</p>
        </div>
      </div>

      {/* Top Performers Cards */}
      {!loading && leaders.length > 0 && (
        <div className="row g-3 mb-4">
          {leaders.slice(0, 3).map((leader, idx) => (
            <div key={idx} className="col-md-4">
              <div className="card h-100 border-0">
                <div className="card-body text-center">
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                    {getMedalEmoji(idx + 1)}
                  </div>
                  <h5 className="card-title">
                    {leader.name || leader.username || 'User #' + (idx + 1)}
                  </h5>
                  <p className="card-text text-muted mb-0">
                    <strong className="text-primary d-block" style={{ fontSize: '1.5rem' }}>
                      {leader.score || leader.points || 0}
                    </strong>
                    <small>Points</small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full Leaderboard Table */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Full Rankings</h5>
        </div>
        <div className="card-body">
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          
          {!loading && leaders.length === 0 && (
            <div className="alert alert-info d-flex align-items-center" role="alert">
              <i className="bi bi-info-circle me-2"></i>
              <div>No leaderboard data available yet.</div>
            </div>
          )}

          {!loading && leaders.length > 0 && (
            <div className="table-responsive">
              <table className="table table-hover table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th className="text-center"><strong>RANK</strong></th>
                    {leaders[0] && Object.keys(leaders[0]).map((key) => (
                      key !== 'id' && (
                        <th key={key} className="text-center">
                          <strong>{key.toUpperCase()}</strong>
                        </th>
                      )
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leaders.map((leader, idx) => (
                    <tr key={leader.id || idx} className={idx < 3 ? 'table-highlight' : ''}>
                      <td className="text-center fw-bold">
                        {getMedalEmoji(idx + 1)} #{idx + 1}
                      </td>
                      {Object.entries(leader).map(([key, val]) => (
                        key !== 'id' && (
                          <td key={key} className="text-center">
                            {val?.toString() || '—'}
                          </td>
                        )
                      ))}
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

export default Leaderboard;
