import User from "../models/User";

export const createUser = async (
  data: {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
  }
) => {
  const exists =
    await User.findOne({
      email: data.email,
    });

  if (exists) {
    throw new Error(
      "Email already registered."
    );
  }

  const user =
    await User.create(data);

  return user;
};

export const loginUser = async (
  email: string,
  password: string
) => {
  const user =
    await User.findOne({
      email,
    }).select("+password");

  if (!user) {
    throw new Error(
      "Invalid email or password."
    );
  }

  const valid =
    await user.comparePassword(
      password
    );

  if (!valid) {
    throw new Error(
      "Invalid email or password."
    );
  }

  return user;
};