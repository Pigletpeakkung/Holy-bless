// Main utils export file for Holy Bless - Divine Wisdom Generator

// Import all utility modules
import apiService from './api.js';
import storageService from './storage.js';
import * as helpers from './helpers.js';

// Export all utilities
export {
    apiService,
    storageService,
    helpers
};

// Default export with all utilities
export default {
    api: apiService,
    storage: storageService,
    helpers
};

// For non-module environments, attach to window
if (typeof window !== 'undefined') {
    window.HolyBlissUtils = {
        api: apiService,
        storage: storageService,
        helpers
    };
}
