const { getStore } = require("@netlify/blobs");

exports.handler = async function (event) {
  const id = event.queryStringParameters && event.queryStringParameters.id;
  if (!id) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing id" }) };
  }

  try {
    const store = getStore("estimates");
    const raw = await store.get(id);
    if (!raw) {
      return { statusCode: 404, body: JSON.stringify({ error: "Not found" }) };
    }
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: raw,
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
