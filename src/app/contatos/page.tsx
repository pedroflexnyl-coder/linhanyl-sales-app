import { Header } from "@/components/Header";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

type Contato = {
  setor: string;
  descricao?: string;
  telefone?: string;
  whatsapp?: string;
  email?: string;
};

// Placeholders — atualizar com os dados reais da Linhanyl
const CONTATOS: Contato[] = [
  {
    setor: "Fábrica / SAC",
    telefone: "(00) 0000-0000",
    email: "sac@linhanyl.com.br",
  },
  {
    setor: "Financeiro",
    telefone: "(00) 0000-0000",
    email: "financeiro@linhanyl.com.br",
  },
  {
    setor: "Expedição / Logística",
    telefone: "(00) 0000-0000",
  },
  {
    setor: "Suporte ao Representante",
    whatsapp: "5500000000000",
    email: "comercial@linhanyl.com.br",
  },
];

const ENDERECO = {
  texto: "Endereço da fábrica — atualizar",
  mapsUrl: "https://www.linhanyl.com.br",
};

export default function ContatosPage() {
  return (
    <>
      <Header backHref="/home" title="Contatos Úteis" />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6">
        <ul className="flex flex-col gap-3">
          {CONTATOS.map((c) => (
            <li
              key={c.setor}
              className="rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border"
            >
              <h2 className="text-base font-semibold text-foreground">
                {c.setor}
              </h2>
              {c.descricao && (
                <p className="mt-0.5 text-sm text-muted">{c.descricao}</p>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                {c.telefone && (
                  <a
                    href={`tel:${c.telefone.replace(/\D/g, "")}`}
                    className="flex items-center gap-2 rounded-xl bg-brand/10 px-3 py-2 text-sm font-medium text-brand active:scale-[0.98]"
                  >
                    <Phone className="h-4 w-4" />
                    {c.telefone}
                  </a>
                )}
                {c.whatsapp && (
                  <a
                    href={`https://wa.me/${c.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 active:scale-[0.98]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                )}
                {c.email && (
                  <a
                    href={`mailto:${c.email}`}
                    className="flex items-center gap-2 rounded-xl bg-background px-3 py-2 text-sm font-medium text-foreground ring-1 ring-border active:scale-[0.98]"
                  >
                    <Mail className="h-4 w-4" />
                    {c.email}
                  </a>
                )}
              </div>
            </li>
          ))}

          <li className="rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border">
            <h2 className="text-base font-semibold text-foreground">
              Endereço
            </h2>
            <p className="mt-1 text-sm text-muted">{ENDERECO.texto}</p>
            <a
              href={ENDERECO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-brand/10 px-3 py-2 text-sm font-medium text-brand active:scale-[0.98]"
            >
              <MapPin className="h-4 w-4" />
              Ver no mapa
            </a>
          </li>
        </ul>

        <p className="mt-6 text-center text-xs text-muted">
          Para atualizar contatos, editar{" "}
          <code className="rounded bg-background px-1 py-0.5">
            src/app/contatos/page.tsx
          </code>
        </p>
      </main>
    </>
  );
}
