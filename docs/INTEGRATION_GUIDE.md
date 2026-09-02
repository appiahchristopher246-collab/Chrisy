# Integration Guide - Student Academic Progress Tracking System

## 1. Third-Party Integrations

### 1.1 Email Service Integration

#### Using SendGrid
```typescript
// src/config/email.config.ts
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<void> {
  await sgMail.send({
    to,
    from: process.env.SENDER_EMAIL,
    subject,
    html
  });
}
```

#### Email Templates
```typescript
// src/utils/email.util.ts
export const emailTemplates = {
  gradePosted: (studentName: string, course: string, score: number) => `
    <h2>Grade Posted</h2>
    <p>Dear ${studentName},</p>
    <p>Your grade for ${course} has been posted: ${score}</p>
  `,
  
  attendanceAlert: (studentName: string, percentage: number) => `
    <h2>Attendance Alert</h2>
    <p>Your current attendance is ${percentage}%. Please maintain good attendance.</p>
  `,
  
  reportReady: (studentName: string, reportType: string, link: string) => `
    <h2>Report Ready</h2>
    <p>Your ${reportType} is ready. <a href="${link}">Download here</a></p>
  `
};
```

### 1.2 SMS Notifications

#### Using Twilio
```typescript
// src/config/twilio.config.ts
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function sendSMS(phoneNumber: string, message: string): Promise<void> {
  await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber
  });
}
```

#### SMS Notification Service
```typescript
// src/services/notification.service.ts
async sendAttendanceAlertSMS(studentPhone: string, percentage: number) {
  const message = `Your attendance is ${percentage}%. Please attend classes regularly.`;
  await sendSMS(studentPhone, message);
}
```

### 1.3 File Storage Integration

#### AWS S3 Setup
```typescript
// src/config/storage.config.ts
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

export async function uploadFile(
  fileName: string,
  fileContent: Buffer,
  mimeType: string
): Promise<string> {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `documents/${Date.now()}-${fileName}`,
    Body: fileContent,
    ContentType: mimeType,
    ACL: 'private'
  };
  
  const result = await s3.upload(params).promise();
  return result.Location;
}

export async function downloadFile(fileKey: string): Promise<Buffer> {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileKey
  };
  
  const data = await s3.getObject(params).promise();
  return data.Body as Buffer;
}
```

### 1.4 Payment Gateway Integration

#### Stripe Integration (for premium features)
```typescript
// src/config/stripe.config.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16'
});

export async function createPaymentIntent(amount: number, currency: string) {
  return stripe.paymentIntents.create({
    amount: amount * 100, // Convert to cents
    currency,
    automatic_payment_methods: { enabled: true }
  });
}

export async function confirmPayment(paymentIntentId: string) {
  return stripe.paymentIntents.retrieve(paymentIntentId);
}
```

### 1.5 Calendar Integration

#### Google Calendar Integration
```typescript
// src/config/calendar.config.ts
import { google } from 'googleapis';

const calendar = google.calendar('v3');

export async function createCalendarEvent(
  accessToken: string,
  event: {
    summary: string;
    start: { dateTime: string };
    end: { dateTime: string };
    attendees: Array<{ email: string }>;
  }
) {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_CALLBACK_URL
  );
  auth.setCredentials({ access_token: accessToken });
  
  return calendar.events.insert({
    auth,
    calendarId: 'primary',
    requestBody: event
  });
}
```

### 1.6 LMS Integration

#### Canvas LMS API Integration
```typescript
// src/services/lms.service.ts
import axios from 'axios';

const canvasAPI = axios.create({
  baseURL: process.env.CANVAS_API_URL,
  headers: {
    'Authorization': `Bearer ${process.env.CANVAS_API_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

export async function syncCourses() {
  try {
    const response = await canvasAPI.get('/courses');
    // Sync courses to Chrisy database
    await syncCoursesToDatabase(response.data);
  } catch (error) {
    logger.error('Canvas course sync failed', error);
  }
}

export async function syncAssignments(courseId: string) {
  try {
    const response = await canvasAPI.get(`/courses/${courseId}/assignments`);
    // Sync assignments to Chrisy
    await syncAssignmentsToDatabase(courseId, response.data);
  } catch (error) {
    logger.error('Canvas assignment sync failed', error);
  }
}
```

### 1.7 Single Sign-On (SSO) Integration

#### OAuth 2.0 with Google
```typescript
// src/config/oauth.config.ts
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    
    if (!user) {
      user = await User.create({
        googleId: profile.id,
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        profilePictureUrl: profile.photos[0].value
      });
    }
    
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Routes
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);
```

#### SAML 2.0 Integration
```typescript
// src/config/saml.config.ts
import { Strategy as SAMLStrategy } from 'passport-saml';

