import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';

export type CharacterMode = 'hero' | 'about' | 'internship-typing' | 'work' | 'techstack' | 'contact';
export type LightingMood = 'lavender' | 'midnight' | 'sunset';

export interface ThreeWorldCanvasRef {
  triggerWave: () => void;
  setMood: (mood: LightingMood) => void;
  resetView: () => void;
  setMode: (mode: CharacterMode) => void;
}

interface ThreeWorldCanvasProps {
  initialMood?: LightingMood;
  onInteract?: (type: string) => void;
}

export const ThreeWorldCanvas = forwardRef<ThreeWorldCanvasRef, ThreeWorldCanvasProps>(
  ({ initialMood = 'lavender', onInteract }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [currentMood, setCurrentMood] = useState<LightingMood>(initialMood);
    const [statusBadge, setStatusBadge] = useState<string>('3D Scene Active • Tracking Cursor');
    const [isWaving, setIsWaving] = useState(false);

    // Refs for animation loop
    const moodRef = useRef<LightingMood>(initialMood);
    const waveTriggerRef = useRef<number>(0);
    const scrollProgressRef = useRef<number>(0);
    const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
      x: 0.5,
      y: 0.5,
      targetX: 0.5,
      targetY: 0.5,
    });

    useImperativeHandle(ref, () => ({
      triggerWave: () => {
        waveTriggerRef.current = performance.now();
        setIsWaving(true);
        setStatusBadge('✨ Ameena is waving to you!');
        if (onInteract) onInteract('wave');
        setTimeout(() => {
          setIsWaving(false);
          setStatusBadge('3D Scene Active • Tracking Cursor');
        }, 2400);
      },
      setMood: (mood: LightingMood) => {
        moodRef.current = mood;
        setCurrentMood(mood);
        setStatusBadge(`Lighting: ${mood.toUpperCase()} MOOD`);
        if (onInteract) onInteract(`mood-${mood}`);
        setTimeout(() => setStatusBadge('3D Scene Active • Tracking Cursor'), 2000);
      },
      resetView: () => {
        mouseRef.current.targetX = 0.5;
        mouseRef.current.targetY = 0.5;
        setStatusBadge('Gaze & Perspective Centered');
        setTimeout(() => setStatusBadge('3D Scene Active • Tracking Cursor'), 1500);
      },
      setMode: (mode: CharacterMode) => {
        // Dynamic mode override
      },
    }));

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      // 1. Scene, Camera, Renderer
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x07070b, 0.035);

      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
      camera.position.set(0, 0.1, 6.2);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      container.appendChild(renderer.domElement);

      // 2. Lighting System with Mood Palettes
      const moodPalettes = {
        lavender: {
          key: new THREE.Color(0xe9d5ff),
          fill: new THREE.Color(0x818cf8),
          rim: new THREE.Color(0xa855f7),
          rimPink: new THREE.Color(0xf472b6),
          ambient: new THREE.Color(0x130e26),
          orb: new THREE.Color(0xd8b4fe),
        },
        midnight: {
          key: new THREE.Color(0x7dd3fc),
          fill: new THREE.Color(0x0284c7),
          rim: new THREE.Color(0x38bdf8),
          rimPink: new THREE.Color(0x818cf8),
          ambient: new THREE.Color(0x071529),
          orb: new THREE.Color(0x38bdf8),
        },
        sunset: {
          key: new THREE.Color(0xfef08a),
          fill: new THREE.Color(0xf97316),
          rim: new THREE.Color(0xf43f5e),
          rimPink: new THREE.Color(0xd946ef),
          ambient: new THREE.Color(0x280b26),
          orb: new THREE.Color(0xfb7185),
        },
      };

      const ambientLight = new THREE.AmbientLight(moodPalettes.lavender.ambient, 1.8);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(moodPalettes.lavender.key, 2.2);
      keyLight.position.set(2.5, 3.5, 4.0);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(moodPalettes.lavender.fill, 1.4);
      fillLight.position.set(-3.5, -0.5, 2.5);
      scene.add(fillLight);

      const rimLightPurple = new THREE.DirectionalLight(moodPalettes.lavender.rim, 3.8);
      rimLightPurple.position.set(-3.0, 2.5, -2.5);
      scene.add(rimLightPurple);

      const rimLightPink = new THREE.DirectionalLight(moodPalettes.lavender.rimPink, 3.0);
      rimLightPink.position.set(3.0, 1.8, -2.0);
      scene.add(rimLightPink);

      // 3. Floating Glowing Lavender Orb (Iconic from reference image)
      const orbGeometry = new THREE.SphereGeometry(0.32, 32, 32);
      const orbMaterial = new THREE.MeshStandardMaterial({
        color: moodPalettes.lavender.orb,
        emissive: moodPalettes.lavender.orb,
        emissiveIntensity: 0.85,
        roughness: 0.15,
        metalness: 0.1,
      });
      const glowingOrb = new THREE.Mesh(orbGeometry, orbMaterial);
      glowingOrb.position.set(2.2, 1.35, -0.5);
      scene.add(glowingOrb);

      // Orb Point Light
      const orbLight = new THREE.PointLight(moodPalettes.lavender.orb, 2.4, 4.5);
      orbLight.position.copy(glowingOrb.position);
      scene.add(orbLight);

      // 4. Floating Cosmic Dust Particles
      const particleCount = 240;
      const particleGeometry = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);
      const particleColors = new Float32Array(particleCount * 3);

      const colorPalette = [
        new THREE.Color(0xd8b4fe), // Lavender
        new THREE.Color(0xa855f7), // Purple
        new THREE.Color(0xf472b6), // Soft Pink
        new THREE.Color(0xffffff), // White
      ];

      for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3] = (Math.random() - 0.5) * 14;
        particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;

        const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        particleColors[i * 3] = c.r;
        particleColors[i * 3 + 1] = c.g;
        particleColors[i * 3 + 2] = c.b;
      }

      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.045,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
      });
      const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particleSystem);

      // 5. Floating 3D UI/UX Design Elements (Hero & Space Parallax)
      const uiGroup = new THREE.Group();
      scene.add(uiGroup);

      // Element A: 3D Wireframe Card
      const wireframeCardGeo = new THREE.PlaneGeometry(1.2, 0.75, 12, 8);
      const wireframeCardMat = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
      const wireframeCard = new THREE.Mesh(wireframeCardGeo, wireframeCardMat);
      wireframeCard.position.set(-2.5, 0.8, -0.8);
      wireframeCard.rotation.set(0.1, 0.3, -0.05);
      uiGroup.add(wireframeCard);

      // Element B: 3D Figma Frame outline with auto-layout tag
      const figmaFrameGeo = new THREE.BoxGeometry(0.9, 0.6, 0.04);
      const figmaFrameMat = new THREE.MeshStandardMaterial({
        color: 0x1f1f3d,
        emissive: 0x6366f1,
        emissiveIntensity: 0.2,
        roughness: 0.3,
        metalness: 0.8,
      });
      const figmaFrame = new THREE.Mesh(figmaFrameGeo, figmaFrameMat);
      figmaFrame.position.set(2.4, -0.6, -0.6);
      figmaFrame.rotation.set(-0.15, -0.25, 0.08);
      uiGroup.add(figmaFrame);

      // Element C: 3D Color Palette Swatch (Floating 4 Color Pills)
      const swatchGroup = new THREE.Group();
      swatchGroup.position.set(-2.4, -1.0, -0.4);
      swatchGroup.rotation.set(0.15, 0.35, -0.1);
      const swatchColors = [0xd8b4fe, 0xa855f7, 0xf472b6, 0x1e1b4b];
      swatchColors.forEach((col, idx) => {
        const pillGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.3, 16);
        const pillMat = new THREE.MeshStandardMaterial({
          color: col,
          emissive: col,
          emissiveIntensity: 0.3,
          roughness: 0.2,
          metalness: 0.5,
        });
        const pill = new THREE.Mesh(pillGeo, pillMat);
        pill.rotation.z = Math.PI / 2;
        pill.position.x = (idx - 1.5) * 0.22;
        swatchGroup.add(pill);
      });
      uiGroup.add(swatchGroup);

      // Element D: Floating Glass Ring
      const ringGeo = new THREE.TorusGeometry(0.4, 0.025, 16, 64);
      const ringMat = new THREE.MeshPhysicalMaterial({
        color: 0xd8b4fe,
        emissive: 0x8b5cf6,
        emissiveIntensity: 0.25,
        roughness: 0.1,
        transmission: 0.9,
        thickness: 0.4,
      });
      const glassRing = new THREE.Mesh(ringGeo, ringMat);
      glassRing.position.set(1.9, 0.5, -0.7);
      glassRing.rotation.set(0.8, 0.4, 0.2);
      uiGroup.add(glassRing);

      // 6. Workstation Setup (For My Internships Section)
      const workstationGroup = new THREE.Group();
      workstationGroup.position.set(1.5, -1.2, -0.2);
      workstationGroup.scale.set(0, 0, 0); // Initially hidden, appears on scroll
      scene.add(workstationGroup);

      // Desk Top
      const deskTopGeo = new THREE.BoxGeometry(3.2, 0.1, 1.4);
      const deskMat = new THREE.MeshStandardMaterial({
        color: 0x131326,
        roughness: 0.4,
        metalness: 0.3,
      });
      const deskTop = new THREE.Mesh(deskTopGeo, deskMat);
      workstationGroup.add(deskTop);

      // Desk Underglow Strip (Soft Purple LED)
      const ledGeo = new THREE.BoxGeometry(3.1, 0.02, 0.04);
      const ledMat = new THREE.MeshBasicMaterial({
        color: 0xa855f7,
      });
      const deskLed = new THREE.Mesh(ledGeo, ledMat);
      deskLed.position.set(0, -0.05, 0.68);
      workstationGroup.add(deskLed);

      // Ultrawide Curved Monitor
      const monitorBezelGeo = new THREE.BoxGeometry(1.6, 0.9, 0.04);
      const monitorBezelMat = new THREE.MeshStandardMaterial({
        color: 0x080811,
        roughness: 0.2,
        metalness: 0.9,
      });
      const monitor = new THREE.Mesh(monitorBezelGeo, monitorBezelMat);
      monitor.position.set(0, 0.65, -0.2);
      workstationGroup.add(monitor);

      // Figma Screen Glow on Monitor
      const screenGeo = new THREE.PlaneGeometry(1.52, 0.82);
      const screenMat = new THREE.MeshBasicMaterial({
        color: 0x7c3aed,
        transparent: true,
        opacity: 0.85,
      });
      const monitorScreen = new THREE.Mesh(screenGeo, screenMat);
      monitorScreen.position.set(0, 0.65, -0.175);
      workstationGroup.add(monitorScreen);

      // Monitor Stand
      const standPoleGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.35, 16);
      const standMat = new THREE.MeshStandardMaterial({ color: 0x22223b, metalness: 0.8, roughness: 0.2 });
      const standPole = new THREE.Mesh(standPoleGeo, standMat);
      standPole.position.set(0, 0.18, -0.2);
      workstationGroup.add(standPole);

      // Laptop
      const laptopBaseGeo = new THREE.BoxGeometry(0.7, 0.02, 0.48);
      const laptopMat = new THREE.MeshStandardMaterial({ color: 0x1f1f33, metalness: 0.7, roughness: 0.3 });
      const laptopBase = new THREE.Mesh(laptopBaseGeo, laptopMat);
      laptopBase.position.set(-0.85, 0.06, 0.2);
      workstationGroup.add(laptopBase);

      const laptopScreenGeo = new THREE.BoxGeometry(0.7, 0.44, 0.02);
      const laptopScreen = new THREE.Mesh(laptopScreenGeo, laptopMat);
      laptopScreen.position.set(-0.85, 0.28, -0.04);
      laptopScreen.rotation.x = -0.18;
      workstationGroup.add(laptopScreen);

      // Keyboard & Mouse
      const keyboardGeo = new THREE.BoxGeometry(0.75, 0.02, 0.24);
      const keyboard = new THREE.Mesh(keyboardGeo, laptopMat);
      keyboard.position.set(0.1, 0.06, 0.28);
      workstationGroup.add(keyboard);

      const mouseGeo = new THREE.BoxGeometry(0.1, 0.03, 0.16);
      const mouseMesh = new THREE.Mesh(mouseGeo, laptopMat);
      mouseMesh.position.set(0.65, 0.06, 0.28);
      workstationGroup.add(mouseMesh);

      // 7. MAIN 3D CHARACTER AVATAR (Ameena Sherin)
      const textureLoader = new THREE.TextureLoader();
      const characterGroup = new THREE.Group();
      characterGroup.position.set(0, -0.15, 0.1);
      scene.add(characterGroup);

      // Load Ameena Sherin transparent cutout
      let characterMesh: THREE.Mesh | null = null;
      let eyeMeshLeft: THREE.Mesh | null = null;
      let eyeMeshRight: THREE.Mesh | null = null;

      textureLoader.load(
        '/ameena_character_hq.png',
        (charTexture) => {
          charTexture.colorSpace = THREE.SRGBColorSpace;
          charTexture.minFilter = THREE.LinearFilter;
          charTexture.magFilter = THREE.LinearFilter;

          const aspect = 875 / 1024;
          const charHeight = 3.65;
          const charWidth = charHeight * aspect;

          const charGeo = new THREE.PlaneGeometry(charWidth, charHeight, 16, 16);

          // Custom Material with Rim Lighting & Edge Softening
          const charMat = new THREE.MeshStandardMaterial({
            map: charTexture,
            transparent: true,
            alphaTest: 0.02,
            roughness: 0.35,
            metalness: 0.1,
          });

          characterMesh = new THREE.Mesh(charGeo, charMat);
          characterMesh.position.set(0, 0, 0);
          characterGroup.add(characterMesh);

          // Subtle Eye Tracking Pupils (Layered behind/with face)
          // Expressive brown iris centers
          const irisGeo = new THREE.CircleGeometry(0.045, 16);
          const irisMat = new THREE.MeshBasicMaterial({
            color: 0x3d1d11,
            transparent: true,
            opacity: 0.85,
          });

          // Left pupil (viewer left)
          eyeMeshLeft = new THREE.Mesh(irisGeo, irisMat);
          eyeMeshLeft.position.set(-0.16, 0.86, 0.015);
          characterGroup.add(eyeMeshLeft);

          // Right pupil (viewer right)
          eyeMeshRight = new THREE.Mesh(irisGeo, irisMat);
          eyeMeshRight.position.set(0.24, 0.85, 0.015);
          characterGroup.add(eyeMeshRight);
        },
        undefined,
        (err) => {
          console.warn('Fallback character texture loading', err);
        }
      );

      // 8. Mouse Movement Listener (Cursor Parallax & Eye Tracking)
      const handleMouseMove = (e: MouseEvent) => {
        mouseRef.current.targetX = e.clientX / window.innerWidth;
        mouseRef.current.targetY = e.clientY / window.innerHeight;
      };
      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      // 9. Scroll Progress Listener (One Continuous Story Transition)
      const handleScroll = () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
        scrollProgressRef.current = Math.min(Math.max(progress, 0), 1);
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();

      // 10. Window Resize Listener
      const handleResize = () => {
        if (!container) return;
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', handleResize);

      // 11. Render Loop: Physics, Blinking, Breathing, Scroll Story Transitions
      let animationFrameId: number;
      let lastTime = performance.now();
      let nextBlinkTime = performance.now() + 3000;
      let isBlinkingNow = false;
      let blinkStartTime = 0;

      const animate = (time: number) => {
        animationFrameId = requestAnimationFrame(animate);

        const delta = Math.min((time - lastTime) / 1000, 0.1);
        lastTime = time;

        // Smooth Mouse Lerp
        const mouse = mouseRef.current;
        mouse.x += (mouse.targetX - mouse.x) * 0.06;
        mouse.y += (mouse.targetY - mouse.y) * 0.06;

        const scrollProgress = scrollProgressRef.current;
        const mood = moodPalettes[moodRef.current];

        // Smooth Lighting Mood Transition
        keyLight.color.lerp(mood.key, 0.05);
        fillLight.color.lerp(mood.fill, 0.05);
        rimLightPurple.color.lerp(mood.rim, 0.05);
        rimLightPink.color.lerp(mood.rimPink, 0.05);
        orbMaterial.color.lerp(mood.orb, 0.05);
        orbMaterial.emissive.lerp(mood.orb, 0.05);
        orbLight.color.lerp(mood.orb, 0.05);

        // Blinking Logic (Natural periodic blinking)
        if (time > nextBlinkTime && !isBlinkingNow) {
          isBlinkingNow = true;
          blinkStartTime = time;
          nextBlinkTime = time + 3200 + Math.random() * 2600;
        }

        let eyeScaleY = 1.0;
        if (isBlinkingNow) {
          const blinkElapsed = time - blinkStartTime;
          if (blinkElapsed < 160) {
            // Eyelid closes and opens
            const phase = Math.sin((blinkElapsed / 160) * Math.PI);
            eyeScaleY = Math.max(0.08, 1.0 - phase * 0.92);
          } else {
            isBlinkingNow = false;
          }
        }

        // Breathing & Idle Physics
        const breathingOffset = Math.sin(time * 0.0022) * 0.035;
        const breathingScale = 1.0 + Math.sin(time * 0.0022) * 0.006;

        // Waving Gesture Trigger
        const isWavingActive = time - waveTriggerRef.current < 2200;
        const waveAngle = isWavingActive ? Math.sin((time - waveTriggerRef.current) * 0.015) * 0.12 : 0;

        // --- SCROLL STORY STAGES ---
        // Stage 1: Hero (0.0 to 0.15) - Center standing
        // Stage 2: About (0.15 to 0.32) - Moves to right side
        // Stage 3: Internships (0.32 to 0.52) - Workstation appears, character sits & types
        // Stage 4: Work / Tech Stack (0.52 to 0.80) - Orbiting objects
        // Stage 5: Contact / Thank You (0.80 to 1.0) - Leaves workstation, steps to center-front, friendly gesture

        let targetCharX = 0;
        let targetCharY = -0.15;
        let targetCharZ = 0.1;
        let targetCharRotY = (mouse.x - 0.5) * 0.28;
        let targetCharRotX = -(mouse.y - 0.5) * 0.14 + waveAngle;
        let targetCharScale = 1.0;

        let targetWorkstationScale = 0;
        let targetCamY = 0.1;
        let targetCamZ = 6.2;

        if (scrollProgress < 0.16) {
          // HERO: Center stage, breathing, tracking cursor
          targetCharX = 0;
          targetCharY = -0.15 + breathingOffset;
          targetCharScale = 1.0;
          targetWorkstationScale = 0;
          targetCamZ = 6.2;
        } else if (scrollProgress < 0.34) {
          // ABOUT ME: Moves smoothly to right side of screen, camera follows
          const p = (scrollProgress - 0.16) / 0.18;
          targetCharX = THREE.MathUtils.lerp(0, 1.65, p);
          targetCharY = THREE.MathUtils.lerp(-0.15, -0.05, p) + breathingOffset;
          targetCharScale = THREE.MathUtils.lerp(1.0, 0.92, p);
          targetCharRotY = THREE.MathUtils.lerp((mouse.x - 0.5) * 0.28, -0.25 + (mouse.x - 0.5) * 0.15, p);
          targetWorkstationScale = 0;
          targetCamZ = 6.0;
        } else if (scrollProgress < 0.54) {
          // MY INTERNSHIPS: Workstation appears, character sits and types
          const p = (scrollProgress - 0.34) / 0.2;
          targetCharX = THREE.MathUtils.lerp(1.65, 1.35, p);
          targetCharY = THREE.MathUtils.lerp(-0.05, -0.45, p) + breathingOffset * 0.5;
          targetCharScale = THREE.MathUtils.lerp(0.92, 0.85, p);
          targetCharRotY = -0.35 + (mouse.x - 0.5) * 0.1;
          targetWorkstationScale = THREE.MathUtils.lerp(0.2, 0.95, p);
          targetCamY = -0.2;
          targetCamZ = 5.8;

          // Typing micro-motion
          targetCharY += Math.sin(time * 0.012) * 0.008;
        } else if (scrollProgress < 0.82) {
          // MY WORK & TECH STACK: Workstation recedes into background depth
          targetCharX = 1.6;
          targetCharY = -0.7;
          targetCharScale = 0.72;
          targetWorkstationScale = 0.75;
          targetCamY = 0;
          targetCamZ = 6.4;
        } else {
          // CONTACT & THANK YOU: Character steps forward to center, warm greeting
          const p = (scrollProgress - 0.82) / 0.18;
          targetCharX = THREE.MathUtils.lerp(1.6, 0, p);
          targetCharY = THREE.MathUtils.lerp(-0.7, -0.1, p) + breathingOffset;
          targetCharScale = THREE.MathUtils.lerp(0.72, 1.05, p);
          targetCharRotY = (mouse.x - 0.5) * 0.22;
          targetWorkstationScale = THREE.MathUtils.lerp(0.75, 0, p);
          targetCamZ = 6.0;
        }

        // Apply Character Group Transforms with smooth spring damping
        characterGroup.position.x += (targetCharX - characterGroup.position.x) * 0.08;
        characterGroup.position.y += (targetCharY - characterGroup.position.y) * 0.08;
        characterGroup.position.z += (targetCharZ - characterGroup.position.z) * 0.08;
        characterGroup.rotation.y += (targetCharRotY - characterGroup.rotation.y) * 0.08;
        characterGroup.rotation.x += (targetCharRotX - characterGroup.rotation.x) * 0.08;
        characterGroup.scale.set(
          targetCharScale,
          targetCharScale * breathingScale,
          targetCharScale
        );

        // Workstation Group Transforms
        workstationGroup.scale.lerp(
          new THREE.Vector3(targetWorkstationScale, targetWorkstationScale, targetWorkstationScale),
          0.08
        );

        // Camera Smooth Lerp
        camera.position.y += (targetCamY - camera.position.y) * 0.05;
        camera.position.z += (targetCamZ - camera.position.z) * 0.05;

        // Eye Tracking Shift (Pupils track visitor's cursor within anatomical bounds)
        if (eyeMeshLeft && eyeMeshRight) {
          const eyeLookX = (mouse.x - 0.5) * 0.035;
          const eyeLookY = -(mouse.y - 0.5) * 0.025;

          eyeMeshLeft.position.x = -0.16 + eyeLookX;
          eyeMeshLeft.position.y = 0.86 + eyeLookY;
          eyeMeshLeft.scale.set(1.0, eyeScaleY, 1.0);

          eyeMeshRight.position.x = 0.24 + eyeLookX;
          eyeMeshRight.position.y = 0.85 + eyeLookY;
          eyeMeshRight.scale.set(1.0, eyeScaleY, 1.0);
        }

        // Floating Glowing Orb Animation (Levitation bob)
        glowingOrb.position.y = 1.35 + Math.sin(time * 0.0018) * 0.12;
        glowingOrb.position.x = 2.2 + (mouse.x - 0.5) * 0.4;
        orbLight.position.copy(glowingOrb.position);

        // Particle System Drift & Rotation
        particleSystem.rotation.y = time * 0.00015;
        particleSystem.rotation.x = time * 0.00008;

        // UI Floating Elements Gentle Sway
        uiGroup.position.y = Math.sin(time * 0.0014) * 0.08;
        uiGroup.rotation.y = (mouse.x - 0.5) * 0.12;
        wireframeCard.rotation.z = -0.05 + Math.sin(time * 0.0012) * 0.05;
        figmaFrame.rotation.y = -0.25 + Math.cos(time * 0.0015) * 0.06;
        glassRing.rotation.x += 0.003;
        glassRing.rotation.y += 0.004;

        renderer.render(scene, camera);
      };

      animate(performance.now());

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    }, []);

    return (
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Three.js Canvas Container */}
        <div ref={containerRef} className="w-full h-full" />

        {/* Interactive Controls Overlay (Bottom Center of Hero) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-auto flex flex-wrap items-center justify-center gap-2 px-3 py-1.5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl shadow-xl">
          {/* Status Chip */}
          <span className="text-[11px] font-mono text-lavender-300/80 px-2 py-0.5 border-r border-white/10 hidden sm:inline">
            {statusBadge}
          </span>

          {/* Say Hi / Wave Button */}
          <button
            onClick={() => ref && 'current' in ref && ref.current?.triggerWave()}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-lavender-200 hover:text-white text-xs font-mono transition-all active:scale-95"
            title="Ameena waves to you"
          >
            <span>Wave 👋</span>
          </button>

          {/* Mood Selectors */}
          <div className="flex items-center gap-1 pl-1">
            <button
              onClick={() => ref && 'current' in ref && ref.current?.setMood('lavender')}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-mono transition-all ${
                currentMood === 'lavender'
                  ? 'bg-lavender-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Lavender
            </button>
            <button
              onClick={() => ref && 'current' in ref && ref.current?.setMood('midnight')}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-mono transition-all ${
                currentMood === 'midnight'
                  ? 'bg-sky-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Midnight
            </button>
            <button
              onClick={() => ref && 'current' in ref && ref.current?.setMood('sunset')}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-mono transition-all ${
                currentMood === 'sunset'
                  ? 'bg-rose-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sunset
            </button>
          </div>
        </div>
      </div>
    );
  }
);
