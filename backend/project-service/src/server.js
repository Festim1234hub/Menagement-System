require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

const projectRoutes = require('./routes/project.routes');

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'project-service' });
});

app.use('/projects', projectRoutes);

app.listen(PORT, () => {
  console.log(`project-service running on port ${PORT}`);
});
