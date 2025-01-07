'use client';

import { useState, useEffect, useRef } from 'react';

const noMessages = [
  "You clicked the wrong button 😤",
  "You are testing my patience 😠",
  "One more time and I will cry 😢"
];

const flirtingLines = [
  "Your smile must be a WiFi signal, because I'm feeling a connection 💫",
  "Are you a magician? Because whenever I look at you, everyone else disappears ✨",
  "Is your name Google? Because you've got everything I've been searching for 🔍",
  "Are you a camera? Because every time I look at you, I smile 📸",
  "Do you like coffee? Because I like you a latte ☕",
  "Are you made of copper and tellurium? Because you're Cu-Te 🧪",
  "If you were a vegetable, you'd be a cute-cumber 🥒",
  "Do you have a map? I keep getting lost in your eyes 🗺️",
];

export default function Home() {
  const [step, setStep] = useState(1);
  const [noAttempts, setNoAttempts] = useState(0);
  const [dateSet, setDateSet] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('/falling-official-music-video.mp3');
    audioRef.current.loop = true;

    // Function to start playing
    const startPlaying = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.log('Autoplay prevented:', error);
        });
      }
    };

    // Add click event listener to start playing
    document.addEventListener('click', startPlaying, { once: true });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      document.removeEventListener('click', startPlaying);
    };
  }, []);

  const handleNo = () => {
    alert(noMessages[noAttempts]);
    setNoAttempts(prev => prev + 1);
  };

  const showNextLine = () => {
    setCurrentLine((prev) => (prev + 1) % flirtingLines.length);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center animate-fade-in">
            <button 
              onClick={() => setStep(2)}
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-8 rounded-full transform transition hover:scale-105"
            >
              Start ✨
            </button>
          </div>
        );
      case 2:
        return (
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-3xl font-bold mb-6">Hey Jhanvi 👋</h1>
            <button 
              onClick={() => setStep(3)}
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full"
            >
              Click here to know a secret 🤫
            </button>
          </div>
        );
      case 3:
        return (
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Will u tell anyone? 🤔</h2>
            <button 
              onClick={() => setStep(4)}
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full"
            >
              No I won&apos;t
            </button>
          </div>
        );
      case 4:
        return (
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Promise? 🤨</h2>
            <button 
              onClick={() => setStep(5)}
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full"
            >
              Promise!
            </button>
          </div>
        );
      case 5:
        return (
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Okay I trust u 🤗</h2>
            <button 
              onClick={() => setStep(6)}
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full"
            >
              Click here to reveal a secret 🔐
            </button>
          </div>
        );
      case 6:
        return (
          <div className="text-center space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold">Secret? 👀</h2>
            <p className="text-xl">I know the perfect spot for coffee ☕ Wanna join?</p>
            <div className="space-x-4">
              <button 
                onClick={() => setStep(7)}
                className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full"
              >
                Yes, of course! 😊
              </button>
              {noAttempts < 3 && (
                <button 
                  onClick={handleNo}
                  className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full"
                >
                  No
                </button>
              )}
            </div>
          </div>
        );
      case 7:
        return dateSet ? (
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">It&apos;s a Date! 🥰</h2>
            <p className="text-gray-600 mb-4">{flirtingLines[currentLine]}</p>
            <button 
              onClick={showNextLine}
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full"
            >
              Show me more 💝
            </button>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold text-center mb-4">Select Date ☕</h2>
            <input 
              type="datetime-local" 
              className="w-full p-2 rounded-lg border"
            />
            <textarea 
              placeholder="Leave a message..."
              className="w-full p-2 rounded-lg border"
              rows={3}
            />
            <button 
              onClick={() => setDateSet(true)}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full"
            >
              Confirm 💖
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-pink-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        {renderStep()}
      </div>
    </main>
  );
}