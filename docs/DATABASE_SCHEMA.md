# Database Schema - Student Academic Progress Tracking System

## 1. Core Tables

### 1.1 Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    date_of_birth DATE,
    phone VARCHAR(20),
    profile_picture_url TEXT,
    role_id UUID NOT NULL,
    institution_id UUID NOT NULL,
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (institution_id) REFERENCES institutions(id)
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_institution_id ON users(institution_id);
CREATE INDEX idx_users_role_id ON users(role_id);
```

### 1.2 Roles Table
```sql
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    permissions JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles (name, description, permissions) VALUES
('admin', 'System Administrator', '{"all": true}'),
('teacher', 'Teacher', '{"view_grades": true, "edit_grades": true, "view_attendance": true, "mark_attendance": true}'),
('student', 'Student', '{"view_own_grades": true, "view_own_attendance": true}'),
('parent', 'Parent/Guardian', '{"view_child_grades": true, "view_child_attendance": true}'),
('staff', 'Administrative Staff', '{"view_data": true, "manage_users": true}');
```

### 1.3 Institutions Table
```sql
CREATE TABLE institutions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100),
    website VARCHAR(255),
    logo_url TEXT,
    subscription_type VARCHAR(50),
    max_users INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_institutions_code ON institutions(code);
```

## 2. Student Management Tables

### 2.1 Students Table
```sql
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE,
    student_id VARCHAR(50) NOT NULL,
    institution_id UUID NOT NULL,
    enrollment_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'active', -- active, graduated, transferred, withdrawn
    admission_number VARCHAR(50),
    date_of_birth DATE,
    gender VARCHAR(20),
    blood_group VARCHAR(10),
    nationality VARCHAR(100),
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(20),
    parent_id_1 UUID,
    parent_id_2 UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (institution_id) REFERENCES institutions(id),
    FOREIGN KEY (parent_id_1) REFERENCES users(id),
    FOREIGN KEY (parent_id_2) REFERENCES users(id),
    UNIQUE(institution_id, student_id)
);

CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_students_institution_id ON students(institution_id);
CREATE INDEX idx_students_student_id ON students(student_id);
```

### 2.2 Teachers Table
```sql
CREATE TABLE teachers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE,
    teacher_id VARCHAR(50) NOT NULL,
    institution_id UUID NOT NULL,
    specialization VARCHAR(255),
    qualification TEXT,
    hire_date DATE NOT NULL,
    employment_status VARCHAR(50) DEFAULT 'active', -- active, on_leave, retired
    department_id UUID,
    office_location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (institution_id) REFERENCES institutions(id),
    FOREIGN KEY (department_id) REFERENCES departments(id),
    UNIQUE(institution_id, teacher_id)
);

CREATE INDEX idx_teachers_user_id ON teachers(user_id);
CREATE INDEX idx_teachers_institution_id ON teachers(institution_id);
```

### 2.3 Parents/Guardians Table
```sql
CREATE TABLE guardians (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE,
    institution_id UUID NOT NULL,
    relationship VARCHAR(100) NOT NULL,
    occupation VARCHAR(255),
    address TEXT,
    emergency_contact BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (institution_id) REFERENCES institutions(id)
);

CREATE INDEX idx_guardians_user_id ON guardians(user_id);
CREATE INDEX idx_guardians_institution_id ON guardians(institution_id);
```

## 3. Academic Management Tables

### 3.1 Academic Years Table
```sql
CREATE TABLE academic_years (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL,
    name VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_current BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (institution_id) REFERENCES institutions(id),
    UNIQUE(institution_id, name)
);

CREATE INDEX idx_academic_years_institution_id ON academic_years(institution_id);
```

### 3.2 Semesters Table
```sql
CREATE TABLE semesters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    academic_year_id UUID NOT NULL,
    institution_id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_current BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (academic_year_id) REFERENCES academic_years(id),
    FOREIGN KEY (institution_id) REFERENCES institutions(id),
    UNIQUE(academic_year_id, name)
);

CREATE INDEX idx_semesters_academic_year_id ON semesters(academic_year_id);
```

### 3.3 Departments Table
```sql
CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) NOT NULL,
    head_id UUID,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (institution_id) REFERENCES institutions(id),
    FOREIGN KEY (head_id) REFERENCES teachers(id),
    UNIQUE(institution_id, code)
);

