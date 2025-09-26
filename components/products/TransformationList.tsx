interface TransformationListProps {
  items: string[]
  title?: string
}

export default function TransformationList({ items, title }: TransformationListProps) {
  return (
    <section className="bg-slate-950 py-16">
      <div className="mx-auto max-w-4xl px-6">
        {title ? (
          <h2 className="text-center text-3xl font-semibold text-white">{title}</h2>
        ) : null}
        <div className="mt-10 grid gap-4">
          {items.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 px-6 py-4 text-left text-white/80 shadow-[0_6px_24px_rgba(15,23,42,0.35)]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
