import React from 'react';
import Icon from '../../../components/AppIcon';

const TaskTimelineCard = ({ tasks = [] }) => {
  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-success/10 text-success border-success/20',
      'in-progress': 'bg-warning/10 text-warning border-warning/20',
      pending: 'bg-muted text-muted-foreground border-border',
      missed: 'bg-destructive/10 text-destructive border-destructive/20'
    };
    return colors?.[status] || colors?.pending;
  };

  const getPriorityIcon = (priority) => {
    const icons = {
      critical: { name: 'AlertCircle', color: 'text-destructive' },
      high: { name: 'AlertTriangle', color: 'text-warning' },
      medium: { name: 'Info', color: 'text-primary' },
      low: { name: 'Circle', color: 'text-muted-foreground' }
    };
    return icons?.[priority] || icons?.medium;
  };

  const getStatusIcon = (status) => {
    const icons = {
      completed: 'CheckCircle2',
      'in-progress': 'Clock',
      pending: 'Circle',
      missed: 'XCircle'
    };
    return icons?.[status] || 'Circle';
  };

  return (
    <div className="space-y-4">
      {tasks?.map((task, index) => (
        <div
          key={task?.id}
          className="relative pl-8 pb-4 border-l-2 border-border last:border-l-0 last:pb-0"
        >
          {/* Timeline dot */}
          <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary" />
          
          <div className="bg-muted/30 rounded-lg p-4 hover:bg-muted/50 transition-colors duration-250">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    {task?.time}
                  </span>
                  <Icon 
                    name={getPriorityIcon(task?.priority)?.name} 
                    size={16} 
                    className={getPriorityIcon(task?.priority)?.color}
                  />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-1">
                  {task?.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {task?.patients?.map((patient, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md font-medium"
                    >
                      {patient}
                    </span>
                  ))}
                </div>
                {task?.notes && (
                  <p className="text-sm text-muted-foreground mt-2 italic">
                    Note: {task?.notes}
                  </p>
                )}
                {task?.completedAt && (
                  <p className="text-xs text-success mt-2">
                    ✓ Completed at {task?.completedAt}
                  </p>
                )}
              </div>
              <div className={`px-3 py-1 rounded-full border text-xs font-medium flex items-center gap-1 ${getStatusColor(task?.status)}`}>
                <Icon name={getStatusIcon(task?.status)} size={14} />
                <span className="capitalize">{task?.status?.replace('-', ' ')}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskTimelineCard;