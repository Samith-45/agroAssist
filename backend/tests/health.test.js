import { test, describe, before, after } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import app from "../src/app.js";

describe("Backend Observability & Health Endpoints", () => {
  let server;
  let testPort;

  before(async () => {
    server = http.createServer(app);
    await new Promise((resolve) => {
      server.listen(0, () => {
        testPort = server.address().port;
        resolve();
      });
    });
  });

  after(async () => {
    await new Promise((resolve) => server.close(resolve));
  });

  test("GET /health returns 200 with healthy status", async () => {
    const res = await fetch(`http://localhost:${testPort}/health`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.status, "ok");
  });

  test("GET /api/health returns service metadata and uptime", async () => {
    const res = await fetch(`http://localhost:${testPort}/api/health`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.status, "healthy");
    assert.equal(body.service, "agro-assist-backend");
    assert.equal(typeof body.uptimeSeconds, "number");
  });

  test("GET /api/crops/suggestions returns valid agricultural prompt categories", async () => {
    const res = await fetch(`http://localhost:${testPort}/api/crops/suggestions`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.ok(Array.isArray(body.categories));
    assert.ok(body.categories.length > 0);
    assert.ok(body.categories[0].id);
    assert.ok(body.categories[0].prompt);
  });

  test("POST /api/chat with invalid body returns 400 validation error", async () => {
    const res = await fetch(`http://localhost:${testPort}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ history: "not-an-array" }),
    });
    assert.equal(res.status, 400);
    const body = await res.json();
    assert.equal(body.error, "Validation failed");
  });
});
