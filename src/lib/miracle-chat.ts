export const MIRACLE_CHAT_OPEN_EVENT = "miracle-chat:open";

export function openMiracleChat() {
  if (typeof window === "undefined") {
    return false;
  }

  window.dispatchEvent(new Event(MIRACLE_CHAT_OPEN_EVENT));
  return true;
}
