import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CareActivitiesSection = ({ activities, visitSchedule }) => {
  const [selectedDate, setSelectedDate] = useState('today');

  const dateOptions = [
    { value: 'today', label: 'Today' },
    { value: 'tomorrow', label: 'Tomorrow' },
    { value: 'week', label: 'This Week' }
  ];

  const activityTypeConfig = {
    medication: {
      icon: 'Pill',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    checkup: {
      icon: 'Stethoscope',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    therapy: {
      icon: 'Activity',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    meal: {
      icon: 'Utensils',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    rest: {
      icon: 'Moon',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted/30'
    },
    visit: {
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    }
  };

  const getActivityStatus = (time) => {
    const now = new Date();
    const activityTime = new Date(time);
    
    if (activityTime < now) return 'completed';
    if (activityTime?.getTime() - now?.getTime() < 3600000) return 'upcoming';
    return 'scheduled';
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-elevation-1">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Calendar" size={20} color="var(--color-primary)" />
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">Daily Care Schedule</h2>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {dateOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => setSelectedDate(option?.value)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all duration-250 whitespace-nowrap
                ${selectedDate === option?.value
                  ? 'bg-primary text-primary-foreground shadow-elevation-1'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }
              `}
            >
              {option?.label}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4 mb-8">
        {activities?.map((activity) => {
          const config = activityTypeConfig?.[activity?.type] || activityTypeConfig?.checkup;
          const status = getActivityStatus(activity?.time);

          return (
            <div 
              key={activity?.id}
              className={`
                bg-card rounded-xl p-4 md:p-5 border-2 transition-all duration-250
                ${status === 'completed' ? 'border-success/30 bg-success/5' : 'border-border'}
                ${status === 'upcoming' ? 'border-primary/30 bg-primary/5' : ''}
                hover:shadow-elevation-2
              `}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-12 h-12 ${config?.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon name={config?.icon} size={20} className={config?.color} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-base md:text-lg text-foreground">
                      {activity?.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground data-text">
                        {activity?.time}
                      </span>
                      {status === 'completed' && (
                        <span className="px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-full flex items-center gap-1">
                          <Icon name="Check" size={12} />
                          Done
                        </span>
                      )}
                      {status === 'upcoming' && (
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full flex items-center gap-1 animate-pulse">
                          <Icon name="Clock" size={12} />
                          Soon
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm md:text-base text-muted-foreground mb-3">
                    {activity?.description}
                  </p>

                  {activity?.notes && (
                    <div className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg">
                      <Icon name="Info" size={16} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground">{activity?.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Users" size={20} color="var(--color-primary)" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">Family Visit Times</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visitSchedule?.map((visit) => (
            <div 
              key={visit?.id}
              className="bg-white rounded-lg p-4 hover:shadow-elevation-2 transition-all duration-250"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-foreground">{visit?.period}</span>
                <span className="text-sm text-muted-foreground data-text">{visit?.time}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{visit?.notes}</p>
              <Button 
                variant="outline" 
                size="sm" 
                iconName="Calendar"
                iconPosition="left"
                className="w-full"
              >
                Schedule Visit
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareActivitiesSection;