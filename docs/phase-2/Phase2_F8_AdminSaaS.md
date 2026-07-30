# Module F8: Payload Admin Dashboard

This document replaces the earlier no-code dashboard plan. Phase 2 now uses **Payload CMS backed by Supabase Postgres** as the primary admin dashboard and operational data layer.

For the full architecture and collection plan, see [Phase2_PayloadCMS.md](./Phase2_PayloadCMS.md).

---

## 🎯 Objective

Empower the ministry team with a single admin surface to manage:

1. Landing content and editable copy.
2. Daily miracle content.
3. Leads and channel preferences.
4. Consent and double opt-in status.
5. Chatbot contacts and follow-up state.
6. Referral links and conversions.
7. Email/SMS/Messenger delivery logs.
8. Site settings and redirect destinations.

GA4 remains useful for aggregate analytics. Payload owns the first-party operational records.

---

## Core Admin Use Cases

### 1. Lead Management

Admins should be able to:

- Search leads by email, phone, language, source, or channel.
- See consent state for email, SMS, Messenger, and Viber.
- See original acquisition source and UTM values.
- Export leads for approved ministry workflows.
- Update notes and follow-up status.

Suggested collection: `leads`.

### 2. Content Management

Admins should be able to edit:

- Miracle content.
- Referral landing page content.
- FAQ items.
- Testimonials.
- Landing CTA labels and helper text.
- Live feed items.
- Email/SMS/Messenger templates.

Suggested collections:

- `miracles`
- `faqs`
- `testimonials`
- `messageTemplates`
- `settings`

### 3. Referral Monitoring

Admins should be able to:

- See which miracles are shared most often.
- See referral page views.
- See referral conversions.
- Tie referral conversions back to miracle content where possible.

Suggested collections:

- `referrals`
- `events`
- `miracles`

### 4. Delivery Logs

Admins should be able to inspect delivery records for:

- Email provider messages.
- Semaphore SMS messages.
- Messenger/Bonfire/ManyChat events.
- Failed sends and bounced contacts.
- Unsubscribe or suppression actions.

Suggested collection: `deliveryLogs`.

### 5. Safety and Support Follow-Up

Admins should be able to review:

- Chat contacts that requested follow-up.
- Initial emotional state.
- Crisis flags.
- Staff owner and resolution status.

Suggested collection: `chatContacts`.

---

## Suggested Roles

| Role | Permissions |
| --- | --- |
| `admin` | Full access to all collections, settings, exports, and user management. |
| `editor` | Create/edit content, miracle posts, FAQs, testimonials, templates. No access to secrets. |
| `support` | View/update leads, chat contacts, consent status, delivery status, and notes. Limited content editing. |
| `viewer` | Read-only access to dashboard data and reports. |

---

## Dashboard Metrics

Payload admin should expose operational counts for:

- Total leads.
- Leads by channel.
- Leads by language.
- New leads by source.
- Referral page views.
- Referral conversions.
- Chatbot opens and captured feelings.
- SMS opt-ins pending verification.
- Failed delivery logs.
- Unsubscribed/suppressed contacts.

Use GA4 for traffic-level metrics like page views, engagement time, and broad funnel drop-off.

---

## Optional Google Sheets / Looker Studio

Google Sheets and Looker Studio are now optional reporting layers.

Use them only if the team needs:

- Board/stakeholder reporting outside Payload.
- Charts not convenient inside Payload.
- Scheduled CSV exports.
- External dashboards combining GA4 and Payload exports.

Payload remains the source of truth.

---

## Implementation Tasks

- [x] Install Payload CMS and database adapter.
- [x] Connect Payload to Supabase using `DATABASE_URL`.
- [x] Create admin `users` collection.
- [x] Create initial `leads`, `miracles`, `events`, and `settings` collections.
- [ ] Add `referrals`, `messageTemplates`, `deliveryLogs`, `chatContacts`, and `shortLinks`.
- [ ] Add complete role model and production admin users.
- [ ] Add access-control rules per role.
- [ ] Add export views for leads and delivery logs.
- [ ] Add DPA retention/deletion workflows.
- [ ] Wire F1 capture to create/update `leads`.
- [ ] Wire F5 referrals to `miracles`, `referrals`, and `events`.
- [ ] Wire F6/F7 delivery providers to `deliveryLogs`.
- [ ] Add admin QA checklist before production.
