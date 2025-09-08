import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import {
  AdditiveBlending,
  DoubleSide,
  type Mesh,
  type ShaderMaterial,
  Uniform,
  Vector2,
} from "three";

import useStore from "@/redux/store";
import glyphFragmentShader from "@/shaders/glyph/fragmentShader.glsl";
import glyphVertexShader from "@/shaders/glyph/vertexShader.glsl";

const BASE_TEXTURE_IMAGE_PATH = `${import.meta.env.BASE_URL}/batman.svg`;
const GEOMETRY_SEGMENTS = 48;
const COUNT_PER_VERTEX = 3; // x, y, z
const vertexCount = (GEOMETRY_SEGMENTS + 1) * (GEOMETRY_SEGMENTS + 1);

const aRandomsArray = new Float32Array(
  Array.from(
    { length: vertexCount * COUNT_PER_VERTEX },
    () => (Math.random() - 0.5) * 2.0,
  ),
);

function Glyph() {
  const { image } = useStore();
  const meshRef = useRef<Mesh | null>(null);
  const materialRef = useRef<null | ShaderMaterial>(null);
  const { gl, size } = useThree();
  const glyphTexture = useTexture(BASE_TEXTURE_IMAGE_PATH);
  const userTexture = useTexture(BASE_TEXTURE_IMAGE_PATH);

  const pixelRatio = Math.min(window.devicePixelRatio, 2);

  const uniformsRef = useRef({
    uAmplitude: new Uniform(0.35),
    uBaseStability: new Uniform(3.0),
    uFrequency: new Uniform(1.0),
    uPixelRatio: new Uniform(pixelRatio),
    uResolution: new Uniform(
      new Vector2(size.width * pixelRatio, size.height * pixelRatio),
    ),
    uSize: new Uniform(0.13),
    uSpeed: new Uniform(0.5),
    uTexture: new Uniform(glyphTexture),
    uTime: new Uniform(0),
  });

  useControls({
    uAmplitude: {
      max: 5,
      min: 0,
      step: 0.01,
      value: uniformsRef.current.uAmplitude.value,
      onChange: (newValue) => {
        uniformsRef.current.uAmplitude.value = newValue;
      },
    },
    uBaseStability: {
      max: 30,
      min: 1,
      step: 1,
      value: uniformsRef.current.uBaseStability.value,
      onChange: (newValue) => {
        uniformsRef.current.uBaseStability.value = newValue;
      },
    },
    uSize: {
      max: 0.2,
      min: 0.02,
      step: 0.01,
      value: uniformsRef.current.uSize.value,
      onChange: (newValue) => {
        uniformsRef.current.uSize.value = newValue;
      },
    },
    uSpeed: {
      max: 1,
      min: 0,
      step: 0.01,
      value: uniformsRef.current.uSpeed.value,
      onChange: (newValue) => {
        uniformsRef.current.uSpeed.value = newValue;
      },
    },
  });
  gl.setPixelRatio(pixelRatio);

  useFrame((_state, delta) => {
    if (materialRef.current === null) return;
    materialRef.current.uniforms.uTime.value += delta;
  });

  useEffect(() => {
    uniformsRef.current.uResolution.value.set(
      size.width * pixelRatio,
      size.height * pixelRatio,
    );
  }, [size, pixelRatio]);

  useEffect(() => {
    let imageEl: HTMLImageElement | null = null;
    let imgUrl: null | string = null;

    const onImageLoad = (event: Event) => {
      userTexture.dispose();
      userTexture.image = event.target;
      userTexture.needsUpdate = true;
      uniformsRef.current.uTexture.value = userTexture;
    };

    if (image) {
      imgUrl = URL.createObjectURL(image);
      imageEl = new Image();
      imageEl.addEventListener("load", onImageLoad);
      imageEl.src = imgUrl;
    }

    return () => {
      userTexture?.dispose();
      URL.revokeObjectURL(imgUrl || "");
      imageEl?.removeEventListener("load", onImageLoad);
      imgUrl = null;
      imageEl = null;
    };
  }, [image, glyphTexture, userTexture]);

  return (
    <points ref={meshRef}>
      <planeGeometry
        args={[2, 2, GEOMETRY_SEGMENTS, GEOMETRY_SEGMENTS]}
        index={null}
      >
        <bufferAttribute
          array={aRandomsArray}
          attach="attributes-aRandom"
          count={aRandomsArray.length / COUNT_PER_VERTEX}
          itemSize={COUNT_PER_VERTEX}
        />
      </planeGeometry>
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
