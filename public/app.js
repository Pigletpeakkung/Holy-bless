// Holy Bless - Divine Wisdom Generator
// Main Application Logic

class HolyBlissApp {
    constructor() {
        this.quotes = [];
        this.currentQuote = null;
        this.stats = {
            totalQuotes: 0,
            quotesRead: 0,
            favoriteCount: 0
        };
        this.init();
    }

    init() {
        this.loadStats();
        this.setupEventListeners();
        this.setGreeting();
        this.loadDailyQuote();
        this.loadSavedReflection();
    }

    setupEventListeners() {
        // Theme selector
        const themeSelector = document.getElementById('themeSelector');
        if (themeSelector) {
            themeSelector.addEventListener('change', (e) => this.setTheme(e.target.value));
        }

        // Source filter
        const sourceFilter = document.getElementById('sourceFilter');
        if (sourceFilter) {
            sourceFilter.addEventListener('change', (e) => this.filterBySource(e.target.value));
        }

        // Star button
        const starButton = document.getElementById('starButton');
        if (starButton) {
            starButton.addEventListener('click', () => this.generatePassage());
        }

        // Load saved theme
        const savedTheme = localStorage.getItem('selectedTheme') || 'theme-ocean';
        this.setTheme(savedTheme);
        if (themeSelector) {
            themeSelector.value = savedTheme;
        }
    }

    setGreeting() {
        const greetingElement = document.getElementById('greetingMessage');
        if (!greetingElement) return;

        const currentHour = new Date().getHours();
        let greeting;

        if (currentHour < 6) {
            greeting = "🌙 Good night, seeker of wisdom";
        } else if (currentHour < 12) {
            greeting = "🌅 Good morning, beautiful soul";
        } else if (currentHour < 17) {
            greeting = "☀️ Good afternoon, divine being";
        } else if (currentHour < 21) {
            greeting = "🌆 Good evening, light worker";
        } else {
            greeting = "✨ Good night, cosmic traveler";
        }

        greetingElement.textContent = greeting;
    }

    async loadDailyQuote() {
        const today = new Date().toDateString();
        const savedQuote = JSON.parse(localStorage.getItem('dailyQuote'));

        // Check if we already have a quote for today
        if (savedQuote && savedQuote.date === today) {
            this.displayQuote(savedQuote.quote, savedQuote.author);
        } else {
            await this.fetchRandomQuote();
        }
    }

    async fetchRandomQuote() {
        try {
            this.showLoading();
            
            // Try to fetch from Quotable API
            const response = await axios.get('https://api.quotable.io/random', {
                params: {
                    minLength: 50,
                    maxLength: 300
                }
            });

            const quote = response.data;
            this.displayQuote(quote.content, quote.author);
            
            // Save the daily quote
            const today = new Date().toDateString();
            localStorage.setItem('dailyQuote', JSON.stringify({
                date: today,
                quote: quote.content,
                author: quote.author
            }));

            this.updateStats('quotesRead');
            
        } catch (error) {
            console.error('Error fetching quote:', error);
            this.displayFallbackQuote();
        }
    }

    displayQuote(text, author) {
        const quoteTextElement = document.getElementById('quoteText');
        const quoteAuthorElement = document.getElementById('quoteAuthor');

        if (quoteTextElement && quoteAuthorElement) {
            // Add fade-in animation
            const blockquote = document.getElementById('dailyQuoteContent');
            if (blockquote) {
                blockquote.classList.add('fade-in');
            }

            quoteTextElement.textContent = text;
            quoteAuthorElement.textContent = `— ${author}`;
            
            this.currentQuote = { text, author };
        }
    }

    displayFallbackQuote() {
        const fallbackQuotes = [
            {
                text: "The present moment is the only time over which we have dominion.",
                author: "Thích Nhất Hạnh"
            },
            {
                text: "Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it.",
                author: "Rumi"
            },
            {
                text: "The only way to make sense out of change is to plunge into it, move with it, and join the dance.",
                author: "Alan Watts"
            },
            {
                text: "Peace comes from within. Do not seek it without.",
                author: "Buddha"
            }
        ];

        const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        this.displayQuote(randomQuote.text, randomQuote.author);
        
        this.showNotification("Using offline wisdom while connecting to the universe...", "info");
    }

    showLoading() {
        const quoteTextElement = document.getElementById('quoteText');
        if (quoteTextElement) {
            quoteTextElement.innerHTML = '<span class="loading"></span> Receiving divine wisdom...';
        }
    }

