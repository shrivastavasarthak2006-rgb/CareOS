import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CareOSIntro = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Logo fade in
    const fadeIn = setTimeout(() => {
      setVisible(true);
    }, 200);

    // Start fade out
    const fadeOut = setTimeout(() => {
      setVisible(false);
    }, 2800);

    // Go to home page
    const goHome = setTimeout(() => {
      navigate("/role-selection-landing", {
        replace: true,
      });
    }, 4000);

    return () => {
      clearTimeout(fadeIn);
      clearTimeout(fadeOut);
      clearTimeout(goHome);
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#061426]">

      {/* Background glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(55,125,255,.22) 0%, rgba(89,83,231,.10) 35%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* Soft center glow */}
      <div
        className="absolute w-[320px] h-[320px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,.08), transparent 70%)",
          filter: "blur(15px)",
        }}
      />

      {/* Logo */}
      <div
        className={`
          relative flex flex-col items-center justify-center
          transition-all
          duration-[1200ms]
          ease-out
          ${
            visible
              ? "opacity-100 scale-100"
              : "opacity-0 scale-[0.92]"
          }
        `}
      >

        {/* Logo circle */}
        <div
          className="relative w-[190px] h-[190px] rounded-full bg-white flex items-center justify-center"
          style={{
            boxShadow: `
              0 0 0 1px rgba(255,255,255,.7),
              0 0 0 12px rgba(255,255,255,.035),
              0 25px 80px rgba(19,89,202,.40)
            `,
          }}
        >
          <img
            src="/assets/images/CareOS_logo_transparent_single.png"
            alt="CareOS"
            className="w-[130px] h-[130px] object-contain"
          />
        </div>

        {/* Brand name */}
        <div
          className="mt-7 text-[52px] sm:text-[60px] font-extrabold tracking-[-3px] text-white"
          style={{
            textShadow: "0 8px 35px rgba(45,108,220,.35)",
          }}
        >
          Care<span className="text-[#5D9BFF]">OS</span>
        </div>

        {/* Tagline */}
        <div className="mt-2 text-[11px] sm:text-[13px] tracking-[4px] uppercase text-white/55 font-medium">
          Intelligent Healthcare
        </div>

        <div className="mt-1 text-[11px] sm:text-[13px] tracking-[4px] uppercase text-white/55 font-medium">
          Connected Care
        </div>

        {/* Loading line */}
        <div className="mt-8 w-[210px] h-[3px] rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full w-full rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #3D7FF4, #8663EF, #E45FAE)",
              animation:
                "careosLoading 3s cubic-bezier(.4,0,.2,1) forwards",
            }}
          />
        </div>

      </div>

      <style>{`
        @keyframes careosLoading {
          0% {
            transform: translateX(-100%);
          }

          100% {
            transform: translateX(0%);
          }
        }
      `}</style>

    </div>
  );
};

export default CareOSIntro;