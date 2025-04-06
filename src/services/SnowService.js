// services/SnowService.js
import { AppState } from '../AppState.js'
import { saveState, loadState } from './StorageService.js';
import { Upgrade } from '../models/Upgrade.js'
import { Generator } from '@/models/Generator.js';

class SnowService {
    constructor() {
        // Track time played
        this.gameTimeInterval = null;
        this.clickTimestamps = []; // For tracking click frequency achievements

        // Start the automatic snow generation
        setInterval(this.generatePassiveSnow.bind(this), 1000)

        // Check achievements every second
        setInterval(this.checkAchievements.bind(this), 1000)

        // Save game every 30 seconds
        setInterval(this.saveGame.bind(this), 30000)

        // Update play time counter every second
        this.gameTimeInterval = setInterval(this.incrementPlayTime.bind(this), 1000)
    }

    /**
     * Initialize the game
     */
    init() {
        this.loadGame()
        this.recalculateSnowPerSecond()

        // Set game as started
        AppState.gameStarted = true
        AppState.lastSaved = new Date()

        // Check for returning player
        if (AppState.firstTimePlayer) {
            console.log('Welcome new player!')
            AppState.firstTimePlayer = false
        }
    }

    /**
     * Handle clicking to make snow
     */
    makeSnow() {
        AppState.snowAmount += AppState.snowPerClick
        AppState.totalSnowEver += AppState.snowPerClick
        AppState.totalClicks++

        // Record timestamp for tracking click frequency achievements
        const now = Date.now()
        this.clickTimestamps.push(now)

        // Only keep timestamps from the last 5 seconds for click frequency tracking
        this.clickTimestamps = this.clickTimestamps.filter(time => now - time < 5000)

        // Check if player clicked 10 times in 5 seconds (for the clicking frenzy achievement)
        this.checkClickingFrenzyAchievement()

        this.checkAchievements()
        this.createSnowflakeEffect()

        // Check if we've unlocked any upgrades or generators
        this.checkUnlocks()
    }

    /**
     * Generate passive snow income
     */
    generatePassiveSnow() {
        // Skip if game hasn't started
        if (!AppState.gameStarted) return

        AppState.snowAmount += AppState.snowPerSecond
        AppState.totalSnowEver += AppState.snowPerSecond
    }

    /**
     * Increment play time counter
     */
    incrementPlayTime() {
        // Skip if game hasn't started
        if (!AppState.gameStarted) return

        AppState.totalTimePlayed++
    }

    /**
     * Calculate the cost for the next level of an upgrade
     * @param {Upgrade} upgrade - The upgrade
     * @returns {number} - The cost for the next level
     */
    getUpgradeNextLevelCost(upgrade) {
        if (upgrade.currentLevel >= upgrade.maxLevel) {
            return Infinity
        }
        return Math.floor(upgrade.cost * Math.pow(upgrade.costMultiplier, upgrade.currentLevel))
    }

    /**
     * Check if an upgrade can be purchased
     * @param {Upgrade} upgrade - The upgrade
     * @param {number} availableSnow - The amount of snow available
     * @returns {boolean} - Whether the upgrade can be purchased
     */
    canPurchaseUpgrade(upgrade, availableSnow) {
        return upgrade.currentLevel < upgrade.maxLevel &&
            availableSnow >= this.getUpgradeNextLevelCost(upgrade) &&
            upgrade.unlocked
    }

    /**
     * Check if an upgrade is at its maximum level
     * @param {Upgrade} upgrade - The upgrade
     * @returns {boolean} - Whether the upgrade is at max level
     */
    isUpgradeMaxed(upgrade) {
        return upgrade.currentLevel >= upgrade.maxLevel
    }

    /**
     * Get display text for the upgrade's cost or status
     * @param {Upgrade} upgrade - The upgrade
     * @returns {string} - The text to display
     */
    getUpgradeCostDisplay(upgrade) {
        if (this.isUpgradeMaxed(upgrade)) {
            return 'MAX'
        }
        return this.getUpgradeNextLevelCost(upgrade).toString()
    }

    /**
     * Apply an upgrade's effects
     * @param {Upgrade} upgrade - The upgrade to apply
     */
    applyUpgradeEffects(upgrade) {
        // Apply snow per click multiplier
        if (upgrade.effects.snowPerClickMultiplier) {
            AppState.snowPerClick *= upgrade.effects.snowPerClickMultiplier
        }

        // Add flat amount to snow per click
        if (upgrade.effects.snowPerClickAdd) {
            AppState.snowPerClick += upgrade.effects.snowPerClickAdd
        }

        // Multiply all generators' efficiency
        if (upgrade.effects.generatorEfficiencyMultiplier) {
            AppState.generators.forEach(generator => {
                generator.efficiency = (generator.efficiency || 1) * upgrade.effects.generatorEfficiencyMultiplier
            })
        }

        // Multiply specific generator's output
        if (upgrade.effects.specificGeneratorMultiplier && upgrade.effects.generatorId) {
            const generator = this.getGeneratorById(upgrade.effects.generatorId)
            if (generator) {
                generator.efficiency = (generator.efficiency || 1) * upgrade.effects.specificGeneratorMultiplier
            }
        }

        // Unlock a generator
        if (upgrade.effects.unlockGenerator) {
            const generator = this.getGeneratorById(upgrade.effects.unlockGenerator)
            if (generator) {
                generator.visible = true
                generator.unlocked = true
            }
        }

        // Unlock another upgrade
        if (upgrade.effects.unlockUpgrade) {
            const targetUpgrade = this.getUpgradeById(upgrade.effects.unlockUpgrade)
            if (targetUpgrade) {
                targetUpgrade.visible = true
                targetUpgrade.unlocked = true
            }
        }
    }

    /**
     * Buy an upgrade
     * @param {Upgrade} upgrade - The upgrade to purchase
     */
    buyUpgrade(upgrade) {
        const cost = this.getUpgradeNextLevelCost(upgrade)

        if (AppState.snowAmount >= cost && upgrade.currentLevel < upgrade.maxLevel) {
            AppState.snowAmount -= cost
            upgrade.currentLevel++
            AppState.upgradesPurchased++

            // Apply upgrade effects
            this.applyUpgradeEffects(upgrade)

            // Recalculate snow per second
            this.recalculateSnowPerSecond()

            // Check upgrade-related achievements
            this.checkAchievements()

            // Check if we've unlocked any upgrades or generators
            this.checkUnlocks()

            // Save game after purchase
            this.saveGame()
        }
    }

    /**
     * Calculate the current cost to purchase one more of a generator
     * @param {Generator} generator - The generator
     * @returns {number} - The cost
     */
    getGeneratorCost(generator) {
        return Math.floor(generator.baseCost * Math.pow(generator.costMultiplier, generator.count))
    }

    /**
     * Calculate the current production per second for a generator
     * @param {Generator} generator - The generator
     * @returns {number} - Production per second
     */
    getGeneratorProduction(generator) {
        return generator.baseProduction * generator.count * generator.efficiency
    }

    /**
     * Check if a generator can be purchased
     * @param {Generator} generator - The generator
     * @param {number} availableSnow - The amount of snow available
     * @returns {boolean} - Whether the generator can be purchased
     */
    canPurchaseGenerator(generator, availableSnow) {
        return availableSnow >= this.getGeneratorCost(generator) && generator.unlocked
    }

    /**
     * Calculate the production increase if one more generator is purchased
     * @param {Generator} generator - The generator
     * @returns {number} - The production increase
     */
    getGeneratorProductionIncrease(generator) {
        return generator.baseProduction * generator.efficiency
    }

