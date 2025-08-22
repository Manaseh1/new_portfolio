# Portfolio Website

A modern, responsive portfolio website built with vanilla JavaScript, HTML5, and CSS3. Features smooth animations, interactive elements, and mobile-first design.

## 🌟 Features

- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Elements**: 
  - Typing effect in hero section
  - Animated skill bars
  - Project filtering
  - Smooth scrolling navigation
  - Contact form with validation
- **Performance Optimized**: Fast loading with optimized images and code
- **SEO Friendly**: Proper meta tags and semantic HTML
- **Cross-Browser Compatible**: Works on all modern browsers

## 🚀 Live Demo

[View Live Portfolio](https://your-portfolio-url.com)

## 📋 Sections

1. **Hero Section**: Eye-catching introduction with typing animation
2. **About**: Personal information and statistics
3. **Skills**: Technical skills with animated progress bars
4. **Projects**: Portfolio showcase with filtering options
5. **Contact**: Contact form and information

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Segoe UI fallback)
- **Development**: Live Server for local development

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   - The site will automatically open at `http://localhost:3000`

## 🎨 Customization

### Personal Information
Edit the following in `index.html`:
- Name and title in hero section
- About section content
- Contact information
- Social media links

### Projects
Modify the `projectsData` array in `script.js` to add your own projects:

```javascript
const projectsData = [
    {
        title: 'Your Project Name',
        description: 'Project description',
        image: 'path/to/image.jpg',
        tech: ['Technology', 'Stack'],
        category: 'web', // 'web', 'mobile', or 'design'
        demoLink: 'https://demo-link.com',
        codeLink: 'https://github.com/yourusername/project'
    }
];
```

### Styling
- Colors: Modify CSS custom properties in `styles.css`
- Fonts: Update font imports and font-family declarations
- Layout: Adjust grid and flexbox properties as needed

### Skills
Update the skills section in `index.html` with your technical skills and proficiency levels.

## 📱 Mobile Optimization

- Mobile-first design approach
- Touch-friendly navigation
- Optimized images and loading
- Responsive typography and spacing

## 🔧 Development Scripts

```bash
# Start development server
npm start

# Start with file watching (auto-reload)
npm run dev

# Build for production (placeholder)
npm run build

# Deploy (placeholder)
npm run deploy
```

## 📂 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── package.json        # Project configuration
├── README.md           # Project documentation
└── assets/             # Images and other assets
    ├── images/
    └── icons/
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📈 Performance

- Optimized CSS and JavaScript
- Efficient animations using CSS transforms
- Lazy loading for images
- Minimal external dependencies

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- Website: [your-website.com](https://your-website.com)
- LinkedIn: [@your-linkedin](https://linkedin.com/in/your-linkedin)
- GitHub: [@your-github](https://github.com/your-github)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Inspiration from various portfolio designs
- The web development community

---

⭐ **If you found this project helpful, please give it a star!**
