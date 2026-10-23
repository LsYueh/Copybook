import { parsePicClause } from "../cobol/parser.js";
import { Pic_t, PicType } from "../cobol/type.js";

/**
 * Morden Language Data Type
 */
export enum DataType {
  Filler = -1,
  
  None, 

  // Alphanumeric

  /** Trimmed String */
  String,
  /** Non-trimmed String */
  X,

  // Numeric

  Unsigned, _9 = Unsigned,
  Signed, S9 = Signed,

  // Semantic Data Types

  Date, Time, Datetime, Timestamp,
}

/**
 * Field 建構參數
 */
export interface FieldOptions {
  /** 欄位名稱 */
  name: string;

  /** Picture symbols */
  characterString?: string;

  /** COBOL PIC 資料結構描述 */
  pic?: Pic_t;

  /** 資料型態 */
  dataType?: DataType;

  /** 說明 */
  description: string;

  /** 資料長度可變，但不超過 COBOL PIC 定義的長度 */
  isVariableLength?: boolean;
}

/**
 * 欄位定義
 */
export class Field_t {
  /** 名稱 */
  readonly name: string;

  /** COBOL PIC 資料結構描述 */
  readonly pic: Pic_t;

  /** 資料型態 */
  readonly dataType: DataType;

  /** 說明 */
  readonly description: string;

  /** 資料長度可變，但不超過 COBOL PIC 定義的長度 */
  readonly isVariableLength: boolean;

  constructor(options: FieldOptions) {
    const _pic: Pic_t | undefined = options.characterString
      ? parsePicClause(options.characterString)
      : options.pic;

    if (!_pic) {
      throw new Error("Either 'characterString' or 'pic' must be provided.");
    }

    this.name = options.name;
    this.pic = _pic;
    this.description = options.description;
    this.isVariableLength = options.isVariableLength ?? false;

    // 從 COBOL PIC 自動抓預設 DataType
    if (options.dataType !== undefined) {
      this.dataType = options.dataType;
    } else {
      switch (_pic.type) {
        case PicType.Alphanumeric : this.dataType = DataType.String; break;
        case PicType.Numeric      : this.dataType = DataType.Unsigned; break;
        case PicType.SignedNumeric: this.dataType = DataType.Signed; break;
        default:
          throw new Error( `Cannot infer data type from PIC type: ${_pic.type}`,);
      }
    }
  }

  toString(): string {
    return `${this.pic.toString()} ${this.name} : ${this.description}`;
  }
}
