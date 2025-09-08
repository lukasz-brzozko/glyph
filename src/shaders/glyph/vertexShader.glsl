attribute vec3 aRandom;

uniform float uTime;
uniform float uSize;
uniform vec2 uResolution;
// uniform float uFrequency;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

#include "../utils/simplexNoise2d.glsl"

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec3 randomSignes = sign(aRandom);
  vec3 randomValuesSquashed = pow(abs(aRandom), vec3(3.0));
  float speed = uTime * uSpeed;
  float noise = simplexNoise2d(modelPosition.xy + speed);

  vec3 modelPositionTransform = randomSignes * randomValuesSquashed * uAmplitude * noise;

  modelPosition.xyz += modelPositionTransform;

  vec4 viewPosition = viewMatrix * modelPosition;

  gl_Position = projectionMatrix * viewPosition;
  gl_PointSize = uSize * uResolution.y;
  // gl_PointSize = uSize * uResolution.y * (1.0 - abs(modelPosition.z));
  gl_PointSize *= 1.0 / -viewPosition.z;

  vUv = uv;
}