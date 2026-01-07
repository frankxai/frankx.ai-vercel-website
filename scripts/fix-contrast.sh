#!/bin/bash
# Script to fix WCAG AAA contrast issues by replacing text-white/70 with text-slate-200 or text-slate-300

FILE="components/home/HomePage.tsx"

echo "Fixing contrast issues in $FILE..."

# Replace text-white/70 with text-slate-200 for body text
sed -i 's/text-white\/70/text-slate-200/g' "$FILE"

# Replace text-white/75 with text-slate-200
sed -i 's/text-white\/75/text-slate-200/g' "$FILE"

# Replace text-white/80 with text-slate-300
sed -i 's/text-white\/80/text-slate-300/g' "$FILE"

# Replace text-white/60 with text-slate-400
sed -i 's/text-white\/60/text-slate-400/g' "$FILE"

# Replace text-white/85 with text-slate-200
sed -i 's/text-white\/85/text-slate-200/g' "$FILE"

echo "Contrast fixes applied successfully!"
echo "Before committing, review the changes with: git diff $FILE"
