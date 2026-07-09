import app from "./app";
import env from "./config/env";
import connectDatabase from "./config/db";

const startServer = async (): Promise<void> => {
  try {
    // Connect MongoDB
    await connectDatabase();

    // Start Express Server
    app.listen(env.port, () => {
      console.log("\n=================================");
      console.log("🚀 BuildHub Backend Started");
      console.log("=================================");
      console.log(`🌍 Environment : ${env.nodeEnv}`);
      console.log(`📦 Port        : ${env.port}`);
      console.log(`🔗 Backend     : ${env.backendUrl}`);
      console.log(`💻 Frontend    : ${env.frontendUrl}`);
      console.log("=================================\n");
    });
  } catch (error) {
    console.error("❌ Failed to start server");
    console.error(error);
    process.exit(1);
  }
};

startServer();