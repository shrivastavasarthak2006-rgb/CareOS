import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const VitalSignsSummary = ({ vitals = [] }) => {
  const [expandedVital, setExpandedVital] = useState(null);

  const getStatusColor = (status) => {
    const colors = {
      excellent: 'from-emerald-500/20 to-teal-500/10 border-emerald-300',
      good: 'from-teal-500/20 to-cyan-500/10 border-teal-300',
      fair: 'from-amber-500/20 to-yellow-500/10 border-amber-300',
      concern: 'from-orange-500/20 to-red-500/10 border-orange-300'
    };
    return colors?.[status] || colors?.good;
  };

  const getStatusBadge = (status) => {
    const badges = {
      excellent: { color: 'bg-emerald-100 text-emerald-700 border-emerald-300', icon: 'CheckCircle2' },
      good: { color: 'bg-teal-100 text-teal-700 border-teal-300', icon: 'ThumbsUp' },
      fair: { color: 'bg-amber-100 text-amber-700 border-amber-300', icon: 'AlertCircle' },
      concern: { color: 'bg-orange-100 text-orange-700 border-orange-300', icon: 'AlertTriangle' }
    };
    return badges?.[status] || badges?.good;
  };

  const getTrendIcon = (trend) => {
    const icons = {
      up: { name: 'TrendingUp', color: 'text-success' },
      down: { name: 'TrendingDown', color: 'text-destructive' },
      stable: { name: 'Minus', color: 'text-muted-foreground' }
    };
    return icons?.[trend] || icons?.stable;
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-elevation-1 border border-teal-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center">
          <Icon name="Activity" size={24} className="text-teal-600" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Health Status</h2>
          <p className="text-sm text-muted-foreground">Current vital signs and trends</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vitals?.map((vital) => {
          const statusBadge = getStatusBadge(vital?.status);
          const trendIcon = getTrendIcon(vital?.trend);
          const isExpanded = expandedVital === vital?.id;

          return (
            <div
              key={vital?.id}
              className={`bg-gradient-to-br ${getStatusColor(vital?.status)} rounded-xl p-5 border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                isExpanded ? 'ring-2 ring-teal-400 scale-[1.02]' : ''
              }`}
              onClick={() => setExpandedVital(isExpanded ? null : vital?.id)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-white/80 rounded-lg flex items-center justify-center shadow-sm">
                    <Icon name={vital?.icon} size={20} className={vital?.status === 'excellent' ? 'text-emerald-600' : 'text-teal-600'} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{vital?.name}</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Icon name={trendIcon?.name} size={12} className={trendIcon?.color} />
                      <span className="text-xs text-muted-foreground capitalize">{vital?.trend}</span>
                    </div>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-md border text-xs font-semibold ${statusBadge?.color}`}>
                  {vital?.status?.toUpperCase()}
                </div>
              </div>

              {/* Value Display */}
              <div className="mb-3">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl md:text-4xl font-bold text-foreground">
                    {vital?.value}
                  </span>
                  <span className="text-lg text-muted-foreground font-medium">
                    {vital?.unit}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Normal: {vital?.normalRange}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-foreground/80 leading-relaxed">
                {vital?.description}
              </p>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-teal-200/50 animate-fadeIn">
                  <div className="bg-white/60 rounded-lg p-3">
                    <p className="text-xs font-medium text-foreground mb-2">What this means:</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {vital?.status === 'excellent' && 'This reading is in the optimal range, indicating excellent health in this area.'}
                      {vital?.status === 'good' && 'This reading is healthy and within normal parameters.'}
                      {vital?.status === 'fair' && 'This reading is acceptable but being monitored for improvement.'}
                      {vital?.status === 'concern' && 'This reading requires attention and is being closely monitored by your care team.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Tap to expand hint */}
              <div className="flex items-center justify-center gap-1 mt-3 text-xs text-teal-600 font-medium">
                <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={14} />
                <span>{isExpanded ? 'Show less' : 'Tap for details'}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall Status Summary */}
      <div className="mt-6 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-5 border border-teal-200">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Heart" size={20} className="text-success" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-foreground mb-1">Overall Health Status</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All vital signs are being monitored continuously. Your recovery is progressing well, 
              and your care team is keeping a close watch to ensure everything stays on track.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VitalSignsSummary;