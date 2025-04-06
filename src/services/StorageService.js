// services/StorageService.js

/**
 * Save data to local storage
 * @param {string} key - The key to save under
 * @param {any} data - The data to save
 */
export function saveState(key, data) {
    try {
        const serializedData = JSON.stringify(data)
        localStorage.setItem(key, serializedData)
        console.log('Game saved successfully')
    } catch (error) {
        console.error('Failed to save game:', error)
    }
}

/**
 * Load data from local storage
 * @param {string} key - The key to load from
 * @returns {any} - The loaded data, or null if not found
 */
export function loadState(key) {
    try {
        const serializedData = localStorage.getItem(key)
        if (serializedData === null) {
            return null
        }
        return JSON.parse(serializedData)
    } catch (error) {
        console.error('Failed to load game:', error)
        return null
    }
}

/**
 * Clear data from local storage
 * @param {string} key - The key to clear
 */
export function clearState(key) {
    try {
        localStorage.removeItem(key)
        console.log('Game data cleared')
    } catch (error) {
        console.error('Failed to clear game data:', error)
    }
}