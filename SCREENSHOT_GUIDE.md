# Screenshot Guide for Deployment Submission

## Deployment URL
After running port-forward command:
```bash
kubectl port-forward deployment.apps/dealership 8000:8000
```

Your deployment URL will be: **https://windyheratz5-8000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/**

This is the IBM Skills Network Lab proxy URL that forwards to your localhost:8000

---

## Required Screenshots

### 1. deployed_landingpage.png
**Steps:**
1. Open browser and navigate to `https://windyheratz5-8000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/`
2. You should see the homepage with login/register buttons
3. **Ensure address bar shows the full proxy URL**
4. Take screenshot showing:
   - Address bar clearly visible
   - Login button
   - Homepage content
5. Save as: `deployed_landingpage.png`

---

### 2. deployed_loggedin.png
**Steps:**
1. Click "Login" button
2. Enter your credentials (username/password you created earlier)
   - Your SQLite database was copied during deployment
   - Use existing credentials
3. After successful login, you should see:
   - Welcome message with your username
   - Navigation options
4. **Ensure address bar shows the full proxy URL**
5. Take screenshot showing:
   - Address bar clearly visible
   - Logged in user name/welcome message
   - Homepage with user menu
6. Save as: `deployed_loggedin.png`

---

### 3. deployed_dealer_detail.png
**Steps:**
1. From logged in homepage, click "Dealers" or navigate to dealers list
2. Click on any dealer name to view dealer details
3. You should see:
   - Dealer name and address
   - List of reviews for that dealer
   - Each review showing: reviewer name, car details, review text, sentiment
4. **Ensure address bar shows the proxy URL with dealer path**
5. Take screenshot showing:
   - Address bar clearly visible
   - Dealer details
   - Existing reviews with sentiments (positive/negative/neutral)
6. Save as: `deployed_dealer_detail.png`

---

### 4. deployed_add_review.png
**Steps:**
1. On the dealer details page, click "Add Review" button
2. Fill out the review form:
   - Select a car
   - Enter purchase date
   - Write review text (e.g., "Great service and excellent car quality!")
3. Submit the review
4. After submission, you should be redirected back to dealer details
5. Your new review should appear with:
   - Your review text
   - **Sentiment label** (positive/negative/neutral) - automatically analyzed
6. **Ensure address bar shows the proxy URL**
7. Take screenshot showing:
   - Address bar clearly visible
   - Your newly added review
   - **Sentiment label displayed** next to your review
8. Save as: `deployed_add_review.png`

---

## Important Notes

### Before Taking Screenshots:
- Make sure port-forward is running: `kubectl port-forward deployment.apps/dealership 8000:8000`
- Verify both services are running:
  ```bash
  kubectl get pods
  # Should show dealership and sentiment-analyzer pods in Running status
  ```

### Address Bar Must Show:
- All screenshots MUST show the proxy URL: `https://windyheratz5-8000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/`
- Address bar MUST be clearly visible in ALL screenshots

### Testing Sentiment Analysis:
To verify sentiment analyzer is working:
- Write a positive review: "Excellent service, great car, very satisfied!"
  - Should show: **positive** sentiment
- Write a negative review: "Terrible experience, bad service, disappointed."
  - Should show: **negative** sentiment
- Write a neutral review: "The car is okay, service was fine."
  - Should show: **neutral** sentiment

### Troubleshooting:
If sentiment is not showing:
```bash
# Check Django logs
kubectl logs -f deployment.apps/dealership

# Check sentiment analyzer logs
kubectl logs -f deployment.apps/sentiment-analyzer

# Verify services are accessible
kubectl get services
```

---

## Submission Checklist

- [ ] Port-forward command is running
- [ ] All 4 screenshots taken with visible address bar
- [ ] Address bar shows `https://windyheratz5-8000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/` in all screenshots
- [ ] `deployed_landingpage.png` - Homepage before login
- [ ] `deployed_loggedin.png` - Homepage after login
- [ ] `deployed_dealer_detail.png` - Dealer details with reviews
- [ ] `deployed_add_review.png` - New review with sentiment label
- [ ] Deployment URL copied: `https://windyheratz5-8000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/`
