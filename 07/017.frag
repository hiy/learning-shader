#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float circle(in vec2 _st,in float _radius){
  vec2 dist=_st-vec2(.5);
  // 内積を使うと負荷が少ない
  return 1.-smoothstep(_radius-(_radius*.01),
  _radius+(_radius*.01),
  dot(dist,dist)*4.);
}

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  
  vec3 color=vec3(circle(st,1.));
  
  gl_FragColor=vec4(color,1.);
}