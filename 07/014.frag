// 心臓の鼓動のように円を伸縮させるアニメーションを作ることはできますか。
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
  pct=step(size,pct);
  
  // 2: 背景と図形の色を反転
  //pct=step(size,abs(pct-1.));
  
  // 3: の縁を滑らかにしてみましょう
  //pct=smoothstep(size,size+.01,pct);
  return pct;
}

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution;
  vec3 color=vec3(0.);
  
  color+=drawCircle(st,vec2(.5,.5),abs(sin(u_time))/2.);
  
  color=mix(vec3(.9137,.098,.2745),vec3(1),color);
  
  gl_FragColor=vec4(color,1.);
  
}