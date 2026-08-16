import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const WelcomeSection = ({ patientName = '', carePhase = '', careTeam = [] }) => {
  const currentTime = new Date()?.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const currentDate = new Date()?.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="bg-gradient-to-br from-teal-500/10 via-emerald-500/5 to-white rounded-2xl p-6 md:p-8 shadow-elevation-1 border border-teal-200/50">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-teal-500/20 rounded-xl flex items-center justify-center">
              <Icon name="Heart" size={20} className="text-teal-600" />
            </div>
            <div>
              <p className="text-sm text-teal-700 font-medium">Welcome to Your Care Dashboard</p>
              <p className="text-xs text-muted-foreground">{currentDate} • {currentTime}</p>
            </div>
          </div>
          
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Hello, {patientName}!
          </h1>
          
          <p className="text-base md:text-lg text-muted-foreground mb-4">
            You're currently in the <span className="font-semibold text-teal-700">{carePhase}</span> phase. 
            Your care team is monitoring your progress and is here to support you every step of the way.
          </p>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-success/10 rounded-lg border border-success/20">
              <Icon name="CheckCircle2" size={18} className="text-success" />
              <span className="text-sm font-medium text-success">Recovery On Track</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
              <Icon name="Shield" size={18} className="text-primary" />
              <span className="text-sm font-medium text-primary">Privacy Protected</span>
            </div>
          </div>
        </div>

        {/* Care Team Preview */}
        <div className="lg:w-80">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-border">
            <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
              <Icon name="Users" size={18} className="text-primary" />
              Your Care Team
            </h3>
            <div className="space-y-3">
              {careTeam?.slice(0, 2)?.map((member) => (
                <div key={member?.id} className="flex items-center gap-3">
                  <Image
                    src={member?.photo}
                    alt={member?.photoAlt}
                    className="w-12 h-12 rounded-full object-cover border-2 border-teal-200"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{member?.name}</p>
                    <p className="text-xs text-muted-foreground">{member?.role}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    member?.available ? 'bg-success' : 'bg-muted-foreground'
                  }`} />
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-sm text-primary font-medium hover:underline flex items-center justify-center gap-1">
              <span>View Full Team</span>
              <Icon name="ChevronRight" size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;