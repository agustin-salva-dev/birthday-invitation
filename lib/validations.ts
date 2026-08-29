import { z } from "zod";

export const rsvpSchema = z.object({
  guestId: z.string().min(1, "El ID del invitado es requerido"),
  status: z.enum(["CONFIRMED", "DECLINED"], {
    message: "Estado inválido",
  }),
  companions: z
    .number()
    .int()
    .min(0, "La cantidad de acompañantes no puede ser negativa")
    .max(4, "Como máximo podés llevar 4 acompañantes")
    .default(0),
});

export const adminAuthSchema = z.object({
  pin: z
    .string()
    .length(4, "El PIN debe tener 4 dígitos")
    .regex(/^\d{4}$/, "El PIN solo puede contener números"),
});

export const guestSearchSchema = z.object({
  query: z.string().min(1).max(100),
});

export const createGuestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede superar los 100 caracteres"),
});

export const updateGuestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede superar los 100 caracteres"),
});

export type RsvpInput = z.infer<typeof rsvpSchema>;
export type AdminAuthInput = z.infer<typeof adminAuthSchema>;
export type CreateGuestInput = z.infer<typeof createGuestSchema>;
export type UpdateGuestInput = z.infer<typeof updateGuestSchema>;
