# 🌟 Divine Light - Sacred Wisdom Generator

> *An interactive spiritual quote generator featuring 115+ curated passages from renowned spiritual teachers and mystics*

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://your-demo-link.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/yourusername/divine-light)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

![Divine Light Preview](https://via.placeholder.com/800x400/667eea/ffffff?text=Divine+Light+Preview)

## ✨ Overview

Divine Light is a beautifully crafted web application that delivers sacred wisdom from history's greatest spiritual teachers. With an elegant glassmorphism design and powerful features, it creates a meaningful digital sanctuary for daily inspiration and spiritual growth.

### 🎯 Key Features

- **🎨 Beautiful UI Design** - Glassmorphism effects with multiple theme options
- **📚 Extensive Quote Library** - 115+ carefully curated spiritual passages
- **🔊 Text-to-Speech** - High-quality audio narration with voice selection
- **❤️ Favorites System** - Save and organize your most meaningful quotes
- **📊 Progress Tracking** - Monitor your spiritual reading journey
- **🌅 Daily Wisdom** - Consistent daily quote for contemplation
- **🎯 Smart Filtering** - Filter by spiritual teachers and sources
- **📱 Fully Responsive** - Perfect experience on all devices
- **🌙 Theme Customization** - Ocean, Sunset, Forest, and Cosmic themes

## 🚀 Live Demo

Experience Divine Light in action: **[Live Demo](https://your-demo-link.com)**

## 📸 Screenshots

<details>
<summary>Click to view screenshots</summary>

### Main Interface
![Main Interface](https://via.placeholder.com/600x400/667eea/ffffff?text=Main+Interface)

### Quote Display
![Quote Display](https://via.placeholder.com/600x400/f093fb/ffffff?text=Quote+Display)

### Favorites Collection
![Favorites](https://via.placeholder.com/600x400/11998e/ffffff?text=Favorites+Collection)

### Theme Options
![Themes](https://via.placeholder.com/600x400/1e3c72/ffffff?text=Theme+Options)

</details>

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic structure with accessibility features
- **CSS3** - Advanced styling with glassmorphism effects
- **JavaScript (ES6+)** - Modern vanilla JavaScript implementation

### APIs & Features
- **Web Speech API** - Text-to-speech functionality
- **Local Storage API** - Data persistence and user preferences
- **Quotable API** - Additional quote fetching (fallback)

### Design & UX
- **Responsive Design** - Mobile-first approach
- **Glassmorphism UI** - Modern visual effects
- **Smooth Animations** - CSS transitions and keyframes
- **Accessibility** - WCAG compliant with keyboard navigation

## 📋 Installation & Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/divine-light.git
   cd divine-light
   ```

2. **Open in browser**
   ```bash
   # Option 1: Direct file opening
   open index.html
   
   # Option 2: Local server (recommended)
   python -m http.server 8000
   # Then visit: http://localhost:8000
   ```

3. **Start receiving wisdom!** 🙏

### Development Setup

For development with live reload:

```bash
# Using Node.js live-server
npm install -g live-server
live-server --port=3000

# Using Python
python -m http.server 3000
```

## 📖 Usage Guide

### Basic Usage

1. **Generate Wisdom** - Click the sacred cross button to receive a quote
2. **Listen** - Audio automatically plays, or use the "Listen" button
3. **Save Favorites** - Click the heart icon to save meaningful quotes
4. **Share** - Use the share button to spread wisdom
5. **Customize** - Select themes and filter by spiritual teachers

### Advanced Features

#### Theme Customization
```javascript
// Themes available:
- Ocean Depths (default)
- Sunset Glow
- Forest Wisdom  
- Cosmic Mystery
```

#### Source Filtering
Filter quotes by spiritual teachers:
- Alan Watts
- Buddha & Buddhist Teachings
- Rumi
- Lao Tzu (Tao Te Ching)
- Law of One
- Conversations with God
- And more...

#### Keyboard Shortcuts
- `Spacebar` - Generate new quote
- `Enter` - Activate focused button

## 🎨 Customization

### Adding New Quotes

To add your own spiritual quotes:

```javascript
// Add to the passages array in script section
{
  text: "Your inspiring quote here",
  id: 999,
  source: "Source Name"
}
```

### Theme Modification

Create custom themes by modifying CSS variables:

```css
.theme-custom {
  background: linear-gradient(135deg, #your-color1, #your-color2);
}
```

### Audio Settings

Customize speech synthesis:

```javascript
utterance.pitch = 0.8;    // Voice pitch (0-2)
utterance.rate = 0.9;     // Speech rate (0.1-10)
utterance.volume = 0.8;   // Volume (0-1)
```

## 📚 Spiritual Sources

Our curated collection includes wisdom from:

### Eastern Philosophy
- **Buddha** - Buddhist teachings and sayings
- **Lao Tzu** - Tao Te Ching passages
- **Rumi** - Sufi poetry and mysticism

### Modern Spiritual Teachers
- **Alan Watts** - Eastern philosophy for Western minds
- **Conversations with God** - Neale Donald Walsch
- **Seth Speaks** - Jane Roberts channeling

### Ancient Wisdom
- **Law of One** - Ra Material
- **Emerald Tablet** - Hermetic principles
- **Florence Scovel Shinn** - New Thought movement

### Contemporary Wisdom
- **Mahatma Gandhi** - Peace and non-violence
- **Albert Einstein** - Science and spirituality
- **Carl Jung** - Psychology and consciousness

## 🤝 Contributing

We welcome contributions to expand our wisdom library and improve the application!

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/add-new-quotes
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Submit a pull request**

### Contribution Guidelines

- **Quote Quality** - Ensure quotes are authentic and properly attributed
- **Code Style** - Follow existing JavaScript and CSS patterns
- **Testing** - Test on multiple browsers and devices
- **Documentation** - Update README if adding new features

### Areas for Contribution

- 📚 Additional spiritual quotes and sources
- 🎨 New theme designs
- 🔊 Enhanced audio features
- 🌐 Internationalization support
- ♿ Accessibility improvements

## 📊 Project Statistics

```
📝 Total Quotes: 115+
🎨 Themes Available: 4
🔊 Audio Voices: Auto-detected
📱 Responsive Breakpoints: 3
⚡ Lighthouse Score: 95+
🌍 Browser Support: 95%+
```

## 🐛 Known Issues & Roadmap

### Current Limitations
- Web Speech API availability varies by browser
- Some voices may not be available on all systems
- Offline functionality limited (quotes cached locally)

### Upcoming Features
- [ ] 🌐 Multi-language support
- [ ] 📱 Progressive Web App (PWA)
- [ ] 🔄 Quote sharing to social media
- [ ] 📈 Advanced analytics dashboard
- [ ] 🎵 Background meditation music
- [ ] 📅 Scheduled daily notifications

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License - Feel free to use, modify, and distribute
Attribution appreciated but not required
```

## 🙏 Acknowledgments

### Spiritual Teachers
Gratitude to all the spiritual masters whose wisdom illuminates this application.

### Technical Inspiration
- Modern web design principles
- Glassmorphism design trend
- Accessibility-first development

### Community
- Open source contributors
- Beta testers and feedback providers
- Spiritual community support

## 📞 Contact & Support

### Developer
**Thanatsitt Santisamranwilai**
- 🌐 Portfolio: [pigletpeakkung.github.io/Thannxai/](https://pigletpeakkung.github.io/Thannxai/)
- 💼 LinkedIn: [linkedin.com/in/thanattsitts](https://linkedin.com/in/thanattsitts)
- 💻 GitHub: [github.com/Pigletpeakkung](https://github.com/Pigletpeakkung)
- ✉️ Email: thanattsitt.info@yahoo.co.uk

### Support
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/yourusername/divine-light/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/yourusername/divine-light/discussions)
- 📧 **General Inquiries**: thanattsitt.info@yahoo.co.uk

---

<div align="center">

### 🌟 Star this repository if it brings you wisdom and peace! 🌟

**Made with ❤️ for spiritual seekers everywhere**

*"The light that burns twice as bright burns half as long—and you have burned so very, very brightly."*

[![GitHub stars](https://img.shields.io/github/stars/yourusername/divine-light?style=social)](https://github.com/yourusername/divine-light/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/divine-light?style=social)](https://github.com/yourusername/divine-light/network)

</div>

---

*Last Updated: December 2024 | Version 1.0.0*
