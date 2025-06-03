import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { OpenAI } from "openai";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // ou "gpt-4" se você tiver acesso
      messages: [{ role: "user", content: prompt }],
    });

    const resposta = completion.choices[0].message.content;
    res.json({ resposta });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao chamar OpenAI" });
  }
});

app.get("/", (req, res) => {
  res.send("API rodando.");
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});