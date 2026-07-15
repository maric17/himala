export type MiracleChatRole = "user" | "assistant";

export interface MiracleChatMessage {
  role: MiracleChatRole;
  content: string;
}

export interface MiracleChatRequest {
  language?: "en" | "tl" | "taglish";
  messages: MiracleChatMessage[];
}

export interface MiracleChatResponse {
  kind: "chat";
  message: string;
  shouldInviteSubscription: boolean;
}

export interface OpenAIResponsesClient {
  responses: {
    create: (payload: {
      model: string;
      instructions: string;
      input: MiracleChatMessage[];
    }) => Promise<unknown>;
  };
}

type ParseResult =
  | { ok: true; value: MiracleChatRequest }
  | { ok: false; error: string };

const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1200;

export const DEFAULT_OPENAI_MODEL = "gpt-5.5";

export function parseMiracleChatRequest(payload: unknown): ParseResult {
  if (!payload || typeof payload !== "object") {
    return { ok: false, error: "Message is required." };
  }

  const rawPayload = payload as {
    language?: unknown;
    messages?: unknown;
  };

  if (!Array.isArray(rawPayload.messages)) {
    return { ok: false, error: "Message is required." };
  }

  const messages = rawPayload.messages
    .filter(isRawMessage)
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, MAX_MESSAGE_LENGTH),
    }))
    .filter((message) => message.content.length > 0)
    .slice(-MAX_MESSAGES);

  if (!messages.some((message) => message.role === "user")) {
    return { ok: false, error: "Message is required." };
  }

  return {
    ok: true,
    value: {
      language: parseLanguage(rawPayload.language),
      messages,
    },
  };
}

export function buildOpenAIInput(messages: MiracleChatMessage[]) {
  return messages;
}

export function buildMiracleInstructions(language: MiracleChatRequest["language"]) {
  const languageInstruction =
    language === "tl"
      ? "Prefer Filipino or gentle Taglish unless the visitor writes in English."
      : language === "taglish"
        ? "Prefer natural Taglish."
        : "Prefer warm, simple English, and follow the visitor if they use Tagalog or Taglish.";

  return [
    "You are Miracle, the Himala Every Day website chat companion.",
    "Be warm, gentle, concise, and spiritually encouraging.",
    "You may mention Jesus, prayer, hope, and daily encouragement, but do not pressure the visitor.",
    "Do not claim to be human, a pastor, a therapist, a doctor, or a crisis counselor.",
    "Do not give medical, legal, or financial advice.",
    "When appropriate, invite the visitor to receive daily miracles, but only after responding with care.",
    languageInstruction,
  ].join("\n");
}

export function extractOpenAIResponseText(response: unknown) {
  if (!response || typeof response !== "object") {
    return "";
  }

  const outputText = (response as { output_text?: unknown }).output_text;

  if (typeof outputText === "string") {
    return outputText.trim();
  }

  const output = (response as { output?: unknown }).output;

  if (!Array.isArray(output)) {
    return "";
  }

  for (const item of output) {
    if (!item || typeof item !== "object") {
      continue;
    }

    const content = (item as { content?: unknown }).content;

    if (!Array.isArray(content)) {
      continue;
    }

    for (const contentItem of content) {
      if (!contentItem || typeof contentItem !== "object") {
        continue;
      }

      const text = (contentItem as { text?: unknown }).text;

      if (typeof text === "string" && text.trim()) {
        return text.trim();
      }
    }
  }

  return "";
}

export async function generateMiracleReply(
  client: OpenAIResponsesClient,
  request: MiracleChatRequest
): Promise<MiracleChatResponse> {
  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL || DEFAULT_OPENAI_MODEL,
    instructions: buildMiracleInstructions(request.language),
    input: buildOpenAIInput(request.messages),
  });

  const message = extractOpenAIResponseText(response);

  return {
    kind: "chat",
    message:
      message ||
      "I'm here with you. Could you share a little more about what feels heavy today?",
    shouldInviteSubscription: true,
  };
}

export function summarizeOpenAIError(error: unknown) {
  if (!error || typeof error !== "object") {
    return {
      message: "Unknown OpenAI error.",
    };
  }

  const rawError = error as {
    status?: unknown;
    code?: unknown;
    type?: unknown;
    message?: unknown;
  };

  return {
    status: typeof rawError.status === "number" ? rawError.status : undefined,
    code: typeof rawError.code === "string" ? rawError.code : undefined,
    type: typeof rawError.type === "string" ? rawError.type : undefined,
    message: sanitizeErrorMessage(rawError.message),
  };
}

function isRawMessage(value: unknown): value is MiracleChatMessage {
  if (!value || typeof value !== "object") {
    return false;
  }

  const rawMessage = value as {
    role?: unknown;
    content?: unknown;
  };

  return (
    (rawMessage.role === "user" || rawMessage.role === "assistant") &&
    typeof rawMessage.content === "string"
  );
}

function parseLanguage(language: unknown): MiracleChatRequest["language"] {
  if (language === "tl" || language === "taglish") {
    return language;
  }

  return "en";
}

function sanitizeErrorMessage(message: unknown) {
  if (typeof message !== "string" || !message.trim()) {
    return "OpenAI request failed.";
  }

  return message
    .replace(/Incorrect API key provided:.*/i, "Incorrect API key provided.")
    .replace(/sk-[A-Za-z0-9_-]+/g, "[redacted]")
    .trim();
}
