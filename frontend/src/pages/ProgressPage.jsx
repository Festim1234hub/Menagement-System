import { useState, useEffect } from 'react';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import projectService from '../services/projectService';
import taskService from '../services/taskService';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

function ProgressPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const projects = await projectService.getAll();
        const allTasks = [];

        for (const p of projects) {
          const tasks = await taskService.getByProject(p.id);
          const arr = Array.isArray(tasks) ? tasks : [];
          arr.forEach((t) => allTasks.push({ ...t, projectName: p.name }));
        }

        const todo = allTasks.filter((t) => t.status === 'todo').length;
        const inProgress = allTasks.filter((t) => t.status === 'in_progress').length;
        const done = allTasks.filter((t) => t.status === 'done').length;

        const projectStats = projects.map((p) => ({
          name: p.name.length > 16 ? p.name.slice(0, 16) + '…' : p.name,
          todo: allTasks.filter((t) => t.project_id === p.id && t.status === 'todo').length,
          in_progress: allTasks.filter((t) => t.project_id === p.id && t.status === 'in_progress').length,
          done: allTasks.filter((t) => t.project_id === p.id && t.status === 'done').length,
        }));

        const highPending = allTasks.filter(
          (t) => t.priority === 'high' && t.status !== 'done'
        ).length;

        const mostPending = [...projectStats].sort(
          (a, b) => b.todo + b.in_progress - (a.todo + a.in_progress)
        )[0];

        setStats({ todo, inProgress, done, total: allTasks.length, projectStats, highPending, mostPending, allTasks });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p className="empty-state">Loading analytics...</p>;

  if (!stats || stats.total === 0) {
    return (
      <p className="empty-state">
        No tasks yet. Create projects and tasks to see analytics.
      </p>
    );
  }

  const completionRate = Math.round((stats.done / stats.total) * 100);

  const barData = {
    labels: stats.projectStats.map((p) => p.name),
    datasets: [
      {
        label: 'To Do',
        data: stats.projectStats.map((p) => p.todo),
        backgroundColor: 'rgba(148, 163, 184, 0.75)',
        borderRadius: 4,
      },
      {
        label: 'In Progress',
        data: stats.projectStats.map((p) => p.in_progress),
        backgroundColor: 'rgba(99, 102, 241, 0.85)',
        borderRadius: 4,
      },
      {
        label: 'Done',
        data: stats.projectStats.map((p) => p.done),
        backgroundColor: 'rgba(29, 185, 132, 0.8)',
        borderRadius: 4,
      },
    ],
  };

  const doughnutData = {
    labels: ['Done', 'In Progress', 'To Do'],
    datasets: [
      {
        data: [stats.done, stats.inProgress, stats.todo],
        backgroundColor: ['#1db984', '#6366f1', '#94a3b8'],
        borderWidth: 0,
      },
    ],
  };

  const insights = [];
  insights.push(`${completionRate}% of all tasks completed (${stats.done}/${stats.total}).`);
  if (stats.inProgress > 0)
    insights.push(`${stats.inProgress} task${stats.inProgress !== 1 ? 's' : ''} currently in progress.`);
  if (stats.highPending > 0)
    insights.push(`${stats.highPending} high-priority task${stats.highPending !== 1 ? 's' : ''} still pending.`);
  if (stats.mostPending && stats.mostPending.todo + stats.mostPending.in_progress > 0)
    insights.push(`"${stats.mostPending.name}" has the most pending work.`);
  if (stats.todo === 0 && stats.inProgress === 0)
    insights.push('All tasks completed — great work!');

  return (
    <section className="content-grid">
      <article className="card card-weekly">
        <h2>Tasks by Project</h2>
        <p className="card-subtitle">Status breakdown across all {stats.projectStats.length} project{stats.projectStats.length !== 1 ? 's' : ''}.</p>
        <div className="chart-bar-wrap">
          <Bar
            data={barData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'bottom', labels: { boxWidth: 10, padding: 12, usePointStyle: true } },
              },
              scales: {
                x: { stacked: true, grid: { display: false }, ticks: { maxRotation: 0, font: { size: 11 } } },
                y: {
                  stacked: true,
                  beginAtZero: true,
                  ticks: { precision: 0, stepSize: 1 },
                  grid: { color: 'rgba(148, 163, 184, 0.12)' },
                },
              },
            }}
          />
        </div>
      </article>

      <article className="card">
        <h2>Completion Rate</h2>
        <p className="card-subtitle">Overall status across {stats.total} task{stats.total !== 1 ? 's' : ''}.</p>
        <div className="chart-small">
          <Doughnut
            data={doughnutData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { position: 'bottom' } },
            }}
          />
        </div>
      </article>

      <article className="card">
        <h2>Insights</h2>
        <ul className="insight-list">
          {insights.map((text, i) => (
            <li key={i}>{text}</li>
          ))}
        </ul>
      </article>
    </section>
  );
}

export default ProgressPage;
