import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import {
  DoubleSide,
  TextureLoader,
  Uniform,
  Vector2,
  type Mesh,
  type ShaderMaterial,
} from "three";
import glyphVertexShader from "@/shaders/glyph/vertexShader.glsl";
import glyphFragmentShader from "@/shaders/glyph/fragmentShader.glsl";
import { useControls } from "leva";

function Glyph() {
  const meshRef = useRef<null | Mesh>(null);
  const materialRef = useRef<null | ShaderMaterial>(null);
  const { size, gl } = useThree();
  const glyphTexture = useLoader(TextureLoader, "birdy.webp");
  // const glyphTexture = useLoader(
  //   TextureLoader,
  //   "juz-nie-chce-urlopu-removebg-preview.png"
  // );
  const uniformsRef = useRef({
    uTexture: new Uniform(glyphTexture),
    uTime: new Uniform(0),
    uResolution: new Uniform(new Vector2(size.width, size.height)),
    uSize: new Uniform(0.03),
    uPixelRatio: new Uniform(Math.min(window.devicePixelRatio, 2)),
    uSpeed: new Uniform(1.0),
    uAmplitude: new Uniform(1.0),
    uFrequency: new Uniform(1.0),
  });

  useEffect(() => {
    uniformsRef.current.uResolution.value.set(size.width, size.height);
  }, [size]);

  useControls({
    uSize: {
      value: uniformsRef.current.uSize.value,
      min: 0.02,
      max: 1,
      step: 0.01,
      onChange: (newValue) => {
        uniformsRef.current.uSize.value = newValue;
      },
    },
    uSpeed: {
      value: uniformsRef.current.uSpeed.value,
      min: 0,
      max: 10,
      step: 0.01,
      onChange: (newValue) => {
        uniformsRef.current.uSpeed.value = newValue;
      },
    },
    uAmplitude: {
      value: uniformsRef.current.uAmplitude.value,
      min: 0,
      max: 1.5,
      step: 0.01,
      onChange: (newValue) => {
        uniformsRef.current.uAmplitude.value = newValue;
      },
    },
    uFrequency: {
      value: uniformsRef.current.uFrequency.value,
      min: 0,
      max: 5,
      step: 0.01,
      onChange: (newValue) => {
        uniformsRef.current.uFrequency.value = newValue;
      },
    },
  });
  gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  useFrame((_state, delta) => {
    // if (meshRef.current === null) return;
    // meshRef.current.rotation.y += delta;
    if (materialRef.current === null) return;
    materialRef.current.uniforms.uTime.value += delta;
  });

  return (
    <points ref={meshRef}>
      <planeGeometry args={[2, 2, 48, 48]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={glyphVertexShader}
        fragmentShader={glyphFragmentShader}
        uniforms={uniformsRef.current}
        side={DoubleSide}
        transparent
      />
    </points>
  );
}

export default Glyph;
