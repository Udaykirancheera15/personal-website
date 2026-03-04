# Udaykiran Cheera - Personal Portfolio

A vintage-themed personal portfolio website showcasing skills, experience, projects, and more.

![Portfolio Preview](https://via.placeholder.com/800x400?text=Vintage+Portfolio)

## Features

- 🎨 **Vintage/Retro Design** - Beautiful parchment-themed UI with typewriter effects
- 🤖 **AI Chat Assistant** - Interactive chatbot to answer questions about skills, projects, experience
- ✨ **Smooth Animations** - Scroll-triggered animations and transitions
- 📱 **Fully Responsive** - Works on all devices
- ⚡ **Instant Loading** - Static site for blazing fast performance
- 📬 **Contact Form** - Fully functional contact form

## Tech Stack

- HTML5
- CSS3 (Custom properties, animations, flexbox, grid)
- JavaScript (Vanilla JS - no frameworks)
- SVG Icons

## Deployment

This is a static website that can be deployed to any static hosting service:

### Deploy to Render (Static Site)

1. Push this code to your GitHub repository
2. Create a new Static Site on Render
3. Connect your GitHub repository
4. Use these settings:
   - Build Command: (leave empty)
   - Publish Directory: .

### Deploy to GitHub Pages

1. Go to Repository Settings
2. Enable GitHub Pages
3. Select the `main` branch as source

### Deploy to Netlify

1. Drag and drop the project folder to Netlify
2. Done!

## Customization

### Change Profile Image
Replace `assets/images/profile.jpg` with your own photo.

### Update Personal Information
Edit the `index.html` file to update:
- Name and title
- About section content
- Skills
- Experience
- Projects

### Modify Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --color-parchment: #f4e4bc;
    --color-ink: #2c2416;
    --color-sepia: #8b6914;
    /* Add more variables */
}
```

## AI Chat

The AI chat widget contains information about:
- Skills and tech stack
- Work experience
- Projects
- Education
- Certifications
- Contact information

The AI uses keyword matching to provide relevant responses. You can customize the `portfolioData` object in `script.js` to update information.

## License

MIT License

## Contact

- Email: udaykirancheera15@gmail.com
- LinkedIn: [linkedin.com/in/udaykiran-cheera](https://linkedin.com/in/udaykiran-cheera)
- GitHub: [github.com/Udaykirancheera15](https://github.com/Udaykirancheera15)
