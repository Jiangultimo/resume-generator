# Interactive Resume

[中文文档](./README.zh-CN.md)

A modern, interactive online resume platform built with Next.js. Showcase your professional profile with an AI-powered chat assistant that answers questions about your experience through simple TOML configuration files.

[![Live Demo](https://img.shields.io/badge/preview-online-brightgreen)](https://hi.sparkify.me)

## Features

- **AI Chat Assistant**: Built-in ChatBot to answer questions about your resume and experience
- **Data-Driven**: All resume content configured through TOML files - no code changes needed
- **Bilingual Support**: Built-in Chinese/English switching with separate configuration files
- **Modern UI**: Beautiful glassmorphism design with smooth animations
- **Project Preview**: Integrated with [Microlink](https://microlink.io/) for rich link previews
- **Responsive Design**: Looks great on desktop and mobile devices
- **Server-Side Rendering**: Optimized for performance and SEO

### Development Features

The following features are available in local development environment only:

- **Avatar Upload**: Click to upload your avatar image
- **PDF Export**: One-click export your resume to PDF using Puppeteer

## Quick Start

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Configure Environment Variables

Create a `.env.development` file in the root directory:

```bash
# AI Chat Configuration
OPENROUTER_API_KEY="your-openrouter-api-key"
OPENROUTER_MODEL="openai/gpt-4o-mini"
SITE_URL="http://localhost:3000"
```

Get your OpenRouter API key from [OpenRouter](https://openrouter.ai/keys).

### 3. Configure Your Resume

```bash
# Create Chinese resume config
cp config/resume.example.toml config/resume.toml

# Create English resume config (optional)
cp config/resume.example.toml config/en-resume.toml
```

Edit the TOML files in `config/` directory with your information.

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to preview your resume.

## Configuration

### Resume Structure

Edit the TOML files in `config/` directory:

- `resume.toml` - Chinese version
- `en-resume.toml` - English version

```toml
[resume]
title = "My Resume"

# Personal information with custom icons
# Icons: https://lucide.dev/icons/
intros = [
    { label = "Name", value = "Your Name", icon = "User" },
    { label = "Email", value = "email@example.com", icon = "Mail", link = "mailto:email@example.com" },
    { label = "GitHub", value = "username", icon = "Github", link = "https://github.com/username" },
]

[resume.skills]
title = "Skills"
data = [
    "Skill 1: Description",
    "Skill 2: Description",
]

[resume.experience]
title = "Work Experience"

[[resume.experience.data]]
company = "Company Name"
position = "Job Title"
time = "2020 - Present"
labels = ["React", "TypeScript", "Node.js"]
projects = [
    { content = "Project description with {links.0}", links = [{ name = "Demo", url = "https://example.com" }] },
]
```

### Project Links with Preview

Use Microlink integration to show rich previews for your project links:

```toml
projects = [
    { content = "Built a web app - {links.0}", links = [{ name = "View Project", url = "https://your-project.com" }] }
]
```

When users hover over the link, they'll see a preview card with the page's title, description, and thumbnail.

## AI Chat Assistant

The AI chat assistant helps visitors learn more about your experience through natural conversation.

**Features:**
- Contextual answers based on your resume content
- Automatically generates relevant follow-up questions
- Bilingual support (English and Chinese)
- Real-time streaming responses
- Fullscreen mode for longer conversations

**How it works:**
The AI reads your resume data from TOML files and responds to questions based only on your actual resume content.

## PDF Export

PDF export uses Puppeteer for high-quality rendering. This feature is only available in development mode.

### System Requirements (Linux)

If running on Linux, install these dependencies for Puppeteer:

```bash
sudo apt-get install gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

For more details, see this [Puppeteer issue](https://github.com/puppeteer/puppeteer/issues/3443#issuecomment-433096772).

## Tech Stack

### Core
- **Framework**: [Next.js](https://nextjs.org/) 16 (App Router)
- **Runtime**: React 19 with Server Components
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 4

### UI & Interaction
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide Icons](https://lucide.dev/)

### AI & Content
- **AI Provider**: [OpenRouter](https://openrouter.ai/)
- **Markdown Rendering**: [react-markdown](https://github.com/remarkjs/react-markdown)
- **Configuration**: [TOML](https://toml.io/) via [@ltd/j-toml](https://github.com/LongTengDao/j-toml)

### Features
- **Link Previews**: [Microlink](https://microlink.io/)
- **PDF Generation**: [Puppeteer](https://pptr.dev/) (dev only)

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Deployment

### Environment Variables for Production

Create a `.env.production` file:

```bash
OPENROUTER_API_KEY="your-api-key-here"
OPENROUTER_MODEL="openai/gpt-4o-mini"
SITE_URL="https://your-domain.com"
```

## License

[MIT](./LICENSE)

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.
