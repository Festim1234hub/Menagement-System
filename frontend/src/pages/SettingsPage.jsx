import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import authService from '../services/authService';

const PREFS_KEY = 'orbitlane_prefs';

const defaultPrefs = {
  desktopNotifications: true,
  darkAccent: true,
  emailSummary: false,
};

function SettingsPage() {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState({ name: '', email: '', role: '' });
  const [prefs, setPrefs] = useState(() => {
    try {
      return { ...defaultPrefs, ...JSON.parse(localStorage.getItem(PREFS_KEY) || '{}') };
    } catch {
      return defaultPrefs;
    }
  });
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [profileMsg, setProfileMsg] = useState({ text: '', ok: false });
  const [pwMsg, setPwMsg] = useState({ text: '', ok: false });
  const [profileLoading, setProfileLoading] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'member',
      });
    }
  }, [user]);

  useEffect(() => {
    if (prefs.darkAccent) {
      document.body.classList.remove('accent-muted');
    } else {
      document.body.classList.add('accent-muted');
    }
  }, [prefs.darkAccent]);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMsg({ text: '', ok: false });
    try {
      const data = await authService.updateProfile(profile.name, profile.email);
      updateUser(data.user);
      setProfileMsg({ text: 'Profile saved successfully!', ok: true });
    } catch (err) {
      setProfileMsg({ text: err.message, ok: false });
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePrefChange = (key) => {
    const newVal = !prefs[key];
    const updated = { ...prefs, [key]: newVal };
    setPrefs(updated);
    localStorage.setItem(PREFS_KEY, JSON.stringify(updated));

    if (key === 'desktopNotifications' && newVal) {
      if ('Notification' in window && Notification.permission !== 'granted') {
        Notification.requestPermission();
      }
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.newPass !== passwords.confirm) {
      setPwMsg({ text: 'New passwords do not match!', ok: false });
      return;
    }
    if (passwords.newPass.length < 6) {
      setPwMsg({ text: 'New password must be at least 6 characters!', ok: false });
      return;
    }
    setPwLoading(true);
    setPwMsg({ text: '', ok: false });
    try {
      const data = await authService.changePassword(passwords.current, passwords.newPass);
      setPwMsg({ text: data.message || 'Password changed successfully!', ok: true });
      setPasswords({ current: '', newPass: '', confirm: '' });
    } catch (err) {
      setPwMsg({ text: err.message, ok: false });
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <section className="content-grid">
      <article className="card">
        <h2>User Profile</h2>
        <form onSubmit={handleProfileSave} className="form-grid">
          <label>
            Full Name
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              required
            />
          </label>
          <label>
            Role
            <input type="text" value={profile.role} readOnly style={{ opacity: 0.55, cursor: 'not-allowed' }} />
          </label>
          {profileMsg.text && (
            <p style={{ gridColumn: '1/-1', color: profileMsg.ok ? '#4ade80' : '#f87171', fontSize: '0.85rem', margin: 0 }}>
              {profileMsg.text}
            </p>
          )}
          <button type="submit" className="primary-btn" disabled={profileLoading} style={{ gridColumn: '1/-1' }}>
            {profileLoading ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </article>

      <article className="card">
        <h2>Workspace Preferences</h2>
        <div className="toggle-row">
          <div>
            <span>Desktop Notifications</span>
            <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: '#64748b' }}>
              Show OS-level pop-ups when tasks are created or updated (requires browser permission).
            </p>
          </div>
          <input
            type="checkbox"
            checked={prefs.desktopNotifications}
            onChange={() => handlePrefChange('desktopNotifications')}
          />
        </div>
        <div className="toggle-row">
          <div>
            <span>Vibrant Dashboard Accent</span>
            <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: '#64748b' }}>
              Use vivid indigo &amp; cyan accent colors across the UI. Turn off for a muted palette.
            </p>
          </div>
          <input
            type="checkbox"
            checked={prefs.darkAccent}
            onChange={() => handlePrefChange('darkAccent')}
          />
        </div>
        <div className="toggle-row">
          <div>
            <span>Daily Email Summary</span>
            <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: '#64748b' }}>
              Preference saved locally — email delivery not yet configured.
            </p>
          </div>
          <input
            type="checkbox"
            checked={prefs.emailSummary}
            onChange={() => handlePrefChange('emailSummary')}
          />
        </div>
        <p style={{ color: '#4ade80', fontSize: '0.82rem', marginTop: '0.9rem', margin: '0.9rem 0 0' }}>
          Preferences saved automatically to browser.
        </p>
      </article>

      <article className="card card-large">
        <h2>Security</h2>
        <p className="card-subtitle">Change your account password.</p>
        <form onSubmit={handlePasswordChange} className="form-grid">
          <label style={{ gridColumn: '1/-1' }}>
            Current Password
            <input
              type="password"
              value={passwords.current}
              onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              placeholder="Your current password"
              required
            />
          </label>
          <label>
            New Password
            <input
              type="password"
              value={passwords.newPass}
              onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
              placeholder="Min 6 characters"
              required
            />
          </label>
          <label>
            Confirm New Password
            <input
              type="password"
              value={passwords.confirm}
              onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              placeholder="Repeat new password"
              required
            />
          </label>
          {pwMsg.text && (
            <p style={{ gridColumn: '1/-1', color: pwMsg.ok ? '#4ade80' : '#f87171', fontSize: '0.85rem', margin: 0 }}>
              {pwMsg.text}
            </p>
          )}
          <button type="submit" className="primary-btn" disabled={pwLoading}>
            {pwLoading ? 'Changing...' : 'Change Password'}
          </button>
        </form>
      </article>
    </section>
  );
}

export default SettingsPage;
