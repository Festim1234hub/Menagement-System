import { useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import useRealtimeNotifications from "./hooks/useRealtimeNotifications";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";
import NotificationsPage from "./pages/NotificationsPage";
import ProgressPage from "./pages/ProgressPage";
import SettingsPage from "./pages/SettingsPage";
import AdminPage from "./pages/AdminPage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const pageConfig = {
  dashboard: { title: "Dashboard", subtitle: "Overview of all your projects." },
  tasks: { title: "Tasks", subtitle: "Manage tasks within your project." },
  progress: { title: "Progress & Analytics", subtitle: "Monitor team output and track project momentum." },
  notifications: { title: "Notifications Center", subtitle: "Real-time stream for task events and updates." },
  settings: { title: "Settings & Profile", subtitle: "Control your personal preferences and account details." },
  admin: { title: "Admin Panel", subtitle: "Manage users and roles across the platform." },
};

function AppLayout() {
  const [activePage, setActivePage] = useState("dashboard");
  const [selectedProject, setSelectedProject] = useState(null);
  const currentPage = useMemo(() => pageConfig[activePage], [activePage]);
  const { notifications, clearNotifications } = useRealtimeNotifications();

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onChangePage={setActivePage} />
      <main className="main-panel">
        <Header title={currentPage.title} subtitle={currentPage.subtitle} />
        {activePage === "dashboard" && (
          <DashboardPage
            onSelectProject={(p) => {
              setSelectedProject(p);
              setActivePage("tasks");
            }}
          />
        )}
        {activePage === "tasks" && (
          <TasksPage project={selectedProject} onBack={() => setActivePage("dashboard")} />
        )}
        {activePage === "progress" && <ProgressPage />}
        {activePage === "notifications" && <NotificationsPage notifications={notifications} onClear={clearNotifications} />}
        {activePage === "settings" && <SettingsPage />}
        {activePage === "admin" && <AdminPage />}
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
