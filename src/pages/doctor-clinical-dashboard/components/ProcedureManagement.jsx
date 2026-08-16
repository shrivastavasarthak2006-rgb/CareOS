import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcedureManagement = () => {
  const [selectedProcedure, setSelectedProcedure] = useState(null);

  const procedures = [
    {
      id: 'proc1',
      name: 'Cardiac Catheterization',
      patient: 'Anuskhka Agrawal',
      patientId: 'P-2847',
      scheduledDate: '01/12/2026',
      scheduledTime: '09:00 AM',
      status: 'scheduled',
      consentStatus: 'pending',
      preOpChecklist: {
        completed: 3,
        total: 5
      },
      priority: 'high'
    },
    {
      id: 'proc2',
      name: 'Endoscopy',
      patient: 'Rishab Thakur',
      patientId: 'P-2848',
      scheduledDate: '01/11/2026',
      scheduledTime: '02:00 PM',
      status: 'ready',
      consentStatus: 'signed',
      preOpChecklist: {
        completed: 5,
        total: 5
      },
      priority: 'medium'
    },
    {
      id: 'proc3',
      name: 'MRI Scan',
      patient: 'Monika',
      patientId: 'P-2849',
      scheduledDate: '01/11/2026',
      scheduledTime: '11:00 AM',
      status: 'in-progress',
      consentStatus: 'signed',
      preOpChecklist: {
        completed: 4,
        total: 4
      },
      priority: 'medium'
    }
  ];

  const getStatusConfig = (status) => {
    const configs = {
      scheduled: { color: 'bg-primary/10 text-primary border-primary/30', icon: 'Calendar' },
      ready: { color: 'bg-success/10 text-success border-success/30', icon: 'CheckCircle2' },
      'in-progress': { color: 'bg-warning/10 text-warning border-warning/30', icon: 'Clock' },
      completed: { color: 'bg-muted text-muted-foreground border-border', icon: 'Check' }
    };
    return configs?.[status] || configs?.scheduled;
  };

  const getConsentConfig = (status) => {
    const configs = {
      signed: { color: 'text-success', icon: 'CheckCircle2', label: 'Signed' },
      pending: { color: 'text-warning', icon: 'Clock', label: 'Pending' },
      expired: { color: 'text-destructive', icon: 'AlertCircle', label: 'Expired' }
    };
    return configs?.[status] || configs?.pending;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-destructive',
      medium: 'text-warning',
      low: 'text-muted-foreground'
    };
    return colors?.[priority] || colors?.medium;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Icon name="Clipboard" size={24} className="text-primary" />
          Procedure Management
        </h2>
        <Button size="sm" variant="outline" iconName="Plus" iconPosition="left">
          Schedule Procedure
        </Button>
      </div>

      <div className="space-y-4">
        {procedures?.map((procedure) => {
          const statusConfig = getStatusConfig(procedure?.status);
          const consentConfig = getConsentConfig(procedure?.consentStatus);
          const checklistProgress = (procedure?.preOpChecklist?.completed / procedure?.preOpChecklist?.total) * 100;

          return (
            <div
              key={procedure?.id}
              className="bg-background border border-border rounded-lg p-4 hover:shadow-md transition-all duration-250"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-base font-semibold text-foreground">
                      {procedure?.name}
                    </h3>
                    <Icon
                      name="AlertCircle"
                      size={14}
                      className={getPriorityColor(procedure?.priority)}
                    />
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Icon name="User" size={14} />
                      <span>{procedure?.patient}</span>
                    </div>
                    <span className="text-xs">•</span>
                    <span className="text-xs">{procedure?.patientId}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Calendar" size={14} />
                      <span>{procedure?.scheduledDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={14} />
                      <span>{procedure?.scheduledTime}</span>
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 ${statusConfig?.color}`}>
                  <Icon name={statusConfig?.icon} size={12} />
                  <span className="capitalize">{procedure?.status?.replace('-', ' ')}</span>
                </div>
              </div>

              {/* Digital Consent Status */}
              <div className="bg-muted/50 rounded-md p-3 mb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon name="FileText" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-foreground">Digital Consent</span>
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-semibold ${consentConfig?.color}`}>
                    <Icon name={consentConfig?.icon} size={14} />
                    <span>{consentConfig?.label}</span>
                  </div>
                </div>
              </div>

              {/* Pre-Op Checklist Progress */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Pre-Op Checklist</span>
                  <span className="font-semibold text-foreground">
                    {procedure?.preOpChecklist?.completed}/{procedure?.preOpChecklist?.total}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-500"
                    style={{ width: `${checklistProgress}%` }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1" iconName="Eye">
                  View Details
                </Button>
                {procedure?.consentStatus === 'pending' && (
                  <Button size="sm" variant="default" iconName="FileSignature">
                    Request Consent
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProcedureManagement;