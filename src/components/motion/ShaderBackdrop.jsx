import { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/components/theme-provider";

const vertex = `
  varying vec2 vUv;
  void main() {
    vUv = position.xy * 0.5 + 0.5;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragment = `
  precision highp float;
  uniform float uTime;
  uniform vec3 uBase;
  uniform vec3 uSpot;
  varying vec2 vUv;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  void main() {
    vec2 uv = vUv;
    // slow flowing brightness field
    float f = 0.5 + 0.5 * sin(uv.x * 3.0 + uTime * 0.15) * sin(uv.y * 2.0 - uTime * 0.10);
    vec3 col = mix(uBase, uBase * 1.07 + 0.012, f * 0.6);
    // spot bloom, top-right, drifting
    vec2 c = vec2(0.9 + 0.03 * sin(uTime * 0.2), 0.88 + 0.03 * cos(uTime * 0.17));
    float d = distance(uv, c);
    col = mix(col, mix(col, uSpot, 0.55), smoothstep(0.65, 0.0, d) * 0.16);
    // fine grain to kill banding
    col += (hash(uv * 850.0 + uTime) - 0.5) * 0.018;
    gl_FragColor = vec4(col, 1.0);
  }
`;

function Quad() {
  const { theme } = useTheme();
  const matRef = useRef();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uBase: { value: new THREE.Color("#0c0b08") },
      uSpot: { value: new THREE.Color("#ff5630") },
    }),
    []
  );

  useEffect(() => {
    const base = theme === "dark" ? "#0c0b08" : "#f4f1e9";
    const spot = theme === "dark" ? "#ff5630" : "#d83a1a";
    uniforms.uBase.value.set(base);
    uniforms.uSpot.value.set(spot);
  }, [theme, uniforms]);

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function ShaderBackdrop({ className }) {
  return (
    <div className={className} aria-hidden>
      <Canvas
        gl={{ antialias: false, powerPreference: "low-power" }}
        dpr={[1, 1.5]}
        style={{ position: "absolute", inset: 0 }}
      >
        <Quad />
      </Canvas>
    </div>
  );
}
