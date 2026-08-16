import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// API KEY CHECK
if (!process.env.GEMINI_API_KEY) {
  console.log("❌ API KEY MISSING");
  process.exit(1);
}

// Gemini setup - Using stable model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
let model;
try {
  model = genAI.getGenerativeModel({ model: "gemini-pro" });
  console.log("✅ Gemini model 'gemini-pro' loaded");
} catch (e) {
  console.log("❌ gemini-pro failed, trying gemini-1.5-flash");
  model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
}

// ✅ HEALTH CHECK
app.get("/", (req, res) => {
  res.json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    model: model ? model.name.split('/').pop() : 'unknown'
  });
});

// ✅ CHAT ROUTE - Simple & Robust
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message?.trim();

    if (!userMessage) {
      return res.status(400).json({ reply: "Please enter a message" });
    }

    console.log("🤖 Chat request:", userMessage.substring(0, 50) + "...");

    // Medical context for CareOS
    const prompt = `You are CareOS Medical Assistant for healthcare professionals and patients.

Medical guidelines:
- Use appropriate medical terminology 
- Base responses on evidence-based medicine
- ALWAYS advise: "Consult your doctor for diagnosis/treatment"
- Current date: ${new Date().toLocaleDateString()}

Query: ${userMessage}`;

    const result = await model.generateContent(prompt);

    let reply = result.response.text();
    
    // Clean markdown bold/italics
    reply = reply.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1');
    
    console.log("✅ AI response sent");

    res.json({ reply: reply.trim() || "Medical assistant ready to help!" });

  } catch (error) {
    console.error("🔥 CHAT ERROR:", error.message);
    
    // Fallback responses
    if (error.message.includes('404') || error.message.includes('model')) {
      res.json({ reply: "Model temporarily unavailable. Try again or contact support." });
    } else {
      res.status(500).json({ reply: "Service temporarily unavailable. Please try again." });
    }
  }
});

app.listen(PORT, () => {
  console.log(`🚀 CareOS Backend + Gemini Medical AI running on http://localhost:${PORT}`);
  console.log(`📱 Test chat: curl -X POST http://localhost:${PORT}/chat -H "Content-Type: application/json" -d '{"message":"hello"}'`);
});

