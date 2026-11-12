'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useInViewport } from '@/hooks/useInViewport';

/**
 * WebGL "startup ecosystem" — a Fibonacci sphere of nodes, linked to near
 * neighbours, wrapped by two orbit rings. Rotates slowly, tilts toward the
 * cursor and pauses when off-screen. Loaded lazily (client only).
 */
export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const visible = useInViewport(mountRef);
  const visibleRef = useRef(visible);
  visibleRef.current = visible;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const styles = getComputedStyle(document.documentElement);
    const brand = new THREE.Color(styles.getPropertyValue('--brand').trim() || '#f5b544');
    const violet = new THREE.Color(styles.getPropertyValue('--violet').trim() || '#8b97ff');

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.z = 7.2;
    const group = new THREE.Group();
    scene.add(group);

    // Fibonacci sphere nodes
    const COUNT = 220;
    const R = 2.2;
    const pts: THREE.Vector3[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      pts.push(new THREE.Vector3(Math.cos(t) * r * R, y * R, Math.sin(t) * r * R));
    }
    const pointGeo = new THREE.BufferGeometry().setFromPoints(pts);
    const colors = new Float32Array(COUNT * 3);
    pts.forEach((p, i) => {
      const c = brand.clone().lerp(violet, (p.y + R) / (2 * R));
      colors.set([c.r, c.g, c.b], i * 3);
    });
    pointGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const points = new THREE.Points(
      pointGeo,
      new THREE.PointsMaterial({ size: 0.055, vertexColors: true, transparent: true, opacity: 0.95, sizeAttenuation: true }),
    );
    group.add(points);

    // Neighbour links
    const linkPositions: number[] = [];
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const a = pts[i]!;
        const b = pts[j]!;
        if (a.distanceTo(b) < 0.52) linkPositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }
    }
    const linkGeo = new THREE.BufferGeometry();
    linkGeo.setAttribute('position', new THREE.Float32BufferAttribute(linkPositions, 3));
    const links = new THREE.LineSegments(linkGeo, new THREE.LineBasicMaterial({ color: violet, transparent: true, opacity: 0.18 }));
    group.add(links);

    // Orbit rings
    const ringMat = new THREE.MeshBasicMaterial({ color: brand, transparent: true, opacity: 0.35 });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(3.05, 0.006, 8, 160), ringMat);
    ring1.rotation.x = Math.PI / 2.4;
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.4, 0.004, 8, 160), ringMat.clone());
    ring2.rotation.set(Math.PI / 1.8, 0.4, 0);
    (ring2.material as THREE.MeshBasicMaterial).color = violet;
    scene.add(ring1, ring2);

    // Satellites travelling along rings
    const satGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const sat1 = new THREE.Mesh(satGeo, new THREE.MeshBasicMaterial({ color: brand }));
    const sat2 = new THREE.Mesh(satGeo, new THREE.MeshBasicMaterial({ color: violet }));
    ring1.add(sat1);
    ring2.add(sat2);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      renderer.setSize(w, h, false);
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const target = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 0.6;
      target.y = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener('pointermove', onPointer, { passive: true });

    const clock = new THREE.Clock();
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visibleRef.current) return;
      const t = clock.getElapsedTime();
      const speed = reduced ? 0 : 1;
      group.rotation.y = t * 0.08 * speed + target.x;
      group.rotation.x += (target.y - group.rotation.x) * 0.04;
      ring1.rotation.z = t * 0.05 * speed;
      ring2.rotation.z = -t * 0.04 * speed;
      sat1.position.set(Math.cos(t * 0.6) * 3.05, Math.sin(t * 0.6) * 3.05, 0);
      sat2.position.set(Math.cos(-t * 0.45) * 3.4, Math.sin(-t * 0.45) * 3.4, 0);
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points || obj instanceof THREE.LineSegments) {
          obj.geometry.dispose();
          const m = obj.material;
          (Array.isArray(m) ? m : [m]).forEach((mat) => mat.dispose());
        }
      });
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} aria-hidden className="absolute inset-0 [&>canvas]:size-full" />;
}
