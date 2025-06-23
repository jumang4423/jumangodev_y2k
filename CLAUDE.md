# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `yarn dev` - Start development server (Vite)
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint (currently outputs placeholder message but ESLint is configured)

## Architecture Overview

This is a personal website/portfolio with Y2K-themed design built with React + TypeScript + Vite. The application features:

### Core Structure
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite with Hot Module Replacement
- **UI Library**: Chakra UI with custom Y2K theming
- **Routing**: React Router DOM for SPA navigation
- **Animation**: Framer Motion for UI transitions
- **Deployment**: Vercel with SPA routing configuration

### Key Features & Components
1. **AI Chat System** (`AIChat.tsx`) - Cohere AI integration with kawaii personality system
2. **Blog Platform** (`BlogList.tsx`, `MicroCMSBlog.tsx`) - MicroCMS-powered blog with markdown support
3. **Audio Player** (`AnimalesePlayer.js`) - Custom Animalese-style audio player
4. **Social Integration** - Music showcase, crypto wallet display, social links

### Data & Configuration
- **AI Personality**: System prompts and character data in `system.ts`
- **Styling**: CSS modules with Y2K aesthetic, custom Chakra UI theme
- **Content Management**: MicroCMS for blog posts and dynamic content
- **Static Assets**: Audio files, images, and videos in `public/`

### External Integrations
- **Cohere AI** for chatbot functionality
- **MicroCMS** for blog content management
- **SoundCloud** for music integration
- **Nostr/Ethereum** for crypto/social features
- **Japanese text processing** with wanakana library

## Development Notes

### Linting Setup
ESLint is configured (`.eslintrc.cjs`) with TypeScript and React plugins, but the lint script needs to be updated from the current placeholder.

### TypeScript Configuration
- `tsconfig.json` - Main app configuration
- `tsconfig.node.json` - Build tool configuration

### Styling Approach
- Chakra UI components with custom theming
- CSS modules for component-specific styles
- Y2K design aesthetic with retro elements

### Content Management
- Blog posts managed through MicroCMS API
- Dynamic content fetching with React hooks
- Markdown rendering for blog post content