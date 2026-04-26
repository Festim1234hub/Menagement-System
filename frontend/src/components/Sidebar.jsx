import BrandLogo from "./BrandLogo";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "🏠" },
  { id: "progress", label: "Progress & Analytics", icon: "📊" },
  { id: "notifications", label: "Notifications", icon: "🔔" },
  { id: "settings", label: "Settings & Profile", icon: "⚙️" }
];

function Sidebar({ activePage, onChangePage }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <BrandLogo />
        <div>
          <p className="brand-title">Orbitlane</p>
          <p className="brand-subtitle">Your launchpad for tasks &amp; teams</p>
        </div>
      </div>

      <nav className="nav-list">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`nav-item ${activePage === item.id ? "active" : ""}`}
            onClick={() => onChangePage(item.id)}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
