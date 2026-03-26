"use server";

export async function submitVolunteerForm(formData: {
  fullName: string;
  churchOrg: string;
  work: string;
  email: string;
  contactNumber: string;
  message: string;
  opportunity: string;
}) {
  try {
    const VOLUNTEER_SCRIPT_URL = process.env.VOLUNTEER_SCRIPT_URL;
    
    if (!VOLUNTEER_SCRIPT_URL || VOLUNTEER_SCRIPT_URL.includes("...")) {
      console.warn("⚠️ VOLUNTEER_SCRIPT_URL IS NOT PROPERLY CONFIGURED.");
      return { success: true }; // Return success for dev simulation
    }

    const payload = new URLSearchParams();
    payload.append("sheetName", "Volunteer Sign-up");
    payload.append("fullName", formData.fullName);
    payload.append("churchOrg", formData.churchOrg);
    payload.append("work", formData.work);
    payload.append("email", formData.email);
    payload.append("contactNumber", formData.contactNumber);
    payload.append("message", formData.message);
    payload.append("opportunity", formData.opportunity);

    const url = VOLUNTEER_SCRIPT_URL + (VOLUNTEER_SCRIPT_URL.includes('?') ? '&' : '?') + 'sheetName=Volunteer Sign-up';

    const res = await fetch(url, {
      method: "POST",
      body: payload,
    });

    if (res?.ok) {
      return { success: true };
    } else {
      console.error("Failed to submit volunteer form:", res ? await res.text() : "No response");
      return { success: false };
    }
  } catch (error) {
    console.error("Error submitting volunteer form:", error);
    return { success: false, error: "Submission failed" };
  }
}
