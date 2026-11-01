"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * ThreeBackground — Next-Gen Cyber-Infrastructure & Quantum Matrix
 * 
 * An advanced, bespoke 3D WebGL experience featuring:
 * 1. Undulating 3D Topographic Data Wave Grid (Dynamic digital infrastructure ocean)
 * 2. Floating Quantum Processor Core with gyroscopic holographic telemetry rings
 * 3. Prismatic Modular Microservice Nodes with pulsing activity beacons
 * 4. High-Speed Fiber Spline Conduits with animated luminous photon pulses
 * 5. Fluid inertial mouse parallax and responsive camera geometry
 */
export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      3000
    );
    const isMobile = window.innerWidth < 768;
    camera.position.set(0, 30, isMobile ? 540 : 400);

    // 2. WebGL Renderer with High-DPI & Alpha for Clean Porcelain White Background
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Master Group for Mouse Parallax Tilt
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Array to track dynamic components and disposals
    const disposables: { dispose: () => void }[] = [];
    const animatables: ((time: number) => void)[] = [];

    // --- SECTION A: Dynamic Undulating 3D Data Wave Grid (The Tech Foundation) ---
    const gridCols = isMobile ? 32 : 50;
    const gridRows = isMobile ? 32 : 50;
    const gridWidth = 900;
    const gridHeight = 900;
    const waveGeo = new THREE.PlaneGeometry(gridWidth, gridHeight, gridCols, gridRows);
    waveGeo.rotateX(-Math.PI / 2);
    waveGeo.translate(0, -110, 0);

    const posAttr = waveGeo.attributes.position;
    const initialY = new Float32Array(posAttr.count);
    for (let i = 0; i < posAttr.count; i++) {
      initialY[i] = posAttr.getY(i);
    }

    const waveMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const waveMesh = new THREE.Mesh(waveGeo, waveMat);
    masterGroup.add(waveMesh);

    disposables.push(waveGeo, waveMat);

    animatables.push((time: number) => {
      for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i);
        const z = posAttr.getZ(i);
        // Multi-frequency topological wave formula
        const y =
          Math.sin(x * 0.012 + time * 1.6) * Math.cos(z * 0.012 + time * 1.4) * 16 +
          Math.sin(z * 0.02 - time * 0.8) * 8;
        posAttr.setY(i, initialY[i] + y);
      }
      posAttr.needsUpdate = true;
    });

    // --- SECTION B: Holographic Quantum Core (Centerpiece Behind Content) ---
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 15, -70);
    masterGroup.add(coreGroup);

    // 1. Faceted Crystalline Octahedron Core
    const coreGeo = new THREE.OctahedronGeometry(48, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      transparent: true,
      opacity: 0.1,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    const coreEdgesGeo = new THREE.EdgesGeometry(coreGeo);
    const coreEdgesMat = new THREE.LineBasicMaterial({
      color: 0x1d4ed8,
      transparent: true,
      opacity: 0.65,
    });
    const coreEdges = new THREE.LineSegments(coreEdgesGeo, coreEdgesMat);
    coreGroup.add(coreEdges);

    // Glowing Vertex Points on Core
    const corePointsMat = new THREE.PointsMaterial({
      color: 0x06b6d4,
      size: 4.5,
      transparent: true,
      opacity: 0.85,
    });
    const corePoints = new THREE.Points(coreGeo, corePointsMat);
    coreGroup.add(corePoints);

    disposables.push(coreGeo, coreMat, coreEdgesGeo, coreEdgesMat, corePointsMat);

    // 2. Gyroscopic Concentric Orbiting Rings
    const ring1Geo = new THREE.TorusGeometry(85, 0.9, 16, 120);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.45,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(110, 0.75, 16, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.35,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    coreGroup.add(ring2);

    disposables.push(ring1Geo, ring1Mat, ring2Geo, ring2Mat);

    animatables.push((time: number) => {
      coreMesh.rotation.y = time * 0.25;
      coreMesh.rotation.x = time * 0.15;
      coreEdges.rotation.copy(coreMesh.rotation);
      corePoints.rotation.copy(coreMesh.rotation);

      ring1.rotation.z = time * 0.35;
      ring1.rotation.y = Math.PI / 3 + Math.sin(time * 0.4) * 0.25;

      ring2.rotation.x = time * -0.25;
      ring2.rotation.z = Math.PI / 4 + Math.cos(time * 0.35) * 0.25;

      coreGroup.position.y = 15 + Math.sin(time * 1.1) * 6;
    });

    // --- SECTION C: High-Tech Prismatic Satellite Nodes (Framing the Screen) ---
    const satelliteConfigs = [
      { x: isMobile ? -110 : -270, y: 110, z: -30, size: 36, color: 0x2563eb },
      { x: isMobile ? 110 : 275, y: 100, z: -40, size: 38, color: 0x06b6d4 },
      { x: isMobile ? -100 : -255, y: -80, z: 20, size: 34, color: 0x3b82f6 },
      { x: isMobile ? 100 : 260, y: -85, z: 30, size: 36, color: 0x10b981 },
      { x: isMobile ? 0 : -320, y: 10, z: 0, size: 28, color: 0x6366f1 },
      { x: isMobile ? 0 : 325, y: 5, z: -10, size: 28, color: 0x0284c7 },
    ];

    const splineCurves: THREE.CatmullRomCurve3[] = [];

    satelliteConfigs.forEach((cfg, idx) => {
      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(cfg.x, cfg.y, cfg.z);
      masterGroup.add(nodeGroup);

      // Chamfered Cube Chassis
      const boxGeo = new THREE.BoxGeometry(cfg.size, cfg.size * 0.7, cfg.size * 0.8);
      const boxMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.1,
      });
      const box = new THREE.Mesh(boxGeo, boxMat);
      nodeGroup.add(box);

      const edgesGeo = new THREE.EdgesGeometry(boxGeo);
      const edgesMat = new THREE.LineBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.7,
      });
      const edges = new THREE.LineSegments(edgesGeo, edgesMat);
      nodeGroup.add(edges);

      // Micro Activity Beacon LED
      const beaconGeo = new THREE.SphereGeometry(2.0, 10, 10);
      const beaconMat = new THREE.MeshBasicMaterial({ color: cfg.color });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.set(0, cfg.size * 0.35 + 2, 0);
      nodeGroup.add(beacon);

      disposables.push(boxGeo, boxMat, edgesGeo, edgesMat, beaconGeo, beaconMat);

      const initY = cfg.y;
      animatables.push((time: number) => {
        nodeGroup.position.y = initY + Math.sin(time * 1.4 + idx * 1.5) * 8;
        nodeGroup.rotation.y = time * 0.2 + idx;
        nodeGroup.rotation.x = Math.sin(time * 0.3 + idx) * 0.15;
      });

      // Spline Conduit connecting to central core
      const midPoint = new THREE.Vector3(
        cfg.x * 0.5,
        cfg.y * 0.5 + 20,
        cfg.z * 0.5 - 20
      );
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 15, -70),
        midPoint,
        new THREE.Vector3(cfg.x, cfg.y, cfg.z),
      ]);
      splineCurves.push(curve);

      const conduitGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(40));
      const conduitMat = new THREE.LineBasicMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.35,
      });
      const conduitLine = new THREE.Line(conduitGeo, conduitMat);
      masterGroup.add(conduitLine);

      disposables.push(conduitGeo, conduitMat);
    });

    // --- SECTION D: Animated Laser Photons Streaming Along Conduits ---
    const photonGeo = new THREE.SphereGeometry(2.8, 12, 12);
    const photonColors = [0x06b6d4, 0x3b82f6, 0x10b981, 0x60a5fa];

    splineCurves.forEach((curve, i) => {
      for (let p = 0; p < 2; p++) {
        const mat = new THREE.MeshBasicMaterial({
          color: photonColors[(i + p) % photonColors.length],
        });
        const photon = new THREE.Mesh(photonGeo, mat);
        masterGroup.add(photon);

        disposables.push(mat);

        const speed = 0.15 + (i % 3) * 0.05;
        const offset = p * 0.5 + i * 0.1;

        animatables.push((time: number) => {
          const t = (time * speed + offset) % 1.0;
          const pos = curve.getPoint(t);
          photon.position.copy(pos);
        });
      }
    });

    disposables.push(photonGeo);

    // --- SECTION E: Floating Data Stardust Particle Field ---
    const stardustCount = 180;
    const stardustPos = new Float32Array(stardustCount * 3);
    for (let i = 0; i < stardustCount * 3; i += 3) {
      stardustPos[i] = (Math.random() - 0.5) * 800;
      stardustPos[i + 1] = (Math.random() - 0.5) * 600;
      stardustPos[i + 2] = (Math.random() - 0.5) * 500;
    }
    const stardustGeo = new THREE.BufferGeometry();
    stardustGeo.setAttribute("position", new THREE.BufferAttribute(stardustPos, 3));
    const stardustMat = new THREE.PointsMaterial({
      color: 0x3b82f6,
      size: 2.4,
      transparent: true,
      opacity: 0.35,
    });
    const stardustPoints = new THREE.Points(stardustGeo, stardustMat);
    masterGroup.add(stardustPoints);

    disposables.push(stardustGeo, stardustMat);

    animatables.push((time: number) => {
      stardustPoints.rotation.y = time * 0.015;
    });

    // --- Lighting & Ambiance ---
    const ambLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambLight);

    const pointLight = new THREE.PointLight(0x3b82f6, 1.4, 1000);
    pointLight.position.set(150, 180, 280);
    scene.add(pointLight);

    // --- Mouse Parallax Tracking ---
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.0006;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.0006;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const isMob = window.innerWidth < 768;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.position.z = isMob ? 540 : 400;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // --- Animation Master Loop ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Fluid inertial camera / master group tilt
      targetRotY += (mouseX - targetRotY) * 0.04;
      targetRotX += (mouseY - targetRotX) * 0.04;

      masterGroup.rotation.y = Math.sin(elapsedTime * 0.15) * 0.06 + targetRotY * 1.4;
      masterGroup.rotation.x = 0.06 + Math.cos(elapsedTime * 0.12) * 0.04 + targetRotX * 1.0;

      // Update all registered dynamic elements
      animatables.forEach((fn) => fn(elapsedTime));

      renderer.render(scene, camera);
    };

    animate();

    // Clean resource disposal
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
