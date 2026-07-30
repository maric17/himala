import assert from "node:assert/strict";
import test from "node:test";
import { openMiracleChat } from "./miracle-chat";

test("openMiracleChat dispatches the global open event in the browser", () => {
  const dispatchedEvents: string[] = [];
  const originalWindow = globalThis.window;

  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      dispatchEvent(event: Event) {
        dispatchedEvents.push(event.type);
        return true;
      },
    },
  });

  assert.equal(openMiracleChat(), true);
  assert.deepEqual(dispatchedEvents, ["miracle-chat:open"]);

  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: originalWindow,
  });
});

test("openMiracleChat returns false outside the browser", () => {
  const originalWindow = globalThis.window;

  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: undefined,
  });

  assert.equal(openMiracleChat(), false);

  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: originalWindow,
  });
});
