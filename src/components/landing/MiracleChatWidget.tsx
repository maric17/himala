"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2, MessageCircle, Send, X } from "lucide-react";
import {
  MIRACLE_CHAT_OPEN_EVENT,
  openMiracleChat,
} from "@/lib/miracle-chat";
import { trackEvent } from "@/lib/analytics";
import { buildHandoffUrl } from "@/lib/handoff";

type ChatRole = "user" | "assistant";

interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  shouldInviteSubscription?: boolean;
}

interface ChatApiResponse {
  kind: "chat" | "crisis";
  message: string;
  shouldInviteSubscription?: boolean;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi, I'm Miracle. Kumusta ka today? You can tell me in English, Tagalog, or Taglish.",
};

export default function MiracleChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const openChat = () => {
      setIsOpen(true);
      trackEvent("chatbot_opened", {
        provider: "openai",
      });
    };

    window.addEventListener(MIRACLE_CHAT_OPEN_EVENT, openChat);

    return () => {
      window.removeEventListener(MIRACLE_CHAT_OPEN_EVENT, openChat);
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isSending]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedInput = input.trim();

    if (!trimmedInput || isSending) {
      return;
    }

    setInput("");
    setError("");
    setIsSending(true);

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedInput,
    };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: "taglish",
          messages: nextMessages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        }),
      });

      const payload = (await response.json()) as ChatApiResponse | { error: string };

      if (!response.ok || "error" in payload) {
        throw new Error(
          "error" in payload
            ? payload.error
            : "Miracle chat is temporarily unavailable."
        );
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: payload.message,
          shouldInviteSubscription:
            payload.kind === "chat" && payload.shouldInviteSubscription !== false,
        },
      ]);

      trackEvent("chat_message_sent", {
        provider: "openai",
        response_kind: payload.kind,
      });
    } catch (reason) {
      const message =
        reason instanceof Error
          ? reason.message
          : "Miracle chat is temporarily unavailable.";

      setError(message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <button
        type="button"
        title="Open Miracle chat"
        aria-label="Open Miracle chat"
        onClick={openMiracleChat}
        className="fixed bottom-5 right-5 z-[90] flex h-14 w-14 items-center justify-center rounded-full border border-brand-dark-brown/10 bg-brand-gold text-white shadow-[0_18px_45px_rgba(82,53,32,0.26)] transition-transform hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.section
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            aria-label="Miracle chat"
            className="fixed bottom-24 right-4 z-[100] flex h-[min(620px,calc(100vh-8rem))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-lg border border-brand-dark-brown/10 bg-[#FFFDF7] shadow-[0_24px_70px_rgba(40,25,15,0.28)]"
          >
            <header className="flex h-16 shrink-0 items-center justify-between border-b border-brand-dark-brown/10 bg-white px-4">
              <div className="min-w-0">
                <p className="text-sm font-bold text-brand-dark-brown">
                  Miracle
                </p>
              </div>
              <button
                type="button"
                title="Close chat"
                aria-label="Close chat"
                onClick={() => setIsOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-brand-dark-brown/62 transition-colors hover:bg-brand-dark-brown/8 hover:text-brand-dark-brown"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((message) => {
                const isUser = message.role === "user";

                return (
                  <div
                    key={message.id}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[82%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                        isUser
                          ? "bg-brand-gold text-white"
                          : "border border-brand-dark-brown/10 bg-white text-brand-dark-brown"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>

                      {message.shouldInviteSubscription ? (
                        <button
                          type="button"
                          onClick={() => {
                            trackEvent("chat_subscription_handoff_clicked", {
                              provider: "openai",
                            });
                            window.location.assign(buildHandoffUrl("email"));
                          }}
                          className="mt-3 inline-flex items-center gap-2 rounded-md bg-brand-dark-brown px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-brand-dark-brown/88"
                        >
                          Get daily miracles
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      ) : null}
                    </div>
                  </div>
                );
              })}

              {isSending ? (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-lg border border-brand-dark-brown/10 bg-white px-3 py-2 text-sm text-brand-dark-brown/70">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Miracle is replying
                  </div>
                </div>
              ) : null}
            </div>

            {error ? (
              <p className="border-t border-red-200 bg-red-50 px-4 py-2 text-xs leading-relaxed text-red-700">
                {error}
              </p>
            ) : null}

            <form
              onSubmit={handleSubmit}
              className="flex shrink-0 items-end gap-2 border-t border-brand-dark-brown/10 bg-white p-3"
            >
              <label htmlFor="miracle-chat-message" className="sr-only">
                Message Miracle
              </label>
              <textarea
                id="miracle-chat-message"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    event.currentTarget.form?.requestSubmit();
                  }
                }}
                rows={1}
                maxLength={1200}
                placeholder="Type your message..."
                className="max-h-28 min-h-11 flex-1 resize-none rounded-lg border border-brand-dark-brown/14 bg-background-cream px-3 py-2 text-sm text-brand-dark-brown outline-none transition-colors placeholder:text-brand-dark-brown/42 focus:border-brand-gold"
              />
              <button
                type="submit"
                title="Send message"
                aria-label="Send message"
                disabled={!input.trim() || isSending}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-gold text-white transition-colors hover:bg-brand-gold/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </form>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </>
  );
}
