#ifdef GL_ES
precision mediump float;
#endif
//precision highp float; 高い精度
//precision lowp float; 低い精度

// 画面サイズ
uniform vec2 u_resolution;
// マウス座標
uniform vec2 u_mouse;
// 時間
uniform float u_time;

vec4 red(){
    return vec4(1.,0.,0.,1.);
}

vec4 green(){
    return vec4(0.,1.,0.,1.);
}

vec4 blue(){
    return vec4(0.,0.,1.,1.);
}

void main(){
    // フラグメントの座標を描画領域全体のサイズで割ることによって正規化しています。
    // こうすると座標値の範囲が0.から1.の間に収まる。
    vec2 st=gl_FragCoord.xy/u_resolution;
    
    // マウスを正規化
    vec2 m=gl_FragCoord.xy/u_mouse;
    
    // 赤 => 黒の繰り返し
    //gl_FragColor=vec4(abs(sin(u_time)),0.,0,1.);
    
    gl_FragColor=vec4(st.x,m.y,st.y,1.);
}