import { describe, expect, it } from "vitest";
import { Pic_t, PicType } from '../../../src/lib/cobol/type';
import { DataType, Field_t } from "../../../src/lib/field/type";

describe('DataType', () => {
  it('FILLER = -1', () => {
    expect(DataType.Filler).toBe(-1);
    expect(DataType.String).toBe(1);
    expect(DataType.X).toBe(2);
  });
});

describe("Field_t", () => {
  describe("constructor", () => {
    it("creates a field from characterString", () => {
      const field = new Field_t({
        name: "CUSTOMER-NAME",
        characterString: "X(10)",
        description: "Customer name",
      });

      expect(field.name).toBe("CUSTOMER-NAME");
      expect(field.pic.type).toBe(PicType.Alphanumeric);
      expect(field.pic.digits).toBe(10);
      expect(field.pic.decimals).toBe(0);
      expect(field.dataType).toBe(DataType.String);
      expect(field.description).toBe("Customer name");
      expect(field.isVariableLength).toBe(false);
    });

    it("creates a field from pic", () => {
      const pic = new Pic_t(PicType.Numeric, 5, 2);

      const field = new Field_t({
        name: "AMOUNT",
        pic,
        description: "Transaction amount",
      });

      expect(field.pic).toBe(pic);
      expect(field.dataType).toBe(DataType.Unsigned);
    });

    it("prefers characterString when both characterString and pic are provided", () => {
      const pic = new Pic_t(PicType.Numeric, 5);

      const field = new Field_t({
        name: "AMOUNT",
        characterString: "X(10)",
        pic,
        description: "Amount field",
      });

      expect(field.pic.type).toBe(PicType.Alphanumeric);
      expect(field.pic.digits).toBe(10);
      expect(field.dataType).toBe(DataType.String);
    });

    it("infers DataType.String for alphanumeric PIC", () => {
      const field = new Field_t({
        name: "NAME",
        characterString: "X(20)",
        description: "Name",
      });

      expect(field.dataType).toBe(DataType.String);
    });

    it("infers DataType.Unsigned for numeric PIC", () => {
      const field = new Field_t({
        name: "COUNT",
        characterString: "9(5)",
        description: "Count",
      });

      expect(field.dataType).toBe(DataType.Unsigned);
    });

    it("infers DataType.Signed for signed numeric PIC", () => {
      const field = new Field_t({
        name: "BALANCE",
        characterString: "S9(5)V9(2)",
        description: "Balance",
      });

      expect(field.dataType).toBe(DataType.Signed);
    });

    it("uses the explicitly provided DataType", () => {
      const field = new Field_t({
        name: "NAME",
        characterString: "X(10)",
        dataType: DataType.X,
        description: "Non-trimmed name",
      });

      expect(field.dataType).toBe(DataType.X);
    });

    it("defaults isVariableLength to false", () => {
      const field = new Field_t({
        name: "NAME",
        characterString: "X(10)",
        description: "Name",
      });

      expect(field.isVariableLength).toBe(false);
    });

    it("accepts isVariableLength = true", () => {
      const field = new Field_t({
        name: "NAME",
        characterString: "X(10)",
        description: "Variable-length name",
        isVariableLength: true,
      });

      expect(field.isVariableLength).toBe(true);
    });

    it("throws when neither characterString nor pic is provided", () => {
      expect(
        () =>
          new Field_t({
            name: "INVALID",
            description: "Invalid field",
          }),
      ).toThrow(
        "Either 'characterString' or 'pic' must be provided.",
      );
    });
  });

  describe("toString", () => {
    it("formats the field definition", () => {
      const field = new Field_t({
        name: "AMOUNT",
        characterString: "S9(5)V9(2)",
        description: "Transaction amount",
      });

      expect(field.toString()).toBe(
        "S9(5)V9(2) AMOUNT : Transaction amount",
      );
    });
  });
});
