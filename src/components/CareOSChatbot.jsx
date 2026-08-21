import React, { useState } from "react";

/* =========================================================
   CAREOS AI CHATBOT
   Hindi + Hinglish + English
========================================================= */

const CareOSChatbot = () => {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("hinglish");

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  /* =========================================================
     BACKEND URL
  ========================================================= */

const API_URL = "https://care-os-s7sr.vercel.app/chat";

  /* =========================================================
     LANGUAGE CONTENT
  ========================================================= */

  const content = {
    hindi: {
      greeting: "नमस्ते! 👋",

      title: "मैं CareOS AI Assistant हूँ",

      subtitle:
        "मैं आपकी स्वास्थ्य संबंधी जानकारी और सामान्य guidance में मदद कर सकता हूँ।",

      question: "मैं आपकी कैसे मदद कर सकता हूँ?",

      health: "स्वास्थ्य जानकारी",

      healthDesc:
        "लक्षण, बीमारी और सामान्य स्वास्थ्य जानकारी प्राप्त करें।",

      appointment: "अपॉइंटमेंट सहायता",

      appointmentDesc:
        "डॉक्टर से मिलने या appointment लेने में मदद पाएं।",

      reports: "रिपोर्ट और टेस्ट",

      reportsDesc:
        "अपनी medical reports और tests के बारे में पूछें।",

      medicines: "दवाइयाँ और उपचार",

      medicinesDesc:
        "दवाइयों और treatment options के बारे में सामान्य जानकारी पाएं।",

      tryAsking: "पूछकर देखें",

      reportQuestion: "मेरी रिपोर्ट समझाइए",

      appointmentQuestion:
        "मुझे डॉक्टर से appointment लेना है",

      symptomQuestion:
        "मेरे symptoms के बारे में बताइए",

      placeholder: "अपना सवाल लिखें...",

      send: "भेजें",

      typing: "सोच रहा हूँ...",

      needHelp: "मदद चाहिए? 👋",

      disclaimer:
        "⚠️ यह AI केवल सामान्य स्वास्थ्य जानकारी और guidance के लिए है। Emergency की स्थिति में तुरंत medical professional से संपर्क करें।",

      welcomeBot:
        "नमस्ते! 👋 मैं CareOS AI Assistant हूँ। मैं आपकी स्वास्थ्य संबंधी जानकारी और guidance में मदद कर सकता हूँ।",

      serverError:
        "⚠️ Server से connection नहीं हो पा रहा है। Please make sure CareOS backend is running on port 5000.",
    },

    hinglish: {
      greeting: "Namaste! 👋",

      title: "Main CareOS AI Assistant hoon",

      subtitle:
        "Main aapko healthcare information aur general guidance mein help kar sakta hoon.",

      question: "Main aapki kaise help kar sakta hoon?",

      health: "Health Information",

      healthDesc:
        "Symptoms, diseases aur general health information ke baare mein poochhein.",

      appointment: "Appointment Help",

      appointmentDesc:
        "Doctor se milne ya appointment lene mein help paayein.",

      reports: "Reports & Tests",

      reportsDesc:
        "Apni medical reports aur tests ke baare mein poochhein.",

      medicines: "Medicines & Treatment",

      medicinesDesc:
        "Medicines aur treatment options ke baare mein general information paayein.",

      tryAsking: "Try asking",

      reportQuestion: "Meri report samjha do",

      appointmentQuestion:
        "Mujhe doctor se appointment lena hai",

      symptomQuestion:
        "Mere symptoms ke baare mein batao",

      placeholder: "Apna sawaal likhein...",

      send: "Send",

      typing: "Soch raha hoon...",

      needHelp: "Help chahiye? 👋",

      disclaimer:
        "⚠️ CareOS AI general health information aur guidance provide karta hai. Emergency mein turant medical professional se contact karein.",

      welcomeBot:
        "Namaste! 👋 Main CareOS AI Assistant hoon. Main aapko healthcare information aur guidance mein help kar sakta hoon.",

      serverError:
        "⚠️ Server se connection nahi ho pa raha hai. Please make sure CareOS backend is running on port 5000.",
    },

    english: {
      greeting: "Hello! 👋",

      title: "I'm your CareOS AI Assistant",

      subtitle:
        "I can help you with healthcare information and general guidance.",

      question: "How can I help you?",

      health: "Health Information",

      healthDesc:
        "Get information about symptoms, conditions and general health topics.",

      appointment: "Appointment Assistance",

      appointmentDesc:
        "Get help with doctor appointments and scheduling.",

      reports: "Reports & Tests",

      reportsDesc:
        "Ask questions about your medical reports and tests.",

      medicines: "Medicines & Treatment",

      medicinesDesc:
        "Get general information about medicines and treatment options.",

      tryAsking: "Try asking",

      reportQuestion: "Can you explain my report?",

      appointmentQuestion:
        "I want to book a doctor appointment",

      symptomQuestion:
        "Tell me about my symptoms",

      placeholder: "Type your question...",

      send: "Send",

      typing: "Thinking...",

      needHelp: "Need help? 👋",

      disclaimer:
        "⚠️ CareOS AI provides general health information and guidance. In an emergency, contact a medical professional immediately.",

      welcomeBot:
        "Hello! 👋 I'm your CareOS AI Assistant. I can help you with healthcare information and general guidance.",

      serverError:
        "⚠️ Unable to connect to the server. Please make sure CareOS backend is running on port 5000.",
    },
  };

  const current = content[language];

  /* =========================================================
     AI LANGUAGE INSTRUCTIONS
  ========================================================= */

  const languageInstruction = {
    hindi:
      "Respond in simple Hindi using Devanagari script. Keep the response easy to understand. Use English medical terms only when necessary.",

    hinglish:
      "Respond in natural Hinglish using Roman Hindi mixed with simple English. Do not use Devanagari. Keep the response conversational and easy to understand.",

    english:
      "Respond in clear and simple English. Avoid unnecessarily complex medical terminology.",
  };

  /* =========================================================
     EXIT COMMANDS
  ========================================================= */

  const exitCommands = [
    "exit",
    "quit",
    "bye",
    "goodbye",
    "close chat",
    "close chatbot",
    "end chat",
  ];

  const isExitCommand = (text) => {
    return exitCommands.includes(text.trim().toLowerCase());
  };

  /* =========================================================
     AI API CALL
  ========================================================= */

  const getAIReply = async (text) => {
    try {
      const conversation = messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      }));

      const languagePrompt = languageInstruction[language];

      const res = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message: `${languagePrompt}

User's question:
${text}`,

          conversation: conversation,

          language: language,
        }),
      });

      if (!res.ok) {
        let errorMessage = "Server error. Please try again.";

        try {
          const errorData = await res.json();

          if (errorData?.error) {
            errorMessage = errorData.error;
          }
        } catch (jsonError) {
          console.error(
            "Unable to parse server error:",
            jsonError
          );
        }

        throw new Error(errorMessage);
      }

      const data = await res.json();

      /* Backend exit response */

      if (data.exit === true) {
        return {
          exit: true,

          reply:
            data.reply ||
            (language === "hindi"
              ? "ठीक है 😊 चैट समाप्त हो गई। अपना ध्यान रखें!"
              : language === "hinglish"
              ? "Okay 😊 Chat end ho gayi. Apna dhyan rakhein!"
              : "Okay 😊 Chat ended. Take care!"),
        };
      }

      /* Normal response */

      return {
        exit: false,

        reply:
          data.reply ||
          (language === "hindi"
            ? "माफ़ कीजिए, अभी response generate करने में समस्या आ रही है।"
            : language === "hinglish"
            ? "Sorry, abhi response generate karne mein problem aa rahi hai."
            : "Sorry, I'm having trouble generating a response right now."),
      };
    } catch (error) {
      console.error("CareOS Chat Error:", error);

      return {
        exit: false,
        reply: current.serverError,
      };
    }
  };

  /* =========================================================
     SEND MESSAGE
  ========================================================= */

  const handleSend = async (customText = null) => {
    const userText = (customText ?? input).trim();

    if (!userText || loading) {
      return;
    }

    /* EXIT COMMAND */

    if (isExitCommand(userText)) {
      const goodbyeMessage =
        language === "hindi"
          ? "ठीक है 😊 चैट समाप्त हो गई। अपना ध्यान रखें!"
          : language === "hinglish"
          ? "Okay 😊 Chat end ho gayi. Apna dhyan rakhein!"
          : "Okay 😊 Chat ended. Take care!";

      setMessages((prev) => [
        ...prev,

        {
          sender: "user",
          text: userText,
        },

        {
          sender: "bot",
          text: goodbyeMessage,
        },
      ]);

      setInput("");

      setTimeout(() => {
        setOpen(false);
      }, 700);

      return;
    }

    /* ADD USER MESSAGE */

    setMessages((prev) => [
      ...prev,

      {
        sender: "user",
        text: userText,
      },
    ]);

    setInput("");
    setLoading(true);

    /* GET AI RESPONSE */

    const result = await getAIReply(userText);

    /* ADD AI RESPONSE */

    setMessages((prev) => [
      ...prev,

      {
        sender: "bot",
        text: result.reply,
      },
    ]);

    setLoading(false);

    /* CLOSE AFTER EXIT */

    if (result.exit === true) {
      setTimeout(() => {
        setOpen(false);
      }, 700);
    }
  };

  /* =========================================================
     OPEN CHAT
  ========================================================= */

  const handleOpenChat = () => {
    setMessages([
        {
            sender: "bot",
            text: current.welcomeBot,
        },
    ]);

    setInput("");
    setLoading(false);
    setOpen(true);  
  };

  /* =========================================================
     CLOSE CHAT
  ========================================================= */

  const handleCloseChat = () => {
    setOpen(false);
  };

  /* =========================================================
     CHANGE LANGUAGE
  ========================================================= */

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);

    setMessages([
      {
        sender: "bot",
        text: content[newLanguage].welcomeBot,
      },
    ]);
  };

  /* =========================================================
     QUICK QUESTIONS
  ========================================================= */

  const quickQuestions = [
    {
      icon: "📄",
      text: current.reportQuestion,
    },

    {
      icon: "📅",
      text: current.appointmentQuestion,
    },

    {
      icon: "🩺",
      text: current.symptomQuestion,
    },
  ];

  /* =========================================================
     HELP OPTIONS
  ========================================================= */

  const helpOptions = [
    {
      icon: "🩺",
      title: current.health,
      description: current.healthDesc,
      question: current.symptomQuestion,
    },

    {
      icon: "📅",
      title: current.appointment,
      description: current.appointmentDesc,
      question: current.appointmentQuestion,
    },

    {
      icon: "📄",
      title: current.reports,
      description: current.reportsDesc,
      question: current.reportQuestion,
    },

    {
      icon: "💊",
      title: current.medicines,
      description: current.medicinesDesc,
      question:
        language === "hindi"
          ? "मुझे दवाइयों के बारे में जानकारी चाहिए"
          : language === "hinglish"
          ? "Mujhe medicines ke baare mein information chahiye"
          : "I want information about medicines",
    },
  ];

  return (
    <>
      {/* =====================================================
          FLOATING ROBOT
      ===================================================== */}

      {!open && (
        <div className="fixed bottom-5 right-5 z-[100] flex flex-col items-end">
          {/* Help bubble */}

          <div
            className="
              mb-2
              mr-2
              rounded-full
              bg-white
              px-4
              py-2
              text-xs
              font-medium
              text-[#12366B]
              shadow-lg
              border
              border-[#E3ECFA]
            "
          >
            {current.needHelp}
          </div>

          {/* Robot button */}

          <button
            onClick={handleOpenChat}
            className="
              group
              relative
              w-[92px]
              h-[92px]
              rounded-full
              bg-white
              shadow-[0_10px_35px_rgba(36,103,232,0.25)]
              border-2
              border-[#E7EFFD]
              flex
              items-center
              justify-center
              transition-all
              duration-300
              hover:scale-110
              hover:shadow-[0_15px_40px_rgba(36,103,232,0.35)]
            "
            aria-label="Open CareOS AI Assistant"
          >
            <img
              src="/assets/images/careos-robot.png"
              alt="CareOS AI Assistant"
              className="
                absolute
                bottom-0
                w-[100px]
                h-[100px]
                object-contain
                object-top
                transition-transform
                duration-300
                group-hover:-translate-y-1
              "
            />

            {/* Online indicator */}

            <span
              className="
                absolute
                right-1
                bottom-1
                w-4
                h-4
                bg-green-500
                border-2
                border-white
                rounded-full
              "
            />
          </button>
        </div>
      )}

      {/* =====================================================
          CHAT WINDOW
      ===================================================== */}

      {open && (
        <div
          className="
            fixed
            bottom-5
            right-5
            z-[100]
            w-[400px]
            max-w-[calc(100vw-24px)]
            h-[700px]
            max-h-[calc(100vh-30px)]
            bg-white
            border
            border-[#E2EAF7]
            rounded-[28px]
            shadow-[0_25px_70px_rgba(22,67,130,0.22)]
            flex
            flex-col
            overflow-hidden
          "
          style={{
            animation: "careosChatOpen 0.35s ease-out",
          }}
        >
          {/* =================================================
              HEADER
          ================================================= */}

          <div
            className="
              relative
              bg-gradient-to-br
              from-[#F8FBFF]
              to-[#EDF5FF]
              border-b
              border-[#E3ECFA]
              px-5
              pt-4
              pb-3
            "
          >
            <div className="flex items-center gap-3">
              {/* Small robot */}

              <div
                className="
                  w-[60px]
                  h-[60px]
                  rounded-2xl
                  bg-white
                  shadow-sm
                  border
                  border-[#E3ECFA]
                  overflow-hidden
                  flex
                  items-center
                  justify-center
                "
              >
                <img
                  src="/assets/images/careos-robot.png"
                  alt="CareOS Robot"
                  className="
                    w-[65px]
                    h-[65px]
                    object-contain
                    object-top
                  "
                />
              </div>

              {/* Title */}

              <div className="flex-1">
                <div className="font-bold text-[#102A56] text-[17px]">
                  CareOS AI Assistant
                </div>

                <div
                  className="
                    text-xs
                    text-[#66758D]
                    mt-1
                    flex
                    items-center
                    gap-1.5
                  "
                >
                  <span className="w-2 h-2 rounded-full bg-green-500" />

                  AI Healthcare Assistant
                </div>
              </div>

              {/* Close */}

              <button
                onClick={handleCloseChat}
                className="
                  w-9
                  h-9
                  rounded-full
                  bg-white
                  border
                  border-[#E1EAF8]
                  text-[#66758D]
                  hover:text-[#12366B]
                  hover:bg-[#F4F8FF]
                  transition-colors
                "
                aria-label="Close chatbot"
              >
                ✕
              </button>
            </div>

            {/* =================================================
                LANGUAGE TOGGLE
            ================================================= */}

            <div
              className="
                mt-4
                flex
                items-center
                justify-center
                gap-1
                bg-white
                rounded-xl
                p-1
                border
                border-[#E1EAF8]
              "
            >
              {/* Hindi */}

              <button
                onClick={() => handleLanguageChange("hindi")}
                className={`
                  flex-1
                  py-2
                  rounded-lg
                  text-xs
                  font-semibold
                  transition-all
                  ${
                    language === "hindi"
                      ? "bg-[#2167E8] text-white shadow-sm"
                      : "text-[#53657F] hover:bg-[#F3F7FD]"
                  }
                `}
              >
                हिंदी
              </button>

              {/* Hinglish */}

              <button
                onClick={() => handleLanguageChange("hinglish")}
                className={`
                  flex-1
                  py-2
                  rounded-lg
                  text-xs
                  font-semibold
                  transition-all
                  ${
                    language === "hinglish"
                      ? "bg-[#2167E8] text-white shadow-sm"
                      : "text-[#53657F] hover:bg-[#F3F7FD]"
                  }
                `}
              >
                Hinglish
              </button>

              {/* English */}

              <button
                onClick={() => handleLanguageChange("english")}
                className={`
                  flex-1
                  py-2
                  rounded-lg
                  text-xs
                  font-semibold
                  transition-all
                  ${
                    language === "english"
                      ? "bg-[#2167E8] text-white shadow-sm"
                      : "text-[#53657F] hover:bg-[#F3F7FD]"
                  }
                `}
              >
                English
              </button>
            </div>
          </div>

          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <div className="flex-1 overflow-y-auto bg-white">
            {messages.length <= 1 ? (
              <div className="p-5">
                {/* Big robot */}

                <div className="flex justify-center mb-1">
                  <img
                    src="/assets/images/careos-robot.png"
                    alt="CareOS Healthcare Robot"
                    className="
                      w-[175px]
                      h-[175px]
                      object-contain
                      object-top
                      drop-shadow-[0_10px_20px_rgba(30,93,190,0.12)]
                    "
                  />
                </div>

                {/* Greeting */}

                <div className="text-center">
                  <div className="text-[26px] font-bold text-[#102A56]">
                    {current.greeting}
                  </div>

                  <div className="mt-1 text-[17px] font-semibold text-[#2167E8]">
                    {current.title}
                  </div>

                  <p className="mt-2 text-sm text-[#66758D] leading-5">
                    {current.subtitle}
                  </p>

                  <div className="mt-3 text-[15px] font-semibold text-[#263A57]">
                    {current.question}
                  </div>
                </div>

                {/* =================================================
                    HELP OPTIONS
                ================================================= */}

                <div className="mt-5 space-y-2.5">
                  {helpOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleSend(option.question)}
                      className="
                        w-full
                        text-left
                        p-3
                        rounded-2xl
                        border
                        border-[#E5ECF7]
                        hover:border-[#B9D1F7]
                        hover:bg-[#F7FAFF]
                        transition-all
                      "
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            w-10
                            h-10
                            rounded-xl
                            bg-[#EEF5FF]
                            flex
                            items-center
                            justify-center
                            text-xl
                            flex-shrink-0
                          "
                        >
                          {option.icon}
                        </div>

                        <div>
                          <div className="font-semibold text-[#1554B8] text-sm">
                            {option.title}
                          </div>

                          <div className="text-xs text-[#71809A] mt-0.5">
                            {option.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* =================================================
                    QUICK QUESTIONS
                ================================================= */}

                <div className="mt-5">
                  <div className="text-xs font-semibold text-[#66758D] mb-2">
                    {current.tryAsking}
                  </div>

                  <div className="space-y-2">
                    {quickQuestions.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleSend(item.text)}
                        className="
                          w-full
                          text-left
                          px-3
                          py-2.5
                          rounded-xl
                          bg-[#F5F8FD]
                          hover:bg-[#EAF2FF]
                          text-xs
                          text-[#35506F]
                          transition-colors
                        "
                      >
                        <span className="mr-2">
                          {item.icon}
                        </span>

                        {item.text}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* =================================================
                 NORMAL CHAT
              ================================================= */

              <div className="p-4 space-y-3">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {/* Bot robot */}

                    {msg.sender === "bot" && (
                      <div
                        className="
                          w-8
                          h-8
                          rounded-full
                          bg-[#EEF5FF]
                          mr-2
                          flex-shrink-0
                          overflow-hidden
                        "
                      >
                        <img
                          src="/assets/images/careos-robot.png"
                          alt="CareOS"
                          className="
                            w-full
                            h-full
                            object-contain
                            object-top
                          "
                        />
                      </div>
                    )}

                    {/* Message */}

                    <div
                      className={`
                        px-3.5
                        py-2.5
                        rounded-2xl
                        text-sm
                        whitespace-pre-line
                        max-w-[78%]
                        leading-5
                        ${
                          msg.sender === "user"
                            ? "bg-[#2167E8] text-white rounded-br-md"
                            : "bg-[#F1F5FA] text-[#263A57] rounded-bl-md"
                        }
                      `}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {/* Loading */}

                {loading && (
                  <div className="flex items-center gap-2">
                    <div
                      className="
                        w-8
                        h-8
                        rounded-full
                        bg-[#EEF5FF]
                        overflow-hidden
                      "
                    >
                      <img
                        src="/assets/images/careos-robot.png"
                        alt="CareOS"
                        className="
                          w-full
                          h-full
                          object-contain
                          object-top
                        "
                      />
                    </div>

                    <div
                      className="
                        bg-[#F1F5FA]
                        px-4
                        py-2.5
                        rounded-2xl
                        text-sm
                        text-[#66758D]
                      "
                    >
                      {current.typing}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* =================================================
              DISCLAIMER
          ================================================= */}

          <div
            className="
              px-4
              py-2
              bg-[#FAFCFF]
              border-t
              border-[#EEF2F8]
            "
          >
            <p
              className="
                text-[9px]
                leading-3.5
                text-[#7A8799]
                text-center
              "
            >
              {current.disclaimer}
            </p>
          </div>

          {/* =================================================
              INPUT
          ================================================= */}

          <div
            className="
              p-3
              bg-white
              border-t
              border-[#E5ECF7]
            "
          >
            <div className="flex gap-2">
              <input
                value={input}
                disabled={loading}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !e.shiftKey
                  ) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={current.placeholder}
                className="
                  flex-1
                  min-w-0
                  border
                  border-[#DCE6F3]
                  rounded-xl
                  px-3.5
                  py-2.5
                  text-sm
                  text-[#263A57]
                  outline-none
                  focus:ring-2
                  focus:ring-[#2167E8]/20
                  focus:border-[#2167E8]
                  disabled:bg-[#F5F7FA]
                "
              />

              <button
                onClick={() => handleSend()}
                disabled={
                  loading || !input.trim()
                }
                className="
                  bg-[#2167E8]
                  text-white
                  px-4
                  rounded-xl
                  text-sm
                  font-semibold
                  hover:bg-[#1557CE]
                  transition-colors
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                {loading ? "..." : current.send}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          CHAT OPEN ANIMATION
      ===================================================== */}

      <style>
        {`
          @keyframes careosChatOpen {
            0% {
              opacity: 0;
              transform: translateY(18px) scale(0.96);
            }

            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>
    </>
  );
};

export default CareOSChatbot;