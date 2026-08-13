# Avatar Tutorial — Photo → Cartoon → 3D Model → Portfolio

A step-by-step guide to create the 3D avatar used in this portfolio, starting from a normal photo of yourself. The pipeline is:

**Your photo → stylized cartoon image (ChatGPT) → 3D `.glb` model (image-to-3D tool) → drop into this project → build with `prompt.md`.**

---

## Step 1 — Turn your photo into a stylized cartoon

**Goal:** a clean, front-facing, full-body cartoon/3D-render of yourself. This becomes the reference image for the 3D generator.

1. Take (or pick) a clear photo of yourself — good lighting, face visible, ideally standing.
2. Open **ChatGPT or Claude** (a model with image generation) and upload the photo.
3. Paste this prompt (edit the outfit to match what you want):

```text
Create a high-quality full-body 3D stylized cartoon character based on the uploaded reference photo. Preserve the person's facial identity, hairstyle, beard, eyebrows, skin tone, nose shape, lips, ears, and overall resemblance. Transform the face into a cute Pixar/Disney-inspired style with slightly oversized expressive brown eyes, smooth skin, and a friendly smile while keeping the person instantly recognizable.

Dress the character in a bright lime-green hoodie with drawstrings, dark blue slim-fit jeans, and navy-blue sneakers with white soles and laces. Show the character standing in a relaxed pose with both hands inside the hoodie pocket.

Use realistic fabric textures, soft global illumination, subtle ambient occlusion, and cinematic studio lighting. Render the entire body from head to toe, centered, facing forward, against a clean white seamless background with a soft floor shadow.

Style: premium Pixar/Disney-quality 3D character, highly detailed, ultra-clean render, vibrant colors, smooth shading, symmetrical composition, adorable proportions with a slightly larger head (about 1:5 body ratio), photorealistic materials, 8K, ultra-sharp, professional character desig
```

**Tips for a 3D-friendly result:**
- **Full body, head-to-toe** in frame (the generator needs the whole character).
- **Front-facing, A-pose or T-pose** (arms away from the torso so limbs separate cleanly).
- **Plain background** (light gray or white) — no props, no shadows on the floor.
- Ask for **"no cropping, centered, full body visible"** if it cuts off the feet.
- Generate a few variations and keep the cleanest one. Download it as PNG.

---

## Step 2 — Convert the cartoon image into a 3D `.glb`

Use an **image-to-3D** generator. Any of these work and export `.glb`:

| Tool | URL | Notes |
|------|-----|-------|
USE - https://3d.hunyuanglobal.com/ ( Free )

Steps (Meshy/Tripo are the same idea):

1. Create an account and choose **Image to 3D**.
2. Upload your **Step 1** cartoon image.
3. Pick settings: **quality = high**, enable **PBR / textures**. If offered a **T-pose / A-pose** or **symmetry** option, enable it.
4. Generate, then **preview and refine** (regenerate if a limb or the face looks off).
5. (Optional) Use the tool's **auto-rig** if you want animation later — not required for this portfolio.
6. **Download as `.glb`** (GLB = binary glTF, textures embedded).

> Aim for a model that faces **+Z (toward the viewer)**, is **Y-up**, and is roughly centered.

---

## Step 3 — Optimize the `.glb` (recommended)

Raw exports can be 20–80 MB. This project loads the avatar with **Draco compression**, so shrink it first (target **< 2–3 MB**):

```bash
# Compress with Draco + convert textures to WebP (no install needed)
npx @gltf-transform/cli optimize input.glb avatar.glb --compress draco --texture-compress webp
```

Check the result in a viewer like <https://gltf-viewer.donmccurdy.com> before continuing. If it looks broken, try `--compress meshopt` instead of `draco`, or skip compression (the loader also reads uncompressed GLB).

---

## Step 4 — Add the model to this project

1. Put your file at **`public/models/avatar.glb`** (replace the existing one). Git LFS already tracks `*.glb` here.
2. The loader lives in [src/components/Character/utils/character.ts](src/components/Character/utils/character.ts). It loads `"/models/avatar.glb"` and applies:

   ```ts
   const AVATAR_MODEL = "/models/avatar.glb";
   // ...
   model.scale.setScalar(1.6);        // ← resize your model
   model.position.set(0, -0.9, 0);    // ← move it down/up + left/right
   ```

   Tweak `scale` and `position` so the avatar sits nicely in the hero.
3. Frame it with the camera in [src/components/Character/Scene.tsx](src/components/Character/Scene.tsx):

   ```ts
   const camera = new THREE.PerspectiveCamera(30, aspect, 0.1, 100);
   camera.position.set(0, 0.15, mobile ? 4.3 : 4.8); // ← dolly in/out (z)
   camera.lookAt(0, 0.25, 0);                          // ← aim point
   ```

**Quick tuning guide:**
- Avatar too small/large → change `model.scale.setScalar(...)`.
- Head cut off / floating → adjust the `y` in `model.position.set(0, y, 0)`.
- Too close/far → change the camera `z` (`4.8`).
- Framed too high/low → change `camera.lookAt(0, y, 0)`.

---

## Step 5 — Run and fine-tune

```bash
npm install
npm run dev      # http://localhost:5173
```

Edit the scale/position/camera values, save, and the hot reload shows the result instantly. Repeat until the avatar is framed the way you want.

> Note: eye-tracking, blinking, and idle motion are driven by the code in `Character/utils/` and work with any humanoid model that has a head/eyes. If your model has no separate eye meshes, those effects simply no-op — the avatar still renders and idles.

---

## Step 6 — Build the rest of the site

Use [prompt.md](prompt.md) — the full build prompt — to generate or customize the rest of the portfolio (sections, styling, animations). Then swap in your own text via the placeholders (`Your Name`, `you@example.com`, etc.) as described in the [README](README.md).

---

## Recap

1. Photo → **ChatGPT** cartoon prompt → stylized full-body image.
2. Image → **Meshy / Tripo** → download `.glb`.
3. **Optimize** with `gltf-transform` (Draco).
4. Drop into `public/models/avatar.glb` and tune **scale / position / camera**.
5. `npm run dev` to fine-tune.
6. Finish the site with **`prompt.md`**.
