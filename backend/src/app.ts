import express from "express";
import cors from "cors";
import jobRoutes from "./routes/jobRoutes";
import applicationRoutes from "./routes/applicationRoutes";
import { errorHandler } from "./middlewares/validators/errorHandler";
import { notFound } from "./middlewares/validators/notfound";
const app = express();

app.use(cors());
app.use(express.json());
app.get("/test-app", (req, res) => {
    console.log("🔥 app test route hit");
    res.send("App route working");
  });
  
// Routes
console.log("Mounting /api/jobs routes...");
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

// Not Found Handler
app.use(notFound);

// Central Error Handler
app.use(errorHandler);

export default app;
