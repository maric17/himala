import assert from "node:assert/strict";
import test from "node:test";
import {
  cleanJesusNetTitle,
  parseMiracleCardsFromListingHtml,
} from "./jesusnet-miracles";

test("cleanJesusNetTitle removes the site suffix and decodes common entities", () => {
  assert.equal(
    cleanJesusNetTitle("God is claiming &ldquo;owner&rsquo;s use&rdquo; - ph.Jesus.net"),
    "God is claiming \"owner's use\"",
  );
});

test("parseMiracleCardsFromListingHtml returns the first four PH listing cards", () => {
  const html = `
    <a class="image-card" href="https://ph.jesus.net/miracles/ask-without-fear" title="Ask Without Fear"></a>
    <a class="image-card" href="https://ph.jesus.net/miracles/may-tanong-ka-ba" title="May Tanong Ka Ba?"></a>
    <a class="image-card" href="https://ph.jesus.net/miracles/north-star" title="North Star"></a>
    <a class="image-card" href="https://ph.jesus.net/miracles/ask-him-anything" title="Ask Him Anything"></a>
    <a class="image-card" href="https://ph.jesus.net/miracles/go-ask-he-hears" title="Go Ask&mdash;HE Hears"></a>
  `;

  assert.deepEqual(parseMiracleCardsFromListingHtml(html), [
    {
      title: "Ask Without Fear",
      url: "https://ph.jesus.net/miracles/ask-without-fear",
    },
    {
      title: "May Tanong Ka Ba?",
      url: "https://ph.jesus.net/miracles/may-tanong-ka-ba",
    },
    {
      title: "North Star",
      url: "https://ph.jesus.net/miracles/north-star",
    },
    {
      title: "Ask Him Anything",
      url: "https://ph.jesus.net/miracles/ask-him-anything",
    },
  ]);
});
