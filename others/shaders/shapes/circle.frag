#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float circleShape(vec2 position, float radius) {

    return step(radius, length(vec2(0.5,0.5) - position));

}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;

    vec3 color = vec3(0.0);

    float circle = circleShape(st, 0.4);
    color = vec3(circle);

    gl_FragColor = vec4(color, 1.0);
}