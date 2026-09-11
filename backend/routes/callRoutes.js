import express from "express";
import Patient from "../models/Patient.js";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

/* =========================================================
   GEMINI AI
========================================================= */

const apiKey = process.env.GEMINI_API_KEY;

const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
    })
  : null;

/* =========================================================
   CALL SESSIONS
========================================================= */

const callSessions = new Map();

/* =========================================================
   QUESTIONS - ENGLISH
========================================================= */

const englishQuestions = [
  {
    key: "name",
    text: "Please tell me your full name.",
  },
  {
    key: "age",
    text: "Please tell me your age.",
  },
  {
    key: "problem",
    text: "What health problem or symptoms are you experiencing?",
  },
  {
    key: "duration",
    text: "How long have you been experiencing this problem?",
  },
  {
    key: "severity",
    text: "How would you describe the severity of your problem: mild, moderate, severe, or critical?",
  },
  {
    key: "previousConsultation",
    text: "Have you shown this problem to a doctor before? Please say yes or no.",
  },
  {
    key: "hasMedicalRecords",
    text: "Do you have any previous medical records? Please say yes or no.",
  },
];

/* =========================================================
   QUESTIONS - HINDI
========================================================= */

const hindiQuestions = [
  {
    key: "name",
    text: "कृपया अपना पूरा नाम बताइए।",
  },
  {
    key: "age",
    text: "कृपया अपनी उम्र बताइए।",
  },
  {
    key: "problem",
    text: "आपको किस स्वास्थ्य समस्या या लक्षण का सामना करना पड़ रहा है?",
  },
  {
    key: "duration",
    text: "आपको यह समस्या कितने समय से है?",
  },
  {
    key: "severity",
    text: "आपकी समस्या कितनी गंभीर है? कृपया हल्की, मध्यम, गंभीर या बहुत गंभीर में से बताइए।",
  },
  {
    key: "previousConsultation",
    text: "क्या आपने इस समस्या के लिए पहले किसी डॉक्टर को दिखाया है? कृपया हाँ या नहीं में बताइए।",
  },
  {
    key: "hasMedicalRecords",
    text: "क्या आपके पास पहले के मेडिकल रिकॉर्ड हैं? कृपया हाँ या नहीं में बताइए।",
  },
];

/* =========================================================
   LANGUAGE DETECTION
========================================================= */

const detectLanguage = (speech) => {
  const text = speech?.toLowerCase().trim() || "";

  if (
    text.includes("hindi") ||
    text.includes("हिंदी") ||
    text.includes("हिन्दी") ||
    text.includes("हिंदी में")
  ) {
    return "hi";
  }

  if (
    text.includes("english") ||
    text.includes("इंग्लिश") ||
    text.includes("अंग्रेजी")
  ) {
    return "en";
  }

  return null;
};

/* =========================================================
   ANSWER HELPERS
========================================================= */

const detectYes = (text) => {
  return /yes|yeah|yep|yup|haan|ha|हाँ|हां/i.test(text || "");
};

const detectSeverity = (text) => {
  const value = text?.toLowerCase() || "";

  if (
    value.includes("critical") ||
    value.includes("very severe") ||
    value.includes("बहुत गंभीर")
  ) {
    return "Critical";
  }

  if (
    value.includes("severe") ||
    value.includes("serious") ||
    value.includes("गंभीर")
  ) {
    return "Severe";
  }

  if (
    value.includes("mild") ||
    value.includes("हल्की") ||
    value.includes("हल्का")
  ) {
    return "Mild";
  }

  return "Moderate";
};

/* =========================================================
   GENERATE AI SUMMARY
========================================================= */

