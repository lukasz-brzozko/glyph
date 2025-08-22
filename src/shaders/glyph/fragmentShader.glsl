uniform sampler2D uTexture;

varying vec2 vUv;

void main() {
  float gridX = mod(vUv.x * 10.0, 1.0);
  gridX = 1.0 - step(0.95, gridX);

  float gridY = mod(vUv.y * 10.0, 1.0);
  gridY = 1.0 - step(0.95, gridY);

  vec4 textureColor = texture2D(uTexture, vUv);
  vec4 strength = gridX * gridY * textureColor;
  gl_FragColor = vec4(strength.xyz, gridX * gridY);

  // vec4 textureColor = texture2D(uTexture, vUv);

  // gl_FragColor = vec4(textureColor);

}