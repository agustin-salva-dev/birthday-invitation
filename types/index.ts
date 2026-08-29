// Shared TypeScript types across the entire application.
// Single source of truth for domain types. (SRP + ISP)

export type GuestStatus = "PENDING" | "CONFIRMED" | "DECLINED";

export interface Guest {
  id: string;
  name: string;
  status: GuestStatus;
  companions: number;
  createdAt: string;
  updatedAt: string;
}

// Step flow types
export type InvitationStep =
  | "intro"
  | "guest-lookup"
  | "event-info"
  | "rsvp"
  | "confirmed"
  | "declined";

// API response wrappers
export interface ApiResponse<T> {
  data: T;
  error?: never;
}

export interface ApiError {
  data?: never;
  error: string;
}

export type ApiResult<T> = ApiResponse<T> | ApiError;

// Admin types
export interface AdminStats {
  total: number;
  confirmed: number;
  declined: number;
  pending: number;
  totalPeople: number;
}
