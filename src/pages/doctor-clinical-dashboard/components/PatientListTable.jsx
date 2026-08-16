import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PatientListTable = ({ patients, onPatientSelect, selectedPatientId }) => {
  const getStatusColor = (status) => {
    const colors = {
      critical: 'bg-error text-error-foreground',
      stable: 'bg-success text-success-foreground',
      monitoring: 'bg-warning text-warning-foreground',
      recovering: 'bg-primary text-primary-foreground'
    };
    return colors?.[status] || colors?.stable;
  };

  const getStatusIcon = (status) => {
    const icons = {
      critical: 'AlertTriangle',
      stable: 'CheckCircle',
      monitoring: 'Activity',
      recovering: 'TrendingUp'
    };
    return icons?.[status] || 'Activity';
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-elevation-1 overflow-hidden">
      <div className="p-4 md:p-5 border-b border-border">
        <h3 className="text-base md:text-lg font-semibold text-foreground">Active Patients</h3>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">Real-time patient monitoring</p>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-3 md:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-3 md:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                  Status
                </th>
                <th className="px-3 md:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                  Vitals
                </th>
                <th className="px-3 md:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {patients?.map((patient) => (
                <tr
                  key={patient?.id}
                  onClick={() => onPatientSelect(patient?.id)}
                  className={`
                    cursor-pointer transition-colors duration-250 hover:bg-muted/50
                    ${selectedPatientId === patient?.id ? 'bg-primary/5' : ''}
                  `}
                >
                  <td className="px-3 md:px-4 py-3 md:py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 md:gap-3">
                      <Image
                        src={patient?.avatar}
                        alt={patient?.avatarAlt}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                      />
                      <div className="min-w-0">
                        <p className="text-sm md:text-base font-medium text-foreground truncate">
                          {patient?.name}
                        </p>
                        <p className="text-xs text-muted-foreground">ID: {patient?.patientId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 md:px-4 py-3 md:py-4 whitespace-nowrap hidden md:table-cell">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(patient?.status)}`}>
                      <Icon name={getStatusIcon(patient?.status)} size={14} />
                      {patient?.status}
                    </span>
                  </td>
                  <td className="px-3 md:px-4 py-3 md:py-4 hidden lg:table-cell">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs">
                        <Icon name="Heart" size={14} color="var(--color-error)" />
                        <span className="data-text">{patient?.vitals?.heartRate} bpm</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Icon name="Activity" size={14} color="var(--color-primary)" />
                        <span className="data-text">{patient?.vitals?.bloodPressure}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 md:px-4 py-3 md:py-4 whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e?.stopPropagation();
                        onPatientSelect(patient?.id);
                      }}
                      className="text-primary hover:text-primary/80 transition-colors duration-250"
                    >
                      <Icon name="ChevronRight" size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientListTable;