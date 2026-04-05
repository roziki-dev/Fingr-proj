# 🦾 FINGR // Hand-AR Interface

**FINGR** is an interactive, browser-based Augmented Reality (AR) web application powered by **Next.js** and **Google MediaPipe**. Step into a TRON-inspired cybernetic environment, where your real hand movements manipulate beautiful, responsive neon digital entities directly on your screen.

🌐 **[Experience the Live Interface Here: https://fingr-proj.vercel.app/](https://fingr-proj.vercel.app/)**

![Fingr AR Preview](https://img.shields.io/badge/Status-Online-00f3ff?style=for-the-badge)

---

## ⚡ Interactive Mechanics

The system translates your physical gestures into visual AR manipulation using real-time machine learning via your webcam. 

### 1. **Neon Fish Spawning** *(Gesture: Pinch)*
Pinch your thumb and index finger together to birth artificial "Neon Fishes" into the canvas.
- **Flocking AI**: Fishes use Newtonian physics and specialized *boids* algorithms to chase the nearest detected hand while systematically avoiding colliding with each other (Separation & Attraction).
- **Smooth Interpolation**: Movement and rotational turning is rendered with continuous linear interpolation (Lerp) for buttery 60fps frame animations.
- **Maximum Limit**: The simulation organically caps at 20 entities to prevent engine performance degradation.

### 2. **Singularity/Black Hole** *(Gesture: Pointing Index Finger)*
Fully extend your index finger while completely clenching the rest of your fingers toward your palm to command a Black Hole. (Requires maximum of 20 fishes on screen).
- **Hold to Charge**: The mechanic features an intuitive "Hold" buffer. Aim your finger rigidly for exactly **2 seconds** to watch the destructive aura collect energy in a glowing loading ring.
- **Safe Cancel**: Flinch or lower your finger during the charge phase to safely dissipate the anomaly.
- **Devour**: Once the neon loading ring connects at 100%, the singularity opens, activating massive spatial gravity that violently sucks in and annihilates all Neon Fishes from the screen.

---

## 💻 Technical Architecture

Built aggressively to optimize performance and browser-level stability:
- **Core Framework**: Modern **Next.js App Router** implementation with deeply separated Server & Client Component orchestration.
- **AI Hand Tracking**: Utilizing `@mediapipe/tasks-vision`'s WebAssembly graph for accurate, rotation-independent real-world landmark estimation.
- **Performance Optimized**: The heavy AI WASM payload is injected fully asynchronously using strictly `next/dynamic` without Server Side Rendering (`ssr: false`). It lazy-loads entirely in the background while a futuristic TRON loading screen distracts the user. 
- **Security & Privacy First**: Implements rigorous React unmount boundaries to kill the device `MediaStream` tracks instantly upon exit, guaranteeing the webcam hardware shuts off automatically.
- **TRON UI**: Visual layers built with standard **Tailwind CSS**. A responsive parallax 3D floor constructed via deep multi-tiered mouse position tracking matrices and DOM transforms on the home page.

---

## ⚙️ Running Locally

1. Clone this repository to your local machine.
2. Install the necessary packages:
   ```bash
   npm install
   ```
3. Initialize the development environment:
   ```bash
   npm run dev
   ```
4. Access the portal at `http://localhost:3000`.

---
*Created by Muhammad Sokhib Roziki.*
