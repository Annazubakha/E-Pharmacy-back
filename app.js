import express from "express";
// import morgan from "morgan";
// import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { DB_HOST, PORT = 3000 } = process.env;
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

const app = express();

export default app;
