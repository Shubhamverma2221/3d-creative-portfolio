# Build Prompt — 3D Creative Portfolio (Replica Spec)

Paste the prompt below into an AI coding assistant (GitHub Copilot, Claude, Cursor, etc.) to recreate this portfolio from scratch. It describes every section, interaction, and design decision so the result matches this template.

---

## The Prompt

Build a **creative, single-page developer portfolio** as a production-ready web app. It must feature a real-time **3D avatar**, a **physics-based interactive tech stack**, and **scroll-driven animations**, with a polished dark + emerald aesthetic. Follow this spec exactly.

### Tech stack
- **React 18 + TypeScript + Vite 5** (SPA, `index.html` entry, `src/main.tsx`).
- **Three.js** (`three` ~0.168) with **`three-stdlib`** (`GLTFLoader`, `DRACOLoader`) — used directly (not R3F) for the hero avatar.
- **React Three Fiber** (`@react-three/fiber`), **`@react-three/rapier`** (physics), **`@react-three/drei`**, **`@react-three/postprocessing`** (N8AO) — used for the tech-stack ball pit.
- **GSAP** with **ScrollTrigger** and **ScrollSmoother** (`@gsap/react` `useGSAP`) for smooth scrolling and section animations.
- **`react-fast-marquee`** for the loading marquee, **`react-icons`** for icons.
- Plain **CSS** per component (CSS custom properties, media queries, `env(safe-area-inset-*)`). No CSS framework.
- Deploy target: **Vercel**. Large 3D `.glb` models tracked with **Git LFS**.

### Design system
- Font: **Geist** (Google Fonts, full weight range).
- CSS variables on `:root`: `--accentColor: #10b981` (emerald), `--backgroundColor: #0a0f0d` (near-black), text color `#f0fdf4`.
- Aesthetic: dark background, glowing emerald accents, glass-morphism panels, subtle glows, generous negative space.
- `body { overflow: hidden }` — scrolling is driven by GSAP ScrollSmoother inside `#smooth-wrapper > #smooth-content`.
- Disable text selection globally; antialiased font smoothing; respect safe-area insets on mobile.

### Global behaviors
1. **Loading screen** (shows until the 3D model finishes downloading):
   - A logo monogram (e.g. initials), a mini **retro "pong/breakout" style animated loader** (a row of ~27 lines plus a bouncing ball drawn with CSS), and a **marquee** cycling short taglines ("A Creative Builder", "A Creative Engineer").
   - A **"Loading X%"** button whose fill is driven by the **real GLB download progress** (not a fake timer).
   - A **spotlight hover effect** that follows the cursor via `--mouse-x` / `--mouse-y` CSS vars.
   - On 100%, play an entrance FX (split-text reveal) and fade the loader out.
2. **Custom cursor**: a smoothly-trailing circle using `requestAnimationFrame` lerp (ease ≈ 0.12). Elements opt into behaviors with a `data-cursor` attribute: `data-cursor="disable"` hides/shrinks it over links/buttons; `data-cursor="icons"` snaps and expands it over the social-icon rail.
3. **Smooth scroll + parallax** via GSAP ScrollSmoother; section reveals and split-text headings animate on scroll with ScrollTrigger.
4. **Fully responsive**: desktop, tablet, and every phone size (iPhone SE → Galaxy S24 Ultra). Detect mobile/touch to reduce renderer pixel ratio and disable pointer-based effects.

