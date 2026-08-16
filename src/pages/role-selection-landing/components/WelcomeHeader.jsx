import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
  const currentDate = new Date();

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const currentTime = currentDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="text-center mb-10 md:mb-14 lg:mb-20">

      {/* 🔥 TEXT LOGO / HEADING */}
      <h1
        className="
          text-5xl md:text-6xl lg:text-7xl
          font-semibold
          tracking-tight
          mb-4
        "
        style={{
          fontFamily: `'Poppins', 'Inter', system-ui, sans-serif`,
          color: '#000000',
        }}
      >
        CareOS
      </h1>

      {/* 🔹 Sub-tagline */}
      <p className="text-sm md:text-base uppercase tracking-widest text-muted-foreground mb-6">
        Intelligent Healthcare Analytics
      </p>

      <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto px-4">
        Healthcare Analytics Dashboard – Select Your Role to Continue
      </p>

      <div className="flex items-center justify-center gap-6 text-xs md:text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Icon name="Calendar" size={16} />
          <span>{formattedDate}</span>
        </div>

        <div className="w-1 h-1 bg-muted-foreground rounded-full" />

        <div className="flex items-center gap-2">
          <Icon name="Clock" size={16} />
          <span>{currentTime}</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;
