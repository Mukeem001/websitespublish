import { Schema, model, Document } from "mongoose";

export interface IWebsiteSettings extends Document {
  websiteId: any;

  companyName: string;

  email: string;

  phone: string;

  whatsapp: string;

  address: string;

  logo: string;

  favicon: string;

  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
    linkedin: string;
  };
}

const WebsiteSettingsSchema =
  new Schema<IWebsiteSettings>(
    {
      websiteId: {
        type: Schema.Types.ObjectId,
        ref: "Website",
        required: true,
        unique: true,
        index: true,
      },

      companyName: {
        type: String,
        default: "",
        trim: true,
      },

      email: {
        type: String,
        default: "",
        trim: true,
      },

      phone: {
        type: String,
        default: "",
      },

      whatsapp: {
        type: String,
        default: "",
      },

      address: {
        type: String,
        default: "",
      },

      logo: {
        type: String,
        default: "",
      },

      favicon: {
        type: String,
        default: "",
      },

      socialLinks: {
        facebook: {
          type: String,
          default: "",
        },

        instagram: {
          type: String,
          default: "",
        },

        twitter: {
          type: String,
          default: "",
        },

        youtube: {
          type: String,
          default: "",
        },

        linkedin: {
          type: String,
          default: "",
        },
      },
    },
    {
      timestamps: true,
    }
  );

export default model<IWebsiteSettings>(
  "WebsiteSettings",
  WebsiteSettingsSchema
);