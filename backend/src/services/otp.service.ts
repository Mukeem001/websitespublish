import Otp from "../models/Otp";

export const generateOtp =
  (): string => {
    return Math.floor(
      100000 +
        Math.random() * 900000
    ).toString();
  };

export const saveOtp = async (
  email: string,
  purpose:
    | "signup"
    | "forgot-password"
) => {
  await Otp.deleteMany({
    email,
    purpose,
  });

  const otp = generateOtp();

  const expiresAt = new Date(
    Date.now() + 5 * 60 * 1000
  );

  await Otp.create({
    email,
    otp,
    purpose,
    expiresAt,
  });

  return otp;
};

export const verifyOtp =
  async (
    email: string,
    otp: string,
    purpose:
      | "signup"
      | "forgot-password"
  ) => {
    const record =
      await Otp.findOne({
        email,
        otp,
        purpose,
      });

    if (!record) {
      return false;
    }

    await record.deleteOne();

    return true;
  };