# CareOS - System Design Document

## Project Overview

**Project Name:** CareOS - Smart Patient Care & Monitoring System  
**Version:** 1.0  
**Date:** January 2026  
**Architecture:** Full-Stack Web Application  
**Design Pattern:** MVC (Model-View-Controller)  

## 1. System Architecture

### 1.1 High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │    Database     │
│   (Client)      │◄──►│   (Server)      │◄──►│   (MongoDB)     │
│                 │    │                 │    │                 │
│ • HTML/CSS/JS   │    │ • Node.js       │    │ • Collections   │
│ • Bootstrap     │    │ • Express.js    │    │ • Documents     │
│ • Chart.js      │    │ • RESTful APIs  │    │ • Indexes       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 1.2 Technology Stack

#### Frontend Technologies
- **HTML5**: Semantic markup and structure
- **CSS3**: Styling and responsive design
- **Bootstrap 5**: UI framework and components
- **JavaScript (ES6+)**: Client-side functionality
- **Chart.js**: Data visualization
- **Font Awesome**: Icons and visual elements

#### Backend Technologies
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL document database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Token authentication
- **bcryptjs**: Password hashing
- **QRCode**: QR code generation

#### Development Tools
- **npm**: Package management
- **nodemon**: Development server
- **dotenv**: Environment configuration

## 2. Database Design

### 2.1 Database Schema

#### 2.1.1 Users Collection
```javascript
{
  _id: ObjectId,
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed, required),
  role: String (enum: ['doctor', 'nurse', 'family']),
  name: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

#### 2.1.2 Patients Collection
```javascript
{
  _id: ObjectId,
  patientId: String (unique, required),
  qrCode: String (unique, required),
  name: String (required),
  age: Number (required),
  gender: String (enum: ['Male', 'Female', 'Other']),
  bloodGroup: String (required),
  condition: String (enum: ['Stable', 'Improving', 'Needs Attention']),
  admissionDate: Date (default: now),
  assignedDoctor: ObjectId (ref: User),
  assignedNurse: ObjectId (ref: User),
  familyMembers: [ObjectId] (ref: User),
  medicalHistory: String,
  allergies: [String],
  emergencyContact: {
    name: String,
    phone: String,
    relation: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### 2.1.3 Vitals Collection
```javascript
{
  _id: ObjectId,
  patientId: ObjectId (ref: Patient, required),
  bloodPressure: {
    systolic: Number (required),
    diastolic: Number (required)
  },
  heartRate: Number (required),
  spO2: Number (required),
  temperature: Number (required),
  respiratoryRate: Number (required),
  recordedBy: ObjectId (ref: User, required),
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### 2.1.4 Medications Collection
```javascript
{
  _id: ObjectId,
  patientId: ObjectId (ref: Patient, required),
  medicationName: String (required),
  dosage: String (required),
  frequency: String (required),
  startDate: Date (required),
  endDate: Date,
  instructions: String,
  prescribedBy: ObjectId (ref: User, required),
  schedule: [{
    time: String,
    status: String (enum: ['pending', 'given', 'missed']),
    givenBy: ObjectId (ref: User),
    givenAt: Date,
    notes: String
  }],
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### 2.2 Database Relationships

```
Users (1) ──── (M) Patients (assignedDoctor)
Users (1) ──── (M) Patients (assignedNurse)
Users (M) ──── (M) Patients (familyMembers)
Users (1) ──── (M) Vitals (recordedBy)
Users (1) ──── (M) Medications (prescribedBy)
Patients (1) ── (M) Vitals
Patients (1) ── (M) Medications
```

### 2.3 Indexing Strategy

```javascript
// Users Collection
db.users.createIndex({ "username": 1 }, { unique: true })
db.users.createIndex({ "email": 1 }, { unique: true })
db.users.createIndex({ "role": 1 })

// Patients Collection
db.patients.createIndex({ "patientId": 1 }, { unique: true })
db.patients.createIndex({ "qrCode": 1 }, { unique: true })
db.patients.createIndex({ "assignedDoctor": 1 })
db.patients.createIndex({ "assignedNurse": 1 })

// Vitals Collection
db.vitals.createIndex({ "patientId": 1, "createdAt": -1 })
db.vitals.createIndex({ "recordedBy": 1 })

// Medications Collection
db.medications.createIndex({ "patientId": 1, "isActive": 1 })
db.medications.createIndex({ "prescribedBy": 1 })
```

## 3. API Design

### 3.1 RESTful API Endpoints

#### 3.1.1 Authentication Endpoints
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - User login
```

#### 3.1.2 Patient Endpoints
```
GET    /api/patients              - Get all patients (role-filtered)
POST   /api/patients              - Create new patient (doctor only)
GET    /api/patients/:id          - Get patient by ID
GET    /api/patients/qr/:qrCode   - Get patient by QR code
PATCH  /api/patients/:id/condition - Update patient condition
```

#### 3.1.3 Vital Signs Endpoints
```
GET    /api/vitals/patient/:patientId         - Get patient vitals
POST   /api/vitals                            - Add new vital signs
GET    /api/vitals/patient/:patientId/latest  - Get latest vitals
```

#### 3.1.4 Medication Endpoints
```
GET    /api/medications/patient/:patientId           - Get patient medications
POST   /api/medications                              - Add new medication
PATCH  /api/medications/:id/schedule/:index         - Update medication status
GET    /api/medications/upcoming                     - Get upcoming medications
```

### 3.2 API Response Format

#### Success Response
```javascript
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation successful"
}
```

#### Error Response
```javascript
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message"
  }
}
```

### 3.3 Authentication Flow

```
1. User submits login credentials
2. Server validates credentials
3. Server generates JWT token
4. Token sent to client
5. Client stores token (localStorage)
6. Client includes token in subsequent requests
7. Server validates token on protected routes
8. Server processes request if token valid
```

## 4. Frontend Design

### 4.1 User Interface Architecture

#### 4.1.1 Component Structure
```
CareOS Frontend
├── Authentication
│   ├── Login Form
│   └── User Session Management
├── Dashboard
│   ├── Navigation Bar
│   ├── Sidebar Menu
│   └── Main Content Area
├── Patient Management
│   ├── Patient List
│   ├── Patient Details Modal
│   ├── Add Patient Form
│   └── QR Scanner
├── Vital Signs
│   ├── Vital Signs Display
│   ├── Add Vitals Form
│   └── Charts/Graphs
└── Medications
    ├── Medication List
    ├── Upcoming Medications
    └── Administration Interface
```

#### 4.1.2 Responsive Design Breakpoints
```css
/* Mobile First Approach */
/* Extra Small devices (phones, 576px and down) */
@media (max-width: 575.98px) { }

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) { }

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) { }

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) { }

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) { }
```

### 4.2 User Experience Design

#### 4.2.1 Navigation Flow
```
Login → Dashboard → Patient List → Patient Details
                 → QR Scanner → Patient Details
                 → Add Patient → Patient List
                 → Medications → Medication Management
```

#### 4.2.2 Role-Based UI Elements
```javascript
// Doctor View
- Full navigation menu
- Add patient button
- Prescribe medication
- Edit patient information
- View all patients

// Nurse View
- Limited navigation menu
- Record vitals button
- Administer medication
- View assigned patients
- Update medication status

// Family View
- Minimal navigation menu
- View-only patient information
- No edit capabilities
- Limited patient access
```

### 4.3 State Management

#### 4.3.1 Client-Side State
```javascript
// Application State
const appState = {
  user: {
    id: String,
    name: String,
    role: String,
    token: String
  },
  patients: Array,
  currentPatient: Object,
  vitals: Array,
  medications: Array,
  notifications: Array
}
```

#### 4.3.2 Local Storage Usage
```javascript
// Stored in localStorage
- Authentication token
- User information
- Session preferences
- Temporary form data
```

## 5. Security Design

### 5.1 Authentication & Authorization

#### 5.1.1 Password Security
```javascript
// Password Requirements
- Minimum 8 characters
- Hashed using bcryptjs (salt rounds: 10)
- Stored as hash in database
- Never transmitted in plain text
```

#### 5.1.2 JWT Token Security
```javascript
// Token Configuration
- Expiration: 24 hours
- Secret key stored in environment variables
- Includes user ID and role
- Validated on each protected route
```

#### 5.1.3 Role-Based Access Control
```javascript
// Access Control Matrix
const permissions = {
  doctor: ['read', 'write', 'delete', 'prescribe'],
  nurse: ['read', 'write', 'administer'],
  family: ['read']
}
```

### 5.2 Data Protection

#### 5.2.1 Input Validation
```javascript
// Validation Rules
- All inputs sanitized
- SQL injection prevention
- XSS attack prevention
- Data type validation
- Length restrictions
```

#### 5.2.2 API Security
```javascript
// Security Measures
- CORS configuration
- Rate limiting (future enhancement)
- HTTPS enforcement (production)
- Request validation middleware
- Error message sanitization
```

## 6. Performance Design

### 6.1 Database Optimization

#### 6.1.1 Query Optimization
```javascript
// Optimized Queries
- Use indexes for frequent queries
- Limit result sets
- Use projection to select specific fields
- Implement pagination for large datasets
- Use aggregation pipeline for complex queries
```

#### 6.1.2 Connection Management
```javascript
// MongoDB Connection
- Connection pooling
- Automatic reconnection
- Connection timeout handling
- Graceful shutdown
```

### 6.2 Frontend Performance

#### 6.2.1 Loading Optimization
```javascript
// Performance Strategies
- Minimize HTTP requests
- Compress images and assets
- Use CDN for external libraries
- Implement lazy loading
- Cache static resources
```

#### 6.2.2 Code Optimization
```javascript
// JavaScript Optimization
- Minimize DOM manipulation
- Use event delegation
- Debounce user inputs
- Optimize loops and iterations
- Remove unused code
```

## 7. Error Handling Design

### 7.1 Backend Error Handling

#### 7.1.1 Error Categories
```javascript
// Error Types
- Validation Errors (400)
- Authentication Errors (401)
- Authorization Errors (403)
- Not Found Errors (404)
- Server Errors (500)
- Database Errors (503)
```

#### 7.1.2 Error Response Structure
```javascript
// Standardized Error Response
{
  success: false,
  error: {
    code: 'VALIDATION_ERROR',
    message: 'Invalid input data',
    details: {
      field: 'email',
      reason: 'Invalid email format'
    }
  }
}
```

### 7.2 Frontend Error Handling

#### 7.2.1 User Feedback
```javascript
// Error Display Methods
- Toast notifications for temporary messages
- Inline validation for form errors
- Modal dialogs for critical errors
- Loading states for async operations
- Fallback UI for component failures
```

#### 7.2.2 Error Recovery
```javascript
// Recovery Strategies
- Retry mechanisms for network failures
- Graceful degradation for missing features
- Offline mode indicators
- Session restoration after token expiry
- Form data preservation during errors
```

## 8. Testing Strategy

### 8.1 Testing Levels

#### 8.1.1 Unit Testing
```javascript
// Test Coverage Areas
- Model validation
- Utility functions
- API endpoint logic
- Authentication middleware
- Data transformation functions
```

#### 8.1.2 Integration Testing
```javascript
// Integration Test Scenarios
- API endpoint testing
- Database operations
- Authentication flow
- Role-based access
- QR code functionality
```

#### 8.1.3 User Acceptance Testing
```javascript
// UAT Scenarios
- User login and logout
- Patient registration workflow
- Vital signs recording
- Medication management
- QR code patient lookup
- Role-based feature access
```

### 8.2 Test Data Management

#### 8.2.1 Demo Data Setup
```javascript
// Setup Script Features
- Create demo users for each role
- Generate sample patients
- Create realistic vital signs data
- Set up medication schedules
- Generate QR codes for testing
```

## 9. Deployment Design

### 9.1 Development Environment

#### 9.1.1 Local Setup
```bash
# Environment Configuration
- Node.js v14+
- MongoDB local instance
- npm package manager
- Environment variables (.env)
- Development server (nodemon)
```

#### 9.1.2 Development Workflow
```bash
# Development Commands
npm install          # Install dependencies
npm run setup       # Create demo data
npm run dev         # Start development server
npm start           # Start production server
```

### 9.2 Production Considerations

#### 9.2.1 Environment Configuration
```javascript
// Production Settings
- Environment variables for sensitive data
- Database connection pooling
- Error logging and monitoring
- Performance monitoring
- Security headers
```

#### 9.2.2 Scalability Planning
```javascript
// Future Scalability
- Horizontal scaling with load balancers
- Database clustering
- Caching layer (Redis)
- CDN for static assets
- Microservices architecture
```

## 10. Maintenance Design

### 10.1 Monitoring & Logging

#### 10.1.1 Application Logging
```javascript
// Log Categories
- User authentication events
- Database operations
- API request/response
- Error occurrences
- Performance metrics
```

#### 10.1.2 Health Monitoring
```javascript
// Health Checks
- Database connectivity
- API response times
- Memory usage
- CPU utilization
- Disk space monitoring
```

### 10.2 Backup & Recovery

#### 10.2.1 Data Backup Strategy
```javascript
// Backup Plan
- Daily automated database backups
- Configuration file backups
- Application code versioning
- Recovery procedures documentation
- Backup testing protocols
```

---

**Document Version:** 1.0  
**Last Updated:** January 2026  
**Reviewed By:** Technical Lead  
**Next Review:** Project Completion