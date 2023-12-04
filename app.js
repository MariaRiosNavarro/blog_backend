import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  setup,
  saveArticle,
  getAllArticle,
  deleteArticle,
} from "./utils/filestorage.js";

//config
setup();

dotenv.config();

const PORT = process.env.PORT;
const app = express();

//use

app.use(express.json());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

// Routes

//  GET Route

app.get("/api/articles", (req, res) => {
  getAllArticle()
    .then((data) => res.json(data))
    .catch(() => res.status(500).end());
});

//  POST Route

app.post("/api/articles", (req, res) => {
  const article = req.body;
  console.log("Article :", article);
  saveArticle(article);
  res.end();
});

//  Delete Route

app.delete("api/articles", (req, res) => {
  const id = req.body.id;
  deleteArticle(id)
    .then(() => res.end())
    .catch((err) => res.status(500).end(err));
});

// Listen
app.listen(PORT, () => {
  console.log("Port is:http://localhost:" + PORT);
});
