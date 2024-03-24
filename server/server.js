import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import axios from "axios";
dotenv.config();

const apiKey = process.env.API_KEY;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = 3000;

const app = express();

app.use("/client", express.static(path.join(__dirname, "../client")));

app.get("/api/data/:paramValue", async (req, res) => {
  const ingredients = req.params.paramValue;
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=30&apiKey=${apiKey}`
  );
  res.json(response.data);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
