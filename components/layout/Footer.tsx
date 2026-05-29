import Link from 'next/link'
import { siteConfig } from '@/lib/config'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Database */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Database</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/animon/" className="hover:text-white transition-colors">All Animon</Link></li>
              <li><Link href="/type-chart/" className="hover:text-white transition-colors">Type Chart</Link></li>
              <li><Link href="/attributes/" className="hover:text-white transition-colors">Attributes</Link></li>
              <li><Link href="/evolution-guide/" className="hover:text-white transition-colors">Evolution Guide</Link></li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Tools</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/weakness-calculator/" className="hover:text-white transition-colors">Weakness Calculator</Link></li>
              <li><Link href="/team-builder/" className="hover:text-white transition-colors">Team Builder</Link></li>
              <li><Link href="/best-starter/" className="hover:text-white transition-colors">Best Starter</Link></li>
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Guides</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/sp-tp-explained/" className="hover:text-white transition-colors">SP & TP Explained</Link></li>
              <li><Link href="/walkthrough/" className="hover:text-white transition-colors">Walkthrough</Link></li>
              <li><Link href="/locations/" className="hover:text-white transition-colors">Locations</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">About</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about/" className="hover:text-white transition-colors">About This Site</Link></li>
              <li><Link href="/privacy/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms/" className="hover:text-white transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <p>
            Fan-made companion site for {siteConfig.gameName}. Not affiliated with {siteConfig.developer} or {siteConfig.publisher}.
          </p>
          <p>© {new Date().getFullYear()} {siteConfig.siteName}</p>
        </div>
      </div>
    </footer>
  )
}
