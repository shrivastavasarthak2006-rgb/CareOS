import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());
app.use(express.json());

// Render provides PORT automatically
const PORT = process.env.PORT || 5000;

// =====================================================
// GEMINI API KEY
// =====================================================

if (!process.env.GEMINI_API_KEY) {
  console.log("❌ GEMINI_API_KEY MISSING");
  process.exit(1);
}

console.log("✅ GEMINI_API_KEY loaded");

// =====================================================
// GEMINI INITIALIZATION
// =====================================================

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

// =====================================================
// GEMINI MODELS
// =====================================================

const models = [
  "gemini-3.6-flash",
  "gemini-3.6-flash-lite",
  "gemini-3.1-flash-lite",
  "gemini-2.5-flash",
];

console.log("✅ Gemini AI initialized");
console.log("🔥 Available models:", models);

// =====================================================
// GEMINI GENERATION WITH FALLBACK
// =====================================================

async function generateWithFallback(prompt) {
  let lastError = null;

  for (const modelName of models) {
    try {
      console.log(
        `🔥 Trying Gemini model: ${modelName}`
      );

      const model = genAI.getGenerativeModel({
        model: modelName,
      });

      const result = await model.generateContent(
        prompt
      );

      const text = result.response
        .text()
        .trim();

      console.log(
        `✅ Gemini response received from: ${modelName}`
      );

      return text;

    } catch (error) {

      lastError = error;

      console.error(
        `⚠️ Gemini model failed: ${modelName}`
      );

      console.error(
        error?.message || error
      );

      // Try the next model
      continue;
    }
  }

  console.error(
    "❌ ALL GEMINI MODELS FAILED"
  );

  throw lastError;
}

// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/", (req, res) => {

  res.json({
    status: "OK",
    service: "CareOS Chatbot",
    models,
    timestamp: new Date().toISOString(),
  });

});

// =====================================================
// GEMINI TEST
// =====================================================

app.get("/gemini-test", async (req, res) => {

  try {

    console.log(
      "🔥 GEMINI TEST ROUTE HIT"
    );

    const reply = await generateWithFallback(
      "Reply only: OK"
    );

    console.log(
      "🔥 GEMINI TEST SUCCESS:",
      reply
    );

    res.json({
      success: true,
      reply: reply.trim(),
    });

  } catch (error) {

    console.error(
      "🔥 GEMINI TEST ERROR:",
      error?.message || error
    );

    res.status(500).json({
      success: false,
      error:
        error?.message ||
        "Gemini unavailable",
    });

  }

});

// =====================================================
// CHAT
// =====================================================

app.post("/chat", async (req, res) => {

  try {

    const userMessage =
      req.body.message?.trim();

    if (!userMessage) {

      return res.status(400).json({
        reply: "Please enter a message.",
      });

    }

    console.log(
      "🤖 Chat request:",
      userMessage
    );

    const language =
      req.body.language || "hinglish";

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

IMPORTANT SAFETY RULES:

- Give general healthcare information only.
- Do not claim to diagnose the patient.
- Do not prescribe medicines.
- Do not give exact treatment without a qualified doctor.
- Encourage the user to consult a qualified medical professional when appropriate.
- If the situation sounds like an emergency, advise immediate medical attention.
- Keep answers simple, useful and conversational.
- Do not unnecessarily scare the patient.

LANGUAGE:

${languageInstruction}

USER QUESTION:

${userMessage}
`;

    console.log(
      "🔥 Sending request to Gemini..."
    );

    const reply =
      await generateWithFallback(prompt);

    console.log(
      "✅ AI response sent"
    );

    return res.json({
      reply: reply.trim(),
      exit: false,
    });

  } catch (error) {

    console.error(
      "🔥 CHAT ERROR:",
      error?.message || error
    );

    return res.status(500).json({

      reply:
        "⚠️ CareOS AI is temporarily unavailable. Please try again in a moment.",

      error:
        error?.message ||
        "Gemini unavailable",

    });

  }

});

// =====================================================
// START SERVER
// =====================================================

app.listen(
  PORT,
  "0.0.0.0",
  () => {

    console.log(
      `🚀 CareOS Backend running on port ${PORT}`
    );

  }
);