<template>
  <!-- Winter Background -->
  <div class="winter-background">
    <!-- Sky elements -->
    <div class="stars"></div>
    <div class="moon"></div>
    
    <!-- Far background mountains -->
    <svg class="mountains-bg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path class="mountain-range-bg" d="M0,224L60,213.3C120,203,240,181,360,192C480,203,600,245,720,245.3C840,245,960,203,1080,186.7C1200,171,1320,181,1380,186.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
      <path class="snow-caps" d="M0,224L60,213.3C120,203,240,181,360,192C480,203,600,245,720,245.3C840,245,960,203,1080,186.7C1200,171,1320,181,1380,186.7L1440,192L1440,224L1380,218C1320,212,1200,200,1080,202C960,204,840,220,720,220C600,220,480,204,360,202C240,200,120,212,60,218L0,224Z"></path>
    </svg>
    
    <!-- Mid-ground mountains -->
    <svg class="mountains-mid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path class="mountain-range-mid" d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,176C672,160,768,160,864,176C960,192,1056,224,1152,218.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      <path class="snow-caps" d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,176C672,160,768,160,864,176C960,192,1056,224,1152,218.7C1248,213,1344,171,1392,149.3L1440,128L1440,160L1392,170C1344,180,1248,200,1152,193C1056,186,960,154,864,149C768,144,672,166,576,170C480,174,384,160,288,160C192,160,96,174,48,181L0,188Z"></path>
    </svg>
    
    <!-- Foreground mountains -->
    <svg class="mountains" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path class="mountain-range" d="M0,256L48,240C96,224,192,192,288,192C384,192,480,224,576,240C672,256,768,256,864,234.7C960,213,1056,171,1152,160C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      <path class="snow-caps" d="M0,256L48,240C96,224,192,192,288,192C384,192,480,224,576,240C672,256,768,256,864,234.7C960,213,1056,171,1152,160C1248,149,1344,171,1392,181.3L1440,192L1440,224L1392,228C1344,232,1248,240,1152,226C1056,212,960,176,864,170C768,164,672,188,576,194C480,200,384,188,288,194C192,200,96,224,48,236L0,248Z"></path>
    </svg>
    
    <!-- Trees layer -->
    <svg class="trees" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path class="tree-line" d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,213.3C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      <path class="tree-snow" d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,213.3C1248,203,1344,213,1392,218.7L1440,224L1440,256L1392,258C1344,260,1248,264,1152,260C1056,256,960,244,864,244C768,244,672,256,576,256C480,256,384,244,288,244C192,244,96,256,48,262L0,268Z"></path>
    </svg>
    
    <!-- Ground with snow -->
    <div class="ground"></div>
    
    <!-- Snow layers -->
    <div class="snow-back" ref="snowBackLayer"></div>
    <div class="snow-mid" ref="snowMidLayer"></div>
    <div class="snow-front" ref="snowFrontLayer"></div>
  </div>

  <!-- Main Game Content -->
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
    // Winter background refs
    const snowFrontLayer = ref(null)
    const snowMidLayer = ref(null)
    const snowBackLayer = ref(null)
    
    // Critical hit state
    const showCriticalEffect = ref(false)
    const lastCriticalSnow = ref(0)

    // Initialize the game when component mounts
    onMounted(() => {
      snowService.init()
      createSnowflakes()
      maintainSnowfall()
    })

    // Create snowflakes for winter background
    function createSnowflakes() {
      if (snowFrontLayer.value && snowMidLayer.value && snowBackLayer.value) {
        // Create front layer snowflakes
        for (let i = 0; i < 30; i++) {
          createSnowflake(snowFrontLayer.value, 'snowflake', getRandomDuration(12, 18))
        }
        
        // Create mid layer snowflakes
        for (let i = 0; i < 50; i++) {
          createSnowflake(snowMidLayer.value, 'snowflake-mid', getRandomDuration(16, 24))
        }
        
        // Create back layer snowflakes
        for (let i = 0; i < 70; i++) {
          createSnowflake(snowBackLayer.value, 'snowflake-back', getRandomDuration(20, 30))
        }
      }
    }

    // Helper function to create a single snowflake with more randomness
    function createSnowflake(container, className, duration) {
      const snowflake = document.createElement('div')
      snowflake.className = className
      
      // More random positioning
      snowflake.style.left = `${Math.random() * 100}%`
      snowflake.style.top = `${Math.random() * 100}%`
      
      // Random size variation (within the class base size)
      const sizeVariation = 0.8 + Math.random() * 0.4 // 80% to 120% of base size
      snowflake.style.transform = `scale(${sizeVariation})`
      
      // Random animation properties
      snowflake.style.animationDuration = `${duration}s`
      snowflake.style.animationDelay = `${Math.random() * 10}s` // More varied delays
      
      // Slight opacity variation
      const opacityVariation = 0.7 + Math.random() * 0.3
      snowflake.style.opacity = opacityVariation.toString()
      
      container.appendChild(snowflake)
    }

    // Helper function to get a random duration
    function getRandomDuration(min, max) {
      return Math.random() * (max - min) + min
    }

    // Function to create additional snowflakes periodically
    function maintainSnowfall() {
      setInterval(() => {
        if (snowFrontLayer.value) {
          // Add a new front snowflake
          createSnowflake(snowFrontLayer.value, 'snowflake', getRandomDuration(12, 18))
          
          // Remove excess snowflakes to prevent memory issues
          if (snowFrontLayer.value.children.length > 40) {
            snowFrontLayer.value.removeChild(snowFrontLayer.value.children[0])
          }
        }
        
        if (snowMidLayer.value) {
          // Add a new mid snowflake
          createSnowflake(snowMidLayer.value, 'snowflake-mid', getRandomDuration(16, 24))
          
          // Remove excess snowflakes
          if (snowMidLayer.value.children.length > 60) {
            snowMidLayer.value.removeChild(snowMidLayer.value.children[0])
          }
        }
        
        if (snowBackLayer.value) {
          // Add a new back snowflake
          createSnowflake(snowBackLayer.value, 'snowflake-back', getRandomDuration(20, 30))
          
          // Remove excess snowflakes
          if (snowBackLayer.value.children.length > 80) {
            snowBackLayer.value.removeChild(snowBackLayer.value.children[0])
          }
        }
      }, 2000) // Add new snowflakes every 2 seconds
    }

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
      snowFrontLayer,
      snowMidLayer,
      snowBackLayer,
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
/* Base background with gradient sky */
.winter-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  background: linear-gradient(to bottom, #94c5f8 0%, #c9e2ff 50%, #e8f1ff 100%);
}

