import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickAccessInfo = () => {
  const infoItems = [
    {
      id: 1,
      icon: 'Zap',
      title: 'Real-Time Analytics',
      description: 'Live patient data monitoring with sub-minute refresh rates'
    },
    {
      id: 2,
      icon: 'Users',
      title: 'Multi-Role Access',
      description: 'Role-based dashboards for doctors, nurses, and families'
    },
    {
      id: 3,
      icon: 'TrendingUp',
      title: 'Clinical Insights',
      description: 'Data-driven decision support and outcome tracking'
    },
    {
      id: 4,
      icon: 'Shield',
      title: 'Privacy Protected',
      description: 'HIPAA-compliant with audit trails and access controls'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
      {infoItems?.map((item) => (
        <div
          key={item?.id}
          className="bg-card border border-border rounded-xl p-4 md:p-6 hover:shadow-elevation-2 transition-all duration-250"
        >
          <div className="bg-primary/10 text-primary w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-3 md:mb-4">
            <Icon name={item?.icon} size={24} className="md:w-7 md:h-7" />
          </div>
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
            {item?.title}
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground">
            {item?.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default QuickAccessInfo;