# Module F1: Button Redirect / CTA Flow

Last updated: 2026-06-05

## Confirmed Scope

Client confirmed that F1 should be treated as a button redirect/navigation flow, not as a required full on-site capture and smart handoff workflow.

The launch requirement is simple:

- Show clear CTA buttons on the landing page.
- Redirect users to the approved destination page or page section.
- Track CTA clicks where possible.
- Keep the experience easy, direct, and low-friction.

## Current Progress

- CTA entry points are present across the landing page.
- The header includes a primary "Get Your Miracle" CTA.
- The hero section includes the primary daily miracle CTA area.
- The "Read one first" path sends users to the sample miracle section.
- The final CTA and mobile sticky CTA provide additional conversion points.
- CTA tracking hooks are available for analytics.

## Important Note About Previous Work

Earlier Phase 2 work added an enhanced capture form, Payload lead-write support, channel preference fields, and handoff-related logic. Since the confirmed F1 scope is now button redirect only, that earlier work should be treated as optional/supporting infrastructure unless the client later asks to keep first-party capture.

For launch documentation, F1 should not be presented as blocked by:

- Payload lead capture.
- Email field submission.
- SMS phone capture.
- Messenger/SMS channel selection.
- Full handoff modal behavior.

Those items belong to future capture, email, SMS, or admin workstreams if the client chooses to use them.

## Expected Button Behavior

Primary CTA:

- Button label: client-approved final label, currently similar to `Get Your Miracle` or `Get My Daily Miracle`.
- Destination: client-approved final URL.
- Behavior: redirect user to the approved destination page.

Secondary CTA:

- Button label: client-approved final label, currently similar to `Read one first`.
- Destination: sample miracle section or approved reading page.
- Behavior: scroll or redirect to the reading/sample content.

Mobile CTA:

- Button label: client-approved final label, currently similar to `Subscribe`.
- Destination: same primary CTA destination or homepage hero CTA area.
- Behavior: keep the conversion path visible on mobile.

## Screenshot

![F1 button redirect / CTA area](./screenshots/phase2-f1-button-redirect-cta-only-2026-06-05.png)

## Still Needed From Client

- Confirm the final primary CTA URL.
- Confirm the final secondary CTA URL or page anchor.
- Confirm whether external links should open in the same tab or a new tab.
- Confirm final CTA button labels.
- Confirm if the current email capture UI should be simplified into plain redirect buttons before production launch.

## Recommendation

For Stage 1 launch, keep F1 as a redirect-only CTA flow unless the client specifically wants first-party capture. This reduces dependencies on email provider setup, SMS setup, Payload production configuration, and consent workflow approval.

If first-party capture is kept later, it should be documented under the relevant feature areas:

- F6 for email provider setup.
- F7 for SMS delivery.
- F8 for Payload admin and lead storage.
- F9 for analytics and CTA tracking.
