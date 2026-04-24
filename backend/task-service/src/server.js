require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

const taskRoutes = require('./routes/taskRoutes');

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'task-service' });
});

app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`task-service running on port ${PORT}`);
});
