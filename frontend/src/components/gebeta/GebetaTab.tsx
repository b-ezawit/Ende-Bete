'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, Sparkles, ChefHat, Flame, Leaf, Star, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FoodItem {
  id: string;
  name: string;
  description: string;
  emotionalDescription: string;
  image: string;
  tags: string[];
  spiceLevel: number;
  aiReason: string;
  rating: number;
}

const foodRecommendations: FoodItem[] = [
  {
    id: '1',
    name: 'Doro Wat',
    description: 'A rich, spicy chicken stew slow-cooked in berbere spices, served with traditional injera.',
    emotionalDescription: 'A dish that speaks of warmth, tradition, and the love of an Ethiopian kitchen. Every bite tells a story.',
    image: '/dining-hall.jpg',
    tags: ['Traditional', 'Spicy', 'Comfort'],
    spiceLevel: 4,
    aiReason: 'Your love for bold, spicy flavors makes this a perfect match',
    rating: 4.9,
  },
  {
    id: '2',
    name: 'Kitfo',
    description: 'Premium minced beef seasoned with mitmita and niter kibbeh, served warm with ayib cheese.',
    emotionalDescription: 'A delicacy for the adventurous soul, honoring centuries of Ethiopian culinary tradition.',
    image: '/buna-ceremony.jpg',
    tags: ['Authentic', 'Premium', 'Bold'],
    spiceLevel: 3,
    aiReason: 'Based on your preference for premium, authentic dishes',
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Shiro',
    description: 'Creamy chickpea stew infused with aromatic spices, a vegetarian comfort food that warms the soul.',
    emotionalDescription: 'Gentle on the palate, rich in tradition. A hug in a bowl for your peaceful moments.',
    image: '/kuriftu-resort.jpg',
    tags: ['Vegetarian', 'Comfort', 'Mild'],
    spiceLevel: 2,
    aiReason: 'Perfect for your lighter meal preferences',
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Tibs',
    description: 'Sauteed cubes of tender beef with fresh tomatoes, jalapenos, and onions. Sizzling hot and bursting with flavor.',
    emotionalDescription: 'The sizzle and aroma that fills the room, bringing joy to every gathering.',
    image: '/ethiopian-landscape.jpg',
    tags: ['Sizzling', 'Fresh', 'Hearty'],
    spiceLevel: 3,
    aiReason: 'You enjoyed similar dishes during your last visit',
    rating: 4.6,
  },
  {
    id: '5',
    name: 'Beyaynetu',
    description: 'A colorful platter of various vegetarian dishes on injera, perfect for sharing.',
    emotionalDescription: 'Experience the full spectrum of Ethiopian flavors in one beautiful, communal presentation.',
    image: '/culture-hero.jpg',
    tags: ['Sharing', 'Variety', 'Colorful'],
    spiceLevel: 2,
    aiReason: 'Great for family sharing, which you love',
    rating: 4.9,
  },
  {
    id: '6',
    name: 'Awaze Tibs',
    description: 'Extra spicy beef tibs marinated in awaze sauce, for those who truly love heat.',
    emotionalDescription: 'A fiery celebration of Ethiopian spice traditions, crafted for the bold.',
    image: '/pool-garden.jpg',
    tags: ['Extra Spicy', 'Bold', 'Traditional'],
    spiceLevel: 5,
    aiReason: 'For your adventurous spice-loving spirit',
    rating: 4.8,
  },
];

const SpiceIndicator = ({ level }: { level: number }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((i) => (
      <Flame
        key={i}
        className={`w-3 h-3 ${i <= level ? 'text-red-500 fill-red-500' : 'text-muted'}`}
      />
    ))}
  </div>
);

