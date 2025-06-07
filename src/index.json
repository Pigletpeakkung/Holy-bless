// Main entry point for Holy Bless - Divine Wisdom Generator
// This file initializes the application and coordinates all modules

import apiService from './utils/api.js';
import storageService from './utils/storage.js';
import * as helpers from './utils/helpers.js';

/**
 * Main Application Class
 */
class HolyBlissApp {
    constructor() {
        this.isInitialized = false;
        this.currentQuote = null;
        this.userStats = null;
        this.preferences = null;
        this.reflectionTimeout = null;
        
        // Bind methods to preserve context
        this.init = this.init.bind(this);
        this.handleStarClick = this.handleStarClick.bind(this);
        this.handleKeyboardShortcuts = this.handleKeyboardShortcuts.bind(this);
        this.handleReflectionInput = this.handleReflectionInput.bind(this);
        this.updateStats = this.updateStats.bind(this);
        
        console.log('🌟 Holy Bless App initialized');
    }

    /**
     * Initialize the application
     */
    async init() {
        try {
            console.log('🚀 Starting Holy Bless application...');
            
            // Show loading screen
            this.showLoadingScreen();
            
            // Initialize services
            await this.initializeServices();
            
            // Load user data
            await this.loadUserData();
            
            // Setup UI
            await this.setupUI();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Load initial content
            await this.loadInitialContent();
            
            // Hide loading screen
            this.hideLoadingScreen();
            
            // Mark as initialized
            this.isInitialized = true;
            
            console.log('✅ Holy Bless application ready!');
            
            // Show welcome notification
            this.showNotification('🌟 Welcome to your sacred space of divine wisdom', 'success');
            
        } catch (error) {
            console.error('❌ Failed to initialize application:', error);
            this.handleInitializationError(error);
        }
    }

    /**
     * Initialize all services
     */
    async initializeServices() {
        console.log('🔧 Initializing services...');
        
        // Initialize API service
        await apiService.init();
        
        // Check service status
        const status = apiService.getStatus();
        console.log('📊 API Service Status:', status);
        
        // Update service status in UI
        this.updateServiceStatus(status);
        
        // Initialize storage service
        if (!storageService.isAvailable()) {
            console.warn('⚠️ Local storage not available');
            this.showNotification('Local storage unavailable - some features may be limited', 'warning');
        }
    }

    /**
     * Load user data from storage
     */
    async loadUserData() {
        console.log('👤 Loading user data...');
        
        // Load preferences
        this.preferences = storageService.getPreferences();
        console.log('⚙️ User preferences:', this.preferences);
        
        // Load statistics
        this.userStats = storageService.getStats();
        console.log('📈 User statistics:', this.userStats);
        
        // Update last visit
        const now = new Date().toISOString();
        const lastVisit = this.userStats.lastVisit;
        
        // Calculate days active
        if (lastVisit) {
            const daysSinceLastVisit = Math.floor(
                (new Date() - new Date(lastVisit)) / (1000 * 60 * 60 * 24)
            );
            
            if (daysSinceLastVisit >= 1) {
                this.userStats.daysActive += 1;
            }
        } else {
            this.userStats.daysActive = 1;
        }
        
        this.userStats.lastVisit = now;
        storageService.updateStats(this.userStats);
    }

