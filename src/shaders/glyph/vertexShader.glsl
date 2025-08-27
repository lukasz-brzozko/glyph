uniform float uTime;
uniform float uSize;
uniform vec2 uResolution;
uniform float uFrequency;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

float rand(vec2 co) {
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {

  float speed = uTime * uSpeed;

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  float randomValue = rand(modelPosition.xy);
  float elevation = sin((modelPosition.x + modelPosition.y + speed) * uFrequency) * (uAmplitude + 0.5 * (randomValue));
  elevation = smoothstep(0.5, 1.0, elevation);
  modelPosition.z += elevation;

  vec4 viewPosition = viewMatrix * modelPosition;

  gl_Position = projectionMatrix * viewPosition;
  gl_PointSize = uSize * uResolution.y;
  gl_PointSize *= 1.0 / -viewPosition.z;

  vUv = uv;
}