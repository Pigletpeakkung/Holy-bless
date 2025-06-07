// Helper utility functions for Holy Bless - Divine Wisdom Generator

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Execute immediately
 * @returns {Function} Debounced function
 */
export function debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

/**
 * Throttle function to limit function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted date string
 */
export function formatDate(date, options = {}) {
    const dateObj = new Date(date);
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...options
    };
    
    try {
        return dateObj.toLocaleDateString(undefined, defaultOptions);
    } catch (error) {
        return dateObj.toDateString();
    }
}

/**
 * Format time to readable string
 * @param {Date|string} date - Date to format
 * @param {boolean} includeSeconds - Include seconds in output
 * @returns {string} Formatted time string
 */
export function formatTime(date, includeSeconds = false) {
    const dateObj = new Date(date);
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        ...(includeSeconds && { second: '2-digit' })
    };
    
    try {
        return dateObj.toLocaleTimeString(undefined, options);
    } catch (error) {
        return dateObj.toTimeString().split(' ')[0];
    }
}

/**
 * Get relative time string (e.g., "2 hours ago")
 * @param {Date|string} date - Date to compare
 * @returns {string} Relative time string
 */
export function getRelativeTime(date) {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now - past) / 1000);
    
    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'week', seconds: 604800 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 }
    ];
    
    for (const interval of intervals) {
        const count = Math.floor(diffInSeconds / interval.seconds);
        if (count >= 1) {
            return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
        }
    }
    
    return 'just now';
}

/**
 * Generate a random ID
 * @param {number} length - Length of the ID
 * @returns {string} Random ID
 */
export function generateId(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * Sanitize HTML to prevent XSS
 * @param {string} html - HTML string to sanitize
 * @returns {string} Sanitized HTML
 */
export function sanitizeHtml(html) {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export async function copyToClipboard(text) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            const result = document.execCommand('copy');
            textArea.remove();
            return result;
        }
    } catch (error) {
        console.error('Failed to copy text:', error);
        return false;
    }
}

/**
 * Download data as file
 * @param {string} data - Data to download
 * @param {string} filename - Name of the file
 * @param {string} type - MIME type
 */
export function downloadFile(data, filename, type = 'application/json') {
    const blob = new Blob([data], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} Validation result
 */
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Get greeting based on time of day
 * @param {string} name - Optional name to include
 * @returns {string} Greeting message
 */
export function getTimeBasedGreeting(name = '') {
    const hour = new Date().getHours();
    const nameStr = name ? `, ${name}` : '';
    
    if (hour < 6) {
        return `🌙 Good night${nameStr}, seeker of wisdom`;
    } else if (hour < 12) {
        return `🌅 Good morning${nameStr}, beautiful soul`;
    } else if (hour < 17) {
        return `☀️ Good afternoon${nameStr}, divine being`;
    } else if (hour < 21) {
        return `🌆 Good evening${nameStr}, light worker`;
    } else {
        return `✨ Good night${nameStr}, cosmic traveler`;
    }
}

/**
 * Calculate reading time for text
 * @param {string} text - Text to analyze
 * @param {number} wordsPerMinute - Reading speed
 * @returns {number} Reading time in minutes
 */
export function calculateReadingTime(text, wordsPerMinute = 200) {
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to add
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength = 100, suffix = '...') {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * Generate color palette based on theme
 * @param {string} theme - Theme name
 * @returns {Object} Color palette
 */
export function getThemeColors(theme) {
    const themes = {
        'theme-ocean': {
            primary: '#667eea',
            secondary: '#764ba2',
            accent: '#f093fb',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        'theme-sunset': {
            primary: '#f093fb',
            secondary: '#f5576c',
            accent: '#ffd89b',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        'theme-forest': {
            primary: '#4ecdc4',
            secondary: '#44a08d',
            accent: '#96e6a1',
            background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)'
        },
        'theme-cosmic': {
            primary: '#3498db',
            secondary: '#2c3e50',
            accent: '#9b59b6',
            background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)'
        }
    };
    
    return themes[theme] || themes['theme-ocean'];
}

/**
 * Check if device is mobile
 * @returns {boolean} Is mobile device
 */
export function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Check if device supports touch
 * @returns {boolean} Supports touch
 */
export function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Get browser information
 * @returns {Object} Browser info
 */
export function getBrowserInfo() {
    const ua = navigator.userAgent;
    let browser = 'Unknown';
    
    if (ua.includes('Chrome')) browser = 'Chrome';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Safari')) browser = 'Safari';
    else if (ua.includes('Edge')) browser = 'Edge';
    else if (ua.includes('Opera')) browser = 'Opera';
    
    return {
        name: browser,
        userAgent: ua,
        language: navigator.language,
        platform: navigator.platform,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine
    };
}

/**
 * Animate element with CSS classes
 * @param {HTMLElement} element - Element to animate
 * @param {string} animationClass - CSS animation class
 * @param {number} duration - Animation duration in ms
 * @returns {Promise} Animation completion promise
 */
export function animateElement(element, animationClass, duration = 1000) {
    return new Promise((resolve) => {
        element.classList.add(animationClass);
        setTimeout(() => {
            element.classList.remove(animationClass);
            resolve();
        }, duration);
    });
}

// For non-module environments
if (typeof window !== 'undefined') {
    window.HolyBlissHelpers = {
        debounce,
        throttle,
        formatDate,
        formatTime,
        getRelativeTime,
        generateId,
        sanitizeHtml,
        copyToClipboard,
        downloadFile,
        isValidEmail,
        getTimeBasedGreeting,
        calculateReadingTime,
        truncateText,
        getThemeColors,
        isMobile,
        isTouchDevice,
        getBrowserInfo,
        animateElement
    };
}
