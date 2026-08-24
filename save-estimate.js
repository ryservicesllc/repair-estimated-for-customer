const { getStore } = require("@netlify/blobs");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(event.body);
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    const store = getStore("estimates");
    await store.set(id, JSON.stringify(data), { ttl: 60 * 60 * 24 * 90 }); // 90 days
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
