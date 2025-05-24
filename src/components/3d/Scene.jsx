import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import './Scene.scss';

// Simple placeholder component instead of complex 3D elements
const SimpleBox = () => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#57c5b6" />
    </mesh>
  );
};

const Scene = ({ color = '#57c5b6', density = 50, interactive = true }) => {
  return (
    <div className="canvas-container">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, powerPreference: 'default' }}
        dpr={[1, 2]} // Limit pixel ratio for better performance
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <SimpleBox />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;