### Sections (top to bottom)
1. **Navbar** — fixed; monogram logo (scrolls to top), an email link, and anchor links (ABOUT, WORK, CONTACT) with an animated hover-underline effect. Smooth-scrolls to sections on desktop.
2. **Landing / Hero** — full-viewport. Left: "Hello! I'm" + the **name typed out** with a blinking caret (typewriter effect). Center/right: the **3D avatar canvas**. Below: a rotating role label ("Builder" / "Engineer") and a pulsing CTA button that scrolls to the About section.
3. **About** — a short intro paragraph with an animated section title.
4. **WhatIDo** — two (or more) **flip/expand cards** (e.g. "DEVELOP" and "MANAGE") each with a description and a set of skill tags; animated dashed SVG borders and corner accents; tap-to-expand on touch.
5. **Career** — a vertical **timeline** with animated dot/line and role/company/date/description entries.
6. **Work** — a **horizontal-scroll gallery** pinned with ScrollTrigger: as the user scrolls vertically, project cards translate horizontally. A **scroll-progress bar** fills across the section. Each card shows an index, title, category, description, tech list, an optional external-link button, and a **media preview** (autoplaying muted video that can be tapped to unmute + show controls, or a fallback image).
7. **TechStack** — an interactive **3D physics "ball pit"** (React Three Fiber + Rapier): spheres textured with tech logos plus a few **canvas-generated circular textures** for AI tools; balls collide, respond to the pointer, and settle under gravity. Add N8AO ambient occlusion post-processing and an environment map for reflections.
8. **Contact** — email, social links (GitHub, LinkedIn, Instagram), a **Download Resume** button (links to `/resume.pdf`), and a "Built by / © year" credit.
9. **SocialIcons** — a fixed vertical rail of social icons with a magnetic hover effect, plus a vertical "RESUME" button.

### 3D avatar (hero) — implementation details
- Render with a raw Three.js `WebGLRenderer` ( `alpha: true`, `antialias: true`, `ACESFilmicToneMapping`, exposure 1 ). Cap `devicePixelRatio` (~1.2 desktop / 1.5 mobile).
- `PerspectiveCamera` FOV **30**, positioned ~`(0, 0.15, 4.8)` (closer on mobile), looking at ~`(0, 0.25, 0)`.
- Load a **Draco-compressed GLB** avatar (`/models/avatar.glb`) with `GLTFLoader` + `DRACOLoader` (decoder in `/public/draco/`). Report download progress to the loading screen.
- **Cel-shaded / toon** look; enable shadows on desktop only.
- **Idle animation** (subtle breathing/sway), a **blink system**, and **cursor-tracking eyes + head** (disabled on touch devices). Add a small **eyebrow-raise on hover**.
- **Lighting turns on** with a short delay after the model loads (staged reveal).
- Ship a lower-cost path for mobile (reduced pixel ratio, no shadows).

### Project structure
```
index.html
vite.config.ts
vercel.json                 # rewrite /resume -> /resume.pdf
src/
  main.tsx, App.tsx
  index.css                 # global styles + CSS variables
  context/LoadingProvider   # loading state
  components/
    Navbar, Landing, About, WhatIDo, Career, Work, WorkImage,
    TechStack, Contact, SocialIcons, Cursor, Loading, MainContainer
    Character/               # Scene.tsx + utils (character, lighting,
                             #   animations, mouse tracking, resize)
    styles/                  # one CSS file per component
    utils/                   # GsapScroll, splitText, initialFX
public/
  models/   # avatar.glb (Git LFS) + HDR environment
  draco/    # Draco decoder
  images/   # tech-stack logos + placeholder art
```

### Scripts & config
- `npm run dev` → `vite --host`; `npm run build` → `tsc -b && vite build`; `npm run lint` → ESLint; `npm run preview`.
- No backend, environment variables, or API keys required.
- Provide an MIT `LICENSE` and a `README.md`.

### Acceptance criteria
- `npm run build` passes with no TypeScript errors.
- The 3D avatar loads (with real progress), tracks the cursor, blinks, and idles.
- The Work section pins and scrolls horizontally with a working progress bar.
- The TechStack balls collide and react to the pointer.
- The custom cursor, smooth scroll, and section animations all work on desktop and degrade gracefully on mobile/touch.
- Fully responsive from ~320px wide up to ultrawide.

Use clean, typed, component-scoped code. Keep all personal content as easily-swappable placeholders (`Your Name`, `you@example.com`, `github.com/yourusername`, sample projects/career entries).
