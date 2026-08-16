import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PatientHeader = ({ patient, currentRole, onAction }) => {
  const getStatusColor = (status) => {
    const colors = {
      stable: 'bg-success/10 text-success border-success/20',
      monitoring: 'bg-warning/10 text-warning border-warning/20',
      critical: 'bg-error/10 text-error border-error/20',
      recovering: 'bg-primary/10 text-primary border-primary/20'
    };
    return colors?.[status] || colors?.stable;
  };

  const getRoleActions = () => {
    if (currentRole === 'doctor') {
      return [
        { label: 'Update Treatment', icon: 'FileEdit', variant: 'default' },
        { label: 'Order Tests', icon: 'TestTube', variant: 'outline' },
        { label: 'Prescribe', icon: 'Pill', variant: 'outline' }
      ];
    }
    if (currentRole === 'nurse') {
      return [
        { label: 'Log Vitals', icon: 'Activity', variant: 'default' },
        { label: 'Administer Meds', icon: 'Syringe', variant: 'outline' },
        { label: 'Update Notes', icon: 'FileText', variant: 'outline' }
      ];
    }
    return [
      { label: 'Message Care Team', icon: 'MessageSquare', variant: 'default' },
      { label: 'View Schedule', icon: 'Calendar', variant: 'outline' }
    ];
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-elevation-2">
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0">
            <Image
              src={patient?.avatar}
              alt={patient?.avatarAlt}
              className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-card ${
              patient?.status === 'stable' ? 'bg-success' :
              patient?.status === 'monitoring' ? 'bg-warning' :
              patient?.status === 'critical' ? 'bg-error' : 'bg-primary'
            }`} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start gap-2 mb-2">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground">
                {patient?.name}
              </h1>
              <span className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium border ${getStatusColor(patient?.status)}`}>
                {patient?.status?.charAt(0)?.toUpperCase() + patient?.status?.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 text-sm md:text-base">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon name="User" size={16} />
                <span className="data-text">{patient?.patientId}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon name="Calendar" size={16} />
                <span>{patient?.age} years • {patient?.gender}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon name="MapPin" size={16} />
                <span className="truncate">{patient?.room}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span>Admitted {patient?.admissionDate}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:ml-auto lg:items-end">
          <div className="flex flex-wrap gap-2">
            {getRoleActions()?.map((action, index) => (
              <Button
                key={index}
                variant={action?.variant}
                size="sm"
                iconName={action?.icon}
                iconPosition="left"
                onClick={() => onAction(action?.label)}
              >
                <span className="hidden sm:inline">{action?.label}</span>
              </Button>
            ))}
          </div>

          {currentRole !== 'patient' && (
            <div className="flex flex-wrap gap-2 text-xs md:text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Icon name="Stethoscope" size={14} />
                <span>Dr. {patient?.primaryDoctor}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Icon name="UserCheck" size={14} />
                <span>{patient?.assignedNurse}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {patient?.allergies && patient?.allergies?.length > 0 && currentRole !== 'patient' && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-start gap-2">
            <Icon name="AlertTriangle" size={16} color="var(--color-error)" className="mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium text-error">Allergies:</span>
              <span className="text-sm text-muted-foreground ml-2">
                {patient?.allergies?.join(', ')}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientHeader;