interface AdsterraDesktopBannerProps {
  className?: string
}

export function AdsterraDesktopBanner({ className = '' }: AdsterraDesktopBannerProps) {
  return (
    <div className={`my-6 hidden md:block ${className}`}>
      <div className="text-[10px] uppercase tracking-wide text-gray-500 mb-2 text-center">
        Advertisement
      </div>
      <div className="mx-auto h-[90px] w-[728px] max-w-full overflow-hidden rounded-lg border border-gray-100 bg-white/60">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              atOptions = {
                'key' : '03ee99bb507b6edbba2ce3ecb211a25f',
                'format' : 'iframe',
                'height' : 90,
                'width' : 728,
                'params' : {}
              };
            `,
          }}
        />
        <script async src="https://www.highperformanceformat.com/03ee99bb507b6edbba2ce3ecb211a25f/invoke.js" />
      </div>
    </div>
  )
}
