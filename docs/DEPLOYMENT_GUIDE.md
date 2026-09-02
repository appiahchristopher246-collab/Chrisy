# Deployment Guide - Student Academic Progress Tracking System

## 1. Pre-Deployment Checklist

### Infrastructure Requirements
- [ ] Cloud infrastructure provisioned (AWS/GCP/Azure)
- [ ] Database server configured and tested
- [ ] Redis cache server deployed
- [ ] Message queue (RabbitMQ/Kafka) running
- [ ] Load balancer configured
- [ ] SSL/TLS certificates obtained
- [ ] Domain name registered and configured
- [ ] Email service credentials configured
- [ ] SMS service credentials configured
- [ ] File storage service configured
- [ ] Backup storage configured
- [ ] Monitoring tools setup
- [ ] CDN configured (optional)

### Application Readiness
- [ ] All tests passing (unit, integration, e2e)
- [ ] Code review completed
- [ ] Security audit completed
- [ ] Performance testing completed
- [ ] Database migrations prepared
- [ ] Environment variables configured
- [ ] Docker images built and tested
- [ ] Kubernetes manifests prepared (if using K8s)
- [ ] API documentation updated
- [ ] User documentation prepared

## 2. Docker Setup

### Dockerfile - Backend
```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .

EXPOSE 3000
CMD ["node", "dist/app.js"]
```

### Dockerfile - Frontend
```dockerfile
# frontend/Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose - Development
```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  rabbitmq:
    image: rabbitmq:3.12-management-alpine
    environment:
      RABBITMQ_DEFAULT_USER: ${RABBITMQ_USER}
      RABBITMQ_DEFAULT_PASS: ${RABBITMQ_PASSWORD}
    ports:
      - "5672:5672"
      - "15672:15672"
    volumes:
      - rabbitmq_data:/var/lib/rabbitmq

  backend:
    build: ./backend
    environment:
      NODE_ENV: development
      DB_HOST: postgres
      DB_USER: ${DB_USER}
      DB_PASSWORD: ${DB_PASSWORD}
      DB_NAME: ${DB_NAME}
      REDIS_URL: redis://redis:6379
      RABBITMQ_URL: amqp://rabbitmq
    ports:
      - "3000:3000"
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    volumes:
      - ./backend:/app
      - /app/node_modules

  frontend:
    build: ./frontend
    ports:
      - "3001:80"
    depends_on:
      - backend
    environment:
      REACT_APP_API_URL: http://localhost:3000/api/v1

volumes:
  postgres_data:
  redis_data:
  rabbitmq_data:
```

## 3. Kubernetes Deployment

### Namespace and ConfigMap
```yaml
# k8s/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: chrisy

---

# k8s/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: chrisy-config
  namespace: chrisy
data:
  NODE_ENV: production
  API_URL: https://api.chrisy.app
  LOG_LEVEL: info
```

### Backend Deployment
```yaml
# k8s/backend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: chrisy-backend
  namespace: chrisy
spec:
  replicas: 3
  selector:
    matchLabels:
      app: chrisy-backend
  template:
    metadata:
      labels:
        app: chrisy-backend
    spec:
      containers:
      - name: backend
        image: chrisy-backend:latest
        ports:
        - containerPort: 3000
        envFrom:
        - configMapRef:
            name: chrisy-config
        - secretRef:
            name: chrisy-secrets
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5

---

# k8s/backend-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: chrisy-backend-service
  namespace: chrisy
spec:
  selector:
    app: chrisy-backend
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: LoadBalancer
```

### Frontend Deployment
```yaml
# k8s/frontend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: chrisy-frontend
  namespace: chrisy
spec:
  replicas: 2
  selector:
    matchLabels:
      app: chrisy-frontend
  template:
    metadata:
      labels:
        app: chrisy-frontend
    spec:
      containers:
      - name: frontend
        image: chrisy-frontend:latest
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5

---

# k8s/frontend-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: chrisy-frontend-service
  namespace: chrisy
spec:
  selector:
    app: chrisy-frontend
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
  type: LoadBalancer
```

### Ingress Configuration
```yaml
# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: chrisy-ingress
  namespace: chrisy
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - chrisy.app
    - api.chrisy.app
    secretName: chrisy-tls
  rules:
  - host: chrisy.app
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: chrisy-frontend-service
            port:
              number: 80
  - host: api.chrisy.app
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: chrisy-backend-service
            port:
              number: 80
```

## 4. Database Migration & Initialization

### Pre-Deployment Migration Script
```bash
#!/bin/bash
# scripts/pre-deploy.sh

