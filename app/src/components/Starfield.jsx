import { useEffect, useRef } from 'react';
import Particle from '../starfield/particle.js';

// Original particle model, using browser APIs instead of legacy React lifecycle packages.
export default function Starfield() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame;
    let particles = [];
    let bounds;
    let lastTime = 0;
    const reset = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      const x = canvas.width / 2,
        y = canvas.height / 2;
      bounds = {
        depth: 1000,
        width: canvas.width,
        height: canvas.height,
        x: { min: -x, max: x },
        y: { min: -y, max: y },
        z: { min: -1000, max: 1000 },
      };
      particles = Array.from({ length: 350 }, () => new Particle(bounds));
    };
    const draw = (timestamp) => {
      if (document.hidden || media.matches) return;
      // Cap animation updates to 60fps on high-refresh displays.
      if (timestamp - lastTime >= 16) {
        lastTime = timestamp;
        const x = canvas.width / 2,
          y = canvas.height / 2;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        context.translate(x, y);
        for (const particle of particles) {
          particle.s = bounds.depth / (bounds.depth + particle.z);
          particle.sx = particle.x * particle.s;
          particle.sy = particle.y * particle.s;
          particle.alpha = (bounds.z.max - particle.z) / (bounds.z.max / 2);
          context.beginPath();
          context.moveTo(particle.sx, particle.sy);
          context.lineTo(particle.osx, particle.osy);
          context.strokeStyle = `hsla(${particle.hue},100%,${particle.lightness}%,${particle.alpha})`;
          context.stroke();
          particle.update();
        }
        context.restore();
      }
      frame = requestAnimationFrame(draw);
    };
    const start = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden && !media.matches) frame = requestAnimationFrame(draw);
      else context.clearRect(0, 0, canvas.width, canvas.height);
    };
    reset();
    start();
    const observer = new ResizeObserver(reset);
    observer.observe(canvas.parentElement);
    document.addEventListener('visibilitychange', start);
    media.addEventListener('change', start);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener('visibilitychange', start);
      media.removeEventListener('change', start);
    };
  }, []);
  return <canvas ref={canvasRef} className="text-mix-star starfield" aria-hidden="true" />;
}
