import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    problem: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: String,
      trim: true,
    },

    severity: {
      type: String,
      enum: ["Mild", "Moderate", "Severe", "Critical"],
      default: "Moderate",
    },

    previousConsultation: {
      type: Boolean,
      default: false,
    },

    hasMedicalRecords: {
      type: Boolean,
      default: false,
    },

    documents: [
      {
        fileName: String,
        fileUrl: String,
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    aiSummary: {
      type: String,
      default: "",
    },

    callSessionId: {
      type: String,
      default: "",
    },

    callTranscript: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "registered",
        "reception_pending",
        "proceeded_to_doctor",
        "completed",
      ],
      default: "reception_pending",
    },
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;