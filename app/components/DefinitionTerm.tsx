type DefinitionTermProps = {
  label: string;
  slug: string;
  term: string;
  shortDefinition: string;
};

export function DefinitionTerm({
  label,
  slug,
  shortDefinition,
}: DefinitionTermProps) {
  return (
    <a
      className="definition-term__link"
      href={`/learn/glossary/#term-${slug}`}
      title={shortDefinition}
    >
      {label}
    </a>
  );
}
