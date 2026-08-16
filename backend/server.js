import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;


// ======================================================
// CHECK GEMINI API KEY
// ======================================================

if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is missing in backend/.env");
  process.exit(1);
}


// ======================================================
// GEMINI CLIENT
// ======================================================

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


// ======================================================
// MIDDLEWARE
// ======================================================

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());


// ======================================================
// HOME ROUTE
// ======================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CareOS AI Backend is running 🚀",
    status: "online",
    provider: "Google Gemini",
  });
});


// ======================================================
// HEALTH CHECK
// ======================================================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "CareOS Gemini chatbot server is healthy",
    provider: "Google Gemini",
    timestamp: new Date().toISOString(),
  });
});


// ======================================================
// CHAT API
// ======================================================

app.post("/api/chat", async (req, res) => {
  try {

    const {
      message,
      conversation = [],
    } = req.body;


    // ==================================================
    // VALIDATE MESSAGE
    // ==================================================

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        success: false,
        error: "Message is required.",
      });
    }

    const userMessage = message.trim();


    if (!userMessage) {
      return res.status(400).json({
        success: false,
        error: "Please enter a message.",
      });
    }


    // ==================================================
    // EXIT COMMAND
    // ==================================================

    const exitCommands = [
      "exit",
      "quit",
      "bye",
      "goodbye",
      "close chat",
      "close chatbot",
      "end chat",
    ];


    if (
      exitCommands.includes(
        userMessage.toLowerCase()
      )
    ) {

      return res.json({
        success: true,
        exit: true,
        reply:
          "Okay 😊 Chat ended. Take care! If you need help again, you can start a new conversation.",
      });

    }


    // ==================================================
    // SYSTEM INSTRUCTIONS
    // ==================================================

    const systemInstruction = `
You are CareOS AI, the intelligent healthcare assistant inside the CareOS healthcare platform.

You should behave like a modern conversational AI assistant.

Your personality:
- Friendly
- Helpful
- Calm
- Natural
- Patient
- Conversational
- Professional but not robotic

==================================================
LANGUAGE RULES
==================================================

1. Understand Hindi, English and Hinglish.

2. If the user speaks in Hinglish, respond naturally in Hinglish.

3. If the user speaks primarily in Hindi, respond in Hindi.

4. If the user speaks in English, respond in English.

5. Do NOT unnecessarily convert Hinglish into very formal Hindi.

6. Use simple language that normal users can understand.

7. Medical terms can remain in English when that is more natural.

Example:

User:
"Mujhe fever hai aur body pain bhi ho raha hai."

Good response style:
"Fever aur body pain ke multiple reasons ho sakte hain. Agar fever high hai, continuously badh raha hai, ya saath mein breathing problem, confusion, severe weakness etc. ho, toh doctor se jaldi consult karna better hai."

==================================================
CONVERSATION
==================================================

- Remember the previous messages in the conversation.
- Answer follow-up questions using previous context.
- Do not restart the conversation unnecessarily.
- Do not repeatedly introduce yourself.
- Talk naturally like a helpful AI assistant.
- Keep answers concise unless the user asks for detail.
- Use bullet points when helpful.

==================================================
CAREOS CONTEXT
==================================================

CareOS is an AI-native healthcare operating system.

CareOS can help connect and manage healthcare workflows involving:

- Doctors
- Nurses
- Patients
- Patient families
- Patient information
- Healthcare records
- AI-assisted notes
- Context-aware summaries
- Care coordination
- Patient communication
- Healthcare workflow management

If the user asks what CareOS is, explain it clearly and simply.

==================================================
HEALTHCARE SAFETY
==================================================

You are a healthcare information assistant.

You are NOT a replacement for a qualified doctor.

Do not:
- Claim a diagnosis with certainty.
- Invent patient records.
- Invent test results.
- Invent medications.
- Invent allergies.
- Invent medical history.
- Prescribe dangerous treatments.

For serious or emergency symptoms, recommend seeking immediate professional medical care.

If the user asks about a medical condition, provide general educational information and encourage appropriate professional consultation when necessary.

==================================================
IMPORTANT
==================================================

If the user types:
"exit"
"quit"
"bye"
"goodbye"
"close chat"
"close chatbot"
"end chat"

the application handles the exit separately.

Do not argue with the user.

Always prioritize:
- Safety
- Clarity
- Helpfulness
- Natural conversation
- Context awareness
`;


// ==================================================
// BUILD CONVERSATION HISTORY
// ==================================================

const safeConversation = Array.isArray(conversation)
  ? conversation
      .filter(
        (item) =>
          item &&
          typeof item.role === "string" &&
          typeof item.content === "string"
      )
      .slice(-20)
  : [];


// ==================================================
// CREATE GEMINI CONTENT
// ==================================================

const contents = [];


// Add previous conversation

for (const item of safeConversation) {

  const role =
    item.role === "assistant"
      ? "model"
      : "user";

  contents.push({
    role: role,
    parts: [
      {
        text: item.content,
      },
    ],
  });

}


// Add current user message

contents.push({
  role: "user",
  parts: [
    {
      text: userMessage,
    },
  ],
});


// ==================================================
// GEMINI REQUEST
// ==================================================

const response =
  await ai.models.generateContent({

    model: "gemini-3.5-flash",

    contents: contents,

    config: {
      systemInstruction: systemInstruction,

      temperature: 0.7,

      maxOutputTokens: 800,
    },

  });


// ==================================================
// GET RESPONSE TEXT
// ==================================================

const reply =
  response.text?.trim() ||
  "Sorry, mujhe abhi response generate karne mein problem aa rahi hai.";


// ==================================================
// SEND RESPONSE
// ==================================================

return res.json({
  success: true,
  exit: false,
  reply: reply,
  provider: "Google Gemini",
});


  } catch (error) {

    console.error("");
    console.error("❌ GEMINI CHAT ERROR");
    console.error("====================");
    console.error(error);
    console.error("====================");


    // ==================================================
    // GEMINI API ERROR
    // ==================================================

    if (error?.status) {

      return res.status(error.status).json({
        success: false,
        error:
          error?.message ||
          "Gemini API se response nahi aa raha hai.",
      });

    }


    // ==================================================
    // GENERAL ERROR
    // ==================================================

    return res.status(500).json({
      success: false,
      error:
        "Gemini server error. Please check your API key and backend configuration.",
    });

  }
});


// ======================================================
// 404 HANDLER
// ======================================================

app.use((req, res) => {

  res.status(404).json({
    success: false,
    error: "API route not found.",
  });

});


// ======================================================
// START SERVER
// ======================================================

app.listen(PORT, () => {

  console.log("");
  console.log("==========================================");
  console.log("🚀 CareOS AI Backend Started");
  console.log("==========================================");
  console.log(`🌐 Server: http://localhost:${PORT}`);
  console.log(`🤖 Chat API: http://localhost:${PORT}/api/chat`);
  console.log(`❤️ Health: http://localhost:${PORT}/api/health`);
  console.log("🧠 AI Provider: Google Gemini");
  console.log("==========================================");
  console.log("");

});