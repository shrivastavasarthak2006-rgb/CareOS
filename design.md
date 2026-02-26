# CareOS - Design Document
## Unified Healthcare AI Platform

**Version:** 2.0 | **Date:** January 2026 | **Type:** B.Tech 3rd Year Project

---

## 1. System Architecture

### High-Level Architecture
```
┌──────────────────────────────────────────────────────┐
│                   Client Browser                      │
│                                                       │
│  login.html → unified-dashboard.html → Role Content  │
│       ↓              ↓                      ↓         │
│       └──────── sessionStorage ─────────────┘        │
│         (userRole, username, isLoggedIn)             │
└───────────────────────┬──────────────────────────────┘
                        │ HTTP
                        ↓
┌──────────────────────────────────────────────────────┐
│              Express.js Server (Port 3000)           │
│              Static File Server (HTML/CSS/JS)        │
└──────────────────────────────────────────────────────┘
```

### Application Flow
```
User → index.html → login.html → [Authenticate] 
  → sessionStorage → unified-dashboard.html 
  → [Validate Session] → [Detect Role] → Render Dashboard
```

### File Structure
```
CareOS/
├── public/
│   ├── index.html                    # Entry (redirects to login)
│   ├── login.html                    # Authentication
│   ├── unified-dashboard.html        # Main dashboard
│   ├── css/
│   │   ├── dashboard-modern.css      # Shared styles
│   │   └── patient-dashboard.css     # Patient styles
│   └── js/
│       ├── unified-dashboard.js      # Role-based logic
│       └── chatbot.js                # AI assistant
├── server.js                         # Express server
└── package.json                      # Dependencies
```

---

## 2. Authentication Flow

```
┌──────────────┐
│ User Opens   │
│ Browser      │
└──────┬───────┘
       ↓
┌──────────────────┐
│  index.html      │
│  (Auto-redirect) │
└──────┬───────────┘
       ↓
┌──────────────────────────────┐
│      login.html               │
│  1. Select Role (Visual)     │
│  2. Enter Credentials        │
│  3. Submit Form              │
└──────┬───────────────────────┘
       ↓
┌──────────────────────────────┐
│  Client Validation           │
│  - Role selected?            │
│  - Credentials match?        │
└──────┬───────────────────────┘
       ↓
    [Valid]
       ↓
┌──────────────────────────────┐
│  sessionStorage.setItem()    │
│  - userRole                  │
│  - username                  │
│  - isLoggedIn: 'true'        │
└──────┬───────────────────────┘
       ↓
┌──────────────────────────────┐
│  unified-dashboard.html      │
└──────────────────────────────┘
```

### Session Management
**Storage:** sessionStorage (browser API)

**Data Structure:**
```javascript
{
  userRole: 'admin' | 'doctor' | 'nurse' | 'patient',
  username: string,
  isLoggedIn: 'true' | null
}
```

### Demo Credentials
| Role    | Username | Password |
|---------|----------|----------|
| Admin   | admin    | password |
| Doctor  | doctor   | password |
| Nurse   | nurse    | password |
| Patient | patient  | password |

---

## 3. Role-Based Rendering

### Conditional Rendering Pattern
```
unified-dashboard.html (Shell)
    ↓
unified-dashboard.js (Controller)
    ↓
[Detect userRole]
    ↓
    ├─→ admin    → getAdminDashboard()
    ├─→ doctor   → getDoctorDashboard()
    ├─→ nurse    → getNurseDashboard()
    └─→ patient  → getPatientDashboard()
    ↓
[Inject HTML into #mainContent]
```

### UnifiedDashboard Class
```javascript
class UnifiedDashboard {
    constructor()           // Validate session
    init()                  // Setup dashboard
    setupProfile()          // User profile
    setupSidebar()          // Navigation
    loadDashboardContent()  // Role content
    getAdminDashboard()     // Admin HTML
    getDoctorDashboard()    // Doctor HTML
    getNurseDashboard()     // Nurse HTML
    getPatientDashboard()   // Patient HTML
    setupLogout()           // Logout handler
}
```

---

## 4. Component Architecture

