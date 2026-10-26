import React, { useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiMessageSquare, FiShield } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { GiPlantRoots, GiWheat } from "react-icons/gi";
import { ContextApp } from "../utils/Context";

const SAMPLE_QUERIES = [
  {
    topic: "Crop Diagnostics",
    text: "How to identify yellow leaf curl virus in tomatoes?",
  },
  {
    topic: "Soil & Fertilizers",
    text: "Optimal NPK ratio and soil pH for soybean cultivation?",
  },
  {
    topic: "Pest Management",
    text: "Eco-friendly bio-pesticides for stem borer in paddy?",
  },
  {
    topic: "Irrigation Scheduling",
    text: "Drip irrigation frequency during maize flowering stage?",
  },
  {
    topic: "Seasonal Planning",
    text: "Best Kharif crops suited for semi-arid black soil?",
  },
];

function Mobile() {
  const { Mobile: isMobileOpen, setMobile, handleQuery, handleNewChat } = useContext(ContextApp);

  if (!isMobileOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex">
      <div className="h-full bg-gray-900 w-[85%] max-w-[320px] flex flex-col justify-between p-4 text-white shadow-2xl border-r border-gray-800 animate-slideRight">
        {/* Top Header */}
        <div className="flex items-center justify-between w-full mb-3">
          <div className="flex items-center gap-2">
            <GiWheat className="text-xl text-emerald-400" />
            <span className="font-semibold text-sm">AgroAssist Menu</span>
          </div>
          <button
            type="button"
            onClick={() => setMobile(false)}
            className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white"
            aria-label="Close menu"
          >
            <MdClose className="text-xl" />
          </button>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={() => {
            handleNewChat();
            setMobile(false);
          }}
          className="w-full bg-emerald-600 hover:bg-emerald-500 rounded-xl py-2.5 px-3 text-xs font-medium flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm mb-4"
        >
          <AiOutlinePlus className="text-base" />
          <span>New Consultation</span>
        </button>

        {/* Curated Queries */}
        <div className="flex-1 overflow-y-auto pr-1 text-sm scroll">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
            <GiPlantRoots className="text-emerald-400" />
            Farm Knowledge Prompts
          </p>

          <div className="flex flex-col gap-2">
            {SAMPLE_QUERIES.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={(e) => {
                  handleQuery(e);
                  setMobile(false);
                }}
                className="w-full text-left p-2.5 rounded-xl bg-gray-800/40 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 transition-all text-xs text-gray-300"
              >
                <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-medium mb-1">
                  <FiMessageSquare className="text-xs" />
                  <span>{item.topic}</span>
                </div>
                <p className="line-clamp-2">{item.text}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-800 pt-3 mt-3 flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center gap-1 text-[11px]">
            <FiShield className="text-emerald-400" /> Guardrailed AI
          </span>
          <span className="text-[11px]">v2.0</span>
        </div>
      </div>

      {/* Click outside to close backdrop */}
      <div
        className="flex-1"
        onClick={() => setMobile(false)}
        aria-hidden="true"
      />
    </div>
  );
}

export default Mobile;
