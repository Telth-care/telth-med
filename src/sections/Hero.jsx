import heroImg from "../assets/image-11.jpeg";
import heroSizeImg from "../assets/image-10.jpeg";

import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink py-16 md:py-20 min-h-[600px] flex items-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Medical professionals in a hospital corridor"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      {/* Decorative rings */}
      <span className="absolute -right-24 -top-24 z-0 w-96 h-96 border border-brass/15 rounded-full pointer-events-none" />
      <span className="absolute right-10 top-8 z-0 w-72 h-72 border border-brass/10 rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-site mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-[1.25fr_0.85fr] gap-12 items-start">
        {/* Left column – copy */}
        <div>
          <p className="text-brass-dark font-sans font-semibold text-[11px] tracking-[0.14em] uppercase mb-3">
            Harley Health Global Healthcare Ecosystem · India · UK · USA
          </p>
          <h1 className="font-serif font-semibold text-parchment leading-[1.08] tracking-[-0.01em] text-[clamp(2rem,4vw,3.2rem)] mb-5">
            Train globally.<br />
            Lead professionally.<br />
            <em className="text-brass-dark not-italic font-medium">
              Build healthcare organisations.
            </em>
          </h1>
          <p className="text-parchment/75 text-[1.05rem] max-w-lg mb-6 leading-relaxed">
            A structured workforce-mobility and professional-development
            programme for physicians, physician associates, nurses, and
            care-management professionals — built around accredited postgraduate
            education and a transparent pathway toward healthcare leadership and
            ownership.
          </p>
          <div className="flex items-center gap-5 mb-5 flex-wrap">
            <Link
              to="/application-form"
              className="bg-parchment text-ink font-semibold text-sm px-5 py-3 rounded hover:bg-brass-dark hover:text-parchment hover:-translate-y-px hover:shadow-lg transition-all duration-200"
            >
              Apply Now
            </Link>
            <a
              href="#pathways"
              className="text-brass font-semibold text-sm hover:text-parchment transition-colors duration-200"
            >
              View pathways →
            </a>
          </div>
          <div className="flex gap-2.5 mb-5 flex-wrap">
            {["🇮🇳 India", "🇬🇧 UK", "🇺🇸 USA"].map((f) => (
              <span
                key={f}
                className="text-parchment/75 font-semibold text-xs border border-parchment/20 bg-parchment/[0.07] px-3 py-1 rounded-full backdrop-blur-sm"
              >
                {f}
              </span>
            ))}
          </div>
          <p className="text-parchment/50 text-[0.8rem] border-t border-parchment/15 pt-3 max-w-md leading-relaxed">
            Every stage of this programme is subject to eligibility, university
            admission, immigration rules, professional regulation and partner
            availability — full compliance notice below.
          </p>
        </div>

        {/* Right column – panel */}
        <aside className="relative rounded-md shadow-panel mt-2 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={heroSizeImg}
              alt="Healthcare professionals collaborating"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gray-50 backdrop-blur-[4px]" />
          </div>

          <div className="relative z-10 p-7">
            <p className="text-black font-bold text-[11px] tracking-[0.1em] uppercase mb-4">
              Programme at a glance
            </p>
            <ul className="grid grid-cols-2 gap-5 mb-5 list-none p-0">
              {[
                { num: "3", label: "Professional groups" },
                { num: "3", label: "Countries — India, UK, USA" },
                { num: "360°", label: "Care ecosystem exposure" },
                { num: "Global", label: "Mobility-minded design" },
              ].map((s) => (
                <li key={s.label} className="border-l-2 border-brass-dark pl-3">
                  <span className="block font-serif font-semibold text-2xl text-black">
                    {s.num}
                  </span>
                  <span className="block text-black text-xs mt-0.5 leading-tight">
                    {s.label}
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t border-line pt-4">
              <p className="text-black text-sm mb-3 leading-relaxed">
                Delivered with Telth — a US-based health-technology platform —
                and Harley Health System, a UK healthcare delivery and training
                partner.
              </p>
              <a
                href="#apply"
                className="flex items-center justify-center w-full bg-ink text-parchment font-semibold text-sm px-4 py-3 rounded hover:bg-brass-dark hover:text-parchment transition-colors duration-200"
              >
                Register Interest →
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}