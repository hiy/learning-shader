// 長方形を塗りつぶすのではなく、枠線だけを描く関数を作ってください。

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

vec3 drawBorder(vec2 st){
  vec3 color=vec3(0.);
  vec2 bl=step(vec2(.3,.3),st);// bottom-left
  vec2 tr=step(vec2(.3,.3),1.-st);// top-right
  
  vec2 bl2=step(vec2(.31,.31),st);// bottom-left
  vec2 tr2=step(vec2(.31,.31),1.-st);// top-right
  
  color=vec3(bl.x*bl.y*tr.x*tr.y)+-1.*vec3(bl2.x*bl2.y*tr2.x*tr2.y);
  return color;
}

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution;
  vec3 color=drawBorder(st);
  gl_FragColor=vec4(color,1.);
}