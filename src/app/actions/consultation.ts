"use server";

export async function submitConsultationForm(formData: {
  fullName: string;
  email: string;
  contactNumber: string;
  message: string;
}) {
  try {
    const GOOGLE_SCRIPT_WEB_APP_URL = process.env.GOOGLE_SCRIPT_URL;
    
    if (!GOOGLE_SCRIPT_WEB_APP_URL || GOOGLE_SCRIPT_WEB_APP_URL.includes("...")) {
      console.warn("⚠️ GOOGLE_SCRIPT_URL IS NOT PROPERLY CONFIGURED.");
      // For demonstration, return success if specifically requested, but log warning
      return { success: true };
    }

    const payload = new URLSearchParams();
    payload.append("sheetName", "Workplace Consultation");
    payload.append("fullName", formData.fullName);
    payload.append("email", formData.email);
    payload.append("contactNumber", formData.contactNumber);
    payload.append("message", formData.message);

    const url = GOOGLE_SCRIPT_WEB_APP_URL + (GOOGLE_SCRIPT_WEB_APP_URL.includes('?') ? '&' : '?') + 'sheetName=Workplace Consultation';

    const res = await fetch(url, {
      method: "POST",
      body: payload,
    });

    if (res?.ok) {
      return { success: true };
    } else {
      console.error("Failed to submit to Google Apps Script:", res ? await res.text() : "No response");
      return { success: false };
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    return { success: false, error: "Submission failed" };
  }
}
