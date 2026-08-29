// test-runner.ts
import { createGuestSchema, updateGuestSchema } from "../lib/validations";

function runTests() {
  console.log("=== Ejecutando pruebas unitarias de validación ===");

  // Test 1: createGuestSchema válido
  const res1 = createGuestSchema.safeParse({ name: "Carlos Gardel" });
  if (res1.success && res1.data.name === "Carlos Gardel") {
    console.log("✔ Test 1 (Crear invitado válido): PASÓ");
  } else {
    console.error("✖ Test 1: FALLÓ", res1);
    process.exit(1);
  }

  // Test 2: Trim de espacios
  const res2 = createGuestSchema.safeParse({ name: "   María Elena   " });
  if (res2.success && res2.data.name === "María Elena") {
    console.log("✔ Test 2 (Trim de espacios): PASÓ");
  } else {
    console.error("✖ Test 2: FALLÓ", res2);
    process.exit(1);
  }

  // Test 3: Nombre corto (< 2 chars)
  const res3 = createGuestSchema.safeParse({ name: "A" });
  if (!res3.success && res3.error.issues[0].message === "El nombre debe tener al menos 2 caracteres") {
    console.log("✔ Test 3 (Rechazar nombre corto < 2 chars): PASÓ");
  } else {
    console.error("✖ Test 3: FALLÓ", res3);
    process.exit(1);
  }

  // Test 4: updateGuestSchema nombre largo (> 100 chars)
  const longName = "A".repeat(101);
  const res4 = updateGuestSchema.safeParse({ name: longName });
  if (!res4.success && res4.error.issues[0].message === "El nombre no puede superar los 100 caracteres") {
    console.log("✔ Test 4 (Rechazar nombre largo > 100 chars): PASÓ");
  } else {
    console.error("✖ Test 4: FALLÓ", res4);
    process.exit(1);
  }

  console.log("=================================================");
  console.log("🎉 TODAS LAS PRUEBAS PASARON CORRECTAMENTE!");
}

runTests();
