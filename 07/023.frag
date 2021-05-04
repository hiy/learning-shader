// 幾何学的なロゴをなにか1つ選んでディスタンスフィールドを使って再現してみましょう。

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA=vec3(.149,.141,.912);
vec3 colorB=vec3(1.,.833,.224);

vec3 colorC=vec3(1.,1.,1.);
vec3 colorD=vec3(.0);

vec3 circle(in vec2 _st,in float _radius,in vec2 pos,vec3 color){
  vec2 dist=_st-pos;
  // 内積を使うと負荷が少ない
  
  float c=smoothstep(_radius-(_radius*.01),
  _radius+(_radius*.01),
  dot(dist,dist)*4.);
  
  return mix(color,colorC,c);
}

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  st.x*=u_resolution.x/u_resolution.y;
  vec3 color=vec3(0.);
  
  color=circle(st,.2,vec2(.5),colorB);
  color/=circle(st,.18,vec2(.55),color);
  
  gl_FragColor=vec4(vec3(color),1.);
}