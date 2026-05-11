import { Header } from "@/components/Header";
import { CategoryCard } from "@/components/CategoryCard";
import { CATEGORIAS, ITEM_CONTATOS } from "@/lib/categorias";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6">
        <h1 className="mb-2 text-2xl font-bold text-foreground">
          Bem-vindo, representante
        </h1>
        <p className="mb-6 text-sm text-muted">
          Selecione o material que deseja consultar.
        </p>
        <nav className="flex flex-col gap-3">
          {CATEGORIAS.map((c) => (
            <CategoryCard
              key={c.slug}
              href={`/categoria/${c.slug}`}
              titulo={c.titulo}
              descricao={c.descricao}
              Icone={c.icone}
            />
          ))}
          <CategoryCard
            href="/contatos"
            titulo={ITEM_CONTATOS.titulo}
            descricao={ITEM_CONTATOS.descricao}
            Icone={ITEM_CONTATOS.icone}
          />
        </nav>
      </main>
    </>
  );
}
