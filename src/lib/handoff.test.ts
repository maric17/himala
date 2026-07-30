import assert from "node:assert/strict";
import test from "node:test";
import { buildHandoffUrl, CHANNEL_OPTIONS } from "./handoff";

test("channel options expose email, messenger, and Miracle chat preview", () => {
  assert.deepEqual(
    CHANNEL_OPTIONS.map((option) => [option.value, option.label]),
    [
      ["email", "Email"],
      ["messenger", "Messenger"],
      ["preview", "Miracle Chat"],
    ]
  );
});

test("email handoff redirects to the requested AMED subscribe CTA URL", () => {
  assert.equal(
    buildHandoffUrl("email"),
    "https://ph.jesus.net/a-miracle-every-day?utm_source=himalaeveryday&utm_medium=cta&utm_campaign=tlen_amed_2026&utm_content=himalaeveryday_cta#subscribe"
  );
});

test("messenger handoff redirects to the requested m.me signup URL", () => {
  assert.equal(
    buildHandoffUrl("messenger"),
    "https://www.m.me/352008124672499?text=Sign%20up"
  );
});
