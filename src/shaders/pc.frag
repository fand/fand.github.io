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
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

vec2 rotate(in vec2 v, in float a) {
    float s = sin(a);
    float c = cos(a);
    mat2 m = mat2(c, -s, s, c);
    return m * v;
}

void main( void ) {
    vec2 p = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);
    vec2 p2 = p * (length(mouse - vec2(.5)) + scroll + 1.5);
    vec3 color = vec3(0);

    p.x *= .9;
    p = abs(p);
    p = (p - .5) * (sin(scroll + time * .2) * .2 + .3) + .5;
    p = rotate(p, sin(time * .1 + scroll * 10.));

    // p = fract(vec2(
    //     p.x + floor(noise(p.xy + scroll) * 16.),
    //     p.y + floor(noise(p.yx + scroll) * 16.)
    // ) * 2.7);

    p = rotate(p, sin(scroll * 3.1)) * rotate(p, cos(scroll * 4.3));

    vec3 color1 = texture2D(image, fract(p * 3.)).rgb;
    vec3 color2 = texture2D(image, abs(p2) * random(vec2(floor((abs(p2.x) + abs(p2.y)) * 8. - time)))).rgb;

    // color = mix(color2 * 2., color1 * 2., sin(time) * .5 + .5);
    color = min(color2 * 2., color1 * 2.);

    gl_FragColor = vec4(color, 1.0);
}
