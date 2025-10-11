# Amazon Product Advertising API Setup Guide

## 📋 Current Status Check

**Your Situation:**
- ✅ Amazon Associates Account: Active (`chefapprovedt-20`)
- ❓ PA-API Access: Unknown (need to verify)
- ❓ Sales Requirement: 0 sales (may limit access)

## 🚀 Step 1: Check PA-API Eligibility

### Get Your AWS Credentials
1. **Sign into AWS Console**: https://console.aws.amazon.com/
   - Use the same email as your Amazon Associates account
   - If no AWS account, create one (free)

2. **Create IAM User for PA-API**:
   ```
   AWS Console → IAM → Users → Add User
   Name: "pa-api-user"
   Access type: Programmatic access
   ```

3. **Get Access Keys**:
   - After creating user, download the `.csv` with:
     - Access Key ID
     - Secret Access Key

### Apply for PA-API Access
1. **Go to Associates Central**: https://associates.amazon.com/
2. **Navigate**: Tools → Product Advertising API
3. **Request Access** (if not already done)
4. **Wait for approval** (can take 1-7 days)

## 🧪 Step 2: Test Your Access

### Set Environment Variables
Create `.env.local` with your credentials:

```bash
# Add to .env.local (create if doesn't exist)
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
AMAZON_ASSOCIATE_TAG=chefapprovedt-20
```

### Run the Test Script
```bash
cd /Users/scottbradley/chef-approved-tools
node scripts/check-pa-api-eligibility.js
```

## 📊 Expected Results

### ✅ **Success Response:**
```
🔍 Testing Amazon PA-API connectivity...
✅ PA-API Access Confirmed!
   Marketplace: www.amazon.com
   Partner Tag: chefapprovedt-20
   Test Product: Vitamix 5200 Professional-Grade Blender
```

### ❌ **Common Error Responses:**

#### **1. "Invalid Associate Tag"**
- **Issue**: Associate tag incorrect
- **Fix**: Verify `chefapprovedt-20` in Associates dashboard

#### **2. "Not Authorized to use ProductAdvertisingAPI"**
- **Issue**: PA-API access not approved yet
- **Fix**: Apply for access in Associates Central

#### **3. "Invalid Signature / Access Denied"**
- **Issue**: Wrong AWS credentials
- **Fix**: Double-check Access Key ID and Secret

#### **4. "Request has expired"**
- **Issue**: System clock/timezone mismatch
- **Fix**: Sync system time

## 🎯 Step 3: Implementation Plan

### If PA-API Access Works:
1. **Install Dependencies**:
   ```bash
   npm install amazon-paapi crypto-js
   ```

2. **Create Price Update Service**:
   - Fetch prices daily/weekly
   - Store in database or JSON file
   - Update product pages automatically

3. **Add Price Display Components**:
   - Show current prices
   - Display price history
   - Add "price drop" alerts

### If PA-API Access Denied:
**Alternative Approaches:**
1. **Manual Price Updates**: Update prices weekly manually
2. **Price Ranges**: Show "Starting at $X" instead of exact prices
3. **Third-party APIs**: Use Keepa or similar (paid services)
4. **Focus on Sales**: Generate affiliate sales to get PA-API access

## 📈 Next Steps Based on Results

### ✅ **If API Works**:
I'll create the automated pricing system integration

### ❌ **If API Blocked**:
I'll implement a price range system as interim solution

---

## 🔍 Quick Diagnosis

**Run this command to check your current status:**
```bash
node scripts/check-pa-api-eligibility.js
```

**Then let me know the output and I'll guide you to the next step!**