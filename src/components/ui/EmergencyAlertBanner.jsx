import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const EmergencyAlertBanner = ({ 
  alerts = [],
  onDismiss = () => {},
  onAction = () => {},
  currentRole = null
}) => {
  const [visibleAlert, setVisibleAlert] = useState(null);

  useEffect(() => {
    if (alerts?.length > 0) {
      const roleFilteredAlerts = alerts?.filter(alert => 
        !alert?.roleVisibility || alert?.roleVisibility?.includes(currentRole) || alert?.roleVisibility?.includes('all')
      );
      
      const highestPriorityAlert = roleFilteredAlerts?.sort((a, b) => {
        const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        return priorityOrder?.[a?.severity] - priorityOrder?.[b?.severity];
      })?.[0];

      setVisibleAlert(highestPriorityAlert);
    } else {
      setVisibleAlert(null);
    }
  }, [alerts, currentRole]);

  if (!visibleAlert) {
    return null;
  }

  const severityConfig = {
    critical: {
      bgColor: 'bg-error',
      textColor: 'text-error-foreground',
      borderColor: 'border-error',
      icon: 'AlertTriangle',
      iconColor: 'var(--color-error-foreground)'
    },
    high: {
      bgColor: 'bg-warning',
      textColor: 'text-warning-foreground',
      borderColor: 'border-warning',
      icon: 'AlertCircle',
      iconColor: 'var(--color-warning-foreground)'
    },
    medium: {
      bgColor: 'bg-primary',
      textColor: 'text-primary-foreground',
      borderColor: 'border-primary',
      icon: 'Info',
      iconColor: 'var(--color-primary-foreground)'
    },
    low: {
      bgColor: 'bg-secondary',
      textColor: 'text-secondary-foreground',
      borderColor: 'border-secondary',
      icon: 'Bell',
      iconColor: 'var(--color-secondary-foreground)'
    }
  };

  const config = severityConfig?.[visibleAlert?.severity] || severityConfig?.medium;

  const handleDismiss = () => {
    setVisibleAlert(null);
    onDismiss(visibleAlert?.id);
  };

  const handleAction = (action) => {
    onAction(visibleAlert?.id, action);
  };

  return (
    <div className={`emergency-alert-banner ${config?.bgColor} ${config?.textColor} ${config?.borderColor}`}>
      <div className="emergency-alert-banner-container">
        <div className="emergency-alert-banner-icon">
          <Icon 
            name={config?.icon} 
            size={24} 
            color={config?.iconColor}
            className="animate-pulse"
          />
        </div>

        <div className="emergency-alert-banner-content">
          <div className="emergency-alert-banner-title">
            {visibleAlert?.title}
          </div>
          <div className="emergency-alert-banner-message">
            {visibleAlert?.message}
          </div>

          {visibleAlert?.actions && visibleAlert?.actions?.length > 0 && (
            <div className="emergency-alert-banner-actions">
              {visibleAlert?.actions?.map((action, index) => (
                <Button
                  key={index}
                  variant={action?.primary ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleAction(action)}
                  className={action?.primary ? '' : `${config?.textColor} border-current hover:bg-white/10`}
                >
                  {action?.label}
                </Button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleDismiss}
          className="emergency-alert-banner-close"
          aria-label="Dismiss alert"
        >
          <Icon name="X" size={24} color={config?.iconColor} />
        </button>
      </div>
    </div>
  );
};

export default EmergencyAlertBanner;