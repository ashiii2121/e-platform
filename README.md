# 🏛️ Kerala HSE Previous Papers Platform

A comprehensive web platform providing access to Kerala Higher Secondary Education (HSE) previous year question papers from 2000-2025. This platform serves students preparing for Class 10 (SSLC), Plus One (Class 11), and Plus Two (Class 12) examinations.

## ✨ Features

### 📚 Comprehensive Paper Collection
- **25+ Years of Papers**: Access question papers from 2000 to 2025
- **All Classes Covered**: Class 10 (SSLC), Plus One, and Plus Two
- **Multiple Subjects**: Mathematics, Physics, Chemistry, Biology, Computer Science, English, Malayalam, Economics, Accountancy, Business Studies, and more
- **Official Sources**: Papers sourced from Kerala DHSE Portal, Education Observer, HSS Live, and other credible sources

### 🎨 Modern User Interface
- **Clean Dashboard**: Modern admin-style interface with intuitive navigation
- **Subject Cards**: Beautiful subject cards with icons and descriptions
- **Search & Filter**: Advanced search and filtering by year, difficulty, and subject
- **Mobile Responsive**: Optimized for phones, tablets, and desktops

### 🔐 Enhanced Authentication
- **Secure Signup**: Advanced form validation with real-time feedback
- **Password Strength**: Visual password strength indicator
- **Mobile-First Design**: Responsive signup form with modern UI
- **Client-Side Validation**: Email format, password requirements, and confirmation matching

### 📱 Mobile-First Design
- **Responsive Layout**: Seamless experience across all devices
- **Touch-Friendly**: Optimized for mobile interactions
- **Fast Loading**: Optimized performance for mobile networks
- **Accessibility**: WCAG compliant design principles

## 🚀 Live Demo

Visit the live platform: [Kerala HSE Papers Platform](https://ashiii2121.github.io/e-platform)

## 📁 Project Structure

```
e-platform/
├── client/                     # React frontend application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   └── dashboard/      # Dashboard-specific components
│   │   ├── data/              # Data files and configurations
│   │   │   └── keralaHSEData.js # Kerala HSE subjects and papers data
│   │   ├── pages/             # Page components
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── SubjectPage.jsx
│   │   │   ├── EnhancedSignupPage.jsx
│   │   │   └── ...
│   │   └── assets/            # Static assets
│   ├── public/                # Public assets
│   └── package.json           # Frontend dependencies
├── server/                    # Node.js backend (optional)
│   ├── routes/               # API routes
│   ├── models/               # Data models
│   └── package.json          # Backend dependencies
├── README.md                 # Project documentation
└── package.json             # Root package configuration
```

## 🛠️ Technologies Used

### Frontend
- **React 19.1.0** - Modern UI library with hooks
- **React Router DOM 7.7.1** - Client-side routing
- **Vite 7.0.6** - Fast build tool and development server
- **React Icons** - Beautiful icon library
- **CSS3** - Modern styling with Grid, Flexbox, and animations

### Backend (Optional)
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Axios** - HTTP client for API requests

### Development Tools
- **ESLint** - Code linting and formatting
- **Vite** - Development server with hot reload
- **Git** - Version control

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 16.0 or higher)
- **npm** (version 7.0 or higher) or **yarn**
- **Git** for version control

## ⚡ Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/ashiii2121/e-platform.git
cd e-platform
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
```

### 3. Start Development Server
```bash
# From the client directory
npm run dev
```

### 4. Open in Browser
Navigate to `http://localhost:5173` to view the application.

## 🎯 Usage Guide

### Dashboard Navigation
1. **Access Dashboard**: Navigate to `/dashboard` after signup/login
2. **Browse Subjects**: Use the class tabs (Class 10, Plus One, Plus Two) to filter subjects
3. **Search**: Use the search bar to find specific subjects
4. **View Papers**: Click "View Papers" on any subject card

### Subject Pages
1. **Filter Papers**: Use year and difficulty filters to narrow down papers
2. **Search Papers**: Search by title, year, or topics
3. **Download**: Click download buttons for available papers
4. **Preview**: Use preview functionality to view papers before downloading

