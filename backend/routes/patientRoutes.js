import express from "express";
import Patient from "../models/Patient.js";

const router = express.Router();

// Register a new patient
router.post("/", async (req, res) => {
  try {
    const patient = await Patient.create(req.body);

    res.status(201).json({
      success: true,
      message: "Patient registered successfully",
      patient,
    });
  } catch (error) {
    console.error("❌ Patient Registration Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to register patient",
      error: error.message,
    });
  }
});

// Get all patients
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: patients.length,
      patients,
    });
  } catch (error) {
    console.error("❌ Fetch Patients Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch patients",
      error: error.message,
    });
  }
});

// Get single patient
router.get("/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    res.json({
      success: true,
      patient,
    });
  } catch (error) {
    console.error("❌ Fetch Patient Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch patient",
      error: error.message,
    });
  }
});

// Update patient status and department
router.patch("/:id/status", async (req, res) => {
  try {
    const { status, department } = req.body;

    const updateData = {
      status,
    };

    if (department) {
      updateData.department = department;
    }

    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    res.json({
      success: true,
      message: "Patient status and department updated",
      patient,
    });
  } catch (error) {
    console.error("❌ Status Update Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update patient status",
      error: error.message,
    });
  }
});

export default router;