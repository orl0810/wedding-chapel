# Repository Guidelines

## Project Structure & Module Organization

This is an Angular standalone application with SSR and prerendered routes. Application code lives in `src/app/`: pages under `features/`, reusable UI under `shared/`, and services under `core/`. Locale entry points are in `src/app/pages/en` and `es`; keep `src/assets/i18n/en.json` and `es.json` synchronized. Global styles are in `src/styles.scss`; component styles stay beside their TypeScript and HTML. Static files belong in `public/`, application images in `src/assets/images/`, and build utilities in `scripts/`. Do not edit generated `dist/` or `dist-test/` content.

## Build, Test, and Development Commands

- `npm ci` installs the exact dependency versions from `package-lock.json`.
- `npm start` runs the development server at `http://localhost:4200/` with live reload.
- `npm run build` creates the production SSR/prerender build in `dist/wedding-chapel/` and then generates the sitemap.
- `npm run watch` rebuilds continuously using the development configuration.
- `npm test` runs Jasmine unit tests through Karma and Chrome.
- `npm run serve:ssr:wedding-chapel` serves an already-built SSR bundle.
- `npm run generate-brand-icons` regenerates favicon and sharing assets from `scripts/brand-icon-source.jpg`.

## Coding Style & Naming Conventions

Follow `.editorconfig`: UTF-8, two-space indentation, final newlines, and single quotes in TypeScript. Strict TypeScript and templates are enabled; avoid `any`, implicit returns, and unchecked bindings. Use Angular suffixes and kebab-case filenames, such as `booking.service.ts` and `button.component.ts`. Components should remain standalone. Prefer SCSS and existing Tailwind theme conventions. No lint script is configured, so treat a clean strict build as the baseline check.

## Testing Guidelines

Place tests beside their subjects using `*.spec.ts`. Use Jasmine and Angular `TestBed`; mock HTTP, routing, and external services. Add focused tests for new services, pipes, directives, and behavior-heavy components. No coverage threshold is enforced; run `npm test` and `npm run build` before opening a pull request.

## Commit & Pull Request Guidelines

Recent commits use short, lowercase, task-focused summaries (for example, `fixing small images`). Keep each commit scoped and write an imperative summary that identifies the change. Pull requests should explain the user-visible result, list validation performed, and link the relevant issue. Include before/after screenshots for UI changes and note updates affecting both languages, prerender routes, environment variables, or deployment.

## Security & Configuration

Keep Supabase credentials and other secrets in ignored `.env` files; never commit them. Preserve environment-specific values in `src/environments/`, and document any newly required variable without including its value.
