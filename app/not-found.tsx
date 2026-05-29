import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-6xl mb-4">🔍</div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        The Animon you&apos;re looking for might not be documented yet.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
        >
          Go Home
        </Link>
        <Link
          href="/animon/"
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          Browse Animon
        </Link>
      </div>
    </div>
  )
}