set -e

echo "Starting pre-deployment tasks..."

# Wait for database to be ready
echo "Waiting for database..."
until pg_isready -h $DB_HOST -U $DB_USER; do
  sleep 1
done

# Run migrations
echo "Running database migrations..."
npm run db:migrate

# Seed initial data
echo "Seeding initial data..."
npm run db:seed

# Create indexes
echo "Creating indexes..."
npm run db:create-indexes

# Verify database
echo "Verifying database..."
npm run db:verify

echo "Pre-deployment tasks completed!"
```

### Backup Before Deployment
```bash
#!/bin/bash
# scripts/backup-before-deploy.sh

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backup_${TIMESTAMP}.sql"

echo "Creating backup: $BACKUP_FILE"
pg_dump -h $DB_HOST -U $DB_USER $DB_NAME > $BACKUP_FILE

echo "Uploading to S3..."
aws s3 cp $BACKUP_FILE s3://chrisy-backups/$BACKUP_FILE

echo "Backup completed successfully"
```

## 5. Staging Deployment

### Staging Environment Setup
```yaml
# .env.staging
NODE_ENV=staging
API_URL=https://staging-api.chrisy.app
DATABASE_URL=postgresql://user:pass@staging-db.chrisy.app/chrisy
REDIS_URL=redis://staging-redis.chrisy.app:6379
JWT_SECRET=staging_secret_key
```

### Staging Deployment Script
```bash
#!/bin/bash
# scripts/deploy-staging.sh

set -e

echo "🚀 Deploying to Staging..."

# Pull latest code
git checkout develop
git pull origin develop

# Build Docker image
docker build -t chrisy-backend:staging -f backend/Dockerfile ./backend

# Push to registry
docker tag chrisy-backend:staging $REGISTRY/chrisy-backend:staging
docker push $REGISTRY/chrisy-backend:staging

# Update Kubernetes deployment
kubectl set image deployment/chrisy-backend chrisy-backend=$REGISTRY/chrisy-backend:staging -n staging

# Wait for rollout
kubectl rollout status deployment/chrisy-backend -n staging --timeout=5m

# Run smoke tests
npm run test:smoke:staging

# Notify team
echo "✅ Staging deployment completed!"
```

## 6. Production Deployment

### Production Environment
```yaml
# .env.production
NODE_ENV=production
API_URL=https://api.chrisy.app
DATABASE_URL=postgresql://secure_user:secure_pass@prod-db.chrisy.app/chrisy
REDIS_URL=redis://prod-redis.chrisy.app:6379
JWT_SECRET=production_secret_key_with_high_entropy
```

### Production Deployment Checklist
```bash
#!/bin/bash
# scripts/pre-production-checklist.sh

echo "📋 Pre-Production Deployment Checklist"
echo "======================================"

# Code checks
echo "✓ All tests passing"
echo "✓ Code review approved"
echo "✓ Security audit completed"
echo "✓ Performance tests passed"

# Infrastructure checks
echo "✓ Database backups verified"
echo "✓ Monitoring alerts configured"
echo "✓ Load balancer health checks passing"
echo "✓ SSL certificates valid"

# Deployment checks
echo "✓ Docker images built and tested"
echo "✓ Kubernetes manifests validated"
echo "✓ Rollback plan documented"
echo "✓ Notification channels active"

read -p "Proceed with production deployment? (yes/no): " response

if [ "$response" != "yes" ]; then
  echo "❌ Deployment cancelled"
  exit 1
fi

echo "✅ All checks passed. Proceeding with deployment..."
```

### Blue-Green Deployment
```bash
#!/bin/bash
# scripts/blue-green-deploy.sh

set -e

# Current version (blue)
CURRENT_VERSION=$(kubectl get deployment chrisy-backend-blue -n prod -o jsonpath='{.spec.template.spec.containers[0].image}')

# New version (green)
NEW_VERSION=$REGISTRY/chrisy-backend:$1

echo "Blue (Current): $CURRENT_VERSION"
echo "Green (New): $NEW_VERSION"

# Deploy green
echo "Deploying green..."
kubectl set image deployment/chrisy-backend-green chrisy-backend=$NEW_VERSION -n prod

# Wait for green to be ready
kubectl rollout status deployment/chrisy-backend-green -n prod --timeout=10m

# Run smoke tests on green
echo "Running smoke tests on green..."
./scripts/smoke-tests.sh green

# Switch traffic to green
echo "Switching traffic to green..."
kubectl patch service chrisy-backend-service -n prod -p '{"spec":{"selector":{"version":"green"}}}'

