# Blog server & api

# Install

npm init -y

npm i express

npm i

npm i cors

npm i uuid

npm install dotenv

# for files Upload:

npm i multer

npm install file-type

# Config

"type":"module" in package.json

- Create .gitignore with :

```

node_modules/
.vscode/
.env
storage/
uploads/


```

- Create a .env file with:

```
PORT=yourPort
CORS_ORIGIN=http://localhost:yourPort
DATABASE_PASSWORD=yourPassword

```

# import all in your files, for example:

```
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

```

- DONT FORGET! imports of files need the file end, for example: "./utils/filestorage.js";
