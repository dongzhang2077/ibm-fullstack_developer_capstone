# IBM Cloud Deployment Guide

## Services to Deploy

### 1. MongoDB + Node.js API (current Docker Compose)
- MongoDB: database for dealerships/reviews
- Node.js Express API: port 3030

### 2. Django Backend (✅ have Dockerfile & deployment.yaml)
- Port: 8000
- Image: us.icr.io/sn-labs-windyheratz5/dealership:latest

### 3. Sentiment Analyzer (✅ have Dockerfile & deployment.yaml)
- Port: 5000
- Flask application with NLTK
- Image: us.icr.io/sn-labs-windyheratz5/sentiment-analyzer:latest

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

4. **Deploy to Kubernetes**
   ```bash
   kubectl apply -f deployment.yaml
   ```

5. **Build and push Sentiment Analyzer image**
   ```bash
   cd djangoapp/microservices
   docker build -t us.icr.io/$MY_NAMESPACE/sentiment-analyzer:latest .
   docker push us.icr.io/$MY_NAMESPACE/sentiment-analyzer:latest
   ```

6. **Deploy Sentiment Analyzer**
   ```bash
   kubectl apply -f deployment.yaml
   cd ../..
   ```

7. **Check deployment**
   ```bash
   kubectl get pods
   kubectl get services
   kubectl logs <pod-name>
   ```

8. **Expose service (if needed)**
   ```bash
   kubectl expose deployment dealership --type=NodePort --port=8000
   kubectl get services
   ```

## Additional Services Needed

### MongoDB Deployment
You'll need to create deployment files for:
- MongoDB (database)
- Node.js API (connects to MongoDB)

## Environment Variables

The Django deployment now includes:
- **backend_url**: `http://localhost:3030` (Node.js API)
- **sentiment_analyzer_url**: `http://sentiment-analyzer:5000/` (Kubernetes service name)

The sentiment analyzer is accessed via Kubernetes internal service name `sentiment-analyzer`, not localhost.

## Testing
- Get external IP: `kubectl get service dealership`
- Access at: http://<EXTERNAL-IP>:8000

## Important Notes
- All Docker images must be pushed to IBM Container Registry
- Services communicate via Kubernetes service names
- Check logs if pods fail: `kubectl logs <pod-name>`
- Frontend already built, served by Django static files
