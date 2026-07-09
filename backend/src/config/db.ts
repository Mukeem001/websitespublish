import mongoose from "mongoose";
import env from "./env";

const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(env.mongoUri);

    console.log(
      "✅ MongoDB Connected Successfully"
    );

    console.log(
      `📦 Database: ${mongoose.connection.name}`
    );

  } catch (error) {
    console.error(
      "❌ MongoDB Connection Failed"
    );

    console.error(error);

    process.exit(1);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB Disconnected");
});

mongoose.connection.on("reconnected", () => {
  console.log("🔄 MongoDB Reconnected");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB Error:", error);
});

export default connectDatabase;