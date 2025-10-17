#!/bin/bash

# Claude Code Compaction Tracker
# This script monitors conversation compactions and logs them with timestamps and context

LOG_FILE="$HOME/claude-compaction-tracker.log"
HISTORY_FILE="$HOME/.claude/history.jsonl"

# Initialize log file if it doesn't exist
if [ ! -f "$LOG_FILE" ]; then
    echo "=== Claude Code Compaction Tracker ===" > "$LOG_FILE"
    echo "Started: $(date)" >> "$LOG_FILE"
    echo "" >> "$LOG_FILE"
fi

# Function to log a compaction event
log_compaction() {
    local event_type="$1"
    local details="$2"

    echo "----------------------------------------" >> "$LOG_FILE"
    echo "DATE: $(date '+%Y-%m-%d %I:%M:%S %p')" >> "$LOG_FILE"
    echo "EVENT: $event_type" >> "$LOG_FILE"
    echo "DETAILS: $details" >> "$LOG_FILE"
    echo "" >> "$LOG_FILE"
}

# Check for recent compaction indicators
check_today() {
    echo ""
    echo "=== Compaction Events for $(date '+%Y-%m-%d') ==="
    echo ""

    grep "$(date '+%Y-%m-%d')" "$LOG_FILE" 2>/dev/null || echo "No events logged yet today"

    echo ""
    echo "=== Your Messages Today ==="
    echo ""

    # Count messages from today
    today_ts=$(python3 -c "import time; from datetime import datetime; dt = datetime.now().replace(hour=0, minute=0, second=0); print(int(dt.timestamp() * 1000))")

    message_count=$(python3 << EOF
import json
count = 0
with open('$HISTORY_FILE', 'r') as f:
    for line in f:
        try:
            entry = json.loads(line)
            if entry.get('timestamp', 0) >= $today_ts:
                count += 1
        except:
            pass
print(count)
EOF
)

    echo "Total messages you've sent today: $message_count"

    # If you sent >50 messages, that's likely multiple compactions
    if [ "$message_count" -gt 50 ]; then
        estimated_compactions=$(python3 -c "print(int($message_count / 15))")
        echo ""
        echo "⚠️  With $message_count messages sent, you've likely experienced"
        echo "    approximately $estimated_compactions compaction events"
        echo "    (estimating ~15-20 messages per session before compaction)"
    fi
}

# Manual logging function
manual_log() {
    echo ""
    echo "Logging manual compaction event..."
    log_compaction "MANUAL_LOG" "User reported compaction at $(date)"
    echo "✓ Logged to: $LOG_FILE"
}

# Main menu
case "${1:-check}" in
    log)
        manual_log
        ;;
    check)
        check_today
        ;;
    report)
        echo ""
        echo "=== FULL COMPACTION REPORT ==="
        echo ""
        cat "$LOG_FILE"
        echo ""
        echo "Total compaction events logged: $(grep -c "EVENT:" "$LOG_FILE" 2>/dev/null || echo 0)"
        ;;
    help|*)
        echo ""
        echo "Claude Code Compaction Tracker"
        echo ""
        echo "Usage:"
        echo "  $0 check          - Check today's activity (default)"
        echo "  $0 log            - Manually log a compaction event NOW"
        echo "  $0 report         - Show full report of all logged events"
        echo ""
        echo "IMPORTANT: Run '$0 log' immediately when you notice a compaction!"
        echo ""
        echo "Log file location: $LOG_FILE"
        echo ""
        ;;
esac
