export default class Particle {
  constructor(bounds, random = Math.random) {
    this.bounds = bounds;
    this.random = random;
    this.reset(true);
  }

  between(min, max) {
    return min + this.random() * (max - min);
  }

  reset(initial = false) {
    const { width, height, depth, near, far } = this.bounds;
    this.z = initial ? this.between(near * 2, far) : far;
    const scale = depth / this.z;
    this.x = this.between(-width / 2, width / 2) / scale;
    this.y = this.between(-height / 2, height / 2) / scale;
    this.speed = this.between(36, 72);
    this.size = this.between(0.45, 1.05);
    this.brightness = this.between(0.35, 0.8);
    this.phase = this.between(0, Math.PI * 2);
    this.twinkleSpeed = this.between(0.6, 1.4);
    this.age = initial ? 1.2 : 0;
    const tint = this.random();
    this.color = tint < 0.82 ? '224,232,245'
      : tint < 0.89 ? '164,195,255'
      : tint < 0.96 ? '255,146,137'
      : '255,215,174';
    this.project();
    // A new star never draws a trail from the center or its previous location.
    this.osx = this.sx;
    this.osy = this.sy;
  }

  project() {
    const scale = this.bounds.depth / this.z;
    this.sx = this.x * scale;
    this.sy = this.y * scale;
    // A fixed exposure keeps trails the same length at different refresh rates.
    const previousScale = this.bounds.depth / (this.z + this.speed / 60);
    this.osx = this.x * previousScale;
    this.osy = this.y * previousScale;
    this.radius = Math.min(1.65, this.size * Math.sqrt(scale));
    const fade = Math.max(0, Math.min(1, this.age / 1.2, (this.z - this.bounds.near) / 180));
    this.alpha = this.brightness * fade * (0.88 + 0.12 * Math.sin(this.phase));
  }

  update(seconds) {
    this.z -= this.speed * seconds;
    this.age += seconds;
    this.phase += this.twinkleSpeed * seconds;
    if (this.z <= this.bounds.near) {
      this.reset();
      return;
    }
    this.project();
    if (Math.abs(this.sx) > this.bounds.width / 2 + 8 ||
        Math.abs(this.sy) > this.bounds.height / 2 + 8) {
      this.reset();
    }
  }
}
