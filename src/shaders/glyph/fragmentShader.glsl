uniform sampler2D uTexture;

varying vec2 vUv;

void main() {
  vec2 uv = gl_PointCoord;
  vec4 textureColor = texture2D(uTexture, vUv);
  vec3 color = textureColor.rgb;

  float distanceToCenter = length(uv - 0.5);
  float shape = 0.05 / distanceToCenter - 0.1;
  float alpha = textureColor.a * shape;

  gl_FragColor = vec4(color, alpha);

}