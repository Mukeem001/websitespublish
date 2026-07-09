import { Schema, model, Document } from "mongoose";

export interface IWebsiteTheme extends Document {
  websiteId: any;

  primaryColor: string;

  secondaryColor: string;

  accentColor: string;

  successColor: string;

  warningColor: string;

  dangerColor: string;

  backgroundColor: string;

  textColor: string;

  fontFamily: string;

  borderRadius: number;

  darkMode: boolean;

  layout: "full" | "boxed";
}

const WebsiteThemeSchema = new Schema<IWebsiteTheme>(
  {
    websiteId: {
      type: Schema.Types.ObjectId,
      ref: "Website",
      required: true,
      unique: true,
      index: true,
    },

    primaryColor: {
      type: String,
      default: "#2563eb",
    },

    secondaryColor: {
      type: String,
      default: "#0f172a",
    },

    accentColor: {
      type: String,
      default: "#06b6d4",
    },

    successColor: {
      type: String,
      default: "#22c55e",
    },

    warningColor: {
      type: String,
      default: "#f59e0b",
    },

    dangerColor: {
      type: String,
      default: "#ef4444",
    },

    backgroundColor: {
      type: String,
      default: "#ffffff",
    },

    textColor: {
      type: String,
      default: "#111827",
    },

    fontFamily: {
      type: String,
      default: "Inter",
    },

    borderRadius: {
      type: Number,
      default: 12,
    },

    darkMode: {
      type: Boolean,
      default: false,
    },

    layout: {
      type: String,
      enum: ["full", "boxed"],
      default: "full",
    },
  },
  {
    timestamps: true,
  }
);

export default model<IWebsiteTheme>(
  "WebsiteTheme",
  WebsiteThemeSchema
);