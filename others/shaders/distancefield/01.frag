#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec3 color = vec3(0.0);
  float d = 0.0;

  // Remap the space to -1. to 1.
  st = st *2.-1.;

  // Make the distance field
//   d = length( abs(st)-0.5 );
  d = length( abs(st)+99999. );
//   d = length( min(abs(st)-.3,0.) );
//   d = length( max(abs(st)-.1,0.) );

  // Visualize the distance field
    // color = vec3(fract(d*4.));
    color = vec3(fract(d*5.+cos(u_time)));
    color = mix(color,vec3(1.),vec3(0.0, 0.2471, 0.4118));
    gl_FragColor = vec4(color,1.);

//   gl_FragColor = vec4(vec3(d),1.0);

  // Drawing with the distance field
  // gl_FragColor = vec4(vec3( step(.3,d) ),1.0);
  // gl_FragColor = vec4(vec3( step(.3,d) * step(d,.4)),1.0);
  // gl_FragColor = vec4(vec3( smoothstep(.3,.4,d)* smoothstep(.6,.5,d)) ,1.0);
}
