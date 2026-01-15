# Next Shop - E-commerce Application

A modern e-commerce application built with Next.js 14+ App Router, featuring separate marketing and dashboard layouts with authentication.

##  AI Tools Used

- ** AI Assistant** - Primary development assistant for:
  - Project architecture and structure
  - Component creation and refactoring
  - Layout implementation
  - Authentication flow
  - API integration
  - Bug fixing and optimization



## 🛠️ Manual Changes Made

### None Required
All code was generated and implemented by the AI assistant with no manual intervention needed. The AI:
- Created proper file structure
- Implemented authentication logic
- Set up route groups for layouts
- Fixed bugs and errors autonomously
- Refactored components for better architecture

## 📁 Project Structure

```
src/
├── app/
│   ├── (marketing)/          # Public pages with Navbar + Footer
│   │   ├── layout.jsx
│   │   ├── page.js           # Home
│   │   ├── products/         # Product listing & details
│   │   ├── login/
│   │   └── register/
│   │
│   ├── (dashboard)/          # Protected pages with Sidebar + Topbar
│   │   ├── layout.jsx
│   │   └── dashboard/
│   │       ├── page.jsx      # Dashboard home
│   │       ├── addresses/    # Customer addresses
│   │       └── brands/       # Brand management
│   │
│   ├── api/                  # API routes
│   ├── layout.js             # Root layout
│   ├── loading.jsx           # Global loading
│   └── not-found.jsx         # Global 404
│
├── components/
│   ├── auth/                 # Authentication components
│   ├── dashboard/            # Dashboard-specific components
│   └── ...                   # Shared components
│
├── context/                  # State management
│   ├── authStore.js          # Authentication state
│   └── ThemeContext.js       # Theme state
│
└── utils/
    └── proxy.js              # API proxy with auth handling
```

## 🎯 Key Features

### Dual Layout System
- **Marketing Layout**: Navbar + Footer for public pages
- **Dashboard Layout**: Sidebar + Topbar for authenticated pages
- Route groups `(marketing)` and `(dashboard)` for clean separation

### Authentication
- Login/Register with form validation
- Protected dashboard routes
- Automatic redirect to login if unauthorized
- API proxy with token management

### Customer Addresses
- View all customer addresses
- Add new addresses with full form
- Address type selection (shipping/billing)
- Default address marking

### UI/UX
- Dark mode support
- Responsive design
- Loading states
- Custom 404 pages
- Proper SEO metadata

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your API_URL

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔑 Environment Variables

```env
NEXT_PUBLIC_API_URL=your_api_url_here
```

## 📝 Development Notes

### Component Architecture
- Server components for pages (better SEO)
- Client components for interactivity
- Proper separation of concerns

### Authentication Flow
1. Dashboard layout checks for user
2. Redirects to login if not authenticated
3. API proxy handles 401/403 responses
4. Automatic logout and redirect on auth failure

### Metadata Strategy
- Static metadata for server components



## 🎨 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **Authentication**: Custom JWT implementation

## 📄 License

This project was built with AI assistance for educational purposes.