CREATE INDEX idx_departments_institution_id ON departments(institution_id);
```

### 3.4 Classes Table
```sql
CREATE TABLE classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    level VARCHAR(50), -- e.g., Grade 1, Senior 1, Year 1
    section VARCHAR(50), -- e.g., A, B, C
    academic_year_id UUID NOT NULL,
    class_teacher_id UUID,
    room_number VARCHAR(50),
    capacity INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (institution_id) REFERENCES institutions(id),
    FOREIGN KEY (academic_year_id) REFERENCES academic_years(id),
    FOREIGN KEY (class_teacher_id) REFERENCES teachers(id),
    UNIQUE(institution_id, academic_year_id, name, section)
);

CREATE INDEX idx_classes_institution_id ON classes(institution_id);
CREATE INDEX idx_classes_academic_year_id ON classes(academic_year_id);
```

### 3.5 Class Enrollment Table
```sql
CREATE TABLE class_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL,
    class_id UUID NOT NULL,
    enrollment_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'active', -- active, transferred, graduated, withdrawn
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (class_id) REFERENCES classes(id),
    UNIQUE(student_id, class_id)
);

CREATE INDEX idx_class_enrollments_student_id ON class_enrollments(student_id);
CREATE INDEX idx_class_enrollments_class_id ON class_enrollments(class_id);
```

### 3.6 Courses Table
```sql
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    credit_hours INTEGER,
    department_id UUID,
    level VARCHAR(50),
    prerequisites TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (institution_id) REFERENCES institutions(id),
    FOREIGN KEY (department_id) REFERENCES departments(id),
    UNIQUE(institution_id, code)
);

CREATE INDEX idx_courses_institution_id ON courses(institution_id);
CREATE INDEX idx_courses_department_id ON courses(department_id);
```

### 3.7 Class Courses Table
```sql
CREATE TABLE class_courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID NOT NULL,
    course_id UUID NOT NULL,
    semester_id UUID NOT NULL,
    teacher_id UUID NOT NULL,
    room_number VARCHAR(50),
    schedule JSONB, -- stores schedule info as JSON
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (class_id) REFERENCES classes(id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    FOREIGN KEY (semester_id) REFERENCES semesters(id),
    FOREIGN KEY (teacher_id) REFERENCES teachers(id),
    UNIQUE(class_id, course_id, semester_id)
);

CREATE INDEX idx_class_courses_class_id ON class_courses(class_id);
CREATE INDEX idx_class_courses_teacher_id ON class_courses(teacher_id);
```

## 4. Grade Management Tables

### 4.1 Grade Scales Table
```sql
CREATE TABLE grade_scales (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    min_score DECIMAL(5,2),
    max_score DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (institution_id) REFERENCES institutions(id),
    UNIQUE(institution_id, name)
);

CREATE INDEX idx_grade_scales_institution_id ON grade_scales(institution_id);
```

### 4.2 Grades Table
```sql
CREATE TABLE grades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL,
    class_course_id UUID NOT NULL,
    score DECIMAL(5,2),
    grade_letter VARCHAR(5),
    percentage DECIMAL(5,2),
    weighted_score DECIMAL(5,2),
    comments TEXT,
    assessment_type VARCHAR(50), -- e.g., assignment, quiz, midterm, final
    entry_date DATE NOT NULL,
    entered_by UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (class_course_id) REFERENCES class_courses(id),
    FOREIGN KEY (entered_by) REFERENCES teachers(id)
);

CREATE INDEX idx_grades_student_id ON grades(student_id);
CREATE INDEX idx_grades_class_course_id ON grades(class_course_id);
CREATE INDEX idx_grades_entry_date ON grades(entry_date);
```

### 4.3 Grade History Table
```sql
CREATE TABLE grade_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    grade_id UUID NOT NULL,
    old_score DECIMAL(5,2),
    new_score DECIMAL(5,2),
    changed_by UUID NOT NULL,
    change_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (grade_id) REFERENCES grades(id),
    FOREIGN KEY (changed_by) REFERENCES users(id)
);

CREATE INDEX idx_grade_history_grade_id ON grade_history(grade_id);
```

### 4.4 Grade Components Table (Weightage)
```sql
CREATE TABLE grade_components (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL,
    component_name VARCHAR(100) NOT NULL, -- e.g., Assignment, Midterm, Final
    weight DECIMAL(5,2), -- percentage
    max_score DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id),
    UNIQUE(course_id, component_name)
);

CREATE INDEX idx_grade_components_course_id ON grade_components(course_id);
```

## 5. Attendance Management Tables

### 5.1 Attendance Table
```sql
CREATE TABLE attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL,
    class_course_id UUID NOT NULL,
    attendance_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL, -- present, absent, late, excused, medical_leave
    marked_by UUID NOT NULL,
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (class_course_id) REFERENCES class_courses(id),
    FOREIGN KEY (marked_by) REFERENCES teachers(id),
    UNIQUE(student_id, class_course_id, attendance_date)
);

