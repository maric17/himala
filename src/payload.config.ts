import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig, type CollectionConfig } from "payload";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    defaultColumns: ["email", "name", "role"],
    useAsTitle: "email",
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "role",
      type: "select",
      defaultValue: "admin",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "Support", value: "support" },
        { label: "Viewer", value: "viewer" },
      ],
      required: true,
    },
  ],
};

const Leads: CollectionConfig = {
  slug: "leads",
  admin: {
    defaultColumns: ["email", "phone", "language", "preferredChannel", "source"],
    useAsTitle: "email",
  },
  fields: [
    { name: "email", type: "email" },
    { name: "phone", type: "text" },
    {
      name: "language",
      type: "select",
      defaultValue: "tl",
      options: [
        { label: "Tagalog", value: "tl" },
        { label: "English", value: "en" },
      ],
    },
    {
      name: "preferredChannel",
      type: "select",
      defaultValue: "email",
      options: [
        { label: "Email", value: "email" },
        { label: "Messenger", value: "messenger" },
        { label: "SMS", value: "sms" },
        { label: "Viber", value: "viber" },
      ],
    },
    { name: "source", type: "text" },
    { name: "utmSource", type: "text" },
    { name: "utmMedium", type: "text" },
    { name: "utmCampaign", type: "text" },
    { name: "utmContent", type: "text" },
    { name: "consentEmail", type: "checkbox", defaultValue: false },
    { name: "consentSms", type: "checkbox", defaultValue: false },
    { name: "consentMessenger", type: "checkbox", defaultValue: false },
    { name: "consentAt", type: "date" },
    {
      name: "doubleOptInStatus",
      type: "select",
      defaultValue: "pending",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Confirmed", value: "confirmed" },
        { label: "Failed", value: "failed" },
        { label: "Not Required", value: "not_required" },
      ],
    },
    {
      name: "handoffStatus",
      type: "select",
      defaultValue: "started",
      options: [
        { label: "Started", value: "started" },
        { label: "Completed", value: "completed" },
        { label: "Failed", value: "failed" },
      ],
    },
    { name: "externalProviderId", type: "text" },
    { name: "notes", type: "textarea" },
  ],
};

const Miracles: CollectionConfig = {
  slug: "miracles",
  admin: {
    defaultColumns: ["title", "slug", "language", "status", "publishDate"],
    useAsTitle: "title",
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    {
      name: "language",
      type: "select",
      defaultValue: "tl",
      options: [
        { label: "Tagalog", value: "tl" },
        { label: "English", value: "en" },
      ],
    },
    { name: "excerpt", type: "textarea" },
    { name: "body", type: "richText" },
    { name: "scripture", type: "text" },
    { name: "image", type: "text" },
    { name: "originalUrl", type: "text" },
    { name: "shareText", type: "textarea" },
    { name: "publishDate", type: "date" },
    {
      name: "status",
      type: "select",
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Scheduled", value: "scheduled" },
        { label: "Published", value: "published" },
        { label: "Archived", value: "archived" },
      ],
    },
    { name: "seoTitle", type: "text" },
    { name: "seoDescription", type: "textarea" },
  ],
};

const Events: CollectionConfig = {
  slug: "events",
  admin: {
    defaultColumns: ["eventName", "source", "path", "createdAt"],
    useAsTitle: "eventName",
  },
  fields: [
    { name: "eventName", type: "text", required: true },
    { name: "lead", type: "relationship", relationTo: "leads" },
    { name: "miracle", type: "relationship", relationTo: "miracles" },
    { name: "source", type: "text" },
    { name: "path", type: "text" },
    { name: "metadata", type: "json" },
  ],
};

const Settings: CollectionConfig = {
  slug: "settings",
  admin: {
    defaultColumns: ["key", "value"],
    useAsTitle: "key",
  },
  fields: [
    { name: "key", type: "text", required: true, unique: true },
    { name: "value", type: "text" },
    { name: "description", type: "textarea" },
  ],
};

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
  },
  collections: [Users, Leads, Miracles, Events, Settings],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "development-payload-secret",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
