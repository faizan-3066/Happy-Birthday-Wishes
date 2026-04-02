import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// 3D Cake Component
function Cake() {
  const cakeRef = useRef<THREE.Group>(null);
  const candleFlames = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (cakeRef.current) {
      cakeRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    if (candleFlames.current) {
      candleFlames.current.children.forEach((flame, i) => {
        flame.scale.y = 1 + Math.sin(state.clock.elapsedTime * 5 + i) * 0.2;
        flame.rotation.z = Math.sin(state.clock.elapsedTime * 3 + i) * 0.1;
      });
    }
  });

  const cakeMaterial = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: '#ffb6c1',
    roughness: 0.4,
    metalness: 0.1
  }), []);

  const frostingMaterial = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: '#fff0f5',
    roughness: 0.3,
    metalness: 0.05
  }), []);

  const candleMaterial = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: '#ff69b4',
    roughness: 0.2,
    emissive: '#ff1493',
    emissiveIntensity: 0.2
  }), []);

  const flameMaterial = useMemo(() => new THREE.MeshBasicMaterial({ 
    color: '#ffaa00',
    transparent: true,
    opacity: 0.9
  }), []);

  return (
    <group ref={cakeRef} position={[0, -1, 0]}>
      {/* Bottom Tier */}
      <mesh position={[0, 0, 0]} material={cakeMaterial}>
        <cylinderGeometry args={[2, 2, 1.5, 32]} />
      </mesh>
      
      {/* Bottom Frosting */}
      <mesh position={[0, 0.8, 0]} material={frostingMaterial}>
        <cylinderGeometry args={[2.1, 2.1, 0.3, 32]} />
      </mesh>
      
      {/* Middle Tier */}
      <mesh position={[0, 1.5, 0]} material={cakeMaterial}>
        <cylinderGeometry args={[1.5, 1.5, 1.2, 32]} />
      </mesh>
      
      {/* Middle Frosting */}
      <mesh position={[0, 2.2, 0]} material={frostingMaterial}>
        <cylinderGeometry args={[1.6, 1.6, 0.25, 32]} />
      </mesh>
      
      {/* Top Tier */}
      <mesh position={[0, 2.8, 0]} material={cakeMaterial}>
        <cylinderGeometry args={[1, 1, 1, 32]} />
      </mesh>
      
      {/* Top Frosting */}
      <mesh position={[0, 3.4, 0]} material={frostingMaterial}>
        <cylinderGeometry args={[1.05, 1.05, 0.2, 32]} />
      </mesh>

      {/* Candles */}
      {[[0, 3.7, 0], [-0.5, 3.6, 0.3], [0.5, 3.6, 0.3], [0, 3.6, -0.5]].map((pos, i) => (
        <group key={i}>
          <mesh position={pos as [number, number, number]} material={candleMaterial}>
            <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
          </mesh>
          {/* Flame */}
          <mesh 
            position={[pos[0], pos[1] + 0.5, pos[2]]} 
            material={flameMaterial}
          >
            <sphereGeometry args={[0.12, 16, 16]} />
          </mesh>
          {/* Flame glow */}
          <pointLight 
            position={[pos[0], pos[1] + 0.6, pos[2]]} 
            color="#ffaa00" 
            intensity={0.5} 
            distance={3}
          />
        </group>
      ))}

      {/* Cake glow */}
      <pointLight position={[0, 2, 2]} color="#ffb6c1" intensity={0.8} distance={8} />
    </group>
  );
}

