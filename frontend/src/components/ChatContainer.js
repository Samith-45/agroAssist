import React, { useContext, useEffect, useRef, useState } from "react";
import { FiSend, FiMic, FiMicOff, FiImage, FiX, FiMenu, FiLayers } from "react-icons/fi";
import { LuPanelLeftOpen } from "react-icons/lu";
import { HiOutlineSparkles } from "react-icons/hi";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { ContextApp } from "../utils/Context";
import Chat from "./Chat";
import ProjectShowcaseModal from "./ProjectShowcaseModal";

function ChatContainer() {
  const {
    chatValue,
    setChatValue,
    handleSend,
    handleKeyPress,
    loading,
    setMobile,
    showSlide,
    setShowSlide,
    selectedImage,
    setSelectedImage,
    previewImage,
    setPreviewImage,
  } = useContext(ContextApp);

  const [isShowcaseOpen, setIsShowcaseOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Sync voice transcript with input value
  useEffect(() => {
    if (transcript) {
      setChatValue(transcript);
    }
  }, [transcript, setChatValue]);

  const handleMicToggle = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    }
  };

  const processFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (PNG, JPG, WEBP).");
      return;
    }
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    processFile(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    }
    handleSend();
  };

  return (
    <div
      className="flex-1 flex flex-col h-screen bg-gray-950 text-gray-100 relative overflow-hidden"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Drag and Drop Overlay */}
      {isDragging && (
        <div className="absolute inset-0 z-40 bg-emerald-950/80 backdrop-blur-sm border-2 border-dashed border-emerald-400 m-4 rounded-3xl flex flex-col items-center justify-center pointer-events-none animate-fadeIn">
          <FiImage className="text-5xl text-emerald-400 mb-3 animate-bounce" />
          <p className="text-lg font-bold text-white">Drop Crop Leaf or Soil Photo Here</p>
          <p className="text-xs text-emerald-300 mt-1">Instant Multimodal AI Pathology Analysis</p>
        </div>
      )}

      {/* Top Header */}
      <header className="h-14 border-b border-gray-800 flex items-center justify-between px-4 lg:px-8 bg-gray-900/70 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-xl hover:bg-gray-800 text-gray-300 transition-colors"
            onClick={() => setMobile(true)}
            aria-label="Open sidebar menu"
          >
            <FiMenu className="text-xl" />
          </button>

          {/* Desktop Expand Sidebar button when collapsed */}
          {showSlide && (
            <button
              type="button"
              onClick={() => setShowSlide(false)}
              className="hidden lg:flex p-2 rounded-xl border border-gray-700 hover:bg-gray-800 text-gray-300 hover:text-white transition-colors"
              title="Expand sidebar"
              aria-label="Expand sidebar"
            >
              <LuPanelLeftOpen className="text-base" />
            </button>
          )}

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="font-bold text-sm lg:text-base tracking-wide text-white flex items-center gap-2">
              AgroAssist
              <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                AI Agronomist
              </span>
            </h1>
          </div>
        </div>

        {/* Right Header Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsShowcaseOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <FiLayers className="text-sm" />
            <span>Project Gallery & Info</span>
          </button>

          <div className="hidden md:flex items-center gap-1.5 text-xs text-gray-400 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-xl">
            <HiOutlineSparkles className="text-emerald-400" />
            <span>Gemini 2.5 Flash</span>
          </div>
        </div>
      </header>

      {/* Chat Messages & Interactive Dashboard Section */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <Chat onOpenShowcase={() => setIsShowcaseOpen(true)} />
      </main>

      {/* Input Tray Section */}
      <footer className="w-full bg-gradient-to-t from-gray-950 via-gray-950/95 to-transparent pt-2 pb-4 px-3 sm:px-6 lg:px-12 z-20">
        <div className="max-w-5xl mx-auto flex flex-col gap-2">
          {/* Image Attachment Preview */}
          {previewImage && (
            <div className="relative inline-flex items-center gap-3 p-2 bg-gray-900 border border-emerald-500/50 rounded-xl w-fit shadow-lg animate-fadeIn">
              <img
                src={previewImage}
                alt="Selected crop or leaf"
                className="w-14 h-14 object-cover rounded-lg border border-gray-700"
              />
              <div className="text-xs text-gray-200 pr-2">
                <p className="font-semibold truncate max-w-[200px]">
                  {selectedImage?.name || "Attached Crop Specimen"}
                </p>
                <p className="text-emerald-400 text-[11px] flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Ready for AI pathology scan
                </p>
              </div>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="p-1.5 rounded-full bg-gray-800 hover:bg-red-500/20 text-gray-300 hover:text-red-400 transition-colors cursor-pointer"
                title="Remove image"
              >
                <FiX className="text-sm" />
              </button>
            </div>
          )}

          {/* Interactive Chat Input Bar */}
          <div className="relative flex items-center gap-2 bg-gray-900/95 border border-gray-700/80 rounded-2xl p-2 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/30 transition-all shadow-2xl">
            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            {/* Upload Image Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 rounded-xl hover:bg-gray-800 text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer"
              title="Upload or drag-and-drop crop leaf / pest photo"
              aria-label="Upload crop image"
            >
              <FiImage className="text-lg" />
            </button>

            {/* Microphone Button */}
            <button
              type="button"
              onClick={handleMicToggle}
              className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                listening
                  ? "bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse"
                  : "hover:bg-gray-800 text-gray-400 hover:text-emerald-400"
              }`}
              title={listening ? "Listening... Click to stop" : "Speak your query (Voice Input)"}
              aria-label="Voice input"
            >
              {listening ? <FiMicOff className="text-lg" /> : <FiMic className="text-lg" />}
            </button>

            {/* Query Input Box */}
            <input
              type="text"
              ref={textareaRef}
              value={chatValue}
              onChange={(e) => setChatValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={
                listening
                  ? "Listening to your voice query..."
                  : "Ask about crop diseases, NPK fertilizer ratios, soil pH, or drop a leaf photo..."
              }
              className="flex-1 bg-transparent border-0 outline-none text-sm text-gray-100 placeholder-gray-500 px-2 py-1"
              disabled={loading}
            />

            {/* Send Button */}
            <button
              type="button"
              onClick={onSubmit}
              disabled={loading || (!chatValue.trim() && !selectedImage)}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-800 disabled:text-gray-600 text-white text-xs font-semibold transition-all shadow-md flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
              title="Send consultation query"
              aria-label="Send message"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span className="hidden sm:inline">Ask AI</span>
                  <FiSend className="text-sm" />
                </>
              )}
            </button>
          </div>

          <p className="text-[11px] text-center text-gray-500">
            AgroAssist AI provides automated agronomic recommendations. Always cross-verify critical crop treatments with certified local agronomists.
          </p>
        </div>
      </footer>

      {/* Project Showcase & Architecture Modal */}
      <ProjectShowcaseModal
        isOpen={isShowcaseOpen}
        onClose={() => setIsShowcaseOpen(false)}
        onTriggerPrompt={(prompt) => handleSend(prompt)}
      />
    </div>
  );
}

export default ChatContainer;
