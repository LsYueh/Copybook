import { describe, expect, it } from 'vitest';
import * as lib from '../src/index.ts';

describe('public API', () => {
  it('should import the public API', () => {
    expect(lib.greeting).toBeTypeOf('function');
  });

  it('should execute the exported function', () => {
    expect(lib.greeting('Node.js')).toBe('Hello, Node.js!');
  });
});