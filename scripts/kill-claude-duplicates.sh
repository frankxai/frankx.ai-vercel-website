#!/bin/bash
# Kill duplicate Claude subagents (keeps one per session)
# Safe to run - won't kill main Claude sessions

echo "=== Killing Duplicate Claude Subagents ==="

declare -A seen
killed=0

for pid in $(ps aux --sort=-%mem | grep "claude.*--resume" | awk '{print $2}'); do
    session=$(ps -p $pid -o args= 2>/dev/null | grep -oP "resume \K[a-f0-9-]+")
    if [[ -n "$session" ]]; then
        if [[ -n "${seen[$session]}" ]]; then
            echo "Killing duplicate $pid (session ${session:0:8}...)"
            kill $pid 2>/dev/null
            ((killed++))
        else
            seen[$session]=1
            echo "Keeping $pid (session ${session:0:8}...)"
        fi
    fi
done

echo ""
echo "Killed $killed duplicate processes"
echo ""
free -h | head -2
