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

  if (uv.x < 1.0/3.0) {
    // 1/3 normal
    gl_FragColor = color;
  } else if (uv.x < 2.0/3.0) {
    // 1/3 preto e branco
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    gl_FragColor = vec4(vec3(gray), color.a);
  } else {
    // 1/3 blur simples (média de 9 amostras)
    vec4 blur = vec4(0.0);
    float offset = 0.01;
    for(int dx=-1; dx<=1; dx++) {
      for(int dy=-1; dy<=1; dy++) {
        blur += texture2D(u_tex0, uv + vec2(dx, dy) * offset);
      }
    }
    blur /= 9.0;
    gl_FragColor = blur;
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
      style={{ width: "100%", height: "750px", display: "block", borderRadius: "8px", margin: "2rem 0" }}
    />
  );
}