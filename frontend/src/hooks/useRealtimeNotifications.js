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
    const streamUrl = import.meta.env.VITE_NOTIFICATION_STREAM_URL || "/api/notifications/stream";
    let intervalId;
    let eventSource;

    const push = (payload) => {
      setNotifications((prev) => [payload, ...prev].slice(0, 12));
    };

    const startFallback = () => {
      if (intervalId) return;
      intervalId = setInterval(() => {
        const template = notificationTemplates[Math.floor(Math.random() * notificationTemplates.length)];
        push({
          id: crypto.randomUUID(),
          type: template.type,
          text: template.text,
          createdAt: new Date().toISOString()
        });
      }, 5000);
    };

    try {
      eventSource = new EventSource(streamUrl);
      eventSource.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          push(parsed);
        } catch {
          // ignore malformed messages
        }
      };
      eventSource.onerror = () => {
        eventSource.close();
        startFallback();
      };
    } catch {
      startFallback();
    }

    return () => {
      if (eventSource) eventSource.close();
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return notifications;
}

export default useRealtimeNotifications;
