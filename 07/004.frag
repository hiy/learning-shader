// 同じコードを元にstep()の代わりにsmoothstep()を使ってみましょう。
// 値を調節するとぼやけた境界線からスムーズな枠線まで変化させることができます。

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution;
  vec3 color=vec3(0.);
  
  vec2 bl=smoothstep(.1,.3,st);// bottom-left
  vec2 tr=smoothstep(.1,.2,1.-st);// top-right
  color=vec3(bl.x*bl.y*tr.x*tr.y);
  
  // 0 => black
  // 1 => white
  gl_FragColor=vec4(color,1.);
}