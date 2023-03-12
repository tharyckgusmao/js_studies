#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct) {
    return smoothstep(pct, pct, st.y); // interpolação baseada no algoritmo de hermes, criar steps suaves
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;

    float y = smoothstep(0.0, 1.0, st.x);

    vec3 color = vec3(y);

    float pct = plot(st, y);
    color = color + vec3(pct, 0, 0);

    gl_FragColor = vec4(color, 1.0);
}
