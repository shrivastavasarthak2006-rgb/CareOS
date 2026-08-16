import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const PatientContextBreadcrumb = ({ 
  patientData = null,
  currentView = '',
  roleDashboardPath = '/role-selection-landing',
  roleDashboardLabel = 'Dashboard'
}) => {
  const navigate = useNavigate();

  if (!patientData) {
    return null;
  }

  const breadcrumbItems = [
    {
      label: roleDashboardLabel,
      path: roleDashboardPath,
      icon: 'Home'
    },
    {
      label: patientData?.displayName || 'Patient',
      path: null,
      icon: 'User'
    }
  ];

  if (currentView) {
    breadcrumbItems?.push({
      label: currentView,
      path: null,
      icon: 'FileText'
    });
  }

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  const truncateName = (name, maxLength = 25) => {
    if (name?.length <= maxLength) return name;
    return `${name?.substring(0, maxLength)}...`;
  };

  return (
    <div className="patient-context-breadcrumb">
      <div className="patient-context-breadcrumb-container">
        <button
          onClick={() => handleNavigation(roleDashboardPath)}
          className="lg:hidden p-1.5 -ml-1.5 rounded-lg hover:bg-muted transition-colors duration-250"
          aria-label="Go back"
        >
          <Icon name="ArrowLeft" size={18} />
        </button>

        <nav className="hidden lg:flex items-center gap-2 flex-wrap" aria-label="Breadcrumb">
          {breadcrumbItems?.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <span className="patient-context-breadcrumb-separator">
                  <Icon name="ChevronRight" size={16} />
                </span>
              )}
              
              {item?.path ? (
                <button
                  onClick={() => handleNavigation(item?.path)}
                  className="patient-context-breadcrumb-item group"
                  title={item?.label}
                >
                  <Icon name={item?.icon} size={16} className="group-hover:scale-110 transition-transform duration-250" />
                  <span className="hidden sm:inline">{item?.label}</span>
                </button>
              ) : (
                <div 
                  className="patient-context-breadcrumb-current flex items-center gap-2"
                  title={item?.label}
                >
                  <Icon name={item?.icon} size={16} />
                  <span className="hidden sm:inline">
                    {truncateName(item?.label)}
                  </span>
                </div>
              )}
            </React.Fragment>
          ))}
        </nav>

        <div className="lg:hidden flex items-center gap-2 text-sm">
          <Icon name="User" size={16} className="text-muted-foreground" />
          <span className="font-medium text-foreground">
            {truncateName(patientData?.displayName || 'Patient', 20)}
          </span>
          {currentView && (
            <>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{currentView}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientContextBreadcrumb;