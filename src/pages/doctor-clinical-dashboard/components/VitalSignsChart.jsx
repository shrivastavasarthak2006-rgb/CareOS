import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';


const VitalSignsChart = ({ data = [], selectedPatient = null }) => {
  const [timeFilter, setTimeFilter] = useState('24h');
  const [selectedMetrics, setSelectedMetrics] = useState(['heartRate', 'oxygenLevel']);

  const timeFilters = [
    { label: '6h', value: '6h', dataPoints: 3 },
    { label: '12h', value: '12h', dataPoints: 5 },
    { label: '24h', value: '24h', dataPoints: 9 }
  ];

  const metrics = [
    { key: 'heartRate', label: 'Heart Rate', color: '#DC2626', unit: 'bpm' },
    { key: 'bloodPressureSystolic', label: 'BP Systolic', color: '#1E40AF', unit: 'mmHg' },
    { key: 'bloodPressureDiastolic', label: 'BP Diastolic', color: '#0F766E', unit: 'mmHg' },
    { key: 'oxygenLevel', label: 'Oxygen', color: '#059669', unit: '%' }
  ];

  const getFilteredData = () => {
    const filter = timeFilters?.find(f => f?.value === timeFilter);
    if (!filter) return data;
    return data?.slice(-filter?.dataPoints);
  };

  const toggleMetric = (metricKey) => {
    if (selectedMetrics?.includes(metricKey)) {
      if (selectedMetrics?.length > 1) {
        setSelectedMetrics(selectedMetrics?.filter(m => m !== metricKey));
      }
    } else {
      setSelectedMetrics([...selectedMetrics, metricKey]);
    }
  };

  const filteredData = getFilteredData();

  return (
    <div className="bg-card border border-border rounded-xl p-6 h-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1 flex items-center gap-2">
            <Icon name="Activity" size={24} className="text-primary" />
            Real-Time Vital Signs
          </h2>
          {selectedPatient && (
            <p className="text-sm text-muted-foreground">
              {selectedPatient?.name} - {selectedPatient?.patientId}
            </p>
          )}
        </div>

        {/* Time Filter Buttons */}
        <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
          {timeFilters?.map((filter) => (
            <button
              key={filter?.value}
              onClick={() => setTimeFilter(filter?.value)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-250 ${
                timeFilter === filter?.value
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {filter?.label}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Toggle Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {metrics?.map((metric) => (
          <button
            key={metric?.key}
            onClick={() => toggleMetric(metric?.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border-2 transition-all duration-250 ${
              selectedMetrics?.includes(metric?.key)
                ? 'border-current shadow-sm'
                : 'border-border text-muted-foreground hover:border-muted-foreground'
            }`}
            style={{
              color: selectedMetrics?.includes(metric?.key) ? metric?.color : undefined,
              backgroundColor: selectedMetrics?.includes(metric?.key) ? `${metric?.color}10` : undefined
            }}
          >
            <div className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: metric?.color }}
              />
              <span>{metric?.label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="time"
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px' }}
            />
            {selectedMetrics?.includes('heartRate') && (
              <Line
                type="monotone"
                dataKey="heartRate"
                stroke="#DC2626"
                strokeWidth={2}
                dot={{ fill: '#DC2626', r: 4 }}
                activeDot={{ r: 6 }}
                name="Heart Rate (bpm)"
                animationDuration={800}
                animationEasing="ease-in-out"
              />
            )}
            {selectedMetrics?.includes('bloodPressureSystolic') && (
              <Line
                type="monotone"
                dataKey="bloodPressureSystolic"
                stroke="#1E40AF"
                strokeWidth={2}
                dot={{ fill: '#1E40AF', r: 4 }}
                activeDot={{ r: 6 }}
                name="BP Systolic (mmHg)"
                animationDuration={800}
                animationEasing="ease-in-out"
              />
            )}
            {selectedMetrics?.includes('bloodPressureDiastolic') && (
              <Line
                type="monotone"
                dataKey="bloodPressureDiastolic"
                stroke="#0F766E"
                strokeWidth={2}
                dot={{ fill: '#0F766E', r: 4 }}
                activeDot={{ r: 6 }}
                name="BP Diastolic (mmHg)"
                animationDuration={800}
                animationEasing="ease-in-out"
              />
            )}
            {selectedMetrics?.includes('oxygenLevel') && (
              <Line
                type="monotone"
                dataKey="oxygenLevel"
                stroke="#059669"
                strokeWidth={2}
                dot={{ fill: '#059669', r: 4 }}
                activeDot={{ r: 6 }}
                name="Oxygen Level (%)"
                animationDuration={800}
                animationEasing="ease-in-out"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Current Values Display */}
      {selectedPatient && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Icon name="Heart" size={16} className="text-destructive" />
              <span className="text-xs text-muted-foreground">Heart Rate</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {selectedPatient?.vitals?.heartRate}
              <span className="text-sm text-muted-foreground ml-1">bpm</span>
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Icon name="Activity" size={16} className="text-primary" />
              <span className="text-xs text-muted-foreground">Blood Pressure</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {selectedPatient?.vitals?.bloodPressure}
              <span className="text-sm text-muted-foreground ml-1">mmHg</span>
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Icon name="Wind" size={16} className="text-secondary" />
              <span className="text-xs text-muted-foreground">Oxygen</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {selectedPatient?.vitals?.oxygenLevel}
              <span className="text-sm text-muted-foreground ml-1">%</span>
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Icon name="TrendingUp" size={16} className="text-success" />
              <span className="text-xs text-muted-foreground">Status</span>
            </div>
            <p className={`text-sm font-semibold uppercase ${
              selectedPatient?.status === 'critical' ? 'text-destructive' :
              selectedPatient?.status === 'stable'? 'text-success' : 'text-warning'
            }`}>
              {selectedPatient?.status}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VitalSignsChart;