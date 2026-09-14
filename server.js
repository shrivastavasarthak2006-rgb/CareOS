import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// =====================================================
// GEMINI API KEY
// =====================================================

if (!process.env.GEMINI_API_KEY) {
  console.log("❌ GEMINI_API_KEY MISSING");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Use Gemini model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

console.log("✅ Gemini initialized");

// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    service: "CareOS Chatbot",
    timestamp: new Date().toISOString(),
  });
});

// =====================================================
// CHAT
// =====================================================

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message?.trim();

    if (!userMessage) {
      return res.status(400).json({
        reply: "Please enter a message.",
      });
    }

    console.log("🤖 Chat request:", userMessage);

    const language = req.body.language || "hinglish";

    let languageInstruction = "";

    if (language === "hindi") {
      languageInstruction =
        "Respond in simple Hindi using Devanagari script.";
    } else if (language === "english") {
      languageInstruction =
        "Respond in clear and simple English.";
    } else {
      languageInstruction =
        "Respond in natural Hinglish using Roman Hindi mixed with simple English. Do not use Devanagari.";
    }

    const prompt = `
You are CareOS AI Assistant, an AI healthcare assistant.

You help patients and healthcare users with:
- General health information
- Symptoms
- Medical reports
- Tests
- Medicines
- Treatment information
- Appointment guidance

IMPORTANT:
- Give general healthcare information only.
- Do not claim to diagnose the patient.
- Do not prescribe medicines or give exact treatment without a doctor.
- Encourage the user to consult a qualified medical professional when appropriate.
- If the situation sounds like an emergency, advise immediate medical attention.
- Keep answers simple, useful and conversational.

LANGUAGE:
${languageInstruction}

USER QUESTION:
${userMessage}
`;

    const result = await model.generateContent(prompt);

    const reply =
      result?.response?.text()?.trim() ||
      "Sorry, I could not generate a response.";

    console.log("✅ AI response sent");

    return res.json({
      reply,
      exit: false,
    });

  } catch (error) {
    console.error("🔥 CHAT ERROR:", error);

    return res.status(500).json({
      reply:
        "⚠️ CareOS AI is temporarily unavailable. Please try again.",
    });
  }
});

// =====================================================
// START SERVER
// =====================================================

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 CareOS Chatbot running on port ${PORT}`);
});