import React, { useContext, useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { LuPanelLeftClose } from "react-icons/lu";
import { FiMessageSquare, FiShield, FiInfo, FiActivity } from "react-icons/fi";
import { GiWheat, GiPlantRoots } from "react-icons/gi";
import { ContextApp } from "../utils/Context";

const SAMPLE_QUERIES = [
  {
    category: "Pathology",
    topic: "Crop Diagnostics",
    text: "How to identify yellow leaf curl virus in tomatoes?",
  },
  {
    category: "Soil",
    topic: "Soil & Fertilizers",
    text: "Optimal NPK ratio and soil pH for soybean cultivation?",
  },
  {
    category: "Pathology",
    topic: "Pest Management",
    text: "Eco-friendly bio-pesticides for stem borer in paddy?",
  },
  {
    category: "Water",
    topic: "Irrigation Scheduling",
    text: "Drip irrigation frequency during maize flowering stage?",
  },
  {
    category: "Season",
    topic: "Seasonal Planning",
    text: "Best Kharif crops suited for semi-arid black soil?",
  },
  {
    category: "Soil",
    topic: "Wheat Nutrition",
    text: "Recommended NPK fertilizer schedule and rust control for wheat?",
  },
];

const CATEGORIES = ["All", "Pathology", "Soil", "Water", "Season"];

function LeftNav() {
  const { setShowSlide, showSlide, handleSend, handleNewChat } = useContext(ContextApp);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [backendAlive, setBackendAlive] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
        const res = await fetch(`${apiUrl}/health`);
        setBackendAlive(res.ok);
      } catch (_) {
        setBackendAlive(false);
      }
    };
    checkHealth();
    const interval = setInterval(checkHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  const filteredQueries =
    selectedCategory === "All"
      ? SAMPLE_QUERIES
      : SAMPLE_QUERIES.filter((q) => q.category === selectedCategory);

  return (
    <aside
      className={
        !showSlide
          ? "h-screen bg-gray-900 w-[290px] border-r border-gray-800 hidden lg:flex items-center justify-between p-3.5 text-white flex-col transition-all duration-300 select-none"
          : "hidden"
      }
    >
      {/* Top action bar */}
      <div className="flex items-center justify-between w-full gap-2">
        <button
          type="button"
          onClick={handleNewChat}
          className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border border-emerald-400/30 rounded-xl py-2.5 px-3 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md shadow-emerald-950/50"
          title="Start fresh consultation"
        >
          <AiOutlinePlus className="text-base" />
          <span>New Consultation</span>
        </button>

        <button
          type="button"
          onClick={() => setShowSlide(true)}
          className="border border-gray-700 hover:bg-gray-800 rounded-xl p-2.5 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
          title="Collapse sidebar"
          aria-label="Collapse sidebar"
        >
          <LuPanelLeftClose className="text-base" />
        </button>
      </div>

      {/* Interactive Category Filter Pills */}
      <div className="w-full mt-3">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 px-1 mb-2 flex items-center gap-1.5">
          <GiPlantRoots className="text-emerald-400 text-sm" />
          Curated Farm Queries
        </p>

        <div className="flex flex-wrap gap-1 px-1 mb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-2 py-1 rounded-lg text-[10px] font-medium transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-800/80 text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Filtered Query Cards */}
      <div className="flex-1 w-full flex flex-col items-start justify-start overflow-y-auto my-1 pr-1 text-sm scroll gap-1.5">
        {filteredQueries.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleSend(item.text)}
            className="w-full text-left p-2.5 rounded-xl bg-gray-950/40 hover:bg-gray-800/90 border border-gray-800/60 hover:border-emerald-500/40 transition-all duration-200 group cursor-pointer"
          >
            <div className="flex items-center justify-between text-gray-400 group-hover:text-emerald-400 text-xs mb-1">
              <span className="flex items-center gap-1.5 font-semibold text-[11px]">
                <FiMessageSquare className="text-xs shrink-0" />
                {item.topic}
              </span>
              <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-gray-800 text-gray-400 group-hover:bg-emerald-950 group-hover:text-emerald-300">
                {item.category}
              </span>
            </div>
            <p className="text-xs text-gray-300 group-hover:text-white line-clamp-2 leading-relaxed">
              {item.text}
            </p>
          </button>
        ))}
      </div>

      {/* Bottom Telemetry & Project Status Card */}
      <div className="w-full border-t border-gray-800 pt-3 flex flex-col gap-2.5">
        {/* Mini Visual Project Card */}
        <div className="relative rounded-xl overflow-hidden border border-gray-800 h-20 group">
          <img
            src="/assets/soil-analytics.png"
            alt="AgroAssist Telemetry"
            className="w-full h-full object-cover opacity-55 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent p-2.5 flex flex-col justify-end">
            <div className="flex items-center gap-1.5">
              <GiWheat className="text-emerald-400 text-sm shrink-0" />
              <span className="font-bold text-[11px] text-white">AgroAssist v2.0 Enterprise</span>
            </div>
            <span className="text-[10px] text-gray-300">Vision + Soil NPK + Voice AI</span>
          </div>
        </div>

        {/* Live Backend Health Status */}
        <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-gray-950 border border-gray-800 text-[11px]">
          <span className="flex items-center gap-1.5 text-gray-300 font-medium">
            <FiActivity className={backendAlive ? "text-emerald-400" : "text-amber-400"} />
            API Status:
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                backendAlive ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
              }`}
            />
            <span className={backendAlive ? "text-emerald-400 font-semibold" : "text-amber-400"}>
              {backendAlive ? "Online (5000)" : "Standby"}
            </span>
          </span>
        </div>

        <div className="flex items-center justify-between px-1 text-[11px] text-gray-400">
          <span className="flex items-center gap-1">
            <FiShield className="text-emerald-400" /> Guardrailed AI
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
