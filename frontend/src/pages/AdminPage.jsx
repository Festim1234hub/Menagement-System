import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import adminService from '../services/adminService';

function AdminPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    adminService.getUsers()
      .then(setUsers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="content-grid single-column">
      <article className="card card-large">
        <h2>User Management</h2>
        <p className="card-subtitle">View all registered users and their roles.</p>

        {loading && <p className="empty-state">Loading users...</p>}
        {error && <p className="form-error">{error}</p>}

        {!loading && !error && (
          <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={u.id} className={u.id === user?.id ? 'row-self' : ''}>
                    <td>{i + 1}</td>
                    <td>
                      {u.name}
                      {u.id === user?.id && (
                        <span className="tag info" style={{ marginLeft: '0.5rem', fontSize: '0.7rem' }}>you</span>
                      )}
                    </td>
                    <td style={{ color: '#94a3b8' }}>{u.email}</td>
                    <td>
                      <span className={`tag ${u.role === 'admin' ? 'warning' : 'info'}`}>
                        {u.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </article>
    </section>
  );
}

export default AdminPage;
