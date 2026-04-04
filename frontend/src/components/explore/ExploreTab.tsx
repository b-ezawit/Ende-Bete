'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, Navigation, Star, ChevronRight, Sparkles, X, Clock, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Location {
  id: string;
  name: string;
  type: 'cultural' | 'restaurant' | 'spa' | 'activity' | 'nature';
  description: string;
  image: string;
  rating: number;
  distance: string;
  openHours: string;
  phone?: string;
  coordinates: { x: number; y: number };
  aiReason?: string;
}

const locations: Location[] = [
  {
    id: '1',
    name: 'Traditional Coffee Ceremony',
    type: 'cultural',
    description: 'Experience the ancient Ethiopian coffee ritual with freshly roasted beans and traditional music.',
    image: '/buna-ceremony.jpg',
    rating: 4.9,
    distance: '2 min walk',
    openHours: '9:00 AM - 6:00 PM',
    phone: '+251 11 234 5678',
    coordinates: { x: 25, y: 30 },
    aiReason: 'Based on your love for cultural experiences',
  },
  {
    id: '2',
    name: 'Lakeside Spa Retreat',
    type: 'spa',
    description: 'Rejuvenate with traditional Ethiopian honey treatments overlooking the serene lake.',
    image: '/spa-wellness.jpg',
    rating: 4.8,
    distance: '5 min walk',
    openHours: '8:00 AM - 8:00 PM',
    phone: '+251 11 234 5679',
    coordinates: { x: 65, y: 45 },
    aiReason: 'You mentioned wanting relaxation today',
  },
  {
    id: '3',
    name: 'Injera House Restaurant',
    type: 'restaurant',
    description: 'Authentic Ethiopian cuisine featuring fresh injera and spicy doro wat.',
    image: '/dining-hall.jpg',
    rating: 4.7,
    distance: '3 min walk',
    openHours: '11:00 AM - 10:00 PM',
    phone: '+251 11 234 5680',
    coordinates: { x: 45, y: 60 },
    aiReason: 'Perfect for your preference for spicy food',
  },
  {
    id: '4',
    name: 'Sunset Viewpoint',
    type: 'nature',
    description: 'The most breathtaking sunset views over the Ethiopian highlands.',
    image: '/ethiopian-landscape.jpg',
    rating: 5.0,
    distance: '10 min walk',
    openHours: 'Always open',
    coordinates: { x: 80, y: 25 },
    aiReason: 'Ideal for your evening plans',
  },
  {
    id: '5',
    name: 'Artisan Craft Village',
    type: 'activity',
    description: 'Watch local artisans create traditional Ethiopian crafts and take home a unique souvenir.',
    image: '/culture-hero.jpg',
    rating: 4.6,
    distance: '7 min walk',
    openHours: '10:00 AM - 5:00 PM',
    phone: '+251 11 234 5681',
    coordinates: { x: 35, y: 75 },
    aiReason: 'Great for family activities you enjoy',
  },
];

const typeColors: Record<string, { bg: string; text: string; icon: string }> = {
  cultural: { bg: 'bg-amber-500', text: 'text-amber-600', icon: '🏛️' },
  restaurant: { bg: 'bg-red-500', text: 'text-red-600', icon: '🍽️' },
  spa: { bg: 'bg-teal-500', text: 'text-teal-600', icon: '💆' },
  activity: { bg: 'bg-blue-500', text: 'text-blue-600', icon: '🎨' },
  nature: { bg: 'bg-green-500', text: 'text-green-600', icon: '🌿' },
};

