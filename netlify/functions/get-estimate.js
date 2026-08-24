exports.handler = async function (event) {
  const id = event.queryStringParameters && event.queryStringParameters.id;
  if (!id) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing id" }) };
  }
  try {
    const siteId = process.env.SITE_ID || process.env.NETLIFY_SITE_ID;
    const token = process.env.NETLIFY_TOKEN || process.env.TOKEN;
    const res = await fetch(
      `https://api.netlify.com/api/v1/blobs/${siteId}/estimates/${id}`,
      { method: "GET", headers: { Authorization: `Bearer ${token}` } }
    );
    if (!res.ok) {
      return { statusCode: 404, body: JSON.stringify({ error: "Not found" }) };
    }
    const data = await res.text();
    return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: data };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
