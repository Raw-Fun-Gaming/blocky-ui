# GitHub Wiki Setup Guide

The wiki documentation has been created in `docs/wiki/` but needs to be uploaded to GitHub's wiki system.

## Option 1: Automated Setup (Recommended)

### Steps:

1. **Create the initial wiki page on GitHub**:
   - Go to: https://github.com/fuR-Gaming/blocky-ui/wiki
   - Click the **"Create the first page"** button
   - Enter any content (e.g., "Welcome to Blocky UI")
   - Click **"Save Page"**
   - This creates the wiki git repository

2. **Run the setup script**:
   ```bash
   ./setup-wiki.sh
   ```

   The script will:
   - Clone the wiki repository
   - Copy all wiki files from `docs/wiki/`
   - Commit and push to GitHub
   - Clean up temporary files

3. **Verify**:
   - Visit: https://github.com/fuR-Gaming/blocky-ui/wiki
   - You should see all 6 wiki pages

---

## Option 2: Manual Setup

If you prefer to do it manually:

### Steps:

1. **Create initial page** (same as Option 1 step 1)

2. **Clone wiki repository**:
   ```bash
   cd /Users/r.fu/Projects
   git clone https://github.com/fuR-Gaming/blocky-ui.wiki.git
   cd blocky-ui.wiki
   ```

3. **Copy wiki files**:
   ```bash
   cp ../blocky-ui/docs/wiki/*.md .
   ```

4. **Commit and push**:
   ```bash
   git add .
   git commit -m "Add comprehensive wiki documentation"
   git push origin master
   ```

5. **Clean up**:
   ```bash
   cd ..
   rm -rf blocky-ui.wiki
   ```

---

## Wiki Pages Overview

After setup, these pages will be available:

| Page | Description | Size |
|------|-------------|------|
| **Home** | Main landing page with navigation | ~3,000 words |
| **Installation-&-Setup** | Complete installation guide | ~2,000 words |
| **Component-Reference** | Full API documentation | ~4,000 words |
| **Complete-Examples** | Real-world implementations | ~3,500 words |
| **Architecture-Overview** | System design deep dive | ~3,000 words |
| **Troubleshooting** | Common issues and solutions | ~2,500 words |

**Total**: ~18,000 words of comprehensive documentation

---

## GitHub Wiki Features

Once published, your wiki will have:

- ✅ Full-text search
- ✅ Revision history for all pages
- ✅ Sidebar navigation (automatically generated from page names)
- ✅ Markdown rendering with syntax highlighting
- ✅ Direct link sharing (e.g., `/wiki/Component-Reference`)

---

## Wiki URL Structure

After setup, pages will be accessible at:

- Home: `https://github.com/fuR-Gaming/blocky-ui/wiki`
- Installation: `https://github.com/fuR-Gaming/blocky-ui/wiki/Installation-&-Setup`
- Components: `https://github.com/fuR-Gaming/blocky-ui/wiki/Component-Reference`
- Examples: `https://github.com/fuR-Gaming/blocky-ui/wiki/Complete-Examples`
- Architecture: `https://github.com/fuR-Gaming/blocky-ui/wiki/Architecture-Overview`
- Troubleshooting: `https://github.com/fuR-Gaming/blocky-ui/wiki/Troubleshooting`

---

## Updating Wiki Pages

To update wiki pages in the future:

1. Edit files in `docs/wiki/`
2. Commit to main repository:
   ```bash
   git add docs/wiki/
   git commit -m "Update wiki documentation"
   git push
   ```
3. Sync to GitHub wiki:
   ```bash
   ./setup-wiki.sh
   ```

Or manually clone, copy, commit, and push to the wiki repository.

---

## Troubleshooting

### "Repository not found" error
- Make sure you've created the initial page on GitHub first
- The wiki repository is created automatically after the first page

### Permission errors
- Ensure you have write access to the repository
- Check your SSH/HTTPS git credentials

### Wiki not updating
- Clear browser cache
- Wait 1-2 minutes for GitHub to process changes
- Check wiki repository commits: `https://github.com/fuR-Gaming/blocky-ui.wiki.git`

---

## Alternative: Keep Documentation in Main Repository

If you prefer not to use GitHub's wiki system, you can:

1. Keep documentation in `docs/wiki/` (already done ✅)
2. Link to it from README (already done ✅)
3. Users can browse files directly on GitHub
4. Advantages:
   - Version controlled with main code
   - Included in releases
   - No separate wiki repository to manage
   - Works with GitHub Pages

Both approaches are valid! GitHub wiki provides search and navigation, while `docs/wiki/` keeps everything in one repository.

---

**Need help? Open an issue at https://github.com/fuR-Gaming/blocky-ui/issues**