// 3D Balloon Component
function Balloon({ color, position, delay = 0 }: { color: string; position: [number, number, number]; delay?: number }) {
  const balloonRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (balloonRef.current) {
      const time = state.clock.elapsedTime + delay;
      balloonRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.3;
      balloonRef.current.rotation.z = Math.sin(time * 0.5) * 0.05;
      balloonRef.current.rotation.x = Math.sin(time * 0.3) * 0.03;
    }
  });

  const balloonMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.1,
    metalness: 0.1,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    transparent: true,
    opacity: 0.95
  }), [color]);

  const stringPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 20; i++) {
      const t = i / 20;
      points.push(new THREE.Vector3(
        Math.sin(t * Math.PI * 2) * 0.1,
        -t * 3,
        Math.cos(t * Math.PI) * 0.05
      ));
    }
    return points;
  }, []);

  const stringGeometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(stringPoints), [stringPoints]);

  return (
    <group position={position}>
      <mesh ref={balloonRef} material={balloonMaterial}>
        <sphereGeometry args={[0.8, 32, 32]} />
      </mesh>
      {/* Balloon knot */}
      <mesh position={[0, -0.85, 0]} material={balloonMaterial}>
        <coneGeometry args={[0.15, 0.2, 16]} />
      </mesh>
      {/* String */}
      <primitive object={new THREE.Line(stringGeometry, new THREE.LineBasicMaterial({ color: '#ffffff', opacity: 0.5, transparent: true }))} />
    </group>
  );
}

// Floating Hearts
function FloatingHearts() {
  const heartsRef = useRef<THREE.Group>(null);
  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x + 0.25, y + 0.25);
    shape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    shape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
    shape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 0.95);
    shape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
    shape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
    shape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);
    return shape;
  }, []);

  const heartGeometry = useMemo(() => new THREE.ExtrudeGeometry(heartShape, {
    depth: 0.1,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 2,
    bevelSize: 0.02,
    bevelThickness: 0.02
  }), [heartShape]);

  useFrame((state) => {
    if (heartsRef.current) {
      heartsRef.current.children.forEach((heart, i) => {
        const time = state.clock.elapsedTime + i * 0.5;
        heart.position.y = Math.sin(time * 0.5) * 0.5 + 2;
        heart.rotation.y = time * 0.3;
        heart.scale.setScalar(0.3 + Math.sin(time * 0.8) * 0.05);
      });
    }
  });

  const heartColors = ['#ff6b9d', '#ff8fab', '#ffc2d1', '#fb6f92', '#ff85a1'];
  const positions: [number, number, number][] = [
    [-4, 2, -2], [4, 1, -1], [-3, 3, 1], [3.5, 2.5, 0], 
    [-5, 0, 0], [5, -1, -2], [-2, 4, -1], [2, 3, 1]
  ];

  return (
    <group ref={heartsRef}>
      {positions.map((pos, i) => (
        <mesh 
          key={i} 
          geometry={heartGeometry} 
          position={pos}
          material={new THREE.MeshStandardMaterial({ 
            color: heartColors[i % heartColors.length],
            emissive: heartColors[i % heartColors.length],
            emissiveIntensity: 0.3,
            roughness: 0.3,
            metalness: 0.2
          })}
        />
      ))}
    </group>
  );
}

// Main 3D Scene
export default function BirthdayScene() {
  return (
    <div className="w-full h-[60vh] md:h-[70vh]">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={0.8} color="#ffb6c1" />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#ff69b4" />
        
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0.5} fade speed={1} />
        
        <Sparkles 
          count={50} 
          scale={10} 
          size={3} 
          speed={0.5} 
          color="#ffd700"
        />
        
        <Cake />
        
        <Balloon color="#ff6b9d" position={[-3, 1, -1]} delay={0} />
        <Balloon color="#ffd700" position={[3, 0, -2]} delay={1} />
        <Balloon color="#ff85a1" position={[-2, -1, 1]} delay={2} />
        <Balloon color="#c77dff" position={[2.5, 1.5, 0]} delay={0.5} />
        <Balloon color="#ff006e" position={[-3.5, 2, -2]} delay={1.5} />
        <Balloon color="#ffb703" position={[3.5, -0.5, -1]} delay={2.5} />
        
        <FloatingHearts />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
}
