import React from 'react';
import Icon from '../../../components/AppIcon';

const PatientStatusGrid = ({ patients = [] }) => {
  const getConditionConfig = (condition) => {
    const configs = {
      stable: {
        color: 'bg-success/10 text-success border-success/30',
        icon: 'CheckCircle2',
        label: 'Stable'
      },
      improving: {
        color: 'bg-primary/10 text-primary border-primary/30',
        icon: 'TrendingUp',
        label: 'Improving'
      },
      'needs-attention': {
        color: 'bg-warning/10 text-warning border-warning/30',
        icon: 'AlertTriangle',
        label: 'Needs Attention'
      },
      critical: {
        color: 'bg-destructive/10 text-destructive border-destructive/30',
        icon: 'AlertCircle',
        label: 'Critical'
      }
    };
    return configs?.[condition] || configs?.stable;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {patients?.map((patient) => {
        const conditionConfig = getConditionConfig(patient?.condition);
        return (
          <div
            key={patient?.id}
            className="bg-background border border-border rounded-lg p-4 hover:shadow-md transition-all duration-250"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-base font-semibold text-foreground mb-1">
                  {patient?.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="MapPin" size={14} />
                  <span>Room {patient?.room}</span>
                </div>
              </div>
              <div className={`px-3 py-1.5 rounded-lg border-2 text-xs font-semibold flex items-center gap-1.5 ${conditionConfig?.color}`}>
                <Icon name={conditionConfig?.icon} size={14} />
                <span>{conditionConfig?.label}</span>
              </div>
            </div>

            {/* Vitals Display */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-muted/50 rounded-md p-2 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Icon name="Heart" size={12} className="text-destructive" />
                  <span className="text-xs text-muted-foreground">HR</span>
                </div>
                <p className="text-sm font-semibold text-foreground">
                  {patient?.vitals?.hr}
                </p>
              </div>
              <div className="bg-muted/50 rounded-md p-2 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Icon name="Activity" size={12} className="text-primary" />
                  <span className="text-xs text-muted-foreground">BP</span>
                </div>
                <p className="text-xs font-semibold text-foreground">
                  {patient?.vitals?.bp}
                </p>
              </div>
              <div className="bg-muted/50 rounded-md p-2 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Icon name="Wind" size={12} className="text-secondary" />
                  <span className="text-xs text-muted-foreground">SpO2</span>
                </div>
                <p className="text-sm font-semibold text-foreground">
                  {patient?.vitals?.spo2}%
                </p>
              </div>
            </div>

            {/* Alert if exists */}
            {patient?.alert && (
              <div className="bg-warning/10 border border-warning/30 rounded-md p-2 mb-2">
                <div className="flex items-start gap-2">
                  <Icon name="AlertTriangle" size={14} className="text-warning mt-0.5" />
                  <p className="text-xs text-warning font-medium">{patient?.alert}</p>
                </div>
              </div>
            )}

            {/* Last Update */}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Icon name="Clock" size={12} />
              <span>Updated {patient?.lastUpdate}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PatientStatusGrid;