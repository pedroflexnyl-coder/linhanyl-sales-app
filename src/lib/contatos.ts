import type { EmpresaSlug } from "./empresas";

export type Contato = {
  setor: string;
  descricao?: string;
  telefone?: string;
  whatsapp?: string;
  email?: string;
};

export type ContatosEmpresa = {
  contatos: Contato[];
  endereco: { texto: string; mapsUrl: string };
};

// Placeholders — atualizar com dados reais
export const CONTATOS_POR_EMPRESA: Record<EmpresaSlug, ContatosEmpresa> = {
  linhanyl: {
    contatos: [
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
    ],
    endereco: {
      texto: "Endereço da fábrica Linhanyl — atualizar",
      mapsUrl: "https://www.linhanyl.com.br",
    },
  },
  flexnyl: {
    contatos: [
      {
        setor: "Fábrica / SAC",
        telefone: "(00) 0000-0000",
        email: "sac@nyl.com.br",
      },
      {
        setor: "Financeiro",
        telefone: "(00) 0000-0000",
        email: "financeiro@nyl.com.br",
      },
      {
        setor: "Expedição / Logística",
        telefone: "(00) 0000-0000",
      },
      {
        setor: "Suporte ao Representante",
        whatsapp: "5500000000000",
        email: "comercial@nyl.com.br",
      },
    ],
    endereco: {
      texto: "Endereço da fábrica Flexnyl — atualizar",
      mapsUrl: "https://www.nyl.com.br",
    },
  },
};
