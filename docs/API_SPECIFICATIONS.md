# API Specifications - Student Academic Progress Tracking System

## 1. Base Configuration

**Base URL:** `https://api.chrisy.app/v1`

**API Version:** v1

**Authentication:** JWT (JSON Web Token) in Authorization header
```
Authorization: Bearer {token}
```

**Response Format:** JSON

**Rate Limiting:** 1000 requests per hour per user

## 2. Authentication Endpoints

### 2.1 User Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "teacher@example.com",
  "password": "secure_password"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": 3600,
  "user": {
    "id": "uuid",
    "email": "teacher@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "teacher",
    "institutionId": "uuid"
  }
}
```

### 2.2 Refresh Token
```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": 3600
}
```

### 2.3 User Logout
```http
POST /auth/logout
Authorization: Bearer {token}

Response: 200 OK
{
  "message": "Logged out successfully"
}
```

## 3. Student Management Endpoints

### 3.1 Get All Students
```http
GET /students?page=1&limit=20&institutionId=uuid&class=uuid
Authorization: Bearer {token}

Response: 200 OK
{
  "data": [
    {
      "id": "uuid",
      "studentId": "STU001",
      "firstName": "Alice",
      "lastName": "Johnson",
      "email": "alice@example.com",
      "currentGPA": 3.75,
      "attendancePercentage": 95,
      "class": "10-A"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

### 3.2 Get Student Profile
```http
GET /students/{studentId}
Authorization: Bearer {token}

Response: 200 OK
{
  "id": "uuid",
  "studentId": "STU001",
  "firstName": "Alice",
  "lastName": "Johnson",
  "email": "alice@example.com",
  "dateOfBirth": "2005-03-15",
  "gender": "Female",
  "enrollmentDate": "2023-09-01",
  "status": "active",
  "currentClass": "10-A",
  "currentGPA": 3.75,
  "attendancePercentage": 95,
  "parents": [
    {
      "id": "uuid1",
      "name": "Mary Johnson",
      "relationship": "Mother",
      "email": "mary@example.com"
    }
  ]
}
```

### 3.3 Create Student
```http
POST /students
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "Bob",
  "lastName": "Smith",
  "email": "bob.smith@example.com",
  "dateOfBirth": "2006-05-20",
  "gender": "Male",
  "classId": "uuid",
  "parentIds": ["uuid1"]
}

Response: 201 Created
{
  "id": "uuid",
  "studentId": "STU002",
  "message": "Student created successfully"
}
```

### 3.4 Update Student
```http
PUT /students/{studentId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "Bob",
  "lastName": "Smith",
  "email": "bob.smith@example.com"
}

Response: 200 OK
{
  "id": "uuid",
  "message": "Student updated successfully"
}
```

## 4. Grade Management Endpoints

### 4.1 Get Student Grades
```http
GET /grades/student/{studentId}?semester=uuid
Authorization: Bearer {token}

Response: 200 OK
{
  "data": [
    {
      "id": "uuid",
      "studentId": "uuid",
      "course": {
        "id": "uuid",
        "name": "Mathematics",
        "code": "MAT101"
      },
      "score": 85.5,
      "percentage": 85.5,
      "gradeLetter": "A",
      "entryDate": "2024-06-15",
      "comments": "Excellent performance"
    }
  ],
  "summary": {
    "averageScore": 82.3,
    "currentGPA": 3.75
  }
}
```

### 4.2 Record Grade
```http
POST /grades
Authorization: Bearer {token}
Content-Type: application/json

{
  "studentId": "uuid",
  "classCourseId": "uuid",
  "score": 85.5,
  "assessmentType": "final",
  "comments": "Good performance"
}

Response: 201 Created
{
  "id": "uuid",
  "studentId": "uuid",
  "score": 85.5,
  "gradeLetter": "A",
  "message": "Grade recorded successfully"
}
```

### 4.3 Bulk Grade Import
```http
POST /grades/bulk-import
Authorization: Bearer {token}
Content-Type: application/json

{
  "classCourseId": "uuid",
  "grades": [
    {
      "studentId": "uuid1",
      "score": 85.5,
      "assessmentType": "midterm"
    },
    {
      "studentId": "uuid2",
      "score": 92.0,
      "assessmentType": "midterm"
    }
  ]
}

Response: 200 OK
{
  "successCount": 2,
  "failureCount": 0,
  "message": "Grades imported successfully"
}
```

## 5. Attendance Management Endpoints

### 5.1 Mark Attendance
```http
POST /attendance
Authorization: Bearer {token}
Content-Type: application/json

{
  "classCourseId": "uuid",
  "attendanceDate": "2024-09-02",
  "records": [
    {
      "studentId": "uuid1",
      "status": "present"
    },
    {
      "studentId": "uuid2",
      "status": "absent"
    },
    {
      "studentId": "uuid3",
      "status": "late"
    }
  ]
}

Response: 201 Created
{
  "markedCount": 3,
  "message": "Attendance marked successfully"
}
```

### 5.2 Get Attendance Records
```http
GET /attendance?studentId=uuid&fromDate=2024-09-01&toDate=2024-09-30
Authorization: Bearer {token}

Response: 200 OK
{
  "data": [
    {
      "id": "uuid",
      "studentId": "uuid",
      "date": "2024-09-02",
      "status": "present",
      "markedBy": "Teacher Name"
    }
  ],
  "summary": {
    "totalDays": 20,
    "presentDays": 19,
    "absentDays": 1,
    "attendancePercentage": 95.0
  }
}
```

### 5.3 Get Attendance Summary
```http
GET /attendance/summary/{studentId}?semester=uuid
Authorization: Bearer {token}

Response: 200 OK
{
  "studentId": "uuid",
  "studentName": "Alice Johnson",
  "totalDays": 90,
  "presentDays": 85,
  "absentDays": 3,
  "lateDays": 2,
  "attendancePercentage": 94.4
}
```

## 6. Report Generation Endpoints

### 6.1 Generate Progress Report
```http
POST /reports/generate/progress
Authorization: Bearer {token}
Content-Type: application/json

{
  "studentId": "uuid",
  "semesterId": "uuid",
  "format": "pdf"
}

Response: 200 OK
{
  "reportId": "uuid",
  "reportType": "progress",
  "format": "pdf",
  "generatedAt": "2024-09-02T14:30:00Z",
  "fileUrl": "https://storage.chrisy.app/reports/uuid.pdf"
}
```

### 6.2 Generate Transcript
```http
POST /reports/generate/transcript
Authorization: Bearer {token}
Content-Type: application/json

{
  "studentId": "uuid",
  "format": "pdf"
}

Response: 200 OK
{
  "reportId": "uuid",
  "reportType": "transcript",
  "format": "pdf",
  "fileUrl": "https://storage.chrisy.app/reports/uuid.pdf"
}
```

### 6.3 Get Generated Reports
```http
GET /reports?studentId=uuid&limit=10
Authorization: Bearer {token}

Response: 200 OK
{
  "data": [
    {
      "id": "uuid",
      "studentName": "Alice Johnson",
      "reportType": "progress",
      "semester": "2024 Fall",
      "format": "pdf",
      "generatedAt": "2024-09-02T14:30:00Z",
      "fileUrl": "https://storage.chrisy.app/reports/uuid.pdf"
    }
  ]
}
```

## 7. Course Management Endpoints

### 7.1 Get All Courses
```http
GET /courses?institutionId=uuid&departmentId=uuid
Authorization: Bearer {token}

Response: 200 OK
{
  "data": [
    {
      "id": "uuid",
      "code": "MAT101",
      "name": "Mathematics",
      "description": "Basic mathematics concepts",
      "creditHours": 3,
      "department": "Science"
    }
  ]
}
```

### 7.2 Create Course
```http
POST /courses
Authorization: Bearer {token}
Content-Type: application/json

{
  "code": "MAT101",
  "name": "Mathematics",
  "description": "Basic mathematics concepts",
  "creditHours": 3,
  "departmentId": "uuid"
}

Response: 201 Created
{
  "id": "uuid",
  "code": "MAT101",
  "message": "Course created successfully"
}
```

## 8. Class Management Endpoints

### 8.1 Get All Classes
```http
GET /classes?institutionId=uuid&academicYearId=uuid
Authorization: Bearer {token}

Response: 200 OK
{
  "data": [
    {
      "id": "uuid",
      "name": "10-A",
      "level": "Grade 10",
      "academicYear": "2024-2025",
      "classTeacher": "John Doe",
      "totalStudents": 50,
      "capacity": 60
    }
  ]
}
```

### 8.2 Get Class Details
```http
GET /classes/{classId}
Authorization: Bearer {token}

Response: 200 OK
{
  "id": "uuid",
  "name": "10-A",
  "level": "Grade 10",
  "academicYear": "2024-2025",
  "classTeacher": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "students": [
    {
      "id": "uuid",
      "studentId": "STU001",
      "firstName": "Alice",
      "lastName": "Johnson"
    }
  ],
  "courses": [
    {
      "id": "uuid",
      "courseName": "Mathematics",
      "teacher": "Jane Smith"
    }
  ],
  "totalStudents": 50
}
```

## 9. Notification Endpoints

### 9.1 Get User Notifications
```http
GET /notifications?limit=20&isRead=false
Authorization: Bearer {token}

Response: 200 OK
{
  "data": [
    {
      "id": "uuid",
      "title": "Grade Posted",
      "message": "Your Mathematics grade has been posted",
      "type": "grade_posted",
      "isRead": false,
      "createdAt": "2024-09-02T14:30:00Z"
    }
  ],
  "unreadCount": 5
}
```

### 9.2 Mark Notification as Read
```http
PUT /notifications/{notificationId}/read
Authorization: Bearer {token}

Response: 200 OK
{
  "id": "uuid",
  "isRead": true
}
```

### 9.3 Update Notification Preferences
```http
PUT /notifications/preferences
Authorization: Bearer {token}
Content-Type: application/json

{
  "emailNotifications": true,
  "smsNotifications": true,
  "pushNotifications": true,
  "notifyGrades": true,
  "notifyAttendance": true
}

Response: 200 OK
{
  "message": "Preferences updated successfully"
}
```

## 10. Dashboard & Analytics Endpoints

### 10.1 Get Student Dashboard
```http
GET /dashboard/student/{studentId}
Authorization: Bearer {token}

Response: 200 OK
{
  "studentId": "uuid",
  "studentName": "Alice Johnson",
  "currentClass": "10-A",
  "currentGPA": 3.75,
  "attendancePercentage": 95.0,
  "recentGrades": [
    {
      "course": "Mathematics",
      "score": 85.5,
      "date": "2024-09-02"
    }
  ],
  "upcomingAssignments": [...]
}
```

### 10.2 Get Teacher Dashboard
```http
GET /dashboard/teacher/{teacherId}
Authorization: Bearer {token}

Response: 200 OK
{
  "teacherId": "uuid",
  "teacherName": "John Doe",
  "totalClasses": 4,
  "totalStudents": 200,
  "gradesNotGraded": 15,
  "attendanceNotMarked": 2,
  "recentActivity": [...]
}
```

### 10.3 Get Analytics
```http
GET /analytics?type=performance&studentId=uuid&timeRange=semester
Authorization: Bearer {token}

Response: 200 OK
{
  "type": "performance",
  "data": {
    "averageScore": 82.5,
    "trend": "improving",
    "weakSubjects": ["Physics"],
    "strongSubjects": ["Mathematics"],
    "chart": {...}
  }
}
```

## 11. Error Response Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### HTTP Status Codes
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Unprocessable Entity
- `429` - Too Many Requests
- `500` - Internal Server Error

## 12. Rate Limiting Headers

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 950
X-RateLimit-Reset: 1725289200
```

## 13. Pagination Standard

All list endpoints support:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20, max: 100)
- `sort` - Sort field (prefix with `-` for descending)

Example: `GET /students?page=2&limit=50&sort=-createdAt`

## 14. Webhook Events

Supported webhook events:
- `grade.created` - Grade posted
- `grade.updated` - Grade modified
- `attendance.marked` - Attendance recorded
- `report.generated` - Report ready
- `notification.sent` - Notification sent
- `student.enrolled` - Student enrolled
- `student.transferred` - Student transferred
- `assignment.created` - Assignment posted
- `assignment.submitted` - Assignment submitted

Register at: `POST /webhooks`

Example:
```json
{
  "url": "https://your-app.com/webhooks",
  "events": ["grade.created", "attendance.marked"],
  "secret": "webhook_secret_key"
}
```