    /**
     * Calculate cost efficiency (production increase per snow spent)
     * @param {Generator} generator - The generator
     * @returns {number} - Cost efficiency
     */
    getGeneratorCostEfficiency(generator) {
        return this.getGeneratorProductionIncrease(generator) / this.getGeneratorCost(generator)
    }

    /**
     * Buy a generator
     * @param {Generator} generator - The generator to purchase
     */
    buyGenerator(generator) {
        const cost = this.getGeneratorCost(generator)

        if (AppState.snowAmount >= cost) {
            AppState.snowAmount -= cost
            generator.count++
            AppState.generatorsPurchased++

            // Check if this is the first Winter Storm (for achievement)
            if (generator.id === 'winter-storm' && generator.count === 1) {
                this.unlockSpecialAchievement('Winter Beginning')
            }

            // Recalculate snow per second
            this.recalculateSnowPerSecond()

            // Check generator-related achievements
            this.checkAchievements()

            // Check if we've unlocked any upgrades or generators
            this.checkUnlocks()

            // Save game after purchase
            this.saveGame()
        }
    }

    /**
     * Check for any unlocks based on current game state
     */
    checkUnlocks() {
        // Check for unlocks based on snow collected
        if (AppState.totalSnowEver >= 300 && !this.isUpgradeUnlocked('heated-gloves')) {
            const upgrade = this.getUpgradeById('heated-gloves')
            if (upgrade) {
                upgrade.visible = true
                upgrade.unlocked = true
            }
        }

        // Check for unlocks based on generators owned
        const snowMakerCount = this.getGeneratorById('snowball-maker')?.count || 0
        if (snowMakerCount >= 10 && !this.isUpgradeUnlocked('snowmaker-efficiency')) {
            const upgrade = this.getUpgradeById('snowmaker-efficiency')
            if (upgrade) {
                upgrade.visible = true
                upgrade.unlocked = true
            }
        }

        // More unlock conditions can be added here
    }

    /**
     * Get an upgrade by its ID
     * @param {string} id - The upgrade ID
     * @returns {Upgrade|null} - The upgrade object or null if not found
     */
    getUpgradeById(id) {
        return AppState.upgrades.find(u => u.id === id) || null
    }

    /**
     * Get a generator by its ID
     * @param {string} id - The generator ID
     * @returns {Generator|null} - The generator object or null if not found
     */
    getGeneratorById(id) {
        return AppState.generators.find(g => g.id === id) || null
    }

    /**
     * Check if an upgrade is unlocked
     * @param {string} id - The upgrade ID
     * @returns {boolean} - Whether the upgrade is unlocked
     */
    isUpgradeUnlocked(id) {
        const upgrade = this.getUpgradeById(id)
        return upgrade ? upgrade.unlocked : false
    }

    /**
     * Recalculate snow per second based on generators
     */
    recalculateSnowPerSecond() {
        let total = 0
        AppState.generators.forEach(generator => {
            total += this.getGeneratorProduction(generator)
        })
        AppState.snowPerSecond = total
    }

    /**
     * Create a visual snowflake effect when clicking
     */
    createSnowflakeEffect() {
        // Implementation for visual effects would go here
        // This would typically involve DOM manipulation
    }

    /**
     * Check for clicking frenzy achievement (10 clicks in 5 seconds)
     */
    checkClickingFrenzyAchievement() {
        if (this.clickTimestamps.length >= 10) {
            this.unlockSpecialAchievement('Clicking Frenzy')
        }
    }

    /**
     * Unlock a special achievement by name
     * @param {string} achievementName - The name of the achievement to unlock
     */
    unlockSpecialAchievement(achievementName) {
        const achievement = AppState.achievements.find(a => a.name === achievementName && a.type === 'special')
        if (achievement && !achievement.achieved) {
            achievement.achieved = true
            this.showAchievementNotification(achievement)
        }
    }

