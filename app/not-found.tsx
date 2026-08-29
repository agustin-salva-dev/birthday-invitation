// 404 page with Toothless theme
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 text-center px-4 bg-[#050A18]">
      <Image
        src="/dragons/lightfury-lying.png"
        alt="Furia Luminosa confundida"
        width={160}
        height={110}
        className="drop-shadow-[0_0_20px_rgba(180,180,255,0.5)] opacity-70"
        style={{ animation: "floatSlow 5s ease-in-out infinite" }}
      />
      <div>
        <h1 className="text-6xl font-black text-white/10 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-white mb-2">
          Página no encontrada 🐉
        </h2>
        <p className="text-white/40 text-sm max-w-xs">
          Parece que esta parte del reino escondido no existe todavía
        </p>
      </div>
      <Link
        href="/"
        className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-6 py-3 text-cyan-300 font-semibold hover:bg-cyan-500/20 transition-colors text-sm"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
