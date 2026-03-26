"use server";

export async function subscribeToMiracle(email: string) {
  try {
    const MIRACLE_SCRIPT_URL = process.env.MIRACLE_SCRIPT_URL || process.env.GOOGLE_SCRIPT_URL;
    
    if (!MIRACLE_SCRIPT_URL || MIRACLE_SCRIPT_URL.includes("...")) {
      console.warn("⚠️ MIRACLE_SCRIPT_URL IS NOT PROPERLY CONFIGURED.");
      // For demonstration/dev purposes, simulate success
      return { success: true };
    }

    const payload = new URLSearchParams();
    payload.append("sheetName", "Himala Sign-up");
    payload.append("fullName", "Himala Subscriber");
    payload.append("email", email);
    payload.append("contactNumber", "N/A"); // Script expects contactNumber
    payload.append("message", "Signed up via Himala Everyday Final CTA"); // Script expects message

    const url = MIRACLE_SCRIPT_URL + (MIRACLE_SCRIPT_URL.includes('?') ? '&' : '?') + 'sheetName=Himala Sign-up';

    const res = await fetch(url, {
      method: "POST",
      body: payload,
    });

    if (res?.ok) {
      return { success: true };
    } else {
      const errorText = res ? await res.text() : "No response";
      console.error("Failed to submit miracle subscription:", errorText);
      return { success: false, error: errorText };
    }
  } catch (error) {
    console.error("Error submitting miracle subscription:", error);
    return { success: false, error: "Submission failed" };
  }
}
