import { useEffect, useState } from "react";

const notificationTemplates = [
  { type: "task-created", text: "New task created: Build RabbitMQ consumer" },
  { type: "task-updated", text: "Task updated: Dashboard API integration moved to QA" },
  { type: "task-assigned", text: "Task assigned: Set up health-check endpoint" }
];

function useRealtimeNotifications() {
  const [notifications, setNotifications] = useState([
    {
      id: "n-1",
      type: "task-created",
      text: "Initial notification stream connected.",
      createdAt: new Date().toISOString()
    }
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const template = notificationTemplates[Math.floor(Math.random() * notificationTemplates.length)];
      setNotifications((prev) => [
        {
          id: crypto.randomUUID(),
          type: template.type,
          text: template.text,
          createdAt: new Date().toISOString()
        },
        ...prev
      ].slice(0, 12));
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return notifications;
}

export default useRealtimeNotifications;
