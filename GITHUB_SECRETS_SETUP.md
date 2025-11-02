# GitHub Secrets Setup Guide

## Required Secrets for GitHub Actions

To fix the failing GitHub Actions workflows, you need to add the following secrets to your repository:

### 1. Supabase Credentials (REQUIRED)

These are needed for the validation script during builds:

- **`NEXT_PUBLIC_SUPABASE_URL`**
  - Value: Your Supabase project URL
  - Example: `https://hxvlbhphozxjmkszxjwj.supabase.co`
  - Found in: `.env.local` or Supabase dashboard

- **`NEXT_PUBLIC_SUPABASE_ANON_KEY`**
  - Value: Your Supabase anonymous/public key
  - Found in: `.env.local` or Supabase dashboard
  - Safe to expose (used in client-side code)

### 2. Lighthouse CI Token (OPTIONAL)

- **`LHCI_GITHUB_APP_TOKEN`**
  - Optional: Only needed if you want Lighthouse CI to post comments on PRs
  - Generate at: https://github.com/settings/tokens
  - Permissions needed: `repo` scope

### 3. Email Notification Secrets (ALREADY SET?)

For the affiliate link checker workflow:

- **`GMAIL_USERNAME`** - Your Gmail address
- **`GMAIL_PASSWORD`** - App-specific password

## How to Add Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret with the name and value listed above

## Quick Setup

Run this in your terminal to get the values from your `.env.local`:

```bash
grep "NEXT_PUBLIC_SUPABASE" .env.local
```

Then copy those values to GitHub Secrets.

## After Adding Secrets

Once you've added the secrets, re-run the failed workflow:

1. Go to **Actions** tab
2. Find the failed workflow run
3. Click **Re-run all jobs**
