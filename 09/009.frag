// 要素の場所によって他の属性（訳注：例えば色）を変化させるパターンを作ってください。

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform float u_time;

vec3 red=vec3(.9216,.298,.1098);
vec3 blue=vec3(.1098,.3922,.9216);
vec3 yellow=vec3(1.,.833,.224);
vec3 black=vec3(.3059,.298,.298);
vec3 white=vec3(0.,0.,0.);
vec3 gray=vec3(.4078,.4078,.4078);

vec2 rotate2D(vec2 _st,float _angle){
  _st-=.5;
  _st=mat2(cos(_angle),-sin(_angle),
  sin(_angle),cos(_angle))*_st;
  _st+=.5;
  return _st;
}

vec2 tile(vec2 _st,float _zoom){
  _st*=_zoom;
  return fract(_st);
}

float circle(vec2 _st,float _radius){
  vec2 pos=vec2(.5)-_st;
  
  return smoothstep(1.-_radius,1.-_radius+_radius*.2,1.-dot(pos,pos)*3.14);
}

vec3 rotateTilePattern(vec2 _st){
  
  //  Scale the coordinate system by 2x2
  _st*=2.01;
  
  //  Give each cell an index number
  //  according to its position
  float index=0.;
  index+=step(1.,mod(_st.x,2.));
  index+=step(1.,mod(_st.y,2.))*2.;
  vec3 mc=vec3(0.);
  // index+=circle(_st,1.);
  
  //      |
  //  2   |   3
  //      |
  //--------------
  //      |
  //  0   |   1
  //      |
  
  // Make each cell between 0.0 - 1.0
  _st=fract(_st);
  
  // _st.y = circle(_st, 2.);
  // Rotate each cell according to the index
  if(index==1.){
    //  Rotate cell 1 by 90 degrees
    //  _st.x*=circle(_st,.5);
    _st=rotate2D(_st,PI*.5);
    
    mc+=circle(_st,.4);
    mc=mix(vec3(1.,1.,1.),vec3(1.,.9137,.1569),mc);
  }else if(index==2.){
    //  Rotate cell 2 by -90 degrees
    //_st.x/=circle(_st,.5);
    _st=rotate2D(_st,PI*-.5);
    mc+=circle(_st,.4);
    mc=mix(vec3(1.,1.,1.),vec3(.1686,.3608,1.),mc);
  }else if(index==3.){
    //  Rotate cell 3 by 180 degrees
    //_st.x/=circle(_st,.5);
    _st=rotate2D(_st,PI);
    //   vec3 xx = mix(blue,red, index);
    mc+=circle(_st,.4);
    mc=mix(vec3(1.,1.,1.),vec3(.3882,.8588,.1137),mc);
  }else{
    mc+=circle(_st,.4);
    mc=mix(vec3(1.,1.,1.),vec3(1.,.3059,.6275),mc);
    //_st.x*=circle(_st,.5);
    
  }
  
  //_st.x-=circle(_st,.5);
  //_st = mix(blue, red, _st);
  
  return mc;
}

void main(void){
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  
  st=tile(st,5.);
  vec3 color=rotateTilePattern(st);
  
  // Make more interesting combinations
  // st=tile(st,2.);
  // st=rotate2D(st,-PI*u_time*.25);
  // st=rotateTilePattern(st*2.);
  // st=rotate2D(st,PI*u_time*.25);
  
  // step(st.x,st.y) just makes a b&w triangles
  // but you can use whatever design you want.
  
  //vec3 color=mix(vec3(circle(st,.5));
  
  gl_FragColor=vec4(color,1.);
  
  // gl_FragColor=vec4(vec3(smoothstep(st.x,st.y, .5)),1.);
  
  //vec3 color=vec3(step(st.x,st.y));
  //vec3 color=vec3(circle(st,1.));
  //gl_FragColor=vec4(color,1.);
}
