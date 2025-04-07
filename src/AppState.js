/// AppState.js
import { reactive } from 'vue'

// Create the AppState
export const AppState = reactive({
  // Game Stats
  snowAmount: 0,
  snowPerClick: 1,
  snowPerSecond: 0,
  totalSnowEver: 0,
  totalClicks: 0,
  totalTimePlayed: 0, // in seconds
  generatorsPurchased: 0,
  upgradesPurchased: 0,

  // Critical hit stats
  criticalHitChance: 0.05,
  criticalHitMultiplier: 2,
  criticalHitsLanded: 0,

  // Game State
  gameStarted: false,
  lastSaved: null,
  firstTimePlayer: true,

  // Upgrades
  upgrades: [
    {
      id: 'better-gloves',
      name: 'Better Gloves',
      description: 'Click twice as effectively',
      cost: 50,
      maxLevel: 1,
      currentLevel: 0,
      category: 'click',
      icon: '🧤',
      effects: {
        snowPerClickMultiplier: 2
      },
      visible: true,
      unlocked: true
    },
    {
      id: 'snow-shovel',
      name: 'Snow Shovel',
      description: 'Click 5x more effectively',
      cost: 200,
      maxLevel: 1,
      currentLevel: 0,
      category: 'click',
      icon: '⛏️',
      effects: {
        snowPerClickMultiplier: 5
      },
      visible: true,
      unlocked: true
    },
    {
      id: 'heated-gloves',
      name: 'Heated Gloves',
      description: 'Adds +5 snow per click',
      cost: 500,
      maxLevel: 1,
      currentLevel: 0,
      category: 'click',
      icon: '🔥',
      effects: {
        snowPerClickAdd: 5
      },
      visible: false,
      unlocked: false
    },
    {
      id: 'snowmaker-efficiency',
      name: 'Efficient Snowmakers',
      description: 'Snowball Makers are 50% more effective',
      cost: 150,
      maxLevel: 1,
      currentLevel: 0,
      category: 'production',
      icon: '⚙️',
      effects: {
        specificGeneratorMultiplier: 1.5,
        generatorId: 'snowball-maker'
      },
      visible: false,
      unlocked: false
    },
    {
      id: 'cold-fusion',
      name: 'Cold Fusion',
      description: 'Unlocks Winter Storm generator',
      cost: 1000,
      maxLevel: 1,
      currentLevel: 0,
      category: 'production',
      icon: '❄️',
      effects: {
        unlockGenerator: 'winter-storm'
      },
      visible: true,
      unlocked: true
    },
    {
      id: 'click-training',
      name: 'Click Training',
      description: 'Increase click power by 25%',
      cost: 100,
      maxLevel: 5,
      currentLevel: 0,
      costMultiplier: 2,
      category: 'click',
      icon: '💪',
      effects: {
        snowPerClickMultiplier: 1.25
      },
      visible: true,
      unlocked: true
    },
    {
      id: 'critical-chance',
      name: 'Sharp Ice',
      description: 'Increases critical hit chance by 5%',
      cost: 150,
      maxLevel: 5,
      currentLevel: 0,
      costMultiplier: 2.5,
      category: 'click',
      icon: '⚡',
      effects: {
        specialEffect: 'criticalChance'
      },
      visible: true,
      unlocked: true
    },
    {
      id: 'critical-power',
      name: 'Ice Spikes',
      description: 'Increases critical hit multiplier by 0.5x',
      cost: 300,
      maxLevel: 4,
      currentLevel: 0,
      costMultiplier: 3,
      category: 'click',
      icon: '💥',
      effects: {
        specialEffect: 'criticalPower'
      },
      visible: false,
      unlocked: false
    }
  ],

  // Generators (passive income)
  generators: [
    {
      id: 'snowball-maker',
      name: 'Snowball Maker',
      description: 'Produces 1 snow per second',
      baseCost: 15,
      count: 0,
      baseProduction: 1,
      efficiency: 1,
      visible: true,
      unlocked: true,
      category: 'basic',
      icon: '⚪'
    },
    {
      id: 'snow-machine',
      name: 'Snow Machine',
      description: 'Produces 5 snow per second',
      baseCost: 100,
      count: 0,
      baseProduction: 5,
      efficiency: 1,
      visible: true,
      unlocked: true,
      category: 'basic',
      icon: '❄️'
    },
    {
      id: 'winter-storm',
      name: 'Winter Storm',
      description: 'Produces 20 snow per second',
      baseCost: 500,
      count: 0,
      baseProduction: 20,
      efficiency: 1,
      visible: false,
      unlocked: false,
      category: 'advanced',
      icon: '☃️'
    },
    {
      id: 'arctic-blast',
      name: 'Arctic Blast',
      description: 'Produces 50 snow per second',
      baseCost: 3000,
      count: 0,
      baseProduction: 50,
      efficiency: 1,
      visible: false,
      unlocked: false,
      category: 'advanced',
      icon: '❄️'
    }
  ],

  // Achievements
  achievements: [
    // Collection Achievements
    {
      id: 'first-snow',
      name: 'First Snow',
      description: 'Collect 10 snow',
      requirement: 10,
      achieved: false,
      type: 'totalSnow',
      icon: '❄️'
    },
    {
      id: 'snowball',
      name: 'Snowball',
      description: 'Collect 100 snow',
      requirement: 100,
      achieved: false,
      type: 'totalSnow',
      icon: '❄️'
    },
    {
      id: 'snowman',
      name: 'Snowman',
      description: 'Collect 1,000 snow',
      requirement: 1000,
      achieved: false,
      type: 'totalSnow',
      icon: '⛄'
    },
    {
      id: 'snow-fort',
      name: 'Snow Fort',
      description: 'Collect 10,000 snow',
      requirement: 10000,
      achieved: false,
      type: 'totalSnow',
      icon: '🏰'
    },
    {
      id: 'snow-castle',
      name: 'Snow Castle',
      description: 'Collect 100,000 snow',
      requirement: 100000,
      achieved: false,
      type: 'totalSnow',
      icon: '🏰'
    },
    {
      id: 'winter-wonderland',
      name: 'Winter Wonderland',
      description: 'Collect 1,000,000 snow',
      requirement: 1000000,
      achieved: false,
      type: 'totalSnow',
      icon: '❄️'
    },

    // Click Achievements
    {
      id: 'novice-clicker',
      name: 'Novice Clicker',
      description: 'Click 50 times',
      requirement: 50,
      achieved: false,
      type: 'totalClicks',
      icon: '👆'
    },
    {
      id: 'dedicated-clicker',
      name: 'Dedicated Clicker',
      description: 'Click 500 times',
      requirement: 500,
      achieved: false,
      type: 'totalClicks',
      icon: '👆'
    },
    {
      id: 'click-master',
      name: 'Click Master',
      description: 'Click 2,500 times',
      requirement: 2500,
      achieved: false,
      type: 'totalClicks',
      icon: '👆'
    },
    {
      id: 'click-maniac',
      name: 'Click Maniac',
      description: 'Click 10,000 times',
      requirement: 10000,
      achieved: false,
      type: 'totalClicks',
      icon: '👆'
    },

    // Generator Achievements
    {
      id: 'snow-factory',
      name: 'Snow Factory',
      description: 'Have 5 total generators',
      requirement: 5,
      achieved: false,
      type: 'generatorsPurchased',
      icon: '🏭'
    },
    {
      id: 'snow-empire',
      name: 'Snow Empire',
      description: 'Have 25 total generators',
      requirement: 25,
      achieved: false,
      type: 'generatorsPurchased',
      icon: '🏭'
    },
    {
      id: 'snow-corporation',
      name: 'Snow Corporation',
      description: 'Have 50 total generators',
      requirement: 50,
      achieved: false,
      type: 'generatorsPurchased',
      icon: '🏭'
    },

    // Production Rate Achievements
    {
      id: 'snowfall',
      name: 'Snowfall',
      description: 'Reach 10 snow per second',
      requirement: 10,
      achieved: false,
      type: 'snowPerSecond',
      icon: '⏱️'
    },
    {
      id: 'snow-shower',
      name: 'Snow Shower',
      description: 'Reach 50 snow per second',
      requirement: 50,
      achieved: false,
      type: 'snowPerSecond',
      icon: '⏱️'
    },
    {
      id: 'blizzard',
      name: 'Blizzard',
      description: 'Reach 100 snow per second',
      requirement: 100,
      achieved: false,
      type: 'snowPerSecond',
      icon: '⏱️'
    },
    {
      id: 'arctic-storm',
      name: 'Arctic Storm',
      description: 'Reach 500 snow per second',
      requirement: 500,
      achieved: false,
      type: 'snowPerSecond',
      icon: '⏱️'
    },

    // Time Played Achievements
    {
      id: 'snow-hobbyist',
      name: 'Snow Hobbyist',
      description: 'Play for 5 minutes',
      requirement: 300, // 5 minutes in seconds
      achieved: false,
      type: 'totalTimePlayed',
      icon: '⏰'
    },
    {
      id: 'snow-enthusiast',
      name: 'Snow Enthusiast',
      description: 'Play for 1 hour',
      requirement: 3600, // 1 hour in seconds
      achieved: false,
      type: 'totalTimePlayed',
      icon: '⏰'
    },
    {
      id: 'snow-addict',
      name: 'Snow Addict',
      description: 'Play for 5 hours',
      requirement: 18000, // 5 hours in seconds
      achieved: false,
      type: 'totalTimePlayed',
      icon: '⏰'
    },

    // Upgrade Achievements
    {
      id: 'snow-technician',
      name: 'Snow Technician',
      description: 'Purchase your first upgrade',
      requirement: 1,
      achieved: false,
      type: 'upgradesPurchased',
      icon: '🔧'
    },
    {
      id: 'snow-engineer',
      name: 'Snow Engineer',
      description: 'Purchase 5 upgrades',
      requirement: 5,
      achieved: false,
      type: 'upgradesPurchased',
      icon: '🔧'
    },

    // Special Achievements
    {
      id: 'clicking-frenzy',
      name: 'Clicking Frenzy',
      description: 'Click 10 times in 5 seconds',
      requirement: 10,
      achieved: false,
      type: 'special',
      icon: '🌟'
    },
    {
      id: 'winter-beginning',
      name: 'Winter Beginning',
      description: 'Unlock your first Winter Storm generator',
      requirement: 1,
      achieved: false,
      type: 'special',
      icon: '🌟'
    },

    // Critical Hit Achievements
    {
      id: 'lucky-strike',
      name: 'Lucky Strike',
      description: 'Get your first critical hit',
      requirement: 1,
      achieved: false,
      type: 'criticalHits',
      icon: '🎯'
    },
    {
      id: 'precision-master',
      name: 'Precision Master',
      description: 'Land 50 critical hits',
      requirement: 50,
      achieved: false,
      type: 'criticalHits',
      icon: '🎯'
    },
    {
      id: 'critical-specialist',
      name: 'Critical Specialist',
      description: 'Land 250 critical hits',
      requirement: 250,
      achieved: false,
      type: 'criticalHits',
      icon: '🎯'
    }
  ],

  // Leaderboard (will be implemented later)
  leaderboard: []
})