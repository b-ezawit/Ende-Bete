'use client';

import React, { useState } from 'react';
import { mockGuest } from '@/src/lib/mockData';
import { Mic, AlertCircle, Sun, Moon, Sunset, Lightbulb } from 'lucide-react';

type LightingMode = 'day' | 'night' | 'ambient';

interface LightingOption {
  mode: LightingMode;
  label: string;
  icon: React.ElementType;
  description: string;
}

const lightingOptions: LightingOption[] = [
  {
    mode: 'day',
    label: 'Day Mode',
    icon: Sun,
    description: 'Bright, energizing light',
  },
  {
    mode: 'night',
    label: 'Night Mode',
    icon: Moon,
    description: 'Dim, restful glow',
  },
  {
    mode: 'ambient',
    label: 'Ambient',
    icon: Sunset,
    description: 'Warm, relaxing tones',
  },
];

export default function ComfortTab() {
  const [temperature, setTemperature] = useState(
    mockGuest.preferences.roomTemperature
  );
  const [lighting, setLighting] = useState<LightingMode>('ambient');
  const [isListening, setIsListening] = useState(false);

  const handleVoiceInput = () => {
    setIsListening(true);
    // Web Speech API integration point
    // const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    // recognition.start();
    setTimeout(() => setIsListening(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-4 py-6 md:px-8 border-b border-border bg-white">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-2">
          Your Comfort
        </h1>
        <p className="text-muted-foreground">
          Personalize your room environment
        </p>
      </div>

      <div className="px-4 md:px-8 py-8 max-w-3xl mx-auto space-y-8">
        {/* VOICE INTERACTION - TOP PRIORITY */}
        <section className="space-y-4">
          <div className="text-center">
            <h2 className="font-serif text-xl font-bold text-primary mb-1">Voice Control</h2>
            <p className="text-sm text-muted-foreground">Speak naturally to adjust your room</p>
          </div>

          <button
            onClick={handleVoiceInput}
            className={`w-full rounded-3xl p-8 md:p-12 transition-all duration-300 ${
              isListening
                ? 'bg-gradient-to-br from-accent to-accent/80 shadow-2xl scale-[1.02]'
                : 'bg-gradient-to-br from-primary to-primary/80 hover:shadow-2xl hover:scale-[1.01]'
            }`}
          >
            <div className="flex flex-col items-center gap-6">
              {/* Large Microphone Button */}
              <div className="relative">
                <div
                  className={`w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isListening
                      ? 'bg-white/30 animate-pulse'
                      : 'bg-white/20 hover:bg-white/30'
                  }`}
                >
                  <Mic
                    className={`w-12 h-12 md:w-16 md:h-16 text-white transition-all ${
                      isListening ? 'animate-pulse scale-110' : ''
                    }`}
                  />
                </div>
                {/* Pulse rings when listening */}
                {isListening && (
                  <>
                    <div className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 bg-white/20 rounded-full animate-ping" />
                    <div className="absolute inset-[-20px] w-32 h-32 md:w-40 md:h-40 border-2 border-white/30 rounded-full animate-pulse" />
                  </>
                )}
              </div>

              {/* Text */}
              <div className="text-center">
                <h3 className="text-white font-serif text-2xl md:text-3xl font-bold mb-2">
                  {isListening ? 'Listening...' : 'Tell us what you need...'}
                </h3>
                <p className="text-white/80 text-sm md:text-base">
                  {isListening
                    ? 'Speak now - I am listening to you'
                    : 'Tap to speak with your room assistant'}
                </p>
              </div>

              {/* Example commands */}
              {!isListening && (
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {['"Make it warmer"', '"Dim the lights"', '"I need more pillows"'].map((cmd, i) => (
                    <span key={i} className="text-white/60 text-xs bg-white/10 px-3 py-1 rounded-full">
                      {cmd}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </button>
        </section>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Or use manual controls</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Temperature Control */}
        <div className="glass p-6 rounded-2xl shadow-warm">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="text-2xl">🌡️</span> Room Temperature
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Current Setting</span>
              <span className="text-3xl font-bold text-accent">{temperature}°C</span>
            </div>

            <input
              type="range"
              min="16"
              max="28"
              value={temperature}
              onChange={(e) => setTemperature(parseInt(e.target.value))}
              className="w-full h-3 bg-secondary/30 rounded-lg appearance-none cursor-pointer accent-accent"
            />

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Cool (16°C)</span>
              <span>Comfortable (22°C)</span>
              <span>Warm (28°C)</span>
            </div>

            <p className="text-xs text-muted-foreground pt-2 bg-muted/30 p-3 rounded-lg">
              Your preferred temperature is {mockGuest.preferences.roomTemperature}°C based on your profile.
            </p>
          </div>
        </div>

        {/* Lighting Control */}
        <div className="glass p-6 rounded-2xl shadow-warm">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-accent" /> Light Mode
          </h3>

          <div className="grid grid-cols-3 gap-4">
            {lightingOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.mode}
                  onClick={() => setLighting(option.mode)}
                  className={`p-5 rounded-2xl transition-all duration-300 text-center ${
                    lighting === option.mode
                      ? 'bg-accent/20 border-2 border-accent shadow-warm scale-105'
                      : 'bg-muted/30 border-2 border-transparent hover:bg-muted/50'
                  }`}
                >
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    lighting === option.mode ? 'bg-accent/30' : 'bg-muted'
                  }`}>
                    <IconComponent className={`w-6 h-6 ${
                      lighting === option.mode ? 'text-accent' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div className="font-semibold text-sm text-foreground">
                    {option.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {option.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Requests */}
        <div className="glass p-6 rounded-2xl shadow-warm">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Quick Requests
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '🛏️', label: 'Extra pillows', action: 'pillow-request' },
              { icon: '🧴', label: 'More towels', action: 'towel-request' },
              { icon: '🔇', label: 'Quieter room', action: 'quiet-request' },
              { icon: '❄️', label: 'Extra blankets', action: 'blanket-request' },
            ].map((item) => (
              <button
                key={item.action}
                className="flex items-center gap-3 p-4 rounded-xl bg-white hover:bg-accent/10 transition-all border border-border hover:border-accent/30 shadow-sm hover:shadow-warm"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium text-sm text-foreground">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Problem Report */}
        <button className="w-full glass p-5 rounded-2xl border-2 border-destructive/30 hover:bg-destructive/5 transition-all shadow-warm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-destructive" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-foreground">
                Something doesn&apos;t feel right?
              </div>
              <p className="text-sm text-muted-foreground">
                Tell us and we&apos;ll fix it immediately
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
