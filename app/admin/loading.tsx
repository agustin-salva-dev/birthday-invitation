// Admin loading skeleton — shown while admin page loads. (SRP)
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function AdminLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050A18]">
      <LoadingSpinner size="lg" />
    </div>
  );
}