export default function ExploreTab() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showAiSuggestion, setShowAiSuggestion] = useState(true);
  const [highlightedRoute, setHighlightedRoute] = useState<string | null>(null);

  const handleExploreNearby = () => {
    setHighlightedRoute('cultural');
    setShowAiSuggestion(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-4 py-6 md:px-8 border-b border-border bg-white">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-2">
          Explore & Discover
        </h1>
        <p className="text-muted-foreground">
          Your AI guide to the best experiences around you
        </p>
      </div>

      {/* Interactive Map Section */}
      <div className="relative">
        {/* Map Container */}
        <div className="relative w-full h-[50vh] md:h-[60vh] bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 overflow-hidden">
          {/* Map Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8A9A5B" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Decorative Elements - Roads */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d="M 0,50 Q 25,45 50,55 T 100,50"
              fill="none"
              stroke="#D4D0C8"
              strokeWidth="2"
              strokeDasharray="4,2"
            />
            <path
              d="M 50,0 Q 45,25 55,50 T 50,100"
              fill="none"
              stroke="#D4D0C8"
              strokeWidth="2"
              strokeDasharray="4,2"
            />
            {highlightedRoute && (
              <path
                d="M 25,30 Q 35,40 45,60 T 35,75"
                fill="none"
                stroke="#D4A017"
                strokeWidth="3"
                className="animate-pulse"
              />
            )}
          </svg>

          {/* Lake Feature */}
          <div className="absolute top-[35%] right-[15%] w-24 h-16 md:w-32 md:h-20 bg-blue-300/50 rounded-full blur-sm" />
          <div className="absolute top-[37%] right-[17%] w-20 h-12 md:w-28 md:h-16 bg-blue-400/40 rounded-full" />

          {/* Resort Center Marker */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
                <span className="text-2xl md:text-3xl">🏨</span>
              </div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full whitespace-nowrap font-medium">
                You are here
              </div>
              {/* Pulse Animation */}
              <div className="absolute inset-0 w-16 h-16 md:w-20 md:h-20 bg-primary/30 rounded-full animate-ping" />
            </div>
          </div>

          {/* Location Pins */}
          {locations.map((location) => (
            <button
              key={location.id}
              onClick={() => setSelectedLocation(location)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-300 hover:scale-125 ${
                selectedLocation?.id === location.id ? 'scale-125 z-30' : ''
              } ${highlightedRoute === location.type ? 'animate-bounce' : ''}`}
              style={{ left: `${location.coordinates.x}%`, top: `${location.coordinates.y}%` }}
              aria-label={`View ${location.name}`}
            >
              <div className="relative">
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 ${typeColors[location.type].bg} rounded-full flex items-center justify-center shadow-lg border-2 border-white`}
                >
                  <span className="text-lg md:text-xl">{typeColors[location.type].icon}</span>
                </div>
                {selectedLocation?.id === location.id && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-white" />
                )}
              </div>
            </button>
          ))}

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
            <div className="text-xs font-semibold text-primary mb-2">Legend</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.entries(typeColors).map(([type, colors]) => (
                <div key={type} className="flex items-center gap-1">
                  <div className={`w-3 h-3 ${colors.bg} rounded-full`} />
                  <span className="capitalize text-foreground">{type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Compass */}
          <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
            <Navigation className="w-6 h-6 text-primary" />
          </div>
        </div>

        {/* Location Detail Popup */}
        {selectedLocation && (
          <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden z-40 animate-in slide-in-from-bottom-4">
            <button
              onClick={() => setSelectedLocation(null)}
              className="absolute top-3 right-3 w-8 h-8 bg-black/10 rounded-full flex items-center justify-center hover:bg-black/20 transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-foreground" />
            </button>

            <div className="relative h-40">
              <Image
                src={selectedLocation.image}
                alt={selectedLocation.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{typeColors[selectedLocation.type].icon}</span>
                  <span className="text-white/80 text-xs uppercase tracking-wide">
                    {selectedLocation.type}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-lg">{selectedLocation.name}</h3>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <p className="text-foreground text-sm leading-relaxed">
                {selectedLocation.description}
              </p>

              {selectedLocation.aiReason && (
                <div className="flex items-start gap-2 bg-accent/10 rounded-lg p-3">
                  <Sparkles className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-accent font-medium">
                    {selectedLocation.aiReason}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span className="font-semibold text-foreground">{selectedLocation.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedLocation.distance}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{selectedLocation.openHours}</span>
                </div>
                {selectedLocation.phone && (
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    <span>{selectedLocation.phone}</span>
                  </div>
                )}
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Navigation className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* AI Suggestion Card */}
      {showAiSuggestion && (
        <div className="mx-4 md:mx-8 -mt-6 relative z-30">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-5 text-primary-foreground shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">Emama suggests</h3>
                <p className="text-primary-foreground/80 text-sm mb-4">
                  Would you like to explore nearby cultural spots? I noticed you enjoyed the coffee
                  ceremony yesterday.
                </p>
                <div className="flex gap-3">
                  <Button
                    onClick={handleExploreNearby}
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    Yes, show me
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setShowAiSuggestion(false)}
                    className="text-primary-foreground hover:bg-white/10"
                  >
                    Maybe later
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Suggestions For You Section */}
      <div className="px-4 md:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-xl font-bold text-primary">Suggestions For You</h2>
            <p className="text-sm text-muted-foreground">Personalized by your AI guide</p>
          </div>
          <Button variant="ghost" className="text-accent">
            View all
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {locations.slice(0, 3).map((location) => (
            <button
              key={location.id}
              onClick={() => setSelectedLocation(location)}
              className="bg-white rounded-xl overflow-hidden shadow-warm-md hover:shadow-warm transition-all duration-300 text-left group"
            >
              <div className="relative h-36">
                <Image
                  src={location.image}
                  alt={location.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className={`${typeColors[location.type].bg} text-white text-xs px-2 py-1 rounded-full`}
                  >
                    {typeColors[location.type].icon} {location.type}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {location.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {location.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span className="font-medium text-foreground">{location.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{location.distance}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Filter Pills */}
      <div className="px-4 md:px-8 pb-20">
        <h3 className="font-semibold text-foreground mb-4">Filter by type</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(typeColors).map(([type, colors]) => (
            <button
              key={type}
              onClick={() => setHighlightedRoute(highlightedRoute === type ? null : type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                highlightedRoute === type
                  ? `${colors.bg} text-white`
                  : 'bg-white text-foreground hover:bg-muted'
              }`}
            >
              {colors.icon} {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
