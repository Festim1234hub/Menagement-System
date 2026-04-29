const amqp = require("amqplib");

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://admin:admin123@rabbitmq:5672";
const EXCHANGE = process.env.RABBITMQ_EXCHANGE || "tasks.events";
const QUEUE = process.env.RABBITMQ_QUEUE || "notification.events";

let connection = null;
let channel = null;
let rabbitHealthy = false;

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function connectRabbitMQ() {
  let attempt = 0;
  while (attempt < 30) {
    try {
      connection = await amqp.connect(RABBITMQ_URL);
      channel = await connection.createChannel();

      await channel.assertExchange(EXCHANGE, "topic", { durable: true });
      await channel.assertQueue(QUEUE, { durable: true });
      await channel.bindQueue(QUEUE, EXCHANGE, "task.*");

      rabbitHealthy = true;

      connection.on("close", () => {
        rabbitHealthy = false;
      });
      connection.on("error", () => {
        rabbitHealthy = false;
      });

      return { connection, channel, exchange: EXCHANGE, queue: QUEUE };
    } catch (err) {
      rabbitHealthy = false;
      attempt += 1;
      await sleep(Math.min(1000 * attempt, 8000));
    }
  }

  throw new Error("RabbitMQ connection retries exceeded");
}

function getChannel() {
  return channel;
}

function isRabbitHealthy() {
  return rabbitHealthy;
}

module.exports = {
  connectRabbitMQ,
  getChannel,
  isRabbitHealthy,
  EXCHANGE,
  QUEUE
};
