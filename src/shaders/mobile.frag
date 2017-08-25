#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;
uniform float scroll;
uniform sampler2D image;

#define PI 3.141592

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.8,78.3)))*
        437.23);
}

vec2 rotate(in vec2 v, in float a) {
    float s = sin(a);
    float c = cos(a);
    mat2 m = mat2(c, -s, s, c);
    return m * v;
}

void main( void ) {
    vec2 p = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);
    p = p * (length(mouse - vec2(.5)) + scroll);

    float r = random(vec2(floor((abs(p.x) + abs(p.y)) * 8. - mod(time + scroll * 100., 20.))));
    float r2 = random(vec2(r));
    vec2 f = vec2(r, r2) * 2. - 1.;
    vec3 color = texture2D(image, abs(p + f * sin(time * .2)) * r).rgb * 2.;

    gl_FragColor = vec4(color, 1.0);
}
