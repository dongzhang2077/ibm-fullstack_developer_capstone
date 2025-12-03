#!/bin/bash

# Code Engine Deployment Script for Sentiment Analyzer

# Get namespace
MY_NAMESPACE=$(ibmcloud cr namespaces | grep sn-labs-)
echo "Using namespace: $MY_NAMESPACE"

# Build and push image
echo "Building sentiment analyzer image..."
docker build -t us.icr.io/$MY_NAMESPACE/sentiment-analyzer:latest .
docker push us.icr.io/$MY_NAMESPACE/sentiment-analyzer:latest

# Deploy to Code Engine as Application
echo "Deploying to Code Engine..."
ibmcloud ce application create \
  --name sentiment-analyzer \
  --image us.icr.io/$MY_NAMESPACE/sentiment-analyzer:latest \
  --registry-secret icr-secret \
  --port 5000 \
  --min-scale 1 \
  --max-scale 2 \
  --cpu 0.25 \
  --memory 0.5G

# Get the application URL
echo ""
echo "Getting application URL..."
SENTIMENT_URL=$(ibmcloud ce application get --name sentiment-analyzer --output json | grep -o '"url":"[^"]*"' | cut -d'"' -f4)
echo "Sentiment Analyzer URL: $SENTIMENT_URL"
echo ""
echo "Update your Django deployment.yaml with:"
echo "  - name: sentiment_analyzer_url"
echo "    value: \"$SENTIMENT_URL/\""
