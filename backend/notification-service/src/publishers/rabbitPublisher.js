const { getChannel, EXCHANGE } = require("../config/rabbitmq");

function publishTaskEvent(type, payload = {}) {
  const channel = getChannel();
  if (!channel) return false;
  channel.publish(EXCHANGE, `task.${type}`, Buffer.from(JSON.stringify(payload)), { persistent: true });
  return true;
}

module.exports = { publishTaskEvent };
