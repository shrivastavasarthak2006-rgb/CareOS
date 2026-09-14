import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import RoleNavigationHeader from '../../components/ui/RoleNavigationHeader';
import PatientContextBreadcrumb from '../../components/ui/PatientContextBreadcrumb';

import KPICard from './components/KPICard';
import PatientListTable from './components/PatientListTable';
import VitalSignsChart from './components/VitalSignsChart';
import MedicationComplianceTracker from './components/MedicationComplianceTracker';
import CareTeamPerformance from './components/CareTeamPerformance';
import ProcedureManagement from './components/ProcedureManagement';
import TreatmentTimeline from './components/TreatmentTimeline';
import Button from '../../components/ui/Button';

// =========================
// DEPARTMENTS
// =========================

const departments = [
  'General Medicine',
  'Cardiology',
  'Orthopedics',
  'Pediatrics',
  'Gynecology',
  'ENT',
  'Dermatology',
  'Neurology',
  'Emergency',
];

// =========================
// DUMMY REFERRED PATIENTS
// =========================

const dummyReferredPatients = [
  {
    _id: 'dummy-1',
    name: 'Priya Sharma',
    age: 25,
    phoneNumber: '9876543210',
    problem: 'Shoulder Pain',
    duration: '1 week',
    severity: 'Moderate',
    department: 'Orthopedics',
    aiSummary:
      'Patient reports moderate shoulder pain for one week. Previous consultation was done.',
  },
  {
    _id: 'dummy-2',
    name: 'Rudra Verma',
    age: 21,
    phoneNumber: '9876543211',
    problem: 'Vomiting',
    duration: '2 days',
    severity: 'Moderate',
    department: 'General Medicine',
    aiSummary:
      'Patient reports vomiting for two days with no previous consultation.',
  },
];

// =========================
// DOCTOR DASHBOARD
// =========================

