import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CareOSIntro = () => {
  const navigate = useNavigate();

  const [phase, setPhase] = useState("scene");
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    /*
      =========================================================
      CINEMATIC TIMELINE

      0ms       Hospital scene
      700ms     Person appears
      900ms     Person starts walking
      2600ms    Doors open
      3300ms    Camera moves inside
      3900ms    CareOS logo appears
      6500ms    Home page
      =========================================================
    */

    const t1 = setTimeout(() => {
      setPhase("walking");
    }, 700);

    const t2 = setTimeout(() => {
      setPhase("doors");
    }, 2500);

    const t3 = setTimeout(() => {
      setPhase("inside");
    }, 3200);

    const t4 = setTimeout(() => {
      setShowLogo(true);
      setPhase("logo");
    }, 3900);

    const t5 = setTimeout(() => {
      navigate("/role-selection-landing", {
        replace: true,
      });
    }, 6500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-[#061426]">

      {/* =====================================================
          GLOBAL SCENE
      ====================================================== */}

      <div
        className={`
          absolute inset-0
          transition-all
          duration-[2200ms]
          ease-[cubic-bezier(.65,0,.2,1)]
          ${
            phase === "inside" || phase === "logo"
              ? "scale-[1.35]"
              : "scale-100"
          }
        `}
      >

        {/* =================================================
            SKY
        ================================================== */}

        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                180deg,
                #8db7dc 0%,
                #c9dff1 38%,
                #edf6fb 67%,
                #c3d1df 100%
              )
            `,
          }}
        />

        {/* Soft sunlight */}

        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                circle at 72% 27%,
                rgba(255,255,255,.95) 0%,
                rgba(255,255,255,.42) 20%,
                transparent 48%
              )
            `,
          }}
        />

        {/* =================================================
            DISTANT BUILDINGS
        ================================================== */}

        <div className="absolute left-0 bottom-[29%] w-[19%] h-[42%] bg-[#a7bdd0] opacity-70">
          <div className="grid grid-cols-4 gap-3 p-5 opacity-50">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="h-[28px] rounded-[3px] bg-[#e7f2fa]"
              />
            ))}
          </div>
        </div>

        <div className="absolute right-0 bottom-[29%] w-[18%] h-[47%] bg-[#9fb6ca] opacity-70">
          <div className="grid grid-cols-4 gap-3 p-5 opacity-50">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="h-[28px] rounded-[3px] bg-[#e7f2fa]"
              />
            ))}
          </div>
        </div>

        {/* =================================================
            MAIN HOSPITAL BUILDING
        ================================================== */}

        <div className="absolute left-[10%] right-[10%] top-[14%] bottom-[25%]">

          {/* Building shadow */}

          <div className="absolute -inset-[20px] bg-black/10 blur-[30px] rounded-[30px]" />

          {/* Main building */}

          <div
            className="absolute inset-0 rounded-t-[34px] overflow-hidden border border-white/70"
            style={{
              background:
                "linear-gradient(180deg, #fafdff 0%, #e8f2f9 100%)",
              boxShadow:
                "0 30px 90px rgba(39,73,105,.20)",
            }}
          >

            {/* =================================================
                TOP GLASS BAND
            ================================================== */}

            <div className="absolute left-0 right-0 top-0 h-[24%] bg-[#d9edf9]/70 border-b border-white">

              <div className="absolute inset-0 opacity-40">
                <div className="absolute left-[8%] top-0 bottom-0 w-px bg-white" />
                <div className="absolute left-[25%] top-0 bottom-0 w-px bg-white" />
                <div className="absolute left-[42%] top-0 bottom-0 w-px bg-white" />
                <div className="absolute left-[59%] top-0 bottom-0 w-px bg-white" />
                <div className="absolute left-[76%] top-0 bottom-0 w-px bg-white" />
                <div className="absolute left-[92%] top-0 bottom-0 w-px bg-white" />
              </div>

            </div>


            {/* =================================================
                HOSPITAL SIGN
            ================================================== */}

            <div className="absolute top-[9%] left-1/2 -translate-x-1/2 z-20">

              <div
                className="px-7 py-3 rounded-[16px] bg-white/95 border border-white flex items-center gap-3"
                style={{
                  boxShadow:
                    "0 15px 40px rgba(37,73,112,.16)",
                }}
              >

                {/* Medical mark */}

                <div className="relative w-[38px] h-[38px] rounded-full bg-[#2F73E8] flex items-center justify-center">

                  <div className="absolute w-[17px] h-[5px] bg-white rounded-full" />

                  <div className="absolute w-[5px] h-[17px] bg-white rounded-full" />

                </div>

                <div>

                  <div className="text-[15px] font-extrabold tracking-[2px] text-[#18375C]">
                    CARE HOSPITAL
                  </div>

                  <div className="text-[10px] tracking-[2px] text-[#7890AA] mt-0.5">
                    ADVANCED HEALTHCARE CENTER
                  </div>

                </div>

              </div>

            </div>


            {/* =================================================
                WINDOWS
            ================================================== */}

            <div className="absolute left-[8%] top-[32%] w-[23%] h-[43%] rounded-[20px] overflow-hidden border-[8px] border-white shadow-lg">

              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, #79b7dd, #d6efff 65%, #9ac6df)",
                }}
              />

              <div className="absolute inset-0 bg-white/10" />

              {/* trees */}

              <div className="absolute bottom-0 left-0 right-0 h-[28%] bg-[#6d9d7a]/40" />

              <div className="absolute bottom-[16%] left-[15%] w-[28px] h-[90px] bg-[#51815f]/55 rounded-t-full" />

              <div className="absolute bottom-[16%] left-[32%] w-[36px] h-[115px] bg-[#4f7e59]/50 rounded-t-full" />

              <div className="absolute bottom-[16%] right-[16%] w-[30px] h-[82px] bg-[#5d8d65]/50 rounded-t-full" />

              {/* sunlight */}

              <div className="absolute -top-[20%] -left-[20%] w-[70%] h-[120%] rotate-[25deg] bg-white/20 blur-[15px]" />

            </div>


            {/* =================================================
                RIGHT INFORMATION GLASS
            ================================================== */}

            <div className="absolute right-[8%] top-[32%] w-[23%] h-[43%] rounded-[20px] overflow-hidden border border-white bg-white/65 shadow-lg">

              <div className="p-6">

                <div className="flex items-center gap-3">

                  <div className="w-[45px] h-[45px] rounded-full bg-[#eaf2ff] flex items-center justify-center">

                    <div className="relative w-[22px] h-[22px]">

                      <div className="absolute top-1/2 left-0 right-0 h-[5px] bg-[#3778E8] rounded-full -translate-y-1/2" />

                      <div className="absolute left-1/2 top-0 bottom-0 w-[5px] bg-[#3778E8] rounded-full -translate-x-1/2" />

                    </div>

                  </div>

                  <div>

                    <div className="font-bold text-[13px] text-[#23466B]">
                      SMART CARE
                    </div>

                    <div className="text-[10px] text-[#7C91A9]">
                      Connected Healthcare
                    </div>

                  </div>

                </div>


                <div className="mt-8 space-y-5">

                  <div>
                    <div className="text-[10px] text-[#7C91A9] mb-2">
                      PATIENT CARE
                    </div>

                    <div className="h-[8px] w-[85%] rounded-full bg-[#dce8f3]" />

                    <div className="h-[8px] w-[62%] rounded-full bg-[#e7eef5] mt-2" />
                  </div>

                  <div>
                    <div className="text-[10px] text-[#7C91A9] mb-2">
                      DIGITAL SERVICES
                    </div>

                    <div className="h-[8px] w-[76%] rounded-full bg-[#dce8f3]" />

                    <div className="h-[8px] w-[52%] rounded-full bg-[#e7eef5] mt-2" />
                  </div>

                </div>


                <div className="absolute bottom-5 left-6 right-6">

                  <div className="flex items-center justify-between text-[10px] text-[#6E849C]">

                    <span>System Status</span>

                    <span className="flex items-center gap-1.5 text-[#35A875]">

                      <span className="w-[7px] h-[7px] rounded-full bg-[#35A875]" />

                      Operational

                    </span>

                  </div>

                </div>

              </div>

            </div>


            {/* =================================================
                ENTRANCE
            ================================================== */}

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[36%] h-[72%]">

              {/* Entrance canopy */}

              <div className="absolute top-0 -left-[12%] -right-[12%] h-[12%] bg-white shadow-lg rounded-t-[15px] border border-[#dbe8f1]">

                <div className="absolute left-[8%] right-[8%] bottom-[8px] h-[4px] bg-[#2F75E8]/80 rounded-full" />

              </div>


              {/* Door frame */}

              <div className="absolute top-[10%] left-0 right-0 bottom-0 rounded-t-[20px] overflow-hidden border-[10px] border-[#71899E] bg-[#a7c3d7] shadow-2xl">

                {/* Glass */}

                <div className="absolute inset-0">

                  <div
                    className="absolute left-0 top-0 bottom-0 w-1/2 border-r border-white/70"
                    style={{
                      background:
                        "linear-gradient(125deg, rgba(255,255,255,.58), rgba(90,157,202,.22), rgba(255,255,255,.32))",
                    }}
                  />

                  <div
                    className="absolute right-0 top-0 bottom-0 w-1/2"
                    style={{
                      background:
                        "linear-gradient(235deg, rgba(255,255,255,.58), rgba(90,157,202,.22), rgba(255,255,255,.32))",
                    }}
                  />

                </div>


                {/* Interior glow */}

                <div
                  className={`
                    absolute inset-0
                    transition-all
                    duration-[1000ms]
                    ${
                      phase === "doors" ||
                      phase === "inside" ||
                      phase === "logo"
                        ? "opacity-100"
                        : "opacity-20"
                    }
                  `}
                  style={{
                    background:
                      "radial-gradient(circle at 50% 70%, rgba(255,255,255,.95), rgba(177,215,236,.25) 45%, transparent 75%)",
                  }}
                />


                {/* Door split */}

                <div
                  className={`
                    absolute top-0 bottom-0 left-1/2 w-[2px] bg-white/70
                    transition-opacity duration-500
                    ${
                      phase === "doors" ||
                      phase === "inside" ||
                      phase === "logo"
                        ? "opacity-0"
                        : "opacity-100"
                    }
                  `}
                />


                {/* Door handles */}

                <div
                  className={`
                    absolute top-[50%] left-[46%] w-[5px] h-[72px]
                    bg-[#627D95] rounded-full
                    transition-all duration-700
                    ${
                      phase === "doors" ||
                      phase === "inside" ||
                      phase === "logo"
                        ? "opacity-0"
                        : "opacity-100"
                    }
                  `}
                />

                <div
                  className={`
                    absolute top-[50%] right-[46%] w-[5px] h-[72px]
                    bg-[#627D95] rounded-full
                    transition-all duration-700
                    ${
                      phase === "doors" ||
                      phase === "inside" ||
                      phase === "logo"
                        ? "opacity-0"
                        : "opacity-100"
                    }
                  `}
                />


                {/* Opened door panels */}

                <div
                  className={`
                    absolute left-0 top-0 bottom-0 w-1/2
                    border-r border-white/40
                    transition-transform duration-[900ms]
                    ease-[cubic-bezier(.7,0,.2,1)]
                    ${
                      phase === "doors" ||
                      phase === "inside" ||
                      phase === "logo"
                        ? "-translate-x-[92%]"
                        : "translate-x-0"
                    }
                  `}
                  style={{
                    background:
                      "linear-gradient(125deg, rgba(255,255,255,.50), rgba(98,166,208,.22))",
                  }}
                />

                <div
                  className={`
                    absolute right-0 top-0 bottom-0 w-1/2
                    border-l border-white/40
                    transition-transform duration-[900ms]
                    ease-[cubic-bezier(.7,0,.2,1)]
                    ${
                      phase === "doors" ||
                      phase === "inside" ||
                      phase === "logo"
                        ? "translate-x-[92%]"
                        : "translate-x-0"
                    }
                  `}
                  style={{
                    background:
                      "linear-gradient(235deg, rgba(255,255,255,.50), rgba(98,166,208,.22))",
                  }}
                />

              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            FOREGROUND FLOOR
        ================================================== */}

        <div
          className="absolute left-0 right-0 bottom-0 h-[25%]"
          style={{
            background: `
              linear-gradient(
                180deg,
                #d0dce6 0%,
                #a9bbc9 100%
              )
            `,
          }}
        >

          {/* Perspective */}

          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/25 -translate-x-1/2" />

          <div className="absolute left-[20%] top-0 bottom-[-20%] w-[2px] bg-white/20 rotate-[14deg]" />

          <div className="absolute right-[20%] top-0 bottom-[-20%] w-[2px] bg-white/20 rotate-[-14deg]" />

          <div className="absolute left-[35%] top-0 bottom-[-10%] w-px bg-white/15 rotate-[7deg]" />

          <div className="absolute right-[35%] top-0 bottom-[-10%] w-px bg-white/15 rotate-[-7deg]" />

          <div className="absolute top-[7%] left-0 right-0 h-px bg-white/40" />

        </div>

      </div>


      {/* =====================================================
          WALKING PERSON
      ====================================================== */}

      <div
        className={`
          absolute
          z-40
          left-1/2
          bottom-[22%]
          transition-all
          duration-[1900ms]
          ease-[cubic-bezier(.65,0,.25,1)]
          ${
            phase === "scene"
              ? "-translate-x-1/2 translate-y-[90px] scale-[.82] opacity-0"
              : phase === "walking"
              ? "-translate-x-1/2 translate-y-0 scale-100 opacity-100"
              : "-translate-x-1/2 translate-y-[-75px] scale-[1.12] opacity-0"
          }
        `}
      >

        {/* Person shadow */}

        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-[105px] h-[20px] rounded-full bg-black/25 blur-[9px]" />

        <div className="relative w-[92px] h-[230px]">

          {/* Head */}

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[52px] h-[56px] rounded-full bg-[#b97558] shadow-lg">

            {/* Hair */}

            <div className="absolute -top-[2px] left-[3px] w-[47px] h-[28px] rounded-t-[25px] bg-[#263449]" />

            <div className="absolute top-[17px] right-[3px] w-[8px] h-[20px] rounded-full bg-[#263449]" />

          </div>


          {/* Neck */}

          <div className="absolute top-[49px] left-1/2 -translate-x-1/2 w-[18px] h-[18px] bg-[#b97558]" />


          {/* Body */}

          <div
            className="absolute top-[61px] left-1/2 -translate-x-1/2 w-[66px] h-[94px] rounded-[19px] shadow-xl"
            style={{
              background:
                "linear-gradient(180deg, #367FEA 0%, #2259BB 100%)",
            }}
          >

            {/* Shirt highlight */}

            <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[8px] h-[62px] rounded-full bg-white/10" />

          </div>


          {/* Left arm */}

          <div
            className={`
              absolute top-[68px] left-[5px]
              w-[20px] h-[92px]
              rounded-full
              bg-[#b97558]
              origin-top
              shadow-md
              transition-transform duration-[450ms]
              ${
                phase === "walking"
                  ? "rotate-[18deg]"
                  : "rotate-[8deg]"
              }
            `}
          />


          {/* Right arm */}

          <div
            className={`
              absolute top-[68px] right-[5px]
              w-[20px] h-[92px]
              rounded-full
              bg-[#b97558]
              origin-top
              shadow-md
              transition-transform duration-[450ms]
              ${
                phase === "walking"
                  ? "rotate-[-18deg]"
                  : "rotate-[-8deg]"
              }
            `}
          />


          {/* Left leg */}

          <div
            className={`
              absolute bottom-[3px] left-[19px]
              w-[25px] h-[86px]
              rounded-full
              bg-[#263853]
              origin-top
              transition-transform duration-[450ms]
              ${
                phase === "walking"
                  ? "rotate-[5deg]"
                  : "rotate-0"
              }
            `}
          />


          {/* Right leg */}

          <div
            className={`
              absolute bottom-[3px] right-[19px]
              w-[25px] h-[86px]
              rounded-full
              bg-[#263853]
              origin-top
              transition-transform duration-[450ms]
              ${
                phase === "walking"
                  ? "rotate-[-5deg]"
                  : "rotate-0"
              }
            `}
          />


          {/* Shoes */}

          <div className="absolute bottom-[-2px] left-[10px] w-[40px] h-[15px] rounded-full bg-[#142239] rotate-[-5deg]" />

          <div className="absolute bottom-[-2px] right-[10px] w-[40px] h-[15px] rounded-full bg-[#142239] rotate-[5deg]" />

        </div>

      </div>


      {/* =====================================================
          CAMERA / INSIDE TRANSITION
      ====================================================== */}

      <div
        className={`
          absolute inset-0 z-50
          pointer-events-none
          transition-all
          duration-[1800ms]
          ease-[cubic-bezier(.65,0,.2,1)]
          ${
            phase === "inside"
              ? "opacity-100"
              : phase === "logo"
              ? "opacity-100"
              : "opacity-0"
          }
        `}
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,.98) 0%, rgba(238,247,255,.94) 25%, rgba(31,73,129,.65) 68%, rgba(5,20,42,.96) 100%)",
        }}
      />


      {/* =====================================================
          CAREOS LOGO REVEAL
      ====================================================== */}

      <div
        className={`
          absolute inset-0 z-[100]
          flex items-center justify-center
          transition-all
          duration-[1400ms]
          ease-out
          ${
            showLogo
              ? "opacity-100 scale-100"
              : "opacity-0 scale-[.72] pointer-events-none"
          }
        `}
      >

        {/* Deep background */}

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, #162F5B 0%, #091B37 48%, #030D1C 100%)",
          }}
        />


        {/* Large ambient glow */}

        <div
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(56,125,255,.25) 0%, rgba(89,83,231,.12) 32%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />


        {/* Secondary glow */}

        <div
          className="absolute w-[340px] h-[340px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,.12), transparent 68%)",
            filter: "blur(10px)",
          }}
        />


        {/* =================================================
            LOGO CONTENT
        ================================================== */}

        <div className="relative flex flex-col items-center text-center">

          {/* Orbit ring */}

          <div
            className="absolute w-[285px] h-[285px] rounded-full"
            style={{
              border:
                "1px solid rgba(104,160,255,.20)",
              boxShadow:
                "0 0 50px rgba(54,117,232,.14)",
              animation:
                "careosOrbit 8s linear infinite",
            }}
          />

          {/* Small orbit dot */}

          <div
            className="absolute w-[9px] h-[9px] rounded-full bg-[#65A0FF] shadow-[0_0_20px_rgba(80,145,255,.9)]"
            style={{
              top: "10px",
              animation:
                "careosOrbit 8s linear infinite",
              transformOrigin: "132px 132px",
            }}
          />


          {/* Logo glow */}

          <div
            className="absolute w-[250px] h-[250px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(55,125,255,.32), transparent 67%)",
              filter: "blur(18px)",
            }}
          />


          {/* Logo white circle */}

          <div
            className="relative w-[205px] h-[205px] rounded-full bg-white flex items-center justify-center"
            style={{
              boxShadow: `
                0 0 0 1px rgba(255,255,255,.7),
                0 0 0 12px rgba(255,255,255,.035),
                0 30px 90px rgba(19,89,202,.42)
              `,
              animation:
                "careosLogoFloat 3s ease-in-out infinite",
            }}
          >

            <img
              src="/assets/images/CareOS_logo_transparent_single.png"
              alt="CareOS"
              className="w-[138px] h-[138px] object-contain"
              onError={(e) => {
                console.error(
                  "CareOS logo not found:",
                  "/assets/images/CareOS_logo_transparent_single.png"
                );
              }}
            />

          </div>


          {/* Brand name */}

          <div
            className="mt-8 text-[56px] sm:text-[64px] font-extrabold tracking-[-3px] text-white"
            style={{
              textShadow:
                "0 8px 35px rgba(45,108,220,.35)",
            }}
          >
            Care<span className="text-[#5D9BFF]">OS</span>
          </div>


          {/* Tagline */}

          <div className="mt-2 text-[12px] sm:text-[14px] tracking-[4px] uppercase text-white/55 font-medium">
            Intelligent Healthcare
          </div>

          <div className="mt-1 text-[12px] sm:text-[14px] tracking-[4px] uppercase text-white/55 font-medium">
            Connected Care
          </div>


          {/* Loading indicator */}

          <div className="mt-9 w-[220px] h-[3px] rounded-full bg-white/10 overflow-hidden">

            <div
              className="h-full w-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #3D7FF4, #8663EF, #E45FAE)",
                animation:
                  "careosLoading 2.4s cubic-bezier(.4,0,.2,1) forwards",
              }}
            />

          </div>

        </div>

      </div>


      {/* =====================================================
          TOP BRAND DURING HOSPITAL SCENE
      ====================================================== */}

      <div
        className={`
          absolute top-7 left-8 z-[80]
          flex items-center gap-2.5
          transition-all duration-700
          ${
            showLogo
              ? "opacity-0 -translate-y-3"
              : "opacity-100 translate-y-0"
          }
        `}
      >

        <div
          className="w-[42px] h-[42px] rounded-full bg-white/90 flex items-center justify-center"
          style={{
            boxShadow:
              "0 8px 30px rgba(25,60,95,.18)",
          }}
        >

          <img
            src="/assets/images/CareOS_logo_transparent_single.png"
            alt="CareOS"
            className="w-[30px] h-[30px] object-contain"
          />

        </div>

        <div className="text-white font-bold text-[20px] tracking-[-.7px]">
          Care<span className="text-[#72A6FF]">OS</span>
        </div>

      </div>


      {/* =====================================================
          BOTTOM SCENE LABEL
      ====================================================== */}

      <div
        className={`
          absolute bottom-8 left-1/2 -translate-x-1/2
          z-[80]
          transition-all duration-700
          ${
            phase === "walking" || phase === "doors"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }
        `}
      >

        <div className="flex items-center gap-3 text-white/70 text-[11px] tracking-[2.5px] uppercase">

          <span className="w-[32px] h-px bg-white/30" />

          Welcome to Care Hospital

          <span className="w-[32px] h-px bg-white/30" />

        </div>

      </div>


      {/* =====================================================
          ANIMATIONS
      ====================================================== */}

      <style>{`

        @keyframes careosLoading {

          0% {
            transform: translateX(-100%);
          }

          100% {
            transform: translateX(0%);
          }

        }


        @keyframes careosLogoFloat {

          0%,
          100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-8px);
          }

        }


        @keyframes careosOrbit {

          0% {
            transform: rotate(0deg);
          }

          100% {
            transform: rotate(360deg);
          }

        }

      `}</style>

    </div>
  );
};

export default CareOSIntro;