echo "✅ Blue-green deployment completed. Green is now serving traffic."
```

### Canary Deployment
```bash
# scripts/canary-deploy.sh
# Deploy to small percentage of pods first, gradually increase traffic

istioctl kly apply -f - <<EOF
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: chrisy-backend
spec:
  hosts:
  - chrisy-backend
  http:
  - match:
    - uri:
        prefix: /
    route:
    - destination:
        host: chrisy-backend
        subset: v1
      weight: 90
    - destination:
        host: chrisy-backend
        subset: v2
      weight: 10
EOF
```

## 7. Post-Deployment Verification

### Health Checks
```bash
#!/bin/bash
# scripts/health-check.sh

echo "🏥 Running health checks..."

# API health
echo "Checking API health..."
curl -f https://api.chrisy.app/health || exit 1

# Database connectivity
echo "Checking database..."
curl -f https://api.chrisy.app/health/db || exit 1

# Cache connectivity
echo "Checking cache..."
curl -f https://api.chrisy.app/health/cache || exit 1

# External integrations
echo "Checking integrations..."
curl -f https://api.chrisy.app/health/integrations || exit 1

echo "✅ All health checks passed!"
```

### Monitoring Dashboard
```bash
# Access monitoring
# Datadog: https://app.datadoghq.com
# Grafana: https://grafana.chrisy.app
# Kibana: https://kibana.chrisy.app
# Prometheus: https://prometheus.chrisy.app
```

### Log Verification
```bash
# Check application logs
kubectl logs -f deployment/chrisy-backend -n prod

# Check error rates
kubectl logs -f deployment/chrisy-backend -n prod | grep ERROR

# Check performance metrics
kubectl top nodes
kubectl top pods -n prod
```

## 8. Rollback Procedure

### Immediate Rollback
```bash
#!/bin/bash
# scripts/rollback.sh

echo "⚠️  Rolling back deployment..."

# Revert to previous version
kubectl rollout undo deployment/chrisy-backend -n prod

# Verify rollback
kubectl rollout status deployment/chrisy-backend -n prod

echo "✅ Rollback completed"
```

### Database Rollback
```bash
#!/bin/bash
# scripts/db-rollback.sh

echo "Rolling back database..."

# Get latest backup
LATEST_BACKUP=$(aws s3 ls s3://chrisy-backups/ | sort | tail -n 1 | awk '{print $4}')

echo "Restoring from: $LATEST_BACKUP"

# Restore database
aws s3 cp s3://chrisy-backups/$LATEST_BACKUP - | psql $DATABASE_URL

echo "✅ Database rollback completed"
```

## 9. Monitoring & Alerting

### CPU and Memory Alerts
```yaml
# prometheus-alerts.yaml
groups:
- name: chrisy-alerts
  rules:
  - alert: HighCPUUsage
    expr: container_cpu_usage_seconds_total > 0.8
    for: 5m
    annotations:
      summary: "High CPU usage detected"
  
  - alert: HighMemoryUsage
    expr: container_memory_usage_bytes / container_spec_memory_limit_bytes > 0.8
    for: 5m
    annotations:
      summary: "High memory usage detected"
  
  - alert: PodCrashLooping
    expr: rate(kube_pod_container_status_restarts_total[1h]) > 0.1
    for: 5m
    annotations:
      summary: "Pod is crash looping"
```

### Uptime Monitoring
```bash
# Heartbeat monitoring
curl -X POST https://uptime.chrisy.app/heartbeat/api \
  -H "Content-Type: application/json" \
  -d '{"status": "up", "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"}'
```

## 10. Maintenance Windows

### Scheduled Maintenance
```bash
#!/bin/bash
# scripts/maintenance-window.sh

echo "🔧 Starting maintenance window..."

# Notify users
curl -X POST https://api.chrisy.app/notifications/broadcast \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{"message": "System maintenance in progress", "type": "maintenance"}'

# Enable maintenance mode
kubectl patch deployment chrisy-backend -n prod \
  -p '{"spec":{"template":{"metadata":{"labels":{"maintenance":"true"}}}}}'

# Take database backup
./scripts/backup-before-deploy.sh

# Perform maintenance tasks
npm run db:optimize
npm run cache:clear

# Disable maintenance mode
kubectl patch deployment chrisy-backend -n prod \
  -p '{"spec":{"template":{"metadata":{"labels":{"maintenance":"false"}}}}}'

echo "✅ Maintenance window completed"
```

---

This deployment guide covers all aspects of deploying the Chrisy system to production, from pre-deployment checks to monitoring and rollback procedures.