    /**
     * Check if any achievements have been unlocked
     */
    checkAchievements() {
        AppState.achievements.forEach(achievement => {
            if (!achievement.achieved) {
                // Skip special achievements as they're handled separately
                if (achievement.type === 'special') return

                let currentValue = 0

                // Get the current value based on achievement type
                switch (achievement.type) {
                    case 'totalSnow':
                        currentValue = AppState.totalSnowEver
                        break
                    case 'totalClicks':
                        currentValue = AppState.totalClicks
                        break
                    case 'generatorsPurchased':
                        currentValue = AppState.generatorsPurchased
                        break
                    case 'snowPerSecond':
                        currentValue = AppState.snowPerSecond
                        break
                    case 'totalTimePlayed':
                        currentValue = AppState.totalTimePlayed
                        break
                    case 'upgradesPurchased':
                        currentValue = AppState.upgradesPurchased
                        break
                }

                // Check if achievement is completed
                if (currentValue >= achievement.requirement) {
                    achievement.achieved = true
                    this.showAchievementNotification(achievement)
                }
            }
        })
    }

    /**
     * Display a notification for an achieved achievement
     * @param {Object} achievement - The achievement that was unlocked
     */
    showAchievementNotification(achievement) {
        // In a real implementation, you might use a notification library
        console.log(`Achievement unlocked: ${achievement.name} - ${achievement.description}`)
        // You could use the Pop utility here if it's set up for notifications
    }

    /**
     * Save the game state
     */
    saveGame() {
        if (!AppState.gameStarted) return

        const gameData = {
            snowAmount: AppState.snowAmount,
            snowPerClick: AppState.snowPerClick,
            snowPerSecond: AppState.snowPerSecond,
            totalSnowEver: AppState.totalSnowEver,
            totalClicks: AppState.totalClicks,
            totalTimePlayed: AppState.totalTimePlayed,
            generatorsPurchased: AppState.generatorsPurchased,
            upgradesPurchased: AppState.upgradesPurchased,
            firstTimePlayer: AppState.firstTimePlayer,

            // Save upgrade data
            upgrades: AppState.upgrades.map(upgrade => ({
                id: upgrade.id,
                currentLevel: upgrade.currentLevel,
                visible: upgrade.visible,
                unlocked: upgrade.unlocked
            })),

            // Save generator data
            generators: AppState.generators.map(generator => ({
                id: generator.id,
                count: generator.count,
                efficiency: generator.efficiency,
                visible: generator.visible,
                unlocked: generator.unlocked
            })),

            // Save achievement data
            achievements: AppState.achievements.map(achievement => ({
                id: achievement.id,
                achieved: achievement.achieved
            }))
        }

        saveState('snowClickerSave', gameData)
        AppState.lastSaved = new Date()
    }

