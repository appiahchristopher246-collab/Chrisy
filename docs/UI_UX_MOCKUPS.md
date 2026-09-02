# UI/UX Mockups - Student Academic Progress Tracking System

## 1. Authentication Screens

### 1.1 Login Page
```
┌─────────────────────────────────────────┐
│                                         │
│           CHRISY LOGO                   │
│                                         │
│  Student Academic Progress Tracking     │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Email Address                          │
│  ┌─────────────────────────────────┐   │
│  │ [enter email]                   │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Password                               │
│  ┌─────────────────────────────────┐   │
│  │ [••••••••••]                    │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ☑ Remember Me        Forgot Password?  │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │     LOGIN                       │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Don't have an account? Sign Up         │
│                                         │
└─────────────────────────────────────────┘
```

### 1.2 Two-Factor Authentication
```
┌─────────────────────────────────────────┐
│                                         │
│  Two-Factor Authentication              │
│                                         │
│  Enter the 6-digit code from your       │
│  authenticator app or SMS               │
│                                         │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ │
│  │ _ │ │ _ │ │ _ │ │ _ │ │ _ │ │ _ │ │
│  └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │     VERIFY                      │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Can't receive code? Try another method │
│                                         │
└─────────────────────────────────────────┘
```

## 2. Student Dashboard

