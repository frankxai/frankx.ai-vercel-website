#!/bin/bash
# FrankX Memory Monitor
# Tracks Claude/OpenCode/agent memory usage over time

LOG_DIR="$HOME/.claude-mem/memory-logs"
mkdir -p "$LOG_DIR"

DATE=$(date +%Y-%m-%d)
TIME=$(date +%H:%M:%S)
LOG_FILE="$LOG_DIR/memory-$DATE.log"

# Get memory stats
MEM_TOTAL=$(free -m | awk '/^Mem:/ {print $2}')
MEM_USED=$(free -m | awk '/^Mem:/ {print $3}')
MEM_FREE=$(free -m | awk '/^Mem:/ {print $4}')
MEM_PERCENT=$((MEM_USED * 100 / MEM_TOTAL))

# Count Claude processes
CLAUDE_MAIN=$(ps aux | grep -c "[c]laude.*--dangerously")
CLAUDE_SUBAGENTS=$(ps aux | grep -c "[c]laude.*--resume")
OPENCODE=$(ps aux | grep -c "[o]pencode")

# Get total Claude memory (MB)
CLAUDE_MEM=$(ps aux | grep "[c]laude" | awk '{sum+=$6} END {print int(sum/1024)}')

# Log entry
echo "$TIME | Mem: ${MEM_USED}MB/${MEM_TOTAL}MB (${MEM_PERCENT}%) | Claude: ${CLAUDE_MAIN} main, ${CLAUDE_SUBAGENTS} subagents | Claude total: ${CLAUDE_MEM}MB | OpenCode: ${OPENCODE}" >> "$LOG_FILE"

# Output to terminal if run interactively
if [ -t 1 ]; then
    echo "=== FrankX Memory Status ==="
    echo "Time: $TIME"
    echo "Memory: ${MEM_USED}MB / ${MEM_TOTAL}MB (${MEM_PERCENT}%)"
    echo "Claude main sessions: $CLAUDE_MAIN"
    echo "Claude subagents: $CLAUDE_SUBAGENTS"
    echo "Claude total memory: ${CLAUDE_MEM}MB"
    echo "OpenCode instances: $OPENCODE"
    echo ""
    echo "Log: $LOG_FILE"

    # Warn if memory is high
    if [ $MEM_PERCENT -gt 80 ]; then
        echo ""
        echo "⚠️  WARNING: Memory usage above 80%!"
        echo "Consider: kill-claude-duplicates.sh or closing sessions"
    fi
fi
