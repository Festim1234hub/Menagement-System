const getTagClass = (type) => {
  if (type === 'task-created') return 'tag success';
  if (type === 'task-updated') return 'tag info';
  return 'tag warning';
};

function NotificationsPage({ notifications, onClear }) {
  return (
    <section className="content-grid single-column">
      <article className="card card-large">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
          <h2 style={{ margin: 0 }}>Live Notifications</h2>
          {notifications.length > 0 && (
            <button className="btn-secondary" onClick={onClear}>
              Clear all
            </button>
          )}
        </div>
        <p className="card-subtitle">
          Notifications appear when a task is created or updated.
        </p>

        <div className="notification-list">
          {notifications.length === 0 ? (
            <p className="empty-state">
              No notifications yet — go to Tasks and create or update a task.
            </p>
          ) : (
            notifications.map((item) => (
              <div className="notification-item" key={item.id}>
                <span className={getTagClass(item.type)}>{item.type}</span>
                <div>
                  <p>{item.text}</p>
                  <small>{new Date(item.createdAt).toLocaleTimeString()}</small>
                </div>
              </div>
            ))
          )}
        </div>
      </article>
    </section>
  );
}

export default NotificationsPage;
