import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ 
  title, 
  value, 
  unit, 
  trend, 
  trendValue, 
  icon, 
  iconColor,
  sparklineData = []
}) => {
  const trendIcon = trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus';
  const trendColor = trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-muted-foreground';

  const maxValue = Math.max(...sparklineData);
  const minValue = Math.min(...sparklineData);
  const range = maxValue - minValue || 1;

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-5 lg:p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-250">
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">{title}</p>
          <div className="flex items-baseline gap-1 md:gap-2">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground data-text">
              {value}
            </h3>
            {unit && (
              <span className="text-sm md:text-base text-muted-foreground">{unit}</span>
            )}
          </div>
        </div>
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0`}>
          <Icon name={icon} size={20} color={iconColor || 'var(--color-primary)'} />
        </div>
      </div>
      {sparklineData?.length > 0 && (
        <div className="h-8 md:h-10 mb-2 md:mb-3">
          <svg width="100%" height="100%" className="overflow-visible">
            <polyline
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2"
              points={sparklineData?.map((value, index) => {
                const x = (index / (sparklineData?.length - 1)) * 100;
                const y = 100 - ((value - minValue) / range) * 100;
                return `${x},${y}`;
              })?.join(' ')}
            />
          </svg>
        </div>
      )}
      {trendValue && (
        <div className={`flex items-center gap-1 md:gap-2 ${trendColor}`}>
          <Icon name={trendIcon} size={16} />
          <span className="text-xs md:text-sm font-medium">{trendValue}</span>
          <span className="text-xs text-muted-foreground">vs last period</span>
        </div>
      )}
    </div>
  );
};

export default KPICard;