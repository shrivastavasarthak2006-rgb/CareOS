import express from "express";
import Patient from "../models/Patient.js";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const detectSeverity = (value = "") => {
  const text = value.toLowerCase();

  if (
    text.includes("critical") ||
    text.includes("very severe") ||
    text.includes("life threatening")
  ) {
    return "Critical";
  }

  if (text.includes("severe")) {
    return "Severe";
  }

  if (text.includes("mild")) {
    return "Mild";
  }

  return "Moderate";
};

const detectYes = (value = "") => {
  const text = value.toLowerCase().trim();

  return (
    text === "yes" ||
    text === "true" ||
    text.includes("yes")
  );
};

const generateAISummary = async (data) => {
  try {
    const prompt = `
Create a very short medical reception summary from the following patient call information.

Patient:
Name: ${data.name}
Age: ${data.age}
Problem: ${data.problem}
Duration: ${data.duration}
Severity: ${data.severity}
Previous consultation: ${data.previousConsultation}
Medical records available: ${data.hasMedicalRecords}

Requirements:
- Maximum 2 short sentences.
- Mention the main complaint and important details.
- Do not diagnose.
- Do not give treatment advice.
- This summary is for hospital reception/doctor review.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    return (
      response.text?.trim() ||
      `${data.name} reported ${data.problem}.`
    );
  } catch (error) {
    console.error("❌ Gemini Summary Error:", error);

    return `${data.name} reported ${data.problem}.`;
  }
};
router.get("/test", (req, res) => {
  console.log("✅ ElevenLabs route is reachable");
  res.json({
    success: true,
    message: "ElevenLabs route is working",
  });
});

// ElevenLabs webhook
router.post("/patient", async (req, res) => {
  try {
    console.log("📞 ElevenLabs webhook received:");
    console.log(req.body);

    const {
      name,
      age,
      problem,
      duration,
      severity,
      previousConsultation,
      hasMedicalRecords,
      phoneNumber,
      callSessionId,
    } = req.body;

    if (!name || !problem) {
      return res.status(400).json({
        success: false,
        message: "Name and problem are required",
      });
    }

    const patientData = {
      name: String(name).trim(),
      age: Number.parseInt(String(age).replace(/\D/g, ""), 10) || 0,

      phoneNumber:
        phoneNumber ||
        "Not available",

      problem: String(problem).trim(),

      duration: duration
        ? String(duration).trim()
        : "",

      severity: detectSeverity(severity),

      previousConsultation:
        detectYes(previousConsultation),

      hasMedicalRecords:
        detectYes(hasMedicalRecords),

      callSessionId:
        callSessionId || "",

      status: "reception_pending",
    };

    // Generate Gemini summary
    const aiSummary = await generateAISummary(patientData);

    // Save to MongoDB
    const patient = await Patient.create({
      ...patientData,
      aiSummary,
    });

    console.log("✅ Patient saved to MongoDB:", patient._id);

    return res.status(201).json({
      success: true,
      message: "Patient data saved successfully",
      patientId: patient._id,
      aiSummary,
    });

  } catch (error) {
    console.error("🔥 ElevenLabs Webhook Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save patient data",
      error: error.message,
    });
  }
});

export default router;