import { describe, it, expect } from "vitest";
import { createGuestSchema, updateGuestSchema } from "./validations";

describe("Guest Validation Schemas", () => {
  describe("createGuestSchema", () => {
    it("debe validar un nombre correcto", () => {
      const result = createGuestSchema.safeParse({ name: "Carlos Gardel" });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("Carlos Gardel");
      }
    });

    it("debe hacer trim del nombre", () => {
      const result = createGuestSchema.safeParse({ name: "   María Elena   " });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("María Elena");
      }
    });

    it("debe fallar si el nombre tiene menos de 2 caracteres", () => {
      const result = createGuestSchema.safeParse({ name: "A" });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "El nombre debe tener al menos 2 caracteres"
        );
      }
    });

    it("debe fallar si el nombre está vacío", () => {
      const result = createGuestSchema.safeParse({ name: "" });
      expect(result.success).toBe(false);
    });
  });

  describe("updateGuestSchema", () => {
    it("debe validar la actualización de un nombre válido", () => {
      const result = updateGuestSchema.safeParse({ name: "Nuevo Nombre" });
      expect(result.success).toBe(true);
    });

    it("debe rechazar nombres demasiado largos (>100 caracteres)", () => {
      const longName = "A".repeat(101);
      const result = updateGuestSchema.safeParse({ name: longName });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "El nombre no puede superar los 100 caracteres"
        );
      }
    });
  });
});
