# Portfolio Setup Instructions

## Key notes

  - Local dev: Keep baseurl: "" in _config.yml
  - Before pushing: Change to baseurl: "/portfolio"
  - Run with: bundle exec jekyll serve → http://localhost:4000
  - Push with: git add . && git commit -m "message" && git push

## Local Development

### Prerequisites
- Ruby 3.3.0 (via rbenv)
- Bundler

### First Time Setup

1. **Install rbenv and Ruby 3.3.0:**
   ```bash
   brew install rbenv ruby-build
   echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc
   echo 'export PATH="$HOME/.rbenv/shims:$PATH"' >> ~/.zshrc
   source ~/.zshrc
   rbenv install 3.3.0
   ```

2. **Clone and setup project:**
   ```bash
   cd /Users/jonrich/portfolio
   rbenv local 3.3.0
   bundle install
   ```

### Running Locally

1. **Make sure baseurl is empty for local development:**
   In `_config.yml`:
   ```yaml
   url: ""
   baseurl: ""
   ```

2. **Start the server:**
   ```bash
   bundle exec jekyll serve
   ```

3. **Visit:** http://localhost:4000

### Making Changes and Pushing to GitHub

1. **Before pushing, update baseurl for GitHub Pages:**
   In `_config.yml`:
   ```yaml
   url: "https://jonjrich.github.io"
   baseurl: "/portfolio"
   ```

2. **Commit and push:**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

3. **Site will be live at:** https://jonjrich.github.io/portfolio

4. **After pushing, revert baseurl for local work:**
   Change back to empty strings in `_config.yml`

### Quick Commands

```bash
# Pull latest changes
git pull origin main

# Check status
git status

# View changes
git diff

# Install new gems
bundle install
```

## Important Notes

- **Local dev:** Use empty `baseurl: ""`
- **GitHub Pages:** Use `baseurl: "/portfolio"`
- Always verify Ruby version: `ruby -v` should show 3.3.0
- Gemfile uses Jekyll 4.3 for local (compatible with Ruby 3.3)
- GitHub Pages uses older Jekyll but works fine in production
