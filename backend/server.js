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
connectDB()
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Failed:", error);
  });

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/patients", patientRoutes);
app.use("/api/calls", callRoutes);
app.use("/api/elevenlabs", elevenLabsRoutes);

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
console.log("🔥🔥🔥 CAREOS SERVER VERSION: GEMINI 3.6 🔥🔥🔥");

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
app.post("/chat-test", async (req, res) => {
  try {
    console.log("🔥 CHAT TEST ROUTE HIT");

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: "Reply only: CareOS chatbot is working.",
    });

    console.log("🔥 GEMINI 3.6 TEST SUCCESS");

    return res.json({
      success: true,
      reply: response.text,
    });
  } catch (error) {
    console.error("🔥 GEMINI 3.6 TEST ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

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
      model: "gemini-3.6-flash",
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

const PORT = process.env.PORT || 5000;

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 CareOS Backend running on http://localhost:${PORT}`);
  });

export default app;