interface AdsterraMediumRectangleProps {
  className?: string
}

export function AdsterraMediumRectangle({ className = '' }: AdsterraMediumRectangleProps) {
  return (
    <div className={`my-6 flex justify-center ${className}`}>
      <div>
        <div className="text-[10px] uppercase tracking-wide text-gray-500 mb-2 text-center">
          Advertisement
        </div>
        <div className="h-[250px] w-[300px] overflow-hidden rounded-lg border border-gray-100 bg-white/60">
          <script
            dangerouslySetInnerHTML={{
              __html: `
                atOptions = {
                  'key' : '22d3945b5bfdc82391e53b708ee18e1e',
                  'format' : 'iframe',
                  'height' : 250,
                  'width' : 300,
                  'params' : {}
                };
              `,
            }}
          />
          <script async src="https://www.highperformanceformat.com/22d3945b5bfdc82391e53b708ee18e1e/invoke.js" />
        </div>
      </div>
    </div>
  )
}
