# Resume Generator

[中文文档](./README.zh-CN.md)

A data-driven online resume generator built with Next.js. Create beautiful, responsive resumes through simple TOML configuration files.

[![Live Demo](https://img.shields.io/badge/preview-online-brightgreen)](https://hi.sparkify.me)

## Features

- **Data-Driven**: All resume content is configured through TOML files - no code changes needed
- **Bilingual Support**: Built-in Chinese/English switching with separate configuration files
- **Project Preview**: Integrated with [Microlink](https://microlink.io/) for rich link previews of your projects
- **Responsive Design**: Looks great on desktop and mobile devices
- **Smooth Animations**: Powered by Framer Motion for delightful user experience

### Development Features

The following features are available in local development environment only:

- **Avatar Upload**: click to upload your avatar image
- **PDF Export**: One-click export your resume to PDF using Puppeteer

## Quick Start

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Configure Your Resume

```bash
# Create Chinese resume config
cp config/resume.example.toml config/resume.toml

# Create English resume config (optional)
cp config/resume.example.toml config/en-resume.toml
```

### 3. Run Development Server

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

## PDF Export

PDF export uses Puppeteer for high-quality rendering. This feature is only available in development mode.

### System Requirements (Linux)

If running on Linux, install these dependencies for Puppeteer:

```bash
sudo apt-get install gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

For more details, see this [Puppeteer issue](https://github.com/puppeteer/puppeteer/issues/3443#issuecomment-433096772).

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 16
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 4
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Configuration**: [TOML](https://toml.io/) via [@ltd/j-toml](https://github.com/nickyc975/j-toml)
- **Link Previews**: [Microlink](https://microlink.io/)
- **PDF Generation**: [Puppeteer](https://pptr.dev/)

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## License

[MIT](./LICENSE)
