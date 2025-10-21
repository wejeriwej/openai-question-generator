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

  const prompt = `Create a multiple choice style question similar to Passmedicine and the AKT papers with 5 different answer options from A to E, based on the following information:`;


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









//OSCESIM trial example//

app.post("/api/oscetrial", async (req, res) => {
  const { input, previousquestion, response_question } = req.body;


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
          { role: "system", content: "you're Marc, a 31 year old male. with constant severe heavy chest pain since this morning. You're in a consultation room & the Dr is asking you questions. Answer as Marc" },
          { role: "user", content: `Previous Dr question: ${previousquestion || "N/A"}
                                    Your previous response: ${response_question || "N/A"}
                                    New Dr question: ${input}
                                    Marc's answer:` },
        ],
        temperature: 0.1,
        max_tokens: 50,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      }),
    });

    const data = await response.json();
    res.json({ content: data.choices[0].message.content.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to connect to OpenAI" });
  }






/*

const voiceId = 'lqMuuvylPBO6NGJ3N3d4';
const apiKey = process.env.ELEVEN_LABS_API_KEY;

const headers = new Headers();
headers.append('Accept', 'audio/mpeg');
headers.append('xi-api-key', apiKey);
headers.append('Content-Type', 'application/json');

const body = JSON.stringify({
    text: text11L,
    model_id: 'eleven_monolingual_v1',
    voice_settings: {
        stability: 0.5,
        similarity_boost: 0.5
    }
});

// Call the Eleven Labs API for text-to-speech
fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`, {
    method: 'POST',
    headers: headers,
    body: body
})
.then(data => {
    if (data.ok) {
        return data.blob();  // If the response is OK (status 200-299), convert it to a Blob
    } else {
        throw new Error('Failed to synthesize speech');  // Throw an error if the response isn't OK
    }
})
.then(blob => {
    const url = window.URL.createObjectURL(blob);  // Create a URL for the blob (MP3 file)
    const audio = new Audio(url);  // Create a new Audio object with the URL
    audio.play();  // Play the audio
})
.catch(error => {
    console.error('Error:', error);  // Catch and log any errors
});

*/




});













//Don't delete this!!!
app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
