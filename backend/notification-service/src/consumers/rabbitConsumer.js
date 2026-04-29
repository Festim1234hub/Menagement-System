const { broadcast } = require("../controllers/notificationController");

async function startConsumer(channel, queueName) {
  await channel.consume(queueName, (msg) => {
    if (!msg) return;
    try {
      const payload = JSON.parse(msg.content.toString());
      const routingKey = msg.fields.routingKey || "task.updated";
      broadcast({
        type: routingKey.replace(".", "-"),
        text: payload.text || payload.message || "Task event received from RabbitMQ",
        createdAt: new Date().toISOString()
      });
    } catch {
      // ignore malformed messages
    } finally {
      channel.ack(msg);
    }
  });
}

module.exports = { startConsumer };
