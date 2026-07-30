"use server";

import config from "@payload-config";
import { getPayload } from "payload";
import {
  DEFAULT_CHANNEL,
  type PreferredChannel,
} from "@/lib/handoff";

const DEFAULT_LANGUAGE = "tl";

type LeadCaptureInput = {
  email: string;
  language: string;
  source: string;
  preferredChannel?: PreferredChannel;
  path?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
};

type LeadCaptureResult =
  | { success: true; leadId: string | number }
  | { success: false; error: string };

function cleanText(value?: string) {
  const trimmed = value?.trim();
  return trimmed || undefined;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function captureLeadToPayload(
  input: LeadCaptureInput
): Promise<LeadCaptureResult> {
  const email = input.email.trim().toLowerCase();
  const language = input.language || DEFAULT_LANGUAGE;
  const preferredChannel = input.preferredChannel || DEFAULT_CHANNEL;

  if (!isValidEmail(email)) {
    return { success: false, error: "Invalid email address." };
  }

  try {
    const payload = await getPayload({ config });
    const consentAt = new Date().toISOString();

    const leadData = {
      email,
      language,
      preferredChannel,
      source: cleanText(input.source),
      utmSource: cleanText(input.utmSource),
      utmMedium: cleanText(input.utmMedium),
      utmCampaign: cleanText(input.utmCampaign),
      utmContent: cleanText(input.utmContent),
      consentEmail: true,
      consentSms: false,
      consentMessenger: preferredChannel === "messenger",
      consentAt,
      doubleOptInStatus: "pending",
      handoffStatus: "started",
    };

    const existing = await payload.find({
      collection: "leads",
      where: {
        email: {
          equals: email,
        },
      },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    });

    const lead = existing.docs[0]
      ? await payload.update({
          collection: "leads",
          id: existing.docs[0].id,
          data: leadData,
          overrideAccess: true,
        })
      : await payload.create({
          collection: "leads",
          data: leadData,
          overrideAccess: true,
        });

    await payload.create({
      collection: "events",
      data: {
        eventName: "handoff_started",
        lead: lead.id,
        source: cleanText(input.source),
        path: cleanText(input.path),
        metadata: {
          language,
          preferredChannel,
          utmSource: cleanText(input.utmSource),
          utmMedium: cleanText(input.utmMedium),
          utmCampaign: cleanText(input.utmCampaign),
          utmContent: cleanText(input.utmContent),
        },
      },
      overrideAccess: true,
    });

    return { success: true, leadId: lead.id };
  } catch (error) {
    console.error("Payload lead capture failed:", error);
    return { success: false, error: "Lead capture failed." };
  }
}