    /**
     * Load the game state
     */
    loadGame() {
        const gameData = loadState('snowClickerSave')

        if (gameData) {
            // Load basic stats
            AppState.snowAmount = gameData.snowAmount || 0
            AppState.snowPerClick = gameData.snowPerClick || 1
            AppState.snowPerSecond = gameData.snowPerSecond || 0
            AppState.totalSnowEver = gameData.totalSnowEver || 0
            AppState.totalClicks = gameData.totalClicks || 0
            AppState.totalTimePlayed = gameData.totalTimePlayed || 0
            AppState.generatorsPurchased = gameData.generatorsPurchased || 0
            AppState.upgradesPurchased = gameData.upgradesPurchased || 0
            AppState.firstTimePlayer = gameData.firstTimePlayer !== undefined ? gameData.firstTimePlayer : true

            // Load upgrades
            if (gameData.upgrades && Array.isArray(gameData.upgrades)) {
                gameData.upgrades.forEach(savedUpgrade => {
                    const upgrade = this.getUpgradeById(savedUpgrade.id)
                    if (upgrade) {
                        upgrade.currentLevel = savedUpgrade.currentLevel || 0
                        upgrade.visible = savedUpgrade.visible !== undefined ? savedUpgrade.visible : true
                        upgrade.unlocked = savedUpgrade.unlocked !== undefined ? savedUpgrade.unlocked : true
                    }
                })
            }

            // Load generators
            if (gameData.generators && Array.isArray(gameData.generators)) {
                gameData.generators.forEach(savedGenerator => {
                    const generator = this.getGeneratorById(savedGenerator.id)
                    if (generator) {
                        generator.count = savedGenerator.count || 0
                        generator.efficiency = savedGenerator.efficiency || 1
                        generator.visible = savedGenerator.visible !== undefined ? savedGenerator.visible : true
                        generator.unlocked = savedGenerator.unlocked !== undefined ? savedGenerator.unlocked : true
                    }
                })
            }

            // Load achievements
            if (gameData.achievements && Array.isArray(gameData.achievements)) {
                gameData.achievements.forEach(savedAchievement => {
                    const achievement = AppState.achievements.find(a => a.id === savedAchievement.id)
                    if (achievement) {
                        achievement.achieved = savedAchievement.achieved || false
                    }
                })
            }

            // Re-apply upgrade effects to ensure state consistency
            AppState.upgrades.forEach(upgrade => {
                if (upgrade.currentLevel > 0) {
                    this.applyUpgradeEffects(upgrade)
                }
            })

            // Recalculate snow per second
            this.recalculateSnowPerSecond()
        }
    }

    /**
     * Reset the game
     */
    resetGame() {
        AppState.snowAmount = 0
        AppState.snowPerClick = 1
        AppState.snowPerSecond = 0
        AppState.totalSnowEver = 0
        AppState.totalClicks = 0
        AppState.totalTimePlayed = 0
        AppState.generatorsPurchased = 0
        AppState.upgradesPurchased = 0

        // Reset upgrades
        AppState.upgrades.forEach(upgrade => {
            upgrade.currentLevel = 0
            upgrade.visible = upgrade.id === 'better-gloves' || upgrade.id === 'snow-shovel' // Only the first two upgrades visible by default
            upgrade.unlocked = upgrade.id === 'better-gloves' || upgrade.id === 'snow-shovel' // Only the first two upgrades unlocked by default
        })

        // Reset generators
        AppState.generators.forEach(generator => {
            generator.count = 0
            generator.efficiency = 1
            generator.visible = generator.id === 'snowball-maker' || generator.id === 'snow-machine' // Only the first two generators visible by default
            generator.unlocked = generator.id === 'snowball-maker' || generator.id === 'snow-machine' // Only the first two generators unlocked by default
        })

        // Reset achievements
        AppState.achievements.forEach(achievement => {
            achievement.achieved = false
        })

        // Save the reset state
        this.saveGame()
    }

    /**
     * Update the leaderboard with current player's score
     * @param {string} playerName - The name of the player
     */
    updateLeaderboard(playerName) {
        const entry = {
            name: playerName,
            totalSnow: AppState.totalSnowEver,
            achievementsCompleted: AppState.achievements.filter(a => a.achieved).length,
            timestamp: new Date().toISOString()
        }

        // Add entry to leaderboard
        AppState.leaderboard.push(entry)

        // Sort leaderboard by total snow
        AppState.leaderboard.sort((a, b) => b.totalSnow - a.totalSnow)

        // Keep only top 10 entries
        if (AppState.leaderboard.length > 10) {
            AppState.leaderboard = AppState.leaderboard.slice(0, 10)
        }

        // Save leaderboard
        saveState('snowClickerLeaderboard', AppState.leaderboard)
    }

    /**
     * Load the leaderboard
     */
    loadLeaderboard() {
        const leaderboard = loadState('snowClickerLeaderboard')
        if (leaderboard && Array.isArray(leaderboard)) {
            AppState.leaderboard = leaderboard
        }
    }
}

export const snowService = new SnowService()