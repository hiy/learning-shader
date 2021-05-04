// このサンプルを使って、ピクセルの位置と描きたい図形の頂点の数を入力とし、ディスタンスフィールドの値を返す関数を作ってください。
// min()とmax()を使ってディスタンスフィールドを組み合わせてみましょう。

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Reference to
// http://thndl.com/square-shaped-shaders.html

vec3 polygon(in vec2 st,in int n){
  float d=0.;
  // Angle and radius from the current pixel
  float a=atan(st.x,st.y)+PI;
  float r=TWO_PI/float(n);
  
  // Shaping function that modulate the distance
  d=cos(floor(.5+a/r)*r-a)*length(st);
  
  vec3 color=vec3(1.-smoothstep(.4,.41,d));
  // color = vec3(d);
  
  return color;
}

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  st.x*=u_resolution.x/u_resolution.y;
  vec3 color=vec3(0.);
  
  // Remap the space to -1. to 1.
  st=st*2.-1.;
  
  color=polygon(st,9);
  color=max(polygon(st,6),polygon(st,4));
  color=min(polygon(st,6),polygon(st,4));
  
  gl_FragColor=vec4(color,1.);
}
