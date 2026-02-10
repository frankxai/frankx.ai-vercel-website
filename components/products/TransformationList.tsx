interface TransformationListProps {
  items: string[]
  title?: string
}

export default function TransformationList({ items, title }: TransformationListProps) {
  return (
    <section className="bg-[#02030b] py-16">
      <div className="mx-auto max-w-4xl px-6">
        {title ? (
          <h2 className="text-center text-3xl font-semibold text-white">{title}</h2>
        ) : null}
        <div className="mt-10 grid gap-4">
          {items.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 text-left text-white/80 shadow-[0_8px_24px_rgba(8,15,33,0.4)]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