passport.use(new SAMLStrategy({
  path: '/auth/login/callback',
  entryPoint: process.env.SAML_ENTRY_POINT,
  issuer: process.env.SAML_ISSUER,
  cert: process.env.SAML_CERT
}, async (profile, done) => {
  try {
    let user = await User.findOne({ samlId: profile.uid });
    
    if (!user) {
      user = await User.create({
        samlId: profile.uid,
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName
      });
    }
    
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));
```

## 2. Webhook Implementation

### 2.1 Webhook Registration
```typescript
// src/api/controllers/webhook.controller.ts
async registerWebhook(req: Request, res: Response) {
  const { url, events, secret } = req.body;
  
  const webhook = await Webhook.create({
    url,
    events,
    secret,
    institutionId: req.user.institutionId,
    isActive: true
  });
  
  res.status(201).json(webhook);
}
```

### 2.2 Webhook Dispatch
```typescript
// src/services/webhook.service.ts
export async function dispatchWebhook(eventType: string, data: any) {
  const webhooks = await Webhook.find({
    events: { $in: [eventType] },
    isActive: true
  });
  
  for (const webhook of webhooks) {
    try {
      const payload = JSON.stringify({
        event: eventType,
        data,
        timestamp: new Date().toISOString()
      });
      
      const signature = generateSignature(payload, webhook.secret);
      
      await axios.post(webhook.url, payload, {
        headers: {
          'X-Webhook-Signature': signature,
          'X-Webhook-Event': eventType,
          'Content-Type': 'application/json'
        },
        timeout: 5000
      });
    } catch (error) {
      logger.error(`Webhook dispatch failed for ${webhook.url}`, error);
      // Retry logic
      await retryWebhook(webhook.id, eventType, data);
    }
  }
}
```

## 3. Data Migration & Import

### 3.1 Bulk Data Import
```typescript
// src/services/import.service.ts
import * as XLSX from 'xlsx';

export async function importStudentsFromExcel(filePath: string) {
  const workbook = XLSX.readFile(filePath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(worksheet);
  
  const results = {
    success: 0,
    failed: 0,
    errors: []
  };
  
  for (const row of data) {
    try {
      const validation = validateStudentData(row);
      if (!validation.isValid) {
        results.failed++;
        results.errors.push({
          row: row.__rowNum__,
          errors: validation.errors
        });
        continue;
      }
      
      await Student.create({
        firstName: row.first_name,
        lastName: row.last_name,
        email: row.email,
        dateOfBirth: row.dob,
        classId: row.class_id
      });
      
      results.success++;
    } catch (error) {
      results.failed++;
      results.errors.push({
        row: row.__rowNum__,
        error: error.message
      });
    }
  }
  
  return results;
}
```

### 3.2 CSV Export
```typescript
// src/services/export.service.ts
export async function exportStudentsToCSV(classId: string): Promise<Buffer> {
  const students = await Student.find({ classId });
  
  const csv = stringify([
    ['Student ID', 'First Name', 'Last Name', 'Email', 'Date of Birth'],
    ...students.map(s => [
      s.studentId,
      s.firstName,
      s.lastName,
      s.email,
      s.dateOfBirth
    ])
  ]);
  
  return Buffer.from(csv);
}
```

## 4. Data Synchronization

### 4.1 Real-time Sync with Message Queue
```typescript
// src/services/sync.service.ts
import amqp from 'amqplib';

let channel;

export async function initializeMessageQueue() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await connection.createChannel();
  
  // Declare exchanges
  await channel.assertExchange('chrisy-events', 'topic', { durable: true });
  
  // Declare queues
  await channel.assertQueue('grade-updates', { durable: true });
  await channel.assertQueue('attendance-updates', { durable: true });
  
  // Bind queues
  await channel.bindQueue('grade-updates', 'chrisy-events', 'grade.*');
  await channel.bindQueue('attendance-updates', 'chrisy-events', 'attendance.*');
  
  // Start consuming
  consumeGradeUpdates();
  consumeAttendanceUpdates();
}

async function consumeGradeUpdates() {
  await channel.consume('grade-updates', async (msg) => {
    const { gradeId, studentId, score } = JSON.parse(msg.content.toString());
    
    // Update cache
    await redis.set(`grade:${gradeId}`, JSON.stringify({ gradeId, studentId, score }));
    
    // Send notification
    await notificationService.notifyStudentGradePosted(studentId, score);
    
    channel.ack(msg);
  });
}

export async function publishGradeUpdate(grade: Grade) {
  await channel.publish(
    'chrisy-events',
    'grade.posted',
    Buffer.from(JSON.stringify(grade))
  );
}
```

## 5. API Gateway Configuration

### 5.1 Kong API Gateway Setup
```yaml
# kong.yml
_format_version: "3.0"
_transform: true

services:
  - name: chrisy-api
    url: http://localhost:3000
    routes:
      - name: student-api
        paths:
          - /students
      - name: grade-api
        paths:
          - /grades
      - name: attendance-api
        paths:
          - /attendance

plugins:
  - name: jwt
    service: chrisy-api
    config:
      key_claim_name: sub
      secret_is_base64: false
  
  - name: rate-limiting
    service: chrisy-api
    config:
      minute: 1000
      hour: 50000
  
  - name: cors
    service: chrisy-api
    config:
      origins:
        - http://localhost:3000
        - https://chrisy.app
      credentials: true
```

## 6. Monitoring & Analytics Integration

### 6.1 Datadog Integration
```typescript
// src/config/datadog.config.ts
import StatsD from 'node-dogstatsd';

const dogstatsd = new StatsD.StatsD({
  host: process.env.DATADOG_HOST,
  port: process.env.DATADOG_PORT
});

export function trackMetric(metricName: string, value: number, tags?: string[]) {
  dogstatsd.gauge(metricName, value, tags);
}

export function trackEvent(eventName: string, tags?: string[]) {
  dogstatsd.increment(eventName, 1, tags);
}

// Usage
trackEvent('grade.created', [`user:${userId}`, `institution:${institutionId}`]);
trackMetric('api.response_time', responseTime, [`endpoint:/grades`]);
```

### 6.2 Sentry Error Tracking
```typescript
// src/config/sentry.config.ts
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0
});

