# OpenAI Chat Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Bonfire widget with a custom in-site Miracle chat powered by OpenAI through a server-side API route.

**Architecture:** The browser renders a local chat widget and sends messages to `/api/chat`. The server route validates the payload, checks crisis phrases before normal generation, and calls the OpenAI Responses API with server-only credentials. Existing CTA call sites open the custom widget through a small browser event helper.

**Tech Stack:** Next.js App Router, React 19, TypeScript, node:test, tsx, OpenAI Responses API.

---

### Task 1: Safety Core

**Files:**
- Create: `src/lib/chat-safety.ts`
- Test: `src/lib/chat-safety.test.ts`

- [ ] Write failing tests for crisis phrase detection and the canned crisis response.
- [ ] Run `npm run test -- src/lib/chat-safety.test.ts` and verify it fails because the module does not exist.
- [ ] Implement `detectCrisisSignal()` and `buildCrisisResponse()`.
- [ ] Run `npm run test -- src/lib/chat-safety.test.ts` and verify it passes.

### Task 2: OpenAI Chat Server Helper

**Files:**
- Create: `src/lib/openai-chat.ts`
- Test: `src/lib/openai-chat.test.ts`

- [ ] Write failing tests for request validation, input building, and fallback response parsing.
- [ ] Run `npm run test -- src/lib/openai-chat.test.ts` and verify it fails because the module does not exist.
- [ ] Implement server-safe request validation and response generation helpers.
- [ ] Run `npm run test -- src/lib/openai-chat.test.ts` and verify it passes.

### Task 3: API Route

**Files:**
- Create: `src/app/api/chat/route.ts`

- [ ] Add a POST route that parses JSON with `request.json()`.
- [ ] Return crisis responses before calling OpenAI.
- [ ] Return 400 for invalid messages and 503 when `OPENAI_API_KEY` is missing.

### Task 4: Frontend Widget and Call Sites

**Files:**
- Create: `src/lib/miracle-chat.ts`
- Create: `src/components/landing/MiracleChatWidget.tsx`
- Modify: `src/app/(frontend)/layout.tsx`
- Modify: `src/components/landing/CaptureForm.tsx`
- Modify: `src/components/landing/HandoffModal.tsx`
- Modify: `src/lib/handoff.test.ts`

- [ ] Replace the Bonfire preview label with "Miracle Chat".
- [ ] Replace `openBonfireChat()` calls with `openMiracleChat()`.
- [ ] Remove Bonfire script tags from the frontend layout.
- [ ] Mount the custom Miracle chat widget globally.

### Task 5: Verification

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] Add test tooling and scripts.
- [ ] Run `npm run test`.
- [ ] Run `npm exec tsc -- --noEmit`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
