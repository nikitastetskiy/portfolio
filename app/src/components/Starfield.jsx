import { useEffect, useRef } from 'react';
import Particle from '../starfield/particle.js';

export default function Starfield() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame;
    let particles = [];
    let bounds = { width: 0, height: 0, depth: 800, near: 120, far: 1800 };
    let pixelRatio = 0;
    let lastTime = null;
    let inView = true;

    const render = (seconds = 0) => {
      context.clearRect(0, 0, bounds.width, bounds.height);
      context.save();
      context.translate(bounds.width / 2, bounds.height / 2);
      for (const particle of particles) {
        if (seconds) particle.update(seconds);
        const { sx, sy, radius, alpha, color } = particle;
        if (radius > 0.85) {
          context.beginPath();
          context.arc(sx, sy, radius * 2.75, 0, Math.PI * 2);
          context.fillStyle = `rgba(${color},${alpha * 0.06})`;
          context.fill();
        }
        context.beginPath();
        context.arc(sx, sy, radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(${color},${alpha})`;
        context.fill();
      }
      context.restore();
    };

    const resize = () => {
      const width = canvas.parentElement.clientWidth;
      const height = canvas.parentElement.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      if (width === bounds.width && height === bounds.height && ratio === pixelRatio) return;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      pixelRatio = ratio;
      if (width !== bounds.width || height !== bounds.height) {
        bounds = { ...bounds, width, height };
        const count = Math.max(40, Math.min(220, Math.round(width * height / 8500)));
        particles = Array.from({ length: count }, () => new Particle(bounds));
      }
    };

    const draw = (timestamp) => {
      if (document.hidden || !inView || media.matches) return;
      resize();
      // Time-based motion stays smooth on high-refresh screens and after slow frames.
      const seconds = lastTime === null ? 0 : Math.min((timestamp - lastTime) / 1000, 0.05);
      lastTime = timestamp;
      render(seconds);
      frame = requestAnimationFrame(draw);
    };

    const restart = () => {
      cancelAnimationFrame(frame);
      lastTime = null;
      resize();
      if (document.hidden || !inView) return;
      render();
      // Reduced motion keeps a still sky instead of running the animation.
      if (!media.matches) frame = requestAnimationFrame(draw);
    };

    restart();
    const observer = new ResizeObserver(restart);
    observer.observe(canvas.parentElement);
    const visibility = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      restart();
    });
    visibility.observe(canvas);
    window.addEventListener('resize', restart);
    document.addEventListener('visibilitychange', restart);
    media.addEventListener('change', restart);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      window.removeEventListener('resize', restart);
      document.removeEventListener('visibilitychange', restart);
      media.removeEventListener('change', restart);
    };
  }, []);
  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />;
}
