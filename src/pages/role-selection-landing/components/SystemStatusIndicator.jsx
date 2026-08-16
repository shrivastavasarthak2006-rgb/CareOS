import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SystemStatusIndicator = () => {
  const [systemStatus, setSystemStatus] = useState({
    dataConnectivity: 'operational',
    lastUpdate: new Date(),
    activeUsers: 247
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        lastUpdate: new Date(),
        activeUsers: Math.floor(Math.random() * 50) + 220
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusConfig = () => {
    switch (systemStatus?.dataConnectivity) {
      case 'operational':
        return {
          color: 'text-success',
          bg: 'bg-success/10',
          icon: 'CheckCircle2',
          label: 'All Systems Operational'
        };
      case 'degraded':
        return {
          color: 'text-warning',
          bg: 'bg-warning/10',
          icon: 'AlertCircle',
          label: 'Degraded Performance'
        };
      case 'outage':
        return {
          color: 'text-error',
          bg: 'bg-error/10',
          icon: 'XCircle',
          label: 'System Outage'
        };
      default:
        return {
          color: 'text-muted-foreground',
          bg: 'bg-muted',
          icon: 'HelpCircle',
          label: 'Status Unknown'
        };
    }
  };

  const statusConfig = getStatusConfig();

  const formatLastUpdate = () => {
    const now = new Date();
    const diff = Math.floor((now - systemStatus?.lastUpdate) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base md:text-lg font-semibold text-foreground">
          System Status
        </h3>
        <div className={`${statusConfig?.bg} ${statusConfig?.color} px-3 py-1.5 rounded-full flex items-center gap-2`}>
          <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
          <span className="text-xs md:text-sm font-medium">Live</span>
        </div>
      </div>
      <div className="space-y-3 md:space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name={statusConfig?.icon} size={20} className={statusConfig?.color} />
            <span className="text-sm md:text-base text-foreground">
              {statusConfig?.label}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4 pt-3 border-t border-border">
          <div>
            <div className="text-xs md:text-sm text-muted-foreground mb-1">
              Active Users
            </div>
            <div className="text-lg md:text-xl font-semibold text-foreground data-text">
              {systemStatus?.activeUsers}
            </div>
          </div>
          <div>
            <div className="text-xs md:text-sm text-muted-foreground mb-1">
              Last Update
            </div>
            <div className="text-lg md:text-xl font-semibold text-foreground">
              {formatLastUpdate()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatusIndicator;