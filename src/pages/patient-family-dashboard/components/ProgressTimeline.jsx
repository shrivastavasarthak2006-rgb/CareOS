import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressTimeline = ({ milestones = [], currentPhaseIndex = 0 }) => {
  const getPhaseStatus = (index) => {
    if (index < currentPhaseIndex) return 'completed';
    if (index === currentPhaseIndex) return 'current';
    return 'upcoming';
  };

  const getStatusConfig = (status) => {
    const configs = {
      completed: {
        bgColor: 'bg-success',
        borderColor: 'border-success',
        textColor: 'text-success',
        icon: 'CheckCircle2',
        lineColor: 'bg-success'
      },
      current: {
        bgColor: 'bg-primary',
        borderColor: 'border-primary',
        textColor: 'text-primary',
        icon: 'Activity',
        lineColor: 'bg-gradient-to-r from-success to-primary'
      },
      upcoming: {
        bgColor: 'bg-muted',
        borderColor: 'border-border',
        textColor: 'text-muted-foreground',
        icon: 'Circle',
        lineColor: 'bg-muted'
      }
    };
    return configs?.[status] || configs?.upcoming;
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-elevation-1 border border-teal-100">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-teal-500/20 rounded-xl flex items-center justify-center">
          <Icon name="MapPin" size={24} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Care Journey Timeline</h2>
          <p className="text-sm text-muted-foreground">Track your progress through each phase</p>
        </div>
      </div>

      <div className="relative">
        {milestones?.map((milestone, index) => {
          const status = getPhaseStatus(index);
          const config = getStatusConfig(status);
          const isLast = index === milestones?.length - 1;

          return (
            <div key={milestone?.id} className="relative pb-10 last:pb-0">
              {/* Connecting Line */}
              {!isLast && (
                <div className="absolute left-6 top-12 w-0.5 h-full -ml-px">
                  <div className={`w-full h-full ${config?.lineColor}`} />
                </div>
              )}

              {/* Timeline Node */}
              <div className="relative flex items-start gap-4">
                {/* Icon Circle */}
                <div className={`relative z-10 w-12 h-12 rounded-full ${config?.bgColor} border-4 ${config?.borderColor} flex items-center justify-center flex-shrink-0 shadow-lg ${
                  status === 'current' ? 'animate-pulse' : ''
                }`}>
                  <Icon name={config?.icon} size={20} className="text-white" />
                </div>

                {/* Content Card */}
                <div className={`flex-1 bg-gradient-to-br rounded-xl p-5 border-2 transition-all duration-300 ${
                  status === 'current' ?'from-primary/10 to-teal-500/10 border-primary/30 shadow-md scale-[1.02]'
                    : status === 'completed' ?'from-success/5 to-emerald-500/5 border-success/20' :'from-muted/30 to-white border-border'
                }`}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold mb-1 ${
                        status === 'current' ? 'text-primary' : 'text-foreground'
                      }`}>
                        {milestone?.phase}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {milestone?.description}
                      </p>
                    </div>
                    {status === 'current' && (
                      <div className="px-3 py-1 bg-primary/20 rounded-full border border-primary/30">
                        <span className="text-xs font-semibold text-primary uppercase">Active</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="Calendar" size={14} />
                      <span>{milestone?.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="Clock" size={14} />
                      <span>{milestone?.duration}</span>
                    </div>
                    {status === 'completed' && (
                      <div className="flex items-center gap-1 text-success font-medium">
                        <Icon name="CheckCircle2" size={14} />
                        <span className="text-xs">Completed</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Discharge Readiness Indicator */}
      <div className="mt-6 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-5 border border-teal-200">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Home" size={20} className="text-teal-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-foreground mb-2">Discharge Readiness</h3>
            <div className="mb-3">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progress to discharge</span>
                <span className="font-bold text-teal-600">65%</span>
              </div>
              <div className="w-full bg-white rounded-full h-3 overflow-hidden border border-teal-200">
                <div
                  className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: '65%' }}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              You're making excellent progress! The care team will provide detailed home care instructions before discharge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTimeline;