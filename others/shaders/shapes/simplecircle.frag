
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;

    // pct = distance(st,vec2(0.1));
    

    vec2 toCenter = vec2(sin(u_time),0.5)-st;
    pct = length(toCenter);

    // vec3 color = mix(vec3(0.2),vec3(.9),step(.2,vec3(pct)));
    // vec3 color = mix(vec3(0.2078, 0.5804, 0.9255),vec3(.9),smoothstep(0.2,0.3,vec3(pct)));
    // color = mix(vec3(0.9255, 0.7922, 0.2078),color,smoothstep(0.0,0.2,vec3(pct)));
	
    // pct = distance(st,vec2(0.4)) + distance(st,vec2(0.6));
    // pct = distance(st,vec2(0.4)) * distance(st,vec2(0.6));
    // pct = min(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
    // pct = max(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
    // pct = pow(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
    vec3 color = vec3(pct);

    gl_FragColor = vec4( color, 1.0 );
}