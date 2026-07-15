import OpenAI from "openai";
import { buildCrisisResponse, detectCrisisSignal } from "@/lib/chat-safety";
import {
  generateMiracleReply,
  parseMiracleChatRequest,
  summarizeOpenAIError,
} from "@/lib/openai-chat";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Message is required." }, { status: 400 });
  }

  const parsedRequest = parseMiracleChatRequest(body);

  if (!parsedRequest.ok) {
    return Response.json({ error: parsedRequest.error }, { status: 400 });
  }

  const latestUserMessage = [...parsedRequest.value.messages]
    .reverse()
    .find((message) => message.role === "user");

  if (latestUserMessage && detectCrisisSignal(latestUserMessage.content)) {
    return Response.json(buildCrisisResponse());
  }

  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      { error: "OpenAI is not configured yet." },
      { status: 503 }
    );
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const response = await generateMiracleReply(openai, parsedRequest.value);

    return Response.json(response);
  } catch (error) {
    console.error("Miracle chat failed", summarizeOpenAIError(error));

    return Response.json(
      { error: "Miracle chat is temporarily unavailable." },
      { status: 502 }
    );
  }
}
