import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VitalSignsChart = ({ data, currentRole }) => {
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedMetrics, setSelectedMetrics] = useState(['heartRate', 'bloodPressure', 'oxygen']);

  const timeRanges = [
    { value: '6h', label: '6 Hours' },
    { value: '12h', label: '12 Hours' },
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' }
  ];

  const metrics = [
    { key: 'heartRate', label: 'Heart Rate', color: '#DC2626', unit: 'bpm', icon: 'Heart' },
    { key: 'bloodPressure', label: 'Blood Pressure', color: '#0F766E', unit: 'mmHg', icon: 'Activity' },
    { key: 'oxygen', label: 'Oxygen', color: '#1E40AF', unit: '%', icon: 'Wind' },
    { key: 'temperature', label: 'Temperature', color: '#D97706', unit: '°F', icon: 'Thermometer' }
  ];

  const toggleMetric = (metricKey) => {
    setSelectedMetrics(prev =>
      prev?.includes(metricKey)
        ? prev?.filter(m => m !== metricKey)
        : [...prev, metricKey]
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevation-3">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry?.color }} />
              <span className="text-muted-foreground">{entry?.name}:</span>
              <span className="font-medium data-text">{entry?.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-elevation-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-foreground mb-1">
            Vital Signs Monitoring
          </h2>
          <p className="text-sm text-muted-foreground">
            Real-time physiological data tracking
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {timeRanges?.map(range => (
            <Button
              key={range?.value}
              variant={timeRange === range?.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(range?.value)}
            >
              {range?.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {metrics?.map(metric => (
          <button
            key={metric?.key}
            onClick={() => toggleMetric(metric?.key)}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
              transition-all duration-250 border
              ${selectedMetrics?.includes(metric?.key)
                ? 'bg-primary/10 text-primary border-primary/20' :'bg-muted/50 text-muted-foreground border-border hover:bg-muted'
              }
            `}
          >
            <Icon name={metric?.icon} size={16} />
            <span>{metric?.label}</span>
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: metric?.color }}
            />
          </button>
        ))}
      </div>
      <div className="w-full h-64 md:h-80 lg:h-96" aria-label="Vital Signs Line Chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              dataKey="time"
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '12px' }}
              iconType="circle"
            />
            {selectedMetrics?.includes('heartRate') && (
              <Line
                type="monotone"
                dataKey="heartRate"
                stroke="#DC2626"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                name="Heart Rate (bpm)"
              />
            )}
            {selectedMetrics?.includes('bloodPressure') && (
              <Line
                type="monotone"
                dataKey="bloodPressure"
                stroke="#0F766E"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                name="Blood Pressure (mmHg)"
              />
            )}
            {selectedMetrics?.includes('oxygen') && (
              <Line
                type="monotone"
                dataKey="oxygen"
                stroke="#1E40AF"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                name="Oxygen (%)"
              />
            )}
            {selectedMetrics?.includes('temperature') && (
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#D97706"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                name="Temperature (°F)"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6 pt-6 border-t border-border">
        {metrics?.map(metric => {
          const latestValue = data?.[data?.length - 1]?.[metric?.key];
          return (
            <div key={metric?.key} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${metric?.color}15` }}
              >
                <Icon name={metric?.icon} size={20} color={metric?.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground truncate">{metric?.label}</p>
                <p className="text-lg md:text-xl font-semibold data-text">
                  {latestValue || '--'}
                  <span className="text-xs text-muted-foreground ml-1">{metric?.unit}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VitalSignsChart;