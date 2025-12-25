#!/bin/bash

# 1. Check if a commit message was provided
if [ -z "$1" ]; then
    echo "⚠️  Error: You forgot the commit message."
    echo "Usage: ./push.sh \"Your commit message\""
    exit 1
fi

# 2. Get the current branch name (e.g., main, master)
BRANCH=$(git branch --show-current)

# 3. Add all changes
echo "📦 Adding files..."
git add .

# 4. Commit changes
echo "📝 Committing..."
git commit -m "$1"

# 5. Push to Primary (jadonamite)
echo "🚀 Pushing to origin (jadonamite)..."
git push origin $BRANCH

# 6. Push to Secondary (jadonsunshine)
# We use the direct URL here to be 100% sure it goes to the right place
echo "🚀 Pushing to secondary (jadonsunshine)..."
git push https://github.com/jadonsunshine/SEED.git $BRANCH

echo "✅ Done! Code pushed to both repositories."
