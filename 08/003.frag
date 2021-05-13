// 平行移動についての課題で作った作品を、回転を使ってさらに改善してみましょう。

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265359

mat2 rotate2d(float _angle){
  return mat2(cos(_angle),-sin(_angle),
  sin(_angle),cos(_angle));
}

float box(in vec2 _st,in vec2 _size){
  _size=vec2(.5)-_size*.5;
  vec2 uv=smoothstep(_size,
    _size+vec2(.001),
  _st);
  uv*=smoothstep(_size,
    _size+vec2(.001),
    vec2(1.)-_st);
    return uv.x*uv.y;
  }
  
  float cross(in vec2 _st,float _size){
    return box(_st,vec2(_size,_size/4.))+
    box(_st,vec2(_size/4.,_size));
  }
  
  void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.xy;
    vec3 color=vec3(0.);
    
    //st=st-vec2(.25);
    
    st-=vec2(.5);
    st=rotate2d(sin(u_time)*PI)*st;
    
    st+=vec2(.5);
    // To move the cross we move the space
    vec2 translate=vec2((sin(u_time)));
    
    //translate.x=smoothstep(.1,.5,abs(translate.x)) -.5;
    //translate.y=smoothstep(.1,.5,abs(translate.y)) - .5;
    //vec2 translate=vec2(2.*noise(vec2(3.*st.x+u_time)));
    st+=(translate);
    
    // Show the coordinates of the space on the background
    // color = vec3(st.x,st.y,0.0);
    
    // Add the shape on the foreground
    color+=vec3(cross(st,.25));
    
    gl_FragColor=vec4(color,1.);
  }