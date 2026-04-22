const app = require("./app");
const connectDatabase = require("./config/db");
const env = require("./config/env");

const startServer = async () => {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`OwnClasses backend running on port ${env.port}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
