import { useEffect, useRef } from "react";
import GlslCanvas from "glslCanvas";

const fragmentShader = `
#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_tex0;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec4 color = texture2D(u_tex0, uv);

  float x = uv.x;

  if (x < 1.0/6.0) {
    // 1 - Normal
    gl_FragColor = color;
  } else if (x < 2.0/6.0) {
    // 2 - Preto e branco
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    gl_FragColor = vec4(vec3(gray), color.a);
  } else if (x < 3.0/6.0) {
    // 3 - Blur simples (média de 9 amostras)
    vec4 blur = vec4(0.0);
    float offset = 0.01;
    for(int dx=-1; dx<=1; dx++) {
      for(int dy=-1; dy<=1; dy++) {
        blur += texture2D(u_tex0, uv + vec2(dx, dy) * offset);
      }
    }
    blur /= 9.0;
    gl_FragColor = blur;
  } else if (x < 4.0/6.0) {
    // 4 - Saturação elevada
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    float saturation = 2.5; // quanto maior, mais saturado
    vec3 saturated = mix(vec3(gray), color.rgb, saturation);
    gl_FragColor = vec4(saturated, color.a);
  } else if (x < 5.0/6.0) {
    // 5 - Inversão RGB
    gl_FragColor = vec4(1.0 - color.rgb, color.a);
  } else {
    // 6 - Contraste elevado
    float contrast = 2.0; // quanto maior, mais contraste
    vec3 contrasted = (color.rgb - 0.5) * contrast + 0.5;
    gl_FragColor = vec4(contrasted, color.a);
  }
}
`;

const imageUrl = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1470&q=80";

export function GLSLSample() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const sandbox = new GlslCanvas(canvas);
    sandbox.load(fragmentShader);

    // Carrega a imagem como textura
    sandbox.setUniform("u_tex0", imageUrl);

    // Atualiza o tamanho do canvas
    function resize() {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      sandbox.setUniform("u_resolution", [canvas.width, canvas.height]);
    }
    resize();
    window.addEventListener("resize", resize);

    return () => {
      sandbox.destroy();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "40rem", display: "block", borderRadius: "8px", margin: "2rem 0" }}
    />
  );
}