### Reusable Components

**KPI Cards** (Admin, Doctor, Nurse)
```html
<div class="kpi-card">
    <div class="kpi-icon [color]">
        <i class="fas [icon]"></i>
    </div>
    <div class="kpi-content">
        <div class="kpi-label">[Label]</div>
        <div class="kpi-value">[Value]</div>
        <div class="kpi-trend">[Trend]</div>
    </div>
</div>
```

**Dashboard Cards** (All roles)
```html
<div class="dashboard-card">
    <div class="card-header">
        <h5 class="card-title">[Title]</h5>
    </div>
    <div class="card-body">[Content]</div>
</div>
```

**Navigation Components**
- Top Navbar: Logo, Role Badge, Emergency, Notifications, Profile
- Sidebar: Role-specific menu items (hidden for patients)

---

## 5. UI/UX Design

### Color Palette
```css
/* Primary */
--primary-teal: #0FB9B1
--primary-emerald: #10B981

/* Role Colors */
--admin-purple: #8B5CF6
--doctor-blue: #3B82F6
--nurse-green: #10B981
--patient-teal: #0FB9B1

/* Status */
--success: #10B981
--warning: #F59E0B
--danger: #EF4444
```

### Typography
```css
font-family: 'Inter', sans-serif
--font-sm: 0.875rem
--font-base: 1rem
--font-lg: 1.125rem
--font-xl: 1.25rem
```

### Responsive Breakpoints
- Mobile: < 768px (single column, hidden sidebar)
- Tablet: 768-1199px (2 columns, collapsible sidebar)
- Desktop: 1200px+ (multi-column, full sidebar)

---

## 6. Data Flow

### State Management
```
User Action
    ↓
Event Handler
    ↓
sessionStorage Operation
    ↓
UnifiedDashboard Class
    ↓
DOM Update
```

### Page Lifecycle
1. **Load:** index.html → redirect to login.html
2. **Login:** Validate → Store session → Redirect to dashboard
3. **Dashboard:** Validate session → Detect role → Render content
4. **Logout:** Clear session → Redirect to login

---

## 7. Security Design

### Current (Demo Mode)
- Client-side authentication
- sessionStorage for state
- Role-based content rendering
- Auto-redirect on invalid session

### Production Recommendations
- Server-side authentication with JWT
- Password hashing (bcrypt)
- HTTPS enforcement
- CSRF protection
- Rate limiting
- Session timeout

---

## 8. Performance

### Optimizations
- Single HTML file (no page reloads)
- Shared CSS files
- Client-side rendering
- CDN for libraries (Bootstrap, Font Awesome)

### Target Metrics
- Login page load: < 2s
- Dashboard render: < 1s
- Role switch: < 500ms

---

## 9. Deployment

### Development
```bash
npm start
# Access: http://localhost:3000
```

### Production Options
1. **Traditional Server:** Nginx + Node.js
2. **Cloud Platform:** Heroku, AWS, Azure
3. **Containerized:** Docker
4. **Static Hosting:** Netlify, Vercel

---

## 10. Technology Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Bootstrap 5.3.0
- Font Awesome 6.0.0
- sessionStorage API

### Backend
- Node.js v16+
- Express.js v4.18.2

### Future Additions
- Database: MongoDB/PostgreSQL
- Authentication: Passport.js, JWT
- Real-time: Socket.io
- Testing: Jest, Cypress

---

## Appendix: Design Patterns

### Singleton Pattern
```javascript
document.addEventListener('DOMContentLoaded', () => {
    new UnifiedDashboard(); // Single instance
});
```

### Strategy Pattern
```javascript
// Different rendering based on role
switch(userRole) {
    case 'admin': return getAdminDashboard();
    case 'doctor': return getDoctorDashboard();
    // ...
}
```

### Template Method Pattern
```javascript
init() {
    this.setupProfile();      // Common
    this.setupSidebar();      // Role-specific
    this.loadDashboardContent(); // Role-specific
    this.setupLogout();       // Common
}
```

---

**Document Status:** Approved | **Version:** 2.0 | **Last Updated:** January 2026
