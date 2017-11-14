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

vec3 dia(in vec2 p) {
    p = p * (length(mouse - vec2(.5)) + scroll);

    float r = random(vec2(floor((abs(p.x) + abs(p.y)) * 16. - mod(time + scroll * 100., 20.))));
    float r2 = random(vec2(r));
    vec2 f = vec2(r, r2) * 2. - 1.;

    return texture2D(image, abs(p + f * sin(time * .2)) * r).rgb * 2.;
}

void main( void ) {
    vec2 p = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);
    vec2 p2 = p * (length(mouse - vec2(.5)) + scroll + 1.5);

    p = abs(p);
    p = (p - .5) * (sin(scroll + time * .7) * .2 + .3) + .5;
    p = rotate(p, sin(scroll * 3.1)) * rotate(p, cos(scroll * 4.3));
    p = p * rotate(p, cos(scroll * 4.3));

    vec3 color1 = texture2D(image, fract(p * 3.)).rgb;
    vec3 color2 = dia(p2);

    vec3 color = color1 * color2 * 2.5;

    gl_FragColor = vec4(color, 1.0);
}
