// 異なるシェイピング関数を組み合わせて図形の中に穴を開けてください。花や雪の結晶、歯車などを描いてみましょう。
// シェイピング関数の章で使ったplot()関数を利用して輪郭線だけを描いてください。

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float circle(in vec2 _st,in float _radius){
  vec2 dist=_st-vec2(.5);
  // 内積を使うと負荷が少ない
  return smoothstep(_radius-(_radius*.01),
  _radius+(_radius*.01),
  dot(dist,dist)*4.);
}

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  vec3 color=vec3(0.);
  
  //それぞれのピクセルについて半径と角度を計算し、デカルト座標を極座標に変換しました。
  vec2 pos=vec2(.5)-st;
  float r=length(pos)*2.;
  float a=atan(pos.y,pos.x);
  
  float f=cos(a*3.+u_time);
  //f = abs(cos(a*3.+u_time));
  //f = abs(cos(a*2.5+u_time))*.5+.3;
  //f = abs(cos(a*12.+u_time)*sin(a*3.+u_time))*.8+.1;
  f=smoothstep(-.5,1.,cos(a*10.+u_time))*.2+.5;
  
  f*=circle(st,.15);
  color=vec3(1.-smoothstep(f,f+.002,r));
  
  gl_FragColor=vec4(color,1.);
  
}