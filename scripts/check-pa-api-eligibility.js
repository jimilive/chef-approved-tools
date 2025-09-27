/**
 * Amazon PA-API Eligibility Checker
 * Run this to test if your Amazon Associates account can access PA-API
 */

const https = require('https');
const crypto = require('crypto');

class AmazonPAAPIChecker {
  constructor(config) {
    this.accessKey = config.accessKey;
    this.secretKey = config.secretKey;
    this.partnerTag = config.partnerTag;
    this.marketplace = config.marketplace || 'www.amazon.com';
    this.region = config.region || 'us-east-1';
    this.service = 'ProductAdvertisingAPI';
    this.host = 'webservices.amazon.com';
    this.endpoint = `https://${this.host}/paapi5/getitems`;
  }

  /**
   * Generate AWS Signature V4
   */
  createSignature(method, canonicalURI, canonicalQueryString, canonicalHeaders, signedHeaders, payload, timestamp) {
    // Create canonical request
    const canonicalRequest = [
      method,
      canonicalURI,
      canonicalQueryString,
      canonicalHeaders,
      signedHeaders,
      this.hash(payload)
    ].join('\n');

    // Create string to sign
    const credentialScope = `${timestamp.substring(0, 8)}/${this.region}/${this.service}/aws4_request`;
    const stringToSign = [
      'AWS4-HMAC-SHA256',
      timestamp,
      credentialScope,
      this.hash(canonicalRequest)
    ].join('\n');

    // Calculate signature
    const signingKey = this.getSignatureKey(this.secretKey, timestamp.substring(0, 8), this.region, this.service);
    const signature = this.hmac(signingKey, stringToSign, 'hex');

    return signature;
  }

  /**
   * Test basic API connectivity with minimal request
   */
  async testConnectivity() {
    console.log('🔍 Testing Amazon PA-API connectivity...\n');

    if (!this.accessKey || !this.secretKey || !this.partnerTag) {
      console.log('❌ Missing required credentials:');
      console.log(`   Access Key: ${this.accessKey ? '✅ Set' : '❌ Missing'}`);
      console.log(`   Secret Key: ${this.secretKey ? '✅ Set' : '❌ Missing'}`);
      console.log(`   Partner Tag: ${this.partnerTag ? '✅ Set' : '❌ Missing'}`);
      console.log('\n📋 To get credentials:');
      console.log('   1. Go to https://associates.amazon.com/');
      console.log('   2. Navigate to Tools > Product Advertising API');
      console.log('   3. Request API access (if not already done)');
      console.log('   4. Get AWS credentials from your AWS account');
      return false;
    }

    try {
      // Test with a minimal GetItems request for a common ASIN
      const testASIN = 'B008H4SLV6'; // Vitamix 5200 from your products
      const response = await this.makeRequest(testASIN);

      if (response.success) {
        console.log('✅ PA-API Access Confirmed!');
        console.log(`   Marketplace: ${this.marketplace}`);
        console.log(`   Partner Tag: ${this.partnerTag}`);
        console.log(`   Test Product: ${response.data?.title || 'Retrieved successfully'}`);
        return true;
      } else {
        console.log('❌ PA-API Access Issues:');
        console.log(`   Error: ${response.error}`);
        this.diagnoseError(response.error);
        return false;
      }
    } catch (error) {
      console.log('❌ Connection Error:');
      console.log(`   ${error.message}`);
      return false;
    }
  }

