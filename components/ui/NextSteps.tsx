import Link from 'next/link'

interface NextStep {
  href: string
  title: string
  description: string
}

interface NextStepsProps {
  title?: string
  description?: string
  items: NextStep[]
}

export default function NextSteps({
  title = 'Continue Exploring',
  description = 'Useful next pages based on common LumenTale searches.',
  items,
}: NextStepsProps) {
  if (items.length === 0) return null

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-4 md:p-5">
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg border border-gray-200 p-3 hover:border-amber-200 hover:bg-amber-50 transition-colors"
          >
            <div className="text-sm font-semibold text-gray-900">{item.title}</div>
            <div className="mt-1 text-xs text-gray-500">{item.description}</div>
          </Link>
        ))}
      </div>
    </section>
  )
}
