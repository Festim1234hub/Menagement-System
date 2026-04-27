import { useMemo, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";
import NotificationsPage from "./pages/NotificationsPage";
import ProgressPage from "./pages/ProgressPage";
import SettingsPage from "./pages/SettingsPage";

const pageConfig = {
  dashboard: {
    title: "Dashboard",
    subtitle: "Overview of all your projects."
  },
  tasks: {
    title: "Tasks",
    subtitle: "Manage tasks within your project."
  },
  progress: {
    title: "Progress & Analytics",
    subtitle: "Monitor team output and track project momentum."
  },
  notifications: {
    title: "Notifications Center",
    subtitle: "Real-time stream for task events and updates."
  },
  settings: {
    title: "Settings & Profile",
    subtitle: "Control your personal preferences and account details."
  }
};

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [selectedProject, setSelectedProject] = useState(null);
  const currentPage = useMemo(() => pageConfig[activePage], [activePage]);

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onChangePage={setActivePage} />
      <main className="main-panel">
        <Header title={currentPage.title} subtitle={currentPage.subtitle} />
        {activePage === "dashboard" && (
          <DashboardPage onSelectProject={(p) => { setSelectedProject(p); setActivePage("tasks"); }} />
        )}
        {activePage === "tasks" && (
          <TasksPage project={selectedProject} onBack={() => setActivePage("dashboard")} />
        )}
        {activePage === "progress" && <ProgressPage />}
        {activePage === "notifications" && <NotificationsPage />}
        {activePage === "settings" && <SettingsPage />}
      </main>
    </div>
  );
}

export default App;
