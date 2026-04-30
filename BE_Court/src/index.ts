import dotenv from "dotenv";
import express from "express";
import prisma from "./config/database";
import cityRoutes from "./routes/cityRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

(BigInt.prototype as any).toJSON = function () {
  return Number(this);
};

app.use("/api/cities", cityRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Court Reporting Workflow API is running" });
});

async function startServer() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
