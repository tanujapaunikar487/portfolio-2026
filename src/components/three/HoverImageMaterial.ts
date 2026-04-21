import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

export const HoverImageMaterial = shaderMaterial(
  {
    uTexture: null as THREE.Texture | null,
    uOpacity: 0,
    uVelocity: new THREE.Vector2(0, 0),
    uTime: 0,
    uAspect: 1,
    uImgAspect: 1,
  },
  /* glsl */ `
    varying vec2 vUv;
    uniform vec2 uVelocity;
    void main() {
      vUv = uv;
      vec3 pos = position;
      // subtle bend on velocity
      float bend = (uv.x - 0.5) * uVelocity.x * 0.4
                 + (uv.y - 0.5) * uVelocity.y * -0.4;
      pos.z += bend;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  /* glsl */ `
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float uOpacity;
    uniform float uTime;
    uniform vec2 uVelocity;
    uniform float uAspect;
    uniform float uImgAspect;

    void main() {
      // object-fit: cover
      vec2 uv = vUv;
      float planeAspect = uAspect;
      float imgAspect = uImgAspect;
      vec2 ratio = vec2(
        min(planeAspect / imgAspect, 1.0),
        min(imgAspect / planeAspect, 1.0)
      );
      uv = (uv - 0.5) * ratio + 0.5;

      // RGB split driven by velocity
      vec2 dir = uVelocity * 0.015;
      float r = texture2D(uTexture, uv + dir).r;
      float g = texture2D(uTexture, uv).g;
      float b = texture2D(uTexture, uv - dir).b;
      float a = texture2D(uTexture, uv).a;

      gl_FragColor = vec4(r, g, b, a * uOpacity);
      if (gl_FragColor.a < 0.01) discard;
    }
  `,
);
