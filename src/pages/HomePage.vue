<template>
  <section class="container-fluid">
    <section class="row">
      <!-- Header section with game stats -->
      <div class="col-12 text-center my-4">
        <h1 class="text-primary">Snow Clicker</h1>
        <div class="stats mb-3">
          <h3>Snow: {{ formatNumber(snowAmount) }} ❄️</h3>
          <p>Per Click: {{ formatNumber(snowPerClick) }} | Per Second: {{ formatNumber(snowPerSecond) }}</p>
        </div>
      </div>

      <!-- Main game section -->
      <div class="col-12 col-md-7">
        <!-- Clickable snow area -->
        <div class="text-center mb-5">
          <div class="snow-area" @click="makeSnow">
            <div class="snow-pile"></div>
          </div>
          <p class="mt-2">Click to make snow!</p>
        </div>

        <!-- Achievements section -->
        <div class="achievements mt-4">
          <h3>Achievements</h3>
          <div class="row">
            <div v-for="achievement in achievements" :key="achievement.id" class="col-6 col-md-4 mb-2">
              <div class="achievement-card p-2" :class="{ 'achieved': achievement.achieved }">
                <h5>{{ achievement.name }}</h5>
                <p>{{ achievement.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Upgrades and generators section -->
      <div class="col-12 col-md-5">
        <!-- Upgrades -->
        <div class="upgrades mb-4">
          <h3>Upgrades</h3>
          <div class="list-group">
            <button v-for="upgrade in visibleUpgrades" :key="upgrade.id"
                    class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                    :class="{ 'disabled': upgrade.purchased || snowAmount < upgrade.cost }"
                    @click="buyUpgrade(upgrade)">
              <div>
                <h5>{{ upgrade.name }}</h5>
                <p class="mb-0">{{ upgrade.description }}</p>
              </div>
              <span v-if="!upgrade.purchased" class="badge bg-primary">{{ formatNumber(upgrade.cost) }} ❄️</span>
              <span v-else class="badge bg-success">Purchased</span>
            </button>
          </div>
        </div>

        <!-- Generators -->
        <div class="generators">
          <h3>Snow Generators</h3>
          <div class="list-group">
            <button v-for="generator in visibleGenerators" :key="generator.id"
                    class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                    :class="{ 'disabled': snowAmount < calculateGeneratorCost(generator) }"
                    @click="buyGenerator(generator)">
              <div>
                <h5>{{ generator.name }} <span class="badge bg-secondary">{{ generator.count }}</span></h5>
                <p class="mb-0">{{ generator.description }}</p>
              </div>
              <span class="badge bg-primary">{{ formatNumber(calculateGeneratorCost(generator)) }} ❄️</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Footer with reset button -->
      <div class="col-12 text-center my-4">
        <button class="btn btn-danger" @click="confirmReset">Reset Game</button>
      </div>
    </section>
  </section>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState.js'
import { snowService } from '../services/SnowService.js'

export default {
  setup() {
    // Load saved game when component mounts
    snowService.loadGame()

    // Computed properties
    const snowAmount = computed(() => AppState.snowAmount)
    const snowPerClick = computed(() => AppState.snowPerClick)
    const snowPerSecond = computed(() => AppState.snowPerSecond)
    
    const visibleUpgrades = computed(() => {
      return AppState.upgrades.filter(upgrade => upgrade.visible && !upgrade.purchased)
    })
    
    const visibleGenerators = computed(() => {
      return AppState.generators.filter(generator => generator.visible)
    })
    
    const achievements = computed(() => AppState.achievements)

    // Methods
    function makeSnow() {
      snowService.makeSnow()
    }
    
    function buyUpgrade(upgrade) {
      snowService.buyUpgrade(upgrade)
    }
    
    function buyGenerator(generator) {
      snowService.buyGenerator(generator)
    }
    
    function calculateGeneratorCost(generator) {
      return snowService.calculateGeneratorCost(generator)
    }
    
    function confirmReset() {
      if (confirm('Are you sure you want to reset your game? All progress will be lost!')) {
        snowService.resetGame()
      }
    }
    
    function formatNumber(number) {
      if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M'
      } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K'
      } else {
        return Math.floor(number)
      }
    }

    return {
      snowAmount,
      snowPerClick,
      snowPerSecond,
      visibleUpgrades,
      visibleGenerators,
      achievements,
      makeSnow,
      buyUpgrade,
      buyGenerator,
      calculateGeneratorCost,
      confirmReset,
      formatNumber
    }
  }
}
</script>

<style scoped>
.snow-area {
  width: 300px;
  height: 300px;
  margin: 0 auto;
  position: relative;
  background-color: #f0f8ff;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.1s;
  overflow: hidden;
  border: 4px solid #e1e1e1;
}

.snow-area:active {
  transform: scale(0.95);
}

.snow-pile {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background-color: white;
  border-radius: 50% 50% 0 0;
}

.achievement-card {
  border-radius: 8px;
  border: 1px solid #ccc;
  height: 100px;
  transition: all 0.3s;
  background-color: #f8f9fa;
}

.achievement-card.achieved {
  background-color: #d4edda;
  border-color: #c3e6cb;
}

.stats {
  background-color: rgba(240, 248, 255, 0.8);
  padding: 10px;
  border-radius: 10px;
  display: inline-block;
}
</style>