import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* ================================
   GEMINI API KEY
================================ */

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("❌ GEMINI_API_KEY MISSING");
} else {
  console.log("✅ GEMINI_API_KEY loaded");
}

/* ================================
   GEMINI SETUP
================================ */

const ai = new GoogleGenAI({
  apiKey: apiKey,
});

console.log("✅ Gemini AI initialized");

/* ================================
   HEALTH CHECK
================================ */

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    service: "CareOS Backend",
    timestamp: new Date().toISOString(),
  });
});

/* ================================
   CHAT API
================================ */

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body?.message?.trim();

    if (!userMessage) {
      return res.status(400).json({
        reply: "Please enter a message",
      });
    }

    if (!apiKey) {
      console.error("❌ Gemini API key is missing");
      return res.status(500).json({
        reply: "Gemini API key is not configured.",
      });
    }

    console.log(
      "🤖 Chat request:",
      userMessage.substring(0, 100)
    );

    const prompt = `
You are CareOS Medical Assistant for healthcare professionals and patients.

Your role:
- Provide general medical information.
- Use clear and appropriate medical terminology.
- Base responses on evidence-based medical knowledge.
- Do not claim to diagnose a patient.
- Do not replace a qualified doctor.
- Recommend consulting a doctor for diagnosis or treatment when appropriate.
- For emergencies, advise the user to seek immediate emergency medical care.

Current date:
${new Date().toLocaleDateString()}

User question:
${userMessage}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const reply = response.text;

    console.log("✅ AI response generated");

    return res.json({
      reply:
        reply?.trim() ||
        "Medical assistant ready to help!",
    });

  } catch (error) {
    console.error("🔥 GEMINI CHAT ERROR:", error);

    return res.status(500).json({
      reply: "Service temporarily unavailable. Please try again.",
    });
  }
});

/* ================================
   LOCAL DEVELOPMENT
================================ */

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(
      `🚀 CareOS Backend running on http://localhost:${PORT}`
    );
  });
}

/* ================================
   VERCEL
================================ */

export default app;