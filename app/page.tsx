// Main invitation page — orchestrates the multi-step flow.
// State machine: intro → guest-lookup → event-info → rsvp → confirmed/declined
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { StepTransition } from "@/components/layout/StepTransition";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { IntroStep } from "@/features/intro/IntroStep";
import type { Guest, InvitationStep } from "@/types";

// Lazy-load heavy steps to keep initial bundle small
const GuestLookupStep = dynamic(
  () =>
    import("@/features/guest-lookup/GuestLookupStep").then(
      (m) => m.GuestLookupStep
    ),
  { loading: () => <StepLoader /> }
);
const EventInfoStep = dynamic(
  () =>
    import("@/features/event-info/EventInfoStep").then((m) => m.EventInfoStep),
  { loading: () => <StepLoader /> }
);
const RsvpStep = dynamic(
  () => import("@/features/rsvp/RsvpStep").then((m) => m.RsvpStep),
  { loading: () => <StepLoader /> }
);
const ConfirmedStep = dynamic(
  () =>
    import("@/features/confirmation/ConfirmedStep").then(
      (m) => m.ConfirmedStep
    ),
  { loading: () => <StepLoader /> }
);
const DeclinedStep = dynamic(
  () =>
    import("@/features/confirmation/DeclinedStep").then((m) => m.DeclinedStep),
  { loading: () => <StepLoader /> }
);

function StepLoader() {
  return (
    <div className="flex h-40 items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}

export default function InvitationPage() {
  const [step, setStep] = useState<InvitationStep>("intro");
  const [currentGuest, setCurrentGuest] = useState<Guest | null>(null);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [guestsLoading, setGuestsLoading] = useState(false);
  const [guestsError, setGuestsError] = useState<string | null>(null);
  // Pre-load dragon images in background after mount to ensure instant LCP on step navigation
  useEffect(() => {
    const dragonImages = [
      "/dragons/quiensos-dragon.webp",
      "/dragons/toothless-bg.webp",
      "/dragons/toothless.webp",
      "/dragons/chimuelofeliz.webp",
      "/dragons/chimuelotriste.webp",
      "/dragons/baby-dragons.webp",
      "/dragons/lightfury-lying.webp",
    ];
    dragonImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Pre-fetch guests when user reaches guest-lookup step
  useEffect(() => {
    if (step !== "guest-lookup" || guests.length > 0) return;

    let ignore = false;
    Promise.resolve().then(() => {
      if (!ignore) {
        setGuestsLoading(true);
        setGuestsError(null);
      }
    });

    fetch("/api/guests")
      .then(async (res) => {
        if (!res.ok) throw new Error("No se pudo cargar la lista");
        const json = await res.json();
        if (!ignore) setGuests(json.data);
      })
      .catch((err) => {
        if (!ignore) setGuestsError(err instanceof Error ? err.message : "Error inesperado");
      })
      .finally(() => {
        if (!ignore) setGuestsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [step, guests.length]);

  const handleGuestConfirmed = (guest: Guest) => {
    setCurrentGuest(guest);
    setStep("event-info");
  };

  const renderStep = () => {
    switch (step) {
      case "intro":
        return (
          <IntroStep onComplete={() => setStep("guest-lookup")} />
        );

      case "guest-lookup":
        if (guestsLoading)
          return (
            <div className="flex flex-col items-center gap-4">
              <LoadingSpinner size="lg" />
              <p className="text-white/40 text-sm">Cargando lista de invitados...</p>
            </div>
          );
        if (guestsError)
          return <ErrorMessage message={guestsError} />;
        return (
          <GuestLookupStep
            guests={guests}
            onGuestConfirmed={handleGuestConfirmed}
          />
        );

      case "event-info":
        if (!currentGuest) return null;
        return (
          <EventInfoStep
            guest={currentGuest}
            onConfirmAttendance={() => setStep("rsvp")}
          />
        );

      case "rsvp":
        if (!currentGuest) return null;
        return (
          <RsvpStep
            guest={currentGuest}
            onComplete={(outcome, updatedGuest) => {
              if (updatedGuest) {
                setCurrentGuest(updatedGuest);
              }
              setStep(outcome);
            }}
          />
        );

      case "confirmed":
        if (!currentGuest) return null;
        return <ConfirmedStep guest={currentGuest} />;

      case "declined":
        if (!currentGuest) return null;
        return <DeclinedStep guest={currentGuest} />;

      default:
        return null;
    }
  };

  return (
    <PageWrapper>
      <StepTransition stepKey={step}>{renderStep()}</StepTransition>
    </PageWrapper>
  );
}
