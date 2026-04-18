function Header({ title, subtitle }) {
  return (
    <header className="page-header">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="status-pill">System healthy</div>
    </header>
  );
}

export default Header;
