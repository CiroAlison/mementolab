import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Mettiti in contatto con MementoLab: scrivimi via form, email o WhatsApp, oppure seguimi su Instagram.",
  alternates: { canonical: "/contatti" },
};

export default function ContattiPage() {
  return (
    <section className="wrap grid gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:gap-20">
      <div>
        <p className="eyebrow">Contatti</p>
        <h1 className="mt-3 font-display text-5xl leading-[0.95] text-ink sm:text-6xl">
          Parliamone
        </h1>
        <p className="mt-5 text-pretty font-sans text-base leading-relaxed text-ink/70">
          Per una commissione, una collaborazione o solo per un saluto: sono qui.
          Il modo più veloce per raggiungermi è Instagram o WhatsApp.
        </p>

        <div className="mt-10 space-y-5">
          <ContactRow label="Instagram" value={site.instagramHandle} href={site.instagram} />
          <ContactRow
            label="WhatsApp"
            value="348 592 4413"
            href={`https://wa.me/${site.whatsapp}`}
          />
          <ContactRow label="Email" value={site.email} href={`mailto:${site.email}`} />
          <ContactRow label="Dove" value={`${site.city}, Italia`} />
        </div>
      </div>

      <div className="rounded-2xl border border-ink/10 bg-paper-soft/60 p-6 sm:p-8">
        <ContactForm />
      </div>
    </section>
  );
}

function ContactRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-ink/10 pb-4">
      <span className="eyebrow text-ink/40">{label}</span>
      {href ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="link-underline font-sans text-base text-ink hover:text-sky"
        >
          {value}
        </a>
      ) : (
        <span className="font-sans text-base text-ink">{value}</span>
      )}
    </div>
  );
}
