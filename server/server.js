import express from "express";
import cors from "cors";
import { db } from "./dbconnection.js";

const app = express();
app.use(express.json());

app.use(cors());

const PORT = 8080;
app.listen(PORT, () => {
  console.info(`Server API is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the server API. GET comfy!" });
});