  /**
   * Make PA-API request
   */
  async makeRequest(asin) {
    const timestamp = new Date().toISOString().replace(/[:\-]|\.\d{3}/g, '');

    const payload = JSON.stringify({
      ItemIds: [asin],
      Resources: [
        'ItemInfo.Title',
        'Offers.Listings.Price',
        'Offers.Listings.Availability.Message'
      ],
      PartnerTag: this.partnerTag,
      PartnerType: 'Associates',
      Marketplace: this.marketplace
    });

    const canonicalHeaders = [
      `content-encoding:amz-1.0`,
      `content-type:application/json; charset=utf-8`,
      `host:${this.host}`,
      `x-amz-date:${timestamp}`,
      `x-amz-target:com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems`
    ].join('\n') + '\n';

    const signedHeaders = 'content-encoding;content-type;host;x-amz-date;x-amz-target';

    const signature = this.createSignature(
      'POST',
      '/paapi5/getitems',
      '',
      canonicalHeaders,
      signedHeaders,
      payload,
      timestamp
    );

    const authHeader = `AWS4-HMAC-SHA256 Credential=${this.accessKey}/${timestamp.substring(0, 8)}/${this.region}/${this.service}/aws4_request, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    const options = {
      hostname: this.host,
      path: '/paapi5/getitems',
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Encoding': 'amz-1.0',
        'X-Amz-Date': timestamp,
        'X-Amz-Target': 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems'
      }
    };

    return new Promise((resolve) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const response = JSON.parse(data);
            if (res.statusCode === 200) {
              resolve({
                success: true,
                data: response.ItemsResult?.Items?.[0]?.ItemInfo?.Title?.DisplayValue
              });
            } else {
              resolve({
                success: false,
                error: response.Errors?.[0]?.Message || `HTTP ${res.statusCode}`
              });
            }
          } catch (e) {
            resolve({ success: false, error: `Parse error: ${e.message}` });
          }
        });
      });

      req.on('error', (error) => {
        resolve({ success: false, error: error.message });
      });

      req.write(payload);
      req.end();
    });
  }

  /**
   * Diagnose common PA-API errors
   */
  diagnoseError(error) {
    const errorMessage = error.toLowerCase();

    if (errorMessage.includes('invalid associate tag')) {
      console.log('   💡 Solution: Verify your Associate Tag (chefapprovedt-20) is correct');
    } else if (errorMessage.includes('invalid access key')) {
      console.log('   💡 Solution: Check your AWS Access Key ID');
    } else if (errorMessage.includes('invalid signature')) {
      console.log('   💡 Solution: Check your AWS Secret Access Key');
    } else if (errorMessage.includes('not authorized')) {
      console.log('   💡 Solution: Your Associates account may need PA-API approval');
      console.log('   📋 Apply at: https://partners.amazon.com/signup');
    } else if (errorMessage.includes('throttled')) {
      console.log('   💡 Solution: Rate limit exceeded - wait and try again');
    } else {
      console.log('   💡 Check Amazon PA-API documentation for this error');
    }
  }

  // Helper methods for AWS signing
  hash(data) {
    return crypto.createHash('sha256').update(data, 'utf8').digest('hex');
  }

  hmac(key, data, encoding = 'binary') {
    return crypto.createHmac('sha256', key).update(data, 'utf8').digest(encoding);
  }

  getSignatureKey(key, dateStamp, regionName, serviceName) {
    const kDate = this.hmac('AWS4' + key, dateStamp);
    const kRegion = this.hmac(kDate, regionName);
    const kService = this.hmac(kRegion, serviceName);
    const kSigning = this.hmac(kService, 'aws4_request');
    return kSigning;
  }
}

/**
 * Usage Example
 */
async function checkPAAPIAccess() {
  // You'll need to set these environment variables or replace with actual values
  const config = {
    accessKey: process.env.AWS_ACCESS_KEY_ID || 'YOUR_AWS_ACCESS_KEY',
    secretKey: process.env.AWS_SECRET_ACCESS_KEY || 'YOUR_AWS_SECRET_KEY',
    partnerTag: process.env.AMAZON_ASSOCIATE_TAG || 'chefapprovedt-20',
    marketplace: 'www.amazon.com',
    region: 'us-east-1'
  };

  const checker = new AmazonPAAPIChecker(config);
  const hasAccess = await checker.testConnectivity();

  if (hasAccess) {
    console.log('\n🎉 Ready to implement automated pricing!');
    console.log('   Next steps: Integrate PA-API into your Next.js app');
  } else {
    console.log('\n⏳ PA-API access needed. Common issues:');
    console.log('   • New Associates accounts need approval for PA-API');
    console.log('   • Must make 3+ sales within 180 days to maintain access');
    console.log('   • AWS credentials must be correctly configured');
  }
}

// Export for use as module
module.exports = { AmazonPAAPIChecker, checkPAAPIAccess };

// Run if called directly
if (require.main === module) {
  checkPAAPIAccess();
}