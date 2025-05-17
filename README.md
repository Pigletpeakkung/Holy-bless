# Holy-bless
```markdown
# Holy Cross Button - Spiritual Quote Generator

![Holy Cross Button Screenshot](screenshot.png) *(Add your screenshot here)*

A web application that generates inspirational quotes from spiritual texts with a single click on a cross-shaped button. Includes text-to-speech, favorites, and sharing functionality.

## Features

- ✝️ **Cross-shaped button UI** with interactive animations
- 📜 **100+ curated quotes** from spiritual texts including:
  - Conversations with God
  - Seth Speaks
  - Rumi
  - Alan Watts
  - Buddhist teachings
  - Tao Te Ching
  - Law of One
  - And more...
- 🎧 **Text-to-speech** with male voice option
- ❤️ **Save favorites** (persists via localStorage)
- 🔗 **Share quotes** via social media, email, or copy to clipboard
- 🔄 **Non-repeating quotes** until all have been shown
- 🌐 **Responsive design** works on mobile and desktop

## How to Use

1. Click the cross button to generate a random spiritual quote
2. Options will appear below the quote:
   - Listen to the quote (text-to-speech)
   - Add to favorites
   - Share via various platforms
3. View all your saved favorites by clicking "View Favorites"

## Technical Details

### Built With
- HTML5, CSS3, JavaScript (ES6)
- Web Speech API (for text-to-speech)
- localStorage (for saving favorites)
- Quotable API (for additional quotes)

### Key Functions
- `generatePassage()` - Handles quote generation and animations
- `generateAudio()` - Implements text-to-speech functionality
- `generateShareButtons()` - Creates dynamic sharing options
- `generateFavoriteButton()` - Manages favorites system

### File Structure
```
holy-cross-button/
├── index.html          # Main application file
├── README.md           # This documentation
└── screenshot.png      # App screenshot (optional)
```

## Installation

No installation required! Simply open `index.html` in any modern browser.

For local development:
1. Clone this repository
2. Open `index.html` in your browser

## Customization

To add your own quotes:
1. Edit the `passages` array in the JavaScript section
2. Format: 
```javascript
{ 
  text: "Your quote here", 
  id: unique_number, 
  source: "Source Name" 
}
```

## Browser Support

Works in all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge
- Mobile browsers

Note: Text-to-speech may have limited voices on some browsers.

## License

This project is open source under the MIT License.

## Credits

Quotes sourced from:
- Conversations with God
- Seth Speaks
- Rumi
- Alan Watts
- Florence Scovel Shinn
- Lao Tzu
- Law of One
- Emerald Tablet
- Buddha
- [Quotable API](https://api.quotable.io)

---

**Enjoy spiritual inspiration at your fingertips!** ✨
```

To use this README:

1. Create a new file named `README.md` in your project folder
2. Paste this content
3. Customize as needed:
   - Add a screenshot (replace `screenshot.png`)
   - Modify the quotes section if you've added new sources
   - Update any technical details if you've made significant changes

The README provides:
- Clear project description
- Feature highlights
- Usage instructions
- Technical documentation
- Setup information
- Customization options
- Credits and license

