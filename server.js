import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors()); // Allow requests from your web page

app.post("/api/generate", async (req, res) => {
  const { input } = req.body;

  const prompt = `Create a multiple choice style question similar to Passmedicine and the AKT papers with 5 different answer options from A to E, based on the following information:`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", //gpt-4o-mini
        messages: [
          { role: "system", content: "You are a medical question writer familiar with Passmedicine and AKT-style questions." },
          { role: "user", content: `${prompt}\n${input}\nThere must only be 1 correct answer.` },
        ],
        temperature: 0.1,
        max_tokens: 300,
      }),
    });

    const data = await response.json();
    res.json({ content: data.choices[0].message.content.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to connect to OpenAI" });
  }
});









//next chatGPT example//

app.post("/api/song", async (req, res) => {
  const { topic } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a creative songwriter." },
          { role: "user", content: `Write a song about: ${topic}` },
        ],
        temperature: 0.7,
        max_tokens: 50,
      }),
    });

    const data = await response.json();
    res.json({ content: data.choices[0].message.content.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate song" });
  }
});







//Don't delete this!!!
app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