    /**
     * Setup UI components
     */
    async setupUI() {
        console.log('🎨 Setting up UI...');
        
        // Apply saved theme
        this.applyTheme(this.preferences.theme);
        
        // Setup greeting message
        this.setupGreeting();
        
        // Populate filter options
        await this.populateFilters();
        
        // Update statistics display
        this.updateStatsDisplay();
        
        // Setup reflection area
        this.setupReflectionArea();
        
        // Load favorites
        this.loadFavorites();
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        console.log('🎧 Setting up event listeners...');
        
        // Star button
        const starButton = document.getElementById('starButton');
        if (starButton) {
            starButton.addEventListener('click', this.handleStarClick);
        }
        
        // Theme selector
        const themeSelector = document.getElementById('themeSelector');
        if (themeSelector) {
            themeSelector.value = this.preferences.theme;
            themeSelector.addEventListener('change', (e) => {
                this.applyTheme(e.target.value);
                this.preferences.theme = e.target.value;
                storageService.setPreferences(this.preferences);
            });
        }
        
        // Filter controls
        this.setupFilterListeners();
        
        // Quote actions
        this.setupQuoteActions();
        
        // Reflection input
        const reflectionInput = document.getElementById('userReflection');
        if (reflectionInput) {
            reflectionInput.addEventListener('input', this.handleReflectionInput);
        }
        
        // Quick actions
        this.setupQuickActions();
        
        // Keyboard shortcuts
        document.addEventListener('keydown', this.handleKeyboardShortcuts);
        
        // Window events
        window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
        window.addEventListener('online', this.handleOnlineStatus.bind(this));
        window.addEventListener('offline', this.handleOfflineStatus.bind(this));
    }

    /**
     * Load initial content
     */
    async loadInitialContent() {
        console.log('📖 Loading initial content...');
        
        // Check for daily quote
        let dailyQuote = storageService.getDailyQuote();
        
        if (!dailyQuote) {
            // Get new daily quote
            dailyQuote = await apiService.getDailyPassage();
            storageService.setDailyQuote(dailyQuote);
        }
        
        // Display the quote
        this.displayQuote(dailyQuote);
        
        // Update stats
        this.userStats.quotesRead += 1;
        this.updateStats();
    }

    /**
     * Handle star button click
     */
    async handleStarClick() {
        if (!this.isInitialized) return;
        
        try {
            // Add loading animation
            const starButton = document.getElementById('starButton');
            starButton.classList.add('loading');
            
            // Get filters
            const filters = this.getActiveFilters();
            
            // Fetch new quote
            const quote = await apiService.getPassage(filters);
            
            // Display quote
            this.displayQuote(quote);
            
            // Update stats
            this.userStats.quotesRead += 1;
            this.updateStats();
            
            // Remove loading animation
            starButton.classList.remove('loading');
            
            // Add success animation
            helpers.animateElement(starButton, 'pulse', 500);
            
        } catch (error) {
            console.error('Error fetching new quote:', error);
            this.showNotification('Failed to receive new wisdom. Please try again.', 'error');
            
            // Remove loading animation
            const starButton = document.getElementById('starButton');
            starButton.classList.remove('loading');
        }
    }

    /**
     * Display a quote in the UI
     */
    displayQuote(quote) {
        if (!quote) return;
        
        this.currentQuote = quote;
        
        // Update quote text
        const quoteText = document.getElementById('quoteText');
        const quoteAuthor = document.getElementById('quoteAuthor');
        const quoteMeta = document.getElementById('quoteMeta');
        const quoteCategory = document.getElementById('quoteCategory');
        const quoteTags = document.getElementById('quoteTags');
        
        if (quoteText) {
            quoteText.textContent = quote.content;
            helpers.animateElement(quoteText, 'fadeInUp', 800);
        }
        
        if (quoteAuthor) {
            quoteAuthor.textContent = `— ${quote.author}`;
            helpers.animateElement(quoteAuthor, 'fadeInUp', 1000);
        }
        
        // Show metadata
        if (quoteMeta && quote.category) {
            quoteMeta.classList.remove('d-none');
            
            if (quoteCategory) {
                quoteCategory.textContent = quote.category.replace('-', ' ').toUpperCase();
            }
            
            if (quoteTags && quote.tags) {
                quoteTags.innerHTML = quote.tags.map(tag => 
                    `<span class="tag">#${tag}</span>`
                ).join(' ');
            }
        }
        
        // Update favorite button state
        this.updateFavoriteButton();
        
        // Clear reflection for new quote
        const reflectionInput = document.getElementById('userReflection');
        if (reflectionInput) {
            reflectionInput.value = '';
        }
        
        console.log('📜 Quote displayed:', quote);
    }

