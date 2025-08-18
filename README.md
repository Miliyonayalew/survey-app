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
   npm run dev
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
http://localhost:3000/api
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

## 🚀 Deployment

### Backend Deployment
1. Build the application: `npm build`
2. Set production environment variables
3. Deploy to your preferred platform (Heroku, Vercel, etc.)

### Frontend Deployment
1. Build the application: `pnpm build`
2. Deploy the `dist` folder to your preferred platform


## Tradeoffs & Decisions


#### **Prioritization Strategy**
- **Backend-First**: Started with database schema, then API endpoints with robust validation
- **Data Quality Priority**: Ensured clean, validated data before UI enhancements
- **API Contracts**: Defined clear interfaces before frontend development
- **Functional Demo**: Guaranteed working system even with minimal UI

#### **What I Chose to Implement**
- **Robust Backend**: Database schema, API endpoints, validation layer
- **Data Quality**: Required field validation, data type validation, input sanitization
- **API Contracts**: Clear, well-defined endpoints for frontend consumption
- **Error Handling**: Comprehensive validation and error responses
- **UX Enhancements**: Pagination, progress indicators, responsive design (after backend stability)

#### **What I Skipped (and Why)**
- **Complex Frontend Features**: Prioritized backend stability and data quality
- **User Authentication**: Not required for assignment, adds complexity

### **Technical Stack Decisions**

#### **Backend-First Approach**
- **Why Backend First**: Data quality is critical for ML model accuracy
- **Database Schema**: Started with Prisma schema to define data structure
- **API Endpoints**: Built robust validation before frontend development
- **Type Safety**: Zod validation ensures data integrity

#### **Frontend: React + TypeScript + Tailwind**
- **Why React**: Familiar, fast development, large ecosystem
- **Why TypeScript**: Type safety prevents bugs, better IDE support
- **Why Tailwind**: Rapid UI development, consistent design system

#### **Backend: Express.js + SQLite + Prisma**
- **Why Express**: Simple, fast to set up, perfect for REST APIs
- **Why SQLite**: Zero configuration, file-based, perfect for assignment
- **Why Prisma**: Type-safe database operations, excellent DX

#### **Additional Libraries**
- **shadcn/ui**: Pre-built components save time, consistent design
- **React Query**: Handles server state, caching, loading states
- **Zod**: Type-safe validation, perfect TypeScript integration

### **UX/UI Decisions**

#### **Pagination vs Single Questions**
- **Chose Pagination**: Less overwhelming, better progress tracking
- **5 Questions per Page**: Balance between speed and cognitive load
- **Progress Bar**: Clear completion indication

#### **Form Validation Strategy**
- **Individual Error Messages**: Better UX than bulk error list
- **Real-time Validation**: Immediate feedback as user types
- **Required Field Indicators**: Clear visual cues

#### **Responsive Design**
- **Mobile-First**: Most users access forms on mobile
- **Touch-Friendly**: Large buttons, proper spacing
- **Readable Typography**: Clear hierarchy and contrast

### **Database Design**

#### **Simple Schema**
- **Survey**: Basic survey information
- **Question**: Flexible question types with options
- **Submission**: User responses
- **Answer**: Individual question responses

#### **Why This Structure**
- **Flexible**: Supports multiple question types
- **Scalable**: Easy to add new question types
- **Simple**: Quick to implement and understand

### **API Design**

#### **RESTful Endpoints**
- `GET /surveys/:id` - Get survey with questions
- `POST /surveys/:id/submissions` - Submit responses
- `GET /surveys/submissions/:id` - View submission

#### **Why This Approach**
- **Standard**: Familiar REST patterns
- **Simple**: Easy to understand and test
- **Scalable**: Easy to extend with new features

### **Performance Considerations**

#### **Frontend Optimization**
- **Component Splitting**: Separate components for reusability
- **Lazy Loading**: Only load what's needed
- **Efficient State Management**: React Query for server state

#### **Backend Optimization**
- **Database Indexes**: Proper indexing on surveyId
- **Validation**: Fast runtime validation with Zod
- **Error Handling**: Comprehensive error responses

#### **Input Validation**
- **Zod Schemas**: Runtime validation for all inputs
- **Type Safety**: TypeScript prevents type-related bugs
- **SQL Injection Protection**: Prisma handles parameterized queries

#### **What I Didn't Implement**
- **Authentication**: Not required for assignment
- **Rate Limiting**: Beyond scope(I was planing to add this for the get submission endpoint but due time constraint i didn't add)
- **HTTPS**: Development environment

### **What I Would Do With More Time**

#### **Immediate Improvements**
- **Survey Creation Interface**: Allow admins to create surveys
- **Testing**: Unit and integration tests

- **Better Error Handling**: More detailed error messages

- **Form Persistence**: Save progress if user leaves

#### **Advanced Features**
- **User Authentication**: Secure survey access
- **Survey Analytics**: Response analysis and reporting
- **Export Functionality**: PDF/CSV export of responses
- **Survey Templates**: Reusable survey structures

#### **Production Readiness**
- **Deployment**: Docker configuration
- **Monitoring**: Error tracking and analytics
- **Documentation**: API documentation and user guides

## 🔮 Future Enhancements

- [ ] User authentication and authorization
- [ ] Dynamic Survey creation interface
- [ ] Survey analytics and reporting
- [ ] Survey templates
- [ ] Advanced question types (file upload, rating scales)
- [ ] Real-time collaboration
- [ ] Export functionality (PDF, CSV)
- [ ] Dark mode theme
