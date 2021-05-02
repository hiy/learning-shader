#ifdef GL_ES
precision mediump float;
#endif

// 画面サイズ
uniform vec2 u_resolution;
// マウス座標
uniform vec2 u_mouse;
// 時間
uniform float u_time;

float plot(vec2 st,float pct){
  // 2つの数値からなる範囲ともう1つの値を受け取ると、
  // この関数はその範囲の間で0.から1.まで滑らかに変化する数値を返します。
  //return smoothstep(.1,.2,abs(st.y-st.x));
  //0.00..0.02
  //  return smoothstep(pct,pct+.01,st.y);
  //  return smoothstep(pct-.01,pct,st.y);
  return smoothstep(pct-.01,pct,st.y)-smoothstep(pct,pct+.01,st.y);
}

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution;
  
  float y=st.x;
  // float y=smoothstep(.1,.9,st.x);
  //float y=smoothstep(.2,.5,st.x)-smoothstep(.5,.8,st.x);
  //float y=sin(st.x);
  vec3 color=vec3(y);
  
  // Plot a line
  float pct=plot(st,y);
  color=vec3(1.-pct)*color+pct*vec3(0.,1.,0.);
  
  gl_FragColor=vec4(color,1.);
}