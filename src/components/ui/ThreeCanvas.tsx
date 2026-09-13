"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getWidth = () => window.innerWidth;
    const getHeight = () => container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0e1113, 0.012);

    const camera = new THREE.PerspectiveCamera(
      48,
      getWidth() / getHeight(),
      0.1,
      1000
    );
    camera.position.set(0, 0, 70);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(getWidth(), getHeight(), false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const canvas = renderer.domElement;
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.pointerEvents = "none";
    container.appendChild(canvas);

    const createGlowTexture = () => {
      const texCanvas = document.createElement("canvas");
      texCanvas.width = 64;
      texCanvas.height = 64;
      const ctx = texCanvas.getContext("2d");
      if (!ctx) return null;

      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(94, 234, 212, 1)");
      gradient.addColorStop(0.25, "rgba(63, 199, 176, 0.75)");
      gradient.addColorStop(0.6, "rgba(63, 199, 176, 0.15)");
      gradient.addColorStop(1, "rgba(14, 17, 19, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);

      const texture = new THREE.CanvasTexture(texCanvas);
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      return texture;
    };

    const glowTexture = createGlowTexture();

    const tealR = 0.247;
    const tealG = 0.78;
    const tealB = 0.69;

    const cyanR = 0.368;
    const cyanG = 0.917;
    const cyanB = 0.831;

    const waveCount = 9;
    const segmentsPerWave = 120;
    const spanX = 145;

    type WaveConfig = {
      line: THREE.Line;
      geometry: THREE.BufferGeometry;
      baseY: number;
      baseZ: number;
      freq1: number;
      freq2: number;
      amp1: number;
      amp2: number;
      speed: number;
      phase: number;
    };

    const waves: WaveConfig[] = [];
    const waveGroup = new THREE.Group();
    scene.add(waveGroup);

    for (let w = 0; w < waveCount; w++) {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array((segmentsPerWave + 1) * 3);
      const col = new Float32Array((segmentsPerWave + 1) * 3);

      const normW = w / (waveCount - 1);
      const mix = Math.sin(normW * Math.PI);

      for (let i = 0; i <= segmentsPerWave; i++) {
        const u = i / segmentsPerWave;
        const x = (u - 0.5) * spanX;
        pos[i * 3] = x;
        pos[i * 3 + 1] = 0;
        pos[i * 3 + 2] = 0;

        const edgeFade = Math.pow(Math.sin(u * Math.PI), 1.6);
        const r = (tealR * (1 - normW * 0.4) + cyanR * (normW * 0.4)) * edgeFade;
        const g = (tealG * (1 - normW * 0.3) + cyanG * (normW * 0.3)) * edgeFade;
        const b = (tealB * (1 - normW * 0.3) + cyanB * (normW * 0.3)) * edgeFade;

        col[i * 3] = r;
        col[i * 3 + 1] = g;
        col[i * 3 + 2] = b;
      }

      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(col, 3));

      const mat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.22 + mix * 0.12,
        blending: THREE.AdditiveBlending,
      });

      const line = new THREE.Line(geo, mat);
      waveGroup.add(line);

      waves.push({
        line,
        geometry: geo,
        baseY: (normW - 0.5) * 28,
        baseZ: (normW - 0.5) * 22,
        freq1: 0.028 + (w % 3) * 0.008,
        freq2: 0.048 + (w % 4) * 0.006,
        amp1: 5.5 + (w % 3) * 1.8,
        amp2: 2.8 + (w % 2) * 1.4,
        speed: 0.06 + (w % 5) * 0.015,
        phase: w * 0.72,
      });
    }

    const tokenCount = 75;
    const tokenPositions = new Float32Array(tokenCount * 3);
    const tokenColors = new Float32Array(tokenCount * 3);

    type WaveToken = {
      waveIndex: number;
      u: number;
      speed: number;
    };

    const tokens: WaveToken[] = [];

    for (let t = 0; t < tokenCount; t++) {
      const waveIndex = Math.floor(Math.random() * waveCount);
      const u = Math.random();
      const speed = 0.0003 + Math.random() * 0.0006;
      tokens.push({ waveIndex, u, speed });

      tokenPositions[t * 3] = (u - 0.5) * spanX;
      tokenPositions[t * 3 + 1] = 0;
      tokenPositions[t * 3 + 2] = 0;

      const isAccent = Math.random() > 0.65;
      tokenColors[t * 3] = isAccent ? cyanR : tealR;
      tokenColors[t * 3 + 1] = isAccent ? cyanG : tealG;
      tokenColors[t * 3 + 2] = isAccent ? cyanB : tealB;
    }

    const tokenGeometry = new THREE.BufferGeometry();
    tokenGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(tokenPositions, 3)
    );
    tokenGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(tokenColors, 3)
    );

    const tokenMaterial = new THREE.PointsMaterial({
      size: 3.2,
      map: glowTexture ?? undefined,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const tokenPoints = new THREE.Points(tokenGeometry, tokenMaterial);
    scene.add(tokenPoints);

    const ambientCount = 350;
    const ambientPos = new Float32Array(ambientCount * 3);
    const ambientColors = new Float32Array(ambientCount * 3);
    const ambientVelocities: { x: number; y: number; z: number }[] = [];

    for (let a = 0; a < ambientCount; a++) {
      ambientPos[a * 3] = (Math.random() - 0.5) * spanX * 1.1;
      ambientPos[a * 3 + 1] = (Math.random() - 0.5) * 55;
      ambientPos[a * 3 + 2] = (Math.random() - 0.5) * 45;

      ambientColors[a * 3] = tealR;
      ambientColors[a * 3 + 1] = tealG;
      ambientColors[a * 3 + 2] = tealB;

      ambientVelocities.push({
        x: (Math.random() - 0.5) * 0.012,
        y: (Math.random() - 0.5) * 0.008,
        z: (Math.random() - 0.5) * 0.008,
      });
    }

    const ambientGeo = new THREE.BufferGeometry();
    ambientGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(ambientPos, 3)
    );
    ambientGeo.setAttribute(
      "color",
      new THREE.BufferAttribute(ambientColors, 3)
    );

    const ambientMat = new THREE.PointsMaterial({
      size: 2.2,
      map: glowTexture ?? undefined,
      vertexColors: true,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const ambientPoints = new THREE.Points(ambientGeo, ambientMat);
    scene.add(ambientPoints);

    let mouseX = 0;
    let mouseY = 0;
    let targetCamX = 0;
    let targetCamY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX / innerWidth - 0.5) * 2;
      mouseY = (e.clientY / innerHeight - 0.5) * 2;
    };

    const handleResize = () => {
      const width = getWidth();
      const height = getHeight();
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);

    let animId: number;
    let clock = 0;

    const getWaveElevation = (
      cfg: WaveConfig,
      x: number,
      timeVal: number
    ) => {
      const primary =
        Math.sin(x * cfg.freq1 + timeVal * cfg.speed + cfg.phase) * cfg.amp1;
      const secondary =
        Math.cos(x * cfg.freq2 - timeVal * (cfg.speed * 0.6) + cfg.phase * 1.3) *
        cfg.amp2;
      return primary + secondary;
    };

    const animate = () => {
      animId = requestAnimationFrame(animate);
      clock += 0.0035;

      for (let w = 0; w < waveCount; w++) {
        const cfg = waves[w];
        const pArray = cfg.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i <= segmentsPerWave; i++) {
          const u = i / segmentsPerWave;
          const x = (u - 0.5) * spanX;
          const y = cfg.baseY + getWaveElevation(cfg, x, clock);
          const z =
            cfg.baseZ +
            Math.sin(x * 0.018 + clock * (cfg.speed * 0.7) + cfg.phase) * 4.5;

          pArray[i * 3] = x;
          pArray[i * 3 + 1] = y;
          pArray[i * 3 + 2] = z;
        }

        cfg.geometry.attributes.position.needsUpdate = true;
      }

      const tPos = tokenGeometry.attributes.position.array as Float32Array;
      for (let t = 0; t < tokenCount; t++) {
        const tok = tokens[t];
        tok.u += tok.speed;
        if (tok.u > 1) {
          tok.u = 0;
          tok.waveIndex = Math.floor(Math.random() * waveCount);
        }

        const cfg = waves[tok.waveIndex];
        const x = (tok.u - 0.5) * spanX;
        const y = cfg.baseY + getWaveElevation(cfg, x, clock);
        const z =
          cfg.baseZ +
          Math.sin(x * 0.018 + clock * (cfg.speed * 0.7) + cfg.phase) * 4.5;

        tPos[t * 3] = x;
        tPos[t * 3 + 1] = y;
        tPos[t * 3 + 2] = z;
      }
      tokenGeometry.attributes.position.needsUpdate = true;

      const aPos = ambientGeo.attributes.position.array as Float32Array;
      for (let a = 0; a < ambientCount; a++) {
        const vel = ambientVelocities[a];
        aPos[a * 3] += vel.x;
        aPos[a * 3 + 1] += vel.y;
        aPos[a * 3 + 2] += vel.z;

        if (aPos[a * 3] > (spanX * 1.1) / 2)
          aPos[a * 3] = (-spanX * 1.1) / 2;
        if (aPos[a * 3] < (-spanX * 1.1) / 2)
          aPos[a * 3] = (spanX * 1.1) / 2;

        if (aPos[a * 3 + 1] > 28) aPos[a * 3 + 1] = -28;
        if (aPos[a * 3 + 1] < -28) aPos[a * 3 + 1] = 28;

        if (aPos[a * 3 + 2] > 22) aPos[a * 3 + 2] = -22;
        if (aPos[a * 3 + 2] < -22) aPos[a * 3 + 2] = 22;
      }
      ambientGeo.attributes.position.needsUpdate = true;

      targetCamX += (mouseX * 5 - targetCamX) * 0.02;
      targetCamY += (-mouseY * 3.5 - targetCamY) * 0.02;

      camera.position.x = targetCamX;
      camera.position.y = targetCamY;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }

      waves.forEach((w) => {
        w.geometry.dispose();
        (w.line.material as THREE.Material).dispose();
      });

      tokenGeometry.dispose();
      tokenMaterial.dispose();
      ambientGeo.dispose();
      ambientMat.dispose();
      if (glowTexture) glowTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden"
      aria-hidden="true"
    />
  );
}
