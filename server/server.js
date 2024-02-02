import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path"

import { appConfig } from "./config/appConfig.js";
import { aiController } from "./controllers/aiController.js";

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
// app.use(
//   cors({
//     origin: appConfig.corsConfig.origin,
//     methods: appConfig.corsConfig.methods,
//     allowedHeaders: ["Content-Type", "application/json"],
//   })
// )
app.use(express.static(__dirname + '/public'));
// app.use(express.json());
    // parse application/json
    app.use(bodyParser.json({limit: '50mb'}));                        
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));
    // parse multipart/form-data
    // app.use(multer());

const PORT = process.env.PORT || 3000;

// Get Gemini API Response
app.post("/chat-with-gemini", aiController);

// App listening
app.listen(PORT, () => {
  console.log("Gemini AI Server is listening on port number", PORT);
});
