import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Stethoscope,
  Users,
  Clipboard,
  UserCog,
  ScanLine,
  FlaskConical,
  Pill,
  ArrowRight,
  ShieldCheck,
  LockKeyhole,
  Cloud,
  Layers3,
  Clock3,
  Sparkles,
  X,
} from "lucide-react";

const RoleSelectionLanding = () => {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  /* =========================================================
     ROLES
     ONLY DOCTOR, NURSE AND PATIENT/FAMILY ARE ACTIVE
  ========================================================= */

  const roles = [
    {
      id: "doctor",
      title: "Doctor",
      subtitle: "Care & Diagnose",
      icon: Stethoscope,
      color: "#2F80ED",
      active: true,
      route: "/doctor-clinical-dashboard",
      position: "doctor",
    },

    {
      id: "nurse",
      title: "Nurse",
      subtitle: "Care & Monitor",
      icon: Clipboard,
      color: "#20C997",
      active: true,
      route: "/nurse-operational-dashboard",
      position: "nurse",
    },

    {
      id: "admin",
      title: "Reception / Admin",
      subtitle: "Manage & Coordinate",
      icon: UserCog,
      color: "#FF9F2D",
      active: false,
      route: null,
      position: "admin",
    },

    {
      id: "pharmacy",
      title: "Pharmacy",
      subtitle: "Medications & Inventory",
      icon: Pill,
      color: "#F45B9A",
      active: false,
      route: null,
      position: "pharmacy",
    },

    {
      id: "pathology",
      title: "Pathology",
      subtitle: "Tests & Reports",
      icon: FlaskConical,
      color: "#9257F3",
      active: false,
      route: null,
      position: "pathology",
    },

    {
      id: "radiology",
      title: "Radiology",
      subtitle: "Imaging & Scans",
      icon: ScanLine,
      color: "#4F7FF2",
      active: false,
      route: null,
      position: "radiology",
    },

    {
      id: "patient",
      title: "Patient / Family",
      subtitle: "Health & Records",
      icon: Users,
      color: "#9C4DEB",
      active: true,
      route: "/patient-family-dashboard",
      position: "patient",
    },
  ];

  /* =========================================================
     OPEN LOGIN
  ========================================================= */

  const openLogin = (role) => {
    if (!role.active) return;

    setSelectedRole(role);
    setUsername("");
    setPassword("");
    setError("");
  };

  /* =========================================================
     CLOSE LOGIN
  ========================================================= */

  const closeLogin = () => {
    setSelectedRole(null);
    setUsername("");
    setPassword("");
    setError("");
  };

  /* =========================================================
     LOGIN
  ========================================================= */

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "1234") {
      if (selectedRole?.route) {
        navigate(selectedRole.route);
        closeLogin();
      }
    } else {
      setError("Invalid Username or Password");
    }
  };

  return (
    <div
      className="min-h-screen bg-[#F7F9FF] text-[#102A56]"
      style={{
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
      }}
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="px-3 sm:px-5 lg:px-7 pt-3">
        <div className="h-[78px] rounded-[24px] border border-[#E9EDF7] bg-white/95 flex items-center justify-between px-5 lg:px-10 shadow-sm">

          {/* LOGO */}

          <div className="flex items-center gap-3 min-w-fit">
            <img
              src="/assets/images/CareOS_logo_transparent_single.png"
              alt="CareOS Logo"
              className="w-[50px] h-[50px] object-contain"
              onError={(e) => {
                console.error(
                  "CareOS logo not found:",
                  "/assets/images/CareOS_logo_transparent_single.png"
                );
              }}
            />

            <span className="text-[28px] font-extrabold tracking-[-1.5px] text-[#102A56]">
              Care<span className="text-[#2E68E8]">OS</span>
            </span>
          </div>

          {/* NAVIGATION */}

          <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-[15px] font-semibold">

            <button className="relative text-[#2E68E8] py-7">
              Home

              <span className="absolute left-0 right-0 bottom-0 mx-auto h-[3px] w-[52px] rounded-full bg-[#2E68E8]" />
            </button>

            <button className="hover:text-[#2E68E8] transition">
              Platform
            </button>

            <button className="hover:text-[#2E68E8] transition flex items-center gap-1">
              Solutions
              <span className="text-xs">⌄</span>
            </button>

            <button className="hover:text-[#2E68E8] transition">
              About Us
            </button>

            <button className="hover:text-[#2E68E8] transition">
              Security
            </button>

            <button className="hover:text-[#2E68E8] transition">
              Contact
            </button>

          </nav>

          {/* RIGHT SIDE INTENTIONALLY EMPTY */}

          <div className="w-[50px] hidden sm:block"></div>

        </div>
      </header>


      {/* =====================================================
          HERO
      ====================================================== */}

      <main className="px-5 lg:px-10">

        <section className="max-w-[1450px] mx-auto min-h-[790px] flex items-center">

          <div className="w-full grid grid-cols-1 lg:grid-cols-[43%_57%] gap-4 items-center">

            {/* =================================================
                LEFT CONTENT
            ================================================== */}

            <div className="relative z-10 pt-10 lg:pt-0">

              {/* BADGE */}

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D8DDFB] bg-white/70 text-[#2767E8] text-[13px] font-bold mb-7 shadow-sm">

                <Sparkles size={15} />

                AI-NATIVE HEALTHCARE PLATFORM

              </div>


              {/* HEADING */}

              <h1 className="text-[44px] sm:text-[52px] lg:text-[58px] xl:text-[64px] leading-[1.08] font-extrabold tracking-[-2.5px] max-w-[650px] text-[#102A56]">

                Welcome to the future

                <br />

                of{" "}

                <span className="bg-gradient-to-r from-[#2475E9] via-[#6366F1] to-[#E85DAF] bg-clip-text text-transparent">

                  connected healthcare.

                </span>

              </h1>


              {/* GRADIENT LINE */}

              <div className="mt-7 h-[4px] w-[96px] rounded-full bg-gradient-to-r from-[#2675F1] via-[#7448EE] to-[#ED63B3]" />


              {/* DESCRIPTION */}

              <p className="mt-7 text-[16px] sm:text-[17px] leading-[1.85] max-w-[500px] text-[#52698E]">

                CareOS brings every role, every department, and every patient
                together on one intelligent platform to deliver seamless care
                and better outcomes.

              </p>


              {/* CTA */}

              <button
                onClick={() => openLogin(roles[0])}
                className="mt-7 inline-flex items-center gap-5 px-7 py-4 rounded-[10px] bg-gradient-to-r from-[#2474EE] to-[#8738E9] text-white text-[16px] font-bold shadow-xl shadow-blue-200/50 hover:scale-[1.02] transition"
              >

                Explore CareOS

                <ArrowRight size={21} />

              </button>

            </div>


            {/* =================================================
                RIGHT CAREOS CIRCLE
            ================================================== */}

            <div className="relative h-[700px] flex items-center justify-center">

              {/* SOFT OUTER GLOW */}

              <div
                className="absolute w-[610px] h-[610px] rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(80,140,245,0.055) 0%, rgba(255,255,255,0) 70%)",
                  filter: "blur(12px)",
                }}
              />


              {/* MAIN SOFT GRADIENT CIRCLE */}

              <div
                className="absolute w-[610px] h-[610px] rounded-full pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(90,130,240,.055), rgba(255,255,255,.015), rgba(79,206,190,.045))",
                  boxShadow:
                    "inset 0 0 80px rgba(255,255,255,.72), 0 0 70px rgba(80,120,220,.045)",
                }}
              />


              {/* OUTER GRADIENT RING */}

              <div
                className="absolute w-[610px] h-[610px] rounded-full pointer-events-none"
                style={{
                  padding: "1.5px",
                  background:
                    "conic-gradient(from 215deg, #6D73EF 0deg, #7D8EF0 90deg, #9AB8F2 190deg, #63D0D0 285deg, #6D73EF 360deg)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  opacity: 0.42,
                }}
              />


              {/* INNER RING */}

              <div
                className="absolute w-[485px] h-[485px] rounded-full pointer-events-none"
                style={{
                  border: "1px solid rgba(135,157,235,.18)",
                }}
              />


              {/* CENTER CAREOS */}

              <div
                className="absolute z-20 w-[320px] h-[320px] rounded-full bg-white flex flex-col items-center justify-center text-center"
                style={{
                  boxShadow:
                    "0 20px 60px rgba(67,94,160,.15), 0 0 0 12px rgba(255,255,255,.55)",
                }}
              >

                <img
                  src="/assets/images/CareOS_logo_transparent_single.png"
                  alt="CareOS"
                  className="w-[105px] h-[105px] object-contain mb-2"
                  onError={(e) => {
                    console.error(
                      "CareOS center logo not found:",
                      "/assets/images/CareOS_logo_transparent_single.png"
                    );
                  }}
                />

                <div className="text-[48px] font-extrabold tracking-[-2px] text-[#102A56]">
                  Care<span className="text-[#2E68E8]">OS</span>
                </div>

                <div className="text-[16px] leading-7 text-[#61769B] mt-1">
                  One Platform.
                  <br />
                  Every Role.
                </div>

              </div>


              {/* ROLE NODES */}

              {roles.map((role) => (
                <RoleNode
                  key={role.id}
                  role={role}
                  onClick={() => openLogin(role)}
                />
              ))}

            </div>

          </div>

        </section>


        {/* =====================================================
            TRUST BAR
        ====================================================== */}

        <section className="max-w-[1390px] mx-auto pb-8">

          <div className="rounded-[24px] border border-[#E7EBF4] bg-white shadow-sm overflow-hidden">

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">

              <TrustItem
                icon={ShieldCheck}
                title="Trusted by"
                subtitle="Healthcare Providers"
                description="Built for modern hospitals."
              />

              <TrustItem
                icon={ShieldCheck}
                title="Enterprise Grade"
                subtitle="Security"
              />

              <TrustItem
                icon={LockKeyhole}
                title="DPDP Act"
                subtitle="Compliant"
              />

              <TrustItem
                icon={Cloud}
                title="Cloud Native"
                subtitle="Platform"
              />

              <TrustItem
                icon={Layers3}
                title="Scalable &"
                subtitle="Reliable"
              />

              <TrustItem
                icon={Clock3}
                title="24/7 System"
                subtitle="Availability"
              />

            </div>

          </div>

        </section>

      </main>


      {/* =====================================================
          LOGIN MODAL
      ====================================================== */}

      {selectedRole && (

        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          style={{
            background: "rgba(10,25,55,.48)",
            backdropFilter: "blur(10px)",
          }}
        >

          <div className="w-full max-w-[430px] bg-white rounded-[24px] shadow-2xl p-7 relative">

            {/* CLOSE */}

            <button
              onClick={closeLogin}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F1F4FA] flex items-center justify-center text-[#53647F] hover:bg-[#E7EBF4]"
            >

              <X size={18} />

            </button>


            {/* LOGIN ICON */}

            <div className="flex flex-col items-center text-center">

              <div
                className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-4"
                style={{
                  background: `${selectedRole.color}15`,
                }}
              >

                <selectedRole.icon
                  size={34}
                  style={{
                    color: selectedRole.color,
                  }}
                />

              </div>


              <h2 className="text-[26px] font-bold text-[#102A56]">
                {selectedRole.title} Login
              </h2>


              <p className="text-sm text-[#70819E] mt-1 mb-6">
                Sign in to access your CareOS dashboard
              </p>

            </div>


            {/* LOGIN FORM */}

            <form onSubmit={handleLogin}>

              {/* USERNAME */}

              <label className="block text-sm font-semibold text-[#30486D] mb-2">
                Username
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full h-[48px] px-4 rounded-[10px] border border-[#DCE2ED] outline-none focus:border-[#3675EE] focus:ring-2 focus:ring-blue-100 mb-4"
              />


              {/* PASSWORD */}

              <label className="block text-sm font-semibold text-[#30486D] mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full h-[48px] px-4 rounded-[10px] border border-[#DCE2ED] outline-none focus:border-[#3675EE] focus:ring-2 focus:ring-blue-100"
              />


              {/* ERROR */}

              {error && (
                <p className="text-red-500 text-sm mt-3">
                  {error}
                </p>
              )}


              {/* LOGIN BUTTON */}

              <button
                type="submit"
                className="w-full h-[50px] mt-6 rounded-[10px] bg-gradient-to-r from-[#2674ED] to-[#4A52E8] text-white font-bold shadow-lg hover:opacity-95 transition"
              >
                Login
              </button>

            </form>


            {/* DEMO CREDENTIALS */}

            <p className="text-center text-xs text-[#8996AA] mt-5">
              Demo credentials: <b>admin</b> / <b>1234</b>
            </p>

          </div>

        </div>

      )}

    </div>
  );
};


