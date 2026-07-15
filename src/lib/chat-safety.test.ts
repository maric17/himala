import assert from "node:assert/strict";
import test from "node:test";
import { buildCrisisResponse, detectCrisisSignal } from "./chat-safety";

test("detectCrisisSignal flags English and Tagalog self-harm phrases", () => {
  assert.equal(detectCrisisSignal("I want to hurt myself"), true);
  assert.equal(detectCrisisSignal("gusto ko nang mamatay"), true);
  assert.equal(detectCrisisSignal("magpakamatay na lang ako"), true);
});

test("detectCrisisSignal ignores ordinary emotional sharing", () => {
  assert.equal(detectCrisisSignal("I feel lonely and anxious today"), false);
  assert.equal(detectCrisisSignal("Nalulungkot ako pero gusto kong mag-pray"), false);
});

test("buildCrisisResponse returns hotline details without a marketing handoff", () => {
  const response = buildCrisisResponse();

  assert.equal(response.kind, "crisis");
  assert.match(response.message, /1553/);
  assert.match(response.message, /0917-899-8727/);
  assert.equal(response.shouldInviteSubscription, false);
});
