import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import RoleNavigationHeader from '../../components/ui/RoleNavigationHeader';
import PatientContextBreadcrumb from '../../components/ui/PatientContextBreadcrumb';
import WelcomeSection from './components/WelcomeSection';
import ProgressTimeline from './components/ProgressTimeline';
import VitalSignsSummary from './components/VitalSignsSummary';
import CareActivitiesSection from './components/CareActivitiesSection';
import InteractiveSection from './components/InteractiveSection';
import Button from '../../components/ui/Button';

const PatientFamilyDashboard = () => {
  const navigate = useNavigate();

  const [privacyMode, setPrivacyMode] = useState(false);
  const [simpleNotesView, setSimpleNotesView] = useState(true);

  const patientData = {
    displayName: 'Patient!!',
    id: 'PT-2024-001'
  };

  // CLINICAL NOTES + AI HINDI EXPLANATION
  const clinicalNotes = [
    {
      id: 1,
      author: 'Dr. Ayush Jaiswal',
      role: 'Clinical',
      time: '01/08/2026 10:30 AM',
      clinicalText:
        'Patient showing excellent recovery progress. Cardiac enzymes trending down as expected. Plan to transfer to step-down unit tomorrow if vitals remain stable.',
      aiHindiText:
        'Patient ki recovery bahut achhi ho rahi hai. Dil se jude tests sahi direction mein aa rahe hain. Agar patient ke vital signs stable rahe, toh kal ICU se normal ward mein shift kiya ja sakta hai.'
    },
    {
      id: 2,
      author: 'Nurse Yamini Mathur',
      role: 'Nursing',
      time: '01/08/2026 02:15 PM',
      clinicalText:
        'Patient ambulated 50 feet with minimal assistance. No chest pain or shortness of breath. Vitals stable throughout.',
      aiHindiText:
        'Patient thodi madad ke saath 50 feet tak chal paaye. Chalne ke dauran seene mein dard ya saans ki dikkat nahi hui. Poore samay vital signs stable rahe.'
    },
    {
      id: 3,
      author: 'Dr.Tanushree Chauhan(Cardiology)',
      role: 'Clinical',
      time: '01/08/2026 04:45 PM',
      clinicalText:
        'Reviewed echocardiogram results. Left ventricular function improved. Ejection fraction now 55%. Continue current medication regimen.',
      aiHindiText:
        'Heart scan ke results pehle se better hain. Dil ki pumping capacity improve hui hai aur ab 55% ho gayi hai. Jo medicines chal rahi hain, unhe continue kiya jaayega.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50/50 via-mint-50/30 to-white">

      <RoleNavigationHeader
        currentRole="patient"
        privacyMode={privacyMode}
        onPrivacyToggle={() => setPrivacyMode(!privacyMode)}
      />

      <div className="pt-[60px]">

        <PatientContextBreadcrumb
          patientData={patientData}
          currentView="Family Dashboard"
          roleDashboardPath="/role-selection-landing"
          roleDashboardLabel="Role Selection"
        />

        <main className="max-w-[1536px] mx-auto px-4 py-8 space-y-8">

          <WelcomeSection
            patientName={patientData.displayName}
            carePhase="Recovery"
          />

          <ProgressTimeline currentPhaseIndex={2} />

          <VitalSignsSummary />

          <CareActivitiesSection />

          <InteractiveSection />

          {/* AI NOTES SECTION */}
          <div className="bg-white rounded-2xl p-6 shadow-elevation-1">

            <div className="flex justify-between items-center mb-4">

              <h3 className="text-xl font-semibold text-foreground">
                Doctor & Nurse Notes
              </h3>

              <button
                onClick={() => setSimpleNotesView(!simpleNotesView)}
                className="px-4 py-2 text-sm rounded-full border border-primary text-primary hover:bg-primary/10 transition"
              >
                {simpleNotesView ? 'Clinical View' : 'Aasaan Hindi'}
              </button>

            </div>

            <div className="space-y-4">

              {clinicalNotes.map((note) => (
                <div
                  key={note.id}
                  className="border border-muted rounded-xl p-4 bg-muted/20"
                >

                  <div className="flex justify-between items-center mb-2">

                    <div className="font-semibold text-foreground">
                      {note.author}

                      <span className="ml-2 text-xs text-muted-foreground">
                        ({note.role})
                      </span>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      {note.time}
                    </div>

                  </div>

                  <p className="text-sm text-foreground leading-relaxed">
                    {simpleNotesView
                      ? note.aiHindiText
                      : note.clinicalText}
                  </p>

                  {simpleNotesView && (
                    <p className="mt-2 text-xs text-muted-foreground italic">
                      *Yeh AI dwara samjhaaya gaya explanation hai. Final medical
                      decision doctor ka hota hai.
                    </p>
                  )}

                </div>
              ))}

            </div>
          </div>

          <div className="text-center">

            <Button
              variant="default"
              size="lg"
              iconName="BarChart3"
              iconPosition="right"
              onClick={() => navigate('/patient-detail-analytics')}
            >
              View Detailed Analytics
            </Button>

          </div>

        </main>
      </div>
    </div>
  );
};

export default PatientFamilyDashboard;