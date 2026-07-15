import assert from "node:assert/strict";
import test from "node:test";
import { POST } from "./route";

function restoreOpenAIKey(value: string | undefined) {
  if (value === undefined) {
    delete process.env.OPENAI_API_KEY;
    return;
  }

  process.env.OPENAI_API_KEY = value;
}

test("POST returns 400 when no user message is provided", async () => {
  const response = await POST(
    new Request("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages: [] }),
    })
  );

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: "Message is required." });
});

test("POST returns crisis response before requiring OpenAI credentials", async () => {
  const originalKey = process.env.OPENAI_API_KEY;
  delete process.env.OPENAI_API_KEY;

  const response = await POST(
    new Request("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: [{ role: "user", content: "gusto ko nang mamatay" }],
      }),
    })
  );

  restoreOpenAIKey(originalKey);

  assert.equal(response.status, 200);
  const payload = await response.json();
  assert.equal(payload.kind, "crisis");
  assert.match(payload.message, /1553/);
});

test("POST returns 503 when OpenAI credentials are missing for normal chat", async () => {
  const originalKey = process.env.OPENAI_API_KEY;
  delete process.env.OPENAI_API_KEY;

  const response = await POST(
    new Request("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: [{ role: "user", content: "I feel lonely today." }],
      }),
    })
  );

  restoreOpenAIKey(originalKey);

  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), {
    error: "OpenAI is not configured yet.",
  });
});
