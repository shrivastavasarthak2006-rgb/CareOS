import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MedicationChecklist = ({ medications = [] }) => {
  const [selectedMed, setSelectedMed] = useState(null);

  const getStatusConfig = (status) => {
    const configs = {
      administered: {
        color: 'bg-success/10 text-success border-success/20',
        icon: 'CheckCircle2',
        label: 'Administered'
      },
      pending: {
        color: 'bg-warning/10 text-warning border-warning/20',
        icon: 'Clock',
        label: 'Pending'
      },
      missed: {
        color: 'bg-destructive/10 text-destructive border-destructive/20',
        icon: 'AlertCircle',
        label: 'Missed'
      }
    };
    return configs?.[status] || configs?.pending;
  };

  return (
    <div className="space-y-3 max-h-[600px] overflow-y-auto">
      {medications?.map((med) => {
        const statusConfig = getStatusConfig(med?.status);
        return (
          <div
            key={med?.id}
            className="bg-background border border-border rounded-lg p-4 hover:shadow-md transition-all duration-250"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-foreground">
                    {med?.patientName}
                  </h3>
                  <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded">
                    Room {med?.room}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {med?.medication}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Icon name="Clock" size={12} />
                  <span>Scheduled: {med?.scheduledTime}</span>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-md border text-xs font-medium flex items-center gap-1 ${statusConfig?.color}`}>
                <Icon name={statusConfig?.icon} size={12} />
                <span>{statusConfig?.label}</span>
              </div>
            </div>

            {med?.status === 'administered' && (
              <div className="bg-success/5 border border-success/20 rounded-md p-2 text-xs">
                <div className="flex items-center gap-2 text-success">
                  <Icon name="User" size={12} />
                  <span>By: {med?.administeredBy} at {med?.administeredAt}</span>
                </div>
                {med?.requiresConfirmation && (
                  <div className="flex items-center gap-1 mt-1 text-success">
                    <Icon name="Shield" size={12} />
                    <span>Digitally confirmed</span>
                  </div>
                )}
              </div>
            )}

            {med?.status === 'missed' && (
              <div className="bg-destructive/5 border border-destructive/20 rounded-md p-2 text-xs">
                <div className="flex items-center gap-2 text-destructive mb-1">
                  <Icon name="AlertTriangle" size={12} />
                  <span>Reason: {med?.reason}</span>
                </div>
                {med?.escalated && (
                  <div className="flex items-center gap-1 text-warning">
                    <Icon name="ArrowUp" size={12} />
                    <span>Escalated to supervisor</span>
                  </div>
                )}
              </div>
            )}

            {med?.status === 'pending' && (
              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  variant="default"
                  className="flex-1"
                  iconName="Check"
                  iconPosition="left"
                >
                  Administer
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  iconName="Clock"
                >
                  Delay
                </Button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MedicationChecklist;