// Local storage utility functions for Holy Bless - Divine Wisdom Generator

class StorageService {
    constructor() {
        this.prefix = 'holyBless_';
        this.version = '1.0';
    }

    /**
     * Get item from localStorage with error handling
     * @param {string} key - Storage key
     * @param {*} defaultValue - Default value if key doesn't exist
     * @returns {*} Stored value or default
     */
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(this.prefix + key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error(`Error reading from localStorage (${key}):`, error);
            return defaultValue;
        }
    }

    /**
     * Set item in localStorage with error handling
     * @param {string} key - Storage key
     * @param {*} value - Value to store
     * @returns {boolean} Success status
     */
    set(key, value) {
        try {
            localStorage.setItem(this.prefix + key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error(`Error writing to localStorage (${key}):`, error);
            return false;
        }
    }

    /**
     * Remove item from localStorage
     * @param {string} key - Storage key
     * @returns {boolean} Success status
     */
    remove(key) {
        try {
            localStorage.removeItem(this.prefix + key);
            return true;
        } catch (error) {
            console.error(`Error removing from localStorage (${key}):`, error);
            return false;
        }
    }

    /**
     * Clear all app-related data from localStorage
     * @returns {boolean} Success status
     */
    clear() {
        try {
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith(this.prefix)) {
                    localStorage.removeItem(key);
                }
            });
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }

    /**
     * Get user preferences
     * @returns {Object} User preferences
     */
    getPreferences() {
        return this.get('preferences', {
            theme: 'theme-ocean',
            notifications: true,
            autoSave: true,
            fontSize: 'medium',
            language: 'en'
        });
    }

    /**
     * Save user preferences
     * @param {Object} preferences - User preferences
     * @returns {boolean} Success status
     */
    setPreferences(preferences) {
        const current = this.getPreferences();
        return this.set('preferences', { ...current, ...preferences });
    }

    /**
     * Get user statistics
     * @returns {Object} User statistics
     */
    getStats() {
        return this.get('stats', {
            totalQuotes: 0,
            quotesRead: 0,
            favoriteCount: 0,
            reflectionsCount: 0,
            daysActive: 0,
            lastVisit: null,
            firstVisit: new Date().toISOString()
        });
    }

    /**
     * Update user statistics
     * @param {Object} stats - Statistics to update
     * @returns {boolean} Success status
     */
    updateStats(stats) {
        const current = this.getStats();
        return this.set('stats', { ...current, ...stats });
    }

    /**
     * Get daily quote
     * @returns {Object|null} Daily quote object
     */
    getDailyQuote() {
        const today = new Date().toDateString();
        const dailyQuote = this.get('dailyQuote');
        
        if (dailyQuote && dailyQuote.date === today) {
            return dailyQuote;
        }
        return null;
    }

    /**
     * Save daily quote
     * @param {Object} quote - Quote object
     * @returns {boolean} Success status
     */
    setDailyQuote(quote) {
        return this.set('dailyQuote', {
            ...quote,
            date: new Date().toDateString()
        });
    }

    /**
     * Get user reflections
     * @returns {Array} Array of reflections
     */
    getReflections() {
        return this.get('reflections', []);
    }

    /**
     * Add a new reflection
     * @param {Object} reflection - Reflection object
     * @returns {boolean} Success status
     */
    addReflection(reflection) {
        const reflections = this.getReflections();
        const newReflection = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            ...reflection
        };
        reflections.push(newReflection);
        return this.set('reflections', reflections);
    }

    /**
     * Get favorite quotes
     * @returns {Array} Array of favorite quotes
     */
    getFavorites() {
        return this.get('favorites', []);
    }

    /**
     * Add quote to favorites
     * @param {Object} quote - Quote object
     * @returns {boolean} Success status
     */
    addToFavorites(quote) {
        const favorites = this.getFavorites();
        const exists = favorites.some(fav => 
            fav.content === quote.content && fav.author === quote.author
        );
        
        if (!exists) {
            favorites.push({
                ...quote,
                id: Date.now(),
                addedAt: new Date().toISOString()
            });
            return this.set('favorites', favorites);
        }
        return false;
    }

    /**
     * Remove quote from favorites
     * @param {number} id - Quote ID
     * @returns {boolean} Success status
     */
    removeFromFavorites(id) {
        const favorites = this.getFavorites();
        const filtered = favorites.filter(fav => fav.id !== id);
        return this.set('favorites', filtered);
    }

    /**
     * Export all user data
     * @returns {Object} All user data
     */
    exportData() {
        return {
            version: this.version,
            exportDate: new Date().toISOString(),
            preferences: this.getPreferences(),
            stats: this.getStats(),
            reflections: this.getReflections(),
            favorites: this.getFavorites(),
            dailyQuote: this.get('dailyQuote')
        };
    }

    /**
     * Import user data
     * @param {Object} data - Data to import
     * @returns {boolean} Success status
     */
    importData(data) {
        try {
            if (data.preferences) this.setPreferences(data.preferences);
            if (data.stats) this.set('stats', data.stats);
            if (data.reflections) this.set('reflections', data.reflections);
            if (data.favorites) this.set('favorites', data.favorites);
            if (data.dailyQuote) this.set('dailyQuote', data.dailyQuote);
            return true;
        } catch (error) {
            console.error('Error importing data:', error);
            return false;
        }
    }

    /**
     * Check if localStorage is available
     * @returns {boolean} Availability status
     */
    isAvailable() {
        try {
            const test = '__localStorage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Get storage usage information
     * @returns {Object} Storage usage info
     */
    getStorageInfo() {
        if (!this.isAvailable()) {
            return { available: false };
        }

        let totalSize = 0;
        let appSize = 0;
        
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                const size = localStorage[key].length;
                totalSize += size;
                if (key.startsWith(this.prefix)) {
                    appSize += size;
                }
            }
        }

        return {
            available: true,
            totalSize: totalSize,
            appSize: appSize,
            totalSizeKB: (totalSize / 1024).toFixed(2),
            appSizeKB: (appSize / 1024).toFixed(2)
        };
    }
}

// Export singleton instance
const storageService = new StorageService();
export default storageService;

// For non-module environments
if (typeof window !== 'undefined') {
    window.StorageService = StorageService;
    window.storageService = storageService;
}