const generateAISummary = async (answers) => {
  try {
    if (!ai) {
      console.error("❌ GEMINI_API_KEY missing");
      return "";
    }

    const prompt = `
You are CareOS Reception AI.

Create a VERY SHORT patient summary for a hospital receptionist.

Use ONLY the information provided below.
Do not diagnose the patient.
Do not add medical facts that were not provided.

Patient Information:
Name: ${answers.name || "Unknown"}
Age: ${answers.age || "Not provided"}
Problem/Symptoms: ${answers.problem || "Not specified"}
Duration: ${answers.duration || "Not specified"}
Severity: ${answers.severity || "Not specified"}
Previous Doctor Consultation: ${
      answers.previousConsultation || "Not specified"
    }
Medical Records Available: ${
      answers.hasMedicalRecords || "Not specified"
    }

Write the summary in 2-3 short sentences.
Keep it simple and useful for reception staff.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    return response.text?.trim() || "";
  } catch (error) {
    console.error("❌ AI SUMMARY ERROR:", error);
    return "";
  }
};

/* =========================================================
   INCOMING CALL
========================================================= */

router.post("/incoming", (req, res) => {
  const callSid = req.body.CallSid;
  const phoneNumber = req.body.From || "";

  callSessions.set(callSid, {
    callSid,
    phoneNumber,
    language: null,
    currentStep: -1,
    answers: {},
  });

  res.type("text/xml");

  res.send(`
    <Response>
      <Gather
        input="speech"
        action="/api/calls/language"
        method="POST"
        speechTimeout="auto"
        language="en-IN"
      >
        <Say voice="alice" language="en-IN">
          Hello, welcome to CareOS AI Healthcare Assistant.
          I will help you register your basic health information.
          Please tell me your preferred language.
          You can say English or Hindi.
        </Say>

        <Say voice="alice" language="hi-IN">
          नमस्ते, CareOS AI Healthcare Assistant में आपका स्वागत है।
          मैं आपकी प्राथमिक स्वास्थ्य जानकारी दर्ज करने में आपकी सहायता करूंगा।
          कृपया अपनी पसंदीदा भाषा बताइए।
          आप English या Hindi बोल सकते हैं।
        </Say>
      </Gather>

      <Say voice="alice" language="en-IN">
        We could not understand your language preference. Please call again.
      </Say>

      <Hangup/>
    </Response>
  `);
});

/* =========================================================
   LANGUAGE SELECTION
========================================================= */

router.post("/language", (req, res) => {
  const callSid = req.body.CallSid;
  const speechResult = req.body.SpeechResult || "";

  const session = callSessions.get(callSid);

  res.type("text/xml");

  if (!session) {
    return res.send(`
      <Response>
        <Say voice="alice" language="en-IN">
          Sorry, your session has expired. Please call again.
        </Say>
        <Hangup/>
      </Response>
    `);
  }

  const language = detectLanguage(speechResult);

  if (!language) {
    return res.send(`
      <Response>
        <Gather
          input="speech"
          action="/api/calls/language"
          method="POST"
          speechTimeout="auto"
          language="en-IN"
        >
          <Say voice="alice" language="en-IN">
            Please say English or Hindi.
          </Say>

          <Say voice="alice" language="hi-IN">
            कृपया English या Hindi बोलें।
          </Say>
        </Gather>

        <Hangup/>
      </Response>
    `);
  }

  session.language = language;
  session.currentStep = 0;

  const questions =
    language === "hi"
      ? hindiQuestions
      : englishQuestions;

  const firstQuestion = questions[0].text;

  const voiceLanguage =
    language === "hi" ? "hi-IN" : "en-IN";

  return res.send(`
    <Response>
      <Gather
        input="speech"
        action="/api/calls/process"
        method="POST"
        speechTimeout="auto"
        language="${voiceLanguage}"
      >
        <Say voice="alice" language="${voiceLanguage}">
          ${language === "hi" ? "ठीक है।" : "Okay."}
          ${firstQuestion}
        </Say>
      </Gather>

      <Hangup/>
    </Response>
  `);
});

/* =========================================================
   PROCESS PATIENT RESPONSE
========================================================= */

router.post("/process", async (req, res) => {
  try {
    const callSid = req.body.CallSid;

    const speechResult =
      req.body.SpeechResult?.trim() || "";

    const session = callSessions.get(callSid);

    res.type("text/xml");

    if (!session) {
      return res.send(`
        <Response>
          <Say voice="alice" language="en-IN">
            Sorry, your session has expired. Please call again.
          </Say>
          <Hangup/>
        </Response>
      `);
    }

    const questions =
      session.language === "hi"
        ? hindiQuestions
        : englishQuestions;

    const currentQuestion =
      questions[session.currentStep];

    if (!currentQuestion) {
      return res.send(`
        <Response>
          <Say voice="alice" language="en-IN">
            Your registration is already complete.
          </Say>
          <Hangup/>
        </Response>
      `);
    }

    /* =====================================================
       SAVE CURRENT ANSWER
    ===================================================== */

    session.answers[currentQuestion.key] =
      speechResult;

    session.currentStep += 1;

    /* =====================================================
       REGISTRATION COMPLETE
    ===================================================== */

    if (session.currentStep >= questions.length) {
      const answers = session.answers;

      console.log("📞 Call completed");
      console.log("📝 Answers:", answers);

      /* =====================================================
         GENERATE AI SUMMARY
      ===================================================== */

      const aiSummary = await generateAISummary(
        answers
      );

      console.log(
        "🤖 AI Summary:",
        aiSummary
      );

      /* =====================================================
         SAVE PATIENT + SUMMARY TO MONGODB
      ===================================================== */

      const patient = await Patient.create({
        name: answers.name || "Unknown Patient",

        age:
          Number.parseInt(
            answers.age?.replace(/\D/g, ""),
            10
          ) || 0,

        phoneNumber: session.phoneNumber,

        problem:
          answers.problem || "Not specified",

        duration:
          answers.duration || "",

        severity: detectSeverity(
          answers.severity
        ),

        previousConsultation:
          detectYes(
            answers.previousConsultation
          ),

        hasMedicalRecords:
          detectYes(
            answers.hasMedicalRecords
          ),

        aiSummary: aiSummary,

        callSessionId: callSid,

        callTranscript:
          Object.values(answers).join("\n"),

        status: "reception_pending",
      });

      console.log(
        "✅ Patient + AI Summary saved:",
        patient.name
      );

      callSessions.delete(callSid);

      const language = session.language;

      if (language === "hi") {
        return res.send(`
          <Response>
            <Say voice="alice" language="hi-IN">
              धन्यवाद। आपका CareOS में रजिस्ट्रेशन पूरा हो गया है।
              आपकी जानकारी अस्पताल की रिसेप्शन टीम को भेज दी गई है।
              हमारी टीम जल्द ही आपकी सहायता करेगी।
              आपका दिन शुभ हो।
            </Say>
            <Hangup/>
          </Response>
        `);
      }

      return res.send(`
        <Response>
          <Say voice="alice" language="en-IN">
            Thank you. Your CareOS registration is complete.
            Your information has been sent to the hospital reception team.
            Our team will assist you shortly.
            Have a good day.
          </Say>
          <Hangup/>
        </Response>
      `);
    }

    /* =====================================================
       NEXT QUESTION
    ===================================================== */

    const nextQuestion =
      questions[session.currentStep].text;

    const voiceLanguage =
      session.language === "hi"
        ? "hi-IN"
        : "en-IN";

    return res.send(`
      <Response>
        <Gather
          input="speech"
          action="/api/calls/process"
          method="POST"
          speechTimeout="auto"
          language="${voiceLanguage}"
        >
          <Say voice="alice" language="${voiceLanguage}">
            ${nextQuestion}
          </Say>
        </Gather>

        <Hangup/>
      </Response>
    `);

  } catch (error) {
    console.error(
      "❌ CALL PROCESSING ERROR:",
      error
    );

    res.type("text/xml");

    return res.send(`
      <Response>
        <Say voice="alice" language="en-IN">
          Sorry, we are unable to process your information right now.
          Please try again later.
        </Say>
        <Hangup/>
      </Response>
    `);
  }
});

export default router;