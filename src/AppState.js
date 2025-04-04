import { reactive } from 'vue'

export const AppState = reactive({


  // Game Stats
  snowAmount: 0,
  snowPerClick: 1,
  snowPerSecond: 0,
  totalSnowEver: 0,

  // Game State
  gameStarted: false,

  // Upgrades
  upgrades: [
    {
      id: 1,
      name: 'Better Gloves',
      description: 'Click twice as effectively',
      cost: 50,
      snowPerClickMultiplier: 2,
      purchased: false,
      visible: true
    },
    {
      id: 2,
      name: 'Snow Shovel',
      description: 'Click 5x more effectively',
      cost: 200,
      snowPerClickMultiplier: 5,
      purchased: false,
      visible: true
    }
  ],

  // Generators (passive income)
  generators: [
    {
      id: 1,
      name: 'Snowball Maker',
      description: 'Produces 1 snow per second',
      baseCost: 15,
      count: 0,
      snowPerSecond: 1,
      visible: true
    },
    {
      id: 2,
      name: 'Snow Machine',
      description: 'Produces 5 snow per second',
      baseCost: 100,
      count: 0,
      snowPerSecond: 5,
      visible: true
    },
    {
      id: 3,
      name: 'Winter Storm',
      description: 'Produces 20 snow per second',
      baseCost: 500,
      count: 0,
      snowPerSecond: 20,
      visible: false
    }
  ],

  // Achievements
  achievements: [
    {
      id: 1,
      name: 'First Snow',
      description: 'Collect 10 snow',
      requirement: 10,
      achieved: false,
      type: 'totalSnow'
    },
    {
      id: 2,
      name: 'Snowstorm',
      description: 'Collect 1,000 snow',
      requirement: 1000,
      achieved: false,
      type: 'totalSnow'
    }
  ]
})