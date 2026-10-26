import React, { useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { LuPanelLeftClose } from "react-icons/lu";
import { FiMessageSquare, FiShield, FiInfo } from "react-icons/fi";
import { GiWheat, GiPlantRoots } from "react-icons/gi";
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

function LeftNav() {
  const { setShowSlide, showSlide, handleQuery, handleNewChat } = useContext(ContextApp);

  return (
    <aside
      className={
        !showSlide
          ? "h-screen bg-gray-900 w-[280px] border-r border-gray-800 hidden lg:flex items-center justify-between p-3 text-white flex-col transition-all duration-300"
          : "hidden"
      }
    >
      {/* Top action bar */}
      <div className="flex items-center justify-between w-full gap-2">
        <button
          type="button"
          onClick={handleNewChat}
          className="flex-1 bg-emerald-700/70 hover:bg-emerald-600 border border-emerald-500/40 rounded-xl py-2.5 px-3 text-xs font-medium flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
          title="Start fresh conversation"
        >
          <AiOutlinePlus className="text-base" />
          <span>New Consultation</span>
        </button>

        <button
          type="button"
          onClick={() => setShowSlide(true)}
          className="border border-gray-700 hover:bg-gray-800 rounded-xl p-2.5 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          title="Collapse sidebar"
          aria-label="Collapse sidebar"
        >
          <LuPanelLeftClose className="text-base" />
        </button>
      </div>

      {/* Recommended Topics / History */}
      <div className="flex-1 w-full flex flex-col items-start justify-start overflow-y-auto my-3 pr-1 text-sm scroll">
        <div className="w-full mb-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 px-2 py-1 flex items-center gap-1.5">
            <GiPlantRoots className="text-emerald-400 text-sm" />
            Curated Farm Queries
          </p>
        </div>

        <div className="w-full flex flex-col gap-1.5">
          {SAMPLE_QUERIES.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={handleQuery}
              className="w-full text-left p-2.5 rounded-xl hover:bg-gray-800/80 border border-transparent hover:border-gray-700/60 transition-all duration-200 group cursor-pointer"
            >
              <div className="flex items-center gap-2 text-gray-400 group-hover:text-emerald-400 text-xs mb-1">
                <FiMessageSquare className="text-xs shrink-0" />
                <span className="font-medium text-[11px]">{item.topic}</span>
              </div>
              <p className="text-xs text-gray-300 group-hover:text-white line-clamp-2 leading-relaxed">
                {item.text}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Info Section */}
      <div className="w-full border-t border-gray-800 pt-3 flex flex-col gap-2">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-800/30 text-emerald-300 text-xs">
          <GiWheat className="text-base shrink-0 text-emerald-400" />
          <div className="flex flex-col">
            <span className="font-medium text-[11px]">AgroAssist v2.0</span>
            <span className="text-[10px] text-gray-400">Strict Agricultural Guardrails</span>
          </div>
        </div>

        <div className="flex items-center justify-between px-2 text-[11px] text-gray-400">
          <span className="flex items-center gap-1">
            <FiShield className="text-emerald-400" /> Grounded AI
          </span>
          <span className="flex items-center gap-1">
            <FiInfo className="text-gray-400" /> Multi-lingual
          </span>
        </div>
      </div>
    </aside>
  );
}

export default LeftNav;
