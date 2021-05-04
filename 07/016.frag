// 様々な演算や関数を使って、複数のディスタンスフィールドを組み合わせると何が起きるでしょう。
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float drawCircle(vec2 st,vec2 center,float size){
  float pct=.0;
  //  pct=distance(st,center);
  //  pct=step(size,pct);
  
  pct=distance(st,vec2(.4))+distance(st,vec2(.6));
  pct=distance(st,vec2(.4))*distance(st,vec2(.6));
  pct=min(distance(st,vec2(.4)),distance(st,vec2(.6)));
  pct=max(distance(st,vec2(.4)),distance(st,vec2(.6)));
  pct=pow(distance(st,vec2(.4)),distance(st,vec2(.6)));
  
  return pct;
}

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution;
  vec3 color=vec3(0.);
  
  color+=drawCircle(st,vec2(.5,.5),.2);
  // color*=drawCircle(st,vec2(.1,.2),.1);
  // color*=drawCircle(st,vec2(.7,.8),.05);
  
  gl_FragColor=vec4(color,1.);
  
}