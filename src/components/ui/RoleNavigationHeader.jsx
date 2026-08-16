import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';
import SessionSecurityIndicator from './SessionSecurityIndicator';

const RoleNavigationHeader = ({
  currentRole = null,
  onRoleChange = () => {},
  privacyMode = false,
  onPrivacyToggle = () => {}
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const roleConfig = {
    doctor: {
      label: 'Clinical Dashboard',
      color: 'bg-primary text-primary-foreground',
      icon: 'Stethoscope'
    },
    patient: {
      label: 'Family Portal',
      color: 'bg-secondary text-secondary-foreground',
      icon: 'Heart'
    },
    nurse: {
      label: 'Operational Dashboard',
      color: 'bg-success text-success-foreground',
      icon: 'Activity'
    }
  };

  const navigationItems = [
  {
    label: 'Role Selection',
    path: '/role-selection-landing',
    icon: 'Users',
    roles: ['all']
  },
  {
    label: 'Clinical Dashboard',
    path: '/doctor-clinical-dashboard',
    icon: 'Stethoscope',
    roles: ['doctor']
  },
  {
    label: 'Family Portal',
    path: '/patient-family-dashboard',
    icon: 'Heart',
    roles: ['patient']
  },
  {
    label: 'Patient Analytics',
    path: '/patient-detail-analytics',
    icon: 'BarChart3',
    roles: ['doctor', 'nurse']
  }];


  const handleLogoClick = () => {
    navigate('/role-selection-landing');
    setMobileMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const getVisibleNavItems = () => {
    if (!currentRole) {
      return navigationItems?.filter((item) => item?.roles?.includes('all'));
    }
    return navigationItems?.filter((item) =>
    item?.roles?.includes('all') || item?.roles?.includes(currentRole)
    );
  };

  const visibleItems = getVisibleNavItems();

  return (
    <header className="role-navigation-header">
      <div className="role-navigation-header-container">
        <div className="flex items-center gap-6">
          <div
            className="role-navigation-header-logo"
            onClick={handleLogoClick}>

            <div className="role-navigation-header-logo-icon">
              <Image
                src="/assets/images/heart-1769265920015.png"
                alt="InstaMed Logo - Healthcare Analytics Platform with heart, QR code and medical cross symbol"
                className="w-10 h-10 rounded-lg object-contain" />

            </div>
            <span className="role-navigation-header-logo-text hidden sm:block">CareOS

            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {visibleItems?.map((item) =>
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                  transition-all duration-250 hover:bg-muted
                  ${isActivePath(item?.path) ?
              'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'}
                `
              }>

                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </button>
            )}
          </nav>
        </div>

        <div className="role-navigation-header-actions">
          {currentRole && roleConfig?.[currentRole] &&
          <div className={`role-navigation-header-role-badge ${roleConfig?.[currentRole]?.color} hidden md:flex items-center gap-2`}>
              <Icon name={roleConfig?.[currentRole]?.icon} size={16} />
              <span>{roleConfig?.[currentRole]?.label}</span>
            </div>
          }

          <SessionSecurityIndicator
            privacyMode={privacyMode}
            onPrivacyToggle={onPrivacyToggle} />


          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-250"
            aria-label="Toggle mobile menu">

            <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
      </div>
      {mobileMenuOpen &&
      <div className="lg:hidden bg-card border-t border-border">
          <nav className="px-4 py-3 space-y-1">
            {visibleItems?.map((item) =>
          <button
            key={item?.path}
            onClick={() => handleNavigation(item?.path)}
            className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                  transition-all duration-250
                  ${isActivePath(item?.path) ?
            'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}
                `
            }>

                <Icon name={item?.icon} size={20} />
                <span>{item?.label}</span>
              </button>
          )}
          </nav>

          {currentRole && roleConfig?.[currentRole] &&
        <div className="px-4 py-3 border-t border-border">
              <div className={`role-navigation-header-role-badge ${roleConfig?.[currentRole]?.color} justify-center`}>
                <Icon name={roleConfig?.[currentRole]?.icon} size={16} />
                <span>{roleConfig?.[currentRole]?.label}</span>
              </div>
            </div>
        }
        </div>
      }
    </header>);

};

export default RoleNavigationHeader;