### 2.1 Student Home Dashboard
```
┌─────────────────────────────────────────────────────────┐
│  [≡] CHRISY  [Search] [Notifications] [Profile] [Logout]│
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Welcome Back, Alice Johnson!                          │
│                                                         │
│  Quick Stats:                                          │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐   │
│  │ Current GPA  │ │ Attendance   │ │ Classes      │   │
│  │     3.75     │ │     95%      │ │       6      │   │
│  └──────────────┘ └──────────────┘ └──────────────┘   │
│                                                         │
│  Recent Grades:                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Course         │ Score │ Grade │ Date           │  │
│  ├──────────────────────────────────────────────────┤  │
│  │ Mathematics    │ 85.5  │  A    │ Sep 2, 2024   │  │
│  │ English        │ 78.0  │  B+   │ Aug 30, 2024  │  │
│  │ Physics        │ 88.5  │  A    │ Aug 28, 2024  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  Attendance This Semester:                             │
│  ┌──────────────────────────────────────────────────┐  │
│  │ ████████████████████░░ 95% (19/20 days)        │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  Upcoming Assignments:                                  │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Mathematics Project - Due Sep 15              │ │  │
│  │ English Essay - Due Sep 10                    │ │  │
│  │ Physics Lab Report - Due Sep 8                │ │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 2.2 Student Grades Page
```
┌─────────────────────────────────────────────────────────┐
│  [≡] CHRISY  Grades  [Filter] [Export]                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  My Grades - Fall 2024 Semester                        │
│                                                         │
│  Semester: [Fall 2024 ▼]  Class: [All ▼]              │
│                                                         │
│  GPA: 3.75 | Average Score: 82.3%                      │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Course         │ Score │ Grade │ Comments       │  │
│  ├──────────────────────────────────────────────────┤  │
│  │ Mathematics    │ 85.5  │  A    │ Excellent      │  │
│  │ English        │ 78.0  │  B+   │ Good work      │  │
│  │ Physics        │ 88.5  │  A    │ Outstanding    │  │
│  │ Chemistry      │ 82.0  │  B+   │ Satisfactory   │  │
│  │ History        │ 75.5  │  B    │ Needs review   │  │
│  │ Biology        │ 79.0  │  B+   │ Good           │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  Grade Distribution:                                    │
│  │ A: 3 │ B+: 2 │ B: 1 │ C: 0 │ D: 0 │ F: 0 │       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 2.3 Student Attendance Page
```
┌─────────────────────────────────────────────────────────┐
│  [≡] CHRISY  Attendance  [Calendar] [Export]            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Attendance Summary - Fall 2024                        │
│                                                         │
│  Total Days: 90 | Present: 85 | Absent: 3 | Late: 2  │
│  Attendance Percentage: 94.4%                          │
│                                                         │
│  ┌─ Attendance by Course ────────────────────────────┐ │
│  │ Mathematics:   95% (19/20)  ████████████████░░   │ │
│  │ English:       94% (19/20)  ████████████████░░   │ │
│  │ Physics:       92% (18/20)  ████████████████░░   │ │
│  │ Chemistry:     93% (18/20)  ████████████████░░   │ │
│  │ History:       95% (19/20)  ████████████████░░   │ │
│  │ Biology:       94% (19/20)  ████████████████░░   │ │
│  └────────────────────────────────────────────────────┘ │
│                                                         │
│  Recent Records:                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Date       │ Status     │ Course                 │  │
│  ├──────────────────────────────────────────────────┤  │
│  │ Sep 2      │ Present    │ Mathematics            │  │
│  │ Sep 1      │ Present    │ English                │  │
│  │ Aug 31     │ Late       │ Physics                │  │
│  │ Aug 30     │ Present    │ Chemistry              │  │
│  │ Aug 29     │ Absent     │ History                │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 3. Teacher Dashboard

### 3.1 Teacher Home Dashboard
```
┌─────────────────────────────────────────────────────────┐
│  [≡] CHRISY  [Search] [Notifications] [Profile] [Logout]│
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Welcome Back, John Doe!                               │
│                                                         │
│  Quick Overview:                                        │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐   │
│  │ Total        │ │ Grades       │ │ Attendance   │   │
│  │ Students: 200│ │ To Grade: 15 │ │ To Mark: 2   │   │
│  └──────────────┘ └──────────────┘ └──────────────┘   │
│                                                         │
│  My Classes:                                            │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Class  │ Students │ Avg Score │ Status         │  │
│  ├──────────────────────────────────────────────────┤  │
│  │ 10-A   │    50    │   82.5%   │ On Track       │  │
│  │ 10-B   │    48    │   80.2%   │ On Track       │  │
│  │ 11-A   │    52    │   81.8%   │ On Track       │  │
│  │ 11-B   │    50    │   79.5%   │ Needs Review   │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  Pending Tasks:                                         │
│  ☐ Grade Mathematics Midterm (15 students)             │
│  ☐ Mark Attendance for 10-A (Sep 3)                   │
│  ☐ Review Physics Lab Reports (8 submissions)          │
│  ☐ Send Progress Reports                               │
│                                                         │
│  Class Performance Trends:                              │
│  10-A: ████████░░ Average Score Trend ▲ Improving      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Grade Entry Page
```
┌─────────────────────────────────────────────────────────┐
│  [≡] CHRISY  Grade Entry  [Bulk Import] [Export]        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Enter Grades - Class 10-A, Mathematics                │
│                                                         │
│  Assessment Type: [Midterm Exam ▼]  Date: [Sep 2 ▼]   │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Student Name   │ Student ID │ Score │ Grade     │  │
│  ├──────────────────────────────────────────────────┤  │
│  │ Alice Johnson  │ STU001     │ [85.5]│ A         │  │
│  │ Bob Smith      │ STU002     │ [78.0]│ B+        │  │
│  │ Carol White    │ STU003     │ [92.0]│ A+        │  │
│  │ David Lee      │ STU004     │ [  ]  │ --        │  │
│  │ Eve Davis      │ STU005     │ [88.5]│ A         │  │
│  │ Frank Brown    │ STU006     │ [  ]  │ --        │  │
│  │ Grace Wilson   │ STU007     │ [75.0]│ B         │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  Grades Entered: 5/7  | [Save] [Cancel]               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 3.3 Attendance Marking Page
```
┌─────────────────────────────────────────────────────────┐
│  [≡] CHRISY  Mark Attendance  [History] [Summary]       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Mark Attendance - Class 10-A, Sep 3, 2024             │
│                                                         │
│  Course: [Mathematics ▼]  Time: [09:00 - 10:00 ▼]     │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Student Name   │ Status      │ Remarks           │  │
│  ├──────────────────────────────────────────────────┤  │
│  │ ☑ Alice Johnson│ ⦿ Present   │ [              ]  │  │
│  │ ☑ Bob Smith    │ ⦿ Present   │ [              ]  │  │
│  │ ☑ Carol White  │ ⦿ Late      │ [15 min late]     │  │
│  │ ☐ David Lee    │ ⦿ Absent    │ [Medical leave]   │  │
│  │ ☑ Eve Davis    │ ⦿ Present   │ [              ]  │  │
│  │ ☑ Frank Brown  │ ⦿ Present   │ [              ]  │  │
│  │ ☑ Grace Wilson │ ⦿ Present   │ [              ]  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  Marked: 6 Present | 1 Late | 1 Absent | 0 Unmarked   │
│                                                         │
│  [Clear All] [Reset] [Save & Next Class] [Submit]     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 4. Admin Dashboard

