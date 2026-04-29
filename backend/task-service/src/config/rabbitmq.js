const amqp = require("amqplib");

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://admin:admin123@rabbitmq:5672";
const EXCHANGE = process.env.RABBITMQ_EXCHANGE || "tasks.events";

let channel = null;
let rabbitHealthy = false;

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function connectRabbitMQ() {
  let attempt = 0;
  while (attempt < 30) {
    try {
      const connection = await amqp.connect(RABBITMQ_URL);
      channel = await connection.createChannel();
      await channel.assertExchange(EXCHANGE, "topic", { durable: true });
      rabbitHealthy = true;

      connection.on("close", () => {
        rabbitHealthy = false;
      });
      connection.on("error", () => {
        rabbitHealthy = false;
      });

      return;
    } catch (err) {
      rabbitHealthy = false;
      attempt += 1;
      await sleep(Math.min(1000 * attempt, 8000));
    }
  }
}

function publishTaskEvent(type, payload = {}) {
  if (!channel) return false;
  channel.publish(EXCHANGE, `task.${type}`, Buffer.from(JSON.stringify(payload)), { persistent: true });
  return true;
}

function isRabbitHealthy() {
  return rabbitHealthy;
}

module.exports = {
  connectRabbitMQ,
  publishTaskEvent,
  isRabbitHealthy
};
