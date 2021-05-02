// ウィリアム・ターナーの夕日のようなグラデーションを作り出してみましょう。

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

vec3 colorA=vec3(.1294,.1686,.7137);
vec3 colorB=vec3(.9137,.4745,.1176);
vec3 colorC=vec3(.9804,.8863,.0588);

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  float pct=smoothstep(.1,.5,st.y);
  vec3 color=mix(colorA,colorB,pct);
  pct=smoothstep(.4,.7,st.y);
  color=mix(color,colorC,pct);
  gl_FragColor=vec4(color,1.);
}