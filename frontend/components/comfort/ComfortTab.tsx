'use client';

import React, { useState } from 'react';
import { mockGuest } from '@/lib/mockData';
import { Mic, AlertCircle } from 'lucide-react';

type LightingMode = 'soft' | 'cozy' | 'bright' | 'natural';

interface LightingOption {
  mode: LightingMode;
  label: string;
  icon: string;
  description: string;
}

const lightingOptions: LightingOption[] = [
  {
    mode: 'soft',
    label: 'Soft',
    icon: '🌙',
    description: 'Gentle ambient light',
  },
  {
    mode: 'cozy',
    label: 'Cozy',
    icon: '🕯️',
    description: 'Warm and relaxing',
  },
  {
    mode: 'bright',
    label: 'Bright',
    icon: '💡',
    description: 'Full brightness',
  },
  {
    mode: 'natural',
    label: 'Natural',
    icon: '☀️',
    description: 'Daylight tone',
  },
];

export default function ComfortTab() {
  const [temperature, setTemperature] = useState(
    mockGuest.preferences.roomTemperature
  );
  const [lighting, setLighting] = useState<LightingMode>(
    mockGuest.preferences.lightingPreference
  );
  const [isListening, setIsListening] = useState(false);

  const handleVoiceInput = () => {
    setIsListening(true);
    // Web Speech API integration point
    // const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    // recognition.start();
    setTimeout(() => setIsListening(false), 3000);
  };

  return (
    <div className="w-full md:pr-24">
      <div className="px-4 md:px-6 py-6 max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
            Your Comfort
          </h1>
          <p className="text-muted-foreground">
            Personalize your room environment
          </p>
        </div>

        {/* Temperature Control */}
        <div className="glass p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            🌡️ Room Temperature
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Temperature</span>
              <span className="text-2xl font-bold text-accent">{temperature}°C</span>
            </div>

            <input
              type="range"
              min="16"
              max="28"
              value={temperature}
              onChange={(e) => setTemperature(parseInt(e.target.value))}
              className="w-full h-2 bg-secondary/30 rounded-lg appearance-none cursor-pointer accent-accent"
            />

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>16°C</span>
              <span>22°C</span>
              <span>28°C</span>
            </div>

            <p className="text-xs text-muted-foreground pt-2">
              Your preference is {mockGuest.preferences.roomTemperature}°C. Adjust
              as needed.
            </p>
          </div>
        </div>

        {/* Lighting Control */}
        <div className="glass p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            💡 Lighting Mood
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {lightingOptions.map((option) => (
              <button
                key={option.mode}
                onClick={() => setLighting(option.mode)}
                className={`p-4 rounded-xl transition-smooth text-center ${
                  lighting === option.mode
                    ? 'bg-accent/20 border-2 border-accent'
                    : 'bg-muted/30 border-2 border-transparent hover:bg-muted/50'
                }`}
              >
                <div className="text-3xl mb-2">{option.icon}</div>
                <div className="font-semibold text-sm text-foreground">
                  {option.label}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {option.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Quick Requests
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { icon: '🛏️', label: 'Extra pillows', action: 'pillow-request' },
              { icon: '🧴', label: 'More towels', action: 'towel-request' },
              {
                icon: '🔇',
                label: 'Quieter room',
                action: 'quiet-request',
              },
              {
                icon: '❄️',
                label: 'Extra blankets',
                action: 'blanket-request',
              },
            ].map((item) => (
              <button
                key={item.action}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-smooth border border-secondary/20"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium text-sm text-foreground">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Voice Input */}
        <button
          onClick={handleVoiceInput}
          className="w-full glass p-6 rounded-2xl hover:shadow-warm transition-smooth"
        >
          <div className="flex flex-col items-center gap-3">
            <div
              className={`p-4 rounded-full transition-smooth ${
                isListening
                  ? 'bg-accent/30 animate-pulse'
                  : 'bg-accent/10'
              }`}
            >
              <Mic
                className={`w-8 h-8 ${
                  isListening ? 'text-accent animate-pulse' : 'text-accent'
                }`}
              />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-foreground">
                Speak to your host
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {isListening
                  ? 'Listening...'
                  : 'Tap to start voice conversation'}
              </p>
            </div>
          </div>
        </button>

        {/* Problem Report */}
        <button className="w-full glass p-4 rounded-2xl border-2 border-destructive/30 hover:bg-destructive/5 transition-smooth">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-destructive" />
            <div className="text-left">
              <div className="font-semibold text-foreground text-sm">
                Something doesn&apos;t feel right?
              </div>
              <p className="text-xs text-muted-foreground">
                Tell us and we&apos;ll fix it immediately
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
