import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';

export type LightingMood = 'cyber' | 'midnight' | 'sunset';

export interface ThreeHeroCanvasRef {
  triggerWave: () => void;
  setMood: (mood: LightingMood) => void;
  resetView: () => void;
}

interface ThreeHeroCanvasProps {
  initialMood?: LightingMood;
  onInteract?: (type: string) => void;
}

export const ThreeHeroCanvas = forwardRef<ThreeHeroCanvasRef, ThreeHeroCanvasProps>(
  ({ initialMood = 'cyber', onInteract }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [currentMood, setCurrentMood] = useState<LightingMood>(initialMood);
    const [interactiveStatus, setInteractiveStatus] = useState<string>('Ready • Tracking Cursor');
    const [isWavingState, setIsWavingState] = useState<boolean>(false);

    // Refs to connect React state to the Three.js render loop
    const moodRef = useRef<LightingMood>(initialMood);
    const waveTriggerRef = useRef<number>(0);
    const resetViewRef = useRef<number>(0);

    useImperativeHandle(ref, () => ({
      triggerWave: () => {
        waveTriggerRef.current = performance.now();
        setIsWavingState(true);
        setInteractiveStatus('✨ Ameena is waving to you!');
        if (onInteract) onInteract('wave');
        setTimeout(() => {
          setIsWavingState(false);
          setInteractiveStatus('Ready • Tracking Cursor');
        }, 2200);
      },
      setMood: (mood: LightingMood) => {
        moodRef.current = mood;
        setCurrentMood(mood);
        setInteractiveStatus(`Lighting set to ${mood.toUpperCase()}`);
        if (onInteract) onInteract(`mood-${mood}`);
        setTimeout(() => setInteractiveStatus('Ready • Tracking Cursor'), 2000);
      },
      resetView: () => {
        resetViewRef.current = performance.now();
        setInteractiveStatus('Camera & Gaze Reset');
        setTimeout(() => setInteractiveStatus('Ready • Tracking Cursor'), 1500);
      },
    }));

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      // --- SCENE, CAMERA, RENDERER ---
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x070b16, 0.045);

      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
      const isMobile = width < 768;
      camera.position.set(0, isMobile ? 0.2 : 0.35, isMobile ? 8.6 : 7.2);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.appendChild(renderer.domElement);

      // --- LIGHTING PALETTES ---
      const moodPalettes = {
        cyber: {
          key: new THREE.Color(0xe0e7ff),
          fill: new THREE.Color(0x6366f1),
          rim: new THREE.Color(0xec4899),
          rimRight: new THREE.Color(0x8b5cf6),
          screen: new THREE.Color(0xa78bfa),
          ambient: new THREE.Color(0x1e1b4b),
        },
        midnight: {
          key: new THREE.Color(0x38bdf8),
          fill: new THREE.Color(0x0369a1),
          rim: new THREE.Color(0x10b981),
          rimRight: new THREE.Color(0x6366f1),
          screen: new THREE.Color(0x22d3ee),
          ambient: new THREE.Color(0x0c1e3a),
        },
        sunset: {
          key: new THREE.Color(0xfef08a),
          fill: new THREE.Color(0xf97316),
          rim: new THREE.Color(0xf43f5e),
          rimRight: new THREE.Color(0xd946ef),
          screen: new THREE.Color(0xfb7185),
          ambient: new THREE.Color(0x2a0845),
        },
      };

      // Ambient Light
      const ambientLight = new THREE.AmbientLight(moodPalettes.cyber.ambient, 1.2);
      scene.add(ambientLight);

      // Key light
      const keyLight = new THREE.DirectionalLight(moodPalettes.cyber.key, 2.0);
      keyLight.position.set(3, 4, 4);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      scene.add(keyLight);

      // Fill light
      const fillLight = new THREE.DirectionalLight(moodPalettes.cyber.fill, 1.2);
      fillLight.position.set(-4, -1, 3);
      scene.add(fillLight);

      // Main Rim light (Pink / Accent)
      const rimLight = new THREE.DirectionalLight(moodPalettes.cyber.rim, 3.2);
      rimLight.position.set(-3.5, 3.5, -3);
      scene.add(rimLight);

      // Secondary Rim light (Right)
      const rimLightRight = new THREE.DirectionalLight(moodPalettes.cyber.rimRight, 2.5);
      rimLightRight.position.set(3.5, 2.5, -2.5);
      scene.add(rimLightRight);

      // Laptop screen bounce light
      const screenLight = new THREE.PointLight(moodPalettes.cyber.screen, 2.2, 4.5);
      screenLight.position.set(0, -0.15, 1.3);
      scene.add(screenLight);

      // --- MATERIALS ---
      const skinMaterial = new THREE.MeshStandardMaterial({
        color: 0xf3bf9f,
        roughness: 0.45,
        metalness: 0.05,
      });

      const hairMaterial = new THREE.MeshStandardMaterial({
        color: 0x1e1b4b,
        roughness: 0.35,
        metalness: 0.15,
      });

      const hairHighlightMaterial = new THREE.MeshStandardMaterial({
        color: 0x2e1065,
        roughness: 0.3,
        metalness: 0.2,
      });

      const hoodieMaterial = new THREE.MeshStandardMaterial({
        color: 0x3b0764,
        roughness: 0.7,
        metalness: 0.08,
      });

      const lavenderAccentMaterial = new THREE.MeshStandardMaterial({
        color: 0xc4b5fd,
        roughness: 0.2,
        metalness: 0.6,
      });

      const glassesFrameMaterial = new THREE.MeshStandardMaterial({
        color: 0xd8b4fe,
        metalness: 0.9,
        roughness: 0.15,
      });

      const glassesLensMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xa855f7,
        transparent: true,
        opacity: 0.28,
        roughness: 0.08,
        metalness: 0.1,
        transmission: 0.85,
        ior: 1.5,
      });

      const eyeWhiteMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.1,
        metalness: 0.0,
      });

      const irisMaterial = new THREE.MeshStandardMaterial({
        color: 0x6b21a8,
        roughness: 0.2,
        metalness: 0.1,
      });

      const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x09090b });
      const catchlightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const eyelidMaterial = skinMaterial;

      const lipsMaterial = new THREE.MeshStandardMaterial({
        color: 0xdb2777,
        roughness: 0.3,
        metalness: 0.05,
      });

      const blushMaterial = new THREE.MeshBasicMaterial({
        color: 0xf472b6,
        transparent: true,
        opacity: 0.22,
      });

      // --- CHARACTER HIERARCHY ---
      const characterRoot = new THREE.Group();
      characterRoot.position.set(0, -0.65, 0);
      scene.add(characterRoot);

      // Torso Group (Breathing & Sway)
      const torsoGroup = new THREE.Group();
      characterRoot.add(torsoGroup);

      // Chest & Hoodie
      const chestGeo = new THREE.CylinderGeometry(0.72, 0.85, 1.4, 24);
      const chestMesh = new THREE.Mesh(chestGeo, hoodieMaterial);
      chestMesh.position.set(0, 0.45, 0);
      chestMesh.castShadow = true;
      torsoGroup.add(chestMesh);

      const shoulderGeo = new THREE.SphereGeometry(0.74, 24, 16);
      shoulderGeo.scale(1.15, 0.8, 0.85);
      const shoulderMesh = new THREE.Mesh(shoulderGeo, hoodieMaterial);
      shoulderMesh.position.set(0, 0.95, 0);
      torsoGroup.add(shoulderMesh);

      const collarGeo = new THREE.TorusGeometry(0.42, 0.12, 16, 32);
      const collarMesh = new THREE.Mesh(collarGeo, hoodieMaterial);
      collarMesh.rotation.x = Math.PI / 2;
      collarMesh.position.set(0, 1.25, 0.08);
      torsoGroup.add(collarMesh);

      // Cords & Aglets
      const cordGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.5, 8);
      const cordLeft = new THREE.Mesh(cordGeo, lavenderAccentMaterial);
      cordLeft.position.set(-0.15, 0.85, 0.38);
      cordLeft.rotation.z = 0.05;
      torsoGroup.add(cordLeft);

      const cordRight = new THREE.Mesh(cordGeo, lavenderAccentMaterial);
      cordRight.position.set(0.15, 0.85, 0.38);
      cordRight.rotation.z = -0.05;
      torsoGroup.add(cordRight);

      const tipGeo = new THREE.CylinderGeometry(0.022, 0.022, 0.08, 8);
      const tipLeft = new THREE.Mesh(tipGeo, lavenderAccentMaterial);
      tipLeft.position.set(-0.16, 0.58, 0.39);
      torsoGroup.add(tipLeft);
      const tipRight = new THREE.Mesh(tipGeo, lavenderAccentMaterial);
      tipRight.position.set(0.16, 0.58, 0.39);
      torsoGroup.add(tipRight);

      // Left Arm (Resting near keyboard)
      const leftArmGroup = new THREE.Group();
      leftArmGroup.position.set(-0.8, 0.9, 0.1);
      const leftArmGeo = new THREE.CylinderGeometry(0.18, 0.16, 0.9, 16);
      const leftArmMesh = new THREE.Mesh(leftArmGeo, hoodieMaterial);
      leftArmMesh.position.set(0, -0.35, 0.2);
      leftArmMesh.rotation.x = 0.55;
      leftArmMesh.rotation.z = 0.25;
      leftArmGroup.add(leftArmMesh);

      const handGeo = new THREE.SphereGeometry(0.15, 16, 16);
      handGeo.scale(1, 0.7, 1.3);
      const leftHandMesh = new THREE.Mesh(handGeo, skinMaterial);
      leftHandMesh.position.set(0.15, -0.65, 0.58);
      leftHandMesh.rotation.x = 0.4;
      leftArmGroup.add(leftHandMesh);
      torsoGroup.add(leftArmGroup);

      // Right Arm (Interactive: types on keyboard OR raises up to wave!)
      const rightArmGroup = new THREE.Group();
      rightArmGroup.position.set(0.8, 0.9, 0.1);
      torsoGroup.add(rightArmGroup);

      const rightArmGeo = new THREE.CylinderGeometry(0.18, 0.16, 0.9, 16);
      const rightArmMesh = new THREE.Mesh(rightArmGeo, hoodieMaterial);
      rightArmMesh.position.set(0, -0.35, 0.2);
      rightArmMesh.rotation.x = 0.55;
      rightArmMesh.rotation.z = -0.25;
      rightArmGroup.add(rightArmMesh);

      const rightHandMesh = new THREE.Mesh(handGeo, skinMaterial);
      rightHandMesh.position.set(-0.15, -0.65, 0.58);
      rightHandMesh.rotation.x = 0.4;
      rightArmGroup.add(rightHandMesh);

      // Neck
      const neckGroup = new THREE.Group();
      neckGroup.position.set(0, 1.25, 0.05);
      torsoGroup.add(neckGroup);

      const neckGeo = new THREE.CylinderGeometry(0.24, 0.28, 0.45, 20);
      const neckMesh = new THREE.Mesh(neckGeo, skinMaterial);
      neckMesh.position.set(0, 0.15, 0);
      neckGroup.add(neckMesh);

      // Head Group (Rotates toward cursor)
      const headGroup = new THREE.Group();
      headGroup.position.set(0, 0.32, 0);
      neckGroup.add(headGroup);

      // Head sculpt
      const headGeo = new THREE.SphereGeometry(0.68, 32, 32);
      headGeo.scale(0.92, 1.08, 0.98);
      const headMesh = new THREE.Mesh(headGeo, skinMaterial);
      headMesh.castShadow = true;
      headGroup.add(headMesh);

      // Jaw / Chin refinement
      const chinGeo = new THREE.SphereGeometry(0.38, 24, 24);
      chinGeo.scale(0.85, 0.9, 0.9);
      const chinMesh = new THREE.Mesh(chinGeo, skinMaterial);
      chinMesh.position.set(0, -0.38, 0.24);
      headGroup.add(chinMesh);

      // Nose
      const noseGeo = new THREE.SphereGeometry(0.08, 16, 16);
      noseGeo.scale(0.8, 1.1, 1.2);
      const noseMesh = new THREE.Mesh(noseGeo, skinMaterial);
      noseMesh.position.set(0, -0.06, 0.65);
      headGroup.add(noseMesh);

      // Smile Lips
      const lipsGeo = new THREE.TorusGeometry(0.12, 0.035, 12, 24, Math.PI);
      const lipsMesh = new THREE.Mesh(lipsGeo, lipsMaterial);
      lipsMesh.rotation.z = Math.PI;
      lipsMesh.position.set(0, -0.26, 0.62);
      headGroup.add(lipsMesh);

      // Cheeks Blush
      const blushLeft = new THREE.Mesh(new THREE.CircleGeometry(0.12, 16), blushMaterial);
      blushLeft.position.set(-0.35, -0.15, 0.58);
      blushLeft.rotation.y = -0.35;
      headGroup.add(blushLeft);

      const blushRight = new THREE.Mesh(new THREE.CircleGeometry(0.12, 16), blushMaterial);
      blushRight.position.set(0.35, -0.15, 0.58);
      blushRight.rotation.y = 0.35;
      headGroup.add(blushRight);

      // --- EYES & BLINKING SYSTEM ---
      const eyeWhiteGeo = new THREE.SphereGeometry(0.16, 20, 20);
      const irisGeo = new THREE.CircleGeometry(0.085, 24);
      const pupilGeo = new THREE.CircleGeometry(0.045, 24);
      const catchlightGeo = new THREE.CircleGeometry(0.02, 16);
      const lidGeo = new THREE.SphereGeometry(0.172, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);

      // Left Eye
      const leftEyeGroup = new THREE.Group();
      leftEyeGroup.position.set(-0.24, 0.04, 0.54);
      headGroup.add(leftEyeGroup);

      const leftSclera = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMaterial);
      leftEyeGroup.add(leftSclera);

      const leftPupilGroup = new THREE.Group();
      leftEyeGroup.add(leftPupilGroup);

      const leftIris = new THREE.Mesh(irisGeo, irisMaterial);
      leftIris.position.set(0, 0, 0.155);
      leftPupilGroup.add(leftIris);

      const leftPupil = new THREE.Mesh(pupilGeo, pupilMaterial);
      leftPupil.position.set(0, 0, 0.157);
      leftPupilGroup.add(leftPupil);

      const leftCatchlight = new THREE.Mesh(catchlightGeo, catchlightMaterial);
      leftCatchlight.position.set(0.028, 0.028, 0.158);
      leftPupilGroup.add(leftCatchlight);

      const leftUpperLidPivot = new THREE.Group();
      leftEyeGroup.add(leftUpperLidPivot);
      const leftUpperLidMesh = new THREE.Mesh(lidGeo, eyelidMaterial);
      leftUpperLidMesh.rotation.x = -Math.PI / 2;
      leftUpperLidPivot.add(leftUpperLidMesh);

      // Right Eye
      const rightEyeGroup = new THREE.Group();
      rightEyeGroup.position.set(0.24, 0.04, 0.54);
      headGroup.add(rightEyeGroup);

      const rightSclera = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMaterial);
      rightEyeGroup.add(rightSclera);

      const rightPupilGroup = new THREE.Group();
      rightEyeGroup.add(rightPupilGroup);

      const rightIris = new THREE.Mesh(irisGeo, irisMaterial);
      rightIris.position.set(0, 0, 0.155);
      rightPupilGroup.add(rightIris);

      const rightPupil = new THREE.Mesh(pupilGeo, pupilMaterial);
      rightPupil.position.set(0, 0, 0.157);
      rightPupilGroup.add(rightPupil);

      const rightCatchlight = new THREE.Mesh(catchlightGeo, catchlightMaterial);
      rightCatchlight.position.set(0.028, 0.028, 0.158);
      rightPupilGroup.add(rightCatchlight);

      const rightUpperLidPivot = new THREE.Group();
      rightEyeGroup.add(rightUpperLidPivot);
      const rightUpperLidMesh = new THREE.Mesh(lidGeo, eyelidMaterial);
      rightUpperLidMesh.rotation.x = -Math.PI / 2;
      rightUpperLidPivot.add(rightUpperLidMesh);

      // Eyebrows
      const browGeo = new THREE.TorusGeometry(0.16, 0.022, 8, 16, Math.PI * 0.55);
      const browLeft = new THREE.Mesh(browGeo, hairMaterial);
      browLeft.position.set(-0.25, 0.22, 0.58);
      browLeft.rotation.z = -0.15;
      headGroup.add(browLeft);

      const browRight = new THREE.Mesh(browGeo, hairMaterial);
      browRight.position.set(0.25, 0.22, 0.58);
      browRight.rotation.z = Math.PI - 0.15;
      browRight.rotation.y = Math.PI;
      headGroup.add(browRight);

      // Developer Glasses
      const glassesGroup = new THREE.Group();
      glassesGroup.position.set(0, 0.03, 0.58);
      headGroup.add(glassesGroup);

      const lensFrameGeo = new THREE.TorusGeometry(0.22, 0.018, 16, 32);
      const leftFrame = new THREE.Mesh(lensFrameGeo, glassesFrameMaterial);
      leftFrame.position.set(-0.24, 0, 0.02);
      glassesGroup.add(leftFrame);

      const lensGeo = new THREE.CylinderGeometry(0.21, 0.21, 0.015, 32);
      lensGeo.rotateX(Math.PI / 2);
      const leftLens = new THREE.Mesh(lensGeo, glassesLensMaterial);
      leftLens.position.set(-0.24, 0, 0.02);
      glassesGroup.add(leftLens);

      const rightFrame = new THREE.Mesh(lensFrameGeo, glassesFrameMaterial);
      rightFrame.position.set(0.24, 0, 0.02);
      glassesGroup.add(rightFrame);

      const rightLens = new THREE.Mesh(lensGeo, glassesLensMaterial);
      rightLens.position.set(0.24, 0, 0.02);
      glassesGroup.add(rightLens);

      const bridgeGeo = new THREE.CylinderGeometry(0.016, 0.016, 0.16, 8);
      bridgeGeo.rotateZ(Math.PI / 2);
      const bridge = new THREE.Mesh(bridgeGeo, glassesFrameMaterial);
      bridge.position.set(0, 0.06, 0.03);
      glassesGroup.add(bridge);

      // Hijab / Hair silhouette
      const hairGroup = new THREE.Group();
      headGroup.add(hairGroup);

      const hairDomeGeo = new THREE.SphereGeometry(0.74, 32, 24);
      hairDomeGeo.scale(0.96, 1.1, 1.04);
      const hairDomeMesh = new THREE.Mesh(hairDomeGeo, hairMaterial);
      hairDomeMesh.position.set(0, 0.04, -0.05);
      hairGroup.add(hairDomeMesh);

      const hairRimGeo = new THREE.TorusGeometry(0.56, 0.14, 16, 32, Math.PI * 1.4);
      const hairRimMesh = new THREE.Mesh(hairRimGeo, hairHighlightMaterial);
      hairRimMesh.rotation.z = Math.PI * 0.8;
      hairRimMesh.position.set(0, 0.08, 0.35);
      hairGroup.add(hairRimMesh);

      const drapeLeftGeo = new THREE.CylinderGeometry(0.24, 0.38, 1.1, 20);
      drapeLeftGeo.scale(0.85, 1, 0.6);
      const drapeLeft = new THREE.Mesh(drapeLeftGeo, hairMaterial);
      drapeLeft.position.set(-0.48, -0.52, 0.15);
      drapeLeft.rotation.z = -0.22;
      drapeLeft.rotation.x = 0.15;
      hairGroup.add(drapeLeft);

      const drapeRight = new THREE.Mesh(drapeLeftGeo, hairMaterial);
      drapeRight.position.set(0.48, -0.52, 0.15);
      drapeRight.rotation.z = 0.22;
      drapeRight.rotation.x = 0.15;
      hairGroup.add(drapeRight);

      // Developer Headset
      const headsetGroup = new THREE.Group();
      headGroup.add(headsetGroup);

      const headsetBandGeo = new THREE.TorusGeometry(0.76, 0.04, 12, 32, Math.PI);
      const headsetBand = new THREE.Mesh(headsetBandGeo, hoodieMaterial);
      headsetBand.rotation.x = -Math.PI / 2 + 0.15;
      headsetBand.position.set(0, 0.28, -0.05);
      headsetGroup.add(headsetBand);

      const earcupGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.12, 24);
      earcupGeo.rotateZ(Math.PI / 2);
      const earcupGlowMaterial = new THREE.MeshStandardMaterial({
        color: 0xec4899,
        emissive: 0xdb2777,
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.8,
      });

      const leftEarcup = new THREE.Mesh(earcupGeo, earcupGlowMaterial);
      leftEarcup.position.set(-0.76, 0.05, 0.02);
      headsetGroup.add(leftEarcup);

      const rightEarcup = new THREE.Mesh(earcupGeo, earcupGlowMaterial);
      rightEarcup.position.set(0.76, 0.05, 0.02);
      headsetGroup.add(rightEarcup);

      // --- FLOATING 3D LAPTOP ---
      const laptopGroup = new THREE.Group();
      laptopGroup.position.set(0, -0.45, 1.45);
      laptopGroup.rotation.x = 0.22;
      scene.add(laptopGroup);

      const laptopBaseGeo = new THREE.BoxGeometry(1.68, 0.04, 1.15);
      const laptopBodyMaterial = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.85,
        roughness: 0.25,
      });
      const laptopBase = new THREE.Mesh(laptopBaseGeo, laptopBodyMaterial);
      laptopBase.castShadow = true;
      laptopGroup.add(laptopBase);

      const keyboardGeo = new THREE.BoxGeometry(1.48, 0.015, 0.62);
      const keyboardMaterial = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        emissive: 0x4338ca,
        emissiveIntensity: 0.45,
        roughness: 0.3,
      });
      const keyboard = new THREE.Mesh(keyboardGeo, keyboardMaterial);
      keyboard.position.set(0, 0.025, -0.15);
      laptopGroup.add(keyboard);

      const trackpadGeo = new THREE.BoxGeometry(0.5, 0.005, 0.28);
      const trackpadMaterial = new THREE.MeshStandardMaterial({
        color: 0x334155,
        metalness: 0.5,
        roughness: 0.2,
      });
      const trackpad = new THREE.Mesh(trackpadGeo, trackpadMaterial);
      trackpad.position.set(0, 0.025, 0.36);
      laptopGroup.add(trackpad);

      // Laptop Screen Lid
      const screenGroup = new THREE.Group();
      screenGroup.position.set(0, 0.02, -0.57);
      screenGroup.rotation.x = -1.95;
      laptopGroup.add(screenGroup);

      const screenLidGeo = new THREE.BoxGeometry(1.68, 1.15, 0.035);
      const screenLid = new THREE.Mesh(screenLidGeo, laptopBodyMaterial);
      screenLid.position.set(0, 0.575, 0);
      screenGroup.add(screenLid);

      // Live IDE Canvas on Screen
      const codeCanvas = document.createElement('canvas');
      codeCanvas.width = 512;
      codeCanvas.height = 340;
      const ctx = codeCanvas.getContext('2d');

      const renderIDETexture = (cursorOn: boolean) => {
        if (!ctx) return;
        ctx.fillStyle = '#0a0d17';
        ctx.fillRect(0, 0, 512, 340);

        ctx.fillStyle = '#1e1b4b';
        ctx.fillRect(0, 0, 512, 28);
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(16, 14, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(30, 14, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(44, 14, 4.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#a78bfa';
        ctx.font = '11px monospace';
        ctx.fillText('AmeenaSherin.dev — Portfolio 3D Engine', 62, 18);

        ctx.font = '13px "JetBrains Mono", Consolas, monospace';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('1', 14, 52);
        ctx.fillStyle = '#c084fc';
        ctx.fillText('import', 36, 52);
        ctx.fillStyle = '#f8fafc';
        ctx.fillText(' { AmeenaSherin } ', 88, 52);
        ctx.fillStyle = '#c084fc';
        ctx.fillText('from', 242, 52);
        ctx.fillStyle = '#38bdf8';
        ctx.fillText(" 'kerala';", 282, 52);

        ctx.fillStyle = '#94a3b8';
        ctx.fillText('2', 14, 76);

        ctx.fillStyle = '#94a3b8';
        ctx.fillText('3', 14, 100);
        ctx.fillStyle = '#818cf8';
        ctx.fillText('const', 36, 100);
        ctx.fillStyle = '#38bdf8';
        ctx.fillText(' engineer', 80, 100);
        ctx.fillStyle = '#f8fafc';
        ctx.fillText(' = ', 146, 100);
        ctx.fillStyle = '#c084fc';
        ctx.fillText('new', 166, 100);
        ctx.fillStyle = '#fb7185';
        ctx.fillText(' SoftwareDeveloper', 198, 100);
        ctx.fillStyle = '#f8fafc';
        ctx.fillText('({', 342, 100);

        ctx.fillStyle = '#94a3b8';
        ctx.fillText('4', 14, 124);
        ctx.fillStyle = '#a78bfa';
        ctx.fillText('  degree:', 36, 124);
        ctx.fillStyle = '#38bdf8';
        ctx.fillText(" 'B.Tech CSE @ AWH',", 126, 124);

        ctx.fillStyle = '#94a3b8';
        ctx.fillText('5', 14, 148);
        ctx.fillStyle = '#a78bfa';
        ctx.fillText('  aspirations:', 36, 148);
        ctx.fillStyle = '#38bdf8';
        ctx.fillText(" 'Software, Data, AI',", 146, 148);

        ctx.fillStyle = '#94a3b8';
        ctx.fillText('6', 14, 172);
        ctx.fillStyle = '#a78bfa';
        ctx.fillText('  tools:', 36, 172);
        ctx.fillStyle = '#fb7185';
        ctx.fillText(" ['Python', 'SQL', 'PowerBI', 'React'],", 92, 172);

        ctx.fillStyle = '#94a3b8';
        ctx.fillText('7', 14, 196);
        ctx.fillStyle = '#a78bfa';
        ctx.fillText('  passion:', 36, 196);
        ctx.fillStyle = '#34d399';
        ctx.fillText(" 'Crafting High-Impact Products'", 114, 196);

        ctx.fillStyle = '#94a3b8';
        ctx.fillText('8', 14, 220);
        ctx.fillStyle = '#f8fafc';
        ctx.fillText('});', 36, 220);

        ctx.fillStyle = '#94a3b8';
        ctx.fillText('9', 14, 244);
        ctx.fillStyle = '#38bdf8';
        ctx.fillText('engineer.', 36, 244);
        ctx.fillStyle = '#f472b6';
        ctx.fillText('buildFutureOfWeb', 114, 244);
        ctx.fillStyle = '#f8fafc';
        ctx.fillText('();', 256, 244);

        ctx.fillStyle = '#1e1b4b';
        ctx.fillRect(14, 266, 484, 52);
        ctx.fillStyle = '#34d399';
        ctx.fillText('✓ System Online: Interactive 3D Portfolio Active', 26, 292);

        if (cursorOn) {
          ctx.fillStyle = '#a855f7';
          ctx.fillRect(380, 280, 8, 16);
        }
      };

      renderIDETexture(true);
      const codeTexture = new THREE.CanvasTexture(codeCanvas);
      codeTexture.anisotropy = 4;

      const screenDisplayGeo = new THREE.PlaneGeometry(1.6, 1.05);
      const screenDisplayMaterial = new THREE.MeshBasicMaterial({ map: codeTexture });
      const screenDisplay = new THREE.Mesh(screenDisplayGeo, screenDisplayMaterial);
      screenDisplay.position.set(0, 0.575, 0.02);
      screenGroup.add(screenDisplay);

      // --- FLOATING 3D TECH OBJECTS ---
      // 1. Code Symbol: "</>" Tag (Left)
      const codeTagGroup = new THREE.Group();
      codeTagGroup.position.set(-2.5, 0.8, 0.6);
      scene.add(codeTagGroup);

      const tagMat = new THREE.MeshStandardMaterial({
        color: 0xc4b5fd,
        emissive: 0x8b5cf6,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8,
      });

      const legGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.45, 12);
      const leftLeg1 = new THREE.Mesh(legGeo, tagMat);
      leftLeg1.position.set(-0.35, 0.12, 0);
      leftLeg1.rotation.z = Math.PI / 4;
      codeTagGroup.add(leftLeg1);

      const leftLeg2 = new THREE.Mesh(legGeo, tagMat);
      leftLeg2.position.set(-0.35, -0.12, 0);
      leftLeg2.rotation.z = -Math.PI / 4;
      codeTagGroup.add(leftLeg2);

      const slashMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.65, 12), tagMat);
      slashMesh.rotation.z = -0.35;
      codeTagGroup.add(slashMesh);

      const rightLeg1 = new THREE.Mesh(legGeo, tagMat);
      rightLeg1.position.set(0.35, 0.12, 0);
      rightLeg1.rotation.z = -Math.PI / 4;
      codeTagGroup.add(rightLeg1);

      const rightLeg2 = new THREE.Mesh(legGeo, tagMat);
      rightLeg2.position.set(0.35, -0.12, 0);
      rightLeg2.rotation.z = Math.PI / 4;
      codeTagGroup.add(rightLeg2);

      // 2. Code Symbol: "{ }" Braces (Right)
      const curlyBracesGroup = new THREE.Group();
      curlyBracesGroup.position.set(2.5, 0.9, 0.8);
      scene.add(curlyBracesGroup);

      const braceMat = new THREE.MeshStandardMaterial({
        color: 0xf472b6,
        emissive: 0xec4899,
        emissiveIntensity: 0.55,
        roughness: 0.2,
        metalness: 0.7,
      });

      const braceTorus = new THREE.TorusGeometry(0.18, 0.038, 12, 24, Math.PI * 0.7);
      const t1 = new THREE.Mesh(braceTorus, braceMat);
      t1.position.set(-0.25, 0.15, 0);
      t1.rotation.z = 0.5;
      curlyBracesGroup.add(t1);

      const t2 = new THREE.Mesh(braceTorus, braceMat);
      t2.position.set(-0.25, -0.15, 0);
      t2.rotation.z = Math.PI - 0.5;
      curlyBracesGroup.add(t2);

      const t3 = new THREE.Mesh(braceTorus, braceMat);
      t3.position.set(0.25, 0.15, 0);
      t3.rotation.z = Math.PI - 0.5;
      t3.rotation.y = Math.PI;
      curlyBracesGroup.add(t3);

      const t4 = new THREE.Mesh(braceTorus, braceMat);
      t4.position.set(0.25, -0.15, 0);
      t4.rotation.z = 0.5;
      t4.rotation.y = Math.PI;
      curlyBracesGroup.add(t4);

      // 3. Floating Geometric Octahedron (Left Lower)
      const octaGeo = new THREE.OctahedronGeometry(0.38, 0);
      const octaMat = new THREE.MeshStandardMaterial({
        color: 0xa78bfa,
        emissive: 0x7c3aed,
        emissiveIntensity: 0.35,
        metalness: 0.85,
        roughness: 0.15,
      });
      const octaMesh = new THREE.Mesh(octaGeo, octaMat);
      octaMesh.position.set(-2.6, -1.0, 1.4);
      scene.add(octaMesh);

      // 4. Floating Geometric Icosahedron (Right Lower)
      const icoGeo = new THREE.IcosahedronGeometry(0.42, 0);
      const icoMat = new THREE.MeshPhysicalMaterial({
        color: 0xec4899,
        transmission: 0.8,
        opacity: 0.7,
        transparent: true,
        roughness: 0.1,
        metalness: 0.2,
        emissive: 0xdb2777,
        emissiveIntensity: 0.3,
      });
      const icoMesh = new THREE.Mesh(icoGeo, icoMat);
      icoMesh.position.set(2.7, -0.9, 1.3);
      scene.add(icoMesh);

      // 5. Floating Torus Knot (Deep Upper Background)
      const knotGeo = new THREE.TorusKnotGeometry(0.35, 0.09, 64, 16);
      const knotMat = new THREE.MeshStandardMaterial({
        color: 0x818cf8,
        emissive: 0x4f46e5,
        emissiveIntensity: 0.4,
        metalness: 0.9,
        roughness: 0.2,
      });
      const knotMesh = new THREE.Mesh(knotGeo, knotMat);
      knotMesh.position.set(2.2, 2.0, -1.2);
      scene.add(knotMesh);

      // 6. Floating Halo Torus Ring (Upper Left)
      const haloGeo = new THREE.TorusGeometry(0.45, 0.03, 16, 40);
      const haloMat = new THREE.MeshStandardMaterial({
        color: 0xf472b6,
        emissive: 0xec4899,
        emissiveIntensity: 0.5,
        roughness: 0.1,
        metalness: 0.9,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.position.set(-2.2, 2.2, -0.8);
      haloMesh.rotation.x = 1.1;
      scene.add(haloMesh);

      // --- PARTICLES CONSTELLATION ---
      const particleCount = 450;
      const particleGeo = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);
      const particleColors = new Float32Array(particleCount * 3);

      const colorsPalette = [
        new THREE.Color(0xc4b5fd),
        new THREE.Color(0xa855f7),
        new THREE.Color(0xf472b6),
        new THREE.Color(0x38bdf8),
        new THREE.Color(0xffffff),
      ];

      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 1.2 + Math.random() * 5.5;
        const height = (Math.random() - 0.5) * 7.0;

        particlePositions[i * 3] = Math.cos(angle) * radius;
        particlePositions[i * 3 + 1] = height;
        particlePositions[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 2;

        const col = colorsPalette[Math.floor(Math.random() * colorsPalette.length)];
        particleColors[i * 3] = col.r;
        particleColors[i * 3 + 1] = col.g;
        particleColors[i * 3 + 2] = col.b;
      }

      particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

      const pCanvas = document.createElement('canvas');
      pCanvas.width = 32;
      pCanvas.height = 32;
      const pCtx = pCanvas.getContext('2d');
      if (pCtx) {
        const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, 'rgba(255,255,255,1)');
        grad.addColorStop(0.3, 'rgba(196,181,253,0.85)');
        grad.addColorStop(0.7, 'rgba(147,51,234,0.3)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        pCtx.fillStyle = grad;
        pCtx.fillRect(0, 0, 32, 32);
      }
      const pTexture = new THREE.CanvasTexture(pCanvas);

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.12,
        map: pTexture,
        transparent: true,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const particles = new THREE.Points(particleGeo, particleMaterial);
      scene.add(particles);

      // --- MOUSE TRACKING & INTERACTIVE STATES ---
      let targetMouseX = 0;
      let targetMouseY = 0;
      let currentMouseX = 0;
      let currentMouseY = 0;

      let isBlinking = false;
      let blinkProgress = 0;
      let nextBlinkTime = performance.now() + 2500;
      let cursorBlinkTimer = 0;
      let cursorVisibleState = true;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        targetMouseX = Math.max(-1, Math.min(1, x));
        targetMouseY = Math.max(-1, Math.min(1, y));
      };

      const handleMouseLeave = () => {
        targetMouseX = 0;
        targetMouseY = 0;
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) {
          const touch = e.touches[0];
          const rect = container.getBoundingClientRect();
          const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
          const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
          targetMouseX = Math.max(-1, Math.min(1, x * 1.3));
          targetMouseY = Math.max(-1, Math.min(1, y * 1.3));
        }
      };

      const handleCanvasClick = () => {
        // Trigger wave & smile when character is clicked directly
        waveTriggerRef.current = performance.now();
        setIsWavingState(true);
        setInteractiveStatus('✨ Hi there! Ameena says hello!');
        setTimeout(() => {
          setIsWavingState(false);
          setInteractiveStatus('Ready • Tracking Cursor');
        }, 2200);
      };

      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
      container.addEventListener('touchmove', handleTouchMove, { passive: true });
      container.addEventListener('click', handleCanvasClick);

      const handleResize = () => {
        if (!container) return;
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        const mob = w < 768;
        camera.position.z = mob ? 8.6 : 7.2;
        camera.position.y = mob ? 0.2 : 0.35;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', handleResize);
      handleResize();

      // --- ANIMATION LOOP ---
      let animationFrameId: number;
      const clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();
        const now = performance.now();

        // 0. Update Lights to match current selected mood smoothly
        const activePalette = moodPalettes[moodRef.current] || moodPalettes.cyber;
        keyLight.color.lerp(activePalette.key, 0.05);
        fillLight.color.lerp(activePalette.fill, 0.05);
        rimLight.color.lerp(activePalette.rim, 0.05);
        rimLightRight.color.lerp(activePalette.rimRight, 0.05);
        screenLight.color.lerp(activePalette.screen, 0.05);
        ambientLight.color.lerp(activePalette.ambient, 0.05);

        // Reset view trigger
        if (now - resetViewRef.current < 800) {
          targetMouseX = 0;
          targetMouseY = 0;
        }

        // Smooth mouse coordinates
        currentMouseX += (targetMouseX - currentMouseX) * 0.055;
        currentMouseY += (targetMouseY - currentMouseY) * 0.055;

        // 1. Idle breathing and organic life sway
        const breathingCycle = Math.sin(elapsedTime * 1.8);
        const idleSwayX = Math.sin(elapsedTime * 0.8) * 0.04;
        const idleSwayY = Math.cos(elapsedTime * 1.1) * 0.03;

        torsoGroup.scale.y = 1.0 + breathingCycle * 0.015;
        torsoGroup.scale.z = 1.0 + breathingCycle * 0.02;
        torsoGroup.position.y = breathingCycle * 0.012;

        // 2. Head tracking towards cursor + idle sway
        const targetHeadYaw = currentMouseX * 0.38 + idleSwayX;
        const targetHeadPitch = -currentMouseY * 0.24 + idleSwayY;
        const targetHeadRoll = -currentMouseX * 0.09;

        headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, targetHeadYaw, 0.08);
        headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, targetHeadPitch, 0.08);
        headGroup.rotation.z = THREE.MathUtils.lerp(headGroup.rotation.z, targetHeadRoll, 0.08);
        neckGroup.rotation.y = THREE.MathUtils.lerp(neckGroup.rotation.y, targetHeadYaw * 0.35, 0.05);

        // 3. Eyes follow cursor with higher sensitivity
        const eyeLookX = Math.max(-0.4, Math.min(0.4, currentMouseX * 0.45));
        const eyeLookY = Math.max(-0.3, Math.min(0.3, currentMouseY * 0.35));

        leftPupilGroup.position.x = THREE.MathUtils.lerp(leftPupilGroup.position.x, eyeLookX * 0.06, 0.15);
        leftPupilGroup.position.y = THREE.MathUtils.lerp(leftPupilGroup.position.y, eyeLookY * 0.05, 0.15);

        rightPupilGroup.position.x = THREE.MathUtils.lerp(rightPupilGroup.position.x, eyeLookX * 0.06, 0.15);
        rightPupilGroup.position.y = THREE.MathUtils.lerp(rightPupilGroup.position.y, eyeLookY * 0.05, 0.15);

        // 4. Natural Blinking
        if (now > nextBlinkTime && !isBlinking) {
          isBlinking = true;
          blinkProgress = 0;
        }

        if (isBlinking) {
          blinkProgress += 0.18;
          let lidAngle = -Math.PI / 2;
          if (blinkProgress <= 1.0) {
            lidAngle = THREE.MathUtils.lerp(-Math.PI / 2, 0, blinkProgress);
          } else if (blinkProgress <= 2.0) {
            lidAngle = THREE.MathUtils.lerp(0, -Math.PI / 2, blinkProgress - 1.0);
          } else {
            isBlinking = false;
            const isDouble = Math.random() < 0.2;
            nextBlinkTime = now + (isDouble ? 300 : 3200 + Math.random() * 2200);
          }
          leftUpperLidPivot.rotation.x = lidAngle;
          rightUpperLidPivot.rotation.x = lidAngle;
        }

        // 5. Interactive Waving Animation
        const waveElapsed = now - waveTriggerRef.current;
        if (waveElapsed < 2200) {
          // Arm raises up and waves
          const waveProgress = waveElapsed / 2200;
          let liftFactor = 0;
          if (waveProgress < 0.2) {
            liftFactor = waveProgress / 0.2;
          } else if (waveProgress < 0.8) {
            liftFactor = 1.0;
          } else {
            liftFactor = (1.0 - waveProgress) / 0.2;
          }

          // Raise right arm from keyboard to wave height
          rightArmGroup.position.y = 0.9 + liftFactor * 0.35;
          rightArmGroup.position.x = 0.8 + liftFactor * 0.15;
          rightArmMesh.rotation.x = THREE.MathUtils.lerp(0.55, -0.6, liftFactor);
          rightArmMesh.rotation.z = THREE.MathUtils.lerp(-0.25, -0.85, liftFactor);

          // Waving hand oscillation
          const waveWiggle = Math.sin(waveElapsed * 0.015) * 0.45;
          rightHandMesh.rotation.z = waveWiggle * liftFactor;
          rightHandMesh.rotation.x = 0.2 * liftFactor;

          // Gentle pleasant head nod while waving
          headGroup.rotation.z += Math.sin(waveElapsed * 0.008) * 0.05 * liftFactor;
          lipsMesh.scale.x = 1.0 + liftFactor * 0.18;
        } else {
          // Return smoothly to typing posture
          rightArmGroup.position.y = THREE.MathUtils.lerp(rightArmGroup.position.y, 0.9, 0.1);
          rightArmGroup.position.x = THREE.MathUtils.lerp(rightArmGroup.position.x, 0.8, 0.1);
          rightArmMesh.rotation.x = THREE.MathUtils.lerp(rightArmMesh.rotation.x, 0.55, 0.1);
          rightArmMesh.rotation.z = THREE.MathUtils.lerp(rightArmMesh.rotation.z, -0.25, 0.1);
          rightHandMesh.rotation.z = THREE.MathUtils.lerp(rightHandMesh.rotation.z, 0, 0.1);
          rightHandMesh.rotation.x = THREE.MathUtils.lerp(rightHandMesh.rotation.x, 0.4, 0.1);
          lipsMesh.scale.x = THREE.MathUtils.lerp(lipsMesh.scale.x, 1.0, 0.1);
        }

        // 6. Terminal Code Cursor Blinking
        cursorBlinkTimer += 0.04;
        if (cursorBlinkTimer > 0.6) {
          cursorBlinkTimer = 0;
          cursorVisibleState = !cursorVisibleState;
          renderIDETexture(cursorVisibleState);
          codeTexture.needsUpdate = true;
        }

        // 7. Floating Laptop Dynamics
        laptopGroup.position.y = -0.45 + Math.sin(elapsedTime * 1.5) * 0.04;
        laptopGroup.rotation.y = currentMouseX * 0.12 + Math.sin(elapsedTime * 0.7) * 0.03;
        laptopGroup.rotation.z = -currentMouseX * 0.05;

        // 8. Floating Tech Objects Parallax
        codeTagGroup.position.y = 0.8 + Math.sin(elapsedTime * 1.4) * 0.12 + (currentMouseY * 0.2);
        codeTagGroup.position.x = -2.5 + (currentMouseX * 0.25);
        codeTagGroup.rotation.y = elapsedTime * 0.4 + currentMouseX * 0.2;
        codeTagGroup.rotation.z = Math.sin(elapsedTime * 0.8) * 0.15;

        curlyBracesGroup.position.y = 0.9 + Math.cos(elapsedTime * 1.3) * 0.12 + (currentMouseY * 0.22);
        curlyBracesGroup.position.x = 2.5 + (currentMouseX * 0.28);
        curlyBracesGroup.rotation.y = -elapsedTime * 0.35 + currentMouseX * 0.2;
        curlyBracesGroup.rotation.x = Math.sin(elapsedTime * 0.7) * 0.12;

        octaMesh.position.y = -1.0 + Math.sin(elapsedTime * 1.6 + 1) * 0.09 + (currentMouseY * 0.35);
        octaMesh.position.x = -2.6 + (currentMouseX * 0.4);
        octaMesh.rotation.x += 0.015;
        octaMesh.rotation.y += 0.018;

        icoMesh.position.y = -0.9 + Math.cos(elapsedTime * 1.5 + 2) * 0.1 + (currentMouseY * 0.32);
        icoMesh.position.x = 2.7 + (currentMouseX * 0.38);
        icoMesh.rotation.x += 0.012;
        icoMesh.rotation.z += 0.015;

        knotMesh.position.y = 2.0 + Math.sin(elapsedTime * 1.1) * 0.14 + (currentMouseY * 0.15);
        knotMesh.position.x = 2.2 + (currentMouseX * 0.18);
        knotMesh.rotation.x += 0.008;
        knotMesh.rotation.y += 0.01;

        haloMesh.position.y = 2.2 + Math.cos(elapsedTime * 1.2) * 0.12 + (currentMouseY * 0.16);
        haloMesh.position.x = -2.2 + (currentMouseX * 0.19);
        haloMesh.rotation.z += 0.01;

        particles.rotation.y = elapsedTime * 0.03 + currentMouseX * 0.08;
        particles.rotation.x = currentMouseY * 0.06;

        screenLight.intensity = 2.0 + Math.sin(elapsedTime * 3) * 0.3;

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
        if (container) {
          container.removeEventListener('mousemove', handleMouseMove);
          container.removeEventListener('mouseleave', handleMouseLeave);
          container.removeEventListener('touchmove', handleTouchMove);
          container.removeEventListener('click', handleCanvasClick);
          if (renderer.domElement && container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }
        }
        renderer.dispose();
        codeTexture.dispose();
        pTexture.dispose();
        particleGeo.dispose();
        particleMaterial.dispose();
      };
    }, []);

    return (
      <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden">
        {/* 3D WebGL Canvas */}
        <div
          ref={containerRef}
          className="w-full h-full min-h-[380px] sm:min-h-[520px] lg:min-h-[660px] cursor-grab active:cursor-grabbing"
          title="Click to interact with Ameena, or move cursor to guide her gaze"
        />

        {/* Floating Interactive Status Pill */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/85 border border-lavender-500/30 backdrop-blur-md shadow-xl text-[11px] font-mono text-lavender-200">
          <span className={`w-2 h-2 rounded-full ${isWavingState ? 'bg-accentPink-400 animate-ping' : 'bg-emerald-400 animate-pulse'}`} />
          <span>{interactiveStatus}</span>
        </div>

        {/* Ambient Radial Backlight Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] bg-gradient-to-tr from-purple-700/25 via-lavender-600/15 to-accentPink-500/20 rounded-full blur-3xl pointer-events-none -z-10" />
      </div>
    );
  }
);
