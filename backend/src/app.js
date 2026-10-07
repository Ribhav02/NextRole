import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import workHistoryRoutes from "./routes/workHistory.routes.js";
import evidenceRoutes from "./routes/evidence.routes.js";
import skillRoutes from "./routes/skill.routes.js";
import intelligenceRoutes from "./routes/intelligence.routes.js";

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ success: true, service: "nextrole-backend", status: "healthy" });
});

app.use("/api/auth", authRoutes);
app.use("/api/work-history", workHistoryRoutes);
app.use("/api/evidence", evidenceRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/intelligence", intelligenceRoutes);

app.use((req, res) => res.status(404).json({
  success: false,
  message: `Route not found: ${req.method} ${req.originalUrl}`,
}));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

export default app;