/* Stars for night sky effect */
.stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60%;
  background-image: 
    radial-gradient(1px 1px at 25px 5px, white, rgba(255,255,255,0)),
    radial-gradient(1px 1px at 50px 25px, white, rgba(255,255,255,0)),
    radial-gradient(1px 1px at 125px 20px, white, rgba(255,255,255,0)),
    radial-gradient(1.5px 1.5px at 50px 75px, white, rgba(255,255,255,0)),
    radial-gradient(2px 2px at 15px 125px, white, rgba(255,255,255,0)),
    radial-gradient(2.5px 2.5px at 110px 80px, white, rgba(255,255,255,0));
  background-repeat: repeat;
  background-size: 200px 200px;
  opacity: 0.5;
}

/* Moon */
.moon {
  position: absolute;
  top: 50px;
  right: 100px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow: 0 0 40px 20px rgba(255, 255, 255, 0.4);
}

/* Mountains far background */
.mountains-bg {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30%;
  z-index: -1;
}

.mountain-range-bg {
  fill: #b5d3fa;
  stroke: none;
}

/* Mountains mid-ground */
.mountains-mid {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 25%;
  z-index: 0;
  animation: slide-mountains-mid 120s linear infinite;
}

.mountain-range-mid {
  fill: #93b6da;
  stroke: none;
}

/* Mountains foreground */
.mountains {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20%;
  animation: slide-mountains 80s linear infinite;
}

.mountain-range {
  fill: #7496b8;
  stroke: none;
}

/* Snow caps on mountains */
.snow-caps {
  fill: #ffffff;
  stroke: none;
}

/* Trees layer */
.trees {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 15%;
  animation: slide-trees 30s linear infinite;
}

.tree-line {
  fill: #2d462d;
  stroke: none;
}

.tree-snow {
  fill: #ffffff;
  stroke: none;
}

/* Ground with snow */
.ground {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 10%;
  background-color: #ffffff;
  z-index: 1;
}

/* Create different snow layers */
.snow-back, .snow-mid, .snow-front {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  pointer-events: none;
}

/* Snowflake styles */
.snowflake {
  position: absolute;
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  opacity: 0.8;
  animation-name: snowfall-front;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
}

.snowflake-mid {
  position: absolute;
  width: 5px;
  height: 5px;
  background: white;
  border-radius: 50%;
  opacity: 0.6;
  animation-name: snowfall-mid;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  box-shadow: 0 0 3px rgba(255, 255, 255, 0.6);
}

.snowflake-back {
  position: absolute;
  width: 3px;
  height: 3px;
  background: white;
  border-radius: 50%;
  opacity: 0.4;
  animation-name: snowfall-back;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  box-shadow: 0 0 2px rgba(255, 255, 255, 0.4);
}

/* Animation keyframes */
@keyframes slide-mountains {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

@keyframes slide-mountains-mid {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

@keyframes slide-trees {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

@keyframes snowfall-front {
  0% {
    transform: translateY(-10%) translateX(-5px);
  }
  100% {
    transform: translateY(105%) translateX(20px);
  }
}

@keyframes snowfall-mid {
  0% {
    transform: translateY(-10%) translateX(-2px);
  }
  100% {
    transform: translateY(105%) translateX(10px);
  }
}

@keyframes snowfall-back {
  0% {
    transform: translateY(-10%) translateX(-1px);
  }
  100% {
    transform: translateY(105%) translateX(5px);
  }
}

/* Main Game Styles */
.container-fluid {
  position: relative;
  z-index: 10;
  border-radius: 10px;
  margin-top: 20px;
  padding: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

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