import { describe, expect, it } from 'vitest';
import { parsePic, parsePicClause } from '../../../src/lib/cobol/parser';
import { PicType } from '../../../src/lib/cobol/type';

describe('COBOL PIC Tokenizer', () => {
  it('parses 9', () => {
    expect(parsePic('9')).toEqual([
      { char: '9', count: 1 },
    ]);

    expect(parsePic('9(1)')).toEqual([
      { char: '9', count: 1 },
    ]);

    expect(parsePic('9(02)')).toEqual([
      { char: '9', count: 2 },
    ]);
  });

  it('parses S9(3)V99', () => {
    expect(parsePic('S9(3)V99')).toEqual([
      { char: 'S', count: 1 },
      { char: '9', count: 3 },
      { char: 'V', count: 1 },
      { char: '9', count: 2 },
    ]);
  });

  it('parses 999v99999', () => {
    expect(parsePic('999v99999')).toEqual([
      { char: '9', count: 3 },
      { char: 'V', count: 1 },
      { char: '9', count: 5 },
    ]);
  });

  it('parses X', () => {
    expect(parsePic('X')).toEqual([
      { char: 'X', count: 1 },
    ]);

    expect(parsePic('X(1)')).toEqual([
      { char: 'X', count: 1 },
    ]);

    expect(parsePic('X(02)')).toEqual([
      { char: 'X', count: 2 },
    ]);
  });

  it('parses XX', () => {
    expect(parsePic('XX')).toEqual([
      { char: 'X', count: 2 },
    ]);
  });

  it('parses ZZZ9.99', () => {
    expect(parsePic('ZZZ9.99')).toEqual([
      { char: 'Z', count: 3 },
      { char: '9', count: 1 },
      { char: '.', count: 1 },
      { char: '9', count: 2 },
    ]);
  });
});

describe('COBOL PIC Parser', () => {
  it('parses X(999)', () => {
    const pic = parsePicClause('X(999)');

    expect(pic.type).toBe(PicType.Alphanumeric);
    expect(pic.digits).toBe(999);
    expect(pic.decimals).toBe(0);
    expect(pic.size).toBe(999);
  });

  it('parses 999v99999', () => {
    const pic = parsePicClause('999v99999');

    expect(pic.type).toBe(PicType.Numeric);
    expect(pic.digits).toBe(3);
    expect(pic.decimals).toBe(5);
    expect(pic.size).toBe(8);
  });

  it('parses S999v99999', () => {
    const pic = parsePicClause('S999v99999');

    expect(pic.type).toBe(PicType.SignedNumeric);
    expect(pic.digits).toBe(3);
    expect(pic.decimals).toBe(5);
    expect(pic.size).toBe(8);
  });

  it('parses 9(5)V9(4)', () => {
    const pic = parsePicClause('9(5)V9(4)');

    expect(pic.type).toBe(PicType.Numeric);
    expect(pic.digits).toBe(5);
    expect(pic.decimals).toBe(4);
    expect(pic.size).toBe(9);
  });
});
