import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { TypeChip } from '@/components/ui/TypeChip'
import type { Animon } from '@/data/animon'
import { capitalize } from '@/lib/utils'

interface AnimonCardProps {
  animon: Animon
  className?: string
}

export default function AnimonCard({ animon, className }: AnimonCardProps) {
  return (
    <Link href={`/animon/${animon.slug}/`}>
      <Card
        variant="default"
        className={cn(
          'p-4 hover:shadow-md hover:border-amber-200 transition-all cursor-pointer h-full',
          className
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-gray-900">{animon.name}</h3>
            {animon.isStarter && (
              <span className="text-[10px] text-amber-600 font-medium">STARTER</span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-2">
          {animon.types.map((type) => (
            <TypeChip key={type} type={type} size="sm" />
          ))}
        </div>

        {animon.attribute && (
          <div className="mt-2 text-xs text-gray-500">
            Attribute: <span className="font-medium text-gray-700">{capitalize(animon.attribute)}</span>
          </div>
        )}

        {animon.evolvesTo.length > 0 && (
          <div className="mt-1 text-xs text-gray-400">
            → {animon.evolvesTo.map(capitalize).join(', ')}
          </div>
        )}
      </Card>
    </Link>
  )
}
