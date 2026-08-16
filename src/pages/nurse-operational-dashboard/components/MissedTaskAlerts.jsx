import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MissedTaskAlerts = ({ tasks = [] }) => {
  const getEscalationConfig = (level) => {
    const configs = {
      'supervisor-notified': {
        color: 'text-warning',
        icon: 'ArrowUp',
        label: 'Supervisor Notified'
      },
      'critical-escalation': {
        color: 'text-destructive',
        icon: 'AlertTriangle',
        label: 'Critical Escalation'
      },
      'pending-escalation': {
        color: 'text-muted-foreground',
        icon: 'Clock',
        label: 'Pending Escalation'
      }
    };
    return configs?.[level] || configs?.['pending-escalation'];
  };

  return (
    <div className="mb-6">
      <div className="bg-destructive/5 border-2 border-destructive/30 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="AlertCircle" size={24} className="text-destructive" />
          <h2 className="text-lg font-semibold text-destructive">
            Missed Task Alerts ({tasks?.length})
          </h2>
        </div>
        
        <div className="space-y-3">
          {tasks?.map((task) => {
            const escalationConfig = getEscalationConfig(task?.escalationLevel);
            return (
              <div
                key={task?.id}
                className="bg-card border border-destructive/20 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-foreground mb-1">
                      {task?.task}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {task?.patient}
                    </p>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={12} />
                        <span>Scheduled: {task?.scheduledTime}</span>
                      </div>
                      <div className="flex items-center gap-1 text-destructive font-medium">
                        <Icon name="AlertTriangle" size={12} />
                        <span>Missed by: {task?.missedBy}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium ${escalationConfig?.color}`}>
                    <Icon name={escalationConfig?.icon} size={14} />
                    <span>{escalationConfig?.label}</span>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-md p-3 mb-3">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">Reason:</span> {task?.reason}
                  </p>
                  <p className="text-sm text-foreground mt-1">
                    <span className="font-medium">Action Required:</span> {task?.actionRequired}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="default"
                    className="flex-1"
                    iconName="CheckCircle2"
                    iconPosition="left"
                  >
                    Complete Now
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    iconName="MessageSquare"
                  >
                    Add Note
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MissedTaskAlerts;