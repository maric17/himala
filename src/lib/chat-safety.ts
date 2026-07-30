const CRISIS_PATTERNS = [
  /\bsuicide\b/i,
  /\bkill myself\b/i,
  /\bhurt myself\b/i,
  /\bself[-\s]?harm\b/i,
  /\bgusto ko nang mamatay\b/i,
  /\bmagpakamatay\b/i,
  /\bsaktan ang sarili\b/i,
  /\bayoko na mabuhay\b/i,
];

export interface CrisisChatResponse {
  kind: "crisis";
  message: string;
  shouldInviteSubscription: false;
}

export function detectCrisisSignal(message: string) {
  const normalizedMessage = message.trim();

  if (!normalizedMessage) {
    return false;
  }

  return CRISIS_PATTERNS.some((pattern) => pattern.test(normalizedMessage));
}

export function buildCrisisResponse(): CrisisChatResponse {
  return {
    kind: "crisis",
    shouldInviteSubscription: false,
    message:
      "Nandito kami para sa iyo. Hindi ka nag-iisa. Kung nasa agarang panganib ka or naiisip mong saktan ang sarili mo, please contact emergency services or someone you trust right now. You can also reach the National Center for Mental Health Crisis Hotline at 1553, 0917-899-8727, or 0966-351-4518. I will pause the normal sign-up flow so you can focus on getting help.",
  };
}
