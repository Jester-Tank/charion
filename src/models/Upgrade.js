// models/Upgrade.js
/**
 * Upgrade model for Snow Clicker game
 * This model provides structure for all game upgrades
 */
export class Upgrade {
    constructor(data = {}) {
        this.id = data.id || Math.random().toString(36).substring(2, 9)
        this.name = data.name || 'New Upgrade'
        this.description = data.description || 'This upgrade does something cool.'
        this.cost = data.cost || 10
        this.costMultiplier = data.costMultiplier || 1.5 // For upgrades that can be purchased multiple times
        this.maxLevel = data.maxLevel || 1 // Default to one-time purchase
        this.currentLevel = data.currentLevel || 0
        this.visible = data.visible !== undefined ? data.visible : true
        this.unlocked = data.unlocked !== undefined ? data.unlocked : true
        this.category = data.category || 'general' // general, click, production, special
        this.icon = data.icon || '🔧'

        // Effects
        this.effects = data.effects || {}
        // Possible effects:
        // - snowPerClickMultiplier: Multiply snow per click
        // - snowPerClickAdd: Add flat amount to snow per click
        // - generatorEfficiencyMultiplier: Multiply all generators' output
        // - specificGeneratorMultiplier: Multiply specific generator's output
        // - unlockGenerator: Unlock a specific generator
        // - unlockUpgrade: Unlock another upgrade
        // - specialEffect: String identifier for special effects
    }
}