import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";

import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";

import CareOSIntro from "./pages/careos-intro";
import RoleSelectionLanding from "./pages/role-selection-landing";

import PatientFamilyDashboard from "./pages/patient-family-dashboard";
import PatientDetailAnalytics from "./pages/patient-detailed-analytics";
import DoctorClinicalDashboard from "./pages/doctor-clinical-dashboard";
import NurseOperationalDashboard from "./pages/nurse-operational-dashboard";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />

        <RouterRoutes>

          {/* =====================================================
              CAREOS INTRO / SPLASH ANIMATION
              This will open first when website starts
          ====================================================== */}

          <Route
            path="/"
            element={<CareOSIntro />}
          />

          <Route
            path="/careos-intro"
            element={<CareOSIntro />}
          />


          {/* =====================================================
              CAREOS HOME / ROLE SELECTION
              Opens automatically after intro animation
          ====================================================== */}

          <Route
            path="/role-selection-landing"
            element={<RoleSelectionLanding />}
          />


          {/* =====================================================
              PATIENT / FAMILY
          ====================================================== */}

          <Route
            path="/patient-family-dashboard"
            element={<PatientFamilyDashboard />}
          />

          <Route
            path="/patient-detail-analytics"
            element={<PatientDetailAnalytics />}
          />


          {/* =====================================================
              DOCTOR
          ====================================================== */}

          <Route
            path="/doctor-clinical-dashboard"
            element={<DoctorClinicalDashboard />}
          />


          {/* =====================================================
              NURSE
          ====================================================== */}

          <Route
            path="/nurse-operational-dashboard"
            element={<NurseOperationalDashboard />}
          />


          {/* =====================================================
              404
          ====================================================== */}

          <Route
            path="*"
            element={<NotFound />}
          />

        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;