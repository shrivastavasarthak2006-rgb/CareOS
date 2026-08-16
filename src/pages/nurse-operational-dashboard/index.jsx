import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleNavigationHeader from '../../components/ui/RoleNavigationHeader';
import PatientContextBreadcrumb from '../../components/ui/PatientContextBreadcrumb';
import EmergencyAlertBanner from '../../components/ui/EmergencyAlertBanner';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import TaskTimelineCard from './components/TaskTimelineCard';
import MedicationChecklist from './components/MedicationChecklist';
import PatientStatusGrid from './components/PatientStatusGrid';
import ShiftOverview from './components/ShiftOverview';
import MissedTaskAlerts from './components/MissedTaskAlerts';

const NurseOperationalDashboard = () => {
  const navigate = useNavigate();
  const [privacyMode, setPrivacyMode] = useState(false);
  const [selectedShift, setSelectedShift] = useState('current');

  const handlePrivacyToggle = () => {
    setPrivacyMode(!privacyMode);
  };

  const mockAlerts = [
    {
      id: 'alert-1',
      severity: 'high',
      title: 'Missed Medication Alert',
      message: 'Patient Room 304 - Medication due 30 minutes ago. Requires immediate attention.',
      roleVisibility: ['nurse'],
      actions: [
        { label: 'Acknowledge & Administer', primary: true },
        { label: 'Escalate to Supervisor', primary: false }
      ]
    }
  ];

  const shiftData = {
    current: 'Day Shift',
    startTime: '7:00 AM',
    endTime: '7:00 PM',
    assignedPatients: 8,
    completedTasks: 24,
    pendingTasks: 6,
    missedTasks: 1,
    teamMembers: 4
  };

  const taskTimeline = [
    {
      id: 't1',
      time: '7:00 AM',
      title: 'Morning Vitals Check',
      patients: ['Room 301', 'Room 302', 'Room 303'],
      status: 'completed',
      priority: 'high',
      completedAt: '7:15 AM'
    },
    {
      id: 't2',
      time: '8:00 AM',
      title: 'Medication Administration',
      patients: ['Room 301', 'Room 304', 'Room 305'],
      status: 'in-progress',
      priority: 'critical',
      notes: 'Room 304 delayed - patient in imaging'
    },
    {
      id: 't3',
      time: '9:00 AM',
      title: 'Wound Care & Dressing',
      patients: ['Room 302', 'Room 306'],
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 't4',
      time: '10:00 AM',
      title: 'Patient Mobility Assistance',
      patients: ['Room 303', 'Room 307'],
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 't5',
      time: '11:00 AM',
      title: 'Pre-Lunch Blood Sugar Check',
      patients: ['Room 301', 'Room 305'],
      status: 'pending',
      priority: 'high'
    }
  ];

  const medicationList = [
    {
      id: 'm1',
      patientName: 'Anuskhka Agrawal',
      room: '301',
      medication: 'Lisinopril 10mg',
      scheduledTime: '8:00 AM',
      status: 'administered',
      administeredBy: 'You',
      administeredAt: '8:05 AM',
      requiresConfirmation: true
    },
    {
      id: 'm2',
      patientName: 'Rishab Thakur',
      room: '302',
      medication: 'Metformin 500mg',
      scheduledTime: '8:00 AM',
      status: 'administered',
      administeredBy: 'You',
      administeredAt: '8:10 AM',
      requiresConfirmation: true
    },
    {
      id: 'm3',
      patientName: 'Monika',
      room: '304',
      medication: 'Aspirin 81mg',
      scheduledTime: '8:00 AM',
      status: 'missed',
      reason: 'Patient in imaging',
      escalated: true
    },
    {
      id: 'm4',
      patientName: 'Shorya Gupta',
      room: '305',
      medication: 'Atorvastatin 20mg',
      scheduledTime: '8:30 AM',
      status: 'pending',
      priority: 'high'
    }
  ];

  const patientStatuses = [
    {
      id: 'p1',
      name: 'Anuskhka Agrawal',
      room: '301',
      condition: 'stable',
      lastUpdate: '10 min ago',
      vitals: { hr: 72, bp: '120/80', spo2: 98 }
    },
    {
      id: 'p2',
      name: 'Rishab Thakur',
      room: '302',
      condition: 'improving',
      lastUpdate: '25 min ago',
      vitals: { hr: 78, bp: '118/76', spo2: 97 }
    },
    {
      id: 'p3',
      name: 'Monika',
      room: '304',
      condition: 'needs-attention',
      lastUpdate: '5 min ago',
      vitals: { hr: 95, bp: '145/92', spo2: 94 },
      alert: 'Elevated BP - Monitor closely'
    },
    {
      id: 'p4',
      name: 'Shorya Gupta',
      room: '305',
      condition: 'stable',
      lastUpdate: '15 min ago',
      vitals: { hr: 75, bp: '122/82', spo2: 99 }
    },
    {
      id: 'p5',
      name: 'Saloni Verma',
      room: '306',
      condition: 'improving',
      lastUpdate: '30 min ago',
      vitals: { hr: 70, bp: '115/75', spo2: 98 }
    },
    {
      id: 'p6',
      name: 'Rohit Vishwakarma',
      room: '307',
      condition: 'stable',
      lastUpdate: '20 min ago',
      vitals: { hr: 74, bp: '119/78', spo2: 97 }
    }
  ];

  const missedTasks = [
    {
      id: 'mt1',
      task: 'Medication Administration',
      patient: 'Monika - Room 304',
      scheduledTime: '8:00 AM',
      missedBy: '32 minutes',
      reason: 'Patient in imaging',
      escalationLevel: 'supervisor-notified',
      actionRequired: 'Administer upon return'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <RoleNavigationHeader
        currentRole="nurse"
        privacyMode={privacyMode}
        onPrivacyToggle={handlePrivacyToggle}
      />
      <main className="pt-[60px]">
        <PatientContextBreadcrumb
          breadcrumbs={[
            { label: 'Dashboards', path: '/role-selection-landing' },
            { label: 'Nurse Operational Dashboard', path: '/nurse-operational-dashboard' }
          ]}
        />

        {mockAlerts?.length > 0 && (
          <EmergencyAlertBanner
            alerts={mockAlerts}
            onDismiss={(id) => console.log('Dismiss', id)}
            onAction={(id, action) => console.log('Action', id, action)}
          />
        )}

        <div className="max-w-[1536px] mx-auto px-4 md:px-6 lg:px-8 py-6">
          {/* Header Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Operational Dashboard
                </h1>
                <p className="text-muted-foreground">
                  {shiftData?.current} • {shiftData?.startTime} - {shiftData?.endTime}
                </p>
              </div>
              <Button
                variant="outline"
                iconName="RefreshCw"
                iconPosition="left"
                onClick={() => window.location?.reload()}
              >
                Refresh Data
              </Button>
            </div>
          </div>

          {/* Shift Overview Cards */}
          <ShiftOverview data={shiftData} />

          {/* Missed Task Alerts */}
          {missedTasks?.length > 0 && (
            <MissedTaskAlerts tasks={missedTasks} />
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Task Timeline - 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <Icon name="Clock" size={24} className="text-primary" />
                    Task Timeline
                  </h2>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" iconName="Filter">
                      Filter
                    </Button>
                  </div>
                </div>
                <TaskTimelineCard tasks={taskTimeline} />
              </div>
            </div>

            {/* Medication Checklist - 1 column */}
            <div>
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Icon name="Pill" size={24} className="text-secondary" />
                  Medication Checklist
                </h2>
                <MedicationChecklist medications={medicationList} />
              </div>
            </div>
          </div>

          {/* Patient Status Grid */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Icon name="Users" size={24} className="text-success" />
              Patient Status Overview
            </h2>
            <PatientStatusGrid patients={patientStatuses} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default NurseOperationalDashboard;