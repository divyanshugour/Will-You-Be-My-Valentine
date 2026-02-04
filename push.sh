#!/usr/bin/env bash
set -e
# Simple helper to commit and push current changes to remote 'origin' on branch 'main'.
cd "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ -z "$(git rev-parse --is-inside-work-tree 2>/dev/null)" ]; then
  echo "Not inside a git repository. Run these git commands manually from your repo root."
  exit 1
fi

if [ -z "$(git status --porcelain)" ]; then
  echo "No changes to commit."
  exit 0
fi

git add -A
git commit -m "chore: convert site to Vite + React app"
git push origin main
echo "Pushed to origin/main"
