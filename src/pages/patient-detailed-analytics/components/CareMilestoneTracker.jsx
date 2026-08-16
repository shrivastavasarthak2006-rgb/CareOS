import React from 'react';
import Icon from '../../../components/AppIcon';

const CareMilestoneTracker = ({ milestones, currentRole }) => {
  const getMilestoneStatus = (status) => {
    const statuses = {
      completed: {
        bg: 'bg-success',
        text: 'text-success-foreground',
        icon: 'CheckCircle'
      },
      inProgress: {
        bg: 'bg-primary',
        text: 'text-primary-foreground',
        icon: 'Clock'
      },
      pending: {
        bg: 'bg-muted',
        text: 'text-muted-foreground',
        icon: 'Circle'
      },
      delayed: {
        bg: 'bg-warning',
        text: 'text-warning-foreground',
        icon: 'AlertCircle'
      }
    };
    return statuses?.[status] || statuses?.pending;
  };

  const completedCount = milestones?.filter(m => m?.status === 'completed')?.length;
  const progressPercentage = (completedCount / milestones?.length) * 100;

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-elevation-2">
      <div className="mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-foreground mb-1">
          Care Milestones
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Treatment progress tracking
        </p>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-semibold text-foreground data-text">
              {completedCount} of {milestones?.length} completed
            </span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-success transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {milestones?.map((milestone, index) => {
          const statusConfig = getMilestoneStatus(milestone?.status);
          return (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-250"
            >
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                ${statusConfig?.bg} ${statusConfig?.text}
              `}>
                <Icon name={statusConfig?.icon} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm md:text-base font-semibold text-foreground mb-1">
                  {milestone?.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-2">
                  {milestone?.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  {milestone?.targetDate && (
                    <div className="flex items-center gap-1">
                      <Icon name="Calendar" size={12} />
                      <span>Target: {milestone?.targetDate}</span>
                    </div>
                  )}
                  {milestone?.completedDate && (
                    <div className="flex items-center gap-1">
                      <Icon name="CheckCircle" size={12} />
                      <span>Completed: {milestone?.completedDate}</span>
                    </div>
                  )}
                  {milestone?.assignedTo && currentRole !== 'patient' && (
                    <div className="flex items-center gap-1">
                      <Icon name="User" size={12} />
                      <span>{milestone?.assignedTo}</span>
                    </div>
                  )}
                </div>

                {milestone?.notes && currentRole !== 'patient' && (
                  <div className="mt-2 pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      {milestone?.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CareMilestoneTracker;