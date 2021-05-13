// 回転行列と拡大・縮小を行う行列を組み合わせてみましょう。
// 順番が重要なので注意してください。行列同士を掛け合わせてから最後にベクトルを掛けるようにします。

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

mat2 scale(vec2 _scale){
  return mat2(_scale.x,0.,
  0.,_scale.y);
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
    
    st-=vec2(.5);
    st=scale(vec2(sin(u_time)+1.))*st;
    st=rotate2d(sin(u_time)*PI)*st;
    st+=vec2(.5);
    
    // Show the coordinates of the space on the background
    //color=vec3(st.x,st.y,0.);
    
    // Add the shape on the foreground
    color+=vec3(cross(st,.2));
    
    gl_FragColor=vec4(color,1.);
  }
  