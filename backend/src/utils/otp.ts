export const generateOtp = (length = 6): string => {
  const digits = "0123456789";
  let otp = "";

  for (let i = 0; i < length; i += 1) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }

  return otp;
};

export const verifyOtp = (input: string, expected: string): boolean => {
  return input.trim() === expected.trim();
};
