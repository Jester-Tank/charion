<template>
  <section class="container-fluid">
    <section class="row">
      <!-- Header section with game stats -->
      <div class="col-12 text-center my-4">
        <h1 class="text-primary">Snow Clicker</h1>
        <div class="stats mb-3">
          <h3>Snow: {{ formatNumber(snowAmount) }} ❄️</h3>
          <p>Per Click: {{ formatNumber(snowPerClick) }} | Per Second: {{ formatNumber(snowPerSecond) }}</p>
          <p class="text-muted small">Total Snow Ever: {{ formatNumber(totalSnowEver) }} | Clicks: {{ formatNumber(totalClicks) }}</p>
          <p class="text-muted small">Time Played: {{ formatTime(totalTimePlayed) }}</p>
        </div>
      </div>

      <!-- Main game section -->
      <div class="col-12 col-md-7">
        <!-- Clickable snow area -->
        <div class="text-center mb-5">
          <div class="snow-area" @click="makeSnow">
            <div class="snow-pile"></div>
            <!-- Critical hit effect -->
            <div v-if="showCriticalEffect" class="critical-hit-effect">
              <span>CRITICAL!</span>
              <span class="critical-snow">+{{ formatNumber(lastCriticalSnow) }}</span>
            </div>
          </div>
          <p class="mt-2">Click to make snow!</p>
          <div class="critical-stats">
            <p>Critical Chance: {{ (criticalHitChance * 100).toFixed(1) }}%</p>
            <p>Critical Multiplier: {{ criticalHitMultiplier.toFixed(1) }}x</p>
          </div>
        </div>

        <!-- Achievements section with tabs -->
        <div class="achievements mt-4">
          <h3>Achievements ({{ completedAchievements.length }}/{{ achievements.length }})</h3>
          <ul class="nav nav-tabs" id="achievementTabs" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="all-tab" data-bs-toggle="tab" data-bs-target="#all-achievements" 
                      type="button" role="tab" aria-controls="all-achievements" aria-selected="true">
                All
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="collection-tab" data-bs-toggle="tab" data-bs-target="#collection-achievements" 
                      type="button" role="tab" aria-controls="collection-achievements" aria-selected="false">
                Collection
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="clicks-tab" data-bs-toggle="tab" data-bs-target="#clicks-achievements" 
                      type="button" role="tab" aria-controls="clicks-achievements" aria-selected="false">
                Clicks
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="production-tab" data-bs-toggle="tab" data-bs-target="#production-achievements" 
                      type="button" role="tab" aria-controls="production-achievements" aria-selected="false">
                Production
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="special-tab" data-bs-toggle="tab" data-bs-target="#special-achievements" 
                      type="button" role="tab" aria-controls="special-achievements" aria-selected="false">
                Special
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="critical-tab" data-bs-toggle="tab" data-bs-target="#critical-achievements" 
                      type="button" role="tab" aria-controls="critical-achievements" aria-selected="false">
                Critical
              </button>
            </li>
          </ul>
          
          <div class="tab-content pt-3" id="achievementTabContent">
            <!-- All Achievements tab -->
            <div class="tab-pane fade show active" id="all-achievements" role="tabpanel" aria-labelledby="all-tab">
              <div class="row">
                <div v-for="achievement in achievements" :key="achievement.id" class="col-6 col-md-4 mb-2">
                  <div class="achievement-card p-2" :class="{ 'achieved': achievement.achieved }">
                    <h5>{{ achievement.icon }} {{ achievement.name }}</h5>
                    <p class="mb-0">{{ achievement.description }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Collection Achievements tab -->
            <div class="tab-pane fade" id="collection-achievements" role="tabpanel" aria-labelledby="collection-tab">
              <div class="row">
                <div v-for="achievement in achievementsByType('totalSnow')" :key="achievement.id" class="col-6 col-md-4 mb-2">
                  <div class="achievement-card p-2" :class="{ 'achieved': achievement.achieved }">
                    <h5>{{ achievement.icon }} {{ achievement.name }}</h5>
                    <p class="mb-0">{{ achievement.description }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Clicks Achievements tab -->
            <div class="tab-pane fade" id="clicks-achievements" role="tabpanel" aria-labelledby="clicks-tab">
              <div class="row">
                <div v-for="achievement in achievementsByType('totalClicks')" :key="achievement.id" class="col-6 col-md-4 mb-2">
                  <div class="achievement-card p-2" :class="{ 'achieved': achievement.achieved }">
                    <h5>{{ achievement.icon }} {{ achievement.name }}</h5>
                    <p class="mb-0">{{ achievement.description }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Production Achievements tab -->
            <div class="tab-pane fade" id="production-achievements" role="tabpanel" aria-labelledby="production-tab">
              <div class="row">
                <div v-for="achievement in productionAchievements" :key="achievement.id" class="col-6 col-md-4 mb-2">
                  <div class="achievement-card p-2" :class="{ 'achieved': achievement.achieved }">
                    <h5>{{ achievement.icon }} {{ achievement.name }}</h5>
                    <p class="mb-0">{{ achievement.description }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Special Achievements tab -->
            <div class="tab-pane fade" id="special-achievements" role="tabpanel" aria-labelledby="special-tab">
              <div class="row">
                <div v-for="achievement in achievementsByType('special')" :key="achievement.id" class="col-6 col-md-4 mb-2">
                  <div class="achievement-card p-2" :class="{ 'achieved': achievement.achieved }">
                    <h5>{{ achievement.icon }} {{ achievement.name }}</h5>
                    <p class="mb-0">{{ achievement.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Critical Hit Achievements tab -->
            <div class="tab-pane fade" id="critical-achievements" role="tabpanel" aria-labelledby="critical-tab">
              <div class="row">
                <div v-for="achievement in achievementsByType('criticalHits')" :key="achievement.id" class="col-6 col-md-4 mb-2">
                  <div class="achievement-card p-2" :class="{ 'achieved': achievement.achieved }">
                    <h5>{{ achievement.icon }} {{ achievement.name }}</h5>
                    <p class="mb-0">{{ achievement.description }}</p>
                  </div>
                </div>
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
                    :class="{ 'disabled': isUpgradeMaxed(upgrade) || snowAmount < getUpgradeNextLevelCost(upgrade) }"
                    @click="buyUpgrade(upgrade)">
              <div>
                <h5>{{ upgrade.icon }} {{ upgrade.name }}</h5>
                <p class="mb-0">{{ upgrade.description }}</p>
                <p v-if="upgrade.maxLevel > 1" class="text-muted small">
                  Level: {{ upgrade.currentLevel }}/{{ upgrade.maxLevel }}
                </p>
              </div>
              <span v-if="!isUpgradeMaxed(upgrade)" class="badge bg-primary">{{ formatNumber(getUpgradeNextLevelCost(upgrade)) }} ❄️</span>
              <span v-else class="badge bg-success">MAX</span>
            </button>
          </div>
        </div>

        <!-- Generators -->
        <div class="generators">
          <h3>Snow Generators</h3>
          <div class="list-group">
            <button v-for="generator in visibleGenerators" :key="generator.id"
                    class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                    :class="{ 'disabled': snowAmount < getGeneratorCost(generator) }"
                    @click="buyGenerator(generator)">
              <div>
                <h5>{{ generator.icon }} {{ generator.name }} <span class="badge bg-secondary">{{ generator.count }}</span></h5>
                <p class="mb-0">{{ generator.description }}</p>
                <p class="text-muted small">Currently producing: {{ formatNumber(getGeneratorProduction(generator)) }}/sec</p>
              </div>
              <span class="badge bg-primary">{{ formatNumber(getGeneratorCost(generator)) }} ❄️</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Stats & Controls -->
      <div class="col-12 text-center my-4">
        <div class="mb-3">
          <h4>Stats</h4>
          <div class="row justify-content-center">
            <div class="col-6 col-md-3">
              <div class="card stat-card">
                <div class="card-body">
                  <h5 class="card-title">Achievements</h5>
                  <p class="card-text">{{ completedAchievements.length }}/{{ achievements.length }}</p>
                </div>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="card stat-card">
                <div class="card-body">
                  <h5 class="card-title">Total Clicks</h5>
                  <p class="card-text">{{ formatNumber(totalClicks) }}</p>
                </div>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="card stat-card">
                <div class="card-body">
                  <h5 class="card-title">Critical Hits</h5>
                  <p class="card-text">{{ formatNumber(criticalHitsLanded) }}</p>
                </div>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="card stat-card">
                <div class="card-body">
                  <h5 class="card-title">Time Played</h5>
                  <p class="card-text">{{ formatTime(totalTimePlayed) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Controls -->
        <button class="btn btn-danger" @click="confirmReset">Reset Game</button>
      </div>
    </section>
  </section>
</template>

<script>
import { AppState } from '../AppState.js'
import { computed, onMounted, ref } from 'vue'
import { snowService } from '../services/SnowService.js'

export default {
  setup() {
    // Initialize the game when component mounts
    onMounted(() => {
      snowService.init()
    })

    // Critical hit state
    const showCriticalEffect = ref(false)
    const lastCriticalSnow = ref(0)

    // Computed properties
    const snowAmount = computed(() => AppState.snowAmount)
    const snowPerClick = computed(() => AppState.snowPerClick)
    const snowPerSecond = computed(() => AppState.snowPerSecond)
    const totalSnowEver = computed(() => AppState.totalSnowEver)
    const totalClicks = computed(() => AppState.totalClicks)
    const totalTimePlayed = computed(() => AppState.totalTimePlayed)
    const criticalHitChance = computed(() => AppState.criticalHitChance)
    const criticalHitMultiplier = computed(() => AppState.criticalHitMultiplier)
    const criticalHitsLanded = computed(() => AppState.criticalHitsLanded)
    
    const visibleUpgrades = computed(() => {
      return AppState.upgrades.filter(upgrade => upgrade.visible && upgrade.unlocked)
    })
    
    const visibleGenerators = computed(() => {
      return AppState.generators.filter(generator => generator.visible && generator.unlocked)
    })
    
    const achievements = computed(() => AppState.achievements)
    
    const completedAchievements = computed(() => {
      return AppState.achievements.filter(achievement => achievement.achieved)
    })
    
    const generatorCount = computed(() => {
      return AppState.generators.reduce((total, generator) => total + generator.count, 0)
    })
    
    const productionAchievements = computed(() => {
      return AppState.achievements.filter(achievement => 
        achievement.type === 'generatorsPurchased' || 
        achievement.type === 'snowPerSecond' || 
        achievement.type === 'upgradesPurchased'
      )
    })
    
    // Methods
    function achievementsByType(type) {
      return AppState.achievements.filter(achievement => achievement.type === type)
    }
    
    function makeSnow() {
      const result = snowService.makeSnow()
      
      // If it was a critical hit, show the effect
      if (result.isCriticalHit) {
        lastCriticalSnow.value = result.snowGained
        showCriticalEffect.value = true
        
        // Hide the effect after 1 second
        setTimeout(() => {
          showCriticalEffect.value = false
        }, 1000)
      }
    }
    
    function buyUpgrade(upgrade) {
      snowService.buyUpgrade(upgrade)
    }
    
    function getUpgradeNextLevelCost(upgrade) {
      return snowService.getUpgradeNextLevelCost(upgrade)
    }
    
    function isUpgradeMaxed(upgrade) {
      return snowService.isUpgradeMaxed(upgrade)
    }
    
    function buyGenerator(generator) {
      snowService.buyGenerator(generator)
    }
    
    function getGeneratorCost(generator) {
      return snowService.getGeneratorCost(generator)
    }
    
    function getGeneratorProduction(generator) {
      return snowService.getGeneratorProduction(generator)
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
    
    function formatTime(seconds) {
      const hours = Math.floor(seconds / 3600)
      const minutes = Math.floor((seconds % 3600) / 60)
      const remainingSeconds = seconds % 60
      
      if (hours > 0) {
        return `${hours}h ${minutes}m ${remainingSeconds}s`
      } else if (minutes > 0) {
        return `${minutes}m ${remainingSeconds}s`
      } else {
        return `${remainingSeconds}s`
      }
    }

    return {
      snowAmount,
      snowPerClick,
      snowPerSecond,
      totalSnowEver,
      totalClicks,
      totalTimePlayed,
      criticalHitChance,
      criticalHitMultiplier,
      criticalHitsLanded,
      visibleUpgrades,
      visibleGenerators,
      achievements,
      completedAchievements,
      generatorCount,
      productionAchievements,
      showCriticalEffect,
      lastCriticalSnow,
      achievementsByType,
      makeSnow,
      buyUpgrade,
      getUpgradeNextLevelCost,
      isUpgradeMaxed,
      buyGenerator,
      getGeneratorCost,
      getGeneratorProduction,
      confirmReset,
      formatNumber,
      formatTime
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

.stat-card {
  height: 100px;
  transition: all 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Critical hit effect styles */
.critical-hit-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ff6b6b;
  font-weight: bold;
  font-size: 24px;
  text-shadow: 0 0 10px yellow, 0 0 20px orange;
  animation: critical-pulse 1s ease-out;
  pointer-events: none;
}

.critical-snow {
  font-size: 20px;
  color: #339af0;
}

@keyframes critical-pulse {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5);
  }
  25% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.2);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1);
  }
}

.critical-stats {
  display: flex;
  justify-content: center;
  gap: 20px;
  font-size: 14px;
  color: #666;
}
</style>