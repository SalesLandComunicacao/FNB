import { useEffect, useRef } from "react";
import * as THREE from "three";

const MorphingLogo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    points: THREE.Points;
    morphProgress: number;
    currentShape: number;
    targetShape: number;
    autoMorphTimer: number;
    mouse: THREE.Vector2;
    tiltX: number;
    tiltY: number;
    scrollTilt: number;
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Particle count
    const particleCount = 800;

    // Shape generators
    function createArrowShape(): Float32Array {
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        const t = i / particleCount;
        let x, y, z;

        if (t < 0.4) {
          const lineT = t / 0.4;
          x = -0.8 + lineT * 1.6;
          y = (Math.random() - 0.5) * 0.1;
          z = (Math.random() - 0.5) * 0.1;
        } else if (t < 0.7) {
          const arrowT = (t - 0.4) / 0.3;
          x = 0.8 - arrowT * 0.6;
          y = arrowT * 0.6 + (Math.random() - 0.5) * 0.1;
          z = (Math.random() - 0.5) * 0.1;
        } else {
          const arrowT = (t - 0.7) / 0.3;
          x = 0.8 - arrowT * 0.6;
          y = -arrowT * 0.6 + (Math.random() - 0.5) * 0.1;
          z = (Math.random() - 0.5) * 0.1;
        }

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
      }
      return positions;
    }

    function createChaosShape(): Float32Array {
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const r = 0.5 + Math.random() * 0.8;

        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }
      return positions;
    }

    function createFNBShape(): Float32Array {
      const positions = new Float32Array(particleCount * 3);
      const letterPoints: [number, number][] = [];

      // F
      for (let i = 0; i < 20; i++) letterPoints.push([-1.2, 0.5 - i * 0.05]);
      for (let i = 0; i < 12; i++) letterPoints.push([-1.2 + i * 0.04, 0.5]);
      for (let i = 0; i < 10; i++) letterPoints.push([-1.2 + i * 0.035, 0]);

      // N
      for (let i = 0; i < 20; i++) letterPoints.push([-0.5, 0.5 - i * 0.05]);
      for (let i = 0; i < 20; i++) letterPoints.push([-0.5 + i * 0.025, 0.5 - i * 0.05]);
      for (let i = 0; i < 20; i++) letterPoints.push([0, 0.5 - i * 0.05]);

      // B
      for (let i = 0; i < 20; i++) letterPoints.push([0.3, 0.5 - i * 0.05]);
      for (let i = 0; i < 10; i++) {
        const angle = -Math.PI / 2 + (i / 10) * Math.PI;
        letterPoints.push([0.3 + Math.cos(angle) * 0.2 + 0.2, 0.25 + Math.sin(angle) * 0.25]);
      }
      for (let i = 0; i < 10; i++) {
        const angle = -Math.PI / 2 + (i / 10) * Math.PI;
        letterPoints.push([0.3 + Math.cos(angle) * 0.25 + 0.25, -0.25 + Math.sin(angle) * 0.25]);
      }

      for (let i = 0; i < particleCount; i++) {
        const point = letterPoints[i % letterPoints.length];
        positions[i * 3] = point[0] + (Math.random() - 0.5) * 0.05;
        positions[i * 3 + 1] = point[1] + (Math.random() - 0.5) * 0.05;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
      }
      return positions;
    }

    // Create shapes
    const shapes = [createArrowShape(), createChaosShape(), createFNBShape()];

    // Create particles
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(shapes[0].slice(), 3));
    geometry.setAttribute("targetPosition", new THREE.BufferAttribute(shapes[0].slice(), 3));

    const sizes = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      sizes[i] = 0.02 + Math.random() * 0.02;
    }
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Custom shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMorphProgress: { value: 0 },
      },
      vertexShader: `
        attribute vec3 targetPosition;
        attribute float size;
        uniform float uTime;
        uniform float uMorphProgress;
        varying float vAlpha;
        
        void main() {
          vec3 pos = mix(position, targetPosition, uMorphProgress);
          pos += sin(uTime * 2.0 + position.x * 5.0) * 0.02;
          pos += cos(uTime * 1.5 + position.y * 5.0) * 0.02;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
          
          vAlpha = 0.6 + sin(uTime * 3.0 + position.x * 10.0) * 0.4;
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Lines connecting particles
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * 6);
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // State
    const state = {
      scene,
      camera,
      renderer,
      points,
      morphProgress: 0,
      currentShape: 0,
      targetShape: 0,
      autoMorphTimer: 0,
      mouse: new THREE.Vector2(),
      tiltX: 0,
      tiltY: 0,
      scrollTilt: 0,
      animationId: 0,
    };
    sceneRef.current = state;

    // Update lines
    function updateLines() {
      const positions = geometry.attributes.position.array as Float32Array;
      const linePos = lineGeometry.attributes.position.array as Float32Array;
      let lineIndex = 0;

      for (let i = 0; i < Math.min(particleCount, 100); i++) {
        const i1 = Math.floor(Math.random() * particleCount);
        const i2 = Math.floor(Math.random() * particleCount);

        const dx = positions[i1 * 3] - positions[i2 * 3];
        const dy = positions[i1 * 3 + 1] - positions[i2 * 3 + 1];
        const dz = positions[i1 * 3 + 2] - positions[i2 * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 0.4 && lineIndex < linePositions.length - 6) {
          linePos[lineIndex++] = positions[i1 * 3];
          linePos[lineIndex++] = positions[i1 * 3 + 1];
          linePos[lineIndex++] = positions[i1 * 3 + 2];
          linePos[lineIndex++] = positions[i2 * 3];
          linePos[lineIndex++] = positions[i2 * 3 + 1];
          linePos[lineIndex++] = positions[i2 * 3 + 2];
        }
      }

      lineGeometry.attributes.position.needsUpdate = true;
    }

    // Morph to shape
    function morphToShape(shapeIndex: number) {
      state.targetShape = shapeIndex;
      const targetPositions = shapes[shapeIndex];
      geometry.setAttribute("targetPosition", new THREE.BufferAttribute(targetPositions.slice(), 3));
    }

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      state.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      state.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    // Scroll handler
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      state.scrollTilt = (scrollY / maxScroll) * 0.5;
    };

    // Animation loop
    let time = 0;
    function animate() {
      state.animationId = requestAnimationFrame(animate);
      time += 0.016;

      // Update uniforms
      (material.uniforms.uTime as { value: number }).value = time;

      // Smooth morph
      if (state.currentShape !== state.targetShape) {
        state.morphProgress += 0.02;
        if (state.morphProgress >= 1) {
          state.morphProgress = 0;
          state.currentShape = state.targetShape;
          const currentPos = geometry.attributes.position.array as Float32Array;
          const targetPos = geometry.attributes.targetPosition.array as Float32Array;
          for (let i = 0; i < currentPos.length; i++) {
            currentPos[i] = targetPos[i];
          }
          geometry.attributes.position.needsUpdate = true;
        }
      }
      (material.uniforms.uMorphProgress as { value: number }).value = state.morphProgress;

      // Auto morph timer
      state.autoMorphTimer += 0.016;
      if (state.autoMorphTimer > 3) {
        state.autoMorphTimer = 0;
        const nextShape = (state.targetShape + 1) % 3;
        morphToShape(nextShape);
      }

      // Mouse tilt
      state.tiltX += (state.mouse.y * 0.3 - state.tiltX) * 0.05;
      state.tiltY += (state.mouse.x * 0.3 - state.tiltY) * 0.05;

      points.rotation.x = state.tiltX + state.scrollTilt;
      points.rotation.y = state.tiltY + time * 0.1;
      lines.rotation.x = state.tiltX + state.scrollTilt;
      lines.rotation.y = state.tiltY + time * 0.1;

      updateLines();
      renderer.render(scene, camera);
    }

    animate();

    // Event listeners
    container.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    // Resize handler
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(state.animationId);
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto"
    />
  );
};

export default MorphingLogo;
