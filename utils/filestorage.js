import fs from "fs/promises";
import fsystem from "fs";
import { v4 as uuidv4 } from "uuid";

//!create storage folder if dont exist

export const setup = () => {
  fs.access("./storage/")
    .then(() => console.log("Storage Folder allready exist"))
    .catch(() => fs.mkdir("./storage"));
};

//!save a new Blog

export const saveArticle = (
  article = {
    title: "title",
    description: "description",
    tags: [],
    favorite: false,
  }
) => {
  article.id = uuidv4();
  fs.writeFile("./storage/" + article.id, JSON.stringify(article));
};

// !create one Array with all Articles

export const getAllArticle = () => {
  return fs.readdir("./storage").then((files) => {
    const array = [];
    for (const file of files) {
      const data = fsystem.readFileSync("./storage/" + file);
      const char = JSON.parse(data);
      array.push(char);
    }
    return array;
  });
};

// ! delete Blog

export const deleteArticle = (id) => {
  return fs.rm("/storage/" + id);
};
