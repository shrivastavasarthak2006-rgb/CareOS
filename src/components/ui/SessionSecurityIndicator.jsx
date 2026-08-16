import React, { useState, useEffect, useRef } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const SessionSecurityIndicator = ({ 
  privacyMode = false,
  onPrivacyToggle = () => {},
  sessionTimeout = 1800,
  onSessionEnd = () => {}
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(sessionTimeout);
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onSessionEnd();
          return 0;
        }
        
        if (prev <= 300 && !showTimeoutWarning) {
          setShowTimeoutWarning(true);
        }
        
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onSessionEnd, showTimeoutWarning]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const handleExtendSession = () => {
    setTimeRemaining(sessionTimeout);
    setShowTimeoutWarning(false);
  };

  const handleEndSession = () => {
    setIsOpen(false);
    onSessionEnd();
  };

  const getSessionStatus = () => {
    if (timeRemaining <= 300) return 'warning';
    if (timeRemaining <= 600) return 'caution';
    return 'active';
  };

  const sessionStatus = getSessionStatus();

  return (
    <div className="session-security-indicator" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          session-security-indicator-button
          ${sessionStatus === 'warning' ? 'bg-warning/10 text-warning' : ''}
          ${sessionStatus === 'caution' ? 'bg-warning/5 text-warning' : ''}
        `}
        aria-label="Session security"
      >
        <div className="session-security-indicator-icon">
          {privacyMode ? (
            <Icon name="ShieldCheck" size={20} color="var(--color-success)" />
          ) : (
            <Icon name="Shield" size={20} />
          )}
        </div>
        <span className="session-security-indicator-text hidden md:block">
          {formatTime(timeRemaining)}
        </span>
        {sessionStatus === 'warning' && (
          <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div className="session-security-indicator-dropdown">
          <div className="session-security-indicator-dropdown-header">
            <div className="session-security-indicator-dropdown-title">
              Session Security
            </div>
          </div>

          <div className="session-security-indicator-dropdown-content">
            <div className="session-security-indicator-info-row">
              <span className="session-security-indicator-info-label">
                Session Status
              </span>
              <span className={`
                session-security-indicator-info-value
                ${sessionStatus === 'warning' ? 'text-warning' : ''}
                ${sessionStatus === 'caution' ? 'text-warning' : ''}
                ${sessionStatus === 'active' ? 'text-success' : ''}
              `}>
                {sessionStatus === 'warning' && 'Expiring Soon'}
                {sessionStatus === 'caution' && 'Active'}
                {sessionStatus === 'active' && 'Active'}
              </span>
            </div>

            <div className="session-security-indicator-info-row">
              <span className="session-security-indicator-info-label">
                Time Remaining
              </span>
              <span className={`
                session-security-indicator-info-value data-text
                ${sessionStatus === 'warning' ? 'text-warning font-semibold' : ''}
              `}>
                {formatTime(timeRemaining)}
              </span>
            </div>

            <div className="session-security-indicator-info-row">
              <span className="session-security-indicator-info-label">
                Device Type
              </span>
              <span className="session-security-indicator-info-value">
                Shared Workstation
              </span>
            </div>

            <div className="session-security-indicator-privacy-toggle">
              <div>
                <div className="session-security-indicator-privacy-label">
                  Privacy Mode
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  Enhanced data protection
                </div>
              </div>
              <button
                onClick={onPrivacyToggle}
                className={`
                  relative w-11 h-6 rounded-full transition-colors duration-250
                  ${privacyMode ? 'bg-success' : 'bg-muted'}
                `}
                aria-label="Toggle privacy mode"
              >
                <div className={`
                  absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full
                  transition-transform duration-250
                  ${privacyMode ? 'translate-x-5' : 'translate-x-0'}
                `} />
              </button>
            </div>

            {showTimeoutWarning && (
              <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <Icon name="AlertTriangle" size={16} color="var(--color-warning)" className="mt-0.5" />
                  <div className="flex-1 text-xs text-warning">
                    Your session will expire in {formatTime(timeRemaining)}. Extend to continue working.
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExtendSession}
                iconName="RefreshCw"
                iconPosition="left"
                className="flex-1"
              >
                Extend
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleEndSession}
                iconName="LogOut"
                iconPosition="left"
                className="flex-1"
              >
                End Session
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionSecurityIndicator;