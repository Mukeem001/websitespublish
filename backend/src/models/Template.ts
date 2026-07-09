import mongoose, { Document, Schema } from "mongoose";

export interface ITemplate extends Document {
  name: string;
  slug: string;
  description: string;
  category: string;
  thumbnail?: string;
  previewUrl?: string;
  isActive: boolean;
  tags: string[];
}

const TemplateSchema = new Schema<ITemplate>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "general",
    },
    thumbnail: {
      type: String,
      default: "",
    },
    previewUrl: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

TemplateSchema.pre("validate", function (this: any, next: any) {
  if (!this.slug) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  next();
});

const Template = mongoose.model<ITemplate>("Template", TemplateSchema);

export default Template;
