# Affiliate Link Checker Setup Guide

This guide explains how to set up the automated daily affiliate link checker for Chef Approved Tools.

## Overview

The affiliate link checker runs automatically every day at **6 AM Pacific Time (2 PM UTC)** and:
- Scans all review pages for Amazon affiliate links
- Tests each link to ensure it works and redirects correctly
- Verifies that links use the correct affiliate tag: `chefapprovedt-20`
- Sends email notifications with the results

## Email Notifications

You will receive an email every day at scottdbradley@gmail.com:
- ✅ **Success Email**: If all links are working correctly
- 🚨 **Alert Email**: If any broken links are detected (with detailed information)

## Required Setup: GitHub Secrets

To enable email notifications, you need to add two GitHub secrets to your repository:

### Step 1: Create a Gmail App Password

1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification**
3. Scroll down to **App passwords**
4. Click **Select app** → Choose "Mail"
5. Click **Select device** → Choose "Other" and enter "GitHub Actions"
6. Click **Generate**
7. **Copy the 16-character password** (you won't be able to see it again)

### Step 2: Add Secrets to GitHub

1. Go to your GitHub repository: https://github.com/YOUR_USERNAME/chef-approved-tools
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following two secrets:

#### Secret 1: GMAIL_USERNAME
- **Name**: `GMAIL_USERNAME`
- **Value**: `scottdbradley@gmail.com`

#### Secret 2: GMAIL_PASSWORD
- **Name**: `GMAIL_PASSWORD`
- **Value**: [Paste the 16-character app password from Step 1]

## Testing the Workflow

### Manual Test
You can trigger the workflow manually to test it:

1. Go to **Actions** tab in your GitHub repository
2. Click **Check Amazon Affiliate Links** in the left sidebar
3. Click **Run workflow** button
4. Select the `main` branch
5. Click **Run workflow**
6. Wait for the workflow to complete (usually 1-2 minutes)
7. Check your email for the notification

### What the Workflow Checks

For each Amazon link, the workflow verifies:
- ✅ Link returns HTTP 200 or valid redirect (300-399)
- ✅ Link redirects to amazon.com (not blocked or broken)
- ✅ Link contains the correct affiliate tag: `chefapprovedt-20`

## Schedule

The workflow runs automatically:
- **Daily at 6:00 AM Pacific Time** (2:00 PM UTC / 14:00 UTC)
- Can also be triggered manually via the Actions tab

## Troubleshooting

### Email Not Received

1. Check **GitHub Actions** → **Check Amazon Affiliate Links** → Latest run
2. Look for the "Send Email" step
3. If it shows an error:
   - Verify the GitHub secrets are set correctly
   - Ensure the Gmail app password is valid
   - Check that 2-Step Verification is enabled on your Google account

### False Positives

Amazon sometimes temporarily blocks requests that look like bots. The workflow uses proper browser headers to minimize this, but if you see false positives:
- Wait a few hours and run the workflow again
- Manually test the reported broken links in a browser
- Check if Amazon has made changes to their redirect system

### Links Marked as Broken

If the workflow reports broken links:
1. Manually test each link in a browser
2. Check if the product still exists on Amazon
3. Log into Amazon Associates: https://affiliate-program.amazon.com
4. Generate fresh affiliate links for any discontinued products
5. Update the affected review pages in your repository
6. Verify the affiliate tag is `chefapprovedt-20`

## File Locations

- **Workflow File**: `.github/workflows/check-affiliate-links.yml`
- **Documentation**: `docs/AFFILIATE_LINK_CHECKER_SETUP.md`

## Workflow Configuration

If you need to change the schedule or email settings:
- Edit: `.github/workflows/check-affiliate-links.yml`
- The cron schedule uses UTC time (6 AM Pacific = 2 PM UTC = `0 14 * * *`)
- Email recipient is set to: `scottdbradley@gmail.com`

## Support

For issues or questions:
- Check the GitHub Actions logs for detailed error messages
- Review this documentation
- Test manually using the "Run workflow" button
