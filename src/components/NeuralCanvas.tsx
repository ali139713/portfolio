import { useEffect, useRef } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  SRGBColorSpace,
  TorusGeometry,
  Vector3,
  WebGLRenderer,
} from "three";

const ACCENT_PRIMARY = "#38bdf8";
const ACCENT_SECONDARY = "#818cf8";
const ACCENT_HIGHLIGHT = "#a5f3fc";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function lerpChannel(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function sampleGradient(t: number): [number, number, number] {
  const clamped = Math.min(Math.max(t, 0), 1);
  const from = new Color(ACCENT_PRIMARY);
  const to = new Color(ACCENT_SECONDARY);
  from.lerp(to, clamped);
  return [from.r, from.g, from.b];
}

/** Even spherical distribution — reads cleaner than pure random clusters. */
function createParticleCloud(count: number, spread: number, verticalScale: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const points: Vector3[] = [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;

  for (let index = 0; index < count; index += 1) {
    const radius = spread * (0.42 + (index / count) * 0.48);
    const theta = (2 * Math.PI * index) / goldenRatio;
    const phi = Math.acos(1 - (2 * (index + 0.5)) / count);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta) * verticalScale;
    const z = radius * Math.cos(phi) * 0.72;

    positions[index * 3] = x;
    positions[index * 3 + 1] = y;
    positions[index * 3 + 2] = z;

    const normalizedY = (y / (spread * verticalScale) + 1) * 0.5;
    const [r, g, b] = sampleGradient(normalizedY);
    colors[index * 3] = r;
    colors[index * 3 + 1] = g;
    colors[index * 3 + 2] = b;

    points.push(new Vector3(x, y, z));
  }

  return { positions, colors, points };
}

function pickHubIndices(points: Vector3[], hubCount: number) {
  const ranked = points
    .map((point, index) => ({ index, score: point.lengthSq() }))
    .sort((left, right) => right.score - left.score);
  return ranked.slice(0, hubCount).map((entry) => entry.index);
}

export function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const reducedMotion = prefersReducedMotion();
    const isMobile = window.innerWidth < 720;
    const renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.6));
    renderer.outputColorSpace = SRGBColorSpace;

    const scene = new Scene();
    const camera = new PerspectiveCamera(56, 1, 0.1, 100);
    camera.position.set(0, 0, isMobile ? 9.2 : 7.8);

    const network = new Group();
    const architecture = new Group();
    scene.add(network);
    scene.add(architecture);
    const baseCameraZ = isMobile ? 9.2 : 7.8;

    const particleCount = isMobile ? 96 : 200;
    const { positions, colors, points } = createParticleCloud(
      particleCount,
      isMobile ? 5.2 : 5.9,
      0.58,
    );
    const pointGeometry = new BufferGeometry();
    pointGeometry.setAttribute("position", new BufferAttribute(positions, 3));
    pointGeometry.setAttribute("color", new BufferAttribute(colors, 3));

    const pointMaterial = new PointsMaterial({
      size: isMobile ? 0.058 : 0.044,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      vertexColors: true,
      sizeAttenuation: true,
      blending: AdditiveBlending,
    });
    const particleField = new Points(pointGeometry, pointMaterial);
    network.add(particleField);

    const hubCount = isMobile ? 6 : 14;
    const hubIndices = pickHubIndices(points, hubCount);
    const hubPositions = new Float32Array(hubCount * 3);
    const hubColors = new Float32Array(hubCount * 3);
    const highlight = new Color(ACCENT_HIGHLIGHT);
    hubIndices.forEach((pointIndex, hubIndex) => {
      const source = points[pointIndex];
      hubPositions[hubIndex * 3] = source.x;
      hubPositions[hubIndex * 3 + 1] = source.y;
      hubPositions[hubIndex * 3 + 2] = source.z;
      hubColors[hubIndex * 3] = highlight.r;
      hubColors[hubIndex * 3 + 1] = highlight.g;
      hubColors[hubIndex * 3 + 2] = highlight.b;
    });
    const hubGeometry = new BufferGeometry();
    hubGeometry.setAttribute("position", new BufferAttribute(hubPositions, 3));
    hubGeometry.setAttribute("color", new BufferAttribute(hubColors, 3));
    const hubMaterial = new PointsMaterial({
      size: isMobile ? 0.11 : 0.085,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      vertexColors: true,
      sizeAttenuation: true,
      blending: AdditiveBlending,
    });
    const hubField = new Points(hubGeometry, hubMaterial);
    network.add(hubField);

    const linkPositions: number[] = [];
    const maxDistance = isMobile ? 1.12 : 0.92;
    const linkThreshold = isMobile ? 0.74 : 0.68;
    for (let outer = 0; outer < points.length; outer += 1) {
      for (let inner = outer + 1; inner < points.length; inner += 1) {
        if (points[outer].distanceTo(points[inner]) < maxDistance && Math.random() > linkThreshold) {
          linkPositions.push(
            points[outer].x,
            points[outer].y,
            points[outer].z,
            points[inner].x,
            points[inner].y,
            points[inner].z,
          );
        }
      }
    }

    const linkGeometry = new BufferGeometry();
    linkGeometry.setAttribute("position", new Float32BufferAttribute(linkPositions, 3));
    const linkBaseOpacity = isMobile ? 0.14 : 0.2;
    const linkMaterial = new LineBasicMaterial({
      color: ACCENT_SECONDARY,
      transparent: true,
      opacity: linkBaseOpacity,
      depthWrite: false,
      blending: AdditiveBlending,
    });
    const linkField = new LineSegments(linkGeometry, linkMaterial);
    network.add(linkField);

    const dustCount = isMobile ? 90 : 170;
    const dustPositions = new Float32Array(dustCount * 3);
    const dustVelocities = new Float32Array(dustCount * 3);
    for (let index = 0; index < dustCount; index += 1) {
      dustPositions[index * 3] = (Math.random() - 0.5) * 16;
      dustPositions[index * 3 + 1] = (Math.random() - 0.5) * 10;
      dustPositions[index * 3 + 2] = -3 - Math.random() * 6;
      dustVelocities[index * 3] = (Math.random() - 0.5) * 0.012;
      dustVelocities[index * 3 + 1] = (Math.random() - 0.5) * 0.008;
      dustVelocities[index * 3 + 2] = (Math.random() - 0.5) * 0.004;
    }
    const dustGeometry = new BufferGeometry();
    dustGeometry.setAttribute("position", new BufferAttribute(dustPositions, 3));
    const dustMaterial = new PointsMaterial({
      color: "#f4f4f5",
      size: isMobile ? 0.028 : 0.022,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
      blending: AdditiveBlending,
    });
    const dustField = new Points(dustGeometry, dustMaterial);
    scene.add(dustField);

    const coreGeometry = new IcosahedronGeometry(isMobile ? 1.45 : 1.85, 2);
    const coreMaterial = new MeshBasicMaterial({
      color: ACCENT_PRIMARY,
      wireframe: true,
      transparent: true,
      opacity: isMobile ? 0.14 : 0.2,
      blending: AdditiveBlending,
    });
    const core = new Mesh(coreGeometry, coreMaterial);
    architecture.add(core);

    const coreGlowGeometry = new IcosahedronGeometry(isMobile ? 2.15 : 2.65, 1);
    const coreGlowMaterial = new MeshBasicMaterial({
      color: ACCENT_SECONDARY,
      wireframe: true,
      transparent: true,
      opacity: isMobile ? 0.05 : 0.07,
      blending: AdditiveBlending,
    });
    const coreGlow = new Mesh(coreGlowGeometry, coreGlowMaterial);
    architecture.add(coreGlow);

    const ringMaterial = new MeshBasicMaterial({
      color: ACCENT_SECONDARY,
      wireframe: true,
      transparent: true,
      opacity: 0.14,
      blending: AdditiveBlending,
    });
    const ringA = new Mesh(new TorusGeometry(isMobile ? 2.05 : 2.55, 0.006, 8, 96), ringMaterial);
    const ringB = new Mesh(
      new TorusGeometry(isMobile ? 2.55 : 3.1, 0.006, 8, 112),
      ringMaterial.clone(),
    );
    ringA.rotation.x = Math.PI / 2.5;
    ringB.rotation.y = Math.PI / 2.25;
    architecture.add(ringA, ringB);

    let frameId = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let targetScroll = 0;
    let currentScroll = 0;
    let targetLayoutX = 0;
    let currentLayoutX = 0;
    const startTime = performance.now();

    const updateScrollProgress = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      targetScroll = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
    };

    const updateLayoutCenter = () => {
      const width = canvas.clientWidth || window.innerWidth;
      const main = document.querySelector(".main-content");
      const mainPaddingLeft = main
        ? Number.parseFloat(window.getComputedStyle(main).paddingLeft) || 0
        : 0;
      const visibleHeight = 2 * Math.tan((camera.fov * Math.PI) / 360) * Math.abs(baseCameraZ);
      const visibleWidth = visibleHeight * camera.aspect;

      targetLayoutX = (mainPaddingLeft / 2 / Math.max(width, 1)) * visibleWidth;
    };

    const resize = () => {
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      updateLayoutCenter();
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 0.95;
      targetY = (event.clientY / window.innerHeight - 0.5) * 0.52;
    };

    const render = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      const breathe = 1 + Math.sin(elapsed * 0.55) * 0.028;
      const pulse = 0.5 + Math.sin(elapsed * 1.35) * 0.5;
      const linkPulse = 0.5 + Math.sin(elapsed * 2.1 + currentScroll * Math.PI) * 0.5;

      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;
      currentScroll += (targetScroll - currentScroll) * 0.055;
      currentLayoutX += (targetLayoutX - currentLayoutX) * 0.06;
      const scrollAngle = currentScroll * Math.PI * 1.65;
      const scrollDrift = currentScroll - 0.5;
      const pointerIntensity = Math.min(Math.hypot(currentX, currentY) * 1.2, 1);

      for (let index = 0; index < dustCount; index += 1) {
        dustPositions[index * 3] += dustVelocities[index * 3];
        dustPositions[index * 3 + 1] += dustVelocities[index * 3 + 1];
        dustPositions[index * 3 + 2] += dustVelocities[index * 3 + 2];

        if (dustPositions[index * 3] > 8) dustPositions[index * 3] = -8;
        if (dustPositions[index * 3] < -8) dustPositions[index * 3] = 8;
        if (dustPositions[index * 3 + 1] > 5) dustPositions[index * 3 + 1] = -5;
        if (dustPositions[index * 3 + 1] < -5) dustPositions[index * 3 + 1] = 5;
      }
      dustGeometry.attributes.position.needsUpdate = true;

      network.scale.setScalar(breathe);
      network.rotation.y = elapsed * 0.038 + currentX + scrollAngle * 0.42;
      network.rotation.x = Math.sin(elapsed * 0.18) * 0.07 + currentY + scrollDrift * 0.34;
      network.rotation.z = scrollDrift * 0.16 + currentX * 0.08;
      network.position.x =
        currentLayoutX + Math.sin(currentScroll * Math.PI * 2) * (isMobile ? 0.18 : 0.34);
      network.position.y = -scrollDrift * (isMobile ? 0.42 : 0.68);

      particleField.rotation.z = Math.sin(elapsed * 0.16) * 0.04 + scrollAngle * 0.18;
      hubField.rotation.z = particleField.rotation.z;
      pointMaterial.opacity = lerpChannel(0.72, 0.95, pulse);
      hubMaterial.opacity = lerpChannel(0.78, 1, pulse);
      linkMaterial.opacity = linkBaseOpacity * lerpChannel(0.55, 1.15, linkPulse);

      architecture.rotation.y = -elapsed * 0.062 + currentX * 0.36 - scrollAngle * 0.56;
      architecture.rotation.x = elapsed * 0.028 + currentY * 0.36 + scrollDrift * 0.28;
      architecture.rotation.z = Math.sin(currentScroll * Math.PI) * 0.12;
      architecture.position.x =
        currentLayoutX - Math.sin(currentScroll * Math.PI) * (isMobile ? 0.22 : 0.48);
      architecture.position.y = scrollDrift * (isMobile ? 0.28 : 0.5);

      const coreScale = 1 + currentScroll * 0.16 + pulse * 0.04;
      core.rotation.z = elapsed * 0.08 + scrollAngle * 0.22;
      core.scale.setScalar(coreScale);
      coreMaterial.opacity = lerpChannel(0.12, 0.24, pulse);

      coreGlow.rotation.y = -elapsed * 0.05;
      coreGlow.rotation.x = elapsed * 0.03;
      coreGlow.scale.setScalar(coreScale * 1.08);
      coreGlowMaterial.opacity = lerpChannel(0.04, 0.1, pulse);

      const ringScale = 1 + Math.sin(elapsed * 0.7) * 0.025;
      ringA.scale.setScalar(ringScale);
      ringB.scale.setScalar(1.02 - Math.sin(elapsed * 0.7) * 0.02);
      ringA.rotation.z = elapsed * 0.12 + scrollAngle * 0.3;
      ringB.rotation.x = Math.PI / 2.25 + elapsed * 0.08 + scrollAngle * 0.18;
      ringMaterial.opacity = lerpChannel(0.1, 0.2, pulse);
      (ringB.material as MeshBasicMaterial).opacity = ringMaterial.opacity * 0.85;

      camera.position.x = Math.sin(elapsed * 0.12) * 0.12 + currentX * 0.22;
      camera.position.y = Math.cos(elapsed * 0.1) * 0.08 + currentY * 0.16;
      camera.position.z = baseCameraZ - currentScroll * (isMobile ? 0.25 : 0.58) - pointerIntensity * 0.18;
      camera.lookAt(currentLayoutX * 0.35, scrollDrift * 0.2, 0);

      renderer.render(scene, camera);

      if (!reducedMotion) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    resize();
    updateScrollProgress();
    updateLayoutCenter();
    currentLayoutX = targetLayoutX;
    render();

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("pointermove", handlePointerMove);
      pointGeometry.dispose();
      pointMaterial.dispose();
      hubGeometry.dispose();
      hubMaterial.dispose();
      linkGeometry.dispose();
      linkMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      coreGlowGeometry.dispose();
      coreGlowMaterial.dispose();
      ringA.geometry.dispose();
      ringB.geometry.dispose();
      ringMaterial.dispose();
      (ringB.material as MeshBasicMaterial).dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas className="neural-canvas" ref={canvasRef} aria-hidden="true" />;
}

export default NeuralCanvas;
