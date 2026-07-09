import { Document, Schema, model } from "mongoose";

export interface IOtp extends Document {
  email: string;
  otp: string;
  purpose: "signup" | "forgot-password";
  expiresAt: Date;
}

const OtpSchema = new Schema<IOtp>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    otp: {
      type: String,
      required: true,
    },

    purpose: {
      type: String,
      enum: ["signup", "forgot-password"],
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Auto delete after expiry
OtpSchema.index(
  {
    expiresAt: 1,
  },
  {
    expireAfterSeconds: 0,
  }
);

export default model<IOtp>(
  "Otp",
  OtpSchema
);