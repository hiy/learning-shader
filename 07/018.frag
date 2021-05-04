#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution;
  // 拡大縮小しても比率を維持する
  st.x*=u_resolution.x/u_resolution.y;
  vec3 color=vec3(.0);
  float d=.0;
  
  // 座標系を中心に動かして半分の大きさに縮小することで値が-1から1の間に収まるようにします
  //（訳注：16行目の式の2.と1.を書き換えて見ると理解の助けになります）
  st=st*2.-1.;
  
  d=length(abs(st)-.3);
  //d=length(min(abs(st)-.3,0.));
  //d=length(max(abs(st)-.3,0.));
  
  gl_FragColor=vec4(vec3(fract(d*10.)),1.);
  
  // gl_FragColor = vec4(vec3( step(.3,d) ),1.0);
  // gl_FragColor = vec4(vec3( step(.3,d) * step(d,.4)),1.0);
  //  gl_FragColor = vec4(vec3( smoothstep(.3,.4,d)* smoothstep(.6,.5,d)) ,1.0);
  
}