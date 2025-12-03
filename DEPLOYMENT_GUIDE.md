# IBM Cloud Deployment Guide

## Services to Deploy

### 1. MongoDB + Node.js API (current Docker Compose)
- MongoDB: database for dealerships/reviews
- Node.js Express API: port 3030

### 2. Django Backend (already have Dockerfile & deployment.yaml)
- Port: 8000
- Image: us.icr.io/sn-labs-dongzhang2077/dealership:latest

### 3. Sentiment Analyzer (have Dockerfile)
- Port: 5000
- Flask application

### 4. React Frontend
- Already built in frontend/build
- Served by Django as static files

## Steps to Deploy on IBM Cloud

### In IBM Skills Network Lab:

1. **Clone your repo**
   ```bash
   git clone https://github.com/dongzhang2077/ibm-fullstack_developer_capstone.git
   cd ibm-fullstack_developer_capstone/server
   ```

2. **Get your namespace**
   ```bash
   MY_NAMESPACE=$(ibmcloud cr namespaces | grep sn-labs-)
   echo $MY_NAMESPACE
   ```

3. **Build and push Django image**
   ```bash
   docker build -t us.icr.io/$MY_NAMESPACE/dealership:latest .
   docker push us.icr.io/$MY_NAMESPACE/dealership:latest
   ```

4. **Update deployment.yaml**
   Replace `sn-labs-dongzhang2077` with your actual namespace in:
   - server/deployment.yaml (line 29)

5. **Deploy to Kubernetes**
   ```bash
   kubectl apply -f deployment.yaml
   ```

6. **Check deployment**
   ```bash
   kubectl get pods
   kubectl get services
   kubectl logs <pod-name>
   ```

7. **Expose service (if needed)**
   ```bash
   kubectl expose deployment dealership --type=NodePort --port=8000
   kubectl get services
   ```

## Additional Services Needed

### MongoDB Deployment
You'll need to create deployment files for:
- MongoDB (database)
- Node.js API (connects to MongoDB)

### Sentiment Analyzer Deployment
Build and deploy the sentiment analyzer:
```bash
cd djangoapp/microservices
docker build -t us.icr.io/$MY_NAMESPACE/sentiment:latest .
docker push us.icr.io/$MY_NAMESPACE/sentiment:latest
```

## Environment Variables to Update

1. **server/djangoapp/.env**
   - backend_url: Node.js service URL
   - sentiment_analyzer_url: Sentiment service URL

2. **Connection strings**
   - MongoDB connection in Node.js
   - Service-to-service communication uses Kubernetes service names

## Testing
- Get external IP: `kubectl get service dealership`
- Access at: http://<EXTERNAL-IP>:8000

## Important Notes
- All Docker images must be pushed to IBM Container Registry
- Services communicate via Kubernetes service names
- Check logs if pods fail: `kubectl logs <pod-name>`
- Frontend already built, served by Django static files
