import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Particles = ({ count = 50, color = '#57c5b6' }) => {
  const mesh = useRef();
  const light = useRef();

  // Generate random particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      const z = Math.random() * 2 - 1;

      temp.push({ time, factor, speed, x, y, z, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  // Create particle geometries
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particleGeometry = useMemo(() => new THREE.IcosahedronGeometry(1, 0), []);

  // Animation loop
  useFrame((state) => {
    if (mesh.current) {
      particles.forEach((particle, i) => {
        let { time, factor, speed, x, y, z } = particle;

        // Update particle position with time
        time = particle.time += speed / 2;
        const s = Math.cos(time) + 2;
        
        dummy.position.set(
          x + Math.sin((time / 10) * factor) + (Math.sin(time * 1) * factor) / 10,
          y + Math.cos((time / 10) * factor) + (Math.cos(time * 2) * factor) / 10,
          z + Math.cos((time / 10) * factor) + (Math.cos(time * 3) * factor) / 10
        );
        
        dummy.scale.set(s, s, s);
        dummy.rotation.set(s * 5, s * 5, s * 5);
        dummy.updateMatrix();
        
        mesh.current.setMatrixAt(i, dummy.matrix);
      });
      
      mesh.current.instanceMatrix.needsUpdate = true;
    }

    // Move the light
    if (light.current) {
      const time = state.clock.getElapsedTime();
      light.current.position.x = Math.sin(time) * 3;
      light.current.position.y = Math.cos(time) * 3;
    }
  });

  return (
    <>
      <pointLight ref={light} distance={15} intensity={5} color={color} />
      <instancedMesh ref={mesh} args={[particleGeometry, null, count]}>
        <meshPhongMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.7}
        />
      </instancedMesh>
    </>
  );
};

export default Particles;
