import { describe, expect, it } from 'vitest';
import { greeting } from '../../src/lib/greeting.js';

describe('greeting', () => {
  it('should use the default prefix', () => {
    expect(greeting('Node.js')).toBe('Hello, Node.js!');
  });

  it('should use a custom prefix', () => {
    expect(
      greeting('Node.js', { prefix: 'Welcome' }),
    ).toBe('Welcome, Node.js!');
  });
});
