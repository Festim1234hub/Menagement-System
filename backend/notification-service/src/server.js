require("dotenv").config();
const express = require("express");
const cors = require("cors");

const notificationRoutes = require("./routes/notificationRoutes");
const { connectRabbitMQ, isRabbitHealthy, QUEUE } = require("./config/rabbitmq");
const { startConsumer } = require("./consumers/rabbitConsumer");

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  const rabbit = isRabbitHealthy();
  res.status(rabbit ? 200 : 503).json({
    status: rabbit ? "ok" : "degraded",
    service: "notification-service",
    rabbitmq: rabbit
  });
});

app.use("/api/notifications", notificationRoutes);

async function bootstrap() {
  try {
    const { channel, queue } = await connectRabbitMQ();
    await startConsumer(channel, queue || QUEUE);
  } catch (err) {
    // Service still starts; health will show degraded until RabbitMQ is available.
    console.error("RabbitMQ init failed:", err.message);
  }

  app.listen(PORT, () => {
    console.log(`notification-service running on port ${PORT}`);
  });
}

bootstrap();
