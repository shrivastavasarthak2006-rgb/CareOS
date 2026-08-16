import React from 'react';
import Icon from '../../../components/AppIcon';

const ComplianceBadges = () => {
  const badges = [
    {
      id: 1,
      icon: 'Shield',
      title: 'HIPAA Compliant',
      description: 'Full compliance with healthcare privacy regulations'
    },
    {
      id: 2,
      icon: 'Lock',
      title: 'SOC 2 Type II',
      description: 'Certified security and availability controls'
    },
    {
      id: 3,
      icon: 'FileCheck',
      title: 'HL7 FHIR',
      description: 'Interoperable healthcare data standards'
    },
    {
      id: 4,
      icon: 'ShieldCheck',
      title: 'ISO 27001',
      description: 'Information security management certified'
    }
  ];

  return (
    <div className="bg-muted/30 border border-border rounded-xl p-4 md:p-6">
      <div className="flex items-center gap-2 mb-4 md:mb-6">
        <Icon name="Award" size={20} className="text-primary" />
        <h3 className="text-base md:text-lg font-semibold text-foreground">
          Security & Compliance
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {badges?.map((badge) => (
          <div
            key={badge?.id}
            className="bg-card border border-border rounded-lg p-3 md:p-4 hover:shadow-elevation-2 transition-all duration-250"
          >
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 text-primary w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={badge?.icon} size={20} className="md:w-6 md:h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm md:text-base font-semibold text-foreground mb-1">
                  {badge?.title}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                  {badge?.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplianceBadges;