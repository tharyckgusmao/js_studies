#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.141592653589793
#define HALF_PI 1.5707963267948966

vec3 colorA = vec3(0.37, 0.61, 1.0);
vec3 colorB = vec3(0.0, 1.0, 0.6);
//bezier
float elasticOut(float t) {
    return sin(-13.0 * (t + 1.0) * HALF_PI) * pow(2.0, -10.0 * t) + 1.0;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;

    vec3 color = vec3(0.0);

    float pct = elasticOut(abs(sin(u_time)));
    // float pct = abs(sin(u_time + st.x));

    color = mix(colorA, colorB, pct);

    gl_FragColor = vec4(color, 1.0);
}
