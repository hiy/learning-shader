// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec2 brickTile(vec2 _st,float _zoom){
  _st*=_zoom;
  
  //行方向ではなく列方向に対して同じ効果を適応することはできますか。
  if((step(1.,mod(_st.x,2.)))>0.){
    _st.y+=1.*u_time+.5;
  }else{
    _st.y+=1.*u_time;
  }
  
  return fract(_st);
}

float box(vec2 _st,vec2 _size){
  _size=vec2(.5)-_size*.5;
  vec2 uv=smoothstep(_size,_size+vec2(1e-4),_st);
  uv*=smoothstep(_size,_size+vec2(1e-4),vec2(1.)-_st);
  return uv.x*uv.y;
}

void main(void){
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  vec3 color=vec3(0.);
  
  // Modern metric brick of 215mm x 102.5mm x 65mm
  // http://www.jaharrison.me.uk/Brickwork/Sizes.html
  //st /= vec2(2.15,0.65)/1.5;
  
  // Apply the brick tiling
  st=brickTile(st,5.);
  
  color=vec3(box(st,vec2(.9)));
  
  // Uncomment to see the space coordinates
  // color = vec3(st,0.0);
  
  gl_FragColor=vec4(color,1.);
}
