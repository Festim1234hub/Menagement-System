const crypto = require("crypto");

const clients = new Set();
const store = [];

function shape(payload = {}) {
  return {
    id: payload.id || crypto.randomUUID(),
    type: payload.type || "task-updated",
    text: payload.text || "Task event received",
    createdAt: payload.createdAt || new Date().toISOString()
  };
}

function broadcast(payload) {
  const item = shape(payload);
  store.unshift(item);
  if (store.length > 200) store.pop();

  for (const res of clients) {
    res.write(`data: ${JSON.stringify(item)}\n\n`);
  }
}

function listNotifications(_req, res) {
  res.json(store.slice(0, 25));
}

function streamNotifications(req, res) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  clients.add(res);

  store.slice(0, 10).reverse().forEach((item) => {
    res.write(`data: ${JSON.stringify(item)}\n\n`);
  });

  req.on("close", () => clients.delete(res));
}

module.exports = {
  broadcast,
  listNotifications,
  streamNotifications
};
