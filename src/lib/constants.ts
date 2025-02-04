export const PROJECT_ID = 'bartle-quiz-frame';
export const PROJECT_TITLE = "Bartle's Gamer Archetype Quiz";
export const PROJECT_DESCRIPTION = "Discover your gaming personality type based on Bartle's taxonomy";

export const QUESTIONS = [
  {
    text: "When joining a new game, your first priority is to:",
    options: [
      { text: "Unlock achievements and level up", archetype: "achiever" },
      { text: "Explore every corner of the map", archetype: "explorer" },
      { text: "Team up with other players", archetype: "socializer" },
      { text: "Dominate the leaderboards", archetype: "killer" },
    ]
  },
  {
    text: "Your ideal gaming session involves:",
    options: [
      { text: "Completing challenging objectives", archetype: "achiever" },
      { text: "Discovering hidden secrets", archetype: "explorer" },
      { text: "Chatting with guildmates", archetype: "socializer" },
      { text: "PVP battles against others", archetype: "killer" },
    ]
  },
  {
    text: "You feel most satisfied when:",
    options: [
      { text: "Earning rare trophies", archetype: "achiever" },
      { text: "Mastering game mechanics", archetype: "explorer" },
      { text: "Making new friends", archetype: "socializer" },
      { text: "Beating competitors", archetype: "killer" },
    ]
  }
] as const;

export const ARCHETYPES = {
  achiever: {
    title: "The Achiever",
    emoji: "🏆",
    description: "You thrive on completing goals and earning rewards. Collections and achievements drive your gameplay!"
  },
  explorer: {
    title: "The Explorer",
    emoji: "🗺️",
    description: "You're driven by discovery! Mapping every area and uncovering secrets is your true passion."
  },
  socializer: {
    title: "The Socializer",
    emoji: "💬",
    description: "For you, games are about relationships. You love collaborating and building communities!"
  },
  killer: {
    title: "The Killer",
    emoji: "⚔️",
    description: "Competition fuels you. Dominating opponents and climbing ranks is what gets your adrenaline pumping!"
  }
} as const;
