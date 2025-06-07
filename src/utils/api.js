// API utility functions for Holy Bless - Divine Wisdom Generator

class ApiService {
    constructor() {
        this.baseURL = 'https://api.quotable.io';
        this.fallbackQuotes = [
            {
                content: "The present moment is the only time over which we have dominion.",
                author: "Thích Nhất Hạnh",
                tags: ["mindfulness", "present"]
            },
            {
                content: "Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it.",
                author: "Rumi",
                tags: ["love", "self-discovery"]
            },
            {
                content: "The only way to make sense out of change is to plunge into it, move with it, and join the dance.",
                author: "Alan Watts",
                tags: ["change", "acceptance"]
            },
            {
                content: "Peace comes from within. Do not seek it without.",
                author: "Buddha",
                tags: ["peace", "inner-wisdom"]
            },
            {
                content: "Be yourself; everyone else is already taken.",
                author: "Oscar Wilde",
                tags: ["authenticity", "self"]
            },
            {
                content: "The way is not in the sky. The way is in the heart.",
                author: "Buddha",
                tags: ["path", "heart"]
            },
            {
                content: "Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present.",
                author: "Bill Keane",
                tags: ["present", "gratitude"]
            },
            {
                content: "The soul becomes dyed with the color of its thoughts.",
                author: "Marcus Aurelius",
                tags: ["thoughts", "soul"]
            }
        ];
    }

    /**
     * Fetch a random quote from the API
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

            const response = await axios.get(`${this.baseURL}/random?${params}`);
            
            if (response.data) {
                return {
                    content: response.data.content,
                    author: response.data.author,
                    tags: response.data.tags || [],
                    source: 'api'
                };
            }
        } catch (error) {
            console.warn('API request failed, using fallback quote:', error.message);
            return this.getFallbackQuote();
        }
    }

    /**
     * Get a random fallback quote when API is unavailable
     * @returns {Object} Quote object
     */
    getFallbackQuote() {
        const randomIndex = Math.floor(Math.random() * this.fallbackQuotes.length);
        return {
            ...this.fallbackQuotes[randomIndex],
            source: 'fallback'
        };
    }

    /**
     * Search quotes by author
     * @param {string} author - Author name
     * @returns {Promise<Array>} Array of quotes
     */
    async getQuotesByAuthor(author) {
        try {
            const response = await axios.get(`${this.baseURL}/quotes`, {
                params: { author }
            });
            return response.data.results || [];
        } catch (error) {
            console.error('Error fetching quotes by author:', error);
            return this.fallbackQuotes.filter(quote => 
                quote.author.toLowerCase().includes(author.toLowerCase())
            );
        }
    }

    /**
     * Search quotes by tags
     * @param {string} tags - Comma-separated tags
     * @returns {Promise<Array>} Array of quotes
     */
    async getQuotesByTags(tags) {
        try {
            const response = await axios.get(`${this.baseURL}/quotes`, {
                params: { tags }
            });
            return response.data.results || [];
        } catch (error) {
            console.error('Error fetching quotes by tags:', error);
            return this.fallbackQuotes.filter(quote =>
                quote.tags.some(tag => tags.includes(tag))
            );
        }
    }

    /**
     * Get list of available authors
     * @returns {Promise<Array>} Array of authors
     */
    async getAuthors() {
        try {
            const response = await axios.get(`${this.baseURL}/authors`);
            return response.data.results || [];
        } catch (error) {
            console.error('Error fetching authors:', error);
            return [...new Set(this.fallbackQuotes.map(quote => quote.author))];
        }
    }

    /**
     * Get list of available tags
     * @returns {Promise<Array>} Array of tags
     */
    async getTags() {
        try {
            const response = await axios.get(`${this.baseURL}/tags`);
            return response.data || [];
        } catch (error) {
            console.error('Error fetching tags:', error);
            return [...new Set(this.fallbackQuotes.flatMap(quote => quote.tags))];
        }
    }
}

// Export singleton instance
const apiService = new ApiService();
export default apiService;

// For non-module environments
if (typeof window !== 'undefined') {
    window.ApiService = ApiService;
    window.apiService = apiService;
}
