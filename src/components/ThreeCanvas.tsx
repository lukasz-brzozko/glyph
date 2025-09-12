import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import Glyph from "./Glyph";

function ThreeCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 3] }} dpr={[1, 2]}>
      <OrbitControls makeDefault />
      <ambientLight color="white" intensity={0.3} />
      <Glyph />
    </Canvas>
  );
}

export default ThreeCanvas;
