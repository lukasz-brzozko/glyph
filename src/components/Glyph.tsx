import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import {
  DoubleSide,
  TextureLoader,
  Uniform,
  type Mesh,
  type ShaderMaterial,
} from "three";
import glyphVertexShader from "@/shaders/glyph/vertexShader.glsl";
import glyphFragmentShader from "@/shaders/glyph/fragmentShader.glsl";

function Glyph() {
  const meshRef = useRef<null | Mesh>(null);
  const materialRef = useRef<null | ShaderMaterial>(null);
  useFrame((_state, delta) => {
    // if (meshRef.current === null) return;
    // meshRef.current.rotation.y += delta;
    if (materialRef.current === null) return;
    materialRef.current.uniforms.uTime.value += delta;
  });

  const glyphTexture = useLoader(TextureLoader, "birdy.webp");

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[10, 10, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={glyphVertexShader}
        fragmentShader={glyphFragmentShader}
        uniforms={{
          uTexture: new Uniform(glyphTexture),
          uTime: new Uniform(0),
        }}
        side={DoubleSide}
        transparent
      />
    </mesh>
  );
}

export default Glyph;
