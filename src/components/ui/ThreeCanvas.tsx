"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 48);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    const innerGeometry = new THREE.IcosahedronGeometry(14, 2);
    const innerWireframe = new THREE.WireframeGeometry(innerGeometry);
    const innerMaterial = new THREE.LineBasicMaterial({
      color: 0x3fc7b0,
      transparent: true,
      opacity: 0.22,
    });
    const innerMesh = new THREE.LineSegments(innerWireframe, innerMaterial);
    mainGroup.add(innerMesh);

    const outerGeometry = new THREE.IcosahedronGeometry(18, 1);
    const outerWireframe = new THREE.WireframeGeometry(outerGeometry);
    const outerMaterial = new THREE.LineBasicMaterial({
      color: 0x3fc7b0,
      transparent: true,
      opacity: 0.08,
    });
    const outerMesh = new THREE.LineSegments(outerWireframe, outerMaterial);
    mainGroup.add(outerMesh);

    const ringGeometry = new THREE.RingGeometry(21, 21.3, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x3fc7b0,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 3;
    mainGroup.add(ringMesh);

    const nodeCount = innerGeometry.attributes.position.count;
    const nodeGeometry = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(nodeCount * 3);
    const posAttr = innerGeometry.attributes.position;

    for (let i = 0; i < nodeCount; i++) {
      nodePositions[i * 3] = posAttr.getX(i);
      nodePositions[i * 3 + 1] = posAttr.getY(i);
      nodePositions[i * 3 + 2] = posAttr.getZ(i);
    }

    nodeGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(nodePositions, 3)
    );

    const nodeMaterial = new THREE.PointsMaterial({
      color: 0x3fc7b0,
      size: 1.2,
      transparent: true,
      opacity: 0.6,
    });

    const nodePoints = new THREE.Points(nodeGeometry, nodeMaterial);
    mainGroup.add(nodePoints);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (event.clientX / innerWidth - 0.5) * 2;
      mouseY = (event.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      innerMesh.rotation.x += 0.0012;
      innerMesh.rotation.y += 0.0016;

      nodePoints.rotation.x = innerMesh.rotation.x;
      nodePoints.rotation.y = innerMesh.rotation.y;

      outerMesh.rotation.x -= 0.0008;
      outerMesh.rotation.y -= 0.001;

      ringMesh.rotation.z += 0.0006;

      targetX += (mouseX - targetX) * 0.03;
      targetY += (mouseY - targetY) * 0.03;

      mainGroup.rotation.y = targetX * 0.4;
      mainGroup.rotation.x = -targetY * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      innerGeometry.dispose();
      innerWireframe.dispose();
      innerMaterial.dispose();
      outerGeometry.dispose();
      outerWireframe.dispose();
      outerMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden opacity-65"
      aria-hidden="true"
    />
  );
}
