import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Sparkles, Flame, Eye, ChevronRight } from 'lucide-react';
import { BurgerLayerInfo } from '../types';

const LAYERS_INFO: BurgerLayerInfo[] = [
  {
    id: 'top-bun',
    name: 'Artisan Brioche Crown',
    category: 'The Crown',
    description: 'Baked fresh at 5:00 AM every morning with French cultured butter and speckled with toasted ivory sesame seeds.',
    yOffset: 3.4,
    color: '#e39a3c',
    calories: '160 kcal',
    origin: 'Artisanal Bakery, Daily Delivery'
  },
  {
    id: 'sauce',
    name: 'Secret Blaze Aioli Drizzle',
    category: 'Signature Glaze',
    description: 'Smoked chipotle peppers, garlic confit, Meyer lemon zest, and cold-pressed extra virgin olive oil emulsion.',
    yOffset: 2.3,
    color: '#E63B2E',
    calories: '65 kcal',
    origin: 'Scratch-Made In House'
  },
  {
    id: 'tomato',
    name: 'Vine-Ripened Heirloom Tomatoes',
    category: 'Garden Fresh',
    description: 'Plump beefsteak heirloom tomatoes, thick-cut and lightly seasoned with cracked sea salt and fresh thyme.',
    yOffset: 1.2,
    color: '#ef4444',
    calories: '22 kcal',
    origin: 'Valley Ridge Hydroponics'
  },
  {
    id: 'lettuce',
    name: 'Crisp Hydroponic Butter Leaf',
    category: 'Crisp Greens',
    description: 'Harvested with living roots intact to ensure maximum acoustic crunch and natural sweetness in every bite.',
    yOffset: 0.1,
    color: '#22c55e',
    calories: '10 kcal',
    origin: 'Local Greenhouse Co-Op'
  },
  {
    id: 'cheese',
    name: 'Melted 18-Month Aged Cheddar',
    category: 'Artisan Dairy',
    description: 'Sharp Wisconsin white and yellow cheddar blend, torch-melted directly over the flaming patty for rich creaminess.',
    yOffset: -1.1,
    color: '#F5A623',
    calories: '140 kcal',
    origin: 'Wisconsin Artisanal Creamery'
  },
  {
    id: 'patty',
    name: 'Prime Flame-Seared Angus Patty',
    category: 'The Heart',
    description: 'Coarse 75/25 butcher blend of brisket and chuck seared at 500°F on cast iron with our 12-spice proprietary crust.',
    yOffset: -2.3,
    color: '#422016',
    calories: '320 kcal',
    origin: '100% Grass-Fed Black Angus'
  },
  {
    id: 'bottom-bun',
    name: 'Double-Toasted Foundation Bun',
    category: 'The Base',
    description: 'Thick, pillow-soft heel grilled with clarified garlic herb butter to prevent juice absorption and maintain structure.',
    yOffset: -3.4,
    color: '#c27828',
    calories: '150 kcal',
    origin: 'Artisanal Bakery, Daily Delivery'
  }
];