    setTheme(theme) {
        document.body.className = theme;
        localStorage.setItem('selectedTheme', theme);
        
        // Update CSS custom properties based on theme
        const root = document.documentElement;
        
        switch(theme) {
            case 'theme-sunset':
                root.style.setProperty('--primary-color', '#f093fb');
                root.style.setProperty('--secondary-color', '#f5576c');
                break;
            case 'theme-forest':
                root.style.setProperty('--primary-color', '#4ecdc4');
                root.style.setProperty('--secondary-color', '#44a08d');
                break;
            case 'theme-cosmic':
                root.style.setProperty('--primary-color', '#3498db');
                root.style.setProperty('--secondary-color', '#2c3e50');
                break;
            default: // ocean
                root.style.setProperty('--primary-color', '#667eea');
                root.style.setProperty('--secondary-color', '#764ba2');
        }
    }

    filterBySource(source) {
        // This would be implemented when you have a local quotes database
        console.log(`Filtering by source: ${source}`);
        this.showNotification(`Filtering wisdom from ${source}`, "info");
    }

    generatePassage() {
        this.fetchRandomQuote();
        this.updateStats('totalQuotes');
        
        // Add button animation
        const starButton = document.getElementById('starButton');
        if (starButton) {
            starButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                starButton.style.transform = '';
            }, 150);
        }
    }

    saveReflection() {
        const reflectionText = document.getElementById('userReflection');
        if (!reflectionText || !reflectionText.value.trim()) {
            this.showNotification("Please write your reflection first", "warning");
            return;
        }

        const reflection = {
            text: reflectionText.value.trim(),
            quote: this.currentQuote,
            date: new Date().toISOString(),
            id: Date.now()
        };

        // Get existing reflections
        const existingReflections = JSON.parse(localStorage.getItem('userReflections') || '[]');
        existingReflections.push(reflection);
        
        // Save to localStorage
        localStorage.setItem('userReflections', JSON.stringify(existingReflections));
        localStorage.setItem('currentReflection', reflectionText.value);
        
        this.showNotification('Your reflection has been saved to your heart and soul ✨', "success");
        reflectionText.value = '';
    }

    loadSavedReflection() {
        const savedReflection = localStorage.getItem('currentReflection');
        const reflectionTextarea = document.getElementById('userReflection');
        
        if (savedReflection && reflectionTextarea) {
            reflectionTextarea.value = savedReflection;
        }
    }

    updateStats(statType) {
        this.stats[statType]++;
        localStorage.setItem('appStats', JSON.stringify(this.stats));
        this.displayStats();
    }

    loadStats() {
        const savedStats = localStorage.getItem('appStats');
        if (savedStats) {
            this.stats = { ...this.stats, ...JSON.parse(savedStats) };
        }
        this.displayStats();
    }

    displayStats() {
        const totalQuotesElement = document.getElementById('totalQuotes');
        const quotesReadElement = document.getElementById('quotesRead');
        const favoriteCountElement = document.getElementById('favoriteCount');

        if (totalQuotesElement) totalQuotesElement.textContent = this.stats.totalQuotes;
        if (quotesReadElement) quotesReadElement.textContent = this.stats.quotesRead;
        if (favoriteCountElement) favoriteCountElement.textContent = this.stats.favoriteCount;
    }

    showNotification(message, type = "success") {
        if (typeof Toastify !== 'undefined') {
            const colors = {
                success: "linear-gradient(to right, #00b09b, #96c93d)",
                error: "linear-gradient(to right, #ff5f6d, #ffc371)",
                warning: "linear-gradient(to right, #f7971e, #ffd200)",
                info: "linear-gradient(to right, #667eea, #764ba2)"
            };

            Toastify({
                text: message,
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                backgroundColor: colors[type] || colors.success,
                stopOnFocus: true,
                onClick: function() {
                    this.hideToast();
                }
            }).showToast();
        } else {
            // Fallback to alert if Toastify is not available
            alert(message);
        }
    }

    // Method to export user data
    exportUserData() {
        const userData = {
            stats: this.stats,
            reflections: JSON.parse(localStorage.getItem('userReflections') || '[]'),
            theme: localStorage.getItem('selectedTheme'),
            exportDate: new Date().toISOString()
        };

        const dataStr = JSON.stringify(userData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'holy-bless-data.json';
        link.click();
        
        this.showNotification('Your spiritual journey data has been exported ✨', "success");
    }
}

// Global functions for HTML onclick events
function saveReflection() {
    if (window.holyBlissApp) {
        window.holyBlissApp.saveReflection();
    }
}

function generatePassage() {
    if (window.holyBlissApp) {
        window.holyBlissApp.generatePassage();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.holyBlissApp = new HolyBlissApp();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Space bar to generate new quote
        if (e.code === 'Space' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            generatePassage();
        }
        
        // Ctrl/Cmd + S to save reflection
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            saveReflection();
        }
    });
});

// Service Worker registration for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}
