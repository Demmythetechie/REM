import express from 'express';
import cors from "cors";
import path from 'path';
import { fileURLToPath } from "url";
import auth from './routes/authentication.js';
const app = express()
const port = 3000
const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Set EJS as the template engine (This is for the rendered html for email confirmation)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "emailTemplate")); // Ensure views folder exists

// Pass base directory down to routes (if needed)
app.set('baseDir', __dirname);

app.use(cors(corsOptions));
app.use(express.json());


//Routes
app.use('/authentication', auth);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
