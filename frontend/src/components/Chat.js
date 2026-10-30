import React, { useContext, useState } from "react";
import ReactMarkdown from "react-markdown";
import { ContextApp } from "../utils/Context";
import {
  GiWheat,
  GiChemicalDrop,
  GiEarthAsiaOceania,
} from "react-icons/gi";
import {
  FiCopy,
  FiCheck,
  FiVolume2,
  FiVolumeX,
  FiArrowRight,
  FiSliders,
  FiGrid,
  FiCompass,
} from "react-icons/fi";

const VISUAL_SHOWCASE_CARDS = [
  {
    image: "/assets/disease-scan.png",
    tag: "Computer Vision AI",
    title: "Plant Pathology & Leaf Scanner",
    desc: "Detects foliar diseases (blight, rust, leaf curl virus) and pest damage from field photos with organic & chemical protocols.",
    metrics: "98.4% Pathogen Match • Sub-2s Inference",
    query: "How to identify yellow leaf curl virus in tomatoes?",
  },
  {
    image: "/assets/soil-analytics.png",
    tag: "Soil Telemetry",
    title: "Precision Soil pH & NPK Engine",
    desc: "Computes balanced Urea, DAP, SSP, and MOP dosages based on 4R Nutrient Stewardship and soil health parameters.",
    metrics: "pH 5.0–8.5 Calibration • Split Dosing",
    query: "Optimal NPK ratio and soil pH for soybean cultivation?",
  },
  {
    image: "/assets/seasonal-crops.png",
    tag: "Climate Modeling",
    title: "Seasonal Crop & Drip Planner",
    desc: "Matches high-yield drought-tolerant crop varieties to Kharif, Rabi, and Zaid seasons across diverse soil types.",
    metrics: "Vertisols & Alluvial • 40% Water Savings",
    query: "Best Kharif crops suited for semi-arid black soil?",
  },
];

const CROP_NPK_DATA = {
  Soybean: { n: 10, p: 32, k: 16, idealPh: "6.0 - 7.5", urea: 22, dap: 70, mop: 27 },
  Wheat: { n: 48, p: 24, k: 16, idealPh: "6.5 - 7.5", urea: 85, dap: 52, mop: 27 },
  "Paddy / Rice": { n: 40, p: 20, k: 20, idealPh: "5.5 - 6.8", urea: 70, dap: 44, mop: 34 },
  Tomato: { n: 60, p: 30, k: 30, idealPh: "6.0 - 7.0", urea: 105, dap: 65, mop: 50 },
  Cotton: { n: 50, p: 25, k: 25, idealPh: "6.0 - 8.0", urea: 88, dap: 55, mop: 42 },
  Maize: { n: 55, p: 25, k: 20, idealPh: "5.8 - 7.2", urea: 96, dap: 55, mop: 34 },
};

const FOLLOW_UP_SUGGESTIONS = [
  "What are the best organic bio-pesticides for this?",
  "Give me the exact per-acre fertilizer & micronutrient schedule",
  "How should I adjust drip irrigation during flowering?",
];

