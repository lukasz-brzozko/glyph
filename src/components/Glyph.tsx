import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import {
  AdditiveBlending,
  DoubleSide,
  type Mesh,
  type ShaderMaterial,
  TextureLoader,
  Uniform,
  Vector2,
} from "three";

import glyphFragmentShader from "@/shaders/glyph/fragmentShader.glsl";
import glyphVertexShader from "@/shaders/glyph/vertexShader.glsl";

function Glyph() {
  const meshRef = useRef<Mesh | null>(null);
  const materialRef = useRef<null | ShaderMaterial>(null);
  const { gl, size } = useThree();
  const glyphTexture = useLoader(TextureLoader, "birdy.webp");

  const uniformsRef = useRef({
    uAmplitude: new Uniform(0.35),
    uFrequency: new Uniform(1.0),
    uPixelRatio: new Uniform(Math.min(window.devicePixelRatio, 2)),
    uResolution: new Uniform(new Vector2(size.width, size.height)),
    uSize: new Uniform(0.1),
    uSpeed: new Uniform(2.0),
    uTexture: new Uniform(glyphTexture),
    uTime: new Uniform(0),
  });

  useControls({
    uAmplitude: {
      max: 5,
      min: 0,
      onChange: (newValue) => {
        uniformsRef.current.uAmplitude.value = newValue;
      },
      step: 0.01,
      value: uniformsRef.current.uAmplitude.value,
    },
    uFrequency: {
      max: 3,
      min: 0,
      onChange: (newValue) => {
        uniformsRef.current.uFrequency.value = newValue;
      },
      step: 0.01,
      value: uniformsRef.current.uFrequency.value,
    },
    uSpeed: {
      max: 6,
      min: 0,
      onChange: (newValue) => {
        uniformsRef.current.uSpeed.value = newValue;
      },
      step: 0.01,
      value: uniformsRef.current.uSpeed.value,
    },
  });
  gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  useFrame((_state, delta) => {
    if (materialRef.current === null) return;
    materialRef.current.uniforms.uTime.value += delta;
  });

  useEffect(() => {
    uniformsRef.current.uResolution.value.set(size.width, size.height);
  }, [size]);

  return (
    <points ref={meshRef}>
      <planeGeometry args={[2, 2, 48, 48]} index={null} />
      <shaderMaterial
        blending={AdditiveBlending}
        depthWrite={false}
        fragmentShader={glyphFragmentShader}
        ref={materialRef}
        side={DoubleSide}
        uniforms={uniformsRef.current}
        vertexShader={glyphVertexShader}
        transparent
      />
    </points>
  );
}

export default Glyph;