export default function GebetaTab() {
  const [favorites, setFavorites] = useState<string[]>(['1']);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const categories = [
    { id: 'spicy', label: 'Spicy', icon: Flame },
    { id: 'vegetarian', label: 'Vegetarian', icon: Leaf },
    { id: 'comfort', label: 'Comfort', icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src="/dining-hall.jpg"
          alt="Ethiopian cuisine"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex items-center gap-2 mb-2">
            <ChefHat className="w-6 h-6 text-accent" />
            <span className="text-accent text-sm font-medium">Gebeta</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
            What You Would Love
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl">
            Your personal chef understands you. Discover dishes curated for your unique taste.
          </p>
        </div>
      </div>

      {/* AI Welcome Message */}
      <div className="px-4 md:px-8 -mt-6 relative z-10">
        <div className="bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 rounded-2xl p-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Emama knows your taste</h3>
              <p className="text-muted-foreground text-sm">
                Based on your profile, I&apos;ve selected dishes that match your love for{' '}
                <span className="text-accent font-medium">spicy food</span>,{' '}
                <span className="text-accent font-medium">traditional cuisine</span>, and{' '}
                <span className="text-accent font-medium">family sharing</span>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="px-4 md:px-8 py-6">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(isActive ? null : cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-white text-foreground hover:bg-muted border border-border'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Recommendation */}
      <div className="px-4 md:px-8 mb-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle cx="150" cy="100" r="80" fill="currentColor" />
              <circle cx="180" cy="50" r="40" fill="currentColor" />
            </svg>
          </div>
          <div className="relative p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <span className="inline-flex items-center gap-1 bg-white/20 text-xs px-3 py-1 rounded-full mb-4">
                  <Star className="w-3 h-3 fill-current" />
                  Chef&apos;s Pick for You
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3">
                  {foodRecommendations[0].name}
                </h2>
                <p className="text-primary-foreground/90 text-sm mb-3 leading-relaxed italic">
                  &quot;{foodRecommendations[0].emotionalDescription}&quot;
                </p>
                <p className="text-primary-foreground/80 text-sm mb-4 leading-relaxed">
                  {foodRecommendations[0].description}
                </p>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm opacity-80">Spice Level:</span>
                    <SpiceIndicator level={foodRecommendations[0].spiceLevel} />
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg p-3 mb-4">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="text-xs">{foodRecommendations[0].aiReason}</span>
                </div>
                <Button className="bg-white text-primary hover:bg-white/90">
                  Learn More
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="w-full md:w-64 h-48 md:h-auto rounded-2xl overflow-hidden shadow-2xl relative">
                <Image
                  src={foodRecommendations[0].image}
                  alt={foodRecommendations[0].name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Food Grid */}
      <div className="px-4 md:px-8 pb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-xl font-bold text-primary">More For You</h2>
          <Button variant="ghost" className="text-accent text-sm">
            See all
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {foodRecommendations.slice(1).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-warm-md hover:shadow-warm transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  aria-label={favorites.includes(item.id) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(item.id)
                        ? 'text-red-500 fill-red-500'
                        : 'text-foreground'
                    }`}
                  />
                </button>

                {/* Tags */}
                <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                  {item.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="bg-white/90 backdrop-blur-sm text-foreground text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span className="font-medium text-foreground">{item.rating}</span>
                  </div>
                </div>

                {/* Emotional Description */}
                <p className="text-muted-foreground text-sm italic mb-3 line-clamp-2">
                  &quot;{item.emotionalDescription}&quot;
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Spice:</span>
                    <SpiceIndicator level={item.spiceLevel} />
                  </div>
                </div>

                {/* AI Reason */}
                <div className="flex items-start gap-2 bg-accent/10 rounded-lg p-3">
                  <Sparkles className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-accent font-medium">{item.aiReason}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Taste Profile Summary */}
      <div className="px-4 md:px-8 pb-20">
        <div className="bg-white rounded-2xl p-6 shadow-warm-md">
          <h3 className="font-serif text-lg font-bold text-primary mb-4">Your Taste Profile</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Flame className="w-8 h-8 text-red-500" />
              </div>
              <span className="text-sm font-medium text-foreground">Spice Lover</span>
              <div className="text-xs text-muted-foreground">Level 4/5</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">🍖</span>
              </div>
              <span className="text-sm font-medium text-foreground">Meat Dishes</span>
              <div className="text-xs text-muted-foreground">Preferred</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">👨‍👩‍👧‍👦</span>
              </div>
              <span className="text-sm font-medium text-foreground">Family Sharing</span>
              <div className="text-xs text-muted-foreground">Often</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">🌍</span>
              </div>
              <span className="text-sm font-medium text-foreground">Traditional</span>
              <div className="text-xs text-muted-foreground">Authentic</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
