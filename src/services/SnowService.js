import { AppState } from '../AppState.js'
import { saveState, loadState } from './StorageService.js'

class SnowService {
    constructor() {
        // Start the automatic snow generation
        setInterval(this.generatePassiveSnow, 1000)

        // Check achievements every second
        setInterval(this.checkAchievements, 1000)

        // Save game every 30 seconds
        setInterval(this.saveGame, 30000)
    }

    /**
     * Handle clicking to make snow
     */
    makeSnow() {
        AppState.snowAmount += AppState.snowPerClick
        AppState.totalSnowEver += AppState.snowPerClick
        this.checkAchievements()
        this.createSnowflakeEffect()
    }

    /**
     * Generate passive snow income
     */
    generatePassiveSnow() {
        AppState.snowAmount += AppState.snowPerSecond
        AppState.totalSnowEver += AppState.snowPerSecond
    }

    /**
     * Buy an upgrade
     * @param {Object} upgrade - The upgrade to purchase
     */
    buyUpgrade(upgrade) {
        if (AppState.snowAmount >= upgrade.cost && !upgrade.purchased) {
            AppState.snowAmount -= upgrade.cost
            upgrade.purchased = true

            // Apply upgrade effects
            if (upgrade.snowPerClickMultiplier) {
                AppState.snowPerClick *= upgrade.snowPerClickMultiplier
            }

            // Save game after purchase
            this.saveGame()
        }
    }

    /**
     * Buy a generator
     * @param {Object} generator - The generator to purchase
     */
    buyGenerator(generator) {
        const cost = this.calculateGeneratorCost(generator)

        if (AppState.snowAmount >= cost) {
            AppState.snowAmount -= cost
            generator.count++

            // Recalculate snow per second
            this.recalculateSnowPerSecond()

            // Save game after purchase
            this.saveGame()
        }
    }

    /**
     * Calculate the cost of a generator based on how many you already own
     * @param {Object} generator - The generator to calculate cost for
     * @returns {number} - The current cost
     */
    calculateGeneratorCost(generator) {
        return Math.floor(generator.baseCost * Math.pow(1.15, generator.count))
    }

    /**
     * Recalculate snow per second based on generators
     */
    recalculateSnowPerSecond() {
        let total = 0
        AppState.generators.forEach(generator => {
            total += generator.snowPerSecond * generator.count
        })
        AppState.snowPerSecond = total
    }

    /**
     * Create a visual snowflake effect when clicking
     */
    createSnowflakeEffect() {
        // This would be implemented with DOM manipulation
        // For simplicity, we'll leave the implementation details out for now
    }

    /**
     * Check if any achievements have been unlocked
     */
    checkAchievements() {
        AppState.achievements.forEach(achievement => {
            if (!achievement.achieved) {
                if (achievement.type === 'totalSnow' && AppState.totalSnowEver >= achievement.requirement) {
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
        const gameData = {
            snowAmount: AppState.snowAmount,
            snowPerClick: AppState.snowPerClick,
            snowPerSecond: AppState.snowPerSecond,
            totalSnowEver: AppState.totalSnowEver,
            upgrades: AppState.upgrades,
            generators: AppState.generators,
            achievements: AppState.achievements
        }

        saveState('snowClickerSave', gameData)
    }

    /**
     * Load the game state
     */
    loadGame() {
        const gameData = loadState('snowClickerSave')

        if (gameData) {
            AppState.snowAmount = gameData.snowAmount
            AppState.snowPerClick = gameData.snowPerClick
            AppState.snowPerSecond = gameData.snowPerSecond
            AppState.totalSnowEver = gameData.totalSnowEver

            // Update upgrades
            gameData.upgrades.forEach((savedUpgrade, index) => {
                if (index < AppState.upgrades.length) {
                    AppState.upgrades[index].purchased = savedUpgrade.purchased
                }
            })

            // Update generators
            gameData.generators.forEach((savedGenerator, index) => {
                if (index < AppState.generators.length) {
                    AppState.generators[index].count = savedGenerator.count
                }
            })

            // Update achievements
            gameData.achievements.forEach((savedAchievement, index) => {
                if (index < AppState.achievements.length) {
                    AppState.achievements[index].achieved = savedAchievement.achieved
                }
            })
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

        // Reset upgrades
        AppState.upgrades.forEach(upgrade => {
            upgrade.purchased = false
        })

        // Reset generators
        AppState.generators.forEach(generator => {
            generator.count = 0
        })

        // Reset achievements
        AppState.achievements.forEach(achievement => {
            achievement.achieved = false
        })

        // Save the reset state
        this.saveGame()
    }
}

export const snowService = new SnowService()