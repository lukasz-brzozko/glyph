attribute vec3 aRandom;

uniform float uTime;
uniform float uSize;
uniform float uBaseStability;
uniform vec2 uResolution;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

#include "../utils/simplexNoise2d.glsl"

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec3 randomSignes = sign(aRandom);
  vec3 randomValuesSquashed = pow(abs(aRandom), vec3(uBaseStability));
  float speed = uTime * uSpeed;
  float noise = simplexNoise2d(modelPosition.xy + speed);

  vec3 modelPositionTransform = randomSignes * randomValuesSquashed * uAmplitude * noise;
  float borderX = 1.0 - abs(modelPositionTransform.x);
  float borderY = 1.0 - abs(modelPositionTransform.y);
  float borderZ = 1.0 - abs(modelPositionTransform.z);
  float minBorder = min(borderX, min(borderY, borderZ));
  float falloff = smoothstep(-3.0, 3.0, minBorder);

  modelPosition.xyz += modelPositionTransform;

  vec4 viewPosition = viewMatrix * modelPosition;

  gl_Position = projectionMatrix * viewPosition;
  gl_PointSize = uSize * uResolution.y * falloff;
  gl_PointSize *= 1.0 / -viewPosition.z;

  vUv = uv;
}