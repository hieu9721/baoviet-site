# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Single-page event landing site (React 18 + Vite + TypeScript), a rebuild of a static AngularJS/jQuery page for the Bảo Việt event "Lễ Vinh Danh Sao Hợp Lực Bán Chéo 2025". Comments and copy are in Vietnamese; keep that convention when editing.

## Commands

```bash
npm run dev      # Vite dev server on http://localhost:5173 (auto-opens browser)
npm run build    # tsc -b (typecheck) then vite build -> dist/
npm run preview  # serve the production build
```

There is no test runner, linter, or CI configured. `npm run build` is the only gate — it runs `tsc -b`, and `tsconfig.app.json` has `strict`, `noUnusedLocals`, and `noUnusedParameters` on, so unused imports/vars fail the build.

Import alias: `@/*` maps to `src/*` (defined in both `vite.config.ts` and `tsconfig.app.json`).

To deploy under a sub-path, change `base` in `vite.config.ts`.

## Core architecture: everything comes from one config file

The entire page — content, images, links, colors, fonts, layout, animations — is data in `src/config/site.config.ts`, typed by `src/types/content.ts`. **Components hard-code no copy, images, or URLs.** To change what the page shows, edit the config, not the components. `App.tsx` accepts an optional `config` prop so the whole site can be re-skinned for a different event by swapping the config object.

Render flow: `main.tsx` → `App.tsx` reads `{ seo, theme, hero, sections, footer, animation }` → renders `FixedBackground`, `Hero`, one `Section` per non-hidden entry in `sections[]`, then `Footer`.

### Three-tier styling (no CSS edits needed for content/skin changes)

Style resolves in cascading order, merged by `mergeStyle` (in `src/lib/style.ts`; `undefined` never overrides):

1. **Component defaults** — baked into each component's `.module.css`.
2. **`theme.defaults`** — per-element-type defaults (`title`, `paragraph`, `button`, `section`) applied site-wide. Delivered to every component via React context (`src/context/StyleDefaults.tsx` → `useStyleDefaults(key)`), so no prop drilling.
3. **Per-element `style` / `titleStyle` / etc.** in a section's config — overrides for one block.

`src/lib/style.ts` converts these typed style objects into inline CSS. Things that can't be expressed inline (hover scale, title underline, gradient text) are emitted as **CSS custom properties** (e.g. `--hover-scale`, `--underline-width`) that the `.module.css` pseudo-elements/`:hover` rules consume.

### How theme reaches CSS

`src/lib/theme.ts` `applyTheme()` pushes `theme.colors` / `theme.fonts` / widths into `:root` CSS variables (`--color-gold`, `--font-body`, `--content-max-width`, `--shutter-color`, …). `applySeo()` sets `document.title`, description/OG meta tags, and favicon at runtime. Both run in an `App` effect. So changing brand color or font = editing the config, not stylesheets.

### Responsive font scale

Font sizes are four `clamp()` tokens — `--fs-hero`, `--fs-body`, `--fs-title`, `--fs-button` — defined once in `src/styles/global.css`, interpolating between a 360px floor and the 700px Figma design width. Config styles reference `var(--fs-*)` rather than hard pixel sizes. To rescale type site-wide, edit those tokens, not individual styles.

## Sections and rendering

`Section.tsx` renders each `SectionConfig`: title → paragraphs (placement `afterTitle` or `afterMedia`) → media → buttons. Key config knobs:

- `layout: 'stack'` (default, vertical images) vs `'carousel'` (horizontal, scroll-snap based via `Carousel/`; JS only syncs pagination dots).
- `effect: 'shutter' | 'slide' | 'none'` — reveal-on-scroll wrappers (`ShutterReveal/` = 12-bar shutter, `Reveal/` = slide-in). Both use the shared `useInView` IntersectionObserver hook and respect `prefers-reduced-motion`. `animation` in the config controls `shutterBars`, `once`, and `shutterColor`.
- `hidden: true` removes a block without deleting its config; reorder blocks by moving array elements.
- `id` doubles as the anchor target for `scrollTo` actions.

### Actions

Interactive elements (`media[].action`, `buttons[]`, `media[].overlayButton`) carry an `Action` object executed by `src/lib/actions.ts` `runAction()`: `link`, `pdf`, `gdocsViewer` (opens PDF via Google Docs Viewer, needs an absolute URL), or `scrollTo` (smooth-scroll to a section `id`).

## Conventions & gotchas

- **Component pattern:** each component is a folder under `src/components/` with `X.tsx` + `X.module.css`; the `.tsx` reads config + `useStyleDefaults`, calls the matching `*StyleToCss` helper, and merges CSS-module classes with inline style.
- Text in config uses newlines for line breaks. `splitLines`/`preserveLineBreaks` (`'auto'` default) decide whether breaks are kept on wide screens or collapsed on narrow ones; indentation from template literals is trimmed.
- `preventWidow()` joins the last two words with a non-breaking space to avoid orphan words.
- `src/lib/dom.ts` `fetchPriorityAttr()` is a React-18 workaround for the lowercase `fetchpriority` attribute — remove it when upgrading to React 19.
- Assets live in `public/` (`images/baoviet/`, `fonts/`, `files/`) and are referenced by absolute path (`/images/...`); local Helvetica fonts are declared in `src/styles/fonts.css`.
- The `design/` reference folder and `.claude/` are gitignored.
