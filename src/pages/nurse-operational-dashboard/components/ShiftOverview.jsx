import React from 'react';
import Icon from '../../../components/AppIcon';

const ShiftOverview = ({ data = {} }) => {
  const metrics = [
    {
      label: 'Assigned Patients',
      value: data?.assignedPatients || 0,
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Completed Tasks',
      value: data?.completedTasks || 0,
      icon: 'CheckCircle2',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Pending Tasks',
      value: data?.pendingTasks || 0,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Missed Tasks',
      value: data?.missedTasks || 0,
      icon: 'AlertCircle',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10'
    },
    {
      label: 'Team Members',
      value: data?.teamMembers || 0,
      icon: 'UserCheck',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  const completionRate = data?.completedTasks && data?.completedTasks + data?.pendingTasks
    ? Math.round((data?.completedTasks / (data?.completedTasks + data?.pendingTasks)) * 100)
    : 0;

  return (
    <div className="mb-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
        {metrics?.map((metric, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-250"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 rounded-lg ${metric?.bgColor} flex items-center justify-center`}>
                <Icon name={metric?.icon} size={20} className={metric?.color} />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold text-foreground">{metric?.value}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-medium">{metric?.label}</p>
          </div>
        ))}
      </div>

      {/* Completion Progress Bar */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Shift Progress</span>
          <span className="text-sm font-bold text-primary">{completionRate}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ShiftOverview;