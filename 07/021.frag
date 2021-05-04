// 異なるシェイピング関数を組み合わせて図形の中に穴を開けてください。花や雪の結晶、歯車などを描いてみましょう。
// シェイピング関数の章で使ったplot()関数を利用して輪郭線だけを描いてください。

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 color1=vec3(1.,0.,0.);
vec3 color2=vec3(1.,.651,0.);

float plot(vec2 st,float pct){
  return smoothstep(pct-.01,pct,st.y)-
  smoothstep(pct,pct+.01,st.y);
  
  // 2つの数値からなる範囲ともう1つの値を受け取ると、
  // この関数はその範囲の間で0.から1.まで滑らかに変化する数値を返します。
  //return smoothstep(.1,.2,abs(st.y-st.x));
  //0.00..0.02
  //  return smoothstep(pct,pct+.01,st.y);
  // return smoothstep(pct-.01,pct,st.y);
  return smoothstep(pct-.00,pct,st.y)-smoothstep(pct,pct+.03,st.y);
  
}

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  vec3 color=vec3(.0);
  //それぞれのピクセルについて半径と角度を計算し、デカルト座標を極座標に変換しました。
  vec2 pos=vec2(.5)-st;
  float r=length(pos)*4.;
  float a=atan(pos.y,pos.x);
  
  float f=cos(a*3.);
  float pct=plot(vec2(f),r);
  color=vec3(1.-pct)*color+pct*vec3(0.,1.,0.);
  
  gl_FragColor=vec4(color,1.);
  
}