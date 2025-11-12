# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js-based online resume generator that allows users to create and display bilingual (Chinese/English) resumes through TOML configuration files. The application features smooth animations, responsive design, and dynamic language switching.

## Common Commands

```bash
# Development
npm run dev          # Start development server at http://localhost:3000
npm run build        # Build production bundle
npm run start        # Start production server
npm run lint         # Run ESLint

# Setup
npm install          # Install dependencies
cp config/resume.example.toml config/resume.toml    # Create Chinese resume config
cp config/resume.example.toml config/en-resume.toml # Create English resume config
```

## Architecture & Data Flow

### Configuration System
- Resume data is defined in TOML files under `config/`:
  - `resume.toml` → Chinese version
  - `en-resume.toml` → English version
- TOML files are parsed server-side by `utils/parse.ts` using `@ltd/j-toml`
- API route `/api/resume?lang=cn|en` serves the parsed resume data based on language parameter

### Internationalization (i18n)
- Two-layer i18n system:
  1. **UI translations**: Managed by `lib/i18n.ts` and `context/i18n.tsx`
     - Provides UI strings (buttons, labels, etc.)
     - Language preference stored in localStorage
     - Exposed via `useI18n()` hook
  2. **Resume content**: Language-specific TOML files
     - Loaded dynamically via API calls when language switches
- Language switching triggers:
  - 400ms delay for button animation
  - Data fetch with transition effect
  - 500ms delay before showing new content

### Component Structure
- **app/page.tsx**: Main resume page (client component)
  - Fetches resume data based on current language
  - Orchestrates layout and animations
  - Manages loading states and transitions
- **components/Intro.tsx**: Header section with avatar and personal info
- **components/Content.tsx**: Skills and evaluations display
- **components/Experience.tsx** → **Timeline.tsx**: Work experience timeline
- **context/i18n.tsx**: I18nProvider wraps entire app (in `app/layout.tsx`)
- **context/loading.ts**: LoadingContext for loading state management

### Type System
- Global types defined in `typings/resume.d.ts`
- Key interfaces:
  - `Resume`: Top-level resume structure
  - `Intro`: Personal information (dynamic key-value pairs)
  - `ExperienceObject`: Work experience with nested `Project` structure
  - `StringContent`: Generic content with title and data array

### Styling
- Tailwind CSS with JIT mode for atomic styles
- CSS Modules for component-specific styles (e.g., `Resume.module.css`)
- Custom Tailwind plugin defines `.resume-title` utility
- Framer Motion for animations and transitions
- CSS variables for theming (e.g., `var(--chart-2)`)

## Key Implementation Details

### TOML Configuration Format
The resume TOML structure follows this pattern:
```toml
[resume]
title = "..."
intros = [
    { name = "...", email = "...", github = "...", url = "..." }
]

[resume.skills]
title = "..."
data = ["skill1", "skill2"]

[resume.experience]
title = "..."
[[resume.experience.data]]
company = "..."
time = "..."
projects = [
    { content = "...", links = [{ name = "...", url = "..." }] }
]
```

### Content Links
- `links` in project content support template syntax: `{links.0}`, `{links.1}`
- The parser replaces these with actual URLs from the links array
- Handled by components in `components/ResumeLink/`

### Animation Timing
When changing language:
1. Button slides (400ms)
2. Content clears and shows loading
3. New data fetched from API
4. Transition effect applied (500ms)
5. New content rendered

### Path Aliases
- `@/*` maps to project root (configured in `tsconfig.json`)
- Use for all imports: `@/components/...`, `@/utils/...`, etc.

## Development Notes

### Adding New Resume Sections
1. Update `typings/resume.d.ts` to add type definition
2. Add section to TOML example files
3. Create corresponding component in `components/`
4. Import and use in `app/page.tsx`

### Modifying Translations
- Update `lib/i18n.ts` for UI strings
- Update TOML files for resume content
- Ensure both English and Chinese versions are updated

### Working with Animations
- All animations use Framer Motion
- Key props: `initial`, `animate`, `transition`, `whileHover`
- Stagger animations with `delay` in transition config
