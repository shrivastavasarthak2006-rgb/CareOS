import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertHistoryPanel = ({ alerts, currentRole }) => {
  const [filter, setFilter] = useState('all');

  const severityLevels = [
    { value: 'all', label: 'All Alerts' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' }
  ];

  const getSeverityConfig = (severity) => {
    const configs = {
      critical: {
        bg: 'bg-error/10',
        text: 'text-error',
        border: 'border-error/20',
        icon: 'AlertTriangle'
      },
      high: {
        bg: 'bg-warning/10',
        text: 'text-warning',
        border: 'border-warning/20',
        icon: 'AlertCircle'
      },
      medium: {
        bg: 'bg-primary/10',
        text: 'text-primary',
        border: 'border-primary/20',
        icon: 'Info'
      },
      low: {
        bg: 'bg-muted',
        text: 'text-muted-foreground',
        border: 'border-border',
        icon: 'Bell'
      }
    };
    return configs?.[severity] || configs?.medium;
  };

  const filteredAlerts = filter === 'all'
    ? alerts
    : alerts?.filter(alert => alert?.severity === filter);

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-elevation-2">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-foreground mb-1">
            Alert History
          </h2>
          <p className="text-sm text-muted-foreground">
            System notifications and warnings
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {severityLevels?.map(level => (
          <Button
            key={level?.value}
            variant={filter === level?.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(level?.value)}
          >
            {level?.label}
          </Button>
        ))}
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredAlerts?.map((alert, index) => {
          const config = getSeverityConfig(alert?.severity);
          return (
            <div
              key={index}
              className={`
                rounded-lg p-4 border transition-all duration-250
                ${config?.bg} ${config?.border}
                hover:shadow-elevation-1
              `}
            >
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 ${config?.text}`}>
                  <Icon name={config?.icon} size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className={`text-sm font-semibold ${config?.text}`}>
                      {alert?.title}
                    </h3>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${config?.bg} ${config?.text} ${config?.border}`}>
                      {alert?.severity?.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-foreground mb-2">
                    {alert?.message}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={12} />
                      <span>{alert?.timestamp}</span>
                    </div>
                    {alert?.acknowledgedBy && currentRole !== 'patient' && (
                      <div className="flex items-center gap-1">
                        <Icon name="CheckCircle" size={12} />
                        <span>Acknowledged by {alert?.acknowledgedBy}</span>
                      </div>
                    )}
                  </div>
                  {alert?.action && (
                    <div className="mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className={`${config?.text} border-current`}
                      >
                        {alert?.action}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {filteredAlerts?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Bell" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">No alerts found</p>
        </div>
      )}
    </div>
  );
};

export default AlertHistoryPanel;