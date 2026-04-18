import useRealtimeNotifications from "../hooks/useRealtimeNotifications";

const getTagClass = (type) => {
  if (type === "task-created") return "tag success";
  if (type === "task-updated") return "tag info";
  return "tag warning";
};

function NotificationsPage() {
  const notifications = useRealtimeNotifications();

  return (
    <section className="content-grid single-column">
      <article className="card card-large">
        <h2>Live Notifications</h2>
        <p className="card-subtitle">
          Stream i njoftimeve për krijim dhe ndryshim detyrash (simulim realtime).
        </p>

        <div className="notification-list">
          {notifications.map((item) => (
            <div className="notification-item" key={item.id}>
              <span className={getTagClass(item.type)}>{item.type}</span>
              <div>
                <p>{item.text}</p>
                <small>{new Date(item.createdAt).toLocaleTimeString()}</small>
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

export default NotificationsPage;
