function SettingsPage() {
  return (
    <section className="content-grid">
      <article className="card">
        <h2>User Profile</h2>
        <div className="form-grid">
          <label>
            Full Name
            <input type="text" defaultValue="Persona 3 - Student Dev" />
          </label>
          <label>
            Email
            <input type="email" defaultValue="persona3@university.edu" />
          </label>
          <label>
            Role
            <input type="text" defaultValue="Frontend & Monitoring" />
          </label>
          <label>
            Preferred Language
            <select defaultValue="sq">
              <option value="sq">Shqip</option>
              <option value="en">English</option>
            </select>
          </label>
        </div>
      </article>

      <article className="card">
        <h2>Workspace Preferences</h2>
        <div className="toggle-row">
          <span>Enable Desktop Notifications</span>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="toggle-row">
          <span>Dark Dashboard Accent</span>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="toggle-row">
          <span>Email Summary Every Day</span>
          <input type="checkbox" />
        </div>
      </article>

      <article className="card card-large">
        <h2>Security</h2>
        <p className="card-subtitle">Manage login and account protection.</p>
        <div className="form-grid">
          <label>
            Current Password
            <input type="password" placeholder="********" />
          </label>
          <label>
            New Password
            <input type="password" placeholder="Create new password" />
          </label>
        </div>
        <button className="primary-btn" type="button">
          Save Changes
        </button>
      </article>
    </section>
  );
}

export default SettingsPage;
