import useAuth from '../hooks/useAuth';

function Header({ title, subtitle }) {
  const { user, logout } = useAuth();

  return (
    <header className="page-header">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="header-right">
        <div className="status-pill">System healthy</div>
        {user && (
          <div className="user-menu">
            {user.role === 'admin' && <span className="badge-admin">Admin</span>}
            <span className="user-name">{user.name || user.email}</span>
            <button className="btn-logout" onClick={logout}>Log out</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