// Error handler middleware
app.use((err, req, res, next) => {
  Sentry.captureException(err);
  res.status(500).json({ error: 'Internal Server Error' });
});
```

## 7. Backup & Disaster Recovery

### 7.1 Automated Database Backups
```bash
#!/bin/bash
# backup.sh

BACKUP_DIR="/backups/postgresql"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/chrisy_backup_$TIMESTAMP.sql"

pg_dump -h $DB_HOST -U $DB_USER -d $DB_NAME > $BACKUP_FILE

# Upload to S3
aws s3 cp $BACKUP_FILE s3://chrisy-backups/postgresql/

# Keep only last 30 days
find $BACKUP_DIR -mtime +30 -delete

echo "Backup completed: $BACKUP_FILE"
```

### 7.2 Backup Schedule (crontab)
```bash
# Run daily at 2 AM
0 2 * * * /usr/local/bin/backup.sh >> /var/log/chrisy-backup.log 2>&1

# Run weekly full backup on Sunday
0 3 * * 0 /usr/local/bin/full-backup.sh >> /var/log/chrisy-backup.log 2>&1
```

## 8. Version Compatibility

### 8.1 API Versioning Strategy
```typescript
// Routes by version
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);

// Deprecation headers
app.use((req, res, next) => {
  if (req.path.startsWith('/api/v1')) {
    res.set('Deprecation', 'true');
    res.set('Sunset', 'Sun, 01 Dec 2024 23:59:59 GMT');
    res.set('Link', '</api/v2>; rel="successor-version"');
  }
  next();
});
```

### 8.2 Database Schema Versioning
```typescript
// Schema migrations with versioning
export const migrations = {
  '1.0.0': migrate_1_0_0,
  '1.1.0': migrate_1_1_0,
  '2.0.0': migrate_2_0_0
};
```

## 9. Environment Configuration

### 9.1 Environment Variables Template
```bash
# .env.example

# Server
NODE_ENV=development
PORT=3000
API_URL=http://localhost:3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=chrisy
DB_USER=postgres
DB_PASSWORD=password

# Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=24h
REFRESH_TOKEN_SECRET=your_refresh_token_secret

# Email
SENDGRID_API_KEY=your_sendgrid_key
SENDER_EMAIL=noreply@chrisy.app

# SMS
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Storage
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=chrisy-documents
AWS_REGION=us-east-1

# External APIs
CANVAS_API_URL=https://your-instance.instructure.com/api/v1
CANVAS_API_TOKEN=your_canvas_token

# Google
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

# Monitoring
DATADOG_HOST=127.0.0.1
DATADOG_PORT=8125
SENTRY_DSN=your_sentry_dsn

# Cache
REDIS_URL=redis://localhost:6379

# Message Queue
RABBITMQ_URL=amqp://guest:guest@localhost:5672
```

---

This integration guide covers all major third-party integrations and provides templates for connecting Chrisy with external systems. Follow these patterns when adding new integrations.
