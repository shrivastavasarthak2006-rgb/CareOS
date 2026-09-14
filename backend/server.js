import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import connectDB from "./config/db.js";
import patientRoutes from "./routes/patientRoutes.js";
import callRoutes from "./routes/callRoutes.js";
import elevenLabsRoutes from "./routes/elevenLabsRoutes.js";

console.log("🔥🔥🔥 NEW CAREOS SERVER CODE LOADED 🔥🔥🔥");

dotenv.config();

// =====================================================
// DATABASE
// =====================================================

connectDB()
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Failed:", error);
  });

// =====================================================
// EXPRESS
// =====================================================

const app = express();

app.use(cors());
app.use(express.json());

// =====================================================
// EXISTING CAREOS ROUTES
// =====================================================

app.use("/api/patients", patientRoutes);
app.use("/api/calls", callRoutes);
app.use("/api/elevenlabs", elevenLabsRoutes);

// =====================================================
// GEMINI API KEY
// =====================================================

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("❌ GEMINI_API_KEY MISSING");
} else {
  console.log("✅ GEMINI_API_KEY loaded");
}

// =====================================================
// GEMINI SETUP
// =====================================================

const ai = new GoogleGenAI({
  apiKey: apiKey,
});

console.log("✅ Gemini AI initialized");

console.log("🔥 PRIMARY MODEL: gemini-3.6-flash");
console.log("🛟 FALLBACK MODEL: gemini-3.6-flash-lite");

// =====================================================
// GEMINI FALLBACK FUNCTION
// =====================================================

async function generateWithFallback(prompt) {
  try {
    console.log("🔥 Trying primary Gemini model...");

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    console.log("✅ Primary Gemini response received");

    return response.text;

  } catch (primaryError) {

    console.error(
      "⚠️ PRIMARY GEMINI ERROR:",
      primaryError.message
    );

    // Fallback only for temporary server/model availability
    if (
      primaryError.status === 503 ||
      primaryError.status === 500 ||
      primaryError.status === 502 ||
      primaryError.status === 504
    ) {

      console.log("🛟 Trying fallback Gemini model...");

      try {

        const fallbackResponse =
          await ai.models.generateContent({
            model: "gemini-3.6-flash-lite",
            contents: prompt,
          });

        console.log("✅ FALLBACK GEMINI RESPONSE RECEIVED");

        return fallbackResponse.text;

      } catch (fallbackError) {

        console.error(
          "🔥 FALLBACK GEMINI ERROR:",
          fallbackError.message
        );

        throw fallbackError;
      }
    }

    // Do not blindly retry quota/authentication errors
    throw primaryError;
  }
}

// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    service: "CareOS Backend",
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
      "Reply only: CareOS chatbot is working."
    );

    console.log("🔥 GEMINI TEST SUCCESS");

    return res.json({
      success: true,
      reply: reply?.trim() || "OK",
    });

  } catch (error) {

    console.error(
      "🔥 GEMINI TEST ERROR:",
      error.message
    );

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// =====================================================
// OLD CHAT TEST ROUTE
// =====================================================

app.post("/chat-test", async (req, res) => {
  try {

    console.log("🔥 CHAT TEST ROUTE HIT");

    const reply = await generateWithFallback(
      "Reply only: CareOS chatbot is working."
    );

    return res.json({
      success: true,
      reply: reply?.trim() || "OK",
    });

  } catch (error) {

    console.error("🔥 CHAT TEST ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// =====================================================
// CHAT API
// =====================================================

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

    const language = req.body?.language || "hinglish";

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
You are CareOS Medical Assistant for healthcare professionals and patients.

Your role:
- Provide general medical information.
- Use clear and appropriate medical terminology.
- Base responses on evidence-based medical knowledge.
- Do not claim to diagnose a patient.
- Do not replace a qualified doctor.
- Do not prescribe medicines.
- Recommend consulting a qualified doctor when appropriate.
- For emergencies, advise the user to seek immediate emergency medical care.
- Keep responses simple, useful and conversational.

LANGUAGE:
${languageInstruction}

Current date:
${new Date().toLocaleDateString()}

User question:
${userMessage}
`;

    console.log("🔥 Sending request to Gemini...");

    const reply = await generateWithFallback(prompt);

    console.log("✅ AI response generated");

    return res.json({
      reply:
        reply?.trim() ||
        "Medical assistant ready to help!",
      exit: false,
    });

  } catch (error) {

    console.error("🔥 GEMINI CHAT ERROR:", error);

    return res.status(500).json({
      reply:
        "⚠️ CareOS AI is temporarily unavailable. Please try again.",
    });
  }
});

// =====================================================
// START SERVER
// =====================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `🚀 CareOS Backend running on port ${PORT}`
  );
});

export default app;
