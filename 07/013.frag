// うまくできたら後で再利用できるように関数として定義してください。
// 円に色をつけてください。
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float drawCircle(vec2 st,vec2 center,float size){
  float pct=.0;
  pct=distance(st,center);
  
  // 1: step()を使って、.5以上を全て白に、それ以外を黒
  // pct=step(.5,pct);
  
  // 2: 背景と図形の色を反転
  // pct=step(.5,abs(pct-1.));
  
  // 3: の縁を滑らかにしてみましょう
  pct=smoothstep(size,size+.01,pct);
  return pct;
}

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution;
  vec3 color=vec3(0.);
  
  color+=drawCircle(st,vec2(.5,.5),.2);
  
  // 円に色をつけてください。
  color=mix(vec3(.1804,.098,.9137),vec3(1),color);
  
  gl_FragColor=vec4(color,1.);
  
}