require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

const taskRoutes = require('./routes/taskRoutes');
const { connectRabbitMQ, isRabbitHealthy } = require('./config/rabbitmq');

app.get('/health', (req, res) => {
  const rabbit = isRabbitHealthy();
  res.status(rabbit ? 200 : 503).json({
    status: rabbit ? 'ok' : 'degraded',
    service: 'task-service',
    rabbitmq: rabbit
  });
});

app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`task-service running on port ${PORT}`);
});

connectRabbitMQ().catch((err) => {
  console.error("RabbitMQ init failed:", err.message);
});
