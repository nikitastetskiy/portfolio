import test from 'node:test';
import assert from 'node:assert/strict';
import Particle from '../src/starfield/particle.js';

const bounds = { width: 1440, height: 900, depth: 800, near: 120, far: 1800 };

test('stars spawn and recycle without a trail from the center', () => {
  const star = new Particle(bounds, () => 0.7);
  assert.notEqual(star.sx, 0);
  assert.equal(star.sx, star.osx);
  assert.equal(star.sy, star.osy);
  star.z = bounds.near + 0.01;
  star.update(1 / 60);
  assert.equal(star.z, bounds.far);
  assert.equal(star.sx, star.osx);
  assert.equal(star.sy, star.osy);
  assert.equal(star.alpha, 0, 'recycled stars fade in');
});

test('star motion and trail lengths are independent of refresh rate', () => {
  const slow = new Particle(bounds, () => 0.6);
  const fast = new Particle(bounds, () => 0.6);
  for (let i = 0; i < 30; i++) slow.update(1 / 30);
  for (let i = 0; i < 144; i++) fast.update(1 / 144);
  for (const property of ['z', 'sx', 'sy', 'osx', 'osy', 'alpha']) {
    assert.ok(Math.abs(slow[property] - fast[property]) < 1e-8, property);
  }
});

test('projection stays finite and bounded through repeated edge and depth recycling', () => {
  for (const random of [0, 0.25, 0.5, 0.75, 0.999]) {
    const star = new Particle(bounds, () => random);
    for (let i = 0; i < 12000; i++) {
      star.update(1 / 60);
      for (const key of ['sx', 'sy', 'osx', 'osy', 'radius', 'alpha']) {
        assert.ok(Number.isFinite(star[key]), key);
      }
      assert.ok(star.z >= bounds.near && star.z <= bounds.far);
      assert.ok(Math.abs(star.sx) <= bounds.width / 2 + 8);
      assert.ok(Math.abs(star.sy) <= bounds.height / 2 + 8);
      assert.ok(star.radius > 0 && star.radius <= 1.65);
      assert.ok(star.alpha >= 0 && star.alpha <= 1);
    }
  }
});