export const BurgerCustomizer3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Unstack progress: 0 (assembled) to 1 (fully exploded)
  const [unstackProgress, setUnstackProgress] = useState(0.5);
  const [selectedLayerIndex, setSelectedLayerIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const burgerGroupRef = useRef<THREE.Group | null>(null);
  const layerMeshesRef = useRef<THREE.Object3D[]>([]);

  // Drag interaction states
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0.2, y: 0.4 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check if WebGL is supported in current browser/sandbox environment
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false,
      });
    } catch {
      setHasWebGL(false);
      return;
    }

    setHasWebGL(true);

    // 1. Setup Scene, Camera, Renderer
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 550;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 14);
    cameraRef.current = camera;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup (Cinematic warmth)
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(8, 12, 10);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xE63B2E, 3.5);
    rimLight.position.set(-10, -5, -8);
    scene.add(rimLight);

    const warmFill = new THREE.PointLight(0xF5A623, 2.8, 25);
    warmFill.position.set(0, 4, 6);
    scene.add(warmFill);

    // 3. Create 3D Burger Stack
    const burgerGroup = new THREE.Group();
    burgerGroupRef.current = burgerGroup;
    scene.add(burgerGroup);

    layerMeshesRef.current = [];

    // Helper: Top Bun
    const topBunGroup = new THREE.Group();
    const bunGeo = new THREE.SphereGeometry(3.2, 48, 28, 0, Math.PI * 2, 0, Math.PI * 0.48);
    const bunMat = new THREE.MeshStandardMaterial({
      color: 0xdf8f35,
      roughness: 0.38,
      metalness: 0.08,
    });
    const bunMesh = new THREE.Mesh(bunGeo, bunMat);
    bunMesh.castShadow = true;
    bunMesh.receiveShadow = true;
    bunMesh.scale.set(1, 0.65, 1);
    topBunGroup.add(bunMesh);

    // Sesame Seeds on Crown
    const seedGeo = new THREE.ConeGeometry(0.06, 0.14, 6);
    const seedMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.5 });
    for (let i = 0; i < 45; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.35;
      const r = 3.18;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = (r * Math.cos(phi) * 0.65);
      const z = r * Math.sin(phi) * Math.sin(theta);

      const seed = new THREE.Mesh(seedGeo, seedMat);
      seed.position.set(x, y, z);
      seed.rotation.set(Math.random(), Math.random(), Math.random());
      topBunGroup.add(seed);
    }
    burgerGroup.add(topBunGroup);
    layerMeshesRef.current.push(topBunGroup);

    // Layer 2: Blaze Sauce
    const sauceGroup = new THREE.Group();
    const sauceGeo = new THREE.TorusGeometry(2.4, 0.28, 16, 48);
    const sauceMat = new THREE.MeshStandardMaterial({
      color: 0xdd2c1f,
      roughness: 0.15,
      metalness: 0.2,
    });
    const sauceMesh = new THREE.Mesh(sauceGeo, sauceMat);
    sauceMesh.rotation.x = Math.PI / 2;
    sauceMesh.scale.set(1.1, 1.1, 0.8);
    sauceGroup.add(sauceMesh);
    burgerGroup.add(sauceGroup);
    layerMeshesRef.current.push(sauceGroup);

    // Layer 3: Heirloom Tomatoes
    const tomatoGroup = new THREE.Group();
    const tomatoMat = new THREE.MeshStandardMaterial({
      color: 0xef233c,
      roughness: 0.25,
      metalness: 0.1,
    });
    const tomato1 = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 0.3, 32), tomatoMat);
    tomato1.position.set(-0.8, 0, 0.4);
    tomato1.rotation.z = 0.08;
    tomato1.castShadow = true;
    tomatoGroup.add(tomato1);

    const tomato2 = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 0.3, 32), tomatoMat);
    tomato2.position.set(0.9, 0, -0.3);
    tomato2.rotation.z = -0.06;
    tomato2.castShadow = true;
    tomatoGroup.add(tomato2);
    burgerGroup.add(tomatoGroup);
    layerMeshesRef.current.push(tomatoGroup);

    // Layer 4: Ruffled Lettuce Leaf
    const lettuceGroup = new THREE.Group();
    const lettuceGeo = new THREE.CylinderGeometry(3.1, 3.4, 0.15, 48, 8);
    const pos = lettuceGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vz = pos.getZ(i);
      const dist = Math.sqrt(vx * vx + vz * vz);
      if (dist > 1.2) {
        const wave = Math.sin(vx * 4.5) * Math.cos(vz * 4.5) * 0.22;
        pos.setY(i, pos.getY(i) + wave);
      }
    }
    lettuceGeo.computeVertexNormals();
    const lettuceMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      roughness: 0.45,
      metalness: 0.05,
      side: THREE.DoubleSide
    });
    const lettuceMesh = new THREE.Mesh(lettuceGeo, lettuceMat);
    lettuceMesh.castShadow = true;
    lettuceGroup.add(lettuceMesh);
    burgerGroup.add(lettuceGroup);
    layerMeshesRef.current.push(lettuceGroup);

    // Layer 5: Melted Cheddar Cheese
    const cheeseGroup = new THREE.Group();
    const cheeseShape = new THREE.BoxGeometry(3.6, 0.18, 3.6);
    const cheeseMat = new THREE.MeshStandardMaterial({
      color: 0xffa200,
      roughness: 0.3,
      metalness: 0.1,
    });
    const cheeseMesh = new THREE.Mesh(cheeseShape, cheeseMat);
    cheeseMesh.rotation.y = Math.PI / 4;
    cheeseMesh.castShadow = true;
    cheeseGroup.add(cheeseMesh);

    for (let i = 0; i < 4; i++) {
      const dripGeo = new THREE.ConeGeometry(0.3, 0.7, 8);
      const drip = new THREE.Mesh(dripGeo, cheeseMat);
      const angle = (i * Math.PI) / 2 + Math.PI / 4;
      drip.position.set(Math.cos(angle) * 2.5, -0.3, Math.sin(angle) * 2.5);
      drip.rotation.x = Math.PI;
      cheeseGroup.add(drip);
    }
    burgerGroup.add(cheeseGroup);
    layerMeshesRef.current.push(cheeseGroup);

    // Layer 6: Seared Angus Beef Patty
    const pattyGroup = new THREE.Group();
    const pattyGeo = new THREE.CylinderGeometry(3.0, 3.1, 0.9, 36);
    const pattyMat = new THREE.MeshStandardMaterial({
      color: 0x3d1f14,
      roughness: 0.85,
      metalness: 0.15,
    });
    const pattyMesh = new THREE.Mesh(pattyGeo, pattyMat);
    pattyMesh.castShadow = true;
    pattyMesh.receiveShadow = true;
    pattyGroup.add(pattyMesh);
    burgerGroup.add(pattyGroup);
    layerMeshesRef.current.push(pattyGroup);

    // Layer 7: Bottom Brioche Bun
    const bottomBunGroup = new THREE.Group();
    const bottomGeo = new THREE.CylinderGeometry(3.0, 2.7, 0.85, 36);
    const bottomMat = new THREE.MeshStandardMaterial({
      color: 0xbf711d,
      roughness: 0.45,
      metalness: 0.05,
    });
    const bottomMesh = new THREE.Mesh(bottomGeo, bottomMat);
    bottomMesh.castShadow = true;
    bottomMesh.receiveShadow = true;
    bottomBunGroup.add(bottomMesh);
    burgerGroup.add(bottomBunGroup);
    layerMeshesRef.current.push(bottomBunGroup);

    // 4. Mouse / Touch drag controls
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - prevMouseRef.current.x;
      const deltaY = e.clientY - prevMouseRef.current.y;
      rotationRef.current.y += deltaX * 0.01;
      rotationRef.current.x += deltaY * 0.008;
      rotationRef.current.x = Math.max(-0.6, Math.min(0.6, rotationRef.current.x));
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // 5. Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (burgerGroupRef.current) {
        if (autoRotate && !isDraggingRef.current) {
          rotationRef.current.y += 0.005;
        }
        burgerGroupRef.current.rotation.y = rotationRef.current.y;
        burgerGroupRef.current.rotation.x = rotationRef.current.x;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 6. Resize listener
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Update Y offsets whenever unstackProgress changes (when Three.js is active)
  useEffect(() => {
    if (!hasWebGL) return;
    const compactOffsets = [1.2, 0.75, 0.45, 0.15, -0.15, -0.7, -1.35];

    layerMeshesRef.current.forEach((mesh, index) => {
      const layerData = LAYERS_INFO[index];
      if (!layerData || !mesh) return;

      const targetY = THREE.MathUtils.lerp(
        compactOffsets[index],
        layerData.yOffset,
        unstackProgress
      );

      mesh.position.y = targetY;

      if (index === selectedLayerIndex && unstackProgress > 0.2) {
        mesh.scale.set(1.05, 1.05, 1.05);
      } else {
        mesh.scale.set(1, 1, 1);
      }
    });
  }, [unstackProgress, selectedLayerIndex, hasWebGL]);

  // Connect scroll to unstack progress
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const totalDistance = windowHeight + rect.height;
        const currentDistance = windowHeight - rect.top;
        const progress = Math.max(0, Math.min(1, currentDistance / totalDistance));
        setUnstackProgress(progress);

        const layerIdx = Math.min(
          LAYERS_INFO.length - 1,
          Math.floor(progress * LAYERS_INFO.length)
        );
        setSelectedLayerIndex(layerIdx);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeLayer = LAYERS_INFO[selectedLayerIndex] || LAYERS_INFO[0];

  return (
    <section ref={sectionRef} id="craft-3d" className="py-28 bg-[#110e0c] relative overflow-hidden">
      {/* Background illumination */}
      <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-[#E63B2E]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#F5A623]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#F5A623] uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-[#F5A623]" />
            <span>Interactive 3D Architectural Anatomy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
            Deconstruct the Blaze
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Scroll or drag to unstack the layers. Explore the microscopic craftsmanship behind every ingredient of our flagship flame smash.
          </p>
        </div>

        {/* 3D Visualizer & Interactive Callout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left / Center: 3D Viewport or High-Fidelity 3D Isometric CSS Stack Fallback */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Canvas Box */}
            <div className="relative w-full h-[480px] sm:h-[540px] rounded-3xl bg-radial from-[#1e1814] via-[#14100e] to-[#0c0a09] border border-white/10 shadow-2xl overflow-hidden flex items-center justify-center">
              {hasWebGL ? (
                /* Three.js DOM container */
                <div
                  ref={mountRef}
                  className="w-full h-full cursor-grab active:cursor-grabbing"
                  title="Click and drag to rotate 3D burger"
                />
              ) : (
                /* High-fidelity CSS 3D Isometric Exploded View when WebGL is disabled in sandbox */
                <div className="w-full h-full flex items-center justify-center relative perspective-[1200px] overflow-hidden select-none">
                  <div
                    className="relative w-72 h-80 flex flex-col items-center justify-center transform-gpu transition-transform duration-300"
                    style={{
                      transform: `rotateX(18deg) rotateY(-18deg) rotateZ(2deg)`,
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Unstacked CSS 3D Layers */}
                    {LAYERS_INFO.map((layer, idx) => {
                      const explosionSpread = (unstackProgress - 0.5) * 60;
                      const yTranslate = (idx - 3) * (38 + explosionSpread);
                      const isCurrent = idx === selectedLayerIndex;

                      return (
                        <motion.div
                          key={layer.id}
                          animate={{
                            y: yTranslate,
                            scale: isCurrent ? 1.08 : 1,
                          }}
                          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                          onClick={() => setSelectedLayerIndex(idx)}
                          className={`absolute w-60 py-3 px-4 rounded-2xl flex items-center justify-between border cursor-pointer shadow-2xl transition-all ${
                            isCurrent
                              ? 'border-[#E63B2E] bg-[#221b17] shadow-[#E63B2E]/30 scale-105 z-20'
                              : 'border-white/10 bg-[#161210]/95 hover:border-white/30 z-10'
                          }`}
                          style={{
                            boxShadow: isCurrent
                              ? '0 12px 30px rgba(230, 59, 46, 0.35)'
                              : '0 8px 20px rgba(0, 0, 0, 0.6)',
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className="w-4 h-4 rounded-full shadow-sm shrink-0"
                              style={{ backgroundColor: layer.color }}
                            />
                            <div className="text-left">
                              <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                                0{idx + 1} • {layer.category}
                              </span>
                              <span className="text-xs font-bold text-white font-display">
                                {layer.name}
                              </span>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono text-[#F5A623] font-bold">
                            {layer.calories}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Viewport Floating Controls */}
              <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
                <span className="text-[11px] font-mono uppercase bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-zinc-300 border border-white/10 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-[#F5A623]" />
                  <span>{hasWebGL ? '3D Interactive' : '3D Isometric'}</span>
                </span>
                {hasWebGL && (
                  <button
                    onClick={() => setAutoRotate(!autoRotate)}
                    className={`text-[11px] font-mono uppercase px-2.5 py-1 rounded-md border transition-colors ${
                      autoRotate
                        ? 'bg-[#E63B2E]/20 text-[#E63B2E] border-[#E63B2E]/40'
                        : 'bg-black/60 text-zinc-400 border-white/10 hover:text-white'
                    }`}
                  >
                    {autoRotate ? 'Auto-Rotate ON' : 'Auto-Rotate OFF'}
                  </button>
                )}
              </div>

              {/* Instructions Pill */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-zinc-400 font-mono pointer-events-none">
                <span className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                  {hasWebGL ? 'Drag to rotate • Scroll to unstack' : 'Click layers • Scroll to unstack'}
                </span>
                <span className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 tabular-nums">
                  Exploded: {Math.round(unstackProgress * 100)}%
                </span>
              </div>
            </div>

            {/* Manual Scrub Slider & Quick Toggle */}
            <div className="w-full mt-6 bg-[#181412] p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Layers className="w-5 h-5 text-[#F5A623] shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 whitespace-nowrap">
                  Unstack Slider
                </span>
              </div>

              <div className="flex-1 w-full flex items-center gap-3">
                <span className="text-[11px] text-zinc-500 font-mono">Compact</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={unstackProgress}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setUnstackProgress(val);
                    const idx = Math.min(
                      LAYERS_INFO.length - 1,
                      Math.floor(val * LAYERS_INFO.length)
                    );
                    setSelectedLayerIndex(idx);
                  }}
                  className="w-full accent-[#E63B2E] cursor-pointer h-2 bg-zinc-800 rounded-lg appearance-none"
                />
                <span className="text-[11px] text-[#F5A623] font-mono">Exploded</span>
              </div>

              <button
                onClick={() => {
                  const nextVal = unstackProgress > 0.5 ? 0.1 : 0.95;
                  setUnstackProgress(nextVal);
                }}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-wider text-zinc-200 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
              >
                {unstackProgress > 0.5 ? 'Assemble' : 'Explode All'}
              </button>
            </div>
          </div>

          {/* Right Column: Layer Inspector & Detail Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Active Layer Detailed Card with Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-[#181412] rounded-3xl p-7 border border-[#E63B2E]/40 shadow-2xl shadow-[#E63B2E]/10 space-y-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F5A623]">
                    <Flame className="w-4 h-4 fill-[#F5A623]" />
                    <span>Layer 0{selectedLayerIndex + 1} of 07</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-zinc-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/10 tabular-nums">
                    {activeLayer.calories}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    {activeLayer.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black font-display text-white">
                    {activeLayer.name}
                  </h3>
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed">
                  {activeLayer.description}
                </p>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-mono uppercase text-zinc-500">Sourcing:</span>
                  <span className="font-medium text-white">{activeLayer.origin}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Clickable Quick Layer Selector List */}
            <div className="bg-[#14100e] rounded-2xl p-4 border border-white/10 space-y-1.5">
              <div className="px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-bold">
                Jump To Ingredient Layer:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {LAYERS_INFO.map((layer, index) => (
                  <button
                    key={layer.id}
                    onClick={() => {
                      setSelectedLayerIndex(index);
                      setUnstackProgress(0.75);
                    }}
                    className={`px-3 py-2 text-left rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                      selectedLayerIndex === index
                        ? 'bg-[#E63B2E] text-white shadow-md shadow-[#E63B2E]/30 font-bold'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="truncate">0{index + 1}. {layer.name.split(' ')[0]}</span>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${selectedLayerIndex === index ? 'opacity-100' : 'opacity-40'}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
