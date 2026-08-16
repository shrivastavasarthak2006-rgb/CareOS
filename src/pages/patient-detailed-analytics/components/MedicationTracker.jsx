import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MedicationTracker = ({ medications, currentRole }) => {
  const [view, setView] = useState('current');

  const getComplianceColor = (rate) => {
    if (rate >= 90) return 'text-success';
    if (rate >= 70) return 'text-warning';
    return 'text-error';
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-success/10 text-success border-success/20',
      pending: 'bg-warning/10 text-warning border-warning/20',
      completed: 'bg-primary/10 text-primary border-primary/20',
      discontinued: 'bg-muted text-muted-foreground border-border'
    };
    return badges?.[status] || badges?.active;
  };

  const filteredMeds = view === 'current'
    ? medications?.filter(med => med?.status === 'active')
    : medications;

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-elevation-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-foreground mb-1">
            Medication Management
          </h2>
          <p className="text-sm text-muted-foreground">
            Prescription tracking and compliance monitoring
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={view === 'current' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('current')}
          >
            Current
          </Button>
          <Button
            variant={view === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('all')}
          >
            All History
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredMeds?.map((med, index) => (
          <div
            key={index}
            className="bg-muted/30 rounded-lg p-4 hover:bg-muted/50 transition-colors duration-250"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-1">
                  {med?.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {med?.dosage} • {med?.frequency}
                </p>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium border flex-shrink-0 ${getStatusBadge(med?.status)}`}>
                {med?.status?.charAt(0)?.toUpperCase() + med?.status?.slice(1)}
              </span>
            </div>

            <div className="space-y-2 mb-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Route:</span>
                <span className="font-medium text-foreground">{med?.route}</span>
              </div>
              {currentRole !== 'patient' && (
                <>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Prescribed by:</span>
                    <span className="font-medium text-foreground">{med?.prescribedBy}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Start Date:</span>
                    <span className="font-medium text-foreground data-text">{med?.startDate}</span>
                  </div>
                </>
              )}
            </div>

            {med?.compliance && (
              <div className="pt-3 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Compliance Rate</span>
                  <span className={`text-sm font-semibold data-text ${getComplianceColor(med?.compliance)}`}>
                    {med?.compliance}%
                  </span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      med?.compliance >= 90 ? 'bg-success' :
                      med?.compliance >= 70 ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${med?.compliance}%` }}
                  />
                </div>
              </div>
            )}

            {med?.nextDose && med?.status === 'active' && (
              <div className="mt-3 pt-3 border-t border-border flex items-center gap-2 text-sm">
                <Icon name="Clock" size={16} className="text-primary" />
                <span className="text-muted-foreground">Next dose:</span>
                <span className="font-medium text-foreground">{med?.nextDose}</span>
              </div>
            )}

            {currentRole !== 'patient' && med?.notes && (
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Notes:</span> {med?.notes}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      {filteredMeds?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Pill" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">No medications found</p>
        </div>
      )}
    </div>
  );
};

export default MedicationTracker;