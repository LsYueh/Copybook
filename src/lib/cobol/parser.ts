import { Pic_t, PicType } from './type.js';

interface Token {
  char: string;
  count: number;
}

/**
 * 解析一個 COBOL PIC 單位。
 *
 * @param unit 例如 "9(5)", "X", "S", "V", "Z(3)", "."
 */
function parseUnit(unit: string): Token {
  const normalized = unit.trim();
  const match = normalized.match(/^([9XAVPZS\*\.,\/\+\-])(?:\((\d+)\))?$/i);

  if (!match) {
    throw new Error(`Invalid PIC unit: "${unit}"`);
  }

  const count = match[2] === undefined ? 1 : Number(match[2]);

  if (!Number.isSafeInteger(count) || count < 1) {
    throw new Error(`Invalid PIC repetition count: "${unit}"`);
  }

  return {
    char: match[1].toUpperCase(),
    count,
  };
}

/**
 * 將 PIC Clause 拆成 Token。
 *
 * @param pic 例如：S9(3)V99 → S、9(3)、V、9(2)
 */
export function parsePic(pic: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < pic.length) {
    const ch = pic[i];

    if (/\s/.test(ch)) { // 跳過空白
      i++;
      continue;
    }
    
    if (pic[i + 1] === "(") { // 如果是符號 + (n) 形式
      const closeIndex = pic.indexOf(")", i + 2);

      if (closeIndex === -1) {
        throw new Error(`Missing ")" in PIC: ${pic}`);
      }

      const unit: string = pic.slice(i, closeIndex + 1);
      tokens.push(parseUnit(unit));
      i = closeIndex + 1;
    } else { // 連續相同符號合併
      let j = i + 1;
      while (j < pic.length && pic[j] === ch) {
        j++;
      }
      
      const unit: string = `${ch}(${j - i})`;
      tokens.push(parseUnit(unit));
      i = j;
    }
  }

  if (tokens.length === 0) {
    throw new Error("PIC Clause cannot be empty.");
  }

  return tokens;
}

/**
 * 解析 COBOL PIC Clause。
 *
 * 目前支援：
 * - X(n)
 * - 9(n)
 * - S9(n)
 * - V 小數點
 */
export function parsePicClause(pic: string): Pic_t {
  const tokens = parsePic(pic);
  const first = tokens[0];

  if (first.char === "X" && tokens.length === 1) {
    return new Pic_t(PicType.Alphanumeric, first.count);
  }

  let index = 0;
  let type = PicType.Numeric;

  if (first.char === "S") {
    type = PicType.SignedNumeric;
    index++;
  }

  const integer = tokens[index];

  if (!integer || integer.char !== "9") {
    throw new Error(`Invalid PIC Clause: "${pic}"`);
  }

  index++;

  let decimals = 0;

  if (tokens[index]?.char === "V") {
    index++;

    const decimal = tokens[index];

    if (!decimal || decimal.char !== "9") {
      throw new Error(`Invalid PIC Clause: "${pic}"`);
    }

    decimals = decimal.count;
    index++;
  }

  if (index !== tokens.length) {
    throw new Error(`Invalid PIC Clause: "${pic}"`);
  }

  return new Pic_t(type, integer.count, decimals);
}
