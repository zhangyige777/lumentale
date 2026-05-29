'use client'

import { cn } from '@/lib/utils'

interface AdSlotProps {
  slot: string
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
  className?: string
}

export function AdSlot({ slot, format = 'auto', className }: AdSlotProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID
  if (!clientId) return null

  return (
    <div className={cn('my-6 flex justify-center', className)}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '90px' }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
