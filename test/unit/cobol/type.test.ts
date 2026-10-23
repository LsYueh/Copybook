import { describe, expect, it } from "vitest";
import { Pic_t, PicType } from '../../../src/lib/cobol/type';

describe("Pic_t", () => {
  describe("constructor", () => {
    it("uses default values", () => {
      const pic = new Pic_t();

      expect(pic.type).toBe(PicType.None);
      expect(pic.digits).toBe(0);
      expect(pic.decimals).toBe(0);
      expect(pic.size).toBe(0);
    });

    it("accepts PicType enum", () => {
      const pic = new Pic_t(PicType.Alphanumeric, 7);

      expect(pic.type).toBe(PicType.Alphanumeric);
      expect(pic.digits).toBe(7);
      expect(pic.decimals).toBe(0);
    });

    it.each([
      ["X", PicType.Alphanumeric],
      ["9", PicType.Numeric],
      ["S9", PicType.SignedNumeric],
      ["FILLER", PicType.Filler],
      ["", PicType.None],
    ] as const)("accepts string type %s", (type, expected) => {
      const pic = new Pic_t(type, 5, 2);

      expect(pic.type).toBe(expected);
      expect(pic.digits).toBe(5);
      expect(pic.decimals).toBe(2);
    });

    it("accepts lowercase string type", () => {
      const pic = new Pic_t("s9", 5, 2);

      expect(pic.type).toBe(PicType.SignedNumeric);
    });

    it("rejects an invalid string type", () => {
      expect(() => new Pic_t("INVALID", 5)).toThrow(
        'Invalid PIC type: "INVALID"',
      );
    });

    it("rejects an invalid enum value", () => {
      expect(() => new Pic_t(999 as PicType, 5)).toThrow(
        "Invalid PIC type: 999",
      );
    });
  });

  describe("size", () => {
    it("returns the sum of digits and decimals", () => {
      expect(new Pic_t(PicType.Numeric, 5, 2).size).toBe(7);
    });

    it("returns zero when there are no digits", () => {
      expect(new Pic_t().size).toBe(0);
    });
  });

  describe("toString", () => {
    it.each([
      [PicType.None, 0, 0, "(0)"],
      [PicType.Filler, 0, 0, "FILLER(0)"],
      [PicType.Alphanumeric, 7, 0, "X(7)"],
      [PicType.Numeric, 5, 0, "9(5)"],
      [PicType.Numeric, 5, 2, "9(5)V9(2)"],
      [PicType.SignedNumeric, 5, 2, "S9(5)V9(2)"],
    ] as const)(
      "formats type=%s, digits=%i, decimals=%i",
      (type, digits, decimals, expected) => {
        expect(new Pic_t(type, digits, decimals).toString()).toBe(expected);
      },
    );
  });
});