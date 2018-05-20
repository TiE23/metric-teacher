/* eslint-disable no-undef */
const {
  stepSmoother,
} = require("../../logic/utils");

describe("utils", () => {
  describe("stepSmoother", () => {
    // Positives
    it("Should smooth value 20.25 with step 0.25 to 20.25", () => {
      const smoothed = stepSmoother(20.25, 0.25);
      expect(smoothed).toBe(20.25);
    });

    it("Should smooth value 20.2 with step 0.25 to 20.25", () => {
      const smoothed = stepSmoother(20.2, 0.25);
      expect(smoothed).toBe(20.25);
    });

    it("Should smooth value 20.1 with step 0.25 to 20.0", () => {
      const smoothed = stepSmoother(20.1, 0.25);
      expect(smoothed).toBe(20.0);
    });

    it("Should smooth value 25 with step 10 to 30", () => {
      const smoothed = stepSmoother(25, 10);
      expect(smoothed).toBe(30);
    });

    it("Should smooth value 24 with step 10 to 20", () => {
      const smoothed = stepSmoother(24, 10);
      expect(smoothed).toBe(20);
    });


    // Negatives
    it("Should smooth value -20.25 with step 0.25 to -20.25", () => {
      const smoothed = stepSmoother(-20.25, 0.25);
      expect(smoothed).toBe(-20.25);
    });

    it("Should smooth value -20.2 with step 0.25 to -20.25", () => {
      const smoothed = stepSmoother(-20.2, 0.25);
      expect(smoothed).toBe(-20.25);
    });

    it("Should smooth value -20.1 with step 0.25 to -20.0", () => {
      const smoothed = stepSmoother(-20.1, 0.25);
      expect(smoothed).toBe(-20.0);
    });

    it("Should smooth value -25 with step 10 to -20 (negative rounding)", () => {
      const smoothed = stepSmoother(-25, 10);
      expect(smoothed).toBe(-20);
    });

    it("Should smooth value -26 with step 10 to -30", () => {
      const smoothed = stepSmoother(-26, 10);
      expect(smoothed).toBe(-30);
    });

    it("Should smooth value -24 with step 10 to -20", () => {
      const smoothed = stepSmoother(-24, 10);
      expect(smoothed).toBe(-20);
    });


    // Edgy cases
    it("Should smooth value 0 with step 10 to 0", () => {
      const smoothed = stepSmoother(0, 10);
      expect(smoothed).toBe(0);
    });

    it("Should smooth value 0.5 with step 1 to 1", () => {
      const smoothed = stepSmoother(0.5, 1);
      expect(smoothed).toBe(1);
    });

    it("Should smooth value -0.5 with step 1 to 0", () => {
      const smoothed = stepSmoother(-0.5, 1);
      expect(smoothed).toBe(0);
    });

    it("Should smooth value 0 with step 1 to 0", () => {
      const smoothed = stepSmoother(0, 1);
      expect(smoothed).toBe(0);
    });

    it("Should smooth value 1.5 with step -1 to 2", () => {
      const smoothed = stepSmoother(1.5, -1);
      expect(smoothed).toBe(2);
    });

    it("Should smooth value 1.5 with step 0 to 1.5", () => {
      const smoothed = stepSmoother(1.5, 0);
      expect(smoothed).toBe(1.5);
    });
  });
});
