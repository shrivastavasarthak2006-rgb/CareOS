import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TreatmentTimeline = ({ events, currentRole }) => {
  const [filter, setFilter] = useState('all');

  const eventTypes = [
    { value: 'all', label: 'All Events', icon: 'List' },
    { value: 'medication', label: 'Medications', icon: 'Pill' },
    { value: 'procedure', label: 'Procedures', icon: 'Scissors' },
    { value: 'test', label: 'Tests', icon: 'TestTube' },
    { value: 'consultation', label: 'Consultations', icon: 'Users' }
  ];

  const getEventIcon = (type) => {
    const icons = {
      medication: 'Pill',
      procedure: 'Scissors',
      test: 'TestTube',
      consultation: 'Users',
      vitals: 'Activity',
      admission: 'LogIn',
      discharge: 'LogOut'
    };
    return icons?.[type] || 'Circle';
  };

  const getEventColor = (type) => {
    const colors = {
      medication: 'bg-primary/10 text-primary border-primary/20',
      procedure: 'bg-error/10 text-error border-error/20',
      test: 'bg-warning/10 text-warning border-warning/20',
      consultation: 'bg-secondary/10 text-secondary border-secondary/20',
      vitals: 'bg-success/10 text-success border-success/20',
      admission: 'bg-muted text-muted-foreground border-border',
      discharge: 'bg-muted text-muted-foreground border-border'
    };
    return colors?.[type] || 'bg-muted text-muted-foreground border-border';
  };

  const filteredEvents = filter === 'all'
    ? events
    : events?.filter(event => event?.type === filter);

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-elevation-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-foreground mb-1">
            Treatment Timeline
          </h2>
          <p className="text-sm text-muted-foreground">
            Comprehensive care history and interventions
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          iconName="Download"
          iconPosition="left"
        >
          Export Timeline
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {eventTypes?.map(type => (
          <Button
            key={type?.value}
            variant={filter === type?.value ? 'default' : 'outline'}
            size="sm"
            iconName={type?.icon}
            iconPosition="left"
            onClick={() => setFilter(type?.value)}
          >
            {type?.label}
          </Button>
        ))}
      </div>
      <div className="relative">
        <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-4 md:space-y-6">
          {filteredEvents?.map((event, index) => (
            <div key={index} className="relative pl-12 md:pl-16">
              <div className={`
                absolute left-0 w-8 h-8 md:w-12 md:h-12 rounded-full border-2
                flex items-center justify-center bg-card
                ${getEventColor(event?.type)}
              `}>
                <Icon name={getEventIcon(event?.type)} size={16} />
              </div>

              <div className="bg-muted/30 rounded-lg p-3 md:p-4 hover:bg-muted/50 transition-colors duration-250">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-base font-semibold text-foreground mb-1">
                      {event?.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {event?.description}
                    </p>
                  </div>
                  <span className={`
                    px-2 py-1 rounded text-xs font-medium border flex-shrink-0
                    ${getEventColor(event?.type)}
                  `}>
                    {event?.type?.charAt(0)?.toUpperCase() + event?.type?.slice(1)}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Icon name="Clock" size={14} />
                    <span>{event?.timestamp}</span>
                  </div>
                  {event?.provider && currentRole !== 'patient' && (
                    <div className="flex items-center gap-1.5">
                      <Icon name="User" size={14} />
                      <span>{event?.provider}</span>
                    </div>
                  )}
                  {event?.status && (
                    <div className="flex items-center gap-1.5">
                      <Icon name="CheckCircle" size={14} />
                      <span>{event?.status}</span>
                    </div>
                  )}
                </div>

                {event?.notes && currentRole !== 'patient' && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs md:text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Notes:</span> {event?.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {filteredEvents?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Calendar" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">No events found for selected filter</p>
        </div>
      )}
    </div>
  );
};

export default TreatmentTimeline;