/**
 * COBOL Data Storage Options for Overpunch
 */
export enum DataStorageOptions {
  /** RM/COBOL (not RM/COBOL-85) */
  CA = 1,
  /** MBP COBOL */
  CB,
  /** IBM COBOL (RM/COBOL-85) */
  CI,
  /** Micro Focus COBOL */
  CM,
  /** NCR COBOL */
  CN,
  /** Realia COBOL */
  CR,
  /** VAX COBOL */
  CV,
}

/** Sign position */
export enum SignIs {
  Trailing = 0,
  Leading = 1,
}

/** Overpunch options */
export class OverpunchOptions {
  constructor(
    public readonly dataStorage: DataStorageOptions = DataStorageOptions.CI,
    public readonly signIs: SignIs = SignIs.Trailing,
  ) {}
}