CREATE INDEX idx_attendance_student_id ON attendance(student_id);
CREATE INDEX idx_attendance_class_course_id ON attendance(class_course_id);
CREATE INDEX idx_attendance_date ON attendance(attendance_date);
```

### 5.2 Attendance Summary Table
```sql
CREATE TABLE attendance_summary (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL,
    class_id UUID NOT NULL,
    semester_id UUID NOT NULL,
    total_days INTEGER,
    present_days INTEGER,
    absent_days INTEGER,
    late_days INTEGER,
    attendance_percentage DECIMAL(5,2),
    last_calculated_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (class_id) REFERENCES classes(id),
    FOREIGN KEY (semester_id) REFERENCES semesters(id),
    UNIQUE(student_id, class_id, semester_id)
);

CREATE INDEX idx_attendance_summary_student_id ON attendance_summary(student_id);
```

## 6. Assessment & Learning Outcomes Tables

### 6.1 Learning Outcomes Table
```sql
CREATE TABLE learning_outcomes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL,
    outcome_code VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    bloom_level VARCHAR(50), -- e.g., Remember, Understand, Apply, Analyze, Evaluate, Create
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id),
    UNIQUE(course_id, outcome_code)
);

CREATE INDEX idx_learning_outcomes_course_id ON learning_outcomes(course_id);
```

### 6.2 Assessments Table
```sql
CREATE TABLE assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_course_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50), -- quiz, assignment, test, project, presentation
    assessment_date DATE,
    due_date DATE,
    max_score DECIMAL(5,2),
    rubric JSONB,
    created_by UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (class_course_id) REFERENCES class_courses(id),
    FOREIGN KEY (created_by) REFERENCES teachers(id)
);

CREATE INDEX idx_assessments_class_course_id ON assessments(class_course_id);
```

### 6.3 Assessment Results Table
```sql
CREATE TABLE assessment_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID NOT NULL,
    student_id UUID NOT NULL,
    score DECIMAL(5,2),
    percentage DECIMAL(5,2),
    feedback TEXT,
    submitted_at TIMESTAMP,
    graded_at TIMESTAMP,
    graded_by UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (assessment_id) REFERENCES assessments(id),
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (graded_by) REFERENCES teachers(id),
    UNIQUE(assessment_id, student_id)
);

CREATE INDEX idx_assessment_results_student_id ON assessment_results(student_id);
CREATE INDEX idx_assessment_results_assessment_id ON assessment_results(assessment_id);
```

## 7. Reports Tables

### 7.1 Report Templates Table
```sql
CREATE TABLE report_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    template_type VARCHAR(50), -- progress, transcript, attendance, custom
    template_content JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (institution_id) REFERENCES institutions(id)
);

CREATE INDEX idx_report_templates_institution_id ON report_templates(institution_id);
```

### 7.2 Generated Reports Table
```sql
CREATE TABLE generated_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL,
    report_template_id UUID NOT NULL,
    semester_id UUID,
    generated_by UUID NOT NULL,
    file_path TEXT,
    file_format VARCHAR(20), -- pdf, xlsx, docx
    generated_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (report_template_id) REFERENCES report_templates(id),
    FOREIGN KEY (semester_id) REFERENCES semesters(id),
    FOREIGN KEY (generated_by) REFERENCES users(id)
);

CREATE INDEX idx_generated_reports_student_id ON generated_reports(student_id);
CREATE INDEX idx_generated_reports_generated_date ON generated_reports(generated_date);
```

## 8. Notifications Tables

### 8.1 Notifications Table
```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipient_id UUID NOT NULL,
    sender_id UUID,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    notification_type VARCHAR(50), -- grade_posted, attendance_alert, report_ready, etc.
    related_entity_type VARCHAR(50),
    related_entity_id UUID,
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recipient_id) REFERENCES users(id),
    FOREIGN KEY (sender_id) REFERENCES users(id)
);

CREATE INDEX idx_notifications_recipient_id ON notifications(recipient_id);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
```

### 8.2 Notification Preferences Table
```sql
CREATE TABLE notification_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE,
    email_notifications BOOLEAN DEFAULT true,
    sms_notifications BOOLEAN DEFAULT false,
    push_notifications BOOLEAN DEFAULT true,
    notify_grades BOOLEAN DEFAULT true,
    notify_attendance BOOLEAN DEFAULT true,
    notify_assignments BOOLEAN DEFAULT true,
    notify_reports BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_notification_preferences_user_id ON notification_preferences(user_id);
