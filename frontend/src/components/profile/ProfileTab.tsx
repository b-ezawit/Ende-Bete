'use client';

import React, { useState } from 'react';
import { 
  User, 
  Heart, 
  Utensils, 
  Mountain, 
  Music, 
  Book, 
  Users, 
  Sparkles,
  Edit3,
  Check,
  ChevronRight
} from 'lucide-react';
import { mockGuest } from '@/src/lib/mockData';
import { Button } from '@/components/ui/button';

interface ProfileSection {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
}

const sections: ProfileSection[] = [
  { id: 'basic', title: 'Basic Information', icon: User, description: 'Your personal details' },
  { id: 'food', title: 'Food Preferences', icon: Utensils, description: 'What you love to eat' },
  { id: 'activities', title: 'Activities', icon: Mountain, description: 'Things you enjoy doing' },
  { id: 'hobbies', title: 'Hobbies & Interests', icon: Music, description: 'Your passions' },
  { id: 'personality', title: 'Personality', icon: Heart, description: 'What makes you unique' },
  { id: 'travel', title: 'Travel Context', icon: Users, description: 'How you travel' },
];

const foodPreferences = [
  { id: 'spicy', label: 'Spicy Food', selected: true },
  { id: 'traditional', label: 'Traditional Ethiopian', selected: true },
  { id: 'vegetarian', label: 'Vegetarian Options', selected: false },
  { id: 'sharing', label: 'Family-Style Sharing', selected: true },
  { id: 'coffee', label: 'Coffee Lover', selected: true },
  { id: 'sweets', label: 'Sweets & Desserts', selected: false },
];

const activities = [
  { id: 'cultural', label: 'Cultural Experiences', selected: true },
  { id: 'spa', label: 'Spa & Wellness', selected: true },
  { id: 'hiking', label: 'Hiking & Nature', selected: false },
  { id: 'cooking', label: 'Cooking Classes', selected: true },
  { id: 'music', label: 'Live Music', selected: true },
  { id: 'art', label: 'Art & Crafts', selected: false },
];

const hobbies = [
  { id: 'reading', label: 'Reading', icon: Book },
  { id: 'music', label: 'Music', icon: Music },
  { id: 'nature', label: 'Nature', icon: Mountain },
  { id: 'food', label: 'Food & Cooking', icon: Utensils },
];

const personalityTraits = [
  { id: 'adventurous', label: 'Adventurous', description: 'Loves trying new things' },
  { id: 'social', label: 'Social', description: 'Enjoys group activities' },
  { id: 'relaxed', label: 'Relaxed', description: 'Prefers calm environments' },
  { id: 'curious', label: 'Curious', description: 'Interested in learning' },
];

const travelContexts = [
  { id: 'solo', label: 'Solo Traveler', icon: '🧘' },
  { id: 'couple', label: 'With Partner', icon: '💑' },
  { id: 'family', label: 'With Family', icon: '👨‍👩‍👧‍👦' },
  { id: 'friends', label: 'With Friends', icon: '👯' },
  { id: 'business', label: 'Business Trip', icon: '💼' },
];

