// シェイピング関数と、HSBをRGBへ変換する関数とを組み合わせて、特定の色相を広げてその他の色相が狭くなるようにしてください。

#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb(in vec3 c){
  vec3 rgb=clamp(abs(mod(c.x*6.+vec3(0.,4.,2.),6.)-3.)-1.,0.,1.);
  rgb=rgb*rgb*(3.-2.*rgb);
  return c.z*mix(vec3(1.),rgb,c.y);
}

//  Function from Iñigo Quiles
//  www.iquilezles.org/www/articles/functions/functions.htm
float cubicPulse(float c,float w,float x){
  x=abs(x-c);
  if(x>w)return 0.;
  x/=w;
  return 1.-x*x*(3.-2.*x);
}

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution;
  vec3 color=vec3(0.);
  
  float hue=.7;//, abs(sin(st.x)+2.7)/5.;
  float brightness=cubicPulse(.5,.5,st.x);
  
  color=hsb2rgb(vec3(hue,brightness,1.));
  
  gl_FragColor=vec4(color,1.);
}