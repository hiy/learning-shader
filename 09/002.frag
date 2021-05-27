// このパターンをアニメーションにする面白いアイデアを考えてください。色、形、動きの変化について考えましょう。
// 3種類の異なるアニメーションを作成してください。

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265358979323846

vec2 rotate2D(vec2 _st,float _angle){
  _st-=.5;
  _st=mat2(cos(_angle),-sin(_angle),
  sin(_angle),cos(_angle))*_st;
  _st+=.5;
  return _st;
}

vec2 tile(vec2 _st,float _zoom){
  _st*=_zoom;
  return fract(_st);
}

float box(vec2 _st,vec2 _size,float _smoothEdges){
  _size=vec2(.5)-_size*.5;
  vec2 aa=vec2(_smoothEdges*.5);
  vec2 uv=smoothstep(_size,_size+aa,_st);
  uv*=smoothstep(_size,_size+aa,vec2(1.)-_st);
  return uv.x*uv.y;
}

void main(void){
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  vec3 color=vec3(0.);
  
  st=tile(st,4.);
  
  st=rotate2D(st,u_time*PI*.25);
  
  color=mix(vec3(.7333,.3608,.3608),vec3(.2275,.7725,.7922),vec3(box(st,vec2(.7),.201)));
  // color = vec3(st,0.0);
  
  gl_FragColor=vec4(color,1.);
}
