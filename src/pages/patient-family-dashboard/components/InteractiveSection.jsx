import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const InteractiveSection = ({ careExplanations = [], consentItems = [] }) => {
  const [expandedExplanation, setExpandedExplanation] = useState(null);
  const [showConsentDetails, setShowConsentDetails] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Care Explanations */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-elevation-1 border border-teal-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-teal-500/20 rounded-xl flex items-center justify-center">
            <Icon name="BookOpen" size={24} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Understanding Your Care</h2>
            <p className="text-sm text-muted-foreground">Simple explanations in plain language</p>
          </div>
        </div>

        <div className="space-y-3">
          {careExplanations?.map((explanation) => (
            <div
              key={explanation?.id}
              className="bg-gradient-to-br from-teal-50/50 to-white rounded-xl border border-teal-200/50 overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => setExpandedExplanation(
                  expandedExplanation === explanation?.id ? null : explanation?.id
                )}
                className="w-full p-4 text-left flex items-start gap-3 hover:bg-teal-50/50 transition-colors duration-250"
              >
                <div className={`w-10 h-10 ${explanation?.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon name={explanation?.icon} size={20} className={explanation?.iconColor} />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-foreground mb-1">
                    {explanation?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {explanation?.summary}
                  </p>
                </div>
                <Icon
                  name={expandedExplanation === explanation?.id ? 'ChevronUp' : 'ChevronDown'}
                  size={20}
                  className="text-muted-foreground flex-shrink-0 mt-1"
                />
              </button>

              {expandedExplanation === explanation?.id && (
                <div className="px-4 pb-4 animate-fadeIn">
                  <div className="bg-white rounded-lg p-4 border border-teal-200/50">
                    <p className="text-sm text-foreground leading-relaxed mb-4">
                      {explanation?.details}
                    </p>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide">Key Points:</p>
                      {explanation?.keyPoints?.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Icon name="CheckCircle2" size={14} className="text-success mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-muted-foreground">{point}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Digital Consent & Privacy */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-elevation-1 border border-primary/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
            <Icon name="Shield" size={24} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Privacy & Consent</h2>
            <p className="text-sm text-muted-foreground">Your data protection settings</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {consentItems?.map((item) => (
            <div
              key={item?.id}
              className="bg-gradient-to-br from-primary/5 to-white rounded-xl border border-primary/20 p-4"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-foreground mb-1">
                    {item?.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item?.description}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                  item?.granted
                    ? 'bg-success/10 text-success border border-success/30' :'bg-muted text-muted-foreground border border-border'
                }`}>
                  <Icon name={item?.granted ? 'CheckCircle2' : 'XCircle'} size={12} />
                  <span>{item?.granted ? 'Granted' : 'Not Granted'}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Icon name="Clock" size={10} />
                <span>Last updated: {item?.lastUpdated}</span>
              </div>
            </div>
          ))}
        </div>

        {/* HIPAA Compliance Badge */}
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-5 border-2 border-primary/30">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="ShieldCheck" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground mb-2">HIPAA Protected</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                All your health information is encrypted and protected under federal HIPAA regulations. 
                Only authorized care team members can access your data.
              </p>
              <button
                onClick={() => setShowConsentDetails(!showConsentDetails)}
                className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
              >
                <span>{showConsentDetails ? 'Hide' : 'View'} Privacy Details</span>
                <Icon name="ChevronRight" size={14} />
              </button>
            </div>
          </div>

          {showConsentDetails && (
            <div className="mt-4 pt-4 border-t border-primary/20 animate-fadeIn">
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-start gap-2">
                  <Icon name="Lock" size={12} className="text-primary mt-0.5" />
                  <p>256-bit encryption for all data transmission</p>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Eye" size={12} className="text-primary mt-0.5" />
                  <p>Audit trail of all data access attempts</p>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="UserCheck" size={12} className="text-primary mt-0.5" />
                  <p>Role-based access control for care team</p>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Shield" size={12} className="text-primary mt-0.5" />
                  <p>HIPAA-compliant data storage and handling</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveSection;