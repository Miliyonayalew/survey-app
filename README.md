# SurveyApp

A modern, full-stack survey application built with React, TypeScript, Express.js, and Prisma. Create, manage, and respond to surveys with a beautiful, responsive interface.

## 🚀 Features

### Frontend
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Modern UI** - Built with shadcn/ui components and Tailwind CSS
- **Form Validation** - Real-time validation with individual error messages
- **Pagination** - 5 questions per page with progress tracking
- **Dynamic Forms** - Supports multiple question types:
  - Text, Email, Number inputs
  - Date picker with calendar
  - Single select dropdowns
  - Multi-select checkboxes
- **Survey Submission** - Complete survey flow with success confirmation
- **Submission Review** - View submitted responses with detailed breakdown

### Backend
- **RESTful API** - Clean, well-structured endpoints
- **Database Integration** - SQLite with Prisma ORM
- **Validation** - Zod schema validation for all inputs
- **Error Handling** - Comprehensive error responses
- **Type Safety** - Full TypeScript implementation

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible components
- **React Router** - Client-side routing
- **React Query** - Server state management
- **React Hook Form** - Form handling
- **date-fns** - Date manipulation and formatting

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe development
- **Prisma** - Database ORM
- **SQLite** - Lightweight database
- **Zod** - Schema validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Pino** - Logging

## 📁 Project Structure

```
SurveyApp/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ui/          # shadcn/ui components
│   │   │   ├── NavigationButtons.tsx
│   │   │   ├── ProgressHeader.tsx
│   │   │   ├── QuestionField.tsx
│   │   │   └── SurveyForm.tsx
│   │   ├── pages/           # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── SurveyPage.tsx
│   │   │   └── SubmissionPage.tsx
│   │   ├── hook/            # Custom React hooks
│   │   │   └── useSurvey.ts
│   │   ├── lib/             # Utility functions and API
│   │   │   ├── api/
│   │   │   └── utils.ts
│   │   ├── types/           # TypeScript type definitions
│   │   └── main.tsx         # Application entry point
│   ├── package.json
│   └── vite.config.ts
├── backend/                  # Express.js backend application
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── repositories/    # Data access layer
│   │   ├── routes/          # API route definitions
│   │   ├── middleware/      # Express middleware
│   │   ├── validation/      # Zod schemas
│   │   ├── db/              # Database configuration
│   │   └── types/           # TypeScript type definitions
│   ├── prisma/              # Database schema and migrations
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Configure your `.env` file:
   ```env
   DATABASE_URL="file:./dev.db"
   PORT=3000
   ```

4. **Set up the database:**
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   npm run prisma:seed
   npm run prisma:studio
   ```

5. **Start the development server:**
   ```bash
   pnpm dev
   ```

   The backend will be available at `http://localhost:3001`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   pnpm dev
   ```

   The frontend will be available at `http://localhost:5173`

## 📚 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Endpoints

#### Surveys
- `GET /surveys/:id` - Get survey by ID
- `POST /surveys/:id/submissions` - Submit survey responses

#### Submissions
- `GET /surveys/submissions/:id` - Get submission by ID

#### Health Check
- `GET /health` - API health status

### Request/Response Examples

#### Get Survey
```bash
GET /api/surveys/1
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Customer Feedback Survey",
    "description": "Help us improve our services",
    "questions": [
      {
        "id": 1,
        "text": "What is your name?",
        "type": "TEXT",
        "required": true,
        "options": null
      }
    ]
  }
}
```

#### Submit Survey
```bash
POST /api/surveys/1/submissions
Content-Type: application/json

{
  "surveyId": 1,
  "answers": [
    {
      "questionId": 1,
      "value": "John Doe"
    }
  ]
}
```

Response:
```json
{
  "success": true,
  "data": {
    "submissionId": 1
  }
}
```

## 🎨 Component Architecture

### Frontend Components

#### Core Components
- **SurveyForm** - Main form component with pagination and validation
- **QuestionField** - Renders individual questions based on type
- **NavigationButtons** - Form navigation (Previous, Next, Submit)
- **ProgressHeader** - Progress bar and page information

#### Question Types
- **TextInput** - Text, email, and number inputs
- **DateInput** - Date picker with calendar
- **SelectInput** - Single select dropdown
- **MultiSelectInput** - Multi-select checkboxes

### Backend Architecture

#### Layers
- **Controllers** - Handle HTTP requests and responses
- **Services** - Business logic and validation
- **Repositories** - Data access and database operations
- **Middleware** - Request processing and validation

## 🔧 Development

### Available Scripts

#### Backend
```bash
npm run dev       # Start development server
npm run build     # Build for production (if script exists)
npm run start     # Start production server (if script exists)
npx prisma studio # Open Prisma Studio
```

#### Frontend
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
```

### Database Management

```bash
# navigate to the backend
cd backend

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Reset database
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio
```

## 🚀 Deployment

### Backend Deployment
1. Build the application: `npm build`
2. Set production environment variables
3. Deploy to your preferred platform (Heroku, Vercel, etc.)

### Frontend Deployment
1. Build the application: `pnpm build`
2. Deploy the `dist` folder to your preferred platform


## 🔮 Future Enhancements

- [ ] User authentication and authorization
- [ ] Dynamic Survey creation interface
- [ ] Survey analytics and reporting
- [ ] Survey templates
- [ ] Advanced question types (file upload, rating scales)
- [ ] Real-time collaboration
- [ ] Export functionality (PDF, CSV)
- [ ] Dark mode theme
