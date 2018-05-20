/* eslint-disable no-undef */
const {
  UnitTypeUnrecognized,
  ConversionIncompatible,
  ConversionNegativeValue,
} = require("../../errors");
const {
  convertValue,
} = require("../../logic/unitConverter");

debugger; // eslint-disable-line no-debugger

describe("unitConverter", () => {
  // These tests aren't 100% exhaustive but do cover some important paths:
  // It makes sure that 0 = 0 in both directions.*
  // It makes sure that units can be converted from base unit.
  // It makes sure that units can be converted to base unit.
  // It makes sure that units that are not the base unit can be converted between each other.
  // That rounding works for conversions that don't result in whole numbers.
  // That rounding does not cause data loss by rounding to zero very small values.
  // That rounding does not cause data corruption by inflating values too greatly.
  // * Temperature is special because it has negative values and its zeros are different.
  // Also note that if the constant "CONVERSION_DECIMAL_ACCURACY" is changed it will break tests.

  describe("Happy Path", () => {
    it("Should convert 1 meter to 1 meter (same)", () => {
      const result = convertValue(1, "m", "m");
      expect(result.exactValue).toBe(1);
      expect(result.roundedValue).toBe(1);
    });

    describe("Length", () => {
      // 0 base to other
      it("Should convert 0 base unit meters to 0 feet", () => {
        const result = convertValue(0, "m", "ft");
        expect(result.exactValue).toBe(0);
        expect(result.roundedValue).toBe(0);
      });

      // 0 other to base
      it("Should convert 0 feet to 0 base unit meters", () => {
        const result = convertValue(0, "ft", "m");
        expect(result.exactValue).toBe(0);
        expect(result.roundedValue).toBe(0);
      });

      // Other to base
      it("Should convert 100 cm to 1 base unit meter", () => {
        const result = convertValue(100, "cm", "m");
        expect(result.exactValue).toBe(1);
        expect(result.roundedValue).toBe(1);
      });

      // Base to other
      it("Should convert 1 base unit meter to 100 centimeters", () => {
        const result = convertValue(1, "m", "cm");
        expect(result.exactValue).toBe(100);
        expect(result.roundedValue).toBe(100);
      });

      // Other to other
      it("Should convert 12 inches to 1 foot", () => {
        const result = convertValue(12, "in", "ft");
        expect(result.exactValue).toBe(1);
        expect(result.roundedValue).toBe(1);
      });

      // Rounding
      it("Should convert 1 base unit meter to 3.28 feet rounded", () => {
        const result = convertValue(1, "m", "ft");
        expect(result.exactValue).not.toBe(3.280839895013123); // Messy float check
        expect(result.exactValue).toBe(3.280839895);
        expect(result.roundedValue).toBe(3.28);
      });

      // Anti-rounding (non-zero)
      it("Should convert 1 millimeter to 0.001 base unit meters anti-rounded", () => {
        const result = convertValue(1, "mm", "m");
        expect(result.exactValue).toBe(0.001);
        expect(result.roundedValue).toBe(0.001);
      });
    });


    describe("Mass", () => {
      // 0 base to other
      it("Should convert 0 base unit kilograms to 0 pounds", () => {
        const result = convertValue(0, "kg", "lb");
        expect(result.exactValue).toBe(0);
        expect(result.roundedValue).toBe(0);
      });

      // 0 other to base
      it("Should convert 0 pounds to 0 base unit kilograms", () => {
        const result = convertValue(0, "lb", "kg");
        expect(result.exactValue).toBe(0);
        expect(result.roundedValue).toBe(0);
      });

      // Other to base
      it("Should convert 1000 gram to 1 base unit kilogram", () => {
        const result = convertValue(1000, "g", "kg");
        expect(result.exactValue).toBe(1);
        expect(result.roundedValue).toBe(1);
      });

      // Base to other
      it("Should convert 1 base unit kilogram to 1000 grams", () => {
        const result = convertValue(1, "kg", "g");
        expect(result.exactValue).toBe(1000);
        expect(result.roundedValue).toBe(1000);
      });

      // Other to other
      it("Should convert 16 ounces to 1 pound", () => {
        const result = convertValue(16, "oz", "lb");
        expect(result.exactValue).toBe(1);
        expect(result.roundedValue).toBe(1);
      });

      // Rounding
      it("Should convert 99 milligrams to 0.1 grams rounded", () => {
        const result = convertValue(99, "mg", "g");
        expect(result.exactValue).toBe(0.099);
        expect(result.roundedValue).toBe(0.1);
      });

      // Anti-rounding (non-zero)
      it("Should convert 1 milligram to 0.001 grams anti-rounded", () => {
        const result = convertValue(1, "mg", "g");
        expect(result.exactValue).toBe(0.001);
        expect(result.roundedValue).toBe(0.001);  // Zero prevention
      });

      // Anti-rounding (non-inflating)
      it("Should convert 0.099 grams to 99 milligrams anti-inflated", () => {
        const result = convertValue(0.099, "g", "mg");
        expect(result.exactValue).toBe(99);
        expect(result.roundedValue).toBe(99); // Value-inflation prevention
      });
    });


    describe("Volume", () => {
      // 0 base to other
      it("Should convert 0 base unit cubic meters to 0 gallons", () => {
        const result = convertValue(0, "cum", "gal");
        expect(result.exactValue).toBe(0);
        expect(result.roundedValue).toBe(0);
      });

      // 0 other to base
      it("Should convert 0 gallons to 0 base unit cubic meters", () => {
        const result = convertValue(0, "gal", "cum");
        expect(result.exactValue).toBe(0);
        expect(result.roundedValue).toBe(0);
      });

      // Other to base
      it("Should convert 1000 liters to 1 base unit cubic meter", () => {
        const result = convertValue(1000, "l", "cum");
        expect(result.exactValue).toBe(1);
        expect(result.roundedValue).toBe(1);
      });

      // Base to other
      it("Should convert 1 base unit cubic meter to 1000 liters", () => {
        const result = convertValue(1, "cum", "l");
        expect(result.exactValue).toBe(1000);
        expect(result.roundedValue).toBe(1000);
      });

      // Other to other
      it("Should convert 1 floz to 0.125 cups", () => {
        const result = convertValue(1, "floz", "cup");
        expect(result.exactValue).toBe(0.125);
        expect(result.roundedValue).toBe(0.125);
      });

      // Rounding
      it("Should convert 0.9 liters to 0.001 base unit cubic meter rounded", () => {
        const result = convertValue(0.9, "l", "cum");
        expect(result.exactValue).toBe(0.0009);
        expect(result.roundedValue).toBe(0.001);
      });

      // Anti-rounding (non-zero)
      it("Should convert 0.1 liters to 0.0001 base unit cubic meter anti-rounded", () => {
        const result = convertValue(0.1, "l", "cum");
        expect(result.exactValue).toBe(0.0001);
        expect(result.roundedValue).toBe(0.0001);
      });
    });


    describe("Temperature", () => {
      // 0 base to other
      it("Should convert 0 base unit Celsius to 32 Fahrenheit", () => {
        const result = convertValue(0, "c", "f");
        expect(result.exactValue).toBe(32);
        expect(result.roundedValue).toBe(32);
      });

      // 0 other to base
      it("Should convert 100 base unit Celsius to 212 Fahrenheit", () => {
        const result = convertValue(100, "c", "f");
        expect(result.exactValue).toBe(212);
        expect(result.roundedValue).toBe(212);
      });

      // Other to base
      it("Should convert 32 Fahrenheit to 0 base unit Celsius", () => {
        const result = convertValue(32, "f", "c");
        expect(result.exactValue).toBe(0);
        expect(result.roundedValue).toBe(0);
      });

      // Base to other
      it("Should convert 212 Fahrenheit to 100 base unit Celsius", () => {
        const result = convertValue(212, "f", "c");
        expect(result.exactValue).toBe(100);
        expect(result.roundedValue).toBe(100);
      });

      // Negative values
      it("Should convert -40 base unit Celsius to -40 Fahrenheit", () => {
        const result = convertValue(-40, "c", "f");
        expect(result.exactValue).toBe(-40);
        expect(result.roundedValue).toBe(-40);
      });

      // Rounding
      it("Should convert 70.1 Fahrenheit to 21.2 base unit Celsius rounded", () => {
        const result = convertValue(70.1, "f", "c");
        expect(result.exactValue).toBe(21.1666666667);
        expect(result.roundedValue).toBe(21.2);
      });

      // Anti-rounding (non-zero)
      it("Should convert 32.08 Fahrenheit to 0.04 base unit Celsius rounded", () => {
        const result = convertValue(32.08, "f", "c");
        expect(result.exactValue).toBe(0.0444444445);
        expect(result.roundedValue).toBe(0.04);
      });
    });


    describe("Area", () => {
      // 0 base to other
      it("Should convert 0 base unit square meters to 0 square feet", () => {
        const result = convertValue(0, "sqm", "sqft");
        expect(result.exactValue).toBe(0);
        expect(result.roundedValue).toBe(0);
      });

      // 0 other to base
      it("Should convert 0 square feet to 0 base unit square meters", () => {
        const result = convertValue(0, "sqft", "sqm");
        expect(result.exactValue).toBe(0);
        expect(result.roundedValue).toBe(0);
      });

      // Other to base
      it("Should convert 0.0001 hectares to 1 base unit square meter", () => {
        const result = convertValue(0.0001, "ha", "sqm");
        expect(result.exactValue).toBe(1);
        expect(result.roundedValue).toBe(1);
      });

      // Base to other
      it("Should convert 100 base unit square meters to 0.01 hectares", () => {
        const result = convertValue(100, "sqm", "ha");
        expect(result.exactValue).toBe(0.01);
        expect(result.roundedValue).toBe(0.01);
      });

      // Other to other
      it("Should convert 43560 square feet to 1 acre", () => {
        const result = convertValue(43560, "sqft", "acre");
        expect(result.exactValue).toBe(1);
        expect(result.roundedValue).toBe(1);
      });

      // Rounding
      it("Should convert 9 base unit square meters to 0.0002 hectares rounded", () => {
        const result = convertValue(9, "sqm", "ha");
        expect(result.exactValue).toBe(0.0009);
        expect(result.roundedValue).toBe(0.001);
      });

      // Anti-rounding (non-zero)
      it("Should convert 1 base unit square meters to 0.0001 hectares anti-rounded", () => {
        const result = convertValue(1, "sqm", "ha");
        expect(result.exactValue).toBe(0.0001);
        expect(result.roundedValue).toBe(0.0001);  // Zero prevention
      });
    });


    describe("Velocity", () => {
      // 0 base to other
      it("Should convert 0 base unit meters per second to 0 feet per second", () => {
        const result = convertValue(0, "ms", "fps");
        expect(result.exactValue).toBe(0);
        expect(result.roundedValue).toBe(0);
      });

      // 0 other to base
      it("Should convert 0 feet per second to 0 base unit meters per second", () => {
        const result = convertValue(0, "fps", "ms");
        expect(result.exactValue).toBe(0);
        expect(result.roundedValue).toBe(0);
      });

      // Other to base
      it("Should convert 3.6 kilometers per hour to 1 base unit meters per second", () => {
        const result = convertValue(3.6, "kmph", "ms");
        expect(result.exactValue).toBe(1);
        expect(result.roundedValue).toBe(1);
      });

      // Base to other
      it("Should convert 1 base unit meters per second to 3.6 kilometers per hour", () => {
        const result = convertValue(1, "ms", "kmph");
        expect(result.exactValue).toBe(3.6);
        expect(result.roundedValue).toBe(3.6);
      });

      // Other to other
      it("Should convert 15 miles per hour to 22 feet per second", () => {
        const result = convertValue(15, "mph", "fps");
        expect(result.exactValue).toBe(22);
        expect(result.roundedValue).toBe(22);
      });

      // Rounding
      it("Should convert 1 base unit meters per second to 2.2 miles per hour rounded", () => {
        const result = convertValue(1, "ms", "mph");
        expect(result.exactValue).toBe(2.2369362921);
        expect(result.roundedValue).toBe(2.2);
      });

      // Anti-rounding (non-zero)
      it("Should convert 0.01 base unit meters per second to 0.02 miles per hour anti-rounded", () => {
        const result = convertValue(0.01, "ms", "mph");
        expect(result.exactValue).toBe(0.0223693629);
        expect(result.roundedValue).toBe(0.02);
      });
    });
  });


  describe("Error Checking", () => {
    it("Should reject unknown unit", () => {
      expect(() => {
        convertValue(0, "x", "f");
      }).toThrow(UnitTypeUnrecognized);
    });

    it("Should reject incompatible units", () => {
      expect(() => {
        convertValue(1, "ft", "f");
      }).toThrow(ConversionIncompatible);
    });

    it("Should reject negative units (other than temperature)", () => {
      expect(() => {
        convertValue(-1, "m", "ft");
      }).toThrow(ConversionNegativeValue);
    });
  });
});
