'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { mockGuest, mockProactiveOffers, mockRoomStatus } from '@/src/lib/mockData';
import QuickStats from './QuickStats';
import ProactiveCard from './ProactiveCard';
import MoodButtons from './MoodButtons';
import RoomProgressCard from './RoomProgressCard';
import HighlightsSection from './HighlightsSection';
import SuggestionsForYou from './SuggestionsForYou';
import ScrollableEvents from './ScrollableEvents';
import MemoryBox from './MemoryBox';
import EmamaChatWidget from './EmamaChatWidget';
import BackToTopButton from './BackToTopButton';

export default function HomeDashboard() {
  const [activeOffer, setActiveOffer] = useState<string | null>(null);
  const guest = mockGuest;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-80 md:h-96 overflow-hidden">
        <Image
          src="/pool-garden.jpg"
          alt="Welcome to Kuriftu"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white">
          <p className="text-sm md:text-base text-white/80 mb-2">Welcome back,</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-2">
            {guest.name}
          </h1>
          <p className="text-sm md:text-base text-white/80">
            Room {guest.roomNumber} • {guest.stayType}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 md:px-6 py-6 space-y-8 max-w-4xl mx-auto">
        {/* Quick Stats */}
        <QuickStats weather="28°C Sunny" sunsetTime="2 hours" />

        {/* Mood Buttons - "How can we help you?" */}
        <MoodButtons />

        {/* Room Preparation Progress */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Your Home is Being Prepared
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {mockRoomStatus.map((status, idx) => (
              <RoomProgressCard key={idx} status={status} />
            ))}
          </div>
        </section>

        {/* Proactive Offers */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            What We've Prepared For You
          </h2>
          <div className="space-y-3">
            {mockProactiveOffers.map((offer) => (
              <ProactiveCard
                key={offer.id}
                offer={offer}
                isActive={activeOffer === offer.id}
                onToggle={() =>
                  setActiveOffer(activeOffer === offer.id ? null : offer.id)
                }
              />
            ))}
          </div>
        </section>
      </main>

      {/* Full-width Sections */}
      <HighlightsSection />
      <SuggestionsForYou />
      <ScrollableEvents />
      <MemoryBox />

      {/* Floating Components */}
      <EmamaChatWidget />
      <BackToTopButton />
    </div>
  );
}
