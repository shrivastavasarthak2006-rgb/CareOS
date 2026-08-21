import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

if (!process.env.GEMINI_API_KEY) {
  console.log("❌ GEMINI_API_KEY MISSING");
} else {
  console.log("✅ GEMINI_API_KEY loaded");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

// HEALTH CHECK
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    service: "CareOS Backend",
    timestamp: new Date().toISOString(),
  });
});

// CHAT
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message?.trim();

    if (!userMessage) {
      return res.status(400).json({
        reply: "Please enter a message",
      });
    }

    const prompt = `
You are CareOS Medical Assistant for healthcare professionals and patients.

Medical guidelines:
- Use appropriate medical terminology.
- Base responses on evidence-based medicine.
- Always advise the user to consult a doctor for diagnosis or treatment.
- Do not claim to replace a medical professional.

Current date: ${new Date().toLocaleDateString()}

User's question:
${userMessage}
`;

    const result = await model.generateContent(prompt);

    const reply = result.response.text();

    res.json({
      reply: reply?.trim() || "Medical assistant ready to help!",
    });

  } catch (error) {
    console.error("🔥 CHAT ERROR:", error);

    res.status(500).json({
      reply: "Service temporarily unavailable. Please try again.",
    });
  }
});

export default app;