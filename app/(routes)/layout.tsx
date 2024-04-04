import './layout.scss'
import '../__assets/global.scss'
import Link from 'next/link'

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="nav">
          <div className='content_nav'>
              <h1>Instagram</h1>

              <div className="actions">
                <Link href="/"><img src="/unselected_icon/home.svg"/>Hjem</Link>
                <Link href="/"><img src="/unselected_icon/search.svg"/>Søk</Link>
                <Link href="/post/create"><img src="/unselected_icon/create_new.svg"/>Opprett</Link>
                <Link href="/profile"><img src="/unselected_icon/profile.svg"/>Profile</Link>

                <button className="logout"><img src="/unselected_icon/logout.svg"/>Logg ut</button>
              </div>
          </div>
        </div>

        {children}
      </body>
    </html>
  )
}