import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    setLoading(true);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Fetched users:', results);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setUsers([]);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  return (
    <div className="container">
      {/* Page Header */}
      <div className="row mb-4">
        <div className="col">
          <h1 className="display-6 mb-2">👤 Users</h1>
          <p className="text-muted">View and manage user accounts</p>
        </div>
        <div className="col-auto d-flex align-items-center">
          <button className="btn btn-primary btn-lg">
            <i className="bi bi-plus-circle"></i> Add User
          </button>
        </div>
      </div>

      {/* User Statistics */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title text-muted small">Total Users</h5>
              <h2 className="text-primary fw-bold">{users.length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title text-muted small">Active Users</h5>
              <h2 className="text-success fw-bold">{users.filter(u => u.is_active).length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title text-muted small">Avg Activity</h5>
              <h2 className="text-warning fw-bold">0</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">User Directory</h5>
        </div>
        <div className="card-body">
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          
          {!loading && users.length === 0 && (
            <div className="alert alert-info d-flex align-items-center" role="alert">
              <i className="bi bi-info-circle me-2"></i>
              <div>No users found.</div>
            </div>
          )}

          {!loading && users.length > 0 && (
            <div className="table-responsive">
              <table className="table table-hover table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    {users[0] && Object.keys(users[0]).map((key) => (
                      <th key={key} className="text-center">
                        <strong>{key.toUpperCase()}</strong>
                      </th>
                    ))}
                    <th className="text-center"><strong>ACTIONS</strong></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, idx) => (
                    <tr key={user.id || idx}>
                      {Object.values(user).map((val, i) => (
                        <td key={i} className="text-center">
                          {typeof val === 'boolean' ? (
                            <span className={val ? 'badge bg-success' : 'badge bg-danger'}>
                              {val ? 'Yes' : 'No'}
                            </span>
                          ) : (
                            val?.toString() || '—'
                          )}
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

export default Users;
