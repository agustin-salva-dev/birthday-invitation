// GoogleMapEmbed — embedded map with external link button. (SRP)
"use client";

import { MapPin, ExternalLink } from "lucide-react";
import { EVENT } from "@/lib/constants";

export function GoogleMapEmbed() {
  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Address pill */}
      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
        <MapPin size={16} className="text-cyan-400 shrink-0" />
        <span className="text-sm text-white/80">{EVENT.fullAddress}</span>
      </div>

      {/* Embedded map via iframe */}
      <div className="relative w-full overflow-hidden rounded-xl border border-white/10 shadow-lg shadow-cyan-500/5">
        <iframe
          title="Ubicación del evento"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(EVENT.fullAddress)}&output=embed&z=16`}
          width="100%"
          height="200"
          loading="lazy"
          className="w-full"
          style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
          allowFullScreen={false}
          referrerPolicy="no-referrer-when-downgrade"
        />
        {/* Overlay with link to open in Google Maps */}
        <a
          href={EVENT.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="open-google-maps"
          className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-lg border border-white/20 bg-slate-900/90 px-3 py-1.5 text-xs text-cyan-300 backdrop-blur-sm hover:bg-white/10 transition-colors"
        >
          <ExternalLink size={12} />
          Abrir en Maps
        </a>
      </div>
    </div>
  );
}
