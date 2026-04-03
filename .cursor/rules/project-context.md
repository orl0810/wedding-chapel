# 🧠 Project Context – Wedding Officiant Landing (Angular)

## 🎯 Project Goal
Create a premium, high-converting wedding officiant landing page using Angular (standalone components), focused on performance, SEO, and a luxury user experience.

The product must feel:
- Elegant
- Minimalist
- Emotional
- High-end

---

## 🎨 Design Philosophy – "Modern Serenity"

### Visual Direction
- Soft cream backgrounds
- Mutted gold accents
- Deep sapphire blue for contrast
- Generous whitespace
- Subtle animations (fade, scale, slide)

### Typography
- Headings → Serif (Playfair Display style)
- Body → Sans-serif (clean, readable)

### UX Principles
- Mobile-first
- Smooth scrolling
- Clear CTAs
- Emotional storytelling

---

## 🏗️ Architecture Rules

### Angular
- Use **standalone components only**
- NO NgModules
- Use **Signals over RxJS where possible**
- Avoid `async` pipe (prefer signals or manual subscription)
- Use **feature-based structure**

### Folder Structure

wedding-officiant-app/
├── angular.json                     # Angular CLI configuration (SSR/prerender setup)
├── package.json
├── tailwind.config.js               # Tailwind CSS configuration
├── tsconfig.json
├── src/
│   ├── main.ts                      # Entry point for browser
│   ├── main.server.ts               # Entry point for server-side rendering
│   ├── index.html                   # Main HTML template
│   ├── styles.scss                  # Global SCSS for custom styles & variables
│   ├── assets/
│   │   ├── i18n/
│   │   │   ├── en.json              # English translations
│   │   │   └── es.json              # Spanish translations
│   │   └── images/                  # Backgrounds, officiant photos, etc.
│   └── app/
│       ├── app.config.ts            # Application-wide configuration (providers, routes)
│       ├── app.component.ts         # Root component
│       ├── app.routes.ts            # Main routing configuration
│       ├── core/                    # Core services, interfaces, guards
│       │   ├── services/
│       │   │   ├── i18n.service.ts      # Internationalization service
│       │   │   ├── seo.service.ts       # SEO meta tags & structured data service
│       │   │   └── scroll.service.ts    # Smooth scrolling navigation
│       │   └── interfaces/
│       │       ├── package.interface.ts
│       │       ├── testimonial.interface.ts
│       │       └── form.interface.ts
│       ├── shared/                  # Reusable UI components, pipes, directives
│       │   ├── components/
│       │   │   ├── button/button.component.ts
│       │   │   ├── language-switcher/language-switcher.component.ts
│       │   │   ├── section-title/section-title.component.ts
│       │   │   ├── social-links/social-links.component.ts
│       │   │   └── whatsapp-button/whatsapp-button.component.ts
│       │   └── pipes/
│       │       └── translate/translate.pipe.ts
│       └── features/                # Feature-specific modules/components
│           └── landing/             # Single-page landing feature
│               ├── landing.component.ts # Composes all sections
│               ├── components/
│               │   ├── hero-section/hero-section.component.ts
│               │   ├── about-section/about-section.component.ts
│               │   ├── packages-section/packages-section.component.ts
│               │   ├── testimonials-section/testimonials-section.component.ts
│               │   ├── contact-booking-section/contact-booking-section.component.ts
│               │   └── footer-section/footer-section.component.ts
│               └── landing.data.ts    # Static data for landing page sections


---

## ⚡ Performance & SEO

- Use **SSR + prerendering**
- Optimize Core Web Vitals
- Use semantic HTML
- Implement dynamic meta tags (SEO service)
- Include JSON-LD structured data (LocalBusiness)

---

## 🌍 Internationalization (i18n)

- JSON-based translations (`/assets/i18n`)
- Languages:
  - English (default)
  - Spanish
- Custom i18n service using Signals

---

## 🧩 Key Features

### Landing Sections
- Hero (strong emotional headline)
- About (trust + personal story)
- Packages (clear pricing tiers)
- Testimonials (social proof)
- Contact & Booking (conversion focus)
- Footer (contact + social)

---

## 💰 Conversion Strategy

- Clear CTA: "Book Your Ceremony"
- WhatsApp floating button
- Simple forms (Reactive Forms)
- Trust signals:
  - Testimonials
  - Personal branding
  - Bilingual value

---

## 🧠 Code Guidelines

### Components
- Small, reusable, isolated
- No business logic in templates
- Strong typing

### Styling
- TailwindCSS
- SCSS for custom styles
- Avoid inline styles

### Animations
- Subtle only
- Use CSS or Tailwind animations
- Never overdo

---

## 🚫 Avoid

- Overengineering
- Heavy RxJS when not needed
- Complex state management (keep it simple)
- UI clutter
- Generic-looking layouts

---

## 🧱 Future Scalability

Prepare for:
- Blog feature (`/blog`)
- CMS integration
- Dynamic prerender routes
- Multi-language SEO

---

## 🧠 Mental Model

This is NOT just a website.

It is:
→ A **luxury digital experience**
→ A **conversion machine**
→ A **personal brand platform**

Every decision must support:
- Emotion
- Trust
- Simplicity
- Performance