import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import blogRoute from "./routes/blogRoute.js";
import cors from "cors";

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use(express.json());
app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

mongoose
  .connect(mongoDBURL)
  .then(() => console.log("App is connected to database"))
  .catch((error) => console.log(error));
