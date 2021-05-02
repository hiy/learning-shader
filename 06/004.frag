// 今までに学んだことを使って虹を作り出すことはできますか?

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
  
  float pct=smoothstep(0.,.15,st.y);
  color=mix(color1,color2,pct);
  
  pct=smoothstep(.15,.3,st.y);
  color=mix(color,color3,pct);
  
  pct=smoothstep(.3,.45,st.y);
  color=mix(color,color4,pct);
  
  pct=smoothstep(.45,.6,st.y);
  color=mix(color,color5,pct);
  
  pct=smoothstep(.6,.75,st.y);
  color=mix(color,color6,pct);
  
  pct=smoothstep(.75,.9,st.y);
  color=mix(color,color7,pct);
  
  gl_FragColor=vec4(color,1.);
}