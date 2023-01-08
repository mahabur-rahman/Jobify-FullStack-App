import express from "express";
const app = express();
// dotenv config
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import morgan from "morgan";
const port = process.env.PORT || 5000;

// connect to db
import connectDB from "./db/connect.js";
// import cors from "cors";
// ROUTES
import authRoute from "./routes/authRoutes.js";
import jobRoute from "./routes/jobRoutes.js";

// middleware
import notFoundMiddleware from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import authenticateUser from "./middleware/auth.js";

app.get("/", (req, res) => {
  return res.json({ msg: "welcome to server " });
});

// middle ware
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(express.json());
// app.use(cors());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/jobs", authenticateUser, jobRoute);

app.use(notFoundMiddleware);
app.use(errorHandler);

// connect to db
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);

    app.listen(port, () => {
      console.log(`Server is listening at http://localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
