import { useEffect, useRef } from "react";
import * as THREE from "three";

const MorphingLogo = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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
    const particleCount = 1200;

    // Create chaos shape with continuous movement
    function createChaosShape(): Float32Array {
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const r = 0.3 + Math.random() * 1.2;

        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }
      return positions;
    }

    // Only chaos shape
    const chaosPositions = createChaosShape();

    // Create particles
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(chaosPositions.slice(), 3));

    const sizes = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      sizes[i] = 0.015 + Math.random() * 0.025;
    }
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Custom shader material with enhanced movement and scroll-based spread
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSpread: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        uniform float uTime;
        uniform float uSpread;
        varying float vAlpha;
        
        void main() {
          vec3 pos = position;
          
          // Spread particles based on scroll
          float spreadFactor = 1.0 + uSpread * 8.0;
          pos *= spreadFactor;
          
          // Add more chaos when spread
          float chaosAmount = 0.08 + uSpread * 0.3;
          
          // Continuous chaotic movement
          pos.x += sin(uTime * 1.5 + position.y * 3.0 + position.z * 2.0) * chaosAmount;
          pos.y += cos(uTime * 1.2 + position.x * 3.0 + position.z * 2.5) * chaosAmount;
          pos.z += sin(uTime * 1.8 + position.x * 2.5 + position.y * 2.0) * chaosAmount;
          
          // Additional turbulence
          pos += sin(uTime * 2.5 + position * 4.0) * (0.03 + uSpread * 0.1);
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z) * (1.0 + uSpread * 0.5);
          gl_Position = projectionMatrix * mvPosition;
          
          vAlpha = (0.6 + sin(uTime * 3.0 + position.x * 10.0) * 0.4) * (1.0 - uSpread * 0.3);
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
      opacity: 0.1,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // State
    let targetRotationX = 0;
    let targetRotationY = 0;
    let scrollSpread = 0;
    let animationId = 0;

    // Update lines based on spread
    function updateLines() {
      const positions = geometry.attributes.position.array as Float32Array;
      const linePos = lineGeometry.attributes.position.array as Float32Array;
      let lineIndex = 0;

      const connectionDistance = 0.5 + scrollSpread * 2;

      for (let i = 0; i < Math.min(particleCount, 150); i++) {
        const i1 = Math.floor(Math.random() * particleCount);
        const i2 = Math.floor(Math.random() * particleCount);

        const dx = positions[i1 * 3] - positions[i2 * 3];
        const dy = positions[i1 * 3 + 1] - positions[i2 * 3 + 1];
        const dz = positions[i1 * 3 + 2] - positions[i2 * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < connectionDistance && lineIndex < linePositions.length - 6) {
          linePos[lineIndex++] = positions[i1 * 3];
          linePos[lineIndex++] = positions[i1 * 3 + 1];
          linePos[lineIndex++] = positions[i1 * 3 + 2];
          linePos[lineIndex++] = positions[i2 * 3];
          linePos[lineIndex++] = positions[i2 * 3 + 1];
          linePos[lineIndex++] = positions[i2 * 3 + 2];
        }
      }

      lineGeometry.attributes.position.needsUpdate = true;
      lineMaterial.opacity = 0.1 * (1 - scrollSpread * 0.7);
    }

    // Global mouse move
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      targetRotationY = Math.atan2(deltaX, 500) * 2;
      targetRotationX = Math.atan2(-deltaY, 500) * 2;
    };

    // Scroll handler - spread particles
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 800; // Spread fully within first 800px of scroll
      scrollSpread = Math.min(scrollY / maxScroll, 1);
    };

    // Animation loop
    let time = 0;
    function animate() {
      animationId = requestAnimationFrame(animate);
      time += 0.016;

      // Update uniforms
      (material.uniforms.uTime as { value: number }).value = time;
      (material.uniforms.uSpread as { value: number }).value = scrollSpread;

      // Smooth rotation towards target
      points.rotation.x += (targetRotationX - points.rotation.x) * 0.08;
      points.rotation.y += (targetRotationY - points.rotation.y) * 0.08;
      lines.rotation.x = points.rotation.x;
      lines.rotation.y = points.rotation.y;

      // Adjust camera based on spread
      camera.position.z = 4 + scrollSpread * 3;

      updateLines();
      renderer.render(scene, camera);
    }

    animate();

    // Event listeners
    window.addEventListener("mousemove", handleGlobalMouseMove);
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
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto"
    />
  );
};

export default MorphingLogo;
