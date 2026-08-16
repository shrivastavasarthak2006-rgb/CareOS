import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleNavigationHeader from '../../components/ui/RoleNavigationHeader';
import PatientContextBreadcrumb from '../../components/ui/PatientContextBreadcrumb';
import EmergencyAlertBanner from '../../components/ui/EmergencyAlertBanner';
import PatientHeader from './components/PatientHeader';
import VitalSignsChart from './components/VitalSignsChart';
import TreatmentTimeline from './components/TreatmentTimeline';
import MedicationTracker from './components/MedicationTracker';
import CareNotesPanel from './components/CareNotesPanel';
import AlertHistoryPanel from './components/AlertHistoryPanel';
import CareMilestoneTracker from './components/CareMilestoneTracker';
import Button from '../../components/ui/Button';

const PatientDetailAnalytics = () => {
  const navigate = useNavigate();
  const [currentRole, setCurrentRole] = useState('doctor');
  const [privacyMode, setPrivacyMode] = useState(false);
  const [activeTab, setActiveTab] = useState('vitals');
  const [emergencyAlerts, setEmergencyAlerts] = useState([]);

  const patientData = {
    name: "Avni Sharma",
    displayName: "Avni Sharma",
    patientId: "PT-2024-8847",
    age: 42,
    gender: "Female",
    room: "ICU-204",
    admissionDate: "01/05/2026",
    status: "monitoring",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17b3388db-1763293339823.png",
    avatarAlt: "Professional headshot of middle-aged woman with shoulder-length brown hair wearing light blue medical gown",
    primaryDoctor: "Ayush Jaiswal",
    assignedNurse: "Yamini Mathur",
    allergies: ["Penicillin", "Latex", "Shellfish"]
  };

  const vitalSignsData = [
  { time: "00:00", heartRate: 72, bloodPressure: 120, oxygen: 98, temperature: 98.6 },
  { time: "04:00", heartRate: 68, bloodPressure: 118, oxygen: 97, temperature: 98.4 },
  { time: "08:00", heartRate: 75, bloodPressure: 122, oxygen: 98, temperature: 98.7 },
  { time: "12:00", heartRate: 78, bloodPressure: 125, oxygen: 97, temperature: 98.8 },
  { time: "16:00", heartRate: 74, bloodPressure: 121, oxygen: 98, temperature: 98.5 },
  { time: "20:00", heartRate: 70, bloodPressure: 119, oxygen: 98, temperature: 98.6 },
  { time: "Now", heartRate: 73, bloodPressure: 120, oxygen: 98, temperature: 98.6 }];


  const treatmentEvents = [
  {
    type: "admission",
    title: "Patient Admitted to ICU",
    description: "Admitted for post-surgical monitoring following cardiac procedure",
    timestamp: "01/05/2026 08:30 AM",
    provider: "Dr. Ayush Jaiswal",
    status: "Completed",
    notes: "Patient stable, vitals within normal range"
  },
  {
    type: "procedure",
    title: "Coronary Angioplasty",
    description: "Minimally invasive procedure to open blocked coronary arteries",
    timestamp: "01/05/2026 10:00 AM",
    provider: "Dr. Ayush Jaiswal",
    status: "Completed",
    notes: "Procedure successful, two stents placed in LAD artery"
  },
  {
    type: "medication",
    title: "Post-Operative Medication Started",
    description: "Anticoagulant and pain management protocol initiated",
    timestamp: "01/05/2026 02:00 PM",
    provider: "Nurse Yamini Mathur",
    status: "Ongoing"
  },
  {
    type: "test",
    title: "Cardiac Enzyme Panel",
    description: "Blood work to monitor heart muscle damage markers",
    timestamp: "01/06/2026 06:00 AM",
    provider: "Lab Technician",
    status: "Completed",
    notes: "Troponin levels decreasing as expected"
  },
  {
    type: "consultation",
    title: "Cardiology Follow-up",
    description: "Post-procedure assessment and recovery evaluation",
    timestamp: "01/07/2026 09:00 AM",
    provider: "Dr. Ayush Jaiswal",
    status: "Completed",
    notes: "Patient showing excellent recovery progress"
  },
  {
    type: "vitals",
    title: "Vital Signs Monitoring",
    description: "Continuous cardiac and respiratory monitoring",
    timestamp: "01/08/2026 12:00 PM",
    provider: "Nurse Yamini Mathur",
    status: "Ongoing"
  }];


  const medications = [
  {
    name: "Aspirin",
    dosage: "81mg",
    frequency: "Once daily",
    route: "Oral",
    status: "active",
    prescribedBy: "Dr. Ayush Jaiswal",
    startDate: "01/05/2026",
    compliance: 95,
    nextDose: "Tomorrow 8:00 AM",
    notes: "Take with food to minimize stomach irritation"
  },
  {
    name: "Clopidogrel",
    dosage: "75mg",
    frequency: "Once daily",
    route: "Oral",
    status: "active",
    prescribedBy: "Dr. Ayush Jaiswal",
    startDate: "01/05/2026",
    compliance: 92,
    nextDose: "Tomorrow 8:00 AM",
    notes: "Continue for minimum 12 months post-stent placement"
  },
  {
    name: "Atorvastatin",
    dosage: "40mg",
    frequency: "Once daily at bedtime",
    route: "Oral",
    status: "active",
    prescribedBy: "Dr. Ayush Jaiswal",
    startDate: "01/05/2026",
    compliance: 88,
    nextDose: "Today 10:00 PM"
  },
  {
    name: "Metoprolol",
    dosage: "50mg",
    frequency: "Twice daily",
    route: "Oral",
    status: "active",
    prescribedBy: "Dr. Ayush Jaiswal",
    startDate: "01/06/2026",
    compliance: 90,
    nextDose: "Today 6:00 PM",
    notes: "Monitor heart rate and blood pressure"
  },
  {
    name: "Morphine",
    dosage: "2mg",
    frequency: "As needed for pain",
    route: "IV",
    status: "discontinued",
    prescribedBy: "Dr. Ayush Jaiswal",
    startDate: "01/05/2026",
    compliance: 100,
    notes: "Discontinued 01/07/2026 - pain well controlled"
  }];


  const careNotes = [
  {
    type: "clinical",
    author: "Dr. Ayush Jaiswal",
    content: "Patient showing excellent recovery progress. Cardiac enzymes trending down as expected. Plan to transfer to step-down unit tomorrow if vitals remain stable.",
    timestamp: "01/08/2026 10:30 AM",
    edited: false
  },
  {
    type: "nursing",
    author: "Nurse Yamini Mathur",
    content: "Patient ambulated 50 feet in hallway with minimal assistance. Tolerated activity well with no chest pain or shortness of breath. Vital signs stable throughout.",
    timestamp: "01/08/2026 02:15 PM",
    edited: false
  },
  {
    type: "clinical",
    author: "Dr.Tanushree Chauhan(Cardiology)",
    content: "Reviewed echocardiogram results. Left ventricular function improved compared to pre-procedure baseline. Ejection fraction now 55%. Continue current medication regimen.",
    timestamp: "01/07/2026 04:45 PM",
    edited: false
  },
  {
    type: "nursing",
    author: "Nurse Michael Torres",
    content: "Patient reports improved energy levels and decreased fatigue. Appetite improving. Family education provided regarding cardiac rehabilitation program.",
    timestamp: "01/07/2026 11:00 AM",
    edited: false,
    attachments: ["Cardiac_Rehab_Brochure.pdf"]
  },
  {
    type: "family",
    author: "Family Communication",
    content: "Spoke with patient\'s spouse regarding discharge planning. Discussed home medication management and follow-up appointments. Family expressed understanding and readiness.",
    timestamp: "01/06/2026 03:30 PM",
    edited: false
  }];


  const alertHistory = [
  {
    severity: "high",
    title: "Elevated Heart Rate",
    message: "Heart rate exceeded 100 bpm during physical therapy session. Returned to baseline within 5 minutes.",
    timestamp: "01/08/2026 11:45 AM",
    acknowledgedBy: "Nurse Yamini Mathur"
  },
  {
    severity: "medium",
    title: "Medication Due",
    message: "Metoprolol 50mg scheduled for administration at 6:00 PM",
    timestamp: "01/08/2026 05:45 PM",
    action: "Acknowledge"
  },
  {
    severity: "critical",
    title: "Blood Pressure Spike",
    message: "Blood pressure reading 145/95 mmHg. Physician notified and additional monitoring initiated.",
    timestamp: "01/07/2026 02:30 PM",
    acknowledgedBy: "Dr. Ayush Jaiswal"
  },
  {
    severity: "medium",
    title: "Lab Results Available",
    message: "Cardiac enzyme panel results ready for review",
    timestamp: "01/06/2026 08:15 AM",
    acknowledgedBy: "Dr. Ayush Jaiswal"
  },
  {
    severity: "high",
    title: "Oxygen Saturation Drop",
    message: "SpO2 dropped to 94% during sleep. Resolved with repositioning and supplemental oxygen.",
    timestamp: "01/06/2026 03:20 AM",
    acknowledgedBy: "Nurse Michael Torres"
  }];


  const careMilestones = [
  {
    title: "Successful Angioplasty",
    description: "Coronary artery blockage cleared with stent placement",
    status: "completed",
    targetDate: "01/05/2026",
    completedDate: "01/05/2026",
    assignedTo: "Dr. Ayush Jaiswal"
  },
  {
    title: "Post-Op Monitoring Complete",
    description: "24-hour intensive monitoring period completed successfully",
    status: "completed",
    targetDate: "01/06/2026",
    completedDate: "01/06/2026",
    assignedTo: "ICU Team"
  },
  {
    title: "Independent Ambulation",
    description: "Patient able to walk independently without assistance",
    status: "completed",
    targetDate: "01/07/2026",
    completedDate: "01/07/2026",
    assignedTo: "Physical Therapy",
    notes: "Patient exceeded expectations, walking 100 feet unassisted"
  },
  {
    title: "Transfer to Step-Down Unit",
    description: "Move from ICU to intermediate care unit",
    status: "inProgress",
    targetDate: "01/09/2026",
    assignedTo: "Care Coordination Team"
  },
  {
    title: "Cardiac Rehabilitation Enrollment",
    description: "Enrollment in outpatient cardiac rehab program",
    status: "pending",
    targetDate: "01/12/2026",
    assignedTo: "Case Manager"
  },
  {
    title: "Hospital Discharge",
    description: "Safe discharge to home with follow-up care plan",
    status: "pending",
    targetDate: "01/15/2026",
    assignedTo: "Dr. Ayush Jaiswal"
  }];


  useEffect(() => {
    const mockAlerts = [
    {
      id: 1,
      severity: "high",
      title: "Medication Due Soon",
      message: "Metoprolol 50mg scheduled for administration in 15 minutes",
      roleVisibility: ["doctor", "nurse"],
      actions: [
      { label: "Administer Now", primary: true },
      { label: "Delay 30 Minutes", primary: false }]

    }];

    setEmergencyAlerts(mockAlerts);
  }, []);

  const handleRoleChange = (role) => {
    setCurrentRole(role);
  };

  const handlePrivacyToggle = () => {
    setPrivacyMode(!privacyMode);
  };

  const handleAlertDismiss = (alertId) => {
    setEmergencyAlerts((prev) => prev?.filter((alert) => alert?.id !== alertId));
  };

  const handleAlertAction = (alertId, action) => {
    console.log(`Alert ${alertId} action:`, action?.label);
    setEmergencyAlerts((prev) => prev?.filter((alert) => alert?.id !== alertId));
  };

  const handlePatientAction = (action) => {
    console.log('Patient action:', action);
  };

  const handleAddNote = (note) => {
    console.log('New note:', note);
  };

  const handleSessionEnd = () => {
    navigate('/role-selection-landing');
  };

  const tabs = [
  { id: 'vitals', label: 'Vital Signs', icon: 'Activity' },
  { id: 'timeline', label: 'Treatment History', icon: 'Clock' },
  { id: 'medications', label: 'Medications', icon: 'Pill' },
  { id: 'notes', label: 'Care Notes', icon: 'FileText' }];


  const getRoleDashboardPath = () => {
    if (currentRole === 'doctor') return '/doctor-clinical-dashboard';
    if (currentRole === 'nurse') return '/nurse-operational-dashboard';
    return '/patient-family-dashboard';
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleNavigationHeader
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        privacyMode={privacyMode}
        onPrivacyToggle={handlePrivacyToggle} />

      <EmergencyAlertBanner
        alerts={emergencyAlerts}
        onDismiss={handleAlertDismiss}
        onAction={handleAlertAction}
        currentRole={currentRole} />

      <div className="pt-[60px]">
        <PatientContextBreadcrumb
          patientData={patientData}
          currentView="Analytics"
          roleDashboardPath={getRoleDashboardPath()}
          roleDashboardLabel={
          currentRole === 'doctor' ? 'Clinical Dashboard' :
          currentRole === 'nurse' ? 'Operational Dashboard' : 'Family Portal'
          } />


        <main className="max-w-[1536px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <PatientHeader
            patient={patientData}
            currentRole={currentRole}
            onAction={handlePatientAction} />


          <div className="mt-6 md:mt-8 border-b border-border">
            <div className="flex gap-1 overflow-x-auto">
              {tabs?.map((tab) =>
              <Button
                key={tab?.id}
                variant={activeTab === tab?.id ? 'default' : 'ghost'}
                size="sm"
                iconName={tab?.icon}
                iconPosition="left"
                onClick={() => setActiveTab(tab?.id)}
                className="flex-shrink-0">

                  {tab?.label}
                </Button>
              )}
            </div>
          </div>

          <div className="mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              {activeTab === 'vitals' &&
              <VitalSignsChart
                data={vitalSignsData}
                currentRole={currentRole} />

              }

              {activeTab === 'timeline' &&
              <TreatmentTimeline
                events={treatmentEvents}
                currentRole={currentRole} />

              }

              {activeTab === 'medications' &&
              <MedicationTracker
                medications={medications}
                currentRole={currentRole} />

              }

              {activeTab === 'notes' &&
              <CareNotesPanel
                notes={careNotes}
                currentRole={currentRole}
                onAddNote={handleAddNote} />

              }
            </div>

            <div className="space-y-6 md:space-y-8">
              <AlertHistoryPanel
                alerts={alertHistory}
                currentRole={currentRole} />


              <CareMilestoneTracker
                milestones={careMilestones}
                currentRole={currentRole} />

            </div>
          </div>
        </main>
      </div>
    </div>);

};

export default PatientDetailAnalytics;