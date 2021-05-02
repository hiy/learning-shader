// step()関数を使ってカラフルな旗を作ってください。

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec3 color1=vec3(1.,0.,0.);
vec3 color2=vec3(1.,.651,0.);
vec3 color3=vec3(.9843,1.,0.);
vec3 color4=vec3(.2824,1.,0.);
vec3 color5=vec3(0.,.9686,1.);
vec3 color6=vec3(.0157,0.,1.);
vec3 color7=vec3(.5176,0.,1.);

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution;
  vec3 color=vec3(0.);
  
  float pct=step(.15,st.y);
  color=mix(color1,color2,pct);
  
  pct=step(.3,st.x);
  color=mix(color,color3,pct);
  
  gl_FragColor=vec4(color,1.);
}