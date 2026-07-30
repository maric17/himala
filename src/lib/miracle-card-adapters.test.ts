import assert from "node:assert/strict";
import test from "node:test";
import { toSampleMiraclePreviews } from "./miracle-card-adapters";

test("toSampleMiraclePreviews adapts the first three PH cards for the sample section", () => {
  const cards = [
    {
      title: "Ask Without Fear",
      description: "A daily miracle from ph.Jesus.net.",
      url: "https://ph.jesus.net/miracles/ask-without-fear",
      image: "/images/one.webp",
    },
    {
      title: "May Tanong Ka Ba?",
      description: "A daily miracle from ph.Jesus.net.",
      url: "https://ph.jesus.net/miracles/may-tanong-ka-ba",
      image: "/images/two.webp",
    },
    {
      title: "North Star",
      description: "A daily miracle from ph.Jesus.net.",
      url: "https://ph.jesus.net/miracles/north-star",
      image: "/images/three.webp",
    },
    {
      title: "Ask Him Anything",
      description: "A daily miracle from ph.Jesus.net.",
      url: "https://ph.jesus.net/miracles/ask-him-anything",
      image: "/images/four.webp",
    },
  ];

  assert.deepEqual(toSampleMiraclePreviews(cards), [
    {
      id: "ask-without-fear",
      image: "/images/one.webp",
      title: "Ask Without Fear",
      excerpt: "A daily miracle from ph.Jesus.net.",
      originalUrl: "https://ph.jesus.net/miracles/ask-without-fear",
      shareText:
        "I thought this short miracle might encourage you today. Sharing it with you.",
      shareUrl: "https://ph.jesus.net/miracles/ask-without-fear",
    },
    {
      id: "may-tanong-ka-ba",
      image: "/images/two.webp",
      title: "May Tanong Ka Ba?",
      excerpt: "A daily miracle from ph.Jesus.net.",
      originalUrl: "https://ph.jesus.net/miracles/may-tanong-ka-ba",
      shareText:
        "I thought this short miracle might encourage you today. Sharing it with you.",
      shareUrl: "https://ph.jesus.net/miracles/may-tanong-ka-ba",
    },
    {
      id: "north-star",
      image: "/images/three.webp",
      title: "North Star",
      excerpt: "A daily miracle from ph.Jesus.net.",
      originalUrl: "https://ph.jesus.net/miracles/north-star",
      shareText:
        "I thought this short miracle might encourage you today. Sharing it with you.",
      shareUrl: "https://ph.jesus.net/miracles/north-star",
    },
  ]);
});
