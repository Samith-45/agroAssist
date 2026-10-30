import React, { useState } from "react";
import { FiX, FiCpu, FiShield, FiActivity, FiLayers, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { GiWheat } from "react-icons/gi";

const PROJECT_MODULES = [
  {
    id: "vision",
    image: "/assets/disease-scan.png",
    badge: "Computer Vision AI",
    title: "Multimodal Plant Pathology & Pest Diagnostics",
    description:
      "Farmers upload field photos of infected leaves, stems, or pests. AgroAssist's multimodal vision pipeline detects chlorosis, fungal lesions (blight, rust), and viral curling, returning confidence scores along with organic and chemical remedies.",
    metrics: ["Sub-2s Visual Inference", "Organic + Chemical Protocols", "Base64 MIME Validation"],
    samplePrompt: "How do I diagnose leaf rust and blight on wheat, and what is the organic treatment?",
  },
  {
    id: "soil",
    image: "/assets/soil-analytics.png",
    badge: "Precision Soil Science",
    title: "Smart Soil Health, pH & NPK Nutrient Engine",
    description:
      "Translates soil test metrics into actionable 4R Nutrient Stewardship schedules. Computes basal and top-dressing dosages of Urea, DAP, SSP, and MOP tailored to crop growth stages and soil pH.",
    metrics: ["4R Nutrient Stewardship", "pH & EC Remediation", "Split Fertigation Schedules"],
    samplePrompt: "Optimal NPK ratio and soil pH for soybean cultivation?",
  },
  {
    id: "climate",
    image: "/assets/seasonal-crops.png",
    badge: "Agro-Climatic Modeling",
    title: "Seasonal Crop Planning & Smart Drip Irrigation",
    description:
      "Aligns crop variety selection with regional soil types (Vertisols, Alluvial, Red Loam) across Kharif, Rabi, and Zaid seasons. Prevents out-of-season planting errors and optimizes drip water efficiency.",
    metrics: ["Kharif / Rabi / Zaid Guardrails", "Evapotranspiration Scheduling", "Drought-Tolerant Varieties"],
    samplePrompt: "Best Kharif crops suited for semi-arid black soil?",
  },
];

function ProjectShowcaseModal({ isOpen, onClose, onTriggerPrompt }) {
  const [activeImage, setActiveImage] = useState(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-gray-900 border border-gray-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-950/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <GiWheat className="text-xl" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                AgroAssist — Project Architecture & Visual Showcase
                <span className="text-[10px] uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-700/50 px-2 py-0.5 rounded-full">
                  v2.0 Enterprise
                </span>
              </h2>
              <p className="text-xs text-gray-400">
                Full-Stack AI Agronomy Platform • Gemini 2.5 Flash SSE Streaming • Express Guardrails
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
            aria-label="Close showcase modal"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scroll">
          {/* Hero Banner Section with Photo */}
          <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-xl group">
            <img
              src="/assets/hero-banner.png"
              alt="AgroAssist Precision Agriculture Platform Banner"
              className="w-full h-56 sm:h-72 object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent flex flex-col justify-end p-6">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 backdrop-blur-md">
                  🌾 Precision Agriculture AI
                </span>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-sky-500/20 border border-sky-400/40 text-sky-300 backdrop-blur-md">
                  ⚡ Real-Time SSE Streaming
                </span>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/20 border border-amber-400/40 text-amber-300 backdrop-blur-md">
                  🛡️ Zero-Exposure API Proxy
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Empowering Farmers with Grounded, Multimodal Agronomic Intelligence
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-3xl mt-1 leading-relaxed">
                Designed to bridge the gap between laboratory plant pathology and field-level farming decisions. AgroAssist combines computer vision leaf diagnosis, voice recognition, and strict agricultural guardrails in a resilient full-stack architecture.
              </p>
            </div>
          </div>

          {/* 3 Visual Pillars with Generated Photos */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-4 flex items-center gap-2">
              <FiLayers /> Core Project Capabilities & Visual Walkthrough
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {PROJECT_MODULES.map((mod) => (
                <div
                  key={mod.id}
                  className="bg-gray-950/90 border border-gray-800 hover:border-emerald-500/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:shadow-emerald-950/30 group"
                >
                  <div>
                    <div
                      className="relative h-44 overflow-hidden cursor-pointer"
                      onClick={() => setActiveImage(mod)}
                    >
                      <img
                        src={mod.image}
                        alt={mod.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-gray-950/80 border border-emerald-500/40 text-emerald-300 backdrop-blur-md">
                        {mod.badge}
                      </span>
                    </div>

                    <div className="p-4">
                      <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {mod.title}
                      </h4>
                      <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                        {mod.description}
                      </p>

                      <div className="mt-3 pt-3 border-t border-gray-800/80 space-y-1.5">
                        {mod.metrics.map((m, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[11px] text-gray-300">
                            <FiCheckCircle className="text-emerald-400 shrink-0" />
                            <span>{m}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-4 pb-4">
                    <button
                      type="button"
                      onClick={() => {
                        onTriggerPrompt(mod.samplePrompt);
                        onClose();
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>Test This Module Live</span>
                      <FiArrowRight />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Engineering & Architecture Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-950/60 border border-gray-800/80 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <FiShield className="text-lg" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Defense-in-Depth Security</h4>
                <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                  Zero client-side API key exposure. Zod schema validation, Helmet HTTP headers, and IP rate-limiting middleware.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <FiCpu className="text-lg" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Hybrid Resilient AI Engine</h4>
                <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                  Streams live Gemini 2.5 Flash tokens with automatic failover to an embedded Agronomy Knowledge Base when offline.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <FiActivity className="text-lg" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Voice & Vision Accessibility</h4>
                <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                  Integrated Web Speech-to-Text (STT), Text-to-Speech (TTS) audio playback, and interactive NPK calculators.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lightbox Image Preview if clicked */}
        {activeImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setActiveImage(null)}
          >
            <div className="max-w-3xl w-full bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
              <img src={activeImage.image} alt={activeImage.title} className="w-full max-h-[70vh] object-contain bg-black" />
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{activeImage.title}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">{activeImage.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveImage(null)}
                  className="px-3 py-1.5 rounded-lg bg-gray-800 text-xs text-white hover:bg-gray-700"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectShowcaseModal;
