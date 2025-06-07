// API utility functions for Holy Bless - Divine Wisdom Generator

class ApiService {
    constructor() {
        this.baseURL = 'https://api.quotable.io';
        this.localPassagesURL = './data/passages.json';
        this.localData = null;
        this.localPassages = [];
        this.sources = [];
        this.categories = [];
        this.isLoaded = false;
        this.loadingPromise = null;
        
        // Initialize local passages
        this.init();
    }

    /**
     * Initialize the API service
     */
    async init() {
        if (!this.loadingPromise) {
            this.loadingPromise = this.loadLocalPassages();
        }
        return this.loadingPromise;
    }

    /**
     * Load local passages from JSON file
     * @returns {Promise<boolean>} Success status
     */
    async loadLocalPassages() {
        try {
            console.log('Loading local passages...');
            const response = await fetch(this.localPassagesURL);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            this.localData = await response.json();
            this.localPassages = this.localData.passages || [];
            this.sources = this.localData.sources || [];
            this.categories = this.localData.categories || [];
            this.isLoaded = true;
            
            console.log(`✅ Loaded ${this.localPassages.length} passages from ${this.sources.length} sources`);
            console.log(`📚 Available sources:`, this.sources);
            console.log(`🏷️ Available categories:`, this.categories.length);
            
            return true;
        } catch (error) {
            console.warn('❌ Could not load local passages:', error.message);
            this.localPassages = this.getFallbackPassages();
            this.isLoaded = false;
            return false;
        }
    }

    /**
     * Get fallback passages when local file fails to load
     * @returns {Array} Array of fallback passages
     */
    getFallbackPassages() {
        return [
            {
                text: "The present moment is the only time over which we have dominion.",
                id: 1,
                source: "Thích Nhất Hạnh",
                category: "mindfulness",
                tags: ["present", "awareness", "meditation"]
            },
            {
                text: "Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it.",
                id: 2,
                source: "Rumi",
                category: "love",
                tags: ["love", "self-discovery", "barriers"]
            },
            {
                text: "The only way to make sense out of change is to plunge into it, move with it, and join the dance.",
                id: 3,
                source: "Alan Watts",
                category: "change",
                tags: ["change", "acceptance", "flow"]
            },
            {
                text: "Peace comes from within. Do not seek it without.",
                id: 4,
                source: "Buddha",
                category: "peace",
                tags: ["peace", "inner-wisdom", "meditation"]
            },
            {
                text: "You are the creator of your own reality, and life can show up no other way for you than that way in which you think it will.",
                id: 5,
                source: "Conversations with God",
                category: "creation",
                tags: ["reality", "creation", "thoughts", "manifestation"]
            }
        ];
    }

    /**
     * Ensure local passages are loaded before proceeding
     * @returns {Promise<void>}
     */
    async ensureLoaded() {
        if (!this.isLoaded && !this.loadingPromise) {
            await this.init();
        } else if (this.loadingPromise) {
            await this.loadingPromise;
        }
    }

    /**
     * Get a random passage from local collection
     * @param {Object} filters - Filter options
     * @returns {Promise<Object>} Passage object
     */
    async getLocalPassage(filters = {}) {
        await this.ensureLoaded();
        
        if (!this.localPassages || this.localPassages.length === 0) {
            return this.getFallbackQuote();
        }

        let filteredPassages = [...this.localPassages];

        // Apply filters
        if (filters.source) {
            filteredPassages = filteredPassages.filter(p => 
                p.source.toLowerCase().includes(filters.source.toLowerCase())
            );
        }

        if (filters.category) {
            filteredPassages = filteredPassages.filter(p => 
                p.category === filters.category
            );
        }

        if (filters.tags && Array.isArray(filters.tags)) {
            filteredPassages = filteredPassages.filter(p => 
                p.tags && p.tags.some(tag => filters.tags.includes(tag))
            );
        }

        if (filters.id) {
            const specificPassage = filteredPassages.find(p => p.id === filters.id);
            if (specificPassage) {
                return {
                    content: specificPassage.text,
                    author: specificPassage.source,
                    tags: specificPassage.tags || [],
                    category: specificPassage.category,
                    id: specificPassage.id,
                    source: 'local'
                };
            }
        }

        // Return random passage from filtered results
        if (filteredPassages.length === 0) {
            console.warn('No passages found with filters:', filters);
            filteredPassages = this.localPassages; // Fallback to all passages
        }

        const randomIndex = Math.floor(Math.random() * filteredPassages.length);
        const selectedPassage = filteredPassages[randomIndex];
        
        return {
            content: selectedPassage.text,
            author: selectedPassage.source,
            tags: selectedPassage.tags || [],
            category: selectedPassage.category,
            id: selectedPassage.id,
            source: 'local'
        };
    }

