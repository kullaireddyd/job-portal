import app from "./app";
import dotenv from "dotenv";

// Load environment variables from .env file (if present)
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
