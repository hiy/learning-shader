// u_timeを使って日の出から日の入りまでの変化のアニメーションを作ってみましょう。

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec3 colorA=vec3(.0667,.0824,.3255);
vec3 colorB=vec3(.9608,.2745,.0039);
vec3 colorC=vec3(1.,.9843,.8314);

void main(){
  vec3 color=vec3(0.);
  float pct=abs(sin(u_time));
  color=mix(colorA,colorB,pct)+mix(color,colorC,pct);
  gl_FragColor=vec4(color,1.);
}