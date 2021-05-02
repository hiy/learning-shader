
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution;
  vec3 color=vec3(0.);
  
  float left=step(.1,st.x);
  float bottom=step(.1,st.y);
  
  // leftとbottomの掛け算はAND演算
  color=vec3(left*bottom);
  
  // 0 => black
  // 1 => white
  
  gl_FragColor=vec4(vec3(color),1.);
}