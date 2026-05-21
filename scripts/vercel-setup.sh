#!/bin/bash
# Vercel Multi-Project Setup Script
# Links local directories to Vercel projects and pulls env vars

set -e

# Project mappings: local_path:vercel_project_name
PROJECTS=(
  "/mnt/c/Users/Frank/FrankX:frankx-ai-vercel-website"
  "/mnt/c/Users/Frank/Arcanea:arcanea-3"
  "/mnt/c/Users/Frank/AI Music Academy:arcanea-academy"
)

echo "🔗 Vercel Multi-Project Setup"
echo "=============================="

for mapping in "${PROJECTS[@]}"; do
  IFS=':' read -r local_path vercel_project <<< "$mapping"

  echo ""
  echo "📁 Project: $vercel_project"
  echo "   Path: $local_path"

  if [ ! -d "$local_path" ]; then
    echo "   ⚠️  Directory not found, skipping..."
    continue
  fi

  cd "$local_path"

  # Check if already linked
  if [ -f ".vercel/project.json" ]; then
    echo "   ✓ Already linked"
  else
    echo "   🔗 Linking to Vercel..."
    vercel link --yes --project="$vercel_project" 2>/dev/null || {
      echo "   ⚠️  Failed to link (project may not exist or different name)"
      continue
    }
  fi

  # Pull environment variables
  echo "   📥 Pulling environment variables..."
  vercel env pull --yes 2>/dev/null || echo "   ⚠️  No env vars or pull failed"

  echo "   ✅ Done"
done

echo ""
echo "=============================="
echo "✅ Setup complete!"
echo ""
echo "To add more projects, edit this script and add to PROJECTS array:"
echo '  "/path/to/project:vercel-project-name"'
