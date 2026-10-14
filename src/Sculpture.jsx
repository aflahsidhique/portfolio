import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export default function Sculpture({ reducedMotion }) {
  const host = useRef(null);
  useEffect(() => {
    const element = host.current;
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }); }
    catch { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    element.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0, 7.8);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, 0.04);
    scene.environment = environment.texture;
    room.dispose();
    const group = new THREE.Group();
    scene.add(group);
    const geometry = new THREE.TorusKnotGeometry(1.23, 0.43, 220, 40, 2, 3);
    const material = new THREE.MeshStandardMaterial({ color: 0xf64a12, metalness: 0.77, roughness: 0.22 });
    const mesh = new THREE.Mesh(geometry, material);
    group.add(mesh);
    group.rotation.set(0.25, -0.3, -0.5);
    const key = new THREE.DirectionalLight(0xffeee0, 4);
    key.position.set(-3, 5, 4);
    scene.add(key, new THREE.AmbientLight(0xffffff, 0.8));
    let pointerX = 0, pointerY = 0, frame = 0, visible = true, elapsed = 0, previousTime = 0;
    const render = (time = 0) => {
      if (!visible || document.hidden) { frame = 0; return; }
      const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
      previousTime = time;
      elapsed += delta;
      if (!reducedMotion) {
        mesh.rotation.y = elapsed * 0.13;
        mesh.rotation.z = Math.sin(elapsed * 0.23) * 0.12;
        group.rotation.x += (0.25 + pointerY * 0.22 - group.rotation.x) * 0.035;
        group.rotation.y += (-0.3 + pointerX * 0.35 - group.rotation.y) * 0.035;
        group.position.y = Math.sin(elapsed * 0.75) * 0.08;
      }
      renderer.render(scene, camera);
      if (!reducedMotion) frame = requestAnimationFrame(render);
    };
    const start = () => { if (!frame && visible && !document.hidden) { previousTime = 0; frame = requestAnimationFrame(render); } };
    const resize = new ResizeObserver(() => {
      const { width, height } = element.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      if (reducedMotion) renderer.render(scene, camera);
    });
    resize.observe(element);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; start(); });
    observer.observe(element);
    const pointer = (event) => {
      const bounds = element.getBoundingClientRect();
      pointerX = (event.clientX - bounds.left) / bounds.width * 2 - 1;
      pointerY = (event.clientY - bounds.top) / bounds.height * 2 - 1;
    };
    element.addEventListener('pointermove', pointer);
    document.addEventListener('visibilitychange', start);
    element.classList.add('is-rendered');
    start();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect(); observer.disconnect();
      element.removeEventListener('pointermove', pointer);
      document.removeEventListener('visibilitychange', start);
      geometry.dispose(); material.dispose(); environment.dispose(); pmrem.dispose(); renderer.dispose();
      renderer.domElement.remove(); element.classList.remove('is-rendered');
    };
  }, [reducedMotion]);
  return <div className="sculpture" ref={host} aria-hidden="true"><div className="sculpture-fallback" /></div>;
}