```

## 9. Audit & Logging Tables

### 9.1 Audit Log Table
```sql
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    entity_type VARCHAR(50),
    entity_id UUID,
    action VARCHAR(50), -- create, update, delete, view
    changes JSONB,
    ip_address VARCHAR(50),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
```

### 9.2 Activity Log Table
```sql
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    activity_type VARCHAR(50),
    description TEXT,
    ip_address VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at);
```

## 10. Supporting Tables

### 10.1 Files Table
```sql
CREATE TABLE files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_size BIGINT,
    file_type VARCHAR(50),
    uploaded_by UUID NOT NULL,
    related_entity_type VARCHAR(50),
    related_entity_id UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (institution_id) REFERENCES institutions(id),
    FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

CREATE INDEX idx_files_institution_id ON files(institution_id);
CREATE INDEX idx_files_uploaded_by ON files(uploaded_by);
```

### 10.2 GPA Calculation Table
```sql
CREATE TABLE gpa_calculations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL,
    semester_id UUID NOT NULL,
    gpa DECIMAL(4,2),
    cumulative_gpa DECIMAL(4,2),
    total_credits INTEGER,
    earned_credits INTEGER,
    calculated_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (semester_id) REFERENCES semesters(id),
    UNIQUE(student_id, semester_id)
);

CREATE INDEX idx_gpa_calculations_student_id ON gpa_calculations(student_id);
```

## 11. Database Views

### 11.1 Student Progress View
```sql
CREATE VIEW student_progress_view AS
SELECT 
    s.id as student_id,
    u.first_name || ' ' || u.last_name as student_name,
    c.name as class_name,
    sem.name as semester_name,
    ROUND(AVG(g.weighted_score)::numeric, 2) as average_score,
    COUNT(g.id) as total_grades,
    STRING_AGG(DISTINCT gr.grade_letter, ', ') as grades
FROM students s
JOIN users u ON s.user_id = u.id
JOIN class_enrollments ce ON s.id = ce.student_id
JOIN classes c ON ce.class_id = c.id
LEFT JOIN class_courses cc ON c.id = cc.class_id
LEFT JOIN grades g ON s.id = g.student_id
LEFT JOIN semesters sem ON cc.semester_id = sem.id
GROUP BY s.id, u.first_name, u.last_name, c.name, sem.name;
```

### 11.2 Class Attendance Summary View
```sql
CREATE VIEW class_attendance_summary_view AS
SELECT 
    s.id as student_id,
    u.first_name || ' ' || u.last_name as student_name,
    c.name as class_name,
    COUNT(CASE WHEN a.status = 'present' THEN 1 END) as present_count,
    COUNT(CASE WHEN a.status = 'absent' THEN 1 END) as absent_count,
    COUNT(CASE WHEN a.status = 'late' THEN 1 END) as late_count,
    COUNT(a.id) as total_records,
    ROUND((COUNT(CASE WHEN a.status = 'present' THEN 1 END)::numeric / NULLIF(COUNT(a.id), 0) * 100), 2) as attendance_percentage
FROM students s
JOIN users u ON s.user_id = u.id
JOIN class_enrollments ce ON s.id = ce.student_id
JOIN classes c ON ce.class_id = c.id
LEFT JOIN class_courses cc ON c.id = cc.class_id
LEFT JOIN attendance a ON s.id = a.student_id AND cc.id = a.class_course_id
GROUP BY s.id, u.first_name, u.last_name, c.name;
```

## 12. Indexes Summary

Key indexes created for performance:
- User lookup: `email`, `institution_id`
- Student data: `student_id`, `user_id`, `institution_id`
- Grades: `student_id`, `class_course_id`, `entry_date`
- Attendance: `student_id`, `class_course_id`, `attendance_date`
- Timestamps: `created_at`, `updated_at` for filtering and sorting
- Notifications: `recipient_id`, `is_read` for quick queries

## 13. Constraints & Relationships

- Foreign Key Constraints: Enforced referential integrity
- Unique Constraints: Prevent duplicate entries
- Check Constraints: Data validation at DB level
- Soft Deletes: `deleted_at` column for data retention
- Cascading: Define on delete behavior (CASCADE, SET NULL, RESTRICT)

## 14. Data Backup Strategy

- Daily automated backups
- Point-in-time recovery capability
- Backup retention: 30 days
- Off-site backup storage
- Test restores quarterly
