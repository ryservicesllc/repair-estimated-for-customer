exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  try {
    const data = JSON.parse(event.body);
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    const siteId = process.env.SITE_ID || process.env.NETLIFY_SITE_ID;
    const token = process.env.NETLIFY_TOKEN || process.env.TOKEN;
    const res = await fetch(
      `https://api.netlify.com/api/v1/blobs/${siteId}/estimates/${id}`,
      { method: "PUT", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(data) }
    );
    if (!res.ok) throw new Error("Save failed: " + res.status);
    return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
