import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const shapes = [
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.SphereGeometry(0.8, 16, 16),
  new THREE.ConeGeometry(0.7, 1.5, 16),
  new THREE.TorusGeometry(0.7, 0.3, 16, 32),
  new THREE.OctahedronGeometry(0.8),
];

const FloatingElement = ({ position, rotation, speed, shape }) => {
  const mesh = useRef();
  const geometry = useMemo(() => shapes[shape % shapes.length], [shape]);
  
  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.getElapsedTime();
      
      // Gentle floating motion
      mesh.current.position.y = position[1] + Math.sin(time * speed) * 0.5;
      
      // Slow rotation
      mesh.current.rotation.x = rotation[0] + time * speed * 0.2;
      mesh.current.rotation.y = rotation[1] + time * speed * 0.3;
      mesh.current.rotation.z = rotation[2] + time * speed * 0.1;
    }
  });

  return (
    <mesh ref={mesh} position={position} rotation={rotation}>
      {geometry}
      <meshStandardMaterial
        color="#57c5b6"
        roughness={0.5}
        metalness={0.8}
        transparent
        opacity={0.7}
        wireframe
      />
    </mesh>
  );
};

const FloatingElements = ({ count = 8 }) => {
  const elements = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const position = [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ];
      const rotation = [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ];
      const speed = 0.2 + Math.random() * 0.5;
      const shape = Math.floor(Math.random() * shapes.length);
      
      temp.push({ position, rotation, speed, shape });
    }
    return temp;
  }, [count]);

  return (
    <group>
      {elements.map((props, i) => (
        <FloatingElement key={i} {...props} />
      ))}
    </group>
  );
};

export default FloatingElements;
