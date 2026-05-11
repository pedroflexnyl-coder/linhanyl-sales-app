type Props = {
  size?: "sm" | "md" | "lg";
  tone?: "brand" | "white";
};

export function Logo({ size = "md", tone = "brand" }: Props) {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  } as const;
  const color = tone === "white" ? "text-white" : "text-brand";

  return (
    <span className={`font-bold tracking-tight ${sizes[size]} ${color}`}>
      Linhanyl
      <span className="font-light opacity-70">®</span>
    </span>
  );
}

export function LogoBlock() {
  return (
    <div className="flex flex-col items-center gap-1">
      <Logo size="lg" />
      <span className="text-xs uppercase tracking-[0.2em] text-muted">
        Qualidade em todos os pontos
      </span>
    </div>
  );
}
