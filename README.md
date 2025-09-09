# Glyph

An interactive particle-based glyph renderer built with Astro, React, and Three.js (via React Three Fiber). Upload an image and watch it transform into a dynamic, noise-driven point cloud rendered with custom GLSL shaders.

## Demo

<video src="public/demo.mp4" width="100%" controls muted playsinline></video>

## Features

- **Interactive upload**: Click “Use your image” to load your own `png/jpg/jpeg/webp` and render it as particles.
- **Custom shaders**: Vertex and fragment shaders control particle motion, size, and blending with **additive** glow.
- **Noise animation**: 2D simplex noise drives organic motion over time.
- **Live controls (Leva)**: Tune uniforms at runtime:
  - `uAmplitude`: displacement strength
  - `uBaseStability`: how strongly random offsets are constrained
  - `uSize`: particle size
  - `uSpeed`: animation speed
- **Responsive canvas** with pixel-ratio capping for performance.
- **Orbit controls**: Pan/zoom/rotate the camera.

## Tech Stack

- **Astro** for site scaffolding and build
- **React 19** + **React DOM**
- **React Three Fiber** + **@react-three/drei**
- **Three.js**
- **GLSL shaders** (via `vite-plugin-glsl`)
- **Zustand** for simple global state (uploaded image)
- **Tailwind (v4)** utilities + `tailwind-merge`
- **Leva** for UI controls
- TypeScript, ESLint, Prettier

## Getting Started

```sh
npm install
npm run dev
```

- App runs at `http://localhost:4321`
- Click “Use your image” to upload and render.
- Adjust parameters using the Leva control panel.

## Scripts

- `npm run dev` – Start local dev server
- `npm run build` – Build to `./dist/`
- `npm run preview` – Preview production build
- `npm run astro ...` – Run Astro CLI

## File Upload and Defaults

- Upload supported types: `image/png, image/jpeg, image/jpg, image/webp`
- All processing happens entirely in your browser. Your uploaded image is never sent to any server.
- Images remain on your device; reloading or closing the tab clears them.

## License

MIT License. See `LICENSE` for details.

Notes:

- On GitHub, GIFs always render; HTML `<video>` usually works but may not autoplay. If it doesn’t render, upload the video via a GitHub Release or Issue to get an “asset” URL and use that in `src`.
- Keep the video short (<10s) and small (<10MB) for fast loading.