    /**
     * Fetch a random quote from external API
     * @param {Object} options - Query parameters
     * @returns {Promise<Object>} Quote object
     */
    async getRandomQuote(options = {}) {
        try {
            const params = new URLSearchParams({
                minLength: options.minLength || 50,
                maxLength: options.maxLength || 300,
                ...options
            });

            const response = await fetch(`${this.baseURL}/random?${params}`);
            
            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }
            
            const quote = await response.json();
            
            return {
                content: quote.content,
                author: quote.author,
                tags: quote.tags || [],
                category: 'external',
                id: quote._id,
                source: 'api'
            };
        } catch (error) {
            console.warn('External API request failed:', error.message);
            throw error;
        }
    }

    /**
     * Get passage with preference for local, fallback to API
     * @param {Object} options - Options for fetching
     * @returns {Promise<Object>} Passage object
     */
    async getPassage(options = {}) {
        // Always try local first for consistency
        if (options.preferLocal !== false) {
            try {
                return await this.getLocalPassage(options);
            } catch (error) {
                console.warn('Local passage failed, trying API:', error);
            }
        }

        // Try external API if online and not preferring local
        if (navigator.onLine && options.preferLocal !== true) {
            try {
                return await this.getRandomQuote(options);
            } catch (error) {
                console.warn('API failed, falling back to local:', error);
                return await this.getLocalPassage(options);
            }
        }

        // Final fallback
        return await this.getLocalPassage(options);
    }

    /**
     * Get passages by source
     * @param {string} source - Source name
     * @returns {Promise<Array>} Array of passages
     */
    async getPassagesBySource(source) {
        await this.ensureLoaded();
        
        return this.localPassages.filter(passage => 
            passage.source.toLowerCase().includes(source.toLowerCase())
        ).map(passage => ({
            content: passage.text,
            author: passage.source,
            tags: passage.tags || [],
            category: passage.category,
            id: passage.id,
            source: 'local'
        }));
    }

    /**
     * Get passages by category
     * @param {string} category - Category name
     * @returns {Promise<Array>} Array of passages
     */
    async getPassagesByCategory(category) {
        await this.ensureLoaded();
        
        return this.localPassages.filter(passage => 
            passage.category === category
        ).map(passage => ({
            content: passage.text,
            author: passage.source,
            tags: passage.tags || [],
            category: passage.category,
            id: passage.id,
            source: 'local'
        }));
    }

    /**
     * Get passages by tags
     * @param {Array} tags - Array of tag names
     * @returns {Promise<Array>} Array of passages
     */
    async getPassagesByTags(tags) {
        await this.ensureLoaded();
        
        return this.localPassages.filter(passage =>
            passage.tags && passage.tags.some(tag => tags.includes(tag))
        ).map(passage => ({
            content: passage.text,
            author: passage.source,
            tags: passage.tags || [],
            category: passage.category,
            id: passage.id,
            source: 'local'
        }));
    }

    /**
     * Search passages by text content
     * @param {string} searchTerm - Search term
     * @returns {Promise<Array>} Array of matching passages
     */
    async searchPassages(searchTerm) {
        await this.ensureLoaded();
        
        const term = searchTerm.toLowerCase();
        return this.localPassages.filter(passage =>
            passage.text.toLowerCase().includes(term) ||
            passage.source.toLowerCase().includes(term) ||
            (passage.tags && passage.tags.some(tag => tag.toLowerCase().includes(term)))
        ).map(passage => ({
            content: passage.text,
            author: passage.source,
            tags: passage.tags || [],
            category: passage.category,
            id: passage.id,
            source: 'local'
        }));
    }

    /**
     * Get available sources
     * @returns {Promise<Array>} Array of source names
     */
    async getSources() {
        await this.ensureLoaded();
        return [...this.sources];
    }

    /**
     * Get available categories
     * @returns {Promise<Array>} Array of category names
     */
    async getCategories() {
        await this.ensureLoaded();
        return [...this.categories];
    }

    /**
     * Get all available tags
     * @returns {Promise<Array>} Array of unique tags
     */
    async getTags() {
        await this.ensureLoaded();
        
        const allTags = new Set();
        this.localPassages.forEach(passage => {
            if (passage.tags) {
                passage.tags.forEach(tag => allTags.add(tag));
            }
        });
        return Array.from(allTags).sort();
    }

    /**
     * Get statistics about the passage collection
     * @returns {Promise<Object>} Statistics object
     */
    async getStats() {
        await this.ensureLoaded();
        
        const stats = {
            totalPassages: this.localPassages.length,
            totalSources: this.sources.length,
            totalCategories: this.categories.length,
            totalTags: (await this.getTags()).length,
            version: this.localData?.version || 'unknown',
            lastUpdated: this.localData?.lastUpdated || 'unknown'
        };

        // Count passages per source
        const sourceStats = {};
        this.localPassages.forEach(passage => {
            sourceStats[passage.source] = (sourceStats[passage.source] || 0) + 1;
        });
        stats.passagesPerSource = sourceStats;

        // Count passages per category
        const categoryStats = {};
        this.localPassages.forEach(passage => {
            categoryStats[passage.category] = (categoryStats[passage.category] || 0) + 1;
        });
        stats.passagesPerCategory = categoryStats;

        return stats;
    }

    /**
     * Get a random passage for daily quote
     * @returns {Promise<Object>} Daily passage object
     */
    async getDailyPassage() {
        // Use date as seed for consistent daily quote
        const today = new Date().toDateString();
        const seed = this.hashCode(today);
        
        await this.ensureLoaded();
        
        if (this.localPassages.length === 0) {
            return this.getFallbackQuote();
        }
        
        const index = Math.abs(seed) % this.localPassages.length;
        const passage = this.localPassages[index];
        
        return {
            content: passage.text,
            author: passage.source,
            tags: passage.tags || [],
            category: passage.category,
            id: passage.id,
            source: 'local',
            isDaily: true
        };
    }

    /**
     * Simple hash function for consistent daily quotes
     * @param {string} str - String to hash
     * @returns {number} Hash value
     */
    hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash;
    }

    /**
     * Get fallback quote when everything else fails
     * @returns {Object} Fallback quote object
     */
    getFallbackQuote() {
        const fallbacks = this.getFallbackPassages();
        const randomIndex = Math.floor(Math.random() * fallbacks.length);
        const passage = fallbacks[randomIndex];
        
        return {
            content: passage.text,
            author: passage.source,
            tags: passage.tags || [],
            category: passage.category,
            id: passage.id,
            source: 'fallback'
        };
    }

    /**
     * Check if the service is ready
     * @returns {boolean} Ready status
     */
    isReady() {
        return this.isLoaded && this.localPassages.length > 0;
    }

    /**
     * Get service status
     * @returns {Object} Status object
     */
    getStatus() {
        return {
            isLoaded: this.isLoaded,
            passagesCount: this.localPassages.length,
            sourcesCount: this.sources.length,
            categoriesCount: this.categories.length,
            isOnline: navigator.onLine,
            version: this.localData?.version || 'unknown'
        };
    }
}

// Export singleton instance
const apiService = new ApiService();

// For ES6 modules
export default apiService;

// For CommonJS
if (typeof module !== 'undefined' && module.exports) {
    module.exports = apiService;
}

// For browser global
if (typeof window !== 'undefined') {
    window.ApiService = ApiService;
    window.apiService = apiService;
}
