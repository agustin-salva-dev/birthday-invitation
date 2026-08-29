// Central constants for the event. Single source of truth. (KISS + DRY)
// Any change to event details only needs to happen here.

export const EVENT = {
  hostName: "Vanesa",
  age: 25,
  date: new Date("2026-10-03T11:30:00-03:00"),
  endTime: new Date("2026-10-03T19:00:00-03:00"),
  dateLabel: "Sábado 3 de Octubre de 2026",
  startTimeLabel: "11:30 hs",
  endTimeLabel: "19:00 hs",
  address: "Juan Jofre 4090 esq. Vidal",
  city: "Isidro Casanova, Buenos Aires",
  fullAddress: "Juan Jofre 4090 esquina Vidal, Isidro Casanova, Buenos Aires",
  googleMapsUrl: "https://maps.app.goo.gl/Wj2n1FD1V4YS853U7",
  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3278.5!2d-58.6!3d-34.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDQyJzAwLjAiUyA1OMKwMzYnMDAuMCJX!5e0!3m2!1ses!2sar!4v1234567890",
} as const;

export const CALENDAR_EVENT = {
  title: `🐉 Cumpleaños 25 de ${EVENT.hostName}`,
  description: `¡Estás invitado al cumpleaños 25 de ${EVENT.hostName}! Temática: Chimuelo & Furia Luminosa 🐉✨`,
  location: EVENT.fullAddress,
} as const;
