import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  setup,
  saveArticle,
  getAllArticle,
  deleteArticle,
  editArticle,
} from "./utils/filestorage.js";
//!for files upload
import fs from "fs/promises";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { fileTypeFromBuffer } from "file-type";

//config
setup();

dotenv.config();

const PORT = process.env.PORT;
const app = express();

//multer & co

const storage = multer.memoryStorage();
const DIR = "./uploads/";
const upload = multer({ storage }); //* unsere uplaud nutzen in the POST rute unten

//use

app.use(express.json());

// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//   })
// );

app.use(cors());

//multer uploads

app.use("/uploads", express.static("uploads"));

// Routes

// ! GET Route

app.get("/api/articles", (req, res) => {
  getAllArticle()
    .then((data) => res.json(data))
    .catch(() => res.status(500).end());
});

// ! POST ONE - Route + file upload

app.post("/api/articles", upload.single("link"), (req, res) => {
  const article = {
    title: req.body.title,
    description: req.body.description,
    tags: req.body.tags || [],
    favorite: req.body.favorite || false,
  };

  console.log("Our File", req.file);

  fileTypeFromBuffer(req.file.buffer)
    .then((data) => {
      const path = DIR + uuidv4() + "." + data.ext;
      fs.writeFile(path, req.file.buffer);
      console.log("-------------path", path);
      return path;
    })
    .then((data) => {
      article.link = data;
      console.log("-------------article", article);
      saveArticle(article);
      res.end();
    })
    .catch((error) => {
      console.error("Error processing file:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

//  !Delete Route

app.delete("/api/articles", (req, res) => {
  const id = req.body.id;
  console.log("---------------👉", id);
  deleteArticle(id)
    .then(() => res.json({ message: "Article deleted successfully!" }))
    .then(() => res.end())
    .catch((err) => res.status(500).end(err));
});

app.put("/api/articles", upload.none(), (req, res) => {
  console.log("---------------👉", req.body);
  editArticle(req.body)
    .then(() => res.end())
    .catch((err) => {
      console.log(err);
      res.status(500).end("Error Message");
    });
});

// Listen
app.listen(PORT, () => {
  console.log("Port is:http://localhost:" + PORT);
});
