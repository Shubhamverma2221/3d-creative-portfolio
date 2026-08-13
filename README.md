# 3D Creative Portfolio

An open-source, fully responsive portfolio template featuring a custom 3D avatar, physics-based interactions, and scroll-driven animations. Fork it, swap in your own details, and deploy.

**Live demo:** [shahrikin.vercel.app](https://shahrikin.vercel.app)

<img width="1902" height="1022" alt="3D Creative Portfolio preview" src="https://github.com/user-attachments/assets/2296dc44-162a-4aa2-92c7-7c83f0500003" />

## Features

- **3D Avatar** — Programmatic Three.js character with cel-shaded toon materials, idle animations, blink system, and cursor-tracking eyes (GLTF + Draco compression)
- **Physics-Based Tech Stack** — Interactive 3D spheres (React Three Fiber + Rapier physics) showcasing skills
- **Horizontal Scroll Work Section** — GSAP ScrollTrigger-driven horizontal gallery with inline video previews, progress bar, and native fullscreen
- **Scroll Animations** — Smooth section transitions, timeline career display, and parallax effects via GSAP
- **Fully Responsive** — Optimized for desktop, tablet, and all phone sizes (iPhone SE through Galaxy S24 Ultra)
- **Dark + Emerald Aesthetic** — Modern color scheme with glowing green accents and glass-morphism elements

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18, TypeScript, Vite |
| **3D & Animation** | Three.js, React Three Fiber, Rapier Physics, GSAP + ScrollTrigger |
| **Styling** | CSS (custom properties, media queries, safe-area-inset) |
| **Deployment** | Vercel, Git LFS (for .glb models) |

## Getting Started

```bash
# Clone the repo
git clone https://github.com/Rikinshah787/3d-creative-portfolio-AI.git
cd 3d-creative-portfolio-AI

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The site runs at `http://localhost:5173` by default. No environment variables or API keys are required.

## Project Structure

```
src/
  components/
    Landing.tsx          # Hero section with 3D avatar
    About.tsx            # About section
    WhatIDo.tsx          # "What I do" cards
    Work.tsx             # Horizontal scroll project gallery
    WorkImage.tsx        # Video/image preview with inline unmute
    Career.tsx           # Career timeline
    TechStack.tsx        # 3D physics ball pit
    Contact.tsx          # Contact + social links
    Character/           # 3D avatar (Scene, model loader, shaders)
    styles/              # Component CSS files
  index.css              # Global styles & CSS variables
public/
  images/                # Tech-stack logos & placeholder art
  models/                # 3D avatar (avatar.glb via Git LFS) + HDR
  draco/                 # Draco decoder for compressed GLTF
```

## Customizing for Your Own Portfolio

The template ships with placeholders (`Your Name`, `you@example.com`, `github.com/yourusername`, etc.) — search for them and swap in your own details.

1. **Name & meta:** Update the name in `Landing.tsx` and the page title in `index.html`
2. **Content:** Edit the project cards in `Work.tsx`, career entries in `Career.tsx`, and about text in `About.tsx`
3. **Contact & socials:** Update email and links in `Contact.tsx`, `Navbar.tsx`, and `SocialIcons.tsx`
4. **Resume:** Drop your `resume.pdf` into `public/` (the resume buttons link to `/resume.pdf`)
5. **3D Avatar:** Replace `public/models/avatar.glb` and adjust camera/lighting in `Character/Scene.tsx`
6. **Tech Stack Balls:** Update texture images in `public/images/` and the ball config in `TechStack.tsx`
7. **Colors:** Change `--accentColor` and `--backgroundColor` in `src/index.css`

## Scripts

```bash
npm run dev      # Start development server
npm run build    # TypeScript check + Vite production build
npm run lint     # ESLint
npm run preview  # Preview production build locally
```

## License

This project is open source and available under the [MIT License](LICENSE).
