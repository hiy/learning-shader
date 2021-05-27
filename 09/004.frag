// 異なるパターンのレイヤーを重ねてオリジナルのタータンチェックのパターンを作ってください。

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec3 red=vec3(.9216,.298,.1098);
vec3 blue=vec3(.1098,.3922,.9216);
vec3 yellow=vec3(1.,.833,.224);
vec3 black=vec3(.3059,.298,.298);
vec3 white=vec3(0.,0.,0.);
vec3 gray=vec3(.4078,.4078,.4078);

#define PI 3.14159265358979323846

vec2 tile(vec2 _st,float _zoom){
  _st*=_zoom;
  return fract(_st);
}

vec3 box(vec2 st,vec2 bl_pos,vec2 tr_pos,vec3 color){
  vec3 c=color;
  vec2 bl=step(vec2(bl_pos.x,bl_pos.y),st);// bottom-left
  vec2 tr=step(vec2(tr_pos.x,tr_pos.y),1.-st);// top-right
  
  color=vec3(bl.x*bl.y*tr.x*tr.y);//+ -1.*vec3(bl2.x*bl2.y*tr2.x*tr2.y);
  return color;
}

vec3 vertical_line(vec2 st,vec2 start_pos,vec2 end_pos,float width,vec3 color){
  vec3 c=vec3(.0);
  c=box(st,start_pos,end_pos,color);
  c=mix(c,color,c);
  return c;
}

vec3 horizontal_line(vec2 st,vec2 start_pos,vec2 end_pos,float width,vec3 color){
  vec3 c=vec3(.0);
  c=box(st,start_pos,end_pos,color);
  c=mix(c,color,c);
  return c;
}

void main(void){
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  vec3 color=yellow;
  st=tile(st,4.);
  
  float start_x=.1;
  float start_y=.0;
  float width=.07;
  vec3 l;
  
  l=horizontal_line(st,vec2(0.,.1),vec2(0.,.88),.0,red);
  if(l.x>0.)color=l;
  
  l=horizontal_line(st,vec2(0.,.8),vec2(0.,.18),.0,red);
  if(l.x>0.)color=l;
  
  start_x=.8;
  start_y=.0;
  width=.41;
  l=vertical_line(st,vec2(start_x,start_y),vec2(1.-width*2.,+start_y),.0,red);
  if(l.x>0.)color=l;
  
  start_x=.2;
  start_y=.0;
  width=.13;
  l=vertical_line(st,vec2(start_x,start_y),vec2(1.-width*2.,+start_y),.0,gray);
  if(l.x>0.)color=l;
  
  start_x=.27;
  start_y=.0;
  width=.17;
  l=vertical_line(st,vec2(start_x,start_y),vec2(1.-width*2.,+start_y),.0,gray);
  if(l.x>0.)color=l;
  
  start_x=.35;
  start_y=.0;
  width=.21;
  l=vertical_line(st,vec2(start_x,start_y),vec2(1.-width*2.,+start_y),.0,gray);
  if(l.x>0.)color=l;
  
  l=horizontal_line(st,vec2(0.,.25),vec2(0.,.68),.0,black);
  if(l.x>0.)color=l;
  
  l=horizontal_line(st,vec2(0.,.33),vec2(0.,.60),.0,black);
  if(l.x>0.)color=l;
  
  l=horizontal_line(st,vec2(0.,.41),vec2(0.,.52),.0,black);
  if(l.x>0.)color=l;
  
  // color=mix(color,red,.5);
  //color+=vec3(box(st,vec2(.6),.01));
  
  gl_FragColor=vec4(color,1.);
}
