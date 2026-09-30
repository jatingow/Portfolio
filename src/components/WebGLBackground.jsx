import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WebGLBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 18, 55);
    camera.lookAt(0, 0, 0);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return; // WebGL not supported, graceful fallback
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Grid Dimensions
    const cols = 55;
    const rows = 45;
    const count = cols * rows;
    const spacingX = 2.4;
    const spacingZ = 2.0;

    const positions = new Float32Array(count * 3);
    const basePositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // Color palette: deep cyan to electric violet & soft pearl
    const colorCyan = new THREE.Color("#38bdf8");
    const colorViolet = new THREE.Color("#818cf8");
    const colorPearl = new THREE.Color("#e2e8f0");

    let idx = 0;
    const offsetX = ((cols - 1) * spacingX) / 2;
    const offsetZ = ((rows - 1) * spacingZ) / 2;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * spacingX - offsetX;
        const y = 0;
        const z = j * spacingZ - offsetZ;

        positions[idx * 3] = x;
        positions[idx * 3 + 1] = y;
        positions[idx * 3 + 2] = z;

        basePositions[idx * 3] = x;
        basePositions[idx * 3 + 1] = y;
        basePositions[idx * 3 + 2] = z;

        // Gradient color based on radial distance from center
        const distFromCenter = Math.sqrt(x * x + z * z) / 60;
        const mixed = colorCyan.clone().lerp(colorViolet, Math.min(1, distFromCenter * 1.2));
        if (Math.random() > 0.85) {
          mixed.lerp(colorPearl, 0.4);
        }

        colors[idx * 3] = mixed.r;
        colors[idx * 3 + 1] = mixed.g;
        colors[idx * 3 + 2] = mixed.b;

        idx++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Custom circular point texture for soft luminous particles
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.3, "rgba(255, 255, 255, 0.7)");
    gradient.addColorStop(0.7, "rgba(255, 255, 255, 0.15)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 1.45,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Mouse Interaction with Smooth Lerp
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    };

    window.addEventListener("resize", handleResize);

    // Pause rendering when tab is hidden to save battery/GPU
    let isVisible = true;
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const elapsed = clock.getElapsedTime();
      const speed = prefersReducedMotion ? 0.05 : 0.65;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Subtle scene camera drift based on mouse
      camera.position.x = mouse.x * 6;
      camera.position.y = 18 + mouse.y * 3;
      camera.lookAt(0, 0, 0);

      // Undulate wave field
      const posAttr = geometry.attributes.position;
      const arr = posAttr.array;

      for (let k = 0; k < count; k++) {
        const bx = basePositions[k * 3];
        const bz = basePositions[k * 3 + 2];

        // Harmonic sine wave formulation
        const wave1 = Math.sin(bx * 0.08 + elapsed * speed) * 2.2;
        const wave2 = Math.cos(bz * 0.07 + elapsed * (speed * 0.9)) * 1.8;
        const wave3 = Math.sin((bx + bz) * 0.05 + elapsed * (speed * 1.1)) * 1.2;

        // Subtle interactive ripple near mouse
        const dx = bx - mouse.x * 35;
        const dz = bz - mouse.y * 25;
        const mouseDist = Math.sqrt(dx * dx + dz * dz);
        const mouseWave = mouseDist < 25 ? Math.cos(mouseDist * 0.25) * (1 - mouseDist / 25) * 3 : 0;

        arr[k * 3 + 1] = wave1 + wave2 + wave3 + mouseWave;
      }

      posAttr.needsUpdate = true;
      renderer.render(scene, camera);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);

      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.85,
        maskImage: "radial-gradient(ellipse 90% 85% at 50% 50%, #000 40%, transparent 95%)",
        WebkitMaskImage: "radial-gradient(ellipse 90% 85% at 50% 50%, #000 40%, transparent 95%)",
      }}
      aria-hidden="true"
    />
  );
}
