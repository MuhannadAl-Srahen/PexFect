# PexFect

**PexFect** is a modern frontend web application built with React, TanStack Router, TanStack Query, Tailwind CSS (v4), ShadCN UI, Zustand, Zod, and Supabase. It features an advanced theming system, modular routing, and efficient state and data management.

---

## Features

- **React 19** with TypeScript for type-safe development
- **TanStack Router** for declarative, nested routing
- **TanStack Query** for server state management and caching
- **Tailwind CSS v4** with custom theming and dark mode support
- **ShadCN UI** components for a polished, accessible UI
- **Zustand** for lightweight client-side state management
- **Supabase** as a backend and authentication provider
- AI feedback integration (planned) for user challenge submissions
- Modular project structure for scalability and maintainability

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed (preferred package manager and runtime)
- Node.js (optional, if using npm/yarn instead)

---

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/pexfect.git
   cd pexfect
   ```

2. Install dependencies with Bun:

   ```bash
   bun install
   ```

---

### Development

Run the development server with:

```bash
bun run dev
```

This will start Vite and open your app at `http://localhost:3000`.

---

### Build

To build the project for production:

```bash
bun run build
```

---

### Formatting and Linting

- Format all files using Biome:

  ```bash
  bun x biome format . --write
  ```

- Lint with Biome:

  ```bash
  bun x biome lint
  ```

---

## Project Structure

```
src/
 ┣ assets/           # Static assets (fonts, icons, images)
 ┣ components/       # Reusable UI components and primitives
 ┣ hooks/            # Custom React hooks
 ┣ layouts/          # Layout components (MainLayout, Navbar, Footer, etc...)
 ┣ lib/              # Utility functions, API clients (supabase, aiClient, queryClient, etc...)
 ┣ providers/        # React context providers (QueryProvider, ThemeProvider, etc...)
 ┣ routes/           # Route components organized by feature
 ┣ services/         # Domain-specific services and stores (auth, challenges, feedback, profile)
 ┣ types/            # TypeScript type declarations
 ┣ test/             # Tests (if applicable)
 ┣ main.tsx          # Entry point
 ┣ index.css         # Global CSS including Tailwind imports and variables
```

---

## Configuration

- **Theme management:** via `ThemeProvider` context wrapping your app
- **State management:** Zustand stores under `services/*/store.ts`
- **API calls:** handled in `services/*/api.ts` using Supabase client
- **Routing:** configured with TanStack Router in `routes/` and `routeTree.gen.ts`

---

## Tailwind CSS & Theming

- Tailwind CSS v4 configured with custom colors and dark mode in `index.css`
- Theme toggling supported via the `ThemeProvider` and `ModeToggle` UI component

---
