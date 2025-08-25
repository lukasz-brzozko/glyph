uniform sampler2D uTexture;

varying vec2 vUv;

void main() {
  float cells = 30.0;
  float gridGap = 0.95;
  float gridX = mod(vUv.x * cells, 1.0);
  gridX = 1.0 - step(gridGap, gridX);

  float gridY = mod(vUv.y * cells, 1.0);
  gridY = 1.0 - step(gridGap, gridY);

  // vec4 textureColor = texture2D(uTexture, vUv);
  // vec4 strength = gridX * gridY * textureColor;
  // gl_FragColor = vec4(strength.xyz, gridX * gridY);

  vec4 textureColor = texture2D(uTexture, vUv);

  gl_FragColor = vec4(textureColor.xyz, gridX * gridY + 0.9);

}