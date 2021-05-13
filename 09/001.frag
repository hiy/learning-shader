// 空間に対して違う数をかけてみましょう。少数部分を持つ数を試したり、xとyに違う数を掛けてみましょう。

// このタイリングのテクニックを再利用可能な関数にしてみましょう。

// 空間を3行3列に分割します。スレッドがどの行と列にいるのかを知る方法を考えて、
// 表示する図形を変えてください。Tic-tac-toe（◯×ゲーム）を描いてみましょう。

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec3 colorA=vec3(.149,.141,.912);
vec3 colorB=vec3(1.,.833,.224);

vec3 colorC=vec3(1.,1.,1.);
vec3 colorD=vec3(.0);

vec3 circle(in vec2 _st,in float _radius,in vec2 pos,vec3 color){
  vec2 dist=_st-pos;
  // 内積を使うと負荷が少ない
  float c=1.;
  c*=1.-smoothstep(_radius-(_radius*.01),
  _radius+(_radius*.01),
  dot(dist,dist)*4.);
  
  vec2 l=_st-vec2(.5);
  return vec3(c)*smoothstep(.2-(.2*.02),.2+(.2*.01),dot(l,l)*4.);
}

float circle2(in vec2 _st,in float _radius){
  vec2 l=_st-vec2(.5);
  return smoothstep(_radius-(_radius*.02),_radius+(_radius*.01),dot(l,l)*4.);
}

vec2 tiling(vec2 st,float c){
  st*=c;
  return fract(st);
}

mat2 rotate2d(float _angle){
  return mat2(cos(_angle),-sin(_angle),
  sin(_angle),cos(_angle));
}

float box(in vec2 _st,in vec2 _size){
  _size=vec2(.5)-_size*.5;
  vec2 uv=smoothstep(_size,
    _size+vec2(.001),
  _st);
  uv*=smoothstep(_size,_size+vec2(.001),vec2(1.)-_st);
  return uv.x*uv.y;
}

float cross(in vec2 _st,float _size){
  return box(_st,vec2(_size,_size/4.))+
  box(_st,vec2(_size/4.,_size));
}

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution;
  vec3 color=vec3(0.);
  
  bool isDraw=false;
  if(st.x<=.33&&st.y<=.33){
    isDraw=true;
  }else if((st.x>.33&&st.x<=.66)&&(st.y>.33&&st.y<=.66)){
    isDraw=true;
  }else if((st.x>.66&&st.x<=1.)&&(st.y>.66&&st.y<=1.)){
    isDraw=true;
  }else{
    isDraw=false;
  }
  
  st=tiling(st,3.);
  
  if(isDraw){
    color=circle(st,.5,vec2(.5),vec3(1.,1.,1.));
  }else{
    st-=vec2(.5);
    st=rotate2d(sin(.25)*3.14)*st;
    st+=vec2(.5);
    color+=cross(st,.4);
    color+=cross(st,.5);
  }
  
  gl_FragColor=vec4(color,1.);
}