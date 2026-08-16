import React, { useEffect, useState } from "react";
import Routes from "./Routes";
import CareOSChatbot from "./components/CareOSChatbot";

/* =========================================================
   CAREOS SPLASH SCREEN
========================================================= */

const CareOSSplash = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);

      setTimeout(() => {
        onFinish();
      }, 700);
    }, 1800);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-all duration-700 ${
        fadeOut
          ? "opacity-0 scale-105"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Soft background glow */}

      <div
        className="absolute w-[520px] h-[520px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(70,120,245,0.12) 0%, rgba(255,255,255,0) 70%)",
        }}
      />

      {/* Main splash content */}

      <div className="relative flex flex-col items-center justify-center">
        {/* Logo */}

        <div className="splash-logo">
          <img
            src="/assets/images/CareOS_logo_transparent_single.png"
            alt="CareOS Logo"
            className="w-[150px] h-[150px] object-contain"
          />
        </div>

        {/* CareOS text */}

        <div className="mt-3 splash-title">
          <span className="text-[#102A56]">
            Care
          </span>

          <span className="text-[#2E68E8]">
            OS
          </span>
        </div>

        {/* Tagline */}

        <div
          className="
            mt-3
            text-[14px]
            tracking-[2px]
            text-[#71809A]
            uppercase
            splash-tagline
          "
        >
          Intelligent Healthcare. Connected Care.
        </div>

        {/* Loading line */}

        <div
          className="
            mt-8
            w-[130px]
            h-[3px]
            rounded-full
            bg-[#E8EDF7]
            overflow-hidden
          "
        >
          <div
            className="
              splash-loader
              h-full
              rounded-full
              bg-gradient-to-r
              from-[#2E6BEE]
              via-[#7659ED]
              to-[#E85DAF]
            "
          />
        </div>
      </div>

      {/* =====================================================
          SPLASH ANIMATION CSS
      ===================================================== */}

      <style>
        {`
          @keyframes careosLogoEntry {
            0% {
              opacity: 0;
              transform: scale(0.65);
            }

            60% {
              opacity: 1;
              transform: scale(1.08);
            }

            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes careosTitleEntry {
            0% {
              opacity: 0;
              transform: translateY(18px);
            }

            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes careosTaglineEntry {
            0% {
              opacity: 0;
            }

            100% {
              opacity: 1;
            }
          }

          @keyframes careosLoader {
            0% {
              width: 0%;
            }

            100% {
              width: 100%;
            }
          }

          .splash-logo {
            animation:
              careosLogoEntry
              1s
              cubic-bezier(.22,1,.36,1)
              forwards;
          }

          .splash-title {
            opacity: 0;
            animation:
              careosTitleEntry
              .7s
              ease-out
              .45s
              forwards;

            font-size: 52px;
            line-height: 1;
            font-weight: 800;
            letter-spacing: -2px;
          }

          .splash-tagline {
            opacity: 0;
            animation:
              careosTaglineEntry
              .7s
              ease-out
              .75s
              forwards;
          }

          .splash-loader {
            width: 0%;
            animation:
              careosLoader
              1.35s
              ease-in-out
              .35s
              forwards;
          }
        `}
      </style>
    </div>
  );
};

/* =========================================================
   MAIN APP
========================================================= */

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return (
    <>
      {/* Main Application */}

      <Routes />

      {/* CareOS AI Chatbot */}

      <CareOSChatbot />

      {/* Splash Screen */}

      {showSplash && (
        <CareOSSplash
          onFinish={handleSplashFinish}
        />
      )}
    </>
  );
}

export default App;