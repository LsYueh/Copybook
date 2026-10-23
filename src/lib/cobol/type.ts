/**
 * COBOL PIC Type
 */
export enum PicType {
  /** No PIC type specified */
  None,

  /** FILLER */
  Filler,

  /** Alphanumeric: X */
  Alphanumeric,

  /** Numeric: 9 */
  Numeric,

  /** Signed Numeric: S9 */
  SignedNumeric,
}

/**
 * COBOL PIC Type Definition
 */
export class Pic_t {
  /**
   * @param type COBOL PIC 類型
   * @param digits 整數位數
   * @param decimals 小數位數
   */
  constructor(
    public readonly type: PicType = PicType.None,
    public readonly digits = 0,
    public readonly decimals = 0) {
  }

  /** 整數位數與小數位數的總和 */
  get size(): number {
    return this.digits + this.decimals;
  }

  toString(): string {
    const typeName: Record<PicType, string> = {
      [PicType.None]: '',
      [PicType.Filler]: 'FILLER',
      [PicType.Alphanumeric]: 'X',
      [PicType.Numeric]: '9',
      [PicType.SignedNumeric]: 'S9',
    };

    return `${typeName[this.type]}(${this.digits})${
      this.decimals > 0 ? `V9(${this.decimals})` : ''
    }`;
  }
}
