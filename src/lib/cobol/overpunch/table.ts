import { DataStorageOptions } from './option.js';

/** Overpunch code entry */
export interface OverpunchEntry {
  sign: 1 | -1;
  digit: '0' | '1' | '2' | '3' | '4' |
    '5' | '6' | '7' | '8' | '9';
}

export type OverpunchTable = Readonly<
  Record<string, OverpunchEntry>
>;

/**
 * -Dca, -Dcb, -Dcm, -Dcr
 */
const OP_POSITIVE_01 = {
  '0': { sign:  1, digit: '0' },
  '1': { sign:  1, digit: '1' },
  '2': { sign:  1, digit: '2' },
  '3': { sign:  1, digit: '3' },
  '4': { sign:  1, digit: '4' },
  '5': { sign:  1, digit: '5' },
  '6': { sign:  1, digit: '6' },
  '7': { sign:  1, digit: '7' },
  '8': { sign:  1, digit: '8' },
  '9': { sign:  1, digit: '9' },
} satisfies OverpunchTable;

/**
 * -Dci, -Dcn
 */
const OP_POSITIVE_02 = {
  '{': { sign:  1, digit: '0' },
  'A': { sign:  1, digit: '1' },
  'B': { sign:  1, digit: '2' },
  'C': { sign:  1, digit: '3' },
  'D': { sign:  1, digit: '4' },
  'E': { sign:  1, digit: '5' },
  'F': { sign:  1, digit: '6' },
  'G': { sign:  1, digit: '7' },
  'H': { sign:  1, digit: '8' },
  'I': { sign:  1, digit: '9' },
} satisfies OverpunchTable;

/**
 * -Dca, -Dci, -Dcn
 */
const OP_NEGATIVE_01 = {
  '}': { sign: -1, digit: '0' },
  'J': { sign: -1, digit: '1' },
  'K': { sign: -1, digit: '2' },
  'L': { sign: -1, digit: '3' },
  'M': { sign: -1, digit: '4' },
  'N': { sign: -1, digit: '5' },
  'O': { sign: -1, digit: '6' },
  'P': { sign: -1, digit: '7' },
  'Q': { sign: -1, digit: '8' },
  'R': { sign: -1, digit: '9' },
} satisfies OverpunchTable;

/**
 * -Dcb
 */
const OP_NEGATIVE_02 = {
  '@': { sign: -1, digit: '0' },
  'A': { sign: -1, digit: '1' },
  'B': { sign: -1, digit: '2' },
  'C': { sign: -1, digit: '3' },
  'D': { sign: -1, digit: '4' },
  'E': { sign: -1, digit: '5' },
  'F': { sign: -1, digit: '6' },
  'G': { sign: -1, digit: '7' },
  'H': { sign: -1, digit: '8' },
  'I': { sign: -1, digit: '9' },
} satisfies OverpunchTable;

/**
 * -Dcm
 */
const OP_NEGATIVE_03 = {
  'p': { sign: -1, digit: '0' },
  'q': { sign: -1, digit: '1' },
  'r': { sign: -1, digit: '2' },
  's': { sign: -1, digit: '3' },
  't': { sign: -1, digit: '4' },
  'u': { sign: -1, digit: '5' },
  'v': { sign: -1, digit: '6' },
  'w': { sign: -1, digit: '7' },
  'x': { sign: -1, digit: '8' },
  'y': { sign: -1, digit: '9' },
} satisfies OverpunchTable;

/**
 * -Dcr
 */
const OP_NEGATIVE_04 = {
  ' ': { sign: -1, digit: '0' },
  '!': { sign: -1, digit: '1' },
  '"': { sign: -1, digit: '2' },
  '#': { sign: -1, digit: '3' },
  '$': { sign: -1, digit: '4' },
  '%': { sign: -1, digit: '5' },
  '&': { sign: -1, digit: '6' },
  "'": { sign: -1, digit: '7' },
  '(': { sign: -1, digit: '8' },
  ')': { sign: -1, digit: '9' },
} satisfies OverpunchTable;

export const OverpunchCode: Readonly<
  Partial<Record<DataStorageOptions, OverpunchTable>>
> = {
  [DataStorageOptions.CA]: {
    ...OP_POSITIVE_01,
    ...OP_NEGATIVE_01,
  },
  [DataStorageOptions.CB]: {
    ...OP_POSITIVE_01,
    ...OP_NEGATIVE_02,
  },
  [DataStorageOptions.CI]: {
    ...OP_POSITIVE_02,
    ...OP_NEGATIVE_01,
  },
  [DataStorageOptions.CM]: {
    ...OP_POSITIVE_01,
    ...OP_NEGATIVE_03,
  },
  [DataStorageOptions.CN]: {
    ...OP_POSITIVE_02,
    ...OP_NEGATIVE_01,
  },
  [DataStorageOptions.CR]: {
    ...OP_POSITIVE_01,
    ...OP_NEGATIVE_04,
  },
};