const IntroDashboard = ({ onSelectQuery, onOpenShowcase }) => {
  const [activeTab, setActiveTab] = useState("showcase"); // "showcase" | "calculator" | "planner"

  // Interactive NPK Calculator State
  const [selectedCrop, setSelectedCrop] = useState("Soybean");
  const [acres, setAcres] = useState(5);
  const [soilPh, setSoilPh] = useState(6.8);

  // Interactive Regional Planner State
  const [region, setRegion] = useState("Central India (Black Vertisols)");
  const [season, setSeason] = useState("Kharif (Monsoon: June–Oct)");

  const cropInfo = CROP_NPK_DATA[selectedCrop];
  const totalUrea = Math.round(cropInfo.urea * acres);
  const totalDap = Math.round(cropInfo.dap * acres);
  const totalMop = Math.round(cropInfo.mop * acres);

  const getPhStatus = (ph) => {
    if (ph < 6.0) return { label: "Acidic Soil • Apply Agricultural Lime", color: "text-amber-400 bg-amber-950/50 border-amber-700/50" };
    if (ph > 7.5) return { label: "Alkaline Soil • Apply Gypsum", color: "text-sky-400 bg-sky-950/50 border-sky-700/50" };
    return { label: "Optimal Neutral pH • High Nutrient Availability", color: "text-emerald-400 bg-emerald-950/50 border-emerald-700/50" };
  };

  const phBadge = getPhStatus(soilPh);

  return (
    <div className="flex flex-col items-center w-full py-2 animate-fadeIn space-y-6">
      {/* Visual Hero Banner with Generated Photo */}
      <div className="relative w-full rounded-3xl overflow-hidden border border-gray-800 shadow-2xl group">
        <img
          src="/assets/hero-banner.png"
          alt="AgroAssist Precision Agriculture Hero"
          className="w-full h-52 sm:h-64 object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/85 to-gray-950/30 flex flex-col justify-between p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 backdrop-blur-md flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                AgroAssist v2.0 Live
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-gray-900/80 border border-gray-700 text-gray-300 backdrop-blur-md">
                Multimodal Vision + Voice AI
              </span>
            </div>

            {onOpenShowcase && (
              <button
                type="button"
                onClick={onOpenShowcase}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-emerald-600/90 text-white border border-white/20 hover:border-emerald-400 text-xs font-medium backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <span>View Full Project Architecture</span>
                <FiArrowRight />
              </button>
            )}
          </div>

          <div className="max-w-2xl mt-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Precision Agronomy &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                AI Crop Diagnostics
              </span>
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm mt-2 leading-relaxed">
              Upload plant leaf photos for instant pathology detection, calculate custom NPK fertilizer dosages for your acreage, or speak in your regional language.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3 border-t border-white/10 max-w-lg text-left">
            <div>
              <p className="text-emerald-400 font-bold text-xs sm:text-sm">98.4%</p>
              <p className="text-[10px] text-gray-400">Pathogen Grounding</p>
            </div>
            <div>
              <p className="text-sky-400 font-bold text-xs sm:text-sm">4R NPK</p>
              <p className="text-[10px] text-gray-400">Nutrient Calculator</p>
            </div>
            <div>
              <p className="text-amber-400 font-bold text-xs sm:text-sm">Real-Time</p>
              <p className="text-[10px] text-gray-400">SSE Token Stream</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Mode Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 bg-gray-900/90 p-1.5 rounded-2xl border border-gray-800 w-full sm:w-auto">
        <button
          type="button"
          onClick={() => setActiveTab("showcase")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === "showcase"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/50"
              : "text-gray-400 hover:text-white hover:bg-gray-800"
          }`}
        >
          <FiGrid />
          <span>Visual Feature Showcase</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("calculator")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === "calculator"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/50"
              : "text-gray-400 hover:text-white hover:bg-gray-800"
          }`}
        >
          <FiSliders />
          <span>Interactive NPK Calculator</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("planner")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === "planner"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/50"
              : "text-gray-400 hover:text-white hover:bg-gray-800"
          }`}
        >
          <FiCompass />
          <span>Regional Crop Planner</span>
        </button>
      </div>

      {/* TAB 1: Visual Feature Showcase Cards with Photos */}
      {activeTab === "showcase" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-left animate-fadeIn">
          {VISUAL_SHOWCASE_CARDS.map((card, idx) => (
            <div
              key={idx}
              onClick={() => onSelectQuery(card.query)}
              className="group bg-gray-900/80 hover:bg-gray-900 border border-gray-800 hover:border-emerald-500/60 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-lg hover:shadow-emerald-950/40 hover:-translate-y-1"
            >
              <div>
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-gray-950/85 border border-emerald-500/40 text-emerald-300 backdrop-blur-md">
                    {card.tag}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>

              <div className="px-4 pb-4 pt-2 border-t border-gray-800/60 flex items-center justify-between">
                <span className="text-[10px] font-medium text-emerald-400/90">
                  {card.metrics}
                </span>
                <span className="text-xs font-semibold text-white group-hover:text-emerald-300 flex items-center gap-1">
                  Try Demo <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: Interactive NPK & Soil Calculator */}
      {activeTab === "calculator" && (
        <div className="w-full bg-gray-900/90 border border-gray-800 rounded-2xl p-5 sm:p-6 text-left animate-fadeIn shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <GiChemicalDrop className="text-emerald-400 text-xl" />
                Interactive Farm Fertilizer & Soil pH Calculator
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Select your crop, acreage, and soil pH to compute real-time basal & top-dressing fertilizer dosages.
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-[11px] font-medium border ${phBadge.color}`}>
              {phBadge.label}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
            {/* Left Controls */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-2">
                  1. Select Target Crop
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(CROP_NPK_DATA).map((crop) => (
                    <button
                      key={crop}
                      type="button"
                      onClick={() => setSelectedCrop(crop)}
                      className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        selectedCrop === crop
                          ? "bg-emerald-600/30 border-emerald-500 text-emerald-300 font-semibold"
                          : "bg-gray-950/60 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white"
                      }`}
                    >
                      {crop}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-gray-300">2. Farm Land Area</span>
                  <span className="text-emerald-400 font-bold">{acres} Acres ({(acres * 0.4047).toFixed(1)} Ha)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={acres}
                  onChange={(e) => setAcres(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-gray-300">3. Measured Soil pH</span>
                  <span className="text-emerald-400 font-bold">pH {soilPh.toFixed(1)} (Ideal: {cropInfo.idealPh})</span>
                </div>
                <input
                  type="range"
                  min="5.0"
                  max="8.5"
                  step="0.1"
                  value={soilPh}
                  onChange={(e) => setSoilPh(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Right Computed Output */}
            <div className="bg-gray-950/90 border border-gray-800 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                  Estimated Fertilizer Requirement for {acres} Acre(s) of {selectedCrop}
                </p>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40">
                    <p className="text-[11px] text-gray-400">Urea (46% N)</p>
                    <p className="text-lg font-extrabold text-emerald-400 mt-1">{totalUrea} kg</p>
                    <p className="text-[10px] text-gray-500">{(totalUrea / 45).toFixed(1)} Bags</p>
                  </div>
                  <div className="p-3 rounded-xl bg-sky-950/30 border border-sky-800/40">
                    <p className="text-[11px] text-gray-400">DAP (18-46-0)</p>
                    <p className="text-lg font-extrabold text-sky-400 mt-1">{totalDap} kg</p>
                    <p className="text-[10px] text-gray-500">{(totalDap / 50).toFixed(1)} Bags</p>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/40">
                    <p className="text-[11px] text-gray-400">MOP (60% K₂O)</p>
                    <p className="text-lg font-extrabold text-amber-400 mt-1">{totalMop} kg</p>
                    <p className="text-[10px] text-gray-500">{(totalMop / 50).toFixed(1)} Bags</p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  onSelectQuery(
                    `Optimal NPK ratio and soil pH for ${selectedCrop.toLowerCase()} cultivation on ${acres} acres with soil pH ${soilPh}?`
                  )
                }
                className="mt-4 w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>Generate Stage-Wise AI Application Schedule</span>
                <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Regional & Seasonal Crop Planner */}
      {activeTab === "planner" && (
        <div className="w-full bg-gray-900/90 border border-gray-800 rounded-2xl p-5 sm:p-6 text-left animate-fadeIn shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <GiEarthAsiaOceania className="text-emerald-400 text-xl" />
            Agro-Climatic Zone & Seasonal Crop Selector
          </h3>
          <p className="text-xs text-gray-400 mt-0.5 mb-4">
            Choose your geographical soil zone and farming season to receive high-yield variety recommendations and irrigation schedules.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-2">
                Select Soil & Agro-Climatic Region
              </label>
              <div className="space-y-2">
                {[
                  "Central India (Black Vertisols)",
                  "Indo-Gangetic Plains (Alluvial Loam)",
                  "Southern Deccan (Semi-Arid Red Soil)",
                  "Western Arid / Coastal Delta",
                ].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRegion(r)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                      region === r
                        ? "bg-emerald-600/25 border-emerald-500 text-emerald-300"
                        : "bg-gray-950/60 border-gray-800 text-gray-400 hover:text-white"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-2">
                  Select Cropping Season
                </label>
                <div className="space-y-2">
                  {[
                    "Kharif (Monsoon: June–Oct)",
                    "Rabi (Winter: Nov–April)",
                    "Zaid (Summer: March–June)",
                  ].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSeason(s)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        season === s
                          ? "bg-emerald-600/25 border-emerald-500 text-emerald-300"
                          : "bg-gray-950/60 border-gray-800 text-gray-400 hover:text-white"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  onSelectQuery(
                    `Best ${season.split(" ")[0]} crops suited for semi-arid black soil and ${region}?`
                  )
                }
                className="mt-4 w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>Generate Regional Crop & Irrigation Blueprint</span>
                <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function Chat({ onOpenShowcase }) {
  const { message, msgEnd, handleSend, loading } = useContext(ContextApp);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [speakingIndex, setSpeakingIndex] = useState(null);

  const handleSelectQuickQuery = (queryText) => {
    handleSend(queryText);
  };

  const handleCopy = (text, idx) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSpeakToggle = (text, idx) => {
    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (speakingIndex === idx) {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[#*_`~>-]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "en-IN";
    utterance.rate = 1.0;
    utterance.onend = () => setSpeakingIndex(null);
    utterance.onerror = () => setSpeakingIndex(null);
    setSpeakingIndex(idx);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-full flex-1 overflow-y-auto px-3 sm:px-6 py-4 scroll flex flex-col items-center">
      <div className="w-full max-w-5xl flex flex-col">
        {message.length === 0 ? (
          <IntroDashboard
            onSelectQuery={handleSelectQuickQuery}
            onOpenShowcase={onOpenShowcase}
          />
        ) : (
          <div className="flex flex-col gap-4 pb-4">
            {message.map((msg, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div
                  className={`flex items-start gap-3 p-4 sm:p-5 rounded-2xl transition-colors ${
                    msg.isBot
                      ? "bg-gray-900/90 border border-gray-800 shadow-lg"
                      : "bg-emerald-950/25 border border-emerald-800/40 ml-4 sm:ml-16"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold shadow-sm ${
                      msg.isBot
                        ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-gray-800 text-emerald-300 border border-gray-700"
                    }`}
                  >
                    {msg.isBot ? <GiWheat className="text-lg" /> : "YOU"}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-gray-300 flex items-center gap-2">
                        {msg.isBot ? (
                          <>
                            <span>AgroAssist Digital Agronomist</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                              Verified Grounding
                            </span>
                          </>
                        ) : (
                          "Farmer Consultation"
                        )}
                      </span>

                      {/* Action Buttons for Bot Message */}
                      {msg.isBot && msg.text && (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleSpeakToggle(msg.text, i)}
                            className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-colors cursor-pointer ${
                              speakingIndex === i
                                ? "bg-emerald-600 text-white"
                                : "bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white"
                            }`}
                            title={speakingIndex === i ? "Stop audio playback" : "Listen to advisory"}
                          >
                            {speakingIndex === i ? <FiVolumeX /> : <FiVolume2 />}
                            <span className="hidden sm:inline text-[11px]">
                              {speakingIndex === i ? "Stop" : "Listen"}
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleCopy(msg.text, i)}
                            className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white text-xs flex items-center gap-1 transition-colors cursor-pointer"
                            title="Copy advisory response"
                          >
                            {copiedIndex === i ? (
                              <>
                                <FiCheck className="text-emerald-400" />
                                <span className="hidden sm:inline text-[11px] text-emerald-400">
                                  Copied
                                </span>
                              </>
                            ) : (
                              <>
                                <FiCopy />
                                <span className="hidden sm:inline text-[11px]">Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Attached Image if present */}
                    {msg.image && (
                      <div className="my-2.5">
                        <img
                          src={msg.image}
                          alt="Uploaded crop specimen"
                          className="max-h-64 rounded-xl border border-gray-700 shadow-md object-cover"
                        />
                      </div>
                    )}

                    {/* Body Text */}
                    {msg.isBot ? (
                      <div className="text-gray-100 text-[14px] leading-relaxed prose prose-invert max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-0.5 prose-strong:text-emerald-300 prose-headings:text-emerald-300">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                        {msg.text?.length === 0 && i === message.length - 1 && (
                          <div className="flex items-center gap-2 text-xs text-emerald-400 py-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                            <span>Analyzing agronomic parameters...</span>
                          </div>
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

                {/* Interactive Follow-Up Suggestion Chips after the last bot response */}
                {msg.isBot && msg.text && i === message.length - 1 && !loading && (
                  <div className="flex flex-wrap items-center gap-2 pl-2 sm:pl-12 pt-1 animate-fadeIn">
                    <span className="text-[11px] text-gray-500 font-medium">
                      Follow-up:
                    </span>
                    {FOLLOW_UP_SUGGESTIONS.map((suggestion, sIdx) => (
                      <button
                        key={sIdx}
                        type="button"
                        onClick={() => handleSelectQuickQuery(suggestion)}
                        className="text-[11px] px-3 py-1.5 rounded-full bg-gray-900 hover:bg-emerald-950/60 text-gray-300 hover:text-emerald-300 border border-gray-800 hover:border-emerald-600/50 transition-all cursor-pointer"
                      >
                        + {suggestion}
                      </button>
                    ))}
                  </div>
                )}
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
