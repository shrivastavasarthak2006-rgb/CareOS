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

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Primary model
const primaryModel = genAI.getGenerativeModel({
  model: "gemini-3.6-flash",
});

// Fallback model
const fallbackModel = genAI.getGenerativeModel({
  model: "gemini-3.6-flash-lite",
});

console.log("✅ Gemini AI initialized");
console.log("🔥 Primary Model: gemini-3.6-flash");
console.log("🛟 Fallback Model: gemini-3.6-flash-lite");

// =====================================================
// GEMINI GENERATION WITH FALLBACK
// =====================================================

async function generateWithFallback(prompt) {
  try {
    console.log("🔥 Trying Gemini 3.6 Flash...");

    const result = await primaryModel.generateContent(prompt);

    console.log("✅ Primary Gemini response received");

    return result.response.text();

  } catch (primaryError) {

    console.error(
      "⚠️ PRIMARY GEMINI ERROR:",
      primaryError.message
    );

    // Only fallback for temporary availability/server errors
    if (
      primaryError.status === 503 ||
      primaryError.status === 500 ||
      primaryError.status === 502 ||
      primaryError.status === 504
    ) {

      console.log("🛟 Trying fallback Gemini model...");

      try {
        const fallbackResult =
          await fallbackModel.generateContent(prompt);

        console.log("✅ FALLBACK GEMINI RESPONSE RECEIVED");

        return fallbackResult.response.text();

      } catch (fallbackError) {

        console.error(
          "🔥 FALLBACK GEMINI ERROR:",
          fallbackError.message
        );

        throw fallbackError;
      }
    }

    // For errors like 401 / 403 / 429,
    // don't blindly retry another model
    throw primaryError;
  }
}

// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    service: "CareOS Chatbot",
    primaryModel: "gemini-3.6-flash",
    fallbackModel: "gemini-3.6-flash-lite",
    timestamp: new Date().toISOString(),
  });
});

// =====================================================
// GEMINI TEST
// =====================================================

app.get("/gemini-test", async (req, res) => {
  try {

    console.log("🔥 GEMINI TEST ROUTE HIT");

    const reply = await generateWithFallback(
      "Reply only: OK"
    );

    console.log("🔥 GEMINI TEST SUCCESS:", reply);

    res.json({
      success: true,
      reply: reply.trim(),
    });

  } catch (error) {

    console.error(
      "🔥 GEMINI TEST ERROR:",
      error.message
    );

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
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

    console.log("🔥 Sending request to Gemini...");

    const reply = await generateWithFallback(prompt);

    console.log("✅ AI response sent");

    return res.json({
      reply: reply.trim(),
      exit: false,
    });

  } catch (error) {

    console.error(
      "🔥 CHAT ERROR:",
      error.message
    );

    return res.status(500).json({

      reply:
        "⚠️ CareOS AI is temporarily unavailable. Please try again in a moment.",

      error: error.message,

    });
  }
});

// =====================================================
// START SERVER
// =====================================================

app.listen(PORT, "0.0.0.0", () => {

  console.log(
    `🚀 CareOS Backend running on port ${PORT}`
  );

});
