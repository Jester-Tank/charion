// models/Generator.js
/**
 * Generator model for Snow Clicker game
 * This model provides structure for all snow generators
 */
export class Generator {
    constructor(data = {}) {
        this.id = data.id || Math.random().toString(36).substring(2, 9)
        this.name = data.name || 'New Generator'
        this.description = data.description || 'Produces snow automatically.'
        this.baseCost = data.baseCost || 10
        this.costMultiplier = data.costMultiplier || 1.15
        this.baseProduction = data.baseProduction || 1
        this.count = data.count || 0
        this.efficiency = data.efficiency || 1 // Can be modified by upgrades
        this.visible = data.visible !== undefined ? data.visible : true
        this.unlocked = data.unlocked !== undefined ? data.unlocked : true
        this.category = data.category || 'basic' // basic, intermediate, advanced
        this.icon = data.icon || '❄️'

        // Special properties
        this.specialEffects = data.specialEffects || []
    }
}