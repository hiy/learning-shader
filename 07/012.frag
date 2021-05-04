// 1: step()を使って、.5以上を全て白に、それ以外を黒にしてください。
// 2: 背景と図形の色を反転させてください。
// 3: 円の縁を滑らかにしてみましょう。smoothstep()を使って色々な値を試してください。
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution;
  float pct=.0;
  
  pct=distance(st,vec2(.5));
  
  // 1: step()を使って、.5以上を全て白に、それ以外を黒
  // pct=step(.5,pct);
  
  // 2: 背景と図形の色を反転
  // pct=step(.5,abs(pct-1.));
  
  // 3: の縁を滑らかにしてみましょう
  pct=smoothstep(.4,.5,pct);
  
  vec3 color=vec3(pct);
  
  gl_FragColor=vec4(color,1.);
  
}