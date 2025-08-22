uniform float uTime;
varying vec2 vUv;

void main() {

  // Final position
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  float gridX = mod(uv.x * 30.0, 1.0);
  gridX = 1.0 - step(0.95, gridX);

  float gridY = mod(uv.y * 30.0, 1.0);
  gridY = 1.0 - step(0.95, gridY);

  modelPosition.z += sin(uTime + (gridX * gridY) + vUv.x + vUv.y);
  // modelPosition.x += sin(gridX);

  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;

  vUv = uv;
}