uniform float uTime;
uniform float uSize;
uniform vec2 uResolution;
uniform float uFrequency;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

#include "../utils/simplex4d.glsl"

void main() {
  float speed = uTime * uSpeed;

  float offset1 = 1.0;
  float offset2 = 2.0;
  float offset3 = 3.0;

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  float noiseX = (noise4d(vec4(modelPosition.xyz + offset1, uSpeed)));
  float noiseY = (noise4d(vec4(modelPosition.xyz + offset2, uSpeed)));
  float noiseZ = (noise4d(vec4(modelPosition.xyz + offset3, uSpeed)));

  modelPosition.x += sin((speed + offset1) * uFrequency * offset1) * noiseX * 0.1 * uAmplitude;
  modelPosition.y += sin((speed + offset2) * uFrequency * offset2) * noiseY * 0.1 * uAmplitude;
  modelPosition.z += sin((speed + offset3) * uFrequency * offset3) * noiseZ * 0.1 * uAmplitude;

  vec4 viewPosition = viewMatrix * modelPosition;

  gl_Position = projectionMatrix * viewPosition;
  gl_PointSize = uSize * uResolution.y;
  gl_PointSize *= 1.0 / -viewPosition.z;

  vUv = uv;
}