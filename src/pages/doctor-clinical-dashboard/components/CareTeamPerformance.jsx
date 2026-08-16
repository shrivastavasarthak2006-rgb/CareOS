import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CareTeamPerformance = ({ teamMembers }) => {
  const getPerformanceColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const getPerformanceBadge = (score) => {
    if (score >= 90) return { label: 'Excellent', color: 'bg-success text-success-foreground' };
    if (score >= 70) return { label: 'Good', color: 'bg-warning text-warning-foreground' };
    return { label: 'Needs Attention', color: 'bg-error text-error-foreground' };
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-elevation-1 overflow-hidden">
      <div className="p-4 md:p-5 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base md:text-lg font-semibold text-foreground">Care Team Performance</h3>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">Current shift metrics</p>
          </div>
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="Users" size={20} color="var(--color-secondary)" />
          </div>
        </div>
      </div>
      <div className="p-4 md:p-5 space-y-4">
        {teamMembers?.map((member) => {
          const badge = getPerformanceBadge(member?.performanceScore);
          return (
            <div key={member?.id} className="space-y-3">
              <div className="flex items-center gap-3">
                <Image
                  src={member?.avatar}
                  alt={member?.avatarAlt}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-base font-medium text-foreground truncate">
                    {member?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{member?.role}</p>
                </div>
                <span className={`text-sm md:text-base font-semibold data-text ${getPerformanceColor(member?.performanceScore)}`}>
                  {member?.performanceScore}%
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                <div className="p-2 md:p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon name="CheckCircle" size={14} color="var(--color-success)" />
                    <span className="text-xs text-muted-foreground">Tasks</span>
                  </div>
                  <p className="text-sm md:text-base font-semibold data-text">
                    {member?.tasksCompleted}/{member?.tasksAssigned}
                  </p>
                </div>

                <div className="p-2 md:p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon name="Clock" size={14} color="var(--color-primary)" />
                    <span className="text-xs text-muted-foreground">Avg Time</span>
                  </div>
                  <p className="text-sm md:text-base font-semibold data-text">
                    {member?.avgResponseTime}
                  </p>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${badge?.color}`}>
                {badge?.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="p-4 md:p-5 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Team Average</span>
          <span className="font-semibold text-foreground data-text">
            {Math.round(teamMembers?.reduce((acc, member) => acc + member?.performanceScore, 0) / teamMembers?.length)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default CareTeamPerformance;