### 4.1 Admin Home
```
┌─────────────────────────────────────────────────────────┐
│  [≡] CHRISY ADMIN  [Search] [Notifications] [Logout]   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  System Overview - Chrisy Institution                  │
│                                                         │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐   │
│  │ Total Users  │ │ Active Users │ │ Total        │   │
│  │    1,250     │ │     892      │ │ Students: 800│   │
│  └──────────────┘ └─���────────────┘ └──────────────┘   │
│                                                         │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐   │
│  │ Total        │ │ System       │ │ Data Size    │   │
│  │ Teachers: 85 │ │ Uptime: 99.9%│ │ 2.3 GB       │   │
│  └──────────────┘ └──────────────┘ └──────────────┘   │
│                                                         │
│  Recent Activities:                                     │
│  ┌──────────────────────────────────────────────────┐  │
│  │ • 15 new students enrolled (Sep 2)              │  │
│  │ • 3 grades reported as incorrect (Pending)      │  │
│  │ • 2 teachers marked absent (Aug 31)             │  │
│  │ • System backup completed successfully (Sep 1) │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  Quick Actions:                                         │
│  [Add User] [Import Data] [System Settings] [Reports] │
│                                                         │
│  Active Alerts: ⚠ 2 issues need attention              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 4.2 User Management
```
┌─────────────────────────────────────────────────────────┐
│  [≡] CHRISY ADMIN  User Management  [Add User] [Export] │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  User Directory                                         │
│                                                         │
│  Filter: [All Roles ▼] [All Status ▼] [Search]        │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Name          │ Email        │ Role    │ Status  │  │
│  ├──────────────────────────────────────────────────┤  │
│  │ John Doe      │ john@sch.edu │ Teacher │ Active  │  │
│  │ Jane Smith    │ jane@sch.edu │ Teacher │ Active  │  │
│  │ Alice Johnson │ alice@sch.edu│ Student │ Active  │  │
│  │ Bob Smith     │ bob@sch.edu  │ Student │ Active  │  │
│  │ Mary Johnson  │ mary@sch.edu │ Parent  │ Active  │  │
│  │ Admin User    │ admin@sch.edu│ Admin   │ Active  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  Total: 1,250 users | Page 1 of 63 | [< 1 2 3 ... >] │
│                                                         │
│  [Edit] [Reset Password] [Deactivate] [Delete]        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 5. Parent Portal

