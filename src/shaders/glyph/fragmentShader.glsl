uniform sampler2D uTexture;

varying vec2 vUv;

void main() {
  vec2 uv = gl_PointCoord;
  float distanceToCenter = length(uv - 0.5);
  float alpha = 0.05 / distanceToCenter - 0.1;

  vec4 textureColor = texture2D(uTexture, vUv);

  gl_FragColor = vec4(textureColor.rgb, alpha);
  // gl_FragColor = vec4(color);
}