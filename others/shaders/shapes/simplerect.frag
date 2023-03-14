#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

void main(){
    vec2 st = gl_FragCoord.xy / u_resolution;

    vec3 color = vec3(1.);

//simple form
    // float left = step(0.1,st.x); //if(x<=0.1)
    // float bottom = step(0.1,st.y); //if(y<=0.1)
    // float top = step(0.1,1.0 - st.y); // if( y>=0.9)
    // float right = step(0.1,1.0 - st.x); // if(x>= 0.9)
    // color = vec3(right * bottom * top * left); // and in if

    //Step vector form
    // vec2 bl = step(vec2(0.1),st);
    // vec2 tr = step(vec2(0.1),1.0-st);
    // color = vec3(bl.x * bl.y * tr.x * tr.y);


    // smoothstep
    vec2 bl = smoothstep(0.,0.1,st.x);
    color = vec3(bl);




    color = mix(vec3(0.8118, 0.5333, 0.0118),vec3(0.8118, 0.3373, 0.3373),color);



    gl_FragColor = vec4(color,1.);

}