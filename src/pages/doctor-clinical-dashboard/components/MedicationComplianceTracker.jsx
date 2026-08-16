import React from 'react';
import Icon from '../../../components/AppIcon';

const MedicationComplianceTracker = ({ medications }) => {
  const getComplianceColor = (rate) => {
    if (rate >= 90) return 'text-success';
    if (rate >= 70) return 'text-warning';
    return 'text-error';
  };

  const getComplianceBgColor = (rate) => {
    if (rate >= 90) return 'bg-success';
    if (rate >= 70) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-elevation-1 overflow-hidden">
      <div className="p-4 md:p-5 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base md:text-lg font-semibold text-foreground">Medication Compliance</h3>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">Administration tracking</p>
          </div>
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Pill" size={20} color="var(--color-primary)" />
          </div>
        </div>
      </div>
      <div className="p-4 md:p-5 space-y-4">
        {medications?.map((med) => (
          <div key={med?.id} className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-base font-medium text-foreground truncate">
                  {med?.name}
                </p>
                <p className="text-xs text-muted-foreground">{med?.dosage}</p>
              </div>
              <span className={`text-sm md:text-base font-semibold data-text ${getComplianceColor(med?.complianceRate)}`}>
                {med?.complianceRate}%
              </span>
            </div>

            <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`absolute top-0 left-0 h-full ${getComplianceBgColor(med?.complianceRate)} transition-all duration-500`}
                style={{ width: `${med?.complianceRate}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{med?.administered} / {med?.scheduled} doses</span>
              <span>Next: {med?.nextDose}</span>
            </div>

            {med?.missedDoses > 0 && (
              <div className="flex items-center gap-2 p-2 bg-error/10 border border-error/20 rounded-lg">
                <Icon name="AlertCircle" size={14} color="var(--color-error)" />
                <span className="text-xs text-error">
                  {med?.missedDoses} missed dose{med?.missedDoses > 1 ? 's' : ''} in last 24h
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="p-4 md:p-5 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Overall Compliance</span>
          <span className="font-semibold text-foreground data-text">
            {Math.round(medications?.reduce((acc, med) => acc + med?.complianceRate, 0) / medications?.length)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default MedicationComplianceTracker;