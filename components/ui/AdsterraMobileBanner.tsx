interface AdsterraMobileBannerProps {
  className?: string
}

export function AdsterraMobileBanner({ className = '' }: AdsterraMobileBannerProps) {
  return (
    <div className={`my-5 flex justify-center md:hidden ${className}`}>
      <div>
        <div className="text-[10px] uppercase tracking-wide text-gray-500 mb-2 text-center">
          Advertisement
        </div>
        <div className="h-[50px] w-[320px] max-w-full overflow-hidden rounded-md border border-gray-100 bg-white/60">
          <script
            dangerouslySetInnerHTML={{
              __html: `
                atOptions = {
                  'key' : 'f61d06d0467c50d715ec964dffdc973a',
                  'format' : 'iframe',
                  'height' : 50,
                  'width' : 320,
                  'params' : {}
                };
              `,
            }}
          />
          <script async src="https://www.highperformanceformat.com/f61d06d0467c50d715ec964dffdc973a/invoke.js" />
        </div>
      </div>
    </div>
  )
}
