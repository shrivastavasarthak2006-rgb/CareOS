import express from "express";
import Patient from "../models/Patient.js";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ================================
// SEVERITY DETECTION
// ================================

const detectSeverity = (value = "") => {
  const text = String(value).toLowerCase();

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

// ================================
// YES / NO DETECTION
// ================================

const detectYes = (value = "") => {
  if (typeof value === "boolean") {
    return value;
  }

  const text = String(value).toLowerCase().trim();

  return (
    text === "yes" ||
    text === "true" ||
    text.includes("yes")
  );
};

// ================================
// AI SUMMARY
// ================================

const generateAISummary = async (data) => {
  const models = [
    "gemini-3.6-flash",
    "gemini-3.5-flash-lite",
    "gemini-3.1-flash-lite",
    "gemini-2.5-flash",
  ];

  const prompt = `
You are generating a patient intake summary for CareOS hospital staff.

Create a clear and professional summary using the patient information below.

Do NOT diagnose.
Do NOT recommend medicines or treatment.
Do NOT invent information.
Do not mention fields that are empty or "Not provided".

BASIC PATIENT INFORMATION

Name: ${data.name}
Age: ${data.age}
Phone Number: ${data.phoneNumber}
Main Problem: ${data.problem}
Duration: ${data.duration}
Severity: ${data.severity}
Previous Consultation: ${data.previousConsultation}
Medical Records Available: ${data.hasMedicalRecords}

DASHAVIDHA PARIKSHA

Prakriti: ${data.prakriti}
Vikriti: ${data.vikriti}
Sara: ${data.sara}
Samhanana: ${data.samhanana}
Pramana: ${data.pramana}
Satmya: ${data.satmya}
Satva: ${data.satva}
Ahara Shakti: ${data.aharaShakti}
Vaya: ${data.vaya}
Bala: ${data.bala}

AHARA

${data.ahara}

VIHARA

${data.vihara}

Format:

Patient Overview:
[patient details]

Health Concern:
[problem, duration, severity, previous consultation, medical records]

Dashavidha Pariksha:
[available information]

Ahara:
[available information]

Vihara:
[available information]
`;

  for (const model of models) {
    try {
      console.log(`🤖 Trying Gemini model: ${model}`);

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });

      const summary = response.text?.trim();

      if (summary) {
        console.log(`✅ Gemini summary generated using: ${model}`);
        return summary;
      }
    } catch (error) {
      console.error(
        `⚠️ Gemini model failed: ${model}`,
        error?.message || error
      );
    }
  }

  console.error(
    "❌ All Gemini models failed. Using fallback summary."
  );

  return `
Patient Overview:
Name: ${data.name}
Age: ${data.age}
Phone Number: ${data.phoneNumber}

Health Concern:
Problem: ${data.problem}
Duration: ${data.duration || "Not provided"}
Severity: ${data.severity || "Not provided"}
Previous Consultation: ${
    data.previousConsultation ? "Yes" : "No"
}
Medical Records: ${
    data.hasMedicalRecords
      ? "Available"
      : "Not available"
}

Dashavidha Pariksha:
Prakriti: ${data.prakriti || "Not provided"}
Vikriti: ${data.vikriti || "Not provided"}
Sara: ${data.sara || "Not provided"}
Samhanana: ${data.samhanana || "Not provided"}
Pramana: ${data.pramana || "Not provided"}
Satmya: ${data.satmya || "Not provided"}
Satva: ${data.satva || "Not provided"}
Ahara Shakti: ${
    data.aharaShakti || "Not provided"
}
Vaya: ${data.vaya || "Not provided"}
Bala: ${data.bala || "Not provided"}

Ahara:
${data.ahara || "Not provided"}

Vihara:
${data.vihara || "Not provided"}
`.trim();
};

// ================================
// TEST ROUTE
// ================================

router.get("/test", (req, res) => {
  console.log("✅ ElevenLabs route is reachable");

  res.json({
    success: true,
    message: "ElevenLabs route is working",
  });
});

// ================================
// ELEVENLABS WEBHOOK
// ================================

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

      prakriti,
      vikriti,
      sara,
      samhanana,
      pramana,
      satmya,
      satva,
      aharaShakti,
      vaya,
      bala,

      ahara,
      vihara,
    } = req.body;

    // ================================
    // REQUIRED FIELDS
    // ================================

    if (!name || !problem) {
      return res.status(400).json({
        success: false,
        message: "Name and problem are required",
      });
    }

    // ================================
    // PATIENT DATA
    // ================================

    const patientData = {
      name: String(name).trim(),

      age:
        Number.parseInt(
          String(age).replace(/\D/g, ""),
          10
        ) || 0,

      phoneNumber: phoneNumber
        ? String(phoneNumber).trim()
        : "Not available",

      problem: String(problem).trim(),

      duration: duration
        ? String(duration).trim()
        : "",

      severity: detectSeverity(severity),

      previousConsultation:
        detectYes(previousConsultation),

      hasMedicalRecords:
        detectYes(hasMedicalRecords),

      callSessionId: callSessionId
        ? String(callSessionId).trim()
        : "",

      prakriti: prakriti
        ? String(prakriti).trim()
        : "",

      vikriti: vikriti
        ? String(vikriti).trim()
        : "",

      sara: sara
        ? String(sara).trim()
        : "",

      samhanana: samhanana
        ? String(samhanana).trim()
        : "",

      pramana: pramana
        ? String(pramana).trim()
        : "",

      satmya: satmya
        ? String(satmya).trim()
        : "",

      satva: satva
        ? String(satva).trim()
        : "",

      aharaShakti: aharaShakti
        ? String(aharaShakti).trim()
        : "",

      vaya: vaya
        ? String(vaya).trim()
        : "",

      bala: bala
        ? String(bala).trim()
        : "",

      ahara: ahara
        ? String(ahara).trim()
        : "",

      vihara: vihara
        ? String(vihara).trim()
        : "",

      status: "reception_pending",

      // Temporary value.
      // Gemini will update this after saving.
      aiSummary: "Generating AI summary...",
    };

    // ==================================================
    // STEP 1 — SAVE TO MONGODB IMMEDIATELY
    // ==================================================

    const patient = await Patient.create(patientData);

    console.log(
      "✅ Patient saved to MongoDB:",
      patient._id
    );

    // ==================================================
    // STEP 2 — RESPOND TO ELEVENLABS IMMEDIATELY
    // ==================================================

    res.status(201).json({
      success: true,
      message: "Patient data saved successfully",
      patientId: patient._id,
    });

    // ==================================================
    // STEP 3 — GENERATE AI SUMMARY IN BACKGROUND
    // ==================================================

    generateAISummary(patientData)
      .then(async (aiSummary) => {
        try {
          await Patient.findByIdAndUpdate(
            patient._id,
            {
              aiSummary,
            }
          );

          console.log(
            "✅ AI summary updated:",
            patient._id
          );
        } catch (error) {
          console.error(
            "❌ Failed to update AI summary:",
            error?.message || error
          );
        }
      })
      .catch((error) => {
        console.error(
          "❌ Background AI summary failed:",
          error?.message || error
        );
      });

  } catch (error) {
    console.error(
      "🔥 ElevenLabs Webhook Error:",
      error
    );

    // Only send response if response hasn't already been sent
    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to save patient data",
        error: error.message,
      });
    }
  }
});

export default router;