const DoctorClinicalDashboard = () => {
  const navigate = useNavigate();

  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connected');

  // Dummy department selection
  const [doctorDepartment, setDoctorDepartment] = useState({});

  // Dummy referred patients
  const [referredPatients, setReferredPatients] = useState(
    dummyReferredPatients
  );

  // =========================
  // MOCK KPI DATA
  // =========================

  const mockKPIData = [
    {
      title: 'Active Patients',
      value: '24',
      unit: '',
      trend: 'up',
      trendValue: '+3',
      icon: 'Users',
      iconColor: 'var(--color-primary)',
      sparklineData: [18, 20, 19, 22, 21, 23, 24],
    },
    {
      title: 'Critical Alerts',
      value: '3',
      unit: '',
      trend: 'down',
      trendValue: '-2',
      icon: 'AlertTriangle',
      iconColor: 'var(--color-error)',
      sparklineData: [5, 6, 4, 5, 4, 3, 3],
    },
    {
      title: 'Treatment Completion',
      value: '87',
      unit: '%',
      trend: 'up',
      trendValue: '+5%',
      icon: 'CheckCircle',
      iconColor: 'var(--color-success)',
      sparklineData: [78, 80, 82, 84, 85, 86, 87],
    },
    {
      title: 'Clinical Outcomes',
      value: '92',
      unit: '%',
      trend: 'up',
      trendValue: '+3%',
      icon: 'TrendingUp',
      iconColor: 'var(--color-secondary)',
      sparklineData: [85, 87, 88, 89, 90, 91, 92],
    },
  ];

  // =========================
  // MOCK PATIENTS
  // =========================

  const mockPatients = [
    {
      id: 'p1',
      name: 'Anuskhka Agrawal',
      patientId: 'P-2847',
      avatar:
        'https://img.rocket.new/generatedImages/rocket_gen_img_17b3388db-1763293339823.png',
      avatarAlt:
        'Professional headshot of woman with shoulder-length brown hair wearing blue medical gown',
      status: 'critical',
      vitals: {
        heartRate: 142,
        bloodPressure: '165/95',
        oxygenLevel: 94,
      },
    },
    {
      id: 'p2',
      name: 'Rishab Thakur',
      patientId: 'P-2848',
      avatar:
        'https://img.rocket.new/generatedImages/rocket_gen_img_126a6b0dc-1763300720152.png',
      avatarAlt:
        'Professional headshot of man with short black hair wearing white hospital gown',
      status: 'stable',
      vitals: {
        heartRate: 78,
        bloodPressure: '120/80',
        oxygenLevel: 98,
      },
    },
    {
      id: 'p3',
      name: 'Monika',
      patientId: 'P-2849',
      avatar:
        'https://img.rocket.new/generatedImages/rocket_gen_img_1ac092511-1763296799624.png',
      avatarAlt:
        'Professional headshot of woman with long dark hair wearing green hospital gown',
      status: 'monitoring',
      vitals: {
        heartRate: 92,
        bloodPressure: '135/85',
        oxygenLevel: 96,
      },
    },
    {
      id: 'p4',
      name: 'Shorya Gupta',
      patientId: 'P-2850',
      avatar:
        'https://img.rocket.new/generatedImages/rocket_gen_img_1807619f0-1763298555266.png',
      avatarAlt:
        'Professional headshot of man with short hair wearing blue hospital gown',
      status: 'recovering',
      vitals: {
        heartRate: 72,
        bloodPressure: '118/78',
        oxygenLevel: 99,
      },
    },
    {
      id: 'p5',
      name: 'Saloni Verma',
      patientId: 'P-2851',
      avatar:
        'https://img.rocket.new/generatedImages/rocket_gen_img_1b258c9c2-1763297892357.png',
      avatarAlt:
        'Professional headshot of woman with blonde hair wearing white hospital gown',
      status: 'stable',
      vitals: {
        heartRate: 75,
        bloodPressure: '122/82',
        oxygenLevel: 97,
      },
    },
  ];

  // =========================
  // MOCK VITAL SIGNS
  // =========================

  const mockVitalSignsData = [
    {
      time: '00:00',
      heartRate: 75,
      bloodPressureSystolic: 120,
      bloodPressureDiastolic: 80,
      oxygenLevel: 98,
    },
    {
      time: '02:00',
      heartRate: 78,
      bloodPressureSystolic: 122,
      bloodPressureDiastolic: 82,
      oxygenLevel: 97,
    },
    {
      time: '04:00',
      heartRate: 82,
      bloodPressureSystolic: 125,
      bloodPressureDiastolic: 85,
      oxygenLevel: 96,
    },
    {
      time: '06:00',
      heartRate: 88,
      bloodPressureSystolic: 130,
      bloodPressureDiastolic: 88,
      oxygenLevel: 95,
    },
    {
      time: '08:00',
      heartRate: 95,
      bloodPressureSystolic: 138,
      bloodPressureDiastolic: 90,
      oxygenLevel: 94,
    },
    {
      time: '10:00',
      heartRate: 105,
      bloodPressureSystolic: 145,
      bloodPressureDiastolic: 92,
      oxygenLevel: 93,
    },
    {
      time: '12:00',
      heartRate: 118,
      bloodPressureSystolic: 155,
      bloodPressureDiastolic: 94,
      oxygenLevel: 92,
    },
    {
      time: '14:00',
      heartRate: 132,
      bloodPressureSystolic: 160,
      bloodPressureDiastolic: 95,
      oxygenLevel: 91,
    },
    {
      time: '16:00',
      heartRate: 142,
      bloodPressureSystolic: 165,
      bloodPressureDiastolic: 95,
      oxygenLevel: 94,
    },
  ];

  // =========================
  // MOCK MEDICATIONS
  // =========================

  const mockMedications = [
    {
      id: 'med1',
      name: 'Lisinopril',
      dosage: '10mg twice daily',
      complianceRate: 95,
      administered: 19,
      scheduled: 20,
      nextDose: '2:00 PM',
      missedDoses: 0,
    },
    {
      id: 'med2',
      name: 'Metformin',
      dosage: '500mg three times daily',
      complianceRate: 87,
      administered: 26,
      scheduled: 30,
      nextDose: '6:00 PM',
      missedDoses: 1,
    },
    {
      id: 'med3',
      name: 'Aspirin',
      dosage: '81mg once daily',
      complianceRate: 100,
      administered: 10,
      scheduled: 10,
      nextDose: '8:00 AM',
      missedDoses: 0,
    },
    {
      id: 'med4',
      name: 'Atorvastatin',
      dosage: '20mg once daily',
      complianceRate: 72,
      administered: 7,
      scheduled: 10,
      nextDose: '9:00 PM',
      missedDoses: 2,
    },
  ];

  // =========================
  // MOCK TEAM MEMBERS
  // =========================

  const mockTeamMembers = [
    {
      id: 'team1',
      name: 'Nurse Priya Soni',
      role: 'Lead Nurse',
      avatar:
        'https://img.rocket.new/generatedImages/rocket_gen_img_141cd6ae9-1763294738210.png',
      avatarAlt:
        'Professional headshot of woman with red hair in blue nursing scrubs',
      performanceScore: 94,
      tasksCompleted: 28,
      tasksAssigned: 30,
      avgResponseTime: '4.2 min',
    },
    {
      id: 'team2',
      name: 'Nurse Anuj Yadav',
      role: 'Staff Nurse',
      avatar:
        'https://img.rocket.new/generatedImages/rocket_gen_img_1c22845bb-1763299061156.png',
      avatarAlt:
        'Professional headshot of man with short dark hair in green nursing scrubs',
      performanceScore: 88,
      tasksCompleted: 24,
      tasksAssigned: 28,
      avgResponseTime: '5.8 min',
    },
    {
      id: 'team3',
      name: 'Nurse Arti Jha',
      role: 'Staff Nurse',
      avatar:
        'https://img.rocket.new/generatedImages/rocket_gen_img_113e8c9d5-1763295892704.png',
      avatarAlt:
        'Professional headshot of woman with long black hair in white nursing scrubs',
      performanceScore: 91,
      tasksCompleted: 26,
      tasksAssigned: 29,
      avgResponseTime: '4.9 min',
    },
  ];

  // =========================
  // SELECTED PATIENT
  // =========================

  const selectedPatient = mockPatients.find(
    (patient) => patient.id === selectedPatientId
  );

  // =========================
  // CONNECTION STATUS
  // =========================

  useEffect(() => {
    const interval = setInterval(() => {
      setConnectionStatus((prev) =>
        prev === 'connected' ? 'reconnecting' : 'connected'
      );
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // =========================
  // HANDLERS
  // =========================

  const handlePatientSelect = (patientId) => {
    setSelectedPatientId(patientId);
  };

  const handleViewPatientDetails = () => {
    if (selectedPatientId) {
      navigate('/patient-detail-analytics', {
        state: {
          patientId: selectedPatientId,
        },
      });
    }
  };

  const handleExportReport = () => {
    console.log('Exporting clinical report...');
  };

  // =========================
  // DUMMY REFER TO DEPARTMENT
  // =========================

  const referToDepartment = (patientId) => {
    const department = doctorDepartment[patientId];

    if (!department) {
      alert('Please select a department first.');
      return;
    }

    setReferredPatients((currentPatients) =>
      currentPatients.map((patient) =>
        patient._id === patientId
          ? {
              ...patient,
              department: department,
              referred: true,
            }
          : patient
      )
    );

    alert(
      `${dummyReferredPatients.find(
        (patient) => patient._id === patientId
      )?.name} referred to ${department}`
    );
  };

  return (
    <div className="min-h-screen bg-background">

      <RoleNavigationHeader
        currentRole="doctor"
        privacyMode={privacyMode}
        onPrivacyToggle={() => setPrivacyMode(!privacyMode)}
      />

      <div className="pt-[60px]">

        {selectedPatient && (
          <PatientContextBreadcrumb
            patientData={{
              displayName: selectedPatient.name,
            }}
            currentView="Clinical Dashboard"
            roleDashboardPath="/doctor-clinical-dashboard"
            roleDashboardLabel="Clinical Dashboard"
          />
        )}

        <main className="max-w-[1536px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">

          {/* Header */}

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 md:mb-8">

            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Clinical Dashboard
              </h1>

              <p className="text-sm md:text-base text-muted-foreground">
                Real-time patient monitoring and clinical decision support
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">

              <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                  SD
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Doctor
                  </p>

                  <p className="text-sm font-semibold text-foreground">
                    Dr. Shivam Dubey
                  </p>
                </div>

              </div>

              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                  connectionStatus === 'connected'
                    ? 'bg-success/10 text-success'
                    : 'bg-warning/10 text-warning'
                }`}
              >

                <div
                  className={`w-2 h-2 rounded-full ${
                    connectionStatus === 'connected'
                      ? 'bg-success'
                      : 'bg-warning'
                  } animate-pulse`}
                />

                <span className="text-xs md:text-sm font-medium">
                  {connectionStatus === 'connected'
                    ? 'Live Data'
                    : 'Reconnecting...'}
                </span>

              </div>

              <Button
                variant="outline"
                size="default"
                iconName="Download"
                iconPosition="left"
                onClick={handleExportReport}
              >
                Export Report
              </Button>

              {selectedPatient && (
                <Button
                  variant="default"
                  size="default"
                  iconName="FileText"
                  iconPosition="left"
                  onClick={handleViewPatientDetails}
                >
                  View Details
                </Button>
              )}

            </div>
          </div>

          {/* =========================================
              PATIENTS REFERRED BY RECEPTION
          ========================================= */}

          {referredPatients.length > 0 && (
            <div className="mb-6 md:mb-8 rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-200 px-6 py-5">

                <h2 className="text-lg font-semibold text-foreground">
                  Patients Referred by Reception
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Review patients and refer them to the appropriate department
                </p>

              </div>

              <div className="divide-y divide-slate-100">

                {referredPatients.map((patient) => (

                  <div
                    key={patient._id}
                    className="p-6 transition hover:bg-slate-50"
                  >

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                      {/* Patient Information */}

                      <div className="flex items-start gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
                          {patient.name?.charAt(0)?.toUpperCase() || 'P'}
                        </div>

                        <div>

                          <h3 className="text-lg font-semibold text-slate-900">
                            {patient.name}
                          </h3>

                          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">

                            <span>
                              Age: {patient.age}
                            </span>

                            <span>
                              📞 {patient.phoneNumber}
                            </span>

                          </div>

                          <div className="mt-3 flex flex-wrap gap-2">

                            <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
                              {patient.problem}
                            </span>

                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                              {patient.duration}
                            </span>

                            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600">
                              {patient.severity}
                            </span>

                          </div>

                        </div>

                      </div>

                      {/* Department */}

                      <div className="flex flex-col gap-2 lg:min-w-[240px]">

                        <label className="text-xs font-medium text-slate-500">
                          Refer to Department
                        </label>

                        <select
                          value={
                            doctorDepartment[patient._id] || ''
                          }
                          onChange={(e) =>
                            setDoctorDepartment((current) => ({
                              ...current,
                              [patient._id]: e.target.value,
                            }))
                          }
                          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >

                          <option value="">
                            Select Department
                          </option>

                          {departments.map((department) => (
                            <option
                              key={department}
                              value={department}
                            >
                              {department}
                            </option>
                          ))}

                        </select>

                        <button
                          onClick={() =>
                            referToDepartment(patient._id)
                          }
                          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                        >
                          Refer to Department →
                        </button>

                        {patient.referred && ( 
                          <div className="mt-3 text-sm font-medium text-green-600">
                            Proceeded to {patient.department}
                          </div>
                        )}

                      </div>

                    </div>

                    {/* Current Department */}

                    {patient.department && (
                      <div className="mt-4">

                        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                          Current Department: {patient.department}
                        </span>

                      </div>
                    )}

                    {/* AI Summary */}

                    {patient.aiSummary && (
                      <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/50 p-5">

                        <div className="mb-2 flex items-center gap-2">

                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                            🤖
                          </div>

                          <div>

                            <h4 className="text-sm font-semibold text-slate-800">
                              AI Patient Summary
                            </h4>

                            <p className="text-xs text-slate-500">
                              Generated from the patient's AI call
                            </p>

                          </div>

                        </div>

                        <p className="text-sm leading-6 text-slate-700">
                          {patient.aiSummary}
                        </p>

                      </div>
                    )}

                  </div>

                ))}

              </div>

            </div>
          )}

          {/* KPI Cards */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 mb-6 md:mb-8">

            {mockKPIData.map((kpi, index) => (
              <KPICard
                key={index}
                {...kpi}
              />
            ))}

          </div>

          {/* Patient List + Vital Signs */}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 lg:gap-6 mb-6 md:mb-8">

            <div className="lg:col-span-4">

              <PatientListTable
                patients={mockPatients}
                onPatientSelect={handlePatientSelect}
                selectedPatientId={selectedPatientId}
              />

            </div>

            <div className="lg:col-span-8">

              <VitalSignsChart
                data={mockVitalSignsData}
                selectedPatient={selectedPatient}
              />

            </div>

          </div>

          {/* Medication + Care Team */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 lg:gap-6">

            <MedicationComplianceTracker
              medications={mockMedications}
            />

            <CareTeamPerformance
              teamMembers={mockTeamMembers}
            />

          </div>

          {/* Procedure Management + Treatment Timeline */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 lg:gap-6 mt-6 md:mt-8">

            <ProcedureManagement />

            <TreatmentTimeline
              selectedPatient={selectedPatient}
            />

          </div>

        </main>
      </div>
    </div>
  );
};

export default DoctorClinicalDashboard;