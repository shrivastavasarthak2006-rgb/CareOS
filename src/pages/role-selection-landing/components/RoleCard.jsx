import React from 'react';
import Icon from '../../../components/AppIcon';

const RoleCard = ({ 
  role,
  title,
  description,
  iconName,
  colorScheme,
  features,
  onClick   // 👈 receive click from parent
}) => {

  const colorConfig = {
    doctor: {
      bg: 'bg-primary/5 hover:bg-primary/10',
      border: 'border-primary/20 hover:border-primary',
      icon: 'bg-primary/10 text-primary',
      text: 'text-primary',
      shadow: 'hover:shadow-[0_8px_24px_rgba(30,64,175,0.15)]'
    },
    nurse: {
      bg: 'bg-secondary/5 hover:bg-secondary/10',
      border: 'border-secondary/20 hover:border-secondary',
      icon: 'bg-secondary/10 text-secondary',
      text: 'text-secondary',
      shadow: 'hover:shadow-[0_8px_24px_rgba(15,118,110,0.15)]'
    },
    patient: {
      bg: 'bg-success/5 hover:bg-success/10',
      border: 'border-success/20 hover:border-success',
      icon: 'bg-success/10 text-success',
      text: 'text-success',
      shadow: 'hover:shadow-[0_8px_24px_rgba(5,150,105,0.15)]'
    }
  };

  const config = colorConfig?.[colorScheme] || colorConfig?.doctor;

  return (
    <div
      onClick={onClick}   // 👈 use parent click
      className={`
        ${config?.bg} ${config?.border} ${config?.shadow}
        border-2 rounded-2xl p-6 md:p-8 cursor-pointer
        transition-all duration-300 transform hover:scale-[1.02]
        flex flex-col h-full
      `}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e?.key === 'Enter' && onClick()}
      aria-label={`Access ${title}`}
    >
      <div className={`${config?.icon} w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-4 md:mb-6`}>
        <Icon name={iconName} size={32} className="md:w-10 md:h-10" />
      </div>

      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-3 md:mb-4">
        {title}
      </h2>

      <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 flex-grow">
        {description}
      </p>

      <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
        {features?.map((feature, index) => (
          <div key={index} className="flex items-start gap-2 md:gap-3">
            <Icon 
              name="Check" 
              size={16} 
              className={`${config?.text} flex-shrink-0 mt-0.5 md:w-5 md:h-5`} 
            />
            <span className="text-xs md:text-sm text-foreground/80">
              {feature}
            </span>
          </div>
        ))}
      </div>

      <div className={`flex items-center gap-2 ${config?.text} font-medium text-sm md:text-base mt-auto`}>
        <span>Access Dashboard</span>
        <Icon name="ArrowRight" size={18} className="md:w-5 md:h-5" />
      </div>
    </div>
  );
};

export default RoleCard;