/* =========================================================
   ROLE NODE
========================================================= */

const RoleNode = ({ role, onClick }) => {

  const Icon = role.icon;

  const positionClasses = {

    doctor:
      "top-[2px] left-1/2 -translate-x-1/2",

    nurse:
      "top-[110px] right-[25px]",

    admin:
      "top-[330px] right-[-20px]",

    pharmacy:
      "bottom-[28px] right-[155px]",

    pathology:
      "bottom-[28px] left-[155px]",

    radiology:
      "top-[330px] left-[-20px]",

    patient:
      "top-[110px] left-[25px]",

  };


  return (

    <button
      type="button"
      onClick={role.active ? onClick : undefined}
      disabled={!role.active}
      className={`
        absolute z-30
        ${positionClasses[role.position]}
        w-[145px]
        flex flex-col items-center
        text-center
        group
        ${role.active ? "cursor-pointer" : "cursor-default"}
      `}
    >

      {/* ICON CIRCLE */}

      <div
        className={`
          w-[82px] h-[82px]
          rounded-full
          bg-white
          flex items-center justify-center
          transition-all duration-300
          border-[7px] border-white
          shadow-[0_12px_35px_rgba(52,75,130,.14)]

          ${
            role.active
              ? "group-hover:-translate-y-2 group-hover:shadow-[0_18px_40px_rgba(52,75,130,.22)]"
              : "group-hover:-translate-y-1"
          }
        `}
      >

        <div
          className="w-[62px] h-[62px] rounded-full flex items-center justify-center"
          style={{
            background: `${role.color}12`,
          }}
        >

          <Icon
            size={34}
            strokeWidth={2}
            style={{
              color: role.color,
            }}
          />

        </div>

      </div>


      {/* TITLE */}

      <div className="mt-3 font-bold text-[15px] leading-5 whitespace-nowrap text-[#102A56]">
        {role.title}
      </div>


      {/* SUBTITLE */}

      <div className="mt-1 text-[12px] text-[#63789D] whitespace-nowrap">
        {role.subtitle}
      </div>

    </button>

  );
};


/* =========================================================
   TRUST ITEM
========================================================= */

const TrustItem = ({
  icon: Icon,
  title,
  subtitle,
  description,
}) => {

  return (

    <div className="min-h-[112px] px-5 py-5 flex items-center gap-4 border-b md:border-r lg:border-b-0 border-[#E5E9F2] last:border-r-0">

      <Icon
        size={31}
        strokeWidth={1.8}
        className="text-[#52617D] flex-shrink-0"
      />

      <div>

        <div className="text-[13px] font-bold text-[#15294C] leading-5">
          {title}
        </div>

        <div className="text-[13px] font-bold text-[#15294C] leading-5">
          {subtitle}
        </div>

        {description && (
          <div className="text-[11px] text-[#72809A] mt-1 leading-4">
            {description}
          </div>
        )}

      </div>

    </div>

  );
};


export default RoleSelectionLanding;