    /**
     * Get active filters from UI
     */
    getActiveFilters() {
        const filters = {};
        
        const sourceFilter = document.getElementById('sourceFilter');
        if (sourceFilter && sourceFilter.value) {
            filters.source = sourceFilter.value;
        }
        
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter && categoryFilter.value) {
            filters.category = categoryFilter.value;
        }
        
        const searchInput = document.getElementById('searchInput');
        if (searchInput && searchInput.value.trim()) {
            filters.searchTerm = searchInput.value.trim();
        }
        
        return filters;
    }

    /**
     * Setup greeting message
     */
    setupGreeting() {
        const greetingElement = document.getElementById('greetingMessage');
        if (greetingElement) {
            const greeting = helpers.getTimeBasedGreeting();
            greetingElement.textContent = greeting;
        }
    }

    /**
     * Populate filter dropdowns
     */
    async populateFilters() {
        try {
            // Populate sources
            const sources = await apiService.getSources();
            const sourceFilter = document.getElementById('sourceFilter');
            if (sourceFilter && sources.length > 0) {
                sources.forEach(source => {
                    const option = document.createElement('option');
                    option.value = source;
                    option.textContent = source;
                    sourceFilter.appendChild(option);
                });
            }
            
            // Populate categories
            const categories = await apiService.getCategories();
            const categoryFilter = document.getElementById('categoryFilter');
            if (categoryFilter && categories.length > 0) {
                categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category;
                    option.textContent = category.replace('-', ' ').toUpperCase();
                    categoryFilter.appendChild(option);
                });
            }
            
        } catch (error) {
            console.error('Error populating filters:', error);
        }
    }

    /**
     * Apply theme to the application
     */
    applyTheme(themeName) {
        document.body.className = themeName;
        console.log(`🎨 Theme applied: ${themeName}`);
    }

    /**
     * Update statistics display
     */
    updateStatsDisplay() {
        const stats = this.userStats;
        
        // Update stat numbers
        const statElements = {
            totalQuotes: document.getElementById('totalQuotes'),
            quotesRead: document.getElementById('quotesRead'),
            favoriteCount: document.getElementById('favoriteCount'),
            reflectionsCount: document.getElementById('reflectionsCount'),
            daysActive: document.getElementById('daysActive')
        };
        
        Object.entries(statElements).forEach(([key, element]) => {
            if (element && stats[key] !== undefined) {
                element.textContent = stats[key];
            }
        });
        
        // Update available passages count
        const availableElement = document.getElementById('availablePassages');
        if (availableElement && apiService.isReady()) {
            availableElement.textContent = apiService.localPassages.length;
        }
    }

    /**
     * Update user statistics
     */
    updateStats() {
        storageService.updateStats(this.userStats);
        this.updateStatsDisplay();
    }

    /**
     * Setup filter event listeners
     */
    setupFilterListeners() {
        const sourceFilter = document.getElementById('sourceFilter');
        const categoryFilter = document.getElementById('categoryFilter');
        const searchInput = document.getElementById('searchInput');
        
        // Debounced search function
        const debouncedSearch = helpers.debounce(async () => {
            const filters = this.getActiveFilters();
            if (filters.searchTerm) {
                try {
                    const results = await apiService.searchPassages(filters.searchTerm);
                    if (results.length > 0) {
                        const randomResult = results[Math.floor(Math.random() * results.length)];
                        this.displayQuote(randomResult);
                    } else {
                        this.showNotification('No wisdom found matching your search', 'info');
                    }
                } catch (error) {
                    console.error('Search error:', error);
                }
            }
        }, 500);
        
        if (searchInput) {
            searchInput.addEventListener('input', debouncedSearch);
        }
        
        // Filter change handlers
        [sourceFilter, categoryFilter].forEach(filter => {
            if (filter) {
                filter.addEventListener('change', async () => {
                    const filters = this.getActiveFilters();
                    try {
                        const quote = await apiService.getPassage(filters);
                        this.displayQuote(quote);
                    } catch (error) {
                        console.error('Filter error:', error);
                    }
                });
            }
        });
    }

    /**
     * Setup quote action buttons
     */
    setupQuoteActions() {
        // Favorite button
        const favoriteBtn = document.getElementById('favoriteBtn');
        if (favoriteBtn) {
            favoriteBtn.addEventListener('click', this.toggleFavorite.bind(this));
        }
        
        // Share button
        const shareBtn = document.getElementById('shareBtn');
        if (shareBtn) {
            shareBtn.addEventListener('click', this.shareQuote.bind(this));
        }
        
        // Copy button
        const copyBtn = document.getElementById('copyBtn');
        if (copyBtn) {
            copyBtn.addEventListener('click', this.copyQuote.bind(this));
        }
    }

    /**
     * Setup quick action buttons
     */
    setupQuickActions() {
        // Show favorites
        const showFavoritesBtn = document.getElementById('showFavoritesBtn');
        if (showFavoritesBtn) {
            showFavoritesBtn.addEventListener('click', this.toggleFavoritesSection.bind(this));
        }
        
        // Export data
        const exportDataBtn = document.getElementById('exportDataBtn');
        if (exportDataBtn) {
            exportDataBtn.addEventListener('click', this.exportUserData.bind(this));
        }
        
        // Show stats
        const showStatsBtn = document.getElementById('showStatsBtn');
        if (showStatsBtn) {
            showStatsBtn.addEventListener('click', this.showDetailedStats.bind(this));
        }
        
        // Random category
        const randomCategoryBtn = document.getElementById('randomCategoryBtn');
        if (randomCategoryBtn) {
            randomCategoryBtn.addEventListener('click', this.getRandomCategoryQuote.bind(this));
        }
    }

    /**
     * Setup reflection area
     */
    setupReflectionArea() {
        const reflectionInput = document.getElementById('userReflection');
        const saveBtn = document.getElementById('saveReflectionBtn');
        const clearBtn = document.getElementById('clearReflectionBtn');
        
        if (saveBtn) {
            saveBtn.addEventListener('click', this.saveReflection.bind(this));
        }
        
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (reflectionInput) {
                    reflectionInput.value = '';
                    this.showNotification('Reflection cleared', 'info');
                }
            });
        }
    }

    /**
     * Handle reflection input with auto-save
     */
    handleReflectionInput(event) {
        // Clear existing timeout
        if (this.reflectionTimeout) {
            clearTimeout(this.reflectionTimeout);
        }
        
        // Set new timeout for auto-save
        this.reflectionTimeout = setTimeout(() => {
            const reflection = event.target.value.trim();
            if (reflection && this.currentQuote) {
                // Auto-save reflection
                console.log('💾 Auto-saving reflection...');
            }
        }, 2000); // Auto-save after 2 seconds of inactivity
    }

    /**
     * Save reflection
     */
    saveReflection() {
        const reflectionInput = document.getElementById('userReflection');
        if (!reflectionInput || !this.currentQuote) return;
        
        const reflection = reflectionInput.value.trim();
        if (!reflection) {
            this.showNotification('Please write a reflection first', 'warning');
            return;
        }
        
        const reflectionData = {
            quote: this.currentQuote,
            reflection: reflection,
            timestamp: new Date().toISOString()
        };
        
        if (storageService.addReflection(reflectionData)) {
            this.userStats.reflectionsCount += 1;
            this.updateStats();
            this.showNotification('Reflection saved to your sacred journal', 'success');
        } else {
            this.showNotification('Failed to save reflection', 'error');
        }
    }

    /**
     * Toggle favorite status of current quote
     */
    toggleFavorite() {
        if (!this.currentQuote) return;
        
        const favorites = storageService.getFavorites();
        const isAlreadyFavorite = favorites.some(fav => 
            fav.content === this.currentQuote.content && 
            fav.author === this.currentQuote.author
        );
        
        if (isAlreadyFavorite) {
            // Remove from favorites
            const updatedFavorites = favorites.filter(fav => 
                !(fav.content === this.currentQuote.content && fav.author === this.currentQuote.author)
            );
            storageService.set('favorites', updatedFavorites);
            this.userStats.favoriteCount = Math.max(0, this.userStats.favoriteCount - 1);
            this.showNotification('Removed from favorites', 'info');
        } else {
            // Add to favorites
            if (storageService.addToFavorites(this.currentQuote)) {
                this.userStats.favoriteCount += 1;
                this.showNotification('Added to your sacred collection', 'success');
            }
        }
        
        this.updateStats();
        this.updateFavoriteButton();
    }

    /**
     * Update favorite button appearance
     */
    updateFavoriteButton() {
        const favoriteBtn = document.getElementById('favoriteBtn');
        if (!favoriteBtn || !this.currentQuote) return;
        
        const favorites = storageService.getFavorites();
        const isFavorite = favorites.some(fav => 
            fav.content === this.currentQuote.content && 
            fav.author === this.currentQuote.author
        );
        
        const icon = favoriteBtn.querySelector('i');
        if (icon) {
            icon.className = isFavorite ? 'fas fa-heart' : 'far fa-heart';
        }
        
        favoriteBtn.title = isFavorite ? 'Remove from favorites' : 'Add to favorites';
    }

    /**
     * Share current quote
     */
    async shareQuote() {
        if (!this.currentQuote) return;
        
        const shareText = `"${this.currentQuote.content}" — ${this.currentQuote.author}\n\nShared from Holy Bless - Divine Wisdom Generator`;
        
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Sacred Wisdom',
                    text: shareText,
                    url: window.location.href
                });
                this.showNotification('Wisdom shared successfully', 'success');
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Share failed:', error);
                    this.fallbackShare(shareText);
                }
            }
        } else {
            this.fallbackShare(shareText);
        }
    }

    /**
     * Fallback share method
     */
    fallbackShare(text) {
        if (helpers.copyToClipboard(text)) {
            this.showNotification('Quote copied to clipboard for sharing', 'success');
        } else {
            this.showNotification('Unable to share quote', 'error');
        }
    }

    /**
     * Copy current quote to clipboard
     */
    async copyQuote() {
        if (!this.currentQuote) return;
        
        const copyText = `"${this.currentQuote.content}" — ${this.currentQuote.author}`;
        
        if (await helpers.copyToClipboard(copyText)) {
            this.showNotification('Quote copied to clipboard', 'success');
        } else {
            this.showNotification('Failed to copy quote', 'error');
        }
    }

    /**
     * Handle keyboard shortcuts
     */
    handleKeyboardShortcuts(event) {
        // Don't trigger shortcuts when typing in inputs
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            // Allow Ctrl+S in textarea for saving reflection
            if (event.ctrlKey && event.key === 's' && event.target.id === 'userReflection') {
                event.preventDefault();
                this.saveReflection();
            }
            return;
        }
        
        switch (event.key) {
            case ' ':
                event.preventDefault();
                this.handleStarClick();
                break;
            case 'f':
            case 'F':
                event.preventDefault();
                this.toggleFavorite();
                break;
        }
        
        // Ctrl combinations
        if (event.ctrlKey) {
            switch (event.key) {
                case 'f':
                    event.preventDefault();
                    const searchInput = document.getElementById('searchInput');
                    if (searchInput) searchInput.focus();
                    break;
            }
        }
    }

    /**
     * Load and display favorites
     */
    loadFavorites() {
        const favorites = storageService.getFavorites();
        this.userStats.favoriteCount = favorites.length;
        this.updateStatsDisplay();
        
        // Update favorites section if visible
        const favoritesSection = document.getElementById('favoritesSection');
        if (favoritesSection && !favoritesSection.classList.contains('d-none')) {
            this.displayFavorites();
        }
    }

    /**
     * Display favorites in the UI
     */
    displayFavorites() {
        const favoritesList = document.getElementById('favoritesList');
        const favorites = storageService.getFavorites();
        
        if (!favoritesList) return;
        
        if (favorites.length === 0) {
            favoritesList.innerHTML = '<p class="text-muted text-center">No favorite quotes yet. Click the heart icon to save wisdom that resonates with your soul.</p>';
            return;
        }
        
        favoritesList.innerHTML = favorites.map(fav => `
            <div class="favorite-item" data-id="${fav.id}">
                <blockquote class="blockquote">
                    <p>"${fav.content}"</p>
                    <footer class="blockquote-footer">${fav.author}</footer>
                </blockquote>
                <div class="favorite-actions">
                    <button class="btn btn-sm btn-outline-danger remove-favorite" data-id="${fav.id}">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                    <button class="btn btn-sm btn-outline-primary copy-favorite" data-content="${fav.content}" data-author="${fav.author}">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                </div>
            </div>
        `).join('');
        
        // Add event listeners for favorite actions
        favoritesList.querySelectorAll('.remove-favorite').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.closest('.remove-favorite').dataset.id);
                this.removeFavorite(id);
            });
        });
        
        favoritesList.querySelectorAll('.copy-favorite').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const button = e.target.closest('.copy-favorite');
                const content = button.dataset.content;
                const author = button.dataset.author;
                const text = `"${content}" — ${author}`;
                helpers.copyToClipboard(text);
                this.showNotification('Favorite copied to clipboard', 'success');
            });
        });
    }

    /**
     * Remove favorite by ID
     */
    removeFavorite(id) {
        if (storageService.removeFromFavorites(id)) {
            this.userStats.favoriteCount = Math.max(0, this.userStats.favoriteCount - 1);
            this.updateStats();
            this.displayFavorites();
            this.showNotification('Favorite removed', 'info');
        }
    }

    /**
     * Toggle favorites section visibility
     */
    toggleFavoritesSection() {
        const favoritesSection = document.getElementById('favoritesSection');
        const toggleBtn = document.getElementById('showFavoritesBtn');
        
        if (!favoritesSection || !toggleBtn) return;
        
        if (favoritesSection.classList.contains('d-none')) {
            favoritesSection.classList.remove('d-none');
            this.displayFavorites();
            toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Favorites';
        } else {
            favoritesSection.classList.add('d-none');
            toggleBtn.innerHTML = '<i class="fas fa-heart"></i> View Favorites';
        }
    }

    /**
     * Export user data
     */
    exportUserData() {
        try {
            const data = storageService.exportData();
            const jsonString = JSON.stringify(data, null, 2);
            const filename = `holy-bless-data-${new Date().toISOString().split('T')[0]}.json`;
            
            helpers.downloadFile(jsonString, filename, 'application/json');
            this.showNotification('Your sacred data has been exported', 'success');
        } catch (error) {
            console.error('Export failed:', error);
            this.showNotification('Failed to export data', 'error');
        }
    }

    /**
     * Show detailed statistics modal
     */
    async showDetailedStats() {
        try {
            const stats = await apiService.getStats();
            const userStats = this.userStats;
            
            const modalBody = document.getElementById('statsModalBody');
            if (!modalBody) return;
            
            modalBody.innerHTML = `
                <div class="row">
                    <div class="col-md-6">
                        <h6><i class="fas fa-user"></i> Your Journey</h6>
                        <ul class="list-unstyled">
                            <li><strong>Messages Received:</strong> ${userStats.quotesRead}</li>
                            <li><strong>Favorites Saved:</strong> ${userStats.favoriteCount}</li>
                            <li><strong>Reflections Written:</strong> ${userStats.reflectionsCount}</li>
                            <li><strong>Days Active:</strong> ${userStats.daysActive}</li>
                            <li><strong>First Visit:</strong> ${helpers.formatDate(userStats.firstVisit)}</li>
                            <li><strong>Last Visit:</strong> ${helpers.formatDate(userStats.lastVisit)}</li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <h6><i class="fas fa-database"></i> Collection Stats</h6>
                        <ul class="list-unstyled">
                            <li><strong>Total Passages:</strong> ${stats.totalPassages}</li>
                            <li><strong>Sources:</strong> ${stats.totalSources}</li>
                            <li><strong>Categories:</strong> ${stats.totalCategories}</li>
                            <li><strong>Tags:</strong> ${stats.totalTags}</li>
                            <li><strong>Version:</strong> ${stats.version}</li>
                            <li><strong>Last Updated:</strong> ${stats.lastUpdated}</li>
                        </ul>
                    </div>
                </div>
                
                <div class="mt-4">
                    <h6><i class="fas fa-chart-pie"></i> Passages by Source</h6>
                    <div class="row">
                        ${Object.entries(stats.passagesPerSource).map(([source, count]) => `
                            <div class="col-md-4 mb-2">
                                <div class="d-flex justify-content-between">
                                    <span>${source}:</span>
                                    <strong>${count}</strong>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            
            // Show modal
            $('#statsModal').modal('show');
            
        } catch (error) {
            console.error('Failed to load detailed stats:', error);
            this.showNotification('Failed to load statistics', 'error');
        }
    }

    /**
     * Get random quote from random category
     */
    async getRandomCategoryQuote() {
        try {
            const categories = await apiService.getCategories();
            if (categories.length === 0) return;
            
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];
            const quote = await apiService.getPassage({ category: randomCategory });
            
            this.displayQuote(quote);
            this.showNotification(`Wisdom from: ${randomCategory.replace('-', ' ')}`, 'info');
            
        } catch (error) {
            console.error('Random category error:', error);
            this.showNotification('Failed to get random category quote', 'error');
        }
    }

    /**
     * Update service status indicator
     */
    updateServiceStatus(status) {
        const statusElement = document.getElementById('serviceStatus');
        const statusIcon = document.getElementById('statusIcon');
        const statusText = document.getElementById('statusText');
        
        if (!statusElement || !statusIcon || !statusText) return;
        
        statusElement.classList.remove('d-none');
        
        if (status.isLoaded && status.passagesCount > 0) {
            statusIcon.className = 'fas fa-circle text-success';
            statusText.textContent = `${status.passagesCount} passages loaded`;
        } else {
            statusIcon.className = 'fas fa-circle text-warning';
            statusText.textContent = 'Limited functionality';
        }
    }

    /**
     * Show loading screen
     */
    showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
        }
    }

    /**
     * Hide loading screen
     */
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }

    /**
     * Handle initialization errors
     */
    handleInitializationError(error) {
        this.hideLoadingScreen();
        
        const errorMessage = `
            <div class="alert alert-danger" role="alert">
                <h4 class="alert-heading">🚨 Initialization Failed</h4>
                <p>We encountered an issue while starting the application:</p>
                <hr>
                <p class="mb-0"><strong>Error:</strong> ${error.message}</p>
                <button class="btn btn-outline-danger mt-3" onclick="location.reload()">
                    <i class="fas fa-redo"></i> Retry
                </button>
            </div>
        `;
        
        const container = document.querySelector('.container');
        if (container) {
            container.innerHTML = errorMessage;
        }
    }

    /**
     * Handle before unload event
     */
    handleBeforeUnload() {
        // Save any pending data
        if (this.userStats) {
            storageService.updateStats(this.userStats);
        }
    }

    /**
     * Handle online status change
     */
    handleOnlineStatus() {
        this.showNotification('🌐 Back online - full functionality restored', 'success');
    }

    /**
     * Handle offline status change
     */
    handleOfflineStatus() {
        this.showNotification('📱 Offline mode - using local wisdom collection', 'info');
    }

    /**
     * Show notification to user
     */
    showNotification(message, type = 'info') {
        // Use Toastify if available
        if (typeof Toastify !== 'undefined') {
            const backgroundColor = {
                success: 'linear-gradient(to right, #00b09b, #96c93d)',
                error: 'linear-gradient(to right, #ff5f6d, #ffc371)',
                warning: 'linear-gradient(to right, #f093fb, #f5576c)',
                info: 'linear-gradient(to right, #4facfe, #00f2fe)'
            };
            
            Toastify({
                text: message,
                duration: 3000,
                gravity: 'top',
                position: 'right',
                style: {
                    background: backgroundColor[type] || backgroundColor.info
                }
            }).showToast();
        } else {
            // Fallback to console
            console.log(`${type.toUpperCase()}: ${message}`);
        }
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new HolyBlissApp();
    app.init();
    
    // Make app globally available for debugging
    window.holyBlissApp = app;
});

// Export for module environments
export default HolyBlissApp;
