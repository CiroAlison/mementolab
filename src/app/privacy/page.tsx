import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Informativa sul trattamento dei dati personali di MementoLab ai sensi del Regolamento (UE) 2016/679 (GDPR).",
  alternates: { canonical: "/privacy" },
};

const updated = "5 luglio 2026";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl text-ink sm:text-3xl">{title}</h2>
      <div className="mt-3 space-y-3 text-pretty font-sans text-sm leading-relaxed text-ink/75">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="wrap max-w-3xl py-16 sm:py-24">
      <p className="eyebrow">Informativa</p>
      <h1 className="mt-3 font-display text-5xl text-ink sm:text-6xl">
        Privacy Policy
      </h1>
      <p className="mt-4 font-sans text-sm text-ink/60">
        Ultimo aggiornamento: {updated}
      </p>
      <p className="mt-6 text-pretty font-sans text-sm leading-relaxed text-ink/75">
        Questa informativa descrive come {site.name} tratta i dati personali degli
        utenti del sito, ai sensi del Regolamento (UE) 2016/679 (&ldquo;GDPR&rdquo;)
        e della normativa italiana applicabile.
      </p>

      <Section title="1. Titolare del trattamento">
        <p>
          Il titolare del trattamento è {site.name} ({site.city}, Italia).
          Per qualsiasi richiesta relativa ai tuoi dati puoi scrivere a{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-ink underline underline-offset-2 hover:text-ink/70"
          >
            {site.email}
          </a>{" "}
          o contattarci via WhatsApp al numero 348 592 4413.
        </p>
      </Section>

      <Section title="2. Quali dati raccogliamo">
        <p>Trattiamo esclusivamente i dati che ci fornisci volontariamente:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Modulo commissioni</strong>: nome, email, eventuale telefono,
            tipo di capo, descrizione della tua idea ed eventuale budget indicativo.
          </li>
          <li>
            <strong>Modulo contatti</strong>: nome, email e testo del messaggio.
          </li>
          <li>
            <strong>Eventuale newsletter</strong>: indirizzo email, solo se ti
            iscrivi.
          </li>
        </ul>
        <p>
          Il sito non utilizza cookie di profilazione o strumenti di tracciamento
          pubblicitario. Viene usato solo lo spazio di memoria tecnica del browser
          (es. per mostrare l&apos;animazione introduttiva una sola volta per
          sessione), che non identifica l&apos;utente.
        </p>
      </Section>

      <Section title="3. Finalità e base giuridica">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Rispondere alle tue richieste e gestire un&apos;eventuale commissione —
            base giuridica: esecuzione di misure precontrattuali e contrattuali su
            tua richiesta (art. 6.1.b GDPR).
          </li>
          <li>
            Inviarti la newsletter, se iscritto — base giuridica: il tuo consenso
            (art. 6.1.a GDPR), revocabile in qualsiasi momento.
          </li>
        </ul>
      </Section>

      <Section title="4. Destinatari dei dati">
        <p>
          I dati possono essere trattati, per nostro conto e come responsabili del
          trattamento, dai fornitori tecnici necessari al funzionamento del sito:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Vercel Inc.</strong> — hosting del sito.</li>
          <li><strong>Neon Inc.</strong> — database in cui vengono salvate le richieste.</li>
          <li><strong>Resend</strong> — invio delle email di notifica.</li>
        </ul>
        <p>
          I dati non vengono diffusi né ceduti a terzi per finalità commerciali.
        </p>
      </Section>

      <Section title="5. Conservazione">
        <p>
          Conserviamo i dati per il tempo necessario a gestire la tua richiesta e
          adempiere agli obblighi di legge; i dati per la newsletter fino alla
          revoca del consenso.
        </p>
      </Section>

      <Section title="6. I tuoi diritti">
        <p>
          Hai il diritto di accedere ai tuoi dati, chiederne la rettifica o la
          cancellazione, limitarne o opporti al trattamento, e alla portabilità.
          Puoi esercitare questi diritti scrivendo a{" "}
          <a href={`mailto:${site.email}`} className="font-medium text-ink underline underline-offset-2 hover:text-ink/70">
            {site.email}
          </a>
          . Hai inoltre diritto di proporre reclamo all&apos;Autorità Garante per la
          protezione dei dati personali (www.garanteprivacy.it).
        </p>
      </Section>

      <Section title="7. Modifiche">
        <p>
          Questa informativa può essere aggiornata: le modifiche saranno pubblicate
          su questa pagina con la relativa data di aggiornamento.
        </p>
      </Section>
    </div>
  );
}