### 5.1 Parent Dashboard
```
┌─────────────────────────────────────────────────────────┐
│  [≡] CHRISY  Parent Portal  [Notifications] [Logout]    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Welcome, Mary Johnson                                  │
│                                                         │
│  Your Children:                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │ > Alice Johnson (Grade 10-A) [View Details] ▶   │  │
│  │ > Michael Johnson (Grade 8-B) [View Details] ▶  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  Alice Johnson - Current Status:                        │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐   │
│  │ Current GPA  │ │ Attendance   │ │ Class Rank   │   │
│  │     3.75     │ │     95%      │ │     5/50     │   │
│  └──────────────┘ └──────────────┘ └──────────────┘   │
│                                                         │
│  Recent Grades:                                         │
│  Mathematics: 85.5 (A) | English: 78.0 (B+) | ...      │
│                                                         │
│  Important Notices:                                     │
│  📢 Mid-term results will be published on Sep 15       │
│  📢 Parent-Teacher meeting scheduled for Sep 20        │
│                                                         │
│  Messages: You have 2 unread messages                   │
│  [View Messages]                                        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 6. Report Screens

### 6.1 Report Generation Page
```
┌─────────────────────────────────────────────────────────┐
│  [≡] CHRISY  Generate Report                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Generate Student Report                               │
│                                                         │
│  Student: [Select Student ▼]                           │
│  Report Type: [Progress Report ▼]                      │
│  Semester: [Fall 2024 ▼]                               │
│  Format: [PDF ▼]                                       │
│                                                         │
│  Include:                                               │
│  ☑ Grades                                               │
│  ☑ Attendance                                           │
│  ☑ Learning Outcomes                                    │
│  ☑ Teacher Comments                                     │
│  ☑ GPA & Rankings                                       │
│  ☐ Parent Recommendations                               │
│                                                         │
│  ┌─────────────────────────────────┐                   │
│  │ [Preview] [Generate] [Cancel]   │                   │
│  └─────────────────────────────────┘                   │
│                                                         │
│  Recently Generated:                                    │
│  • Progress Report (Sep 1) - PDF                       │
│  • Transcript (Aug 28) - PDF                           │
│  • Attendance Summary (Aug 25) - Excel                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 6.2 Transcript Preview
```
┌─────────────────────────────────────────────────────────┐
│  CHRISY Institution Transcript                          │
│                                                         │
│  Student Name: Alice Johnson                            │
│  Student ID: STU001                                     │
│  Class: Grade 10-A                                      │
│  Academic Year: 2023-2024                              │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Course         │ Credits │ Score │ Grade │ GPA  │  │
│  ├──────────────────────────────────────────────────┤  │
│  │ Mathematics    │    4    │ 85.5  │  A   │ 4.0  │  │
│  │ English        │    4    │ 78.0  │  B+  │ 3.5  │  │
│  │ Physics        │    4    │ 88.5  │  A   │ 4.0  │  │
│  │ Chemistry      │    3    │ 82.0  │  B+  │ 3.5  │  │
│  │ History        │    3    │ 75.5  │  B   │ 3.0  │  │
│  │ Biology        │    3    │ 79.0  │  B+  │ 3.5  │  │
│  ├──────────────────────────────────────────────────┤  │
│  │ TOTALS         │   21    │ 81.4  │ A-   │ 3.75 │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  Overall Performance: Excellent                         │
│  Class Rank: 5/50                                       │
│  Cumulative GPA: 3.75                                   │
│                                                         │
│  [Print] [Download PDF] [Email] [Share]               │
│                                                         │
└───────────────────────────────────────────────���─────────┘
```

## 7. Mobile UI Mockup (Responsive Design)

### 7.1 Mobile Student Dashboard
```
┌─────────────────────────┐
│ CHRISY  ≡  🔔  👤      │
├─────────────────────────┤
│                         │
│  Welcome Back!          │
│  Alice Johnson          │
│                         │
│  ┌───────────────────┐  │
│  │ GPA: 3.75         │  │
│  │ Attendance: 95%   │  │
│  └───────────────────┘  │
│                         │
│  Recent Grades:         │
│  Math: 85.5 A    ▶      │
│  English: 78.0 B+ ▶     │
│  Physics: 88.5 A ▶      │
│                         │
│  My Courses:            │
│  ✓ Mathematics ▶        │
│  ✓ English ▶            │
│  ✓ Physics ▶            │
│  ✓ Chemistry ▶          │
│                         │
│  [Grades] [Attendance]  │
│  [Assignments] [More]   │
│                         │
└─────────────────────────┘
```

