# Kerala HSE Platform - Development Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone https://github.com/ashiii2121/e-platform.git
cd e-platform

# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 2. Environment Setup

#### Server Environment (.env)
```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```env
MONGO_URI=mongodb://localhost:27017/kerala-hse-platform
JWT_SECRET=kerala-hse-super-secret-jwt-key-2025
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

#### Client Environment (.env)
```bash
cd ../client
```

Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Kerala HSE Platform
VITE_APP_VERSION=1.0.0
```

### 3. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. The database will be created automatically

#### Option B: MongoDB Atlas (Cloud)
1. Create account at https://mongodb.com/atlas
2. Create a cluster
3. Get connection string
4. Update MONGO_URI in server/.env

### 4. Seed Database (Optional)

```bash
cd server
npm run seed
```

This will populate the database with:
- 26 subjects across Class 10, Plus One, Plus Two
- 650+ exam papers (2000-2025)
- Sample data for testing

### 5. Start Development Servers

#### Terminal 1 - Backend Server
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

#### Terminal 2 - Frontend Client
```bash
cd client
npm run dev
# Client runs on http://localhost:5173
```

### 6. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **API Documentation**: http://localhost:5000/api/docs (if implemented)

## 🎯 Features Overview

### ✅ Completed Features

1. **Modern Homepage**
   - Hero section with Kerala HSE branding
   - Gradient backgrounds and animations
   - Mobile-responsive design
   - Clear call-to-action buttons

2. **Enhanced Dashboard**
   - Kerala HSE subjects organized by class
   - Search and filter functionality
   - Statistics overview
   - Subject cards with icons and descriptions

3. **Subject Pages**
   - Individual pages for each subject
   - 25+ years of exam papers (2000-2025)
   - Advanced filtering by year and difficulty
   - Download functionality with tracking

4. **Enhanced Signup**
   - Two-column responsive layout
   - Real-time form validation
   - Password strength indicator
   - Mobile-first design

5. **Backend API**
   - RESTful API with Express.js
   - MongoDB integration with Mongoose
   - JWT authentication
   - CRUD operations for subjects and papers
   - Download tracking
   - Error handling and validation

6. **Database Models**
   - User model with enhanced features
   - Subject model for Kerala HSE subjects
   - ExamPaper model with metadata
   - Proper indexing for performance

### 🔧 API Endpoints

#### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

#### Subjects
- `GET /api/subjects` - Get all subjects grouped by class
- `GET /api/subjects/class/:className` - Get subjects by class
- `GET /api/subjects/:subjectId` - Get single subject
- `GET /api/subjects/search/:query` - Search subjects

#### Exam Papers
- `GET /api/exam-papers` - Get all papers with filtering
- `GET /api/exam-papers/subject/:subjectId` - Get papers by subject
- `GET /api/exam-papers/:paperId` - Get single paper
- `POST /api/exam-papers/:paperId/download` - Download paper (with tracking)
- `GET /api/exam-papers/subject/:subjectId/years` - Get available years
- `GET /api/exam-papers/stats/overview` - Get statistics

## 🎨 UI/UX Improvements

### Design System
- Consistent color scheme with Kerala HSE branding
- Modern gradient backgrounds
- Glass morphism effects
- Smooth animations and transitions
- Mobile-first responsive design

### Typography
- Clear hierarchy with proper font sizes
- Readable fonts (Segoe UI family)
- Proper contrast ratios
- Responsive text scaling

### Interactive Elements
- Hover effects on cards and buttons
- Loading states and spinners
- Form validation feedback
- Success/error messages

## 📱 Mobile Optimization

### Responsive Breakpoints
- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: 320px - 767px

### Mobile Features
- Touch-friendly interface
- Optimized layouts for small screens
- Fast loading performance
- Accessible navigation

## 🔒 Security Features

### Authentication
- JWT token-based authentication
- Password hashing with bcrypt
- Secure password requirements
- Token expiration handling

### Data Validation
- Input sanitization
- Schema validation with Mongoose
- Error handling and logging
- CORS configuration

## 🚀 Deployment

### Frontend (GitHub Pages)
```bash
cd client
npm run build
npm install -g gh-pages
gh-pages -d dist
```

### Backend (Heroku/Railway/Vercel)
1. Create account on hosting platform
2. Connect GitHub repository
3. Set environment variables
4. Deploy automatically

### Database (MongoDB Atlas)
1. Create MongoDB Atlas account
2. Set up cluster
3. Configure network access
4. Update connection string

## 🧪 Testing

### Manual Testing Checklist
- [ ] Homepage loads correctly
- [ ] Hero section text is visible
- [ ] Navigation works
- [ ] Signup form validation
- [ ] Dashboard displays subjects
- [ ] Subject pages load papers
- [ ] Download functionality works
- [ ] Mobile responsiveness
- [ ] API endpoints respond correctly

### Automated Testing (Future)
- Unit tests for components
- Integration tests for API
- E2E tests for user flows
- Performance testing

## 🐛 Troubleshooting

### Common Issues

1. **Hero text not visible**
   - Check CSS z-index values
   - Verify gradient background
   - Ensure proper color contrast

2. **API connection failed**
   - Verify server is running on port 5000
   - Check CORS configuration
   - Validate environment variables

3. **Database connection error**
   - Ensure MongoDB is running
   - Check connection string
   - Verify network access (Atlas)

4. **Build errors**
   - Clear node_modules and reinstall
   - Check for missing dependencies
   - Verify environment variables

### Debug Commands
```bash
# Check server logs
cd server && npm run dev

# Check client build
cd client && npm run build

# Test API endpoints
curl http://localhost:5000/api/subjects

# Check database connection
cd server && node -e "require('./config/db.js')"
```

## 📈 Performance Optimization

### Frontend
- Code splitting with React.lazy
- Image optimization
- CSS minification
- Bundle size analysis

### Backend
- Database indexing
- Query optimization
- Caching strategies
- Rate limiting

### Database
- Proper indexing on search fields
- Aggregation pipelines
- Connection pooling
- Query performance monitoring

## 🔮 Future Enhancements

### Planned Features
- User authentication with social login
- Bookmark and favorites system
- Download history tracking
- Study notes and annotations
- Practice test generation
- Performance analytics
- Push notifications
- Offline support
- Dark mode theme
- Multi-language support (Malayalam)

### Technical Improvements
- TypeScript migration
- GraphQL API
- Redis caching
- Elasticsearch integration
- Microservices architecture
- Docker containerization
- CI/CD pipeline
- Automated testing suite

---

**Happy Coding! 🚀**

For support or questions, please create an issue in the GitHub repository.
