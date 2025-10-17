# Claude Code Compaction Tracking

This directory contains tools to track and document Claude Code's conversation compaction behavior.

## The Problem

Claude Code advertises a **200,000 token context window** but users report compactions occurring around **140,000 tokens (~70% of advertised capacity)**. This causes:

- Frequent loss of conversation context
- Interruptions to workflow every 15-20 messages
- Inability to maintain long working sessions

## Tracking Tools

### 1. Real-Time Compaction Logger

**When to use:** Immediately when you notice a compaction has occurred

```bash
npm run compaction-log
```

This logs the exact time and creates a timestamped record you can reference later.

### 2. Daily Activity Check

**When to use:** Check your daily compaction count and message activity

```bash
npm run compaction-check
```

Shows:
- Total messages sent today
- Estimated number of compactions
- Analysis of whether you're hitting compaction frequently

### 3. Full Analysis Report

**When to use:** Generate a comprehensive report to submit to Anthropic support

```bash
npm run compaction-report
```

Provides:
- Last 7 days of activity
- Compaction frequency analysis
- Hourly breakdown for today
- Ready-to-submit evidence for support tickets

## Evidence from Your Usage

Based on analysis from October 11-17, 2025:

```
Last 7 Days Activity:
- Total Messages: 631
- Estimated Compactions: ~32
- Worst Day (Oct 14): 146 messages → ~8 compactions

Average Compaction Rate:
- Every ~20 messages
- Every ~2 hours of active work
```

## Submitting to Anthropic Support

Use the output from `npm run compaction-report` to file a support ticket:

### Issue Template:

**Subject:** Conversation compaction occurring at ~70% of advertised token limit

**Body:**
```
I'm experiencing frequent conversation compactions well before the advertised
200k token limit in Claude Code.

Evidence from my usage (see attached report):
- Compactions occurring every 15-20 messages
- Estimated at ~70% of advertised token capacity (140k vs 200k)
- Last 7 days: 631 messages sent with ~32 compaction events

This significantly impacts productivity during extended coding sessions, as
context is lost every 1-2 hours of work.

Could you investigate why compaction is occurring at ~70% of the advertised limit?

[Attach output from: npm run compaction-report]
```

## Files

- `scripts/track-claude-compactions.sh` - Real-time event logger
- `scripts/claude-compaction-report.py` - Analysis and report generator
- `~/claude-compaction-tracker.log` - Your personal log of compaction events

## Tips

1. **Log immediately**: When you see "This session is being continued from a previous conversation", run `npm run compaction-log` right away

2. **Daily habit**: Run `npm run compaction-check` at end of day to track patterns

3. **Weekly reports**: Generate `npm run compaction-report` weekly to track trends

4. **Build your case**: The more data you collect, the stronger your evidence for support

## Support Links

- Claude Code Issues: https://github.com/anthropics/claude-code/issues
- Anthropic Support: https://support.anthropic.com
