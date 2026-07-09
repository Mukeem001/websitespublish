import { Schema, model, Document } from "mongoose";

export interface IWebsitePage extends Document {
  websiteId: any;

  title: string;

  slug: string;

  type: "system" | "custom";

  sections: any[];

  seo: {
    title: string;
    description: string;
    keywords: string[];
  };

  isHomePage: boolean;

  isPublished: boolean;

  sortOrder: number;
}

const WebsitePageSchema = new Schema<IWebsitePage>(
  {
    websiteId: {
      type: Schema.Types.ObjectId,
      ref: "Website",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    type: {
      type: String,
      enum: ["system", "custom"],
      default: "system",
    },

    sections: {
      type: Schema.Types.Mixed,
      default: [],
    },

    seo: {
      title: {
        type: String,
        default: "",
      },

      description: {
        type: String,
        default: "",
      },

      keywords: {
        type: [String],
        default: [],
      },
    },

    isHomePage: {
      type: Boolean,
      default: false,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

WebsitePageSchema.index(
  {
    websiteId: 1,
    slug: 1,
  },
  {
    unique: true,
  }
);

export default model<IWebsitePage>(
  "WebsitePage",
  WebsitePageSchema
);