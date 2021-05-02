// 長方形の大きさと縦横比を変えてみましょう。

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution;
  vec3 color=vec3(0.);
  
  // vec2 bl=step(vec2(.6,.8),st);// bottom-left
  // vec2 tr=step(vec2(.1),1.-st);// top-right
  // color=vec3(bl.x*bl.y*tr.x*tr.y);
  
  vec2 bl=step(vec2(.1,.1),st);// bottom-left
  vec2 tr=step(vec2(.6,.8),1.-st);// top-right
  color=vec3(bl.x*bl.y*tr.x*tr.y);
  
  // 0 => black
  // 1 => white
  
  gl_FragColor=vec4(color,1.);
}