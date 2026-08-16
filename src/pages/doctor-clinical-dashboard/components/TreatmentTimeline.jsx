import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TreatmentTimeline = ({ selectedPatient = null }) => {
  const [timeFilter, setTimeFilter] = useState('24h');

  const timelineEvents = [
    {
      id: 'evt1',
      time: '16:30',
      type: 'vitals',
      title: 'Vital Signs Check',
      description: 'HR: 142 bpm (elevated), BP: 165/95 mmHg, SpO2: 94%',
      status: 'critical',
      actionTaken: 'Monitoring increased to every 15 minutes'
    },
    {
      id: 'evt2',
      time: '14:00',
      type: 'medication',
      title: 'Medication Administered',
      description: 'Lisinopril 10mg - Blood pressure management',
      status: 'completed',
      administeredBy: 'Nurse Priya Soni'
    },
    {
      id: 'evt3',
      time: '12:30',
      type: 'consultation',
      title: 'Doctor Consultation',
      description: 'Reviewed treatment plan, adjusted medication dosage',
      status: 'completed',
      notes: 'Patient responding well to treatment'
    },
    {
      id: 'evt4',
      time: '10:00',
      type: 'test',
      title: 'Blood Work Results',
      description: 'Complete blood count and metabolic panel',
      status: 'completed',
      results: 'All values within normal range'
    },
    {
      id: 'evt5',
      time: '08:00',
      type: 'vitals',
      title: 'Morning Vitals',
      description: 'HR: 95 bpm, BP: 138/90 mmHg, SpO2: 94%',
      status: 'completed'
    }
  ];

  const getEventIcon = (type) => {
    const icons = {
      vitals: { name: 'Activity', color: 'text-primary' },
      medication: { name: 'Pill', color: 'text-secondary' },
      consultation: { name: 'Users', color: 'text-success' },
      test: { name: 'FileText', color: 'text-warning' },
      admission: { name: 'LogIn', color: 'text-muted-foreground' }
    };
    return icons?.[type] || { name: 'Circle', color: 'text-muted-foreground' };
  };

  const getStatusColor = (status) => {
    const colors = {
      critical: 'bg-destructive/10 border-destructive/30 text-destructive',
      completed: 'bg-success/10 border-success/30 text-success',
      pending: 'bg-warning/10 border-warning/30 text-warning'
    };
    return colors?.[status] || colors?.completed;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Icon name="Clock" size={24} className="text-primary" />
          Treatment Timeline
        </h2>
        <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
          {['6h', '12h', '24h']?.map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-250 ${
                timeFilter === filter
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      {selectedPatient ? (
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {timelineEvents?.map((event, index) => {
            const eventIcon = getEventIcon(event?.type);
            return (
              <div
                key={event?.id}
                className="relative pl-8 pb-4 border-l-2 border-border last:border-l-0 last:pb-0"
              >
                {/* Timeline dot */}
                <div className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-card border-2 ${eventIcon?.color?.replace('text-', 'border-')}`} />
                
                <div className="bg-muted/30 rounded-lg p-4 hover:bg-muted/50 transition-colors duration-250">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon name={eventIcon?.name} size={16} className={eventIcon?.color} />
                      <span className="text-xs font-medium text-muted-foreground">
                        {event?.time}
                      </span>
                    </div>
                    <div className={`px-2 py-0.5 rounded-md border text-xs font-medium ${getStatusColor(event?.status)}`}>
                      {event?.status}
                    </div>
                  </div>
                  
                  <h3 className="text-sm font-semibold text-foreground mb-1">
                    {event?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {event?.description}
                  </p>
                  
                  {event?.actionTaken && (
                    <div className="bg-warning/10 border border-warning/20 rounded-md p-2 mt-2">
                      <p className="text-xs text-warning font-medium">
                        Action: {event?.actionTaken}
                      </p>
                    </div>
                  )}
                  
                  {event?.administeredBy && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                      <Icon name="User" size={12} />
                      <span>{event?.administeredBy}</span>
                    </div>
                  )}
                  
                  {event?.notes && (
                    <p className="text-xs text-success mt-2 italic">
                      Note: {event?.notes}
                    </p>
                  )}
                  
                  {event?.results && (
                    <p className="text-xs text-primary mt-2 font-medium">
                      Results: {event?.results}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Select a patient to view treatment timeline</p>
        </div>
      )}
    </div>
  );
};

export default TreatmentTimeline;