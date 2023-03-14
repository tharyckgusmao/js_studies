#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float reactShape(vec2 position, vec2 scale) {
    scale = vec2(0.5) - scale * 0.5;
    vec2 shaper = vec2(step(scale.x, position.x), step(scale.y, position.y));
    shaper *= vec2(step(scale.x, 1.0 - position.x), step(scale.y, 1.0 - position.y));
    return shaper.x * shaper.y;
}


void main(){
    vec2 st = gl_FragCoord.xy / u_resolution;
    vec3 color = vec3(1.0);

    vec3 colorBase= vec3(0.45, 0.82, 0.87);
    vec3 colorOther= vec3(0.74, 0.98, 0.3);
    vec3 colorRect= vec3(0.3, 0.35, 0.98);


    color = mix(colorBase,colorOther,step(st.x,sin(u_time)));


   float retangle = reactShape(st, vec2(sin(u_time)));
    
    color = vec3(mix(color,colorRect,vec3(retangle)));

    gl_FragColor = vec4(color,1.0);
}