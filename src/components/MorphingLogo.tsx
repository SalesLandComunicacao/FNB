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

    // Custom shader material with enhanced movement
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        uniform float uTime;
        varying float vAlpha;
        
        void main() {
          vec3 pos = position;
          
          // Continuous chaotic movement
          pos.x += sin(uTime * 1.5 + position.y * 3.0 + position.z * 2.0) * 0.08;
          pos.y += cos(uTime * 1.2 + position.x * 3.0 + position.z * 2.5) * 0.08;
          pos.z += sin(uTime * 1.8 + position.x * 2.5 + position.y * 2.0) * 0.08;
          
          // Additional turbulence
          pos += sin(uTime * 2.5 + position * 4.0) * 0.03;
          
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
      opacity: 0.1,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // State
    let targetRotationX = 0;
    let targetRotationY = 0;
    let scrollTilt = 0;
    let animationId = 0;

    // Update lines
    function updateLines() {
      const positions = geometry.attributes.position.array as Float32Array;
      const linePos = lineGeometry.attributes.position.array as Float32Array;
      let lineIndex = 0;

      for (let i = 0; i < Math.min(particleCount, 150); i++) {
        const i1 = Math.floor(Math.random() * particleCount);
        const i2 = Math.floor(Math.random() * particleCount);

        const dx = positions[i1 * 3] - positions[i2 * 3];
        const dy = positions[i1 * 3 + 1] - positions[i2 * 3 + 1];
        const dz = positions[i1 * 3 + 2] - positions[i2 * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 0.5 && lineIndex < linePositions.length - 6) {
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

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Arrow looks at cursor - calculate angle
      targetRotationY = mouseX * 1.2;
      targetRotationX = mouseY * 0.8;
    };

    // Global mouse move for when cursor is outside container
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      // Calculate angle to point arrow at cursor
      targetRotationY = Math.atan2(deltaX, 500) * 2;
      targetRotationX = Math.atan2(-deltaY, 500) * 2;
    };

    // Scroll handler
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollTilt = (scrollY / Math.max(maxScroll, 1)) * 0.8;
    };

    // Animation loop
    let time = 0;
    function animate() {
      animationId = requestAnimationFrame(animate);
      time += 0.016;

      // Update uniforms
      (material.uniforms.uTime as { value: number }).value = time;

      // Smooth rotation towards target (arrow following cursor)
      points.rotation.x += (targetRotationX + scrollTilt - points.rotation.x) * 0.08;
      points.rotation.y += (targetRotationY - points.rotation.y) * 0.08;
      lines.rotation.x = points.rotation.x;
      lines.rotation.y = points.rotation.y;

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
