import React, { useContext, useEffect, useRef } from "react";
import { FiSend, FiMic, FiMicOff, FiImage, FiX, FiMenu } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { ContextApp } from "../utils/Context";
import Chat from "./Chat";

function ChatContainer() {
  const {
    chatValue,
    setChatValue,
    handleSend,
    handleKeyPress,
    loading,
    setMobile,
    selectedImage,
    setSelectedImage,
    previewImage,
    setPreviewImage,
  } = useContext(ContextApp);

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

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
    <div className="flex-1 flex flex-col h-screen bg-gray-950 text-gray-100 relative overflow-hidden">
      {/* Top Header */}
      <header className="h-14 border-b border-gray-800 flex items-center justify-between px-4 lg:px-8 bg-gray-900/60 backdrop-blur z-20">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="lg:hidden p-2 rounded-md hover:bg-gray-800 text-gray-300 transition-colors"
            onClick={() => setMobile(true)}
            aria-label="Open sidebar menu"
          >
            <FiMenu className="text-xl" />
          </button>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="font-semibold text-sm lg:text-base tracking-wide text-white flex items-center gap-2">
              AgroAssist
              <span className="text-[11px] font-normal uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                AI Agronomist
              </span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400">
          <HiOutlineSparkles className="text-emerald-400" />
          <span className="hidden sm:inline">Powered by Gemini 2.5 Flash</span>
        </div>
      </header>

      {/* Chat Messages Section */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <Chat />
      </main>

      {/* Input Tray Section */}
      <footer className="w-full bg-gradient-to-t from-gray-950 via-gray-950/95 to-transparent pt-2 pb-4 px-3 sm:px-6 lg:px-12 z-20">
        <div className="max-w-4xl mx-auto flex flex-col gap-2">
          {/* Image Attachment Preview */}
          {previewImage && (
            <div className="relative inline-flex items-center gap-2 p-1.5 bg-gray-900 border border-gray-700 rounded-lg w-fit shadow-md">
              <img
                src={previewImage}
                alt="Selected crop or leaf"
                className="w-14 h-14 object-cover rounded"
              />
              <div className="text-xs text-gray-300 pr-2">
                <p className="font-medium truncate max-w-[180px]">
                  {selectedImage?.name || "Attached Crop Image"}
                </p>
                <p className="text-gray-500 text-[11px]">Ready for diagnosis</p>
              </div>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="p-1 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                title="Remove image"
              >
                <FiX className="text-sm" />
              </button>
            </div>
          )}

          {/* Interactive Chat Input Bar */}
          <div className="relative flex items-center gap-2 bg-gray-900/90 border border-gray-700/80 rounded-2xl p-2 focus-within:border-emerald-500/80 focus-within:ring-1 focus-within:ring-emerald-500/50 transition-all shadow-xl">
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
              className="p-2.5 rounded-xl hover:bg-gray-800 text-gray-400 hover:text-emerald-400 transition-colors"
              title="Upload crop leaf / pest image"
              aria-label="Upload crop image"
            >
              <FiImage className="text-lg" />
            </button>

            {/* Microphone Button */}
            <button
              type="button"
              onClick={handleMicToggle}
              className={`p-2.5 rounded-xl transition-colors ${
                listening
                  ? "bg-red-500/20 text-red-400 animate-pulse"
                  : "hover:bg-gray-800 text-gray-400 hover:text-emerald-400"
              }`}
              title={listening ? "Listening... Click to stop" : "Speak your query"}
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
                  ? "Listening to speech..."
                  : "Ask about crops, soil health, pest control, or upload plant photo..."
              }
              className="flex-1 bg-transparent border-0 outline-none text-sm text-gray-100 placeholder-gray-500 px-2 py-1"
              disabled={loading}
            />

            {/* Send Button */}
            <button
              type="button"
              onClick={onSubmit}
              disabled={loading || (!chatValue.trim() && !selectedImage)}
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-800 disabled:text-gray-600 text-white font-medium transition-all shadow-md flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
              title="Send prompt"
              aria-label="Send message"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <FiSend className="text-base" />
              )}
            </button>
          </div>

          <p className="text-[11px] text-center text-gray-500">
            AgroAssist AI provides automated agronomic recommendations. Always cross-verify critical crop treatments with certified local agronomists.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default ChatContainer;
