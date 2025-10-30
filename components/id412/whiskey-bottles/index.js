import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as S from './styles';

export default function WhiskeyBottles() {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const section5Ref = useRef(null);
  const section6Ref = useRef(null);
  const section7Ref = useRef(null);
  const section8Ref = useRef(null);

  useEffect(() => {
    const bottles = [
      { ref: section1Ref, name: 'Bourbon', liquidColor: 0xD2850F, bgColor: 0x3E1F1F },
      { ref: section2Ref, name: 'Irish Whiskey', liquidColor: 0xE5D4B5, bgColor: 0x4A2424 },
      { ref: section3Ref, name: 'Scotch', liquidColor: 0xA67C52, bgColor: 0x2F1818 },
      { ref: section4Ref, name: 'Rye', liquidColor: 0x6B3410, bgColor: 0x352020 },
      { ref: section5Ref, name: 'Cognac', liquidColor: 0xB8860B, bgColor: 0x2B1F1F },
      { ref: section6Ref, name: 'Rum', liquidColor: 0x8B4513, bgColor: 0x3A1F1F },
      { ref: section7Ref, name: 'Tequila', liquidColor: 0xF5DEB3, bgColor: 0x4F3A2A },
      { ref: section8Ref, name: 'Vodka', liquidColor: 0xE0E0E0, bgColor: 0x2F2F2F },
    ];

    const setupBottle = (containerRef, liquidColor, bgColor) => {
      if (!containerRef.current) return null;

      // Scene with color from palette
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(bgColor);

      // Camera (moved UP to show bottle lower in frame)
      const camera = new THREE.PerspectiveCamera(
        60,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.set(0, 2.2, 5);
      camera.lookAt(0, 0.3, 0);

      // Renderer with clipping enabled
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      renderer.shadowMap.enabled = true;
      renderer.localClippingEnabled = true;
      containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    // Bottle group
    const bottleGroup = new THREE.Group();
    scene.add(bottleGroup);

    // Glass bottle
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 0.1,
      transparent: true,
      opacity: 0.3,
      transmission: 0.95,
      side: THREE.DoubleSide,
    });

    const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.35, 2, 32, 1, true);
    const body = new THREE.Mesh(bodyGeometry, glassMaterial);
    bottleGroup.add(body);

    // Bottle neck
    const neckGeometry = new THREE.CylinderGeometry(0.12, 0.18, 0.8, 32);
    const neck = new THREE.Mesh(neckGeometry, glassMaterial);
    neck.position.y = 1.4;
    bottleGroup.add(neck);

    // Bottle cap (dark brown from palette)
    const capGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.2, 32);
    const capMaterial = new THREE.MeshStandardMaterial({
      color: 0x6B3410,
      metalness: 0.8,
      roughness: 0.3,
    });
    const cap = new THREE.Mesh(capGeometry, capMaterial);
    cap.position.y = 1.9;
    bottleGroup.add(cap);

    // Label (curved to wrap around bottle) - cream color from palette
    const labelRadius = 0.32; // slightly larger than bottle radius
    const labelArc = Math.PI * 0.6; // 108 degrees wrap
    const labelGeometry = new THREE.CylinderGeometry(
      labelRadius, 
      labelRadius, 
      0.8, 
      32, 
      1, 
      true, 
      -labelArc / 2, 
      labelArc
    );
    const labelMaterial = new THREE.MeshStandardMaterial({
      color: 0xE5D4B5,
      side: THREE.DoubleSide,
    });
    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.position.set(0, 0, 0);
    bottleGroup.add(label);

    // === LIQUID - SIMPLE (NO CLIPPING) WITH LEVEL TOP ===
    const bottleHeight = 2;
    const liquidFillPercent = 0.77; // 77% fill (increased from 70%)
    const liquidHeight = bottleHeight * liquidFillPercent;
    const bottleBottom = -bottleHeight / 2;
    const liquidTop = bottleBottom + liquidHeight;
    const liquidCenter = bottleBottom + liquidHeight / 2;
    
    // Clipping plane (horizontal in world space) - flipped to clip ABOVE the surface
    const clipPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), liquidTop);

      // Side walls: TALL open cylinder that will be clipped
      const tallHeight = bottleHeight * 2.5;
      const sideWallGeometry = new THREE.CylinderGeometry(0.28, 0.28, tallHeight, 64, 1, true);
      const sideWallMaterial = new THREE.MeshStandardMaterial({
        color: liquidColor,
        metalness: 0.2,
        roughness: 0.5,
        side: THREE.DoubleSide,
        clippingPlanes: [clipPlane],
        clipShadows: false,
      });
      const sideWalls = new THREE.Mesh(sideWallGeometry, sideWallMaterial);
      sideWalls.position.set(0, bottleBottom + tallHeight / 2, 0);
      bottleGroup.add(sideWalls);

      // Liquid cap material (separate, no clipping)
      const liquidCapMaterial = new THREE.MeshStandardMaterial({
        color: liquidColor,
        metalness: 0.2,
        roughness: 0.5,
        side: THREE.DoubleSide,
      });

    // Bottom disc
    const bottomGeometry = new THREE.CircleGeometry(0.28, 64);
    const liquidBottom = new THREE.Mesh(bottomGeometry, liquidCapMaterial);
    liquidBottom.position.set(0, bottleBottom, 0);
    liquidBottom.rotation.x = Math.PI / 2;
    bottleGroup.add(liquidBottom);

    // Top disc (stays level)
    const surfaceGeometry = new THREE.CircleGeometry(0.28, 64);
    const liquidSurface = new THREE.Mesh(surfaceGeometry, liquidCapMaterial);
    liquidSurface.position.set(0, liquidTop, 0);
    liquidSurface.rotation.x = -Math.PI / 2;
    bottleGroup.add(liquidSurface);

    // Drag interaction
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;
    let currentRotationY = 0;
    let currentRotationX = 0;

    const onMouseDown = (event) => {
      isDragging = true;
      previousMouseX = event.clientX;
      previousMouseY = event.clientY;
    };

    const onMouseMove = (event) => {
      if (!isDragging) return;
      const deltaX = event.clientX - previousMouseX;
      const deltaY = event.clientY - previousMouseY;
      targetRotationY += deltaX * 0.02;
      targetRotationX += deltaY * 0.02;
      targetRotationX = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, targetRotationX));
      previousMouseX = event.clientX;
      previousMouseY = event.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
      targetRotationY = 0;
      targetRotationX = 0;
    };

    containerRef.current.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      currentRotationY += (targetRotationY - currentRotationY) * 0.1;
      currentRotationX += (targetRotationX - currentRotationX) * 0.1;

      bottleGroup.rotation.y = currentRotationY;
      bottleGroup.rotation.x = currentRotationX;

      // Keep surface level relative to world by setting a WORLD target and converting to LOCAL
      bottleGroup.updateMatrixWorld(true);
      const bottleWorldQuat = bottleGroup.getWorldQuaternion(new THREE.Quaternion());
      const parentInvQuat = bottleWorldQuat.clone().invert();
      const surfaceBaseWorldQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0));
      const targetLocalQuat = surfaceBaseWorldQuat.clone();
      targetLocalQuat.premultiply(parentInvQuat);

      // Scale top disc to ellipse based on bottle tilt
      const bottleAxisWorld = new THREE.Vector3(0, 1, 0).applyQuaternion(bottleWorldQuat).normalize();
      const worldUp = new THREE.Vector3(0, 1, 0);
      const cosTheta = Math.abs(bottleAxisWorld.dot(worldUp));
      const ellipseScale = cosTheta > 0.01 ? 1 / cosTheta : 1;
      
      // Tilt direction in world XZ plane for ellipse orientation
      const tiltDir = new THREE.Vector3(bottleAxisWorld.x, 0, bottleAxisWorld.z);
      let zRotation = 0;
      if (tiltDir.lengthSq() > 0.001) {
        tiltDir.normalize();
        zRotation = Math.atan2(tiltDir.x, tiltDir.z) + Math.PI / 2; // +90 degrees for perpendicular
      }
      
      // Apply Z rotation to the level quaternion
      const zRotQuat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), -zRotation);
      liquidSurface.quaternion.copy(targetLocalQuat).multiply(zRotQuat);
      liquidSurface.scale.set(ellipseScale, 1, 1);

      // IMPORTANT: Force matrix update on surface AFTER rotation AND scale change
      liquidSurface.updateMatrixWorld(true);
      
      // Update clipping plane to match the exact world Y position of the tilted surface
      const surfaceWorldPos = new THREE.Vector3();
      liquidSurface.getWorldPosition(surfaceWorldPos);
      
      // Plane clips everything ABOVE the surface (normal points down, always horizontal)
      clipPlane.normal.set(0, -1, 0);
      clipPlane.constant = surfaceWorldPos.y;

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
        renderer.dispose();
      };
    };

    // Setup all four bottles
    const cleanups = bottles.map(bottle => setupBottle(bottle.ref, bottle.liquidColor, bottle.bgColor)).filter(c => c);

    return () => {
      cleanups.forEach(cleanup => cleanup());
    };
  }, []);

  return (
    <S.Container>
      <S.Title>Liquor Collection</S.Title>
      <S.Description>
        Click and drag to rotate • Release to return
      </S.Description>
      
      <S.GridContainer>
        <S.Section>
          <S.SectionLabel>Bourbon</S.SectionLabel>
          <S.CanvasContainer ref={section1Ref} />
        </S.Section>

        <S.Section>
          <S.SectionLabel>Irish Whiskey</S.SectionLabel>
          <S.CanvasContainer ref={section2Ref} />
        </S.Section>

        <S.Section>
          <S.SectionLabel>Scotch</S.SectionLabel>
          <S.CanvasContainer ref={section3Ref} />
        </S.Section>

        <S.Section>
          <S.SectionLabel>Rye</S.SectionLabel>
          <S.CanvasContainer ref={section4Ref} />
        </S.Section>

        <S.Section>
          <S.SectionLabel>Cognac</S.SectionLabel>
          <S.CanvasContainer ref={section5Ref} />
        </S.Section>

        <S.Section>
          <S.SectionLabel>Rum</S.SectionLabel>
          <S.CanvasContainer ref={section6Ref} />
        </S.Section>

        <S.Section>
          <S.SectionLabel>Tequila</S.SectionLabel>
          <S.CanvasContainer ref={section7Ref} />
        </S.Section>

        <S.Section>
          <S.SectionLabel>Vodka</S.SectionLabel>
          <S.CanvasContainer ref={section8Ref} />
        </S.Section>
      </S.GridContainer>

    </S.Container>
  );
}
