#!/bin/bash

# Blocky UI Wiki Setup Script
# This script copies local wiki documentation to the GitHub wiki repository

set -e

echo "🎮 Blocky UI Wiki Setup"
echo "======================="
echo ""

# Check if wiki docs exist
if [ ! -d "docs/wiki" ]; then
    echo "❌ Error: docs/wiki directory not found"
    exit 1
fi

# Instructions
echo "📋 Before running this script, you need to:"
echo "   1. Go to https://github.com/fuR-Gaming/blocky-ui/wiki"
echo "   2. Click 'Create the first page' button"
echo "   3. Add any content (e.g., 'Initial page') and save"
echo "   4. This creates the wiki repository"
echo ""
read -p "Have you created the initial wiki page? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Please create the initial wiki page first, then run this script again."
    exit 0
fi

# Clone wiki repository
WIKI_DIR="../blocky-ui.wiki"
echo ""
echo "📥 Cloning wiki repository..."
if [ -d "$WIKI_DIR" ]; then
    echo "⚠️  Wiki directory already exists. Removing..."
    rm -rf "$WIKI_DIR"
fi

git clone https://github.com/fuR-Gaming/blocky-ui.wiki.git "$WIKI_DIR"

# Copy wiki files
echo ""
echo "📄 Copying wiki documentation..."
cp docs/wiki/*.md "$WIKI_DIR/"

# Navigate to wiki directory
cd "$WIKI_DIR"

# Check git status
echo ""
echo "📊 Files to be committed:"
git status --short

# Add and commit
echo ""
echo "💾 Committing changes..."
git add .
git commit -m "Add comprehensive wiki documentation

- Home page with navigation and project overview
- Installation & Setup guide for npm, CDN, and frameworks
- Component Reference with full API documentation
- Complete Examples with real-world implementations
- Architecture Overview with system design details
- Troubleshooting guide with common issues and solutions

🎮 Generated with Claude Code (https://claude.com/claude-code)"

# Push to wiki
echo ""
echo "🚀 Pushing to GitHub wiki..."
git push origin master

echo ""
echo "✅ Wiki setup complete!"
echo "   View at: https://github.com/fuR-Gaming/blocky-ui/wiki"
echo ""

# Clean up
cd ..
echo "🧹 Cleaning up..."
rm -rf "$WIKI_DIR"

echo "✨ All done! Your wiki is now live."
