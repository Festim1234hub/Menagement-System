import { useEffect, useState, useCallback } from 'react';

const PREFS_KEY = 'orbitlane_prefs';

function getDesktopPref() {
  try {
    const prefs = JSON.parse(localStorage.getItem(PREFS_KEY) || '{}');
    return prefs.desktopNotifications !== false;
  } catch {
    return true;
  }
}

function showDesktopNotification(text, type) {
  if (!getDesktopPref()) return;
  if (!('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;

  const title = type === 'task-created' ? 'Task Created' : 'Task Updated';
  new Notification(title, {
    body: text,
    icon: '/favicon.ico',
  });
}

function useRealtimeNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Request desktop notification permission on mount
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    let eventSource;
    let reconnectTimer;
    let alive = true;

    const push = (payload) => {
      setNotifications((prev) => [payload, ...prev].slice(0, 20));
      showDesktopNotification(payload.text, payload.type);
    };

    const connect = () => {
      if (!alive) return;

      eventSource = new EventSource('/api/notifications/stream');

      eventSource.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          if (parsed && parsed.text) {
            push({
              id: parsed.id || crypto.randomUUID(),
              type: parsed.type || 'task-updated',
              text: parsed.text,
              createdAt: parsed.createdAt || new Date().toISOString(),
            });
          }
        } catch {
          // ignore malformed
        }
      };

      eventSource.onerror = () => {
        eventSource.close();
        if (alive) {
          reconnectTimer = setTimeout(connect, 5000);
        }
      };
    };

    connect();

    return () => {
      alive = false;
      if (eventSource) eventSource.close();
      if (reconnectTimer) clearTimeout(reconnectTimer);
    };
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return { notifications, clearNotifications };
}

export default useRealtimeNotifications;