### 7.2 Mobile Grade Details
```
┌���────────────────────────┐
│ ◄ Mathematics    [⋯]   │
├─────────────────────────┤
│                         │
│  Course Code: MAT101    │
│  Teacher: Jane Smith    │
│                         │
│  Assessment Grades:     │
│                         │
│  ┌───────────────────┐  │
│  │ Homework          │  │
│  │ Score: 88.0 (A)   │  │
│  │ Weight: 20%       │  │
│  └───────────────────┘  │
│                         │
│  ┌───────────────────┐  │
│  │ Midterm           │  │
│  │ Score: 85.0 (A)   │  │
│  │ Weight: 30%       │  │
│  └───────────────────┘  │
│                         │
│  ┌───────────────────┐  │
│  │ Final Exam        │  │
│  │ Score: 83.0 (B+)  │  │
│  │ Weight: 50%       │  │
│  └───────────────────┘  │
│                         │
│  Overall: 85.5 (A)      │
│                         │
│  Comments:              │
│  Excellent performance  │
│                         │
└─────────────────────────┘
```

## 8. Common Components

### 8.1 Navigation Menu
```
┌─────────────────────────────────────────┐
│ ≡ CHRISY                                │
├─────────────────────────────────────────┤
│ Dashboard                         [Home]│
│ Grades                       [View/Edit]│
│ Attendance                   [Mark/View]│
│ Reports                      [Generate] │
│ Classes                       [Manage]  │
│ Users                         [Manage]  │
│ Settings                      [Config]  │
│ Help & Support                [Contact] │
│ Logout                                  │
├─────────────────────────────────────────┤
```

### 8.2 Notification Badge
```
Notifications [🔔 5]
├─ Grade Posted (Mathematics)
│  "Your grade has been posted"
│  2 hours ago
├─ Attendance Alert
│  "Attendance marked for Sep 3"
│  3 hours ago
└─ System Notification
   "System maintenance scheduled for Sep 5"
   1 day ago
```

### 8.3 Modal Dialog - Confirm Action
```
┌─────────────────────────────────────┐
│ Confirm Action                  [×] │
├─────────────────────────────────────┤
│                                     │
│ Are you sure you want to            │
│ delete this grade record?           │
│                                     │
│ This action cannot be undone.       │
│                                     │
│     [Cancel]     [Delete]           │
│                                     │
└─────────────────────────────────────┘
```

### 8.4 Success Message
```
✓ Grade saved successfully
The grade has been recorded and notifications sent.
[Dismiss] [View Details]
```

### 8.5 Error Message
```
✗ Error saving grade
The score must be between 0 and 100. Please check and try again.
Error Code: VALIDATION_001
[Retry] [Cancel]
```

## 9. Color Scheme

- **Primary:** #2563EB (Blue) - Main actions, buttons
- **Secondary:** #10B981 (Green) - Success states, positive indicators
- **Accent:** #F59E0B (Amber) - Warnings, alerts
- **Danger:** #EF4444 (Red) - Errors, critical actions
- **Neutral:** #6B7280 (Gray) - Text, secondary information
- **Background:** #F3F4F6 (Light Gray) - Page background
- **Surface:** #FFFFFF (White) - Cards, containers

## 10. Typography

- **Headlines:** Roboto Bold, 24px-32px
- **Subheadings:** Roboto SemiBold, 16px-20px
- **Body Text:** Roboto Regular, 14px-16px
- **Small Text:** Roboto Regular, 12px
- **Monospace:** Courier New, 12px (for codes)

## 11. Layout Principles

1. **Responsive Design:** Mobile-first approach (320px → 768px → 1920px)
2. **Accessibility:** WCAG 2.1 AA compliance
3. **Information Hierarchy:** Critical data prominent, supporting details below
4. **Consistency:** Unified spacing (8px grid), component reuse
5. **User Feedback:** Clear loading states, confirmation dialogs, success messages
6. **Performance:** Lazy loading, optimized images, smooth animations
