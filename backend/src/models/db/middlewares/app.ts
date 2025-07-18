import express from "express";
import cors from "cors";

import jobRoutes from "routes/jobRoutes"; // ✅ Correct relative path
import applicationRoutes from "routes/applicationRoutes"; // if you're using applications too

import { notFound } from "middlewares/validators/notfound";
import { errorHandler } from "middlewares/validators/errorHandler";
const app = express();

app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api/jobs", jobRoutes); 
app.use("/api/applications", applicationRoutes); 

// Not Found and Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
