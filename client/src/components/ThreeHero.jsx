import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import './ThreeHero.css';

const ThreeHero = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const particlesRef = useRef(null);
  const geometryRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Create floating particles
    const particleCount = 150;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    // Kerala HSE colors
    const colorPalette = [
      new THREE.Color(0xe0284a), // Primary
      new THREE.Color(0x667eea), // Secondary
      new THREE.Color(0x764ba2), // Accent
      new THREE.Color(0xffffff), // White
    ];

    for (let i = 0; i < particleCount; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Color
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Size
      sizes[i] = Math.random() * 3 + 1;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometryRef.current = geometry;

    // Particle material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
      },
      vertexShader: `
        attribute float size;
        uniform float time;
        uniform float pixelRatio;
        varying vec3 vColor;

        void main() {
          vColor = color;
          
          vec3 pos = position;
          pos.x += sin(time * 0.5 + position.y * 0.1) * 0.5;
          pos.y += cos(time * 0.3 + position.x * 0.1) * 0.3;
          pos.z += sin(time * 0.7 + position.x * 0.1) * 0.2;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = size * pixelRatio * (300.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;

        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float strength = 0.05 / distanceToCenter - 0.1;
          
          gl_FragColor = vec4(vColor, strength);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    // Create floating geometric shapes
    const shapes = [];
    const shapeGeometries = [
      new THREE.TetrahedronGeometry(0.3),
      new THREE.OctahedronGeometry(0.25),
      new THREE.IcosahedronGeometry(0.2),
    ];

    for (let i = 0; i < 8; i++) {
      const geometry = shapeGeometries[Math.floor(Math.random() * shapeGeometries.length)];
      const material = new THREE.MeshBasicMaterial({
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        transparent: true,
        opacity: 0.6,
        wireframe: true
      });
      
      const shape = new THREE.Mesh(geometry, material);
      shape.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4
      );
      
      shape.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      scene.add(shape);
      shapes.push(shape);
    }

    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Update particle shader time
      if (particles.material.uniforms) {
        particles.material.uniforms.time.value = elapsedTime;
      }
      
      // Rotate particles
      particles.rotation.y = elapsedTime * 0.1;
      particles.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1;
      
      // Animate shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.01 * (index + 1);
        shape.rotation.y += 0.015 * (index + 1);
        shape.position.y += Math.sin(elapsedTime + index) * 0.002;
      });
      
      // Camera movement
      camera.position.x = Math.sin(elapsedTime * 0.1) * 0.5;
      camera.position.y = Math.cos(elapsedTime * 0.15) * 0.3;
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // GSAP entrance animations
    gsap.fromTo(particles.rotation, 
      { y: -Math.PI },
      { y: 0, duration: 2, ease: "power2.out" }
    );

    gsap.fromTo(particles.scale,
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 1, z: 1, duration: 1.5, ease: "back.out(1.7)" }
    );

    shapes.forEach((shape, index) => {
      gsap.fromTo(shape.scale,
        { x: 0, y: 0, z: 0 },
        { 
          x: 1, y: 1, z: 1, 
          duration: 1, 
          delay: index * 0.1,
          ease: "elastic.out(1, 0.5)" 
        }
      );
    });

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event) => {
      if (!mountRef.current) return;
      
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Subtle camera movement based on mouse
      gsap.to(camera.position, {
        x: mouse.x * 0.5,
        y: mouse.y * 0.3,
        duration: 1,
        ease: "power2.out"
      });
    };

    mountRef.current.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeEventListener('mousemove', handleMouseMove);
        if (renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }
      
      // Dispose of Three.js objects
      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (renderer) renderer.dispose();
      
      shapes.forEach(shape => {
        if (shape.geometry) shape.geometry.dispose();
        if (shape.material) shape.material.dispose();
      });
    };
  }, []);

  return <div ref={mountRef} className="three-hero" />;
};

export default ThreeHero;
