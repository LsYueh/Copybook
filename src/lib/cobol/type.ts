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
  readonly type: PicType;
  readonly digits: number;
  readonly decimals: number;

  /**
   * @param type COBOL PIC 類型
   * @param digits 整數位數
   * @param decimals 小數位數
   */
  constructor(
    type: PicType | string = PicType.None,
    digits = 0,
    decimals = 0,
  ) {
    this.type     = Pic_t.parseType(type);
    this.digits   = Math.max(0, digits);
    this.decimals = Math.max(0, decimals);
  }

  private static parseType(type: PicType | string): PicType {
    if (typeof type === "number") {
      if (Object.values(PicType).includes(type)) {
        return type;
      }

      throw new Error(`Invalid PIC type: ${type}`);
    }

    switch (type.toUpperCase()) {
      case "":
        return PicType.None;
      case "FILLER":
        return PicType.Filler;
      case "X":
        return PicType.Alphanumeric;
      case "9":
        return PicType.Numeric;
      case "S9":
        return PicType.SignedNumeric;
      default:
        throw new Error(`Invalid PIC type: "${type}"`);
    }
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
