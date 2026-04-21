"use client";

import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { HoverImageMaterial } from "./HoverImageMaterial";
import { useHoverImage } from "@/hooks/useHoverStore";
import { projects } from "@/data/projects";

extend({ HoverImageMaterial });

type MatType = THREE.ShaderMaterial & {
  uTexture: THREE.Texture | null;
  uOpacity: number;
  uVelocity: THREE.Vector2;
  uTime: number;
  uAspect: number;
  uImgAspect: number;
};

const mouse = { x: 0, y: 0, px: 0, py: 0 };

function MousePlane({ active }: { active: string | null }) {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<MatType>(null);
  const { viewport } = useThree();

  const images = projects.map((p) => p.cover);
  const textures = useTexture(images);

  useEffect(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.minFilter = THREE.LinearFilter;
    });
  }, [textures]);

  useFrame((state, delta) => {
    if (!mesh.current || !mat.current) return;

    const { pointer } = state;
    mouse.x = pointer.x * (viewport.width / 2);
    mouse.y = pointer.y * (viewport.height / 2);

    const m = mesh.current;
    m.position.x += (mouse.x - m.position.x) * 0.12;
    m.position.y += (mouse.y - m.position.y) * 0.12;

    const vx = mouse.x - mouse.px;
    const vy = mouse.y - mouse.py;
    mouse.px = mouse.x;
    mouse.py = mouse.y;

    mat.current.uVelocity.x += (vx * 6 - mat.current.uVelocity.x) * 0.1;
    mat.current.uVelocity.y += (vy * 6 - mat.current.uVelocity.y) * 0.1;

    const target = active ? 1 : 0;
    mat.current.uOpacity += (target - mat.current.uOpacity) * 0.12;
    mat.current.uTime += delta;

    if (active) {
      const idx = projects.findIndex((p) => p.cover === active);
      const tex = textures[idx];
      if (tex && mat.current.uTexture !== tex) {
        mat.current.uTexture = tex;
        const img = tex.image as { width: number; height: number };
        mat.current.uImgAspect = img.width / img.height;
      }
    }
  });

  const planeW = 4.5;
  const planeH = 3;

  return (
    <mesh ref={mesh} scale={[planeW, planeH, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      {/* @ts-expect-error custom material via extend */}
      <hoverImageMaterial
        ref={mat}
        transparent
        uAspect={planeW / planeH}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function HoverCanvas() {
  const active = useHoverImage();

  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      <Canvas
        orthographic
        camera={{ zoom: 100, position: [0, 0, 5] }}
        gl={{ alpha: true, antialias: true }}
      >
        <MousePlane active={active} />
      </Canvas>
    </div>
  );
}
