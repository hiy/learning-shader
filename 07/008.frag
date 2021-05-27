// どうすれば1つの描画領域の異なる位置に、複数の長方形を配置することができると思いますか。
// 良い方法を考え出せたらモンドリアンの絵のようなパターンを作ってみせてください。

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

vec3 drawBorder(vec2 st,vec2 bl_pos,vec2 tr_pos){
  vec3 color=vec3(0.,0.,0.);
  vec2 bl=step(vec2(bl_pos.x,bl_pos.y),st);// bottom-left
  vec2 tr=step(vec2(tr_pos.x,tr_pos.y),1.-st);// top-right
  
  vec2 bl2=step(vec2(bl_pos.x+.015,bl_pos.y+.015),st);// bottom-left
  vec2 tr2=step(vec2(tr_pos.x+.015,tr_pos.y+.015),1.-st);// top-right
  
  color=vec3(bl.x*bl.y*tr.x*tr.y)+-1.*vec3(bl2.x*bl2.y*tr2.x*tr2.y);
  return color;
}

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution;
  vec3 color=drawBorder(st,vec2(-1.,.85),vec2(.8,-1.));
  color=color+drawBorder(st,vec2(-1.,.85),vec2(.9,-1.));
  color=color+drawBorder(st,vec2(-1.,.85),vec2(.3,-1.));
  color=color+drawBorder(st,vec2(-1.,.85),vec2(.1,-1.));
  color=color+drawBorder(st,vec2(-1.,.85),vec2(-.10,-1.));
  
  color=color+drawBorder(st,vec2(-1.,.7),vec2(.8,-1.));
  color=color+drawBorder(st,vec2(-1.,.7),vec2(.9,-1.));
  color=color+drawBorder(st,vec2(-1.,.7),vec2(.3,-1.));
  color=color+drawBorder(st,vec2(-1.,.7),vec2(.1,-1.));
  color=color+drawBorder(st,vec2(-1.,.7),vec2(-.10,-1.));
  
  color=color+drawBorder(st,vec2(-1.,-.10),vec2(.8,-1.));
  
  color=color+drawBorder(st,vec2(.19,.1),vec2(.3,-1.));;
  color=color+drawBorder(st,vec2(.19,.1),vec2(.1,-1.));
  color=color+drawBorder(st,vec2(.19,.1),vec2(-.10,-1.));
  
  color=color+drawBorder(st,vec2(.19,-1),vec2(.3,-1.));;
  color=color+drawBorder(st,vec2(.19,-1),vec2(.1,-1.));
  color=color+drawBorder(st,vec2(.19,-1),vec2(-.10,-1.));
  
  gl_FragColor=vec4(color,1.);
}