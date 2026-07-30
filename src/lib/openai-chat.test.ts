import assert from "node:assert/strict";
import test from "node:test";
import {
  buildOpenAIInput,
  extractOpenAIResponseText,
  generateMiracleReply,
  parseMiracleChatRequest,
  summarizeOpenAIError,
} from "./openai-chat";

test("parseMiracleChatRequest rejects missing or empty user messages", () => {
  assert.deepEqual(parseMiracleChatRequest({}), {
    ok: false,
    error: "Message is required.",
  });

  assert.deepEqual(parseMiracleChatRequest({ messages: [{ role: "user", content: " " }] }), {
    ok: false,
    error: "Message is required.",
  });
});

test("parseMiracleChatRequest accepts and trims recent user and assistant messages", () => {
  const result = parseMiracleChatRequest({
    language: "tl",
    messages: [
      { role: "assistant", content: " Kumusta? " },
      { role: "user", content: "  Nalulungkot ako today. " },
    ],
  });

  assert.equal(result.ok, true);

  if (result.ok) {
    assert.deepEqual(result.value.messages, [
      { role: "assistant", content: "Kumusta?" },
      { role: "user", content: "Nalulungkot ako today." },
    ]);
    assert.equal(result.value.language, "tl");
  }
});

test("buildOpenAIInput preserves conversation roles for the Responses API", () => {
  assert.deepEqual(
    buildOpenAIInput([
      { role: "assistant", content: "Hi, I'm Miracle." },
      { role: "user", content: "Can you pray with me?" },
    ]),
    [
      { role: "assistant", content: "Hi, I'm Miracle." },
      { role: "user", content: "Can you pray with me?" },
    ]
  );
});

test("extractOpenAIResponseText supports SDK output_text and response output fallback", () => {
  assert.equal(
    extractOpenAIResponseText({ output_text: "You are not alone." }),
    "You are not alone."
  );

  assert.equal(
    extractOpenAIResponseText({
      output: [
        {
          type: "message",
          content: [{ type: "output_text", text: "Nandito ako." }],
        },
      ],
    }),
    "Nandito ako."
  );
});

test("generateMiracleReply sends instructions and returns a chat response", async () => {
  const calls: unknown[] = [];
  const client = {
    responses: {
      create: async (payload: unknown) => {
        calls.push(payload);
        return { output_text: "God sees you with tenderness today." };
      },
    },
  };

  const response = await generateMiracleReply(client, {
    language: "en",
    messages: [{ role: "user", content: "I feel alone." }],
  });

  assert.deepEqual(response, {
    kind: "chat",
    message: "God sees you with tenderness today.",
    shouldInviteSubscription: true,
  });
  assert.equal(calls.length, 1);
  assert.match(JSON.stringify(calls[0]), /Miracle/);
});

test("summarizeOpenAIError keeps logs concise without headers or secret values", () => {
  const summary = summarizeOpenAIError({
    status: 401,
    code: "invalid_api_key",
    type: "invalid_request_error",
    message: "Incorrect API key provided: sk-secret-value",
    headers: { "set-cookie": "private-cookie" },
  });

  assert.deepEqual(summary, {
    status: 401,
    code: "invalid_api_key",
    type: "invalid_request_error",
    message: "Incorrect API key provided.",
  });
});
