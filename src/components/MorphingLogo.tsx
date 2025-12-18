import { useEffect, useRef } from "react";
import * as THREE from "three";

const MorphingLogo = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Use viewport dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Increased particle count for full screen coverage
    const particleCount = 4000;

    // Create chaos shape with continuous movement
    function createChaosShape(): Float32Array {
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const r = 0.3 + Math.random() * 1.8;

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
      sizes[i] = 0.01 + Math.random() * 0.025;
    }
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Custom shader material with mouse attraction
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSpread: { value: 0 },
        uAspect: { value: width / height },
        uMouse: { value: new THREE.Vector3(0, 0, 0) },
        uAttraction: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        uniform float uTime;
        uniform float uSpread;
        uniform float uAspect;
        uniform vec3 uMouse;
        uniform float uAttraction;
        varying float vAlpha;
        
        void main() {
          vec3 pos = position;
          
          // Massive spread to cover entire viewport
          float spreadFactor = 1.0 + uSpread * 25.0;
          pos *= spreadFactor;
          
          // Spread horizontally more based on aspect ratio
          pos.x *= 1.0 + uSpread * uAspect * 0.5;
          
          // Add more chaos when spread
          float chaosAmount = 0.08 + uSpread * 0.5;
          
          // Continuous chaotic movement
          pos.x += sin(uTime * 1.5 + position.y * 3.0 + position.z * 2.0) * chaosAmount;
          pos.y += cos(uTime * 1.2 + position.x * 3.0 + position.z * 2.5) * chaosAmount;
          pos.z += sin(uTime * 1.8 + position.x * 2.5 + position.y * 2.0) * chaosAmount;
          
          // Additional turbulence
          pos += sin(uTime * 2.5 + position * 4.0) * (0.03 + uSpread * 0.15);
          
          // Mouse attraction
          if (uAttraction > 0.0) {
            vec3 toMouse = uMouse - pos;
            float dist = length(toMouse);
            float attractionStrength = uAttraction * 2.0 / (1.0 + dist * 0.5);
            pos += normalize(toMouse) * attractionStrength * 0.3;
          }
          
          // Subtle mouse hover attraction (always active)
          vec3 hoverToMouse = uMouse - pos;
          float hoverDist = length(hoverToMouse);
          if (hoverDist < 8.0) {
            float hoverStrength = (1.0 - hoverDist / 8.0) * 0.15;
            pos += normalize(hoverToMouse) * hoverStrength;
          }
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z) * (1.0 + uSpread * 0.3 + uAttraction * 0.2);
          gl_Position = projectionMatrix * mvPosition;
          
          vAlpha = (0.6 + sin(uTime * 3.0 + position.x * 10.0) * 0.4) * (1.0 - uSpread * 0.2);
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
      opacity: 0.08,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // State
    let targetRotationX = 0;
    let targetRotationY = 0;
    let scrollSpread = 0;
    let animationId = 0;
    let mouseX = 0;
    let mouseY = 0;
    let isMouseDown = false;
    let attractionStrength = 0;

    // Update lines based on spread
    function updateLines() {
      const positions = geometry.attributes.position.array as Float32Array;
      const linePos = lineGeometry.attributes.position.array as Float32Array;
      let lineIndex = 0;

      const connectionDistance = 0.5 + scrollSpread * 3;

      for (let i = 0; i < Math.min(particleCount, 250); i++) {
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
      lineMaterial.opacity = 0.08 * (1 - scrollSpread * 0.7);
    }

    // Convert screen coordinates to 3D world position
    function screenToWorld(screenX: number, screenY: number): THREE.Vector3 {
      const vector = new THREE.Vector3();
      vector.x = (screenX / window.innerWidth) * 2 - 1;
      vector.y = -(screenY / window.innerHeight) * 2 + 1;
      vector.z = 0.5;
      
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));
      
      return pos;
    }

    // Global mouse move
    const handleGlobalMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      targetRotationY = Math.atan2(deltaX, 500) * 1.5;
      targetRotationX = Math.atan2(-deltaY, 500) * 1.5;
    };

    // Mouse down/up handlers
    const handleMouseDown = () => {
      isMouseDown = true;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    // Scroll handler - spread particles
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 600;
      scrollSpread = Math.min(scrollY / maxScroll, 1);
    };

    // Animation loop
    let time = 0;
    function animate() {
      animationId = requestAnimationFrame(animate);
      time += 0.016;

      // Update attraction strength smoothly
      if (isMouseDown) {
        attractionStrength = Math.min(attractionStrength + 0.03, 1.5);
      } else {
        attractionStrength = Math.max(attractionStrength - 0.05, 0);
      }

      // Convert mouse to world position
      const mouseWorld = screenToWorld(mouseX, mouseY);

      // Update uniforms
      (material.uniforms.uTime as { value: number }).value = time;
      (material.uniforms.uSpread as { value: number }).value = scrollSpread;
      (material.uniforms.uMouse as { value: THREE.Vector3 }).value.copy(mouseWorld);
      (material.uniforms.uAttraction as { value: number }).value = attractionStrength;

      // Smooth rotation towards target
      points.rotation.x += (targetRotationX - points.rotation.x) * 0.06;
      points.rotation.y += (targetRotationY - points.rotation.y) * 0.06;
      lines.rotation.x = points.rotation.x;
      lines.rotation.y = points.rotation.y;

      // Adjust camera based on spread - zoom out more
      camera.position.z = 5 + scrollSpread * 8;

      updateLines();
      renderer.render(scene, camera);
    }

    animate();

    // Event listeners
    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("scroll", handleScroll);

    // Resize handler
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      (material.uniforms.uAspect as { value: number }).value = newWidth / newHeight;
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
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
      className="fixed inset-0 w-screen h-screen pointer-events-auto z-0"
    />
  );
};

export default MorphingLogo;
