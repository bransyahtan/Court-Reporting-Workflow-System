import sequelize from "./config/database";
import "./models/index"; // load semua model & associations

const syncDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established.");
    await sequelize.sync({ alter: process.env.NODE_ENV === "development" });
    console.log("✅ All models synchronized.");
  } catch (error) {
    console.error("❌ Unable to connect to database:", error);
    process.exit(1);
  }
};

syncDatabase();
