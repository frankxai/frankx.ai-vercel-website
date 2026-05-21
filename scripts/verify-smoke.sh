#!/bin/bash

# Smoke Test Script for FrankX.AI
# Quick verification that doesn't require browser automation
# For full E2E tests, use: npm run test:e2e (requires Playwright setup)

set -e

BASE_URL="${1:-http://localhost:3000}"
FAIL_COUNT=0

echo "🔍 Running smoke tests against: $BASE_URL"
echo ""

# Helper function to check HTTP status
check_page() {
  local path=$1
  local name=$2
  local status=$(curl -L -s -o /dev/null -w "%{http_code}" "$BASE_URL$path" || echo "000")

  if [ "$status" = "200" ]; then
    echo "✅ $name - Status $status"
    return 0
  else
    echo "❌ $name - Status $status (Expected 200)"
    FAIL_COUNT=$((FAIL_COUNT + 1))
    return 1
  fi
}

# Helper function to check if page contains text
check_content() {
  local path=$1
  local search_text=$2
  local name=$3

  local response=$(curl -L -s "$BASE_URL$path")

  if echo "$response" | grep -q "$search_text"; then
    echo "✅ $name - Contains '$search_text'"
    return 0
  else
    echo "❌ $name - Missing '$search_text'"
    FAIL_COUNT=$((FAIL_COUNT + 1))
    return 1
  fi
}

echo "📄 Testing Critical Pages..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Test homepage
check_page "/" "Homepage"
check_content "/" "FrankX" "Homepage content"

# Test links page
check_page "/links" "Links Page"
check_content "/links" "Frank" "Links page content"

# Test other key pages (if they exist)
check_page "/blog" "Blog Page" || true  # Don't fail if blog doesn't exist yet
check_page "/about" "About Page" || true

echo ""
echo "🔗 Testing Social Links..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if correct social URLs are in the page
check_content "/links" "x.com/frankxeth" "X/Twitter link"
check_content "/links" "linkedin.com/in/frank-x-riemer" "LinkedIn link"
check_content "/links" "suno.com/@frankx" "Suno link"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $FAIL_COUNT -eq 0 ]; then
  echo "✅ All smoke tests passed!"
  echo ""
  echo "💡 For comprehensive E2E tests (navigation, forms, mobile):"
  echo "   npm run test:e2e"
  echo ""
  exit 0
else
  echo "❌ $FAIL_COUNT test(s) failed"
  echo ""
  exit 1
fi
