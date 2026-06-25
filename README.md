# LearningEdge - E-Learning Platform Frontend

This is the frontend application for LearningEdge, a comprehensive e-learning platform built with React and Vite.

## 🚀 Features

- **User Authentication**: Complete authentication system with login, signup, and password recovery
- **Course Management**: Browse, search, and enroll in courses
- **Interactive Dashboard**: Dedicated dashboard for students
- **Course Catalog**: Browse courses with filtering and search capabilities
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Rating System**: Course rating and review system
- **Payment Integration**: Razorpay payment integration
- **Profile Management**: User profile customization and settings

## 🛠️ Tech Stack

- **Framework**: React.js
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux (with slices)
- **Routing**: React Router
- **API Integration**: Axios
- **Animation**: Framer Motion

## 📁 Project Structure

```
src/
├── assets/                 # Static assets
│   ├── Images/            # Course, user, and website images
│   ├── Logo/             # Brand logos and icons
│   └── TimeLineLogo/     # Timeline-related graphics
├── components/            # React components
│   ├── common/           # Shared components
│   │   ├── Footer.jsx       # Website footer
│   │   ├── Navbar.jsx       # Navigation bar
│   │   ├── IconBtn.jsx      # Reusable icon buttons
│   │   ├── RatingStars.jsx  # Star rating component
│   │   └── ...             # Other common UI elements
│   └── core/             # Feature-specific components
│       ├── AboutPage/       # About page components
│       ├── Auth/           # Authentication components
│       ├── Catalog/        # Course catalog components
│       ├── Course/         # Course-related components
│       ├── Dashboard/      # Dashboard UI components
│       └── ViewCourse/     # Course viewing components
├── data/                 # Static data files
│   ├── countrycode.js      # Country codes for forms
│   ├── dashboard-links.js  # Dashboard navigation links
│   └── navbar-links.js     # Navigation menu items
├── hooks/               # Custom React hooks
│   ├── useOnClickOutside.js  # Click outside detection
│   └── useRouteMatch.js      # Route matching utility
├── pages/              # Main application pages
│   ├── Home.jsx          # Landing page
│   ├── Login.jsx         # Authentication pages
│   ├── Dashboard.jsx     # User dashboard
│   ├── CourseDetails.jsx # Course information
│   └── ...              # Other main pages
├── reducer/            # Redux reducers
├── services/          # API and backend integration
│   ├── operations/       # API operations by feature
│   │   ├── authAPI.js      # Authentication APIs
│   │   ├── courseDetailsAPI.js  # Course-related APIs
│   │   └── ...             # Other API modules
│   ├── apiConnector.js   # Axios configuration
│   └── apis.js          # API endpoint definitions
├── slices/            # Redux toolkit state slices
│   ├── authSlice.js     # Authentication state
│   ├── cartSlice.js     # Shopping cart state
│   ├── courseSlice.js   # Course data state
│   └── ...             # Other state management
└── utils/            # Utility functions
    ├── constants.js    # Application constants
    ├── avgRating.js    # Rating calculation helpers
    └── dateFormatter.js # Date formatting utilities
```

### Key Directories Explained:

- **assets/**: Contains all static files including images, logos, and icons organized by type and usage.

- **components/**: 
  - **common/**: Reusable UI components used across multiple pages
  - **core/**: Feature-specific components organized by module/feature

- **data/**: Contains static data files used for configuration and content that doesn't change frequently.

- **hooks/**: Custom React hooks for shared functionality and logic reuse across components.

- **pages/**: Each file represents a main route/page in the application. These components typically compose various components to create full pages.

- **services/**: 
  - **operations/**: API integration organized by feature
  - **apiConnector.js**: Axios instance and interceptors
  - **apis.js**: API endpoint definitions and configurations

- **slices/**: Redux Toolkit slices for state management, organized by feature/domain.

- **utils/**: Helper functions, constants, and utility code used throughout the application.

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone <repository-url>
cd frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

The application will start running at `http://localhost:5173`

## 🔧 Configuration

- Edit `vite.config.js` for build and development configurations
- Update `tailwind.config.cjs` for styling customizations
- Configure API endpoints in `services/apis.js`

## 📱 Features Overview

- **Authentication**
  - User login/signup
  - Password recovery
  - Email verification
  - Protected routes

- **Course Management**
  - Course browsing and search
  - Course details view
  - Rating and reviews
  - Course enrollment

- **User Dashboard**
  - Profile management
  - Enrolled courses
  - Progress tracking
  - Settings

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 License

[Add your license information here]

## 👥 Contact

[Add your contact information here]

---
Built with ❤️ using React + Vite
