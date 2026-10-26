import React, { useContext } from "react";
import ReactMarkdown from "react-markdown";
import { ContextApp } from "../utils/Context";
import { GiPlantRoots, GiWateringCan, GiPoisonBottle, GiWheat } from "react-icons/gi";

const QUICK_ACTIONS = [
  {
    icon: <GiPlantRoots className="text-xl text-emerald-400" />,
    title: "Crop Disease Diagnosis",
    desc: "Attach leaf photo to identify rust, blight, or virus",
    query: "How do I diagnose leaf rust and blight on wheat?",
  },
  {
    icon: <GiWateringCan className="text-xl text-sky-400" />,
    title: "Irrigation & Soil",
    desc: "Water requirements & soil preparation advice",
    query: "What is the optimal irrigation schedule and soil prep for cotton?",
  },
  {
    icon: <GiPoisonBottle className="text-xl text-amber-400" />,
    title: "Pest & Fertilizer",
    desc: "Organic pest remedies and chemical NPK dosing",
    query: "Recommended organic fertilizer and pest control for organic paddy farming?",
  },
  {
    icon: <GiWheat className="text-xl text-lime-400" />,
    title: "Seasonal Planting",
    desc: "Sowing calendar & high-yield variety guides",
    query: "Which high-yield Kharif pulse varieties perform best in dry soil?",
  },
];

const IntroMessage = ({ onSelectQuery }) => (
  <div className="flex flex-col items-center justify-center min-h-[70vh] w-full px-4 text-center my-auto animate-fadeIn">
    <div className="relative mb-4">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-950/50">
        <div className="w-full h-full bg-gray-900 rounded-[14px] flex items-center justify-center">
          <GiWheat className="text-3xl text-emerald-400" />
        </div>
      </div>
      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-gray-950 rounded-full" />
    </div>

    <h2 className="text-2xl font-bold text-white tracking-tight">
      AgroAssist Agronomy Suite
    </h2>
    <p className="text-gray-400 text-sm mt-2 max-w-lg leading-relaxed">
      Intelligent, multilingual agricultural advisory system powered by Gemini 2.5 Flash. Ask agronomic questions or upload plant photos for instant crop diagnostics.
    </p>

    {/* Quick action cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 max-w-2xl w-full text-left">
      {QUICK_ACTIONS.map((card, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => onSelectQuery(card.query)}
          className="p-3.5 rounded-xl bg-gray-900/70 hover:bg-gray-800/80 border border-gray-800 hover:border-emerald-600/50 transition-all duration-200 group flex items-start gap-3 text-left cursor-pointer shadow-sm"
        >
          <div className="p-2 rounded-lg bg-gray-800/80 group-hover:scale-105 transition-transform shrink-0">
            {card.icon}
          </div>
          <div>
            <h3 className="text-xs font-semibold text-gray-200 group-hover:text-emerald-300">
              {card.title}
            </h3>
            <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">
              {card.desc}
            </p>
          </div>
        </button>
      ))}
    </div>
  </div>
);

function Chat() {
  const { message, msgEnd, setChatValue, handleSend } = useContext(ContextApp);

  const handleSelectQuickQuery = (queryText) => {
    setChatValue(queryText);
    handleSend(queryText);
  };

  return (
    <div className="w-full flex-1 overflow-y-auto px-3 sm:px-6 py-4 scroll flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col">
        {message.length === 0 ? (
          <IntroMessage onSelectQuery={handleSelectQuickQuery} />
        ) : (
          <div className="flex flex-col gap-4">
            {message.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-4 rounded-2xl transition-colors ${
                  msg.isBot
                    ? "bg-gray-900/80 border border-gray-800/80 shadow-md"
                    : "bg-emerald-950/20 border border-emerald-900/30 ml-4 sm:ml-12"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm font-semibold shadow-sm ${
                    msg.isBot
                      ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-gray-800 text-gray-300 border border-gray-700"
                  }`}
                >
                  {msg.isBot ? <GiWheat className="text-lg" /> : "User"}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-300">
                      {msg.isBot ? "AgroAssist Advisor" : "Farmer Query"}
                    </span>
                  </div>

                  {/* Attached Image if present */}
                  {msg.image && (
                    <div className="my-2">
                      <img
                        src={msg.image}
                        alt="Crop upload"
                        className="max-h-64 rounded-xl border border-gray-700 shadow-md object-cover"
                      />
                    </div>
                  )}

                  {/* Body Text */}
                  {msg.isBot ? (
                    <div className="text-gray-100 text-[14px] leading-relaxed prose prose-invert max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-0.5 prose-strong:text-emerald-300">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                      {msg.text?.length === 0 && i === message.length - 1 && (
                        <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse ml-1 align-middle" />
                      )}
                    </div>
                  ) : (
                    msg.text && (
                      <p className="text-gray-100 text-[14px] leading-relaxed whitespace-pre-wrap">
                        {msg.text}
                      </p>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        <div ref={msgEnd} />
      </div>
    </div>
  );
}

export default Chat;