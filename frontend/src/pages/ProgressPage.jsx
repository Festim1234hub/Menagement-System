import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const weeklyProgressData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  datasets: [
    {
      label: "Completed Tasks",
      data: [4, 6, 5, 8, 7, 3],
      backgroundColor: "rgba(29, 185, 132, 0.8)",
      borderRadius: 8
    },
    {
      label: "Created Tasks",
      data: [7, 9, 6, 10, 8, 5],
      backgroundColor: "rgba(99, 102, 241, 0.85)",
      borderRadius: 8
    }
  ]
};

const completionRateData = {
  labels: ["Done", "In Progress", "Blocked"],
  datasets: [
    {
      data: [58, 32, 10],
      backgroundColor: ["#1db984", "#6366f1", "#f59e0b"],
      borderWidth: 0
    }
  ]
};

function ProgressPage() {
  return (
    <section className="content-grid">
      <article className="card card-weekly">
        <h2>Weekly Activity</h2>
        <p className="card-subtitle">Created vs completed tasks through the week.</p>
        <div className="chart-bar-wrap">
          <Bar
            data={weeklyProgressData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              layout: { padding: { top: 4, bottom: 0 } },
              plugins: {
                legend: {
                  position: "bottom",
                  labels: { boxWidth: 10, padding: 12, usePointStyle: true }
                }
              },
              scales: {
                x: {
                  grid: { display: false },
                  ticks: { maxRotation: 0, font: { size: 11 } }
                },
                y: {
                  beginAtZero: true,
                  suggestedMax: 12,
                  ticks: { stepSize: 2, precision: 0 },
                  grid: { color: "rgba(148, 163, 184, 0.12)" }
                }
              }
            }}
          />
        </div>
      </article>

      <article className="card">
        <h2>Completion Rate</h2>
        <p className="card-subtitle">Current status distribution for team tasks.</p>
        <div className="chart-small">
          <Doughnut
            data={completionRateData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "bottom" }
              }
            }}
          />
        </div>
      </article>

      <article className="card">
        <h2>Insights</h2>
        <ul className="insight-list">
          <li>Completion velocity increased by 12% this week.</li>
          <li>Most blocked tasks belong to API integration module.</li>
          <li>Thursday had the highest productivity spike.</li>
        </ul>
      </article>
    </section>
  );
}

export default ProgressPage;
