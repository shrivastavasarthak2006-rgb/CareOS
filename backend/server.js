import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* ================================
   GEMINI API KEY
================================ */

if (!process.env.GEMINI_API_KEY) {
  console.log("❌ GEMINI_API_KEY MISSING");
} else {
  console.log("✅ GEMINI_API_KEY loaded");
}

/* ================================
   GEMINI SETUP
================================ */

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

console.log("✅ Gemini 2.5 Flash loaded");

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
    const userMessage = req.body.message?.trim();

    if (!userMessage) {
      return res.status(400).json({
        reply: "Please enter a message",
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
- Always recommend consulting a doctor for diagnosis or treatment when appropriate.
- For emergencies, advise the user to seek immediate emergency medical care.

Current date:
${new Date().toLocaleDateString()}

User question:
${userMessage}
`;

    const result = await model.generateContent(prompt);

    const reply = result.response.text();

    console.log("✅ AI response generated");

    return res.json({
      reply:
        reply?.trim() ||
        "Medical assistant ready to help!",
    });

  } catch (error) {
    console.error("🔥 GEMINI CHAT ERROR:");
    console.error(error);

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