export default function ProfileTab() {
  const [selectedFood, setSelectedFood] = useState<string[]>(
    foodPreferences.filter(f => f.selected).map(f => f.id)
  );
  const [selectedActivities, setSelectedActivities] = useState<string[]>(
    activities.filter(a => a.selected).map(a => a.id)
  );
  const [selectedPersonality, setSelectedPersonality] = useState<string[]>(['adventurous', 'curious']);
  const [selectedTravelContext, setSelectedTravelContext] = useState<string>('family');
  const [isEditing, setIsEditing] = useState<string | null>(null);

  const toggleSelection = (id: string, current: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-4 py-6 md:px-8 border-b border-border bg-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-3xl">
            {mockGuest.avatar}
          </div>
          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">
              {mockGuest.name}&apos;s Profile
            </h1>
            <p className="text-muted-foreground text-sm">
              Your story helps us personalize your experience
            </p>
          </div>
        </div>
      </div>

      {/* AI Personalization Note */}
      <div className="px-4 md:px-8 py-6">
        <div className="bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 rounded-2xl p-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Your preferences power personalization</h3>
              <p className="text-muted-foreground text-sm">
                The more we know about you, the better Emama can recommend experiences, 
                food, and activities that feel like they were made just for you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Sections */}
      <div className="px-4 md:px-8 pb-20 space-y-6">
        {/* Basic Information Card */}
        <div className="bg-white rounded-2xl shadow-warm-md overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">Basic Information</h2>
                  <p className="text-xs text-muted-foreground">Your personal details</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-accent">
                <Edit3 className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
          </div>
          <div className="p-6 grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs text-muted-foreground">Name</label>
              <p className="font-medium text-foreground">{mockGuest.name}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Email</label>
              <p className="font-medium text-foreground">{mockGuest.email}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Phone</label>
              <p className="font-medium text-foreground">{mockGuest.phone}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Previous Visits</label>
              <p className="font-medium text-foreground">{mockGuest.familyProfile?.previousVisits || 0} visits</p>
            </div>
          </div>
        </div>

        {/* Food Preferences Card */}
        <div className="bg-white rounded-2xl shadow-warm-md overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <Utensils className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">Food Preferences</h2>
                  <p className="text-xs text-muted-foreground">What you love to eat</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-3">
              {foodPreferences.map((pref) => (
                <button
                  key={pref.id}
                  onClick={() => toggleSelection(pref.id, selectedFood, setSelectedFood)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedFood.includes(pref.id)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/50 text-foreground hover:bg-muted border border-border'
                  }`}
                >
                  {selectedFood.includes(pref.id) && <Check className="w-4 h-4 inline mr-1" />}
                  {pref.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Activities Card */}
        <div className="bg-white rounded-2xl shadow-warm-md overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Mountain className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">Activities</h2>
                  <p className="text-xs text-muted-foreground">Things you enjoy doing</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-3">
              {activities.map((activity) => (
                <button
                  key={activity.id}
                  onClick={() => toggleSelection(activity.id, selectedActivities, setSelectedActivities)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedActivities.includes(activity.id)
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-muted/50 text-foreground hover:bg-muted border border-border'
                  }`}
                >
                  {selectedActivities.includes(activity.id) && <Check className="w-4 h-4 inline mr-1" />}
                  {activity.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Personality Card */}
        <div className="bg-white rounded-2xl shadow-warm-md overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Heart className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">Personality Type</h2>
                  <p className="text-xs text-muted-foreground">What makes you unique</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid gap-3 md:grid-cols-2">
              {personalityTraits.map((trait) => (
                <button
                  key={trait.id}
                  onClick={() => toggleSelection(trait.id, selectedPersonality, setSelectedPersonality)}
                  className={`p-4 rounded-xl text-left transition-all ${
                    selectedPersonality.includes(trait.id)
                      ? 'bg-accent/20 border-2 border-accent'
                      : 'bg-muted/30 border-2 border-transparent hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{trait.label}</span>
                    {selectedPersonality.includes(trait.id) && (
                      <Check className="w-5 h-5 text-accent" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{trait.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Travel Context Card */}
        <div className="bg-white rounded-2xl shadow-warm-md overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">Travel Context</h2>
                  <p className="text-xs text-muted-foreground">How are you traveling this time?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {travelContexts.map((context) => (
                <button
                  key={context.id}
                  onClick={() => setSelectedTravelContext(context.id)}
                  className={`p-4 rounded-xl text-center transition-all ${
                    selectedTravelContext === context.id
                      ? 'bg-primary text-primary-foreground shadow-warm'
                      : 'bg-muted/30 text-foreground hover:bg-muted/50'
                  }`}
                >
                  <span className="text-2xl mb-2 block">{context.icon}</span>
                  <span className="text-xs font-medium">{context.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Special Moments Card */}
        <div className="bg-white rounded-2xl shadow-warm-md overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">Your Special Moments</h2>
                  <p className="text-xs text-muted-foreground">Memories from previous visits</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {mockGuest.familyProfile?.specialMoments?.map((moment, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg border border-accent/20"
                >
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-sm text-foreground">{moment}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="pt-4">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-semibold rounded-xl">
            Save Profile Changes
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