### Account Creation
1. **Signup**: Navigate to `/signup` for account creation
2. **Validation**: Real-time form validation with visual feedback
3. **Password Strength**: Monitor password strength with visual indicator
4. **Mobile Friendly**: Optimized signup experience on mobile devices

## 🎨 Design Inspiration

The platform draws inspiration from modern admin dashboards and educational platforms:

- **ArchitectUI** - Clean admin interface patterns
- **CoreUI** - Modern component design
- **Material UI** - Google's Material Design principles
- **Kiaalap** - Educational platform UX patterns
- **Light Dashboard** - Minimalist dashboard layouts

## 📊 Data Sources

### Official Kerala HSE Sources
- **[Kerala DHSE Portal](https://dhsekerala.gov.in)** - Official Directorate of Higher Secondary Education
- **[Education Observer](https://educationobserver.com)** - Comprehensive collection of Kerala HSE papers
- **[HSS Live](https://hsslive.in)** - Kerala Higher Secondary education portal
- **[HSS Reporter](https://hssreporter.com)** - Kerala HSE news and previous papers

### Paper Coverage
- **Years**: 2000-2025 (26 years of papers)
- **Availability**: Papers from 2015 onwards are readily available
- **Format**: PDF format for easy download and printing
- **Quality**: High-quality scanned documents from official sources

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### Adding New Subjects
1. Edit `client/src/data/keralaHSEData.js`
2. Add subject to appropriate class (class10, plus1, plus2)
3. Include subject details: id, name, code, icon, description
4. Papers will be automatically generated for 2000-2025

### Customizing Styles
- Main styles: `client/src/index.css`
- Component styles: Individual CSS files in component directories
- Dashboard styles: `client/src/components/dashboard/KeralaHSEDashboard.css`
- Signup styles: `client/src/pages/EnhancedSignupPage.css`

## 🚀 Deployment

### GitHub Pages Deployment
1. **Build the project**:
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to GitHub Pages**:
   ```bash
   # Install gh-pages if not already installed
   npm install -g gh-pages
   
   # Deploy dist folder to gh-pages branch
   gh-pages -d dist
   ```

3. **Configure GitHub Pages**:
   - Go to repository Settings > Pages
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch
   - Set folder to "/ (root)"

### Alternative Deployment Options
- **Vercel**: Connect GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder
- **Firebase Hosting**: Use Firebase CLI for deployment

## 🤝 Contributing

We welcome contributions to improve the Kerala HSE Papers Platform!

### How to Contribute
1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Contribution Guidelines
- Follow existing code style and conventions
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed
- Ensure mobile responsiveness

### Areas for Contribution
- **New Subjects**: Add more subjects or specialized streams
- **UI Improvements**: Enhance user interface and experience
- **Performance**: Optimize loading times and responsiveness
- **Accessibility**: Improve WCAG compliance
- **Features**: Add new functionality like bookmarks, notes, etc.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Kerala DHSE** for providing official question papers
- **Education Observer** for comprehensive paper collections
- **HSS Live** and **HSS Reporter** for additional resources
- **React Community** for excellent documentation and tools
- **Open Source Contributors** who make projects like this possible

## 📞 Support

If you encounter any issues or have questions:

1. **Check the Issues**: Look for existing solutions in GitHub Issues
2. **Create an Issue**: Report bugs or request features
3. **Documentation**: Refer to this README for setup and usage
4. **Community**: Join discussions in the repository

## 🔄 Changelog

### Version 1.0.0 (Current)
- ✅ Complete Kerala HSE dashboard with all subjects
- ✅ Subject pages with 25+ years of papers (2000-2025)
- ✅ Enhanced mobile-responsive signup page
- ✅ Modern UI with gradient backgrounds and animations
- ✅ Advanced search and filtering capabilities
- ✅ Real-time form validation
- ✅ Password strength indicator
- ✅ Responsive design for all devices

### Planned Features
- 🔄 User authentication and profiles
- 🔄 Bookmark and favorites system
- 🔄 Download history tracking
- 🔄 Study notes and annotations
- 🔄 Practice test generation
- 🔄 Performance analytics

---

**Made with ❤️ for Kerala HSE students**

*Empowering students with easy access to quality educational resources*
