import {Metadata} from 'next'
import Link from 'next/link'
import {PropsWithChildren} from 'react'

import {ModeToggle} from '@/components/theme-toggle'

import RenderTime from '@/components/render-time'

export const metadata: Metadata = {
  title: 'App',
  description: "Page d'app",
}

export default function AppLayout({children}: PropsWithChildren) {
  return (
    <div className="flex h-screen flex-col">
      <header className="border-b">
        <div className="container px-4 sm:px-6 lg:px-8">
          <nav className="flex h-14 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                className="flex items-center space-x-2 font-bold"
                href="/exercises"
              >
                <span>Home</span>
              </Link>

              <Link
                className="flex items-center space-x-2 font-bold"
                href="/instructions"
              >
                <span>Instructions</span>
              </Link>

              <div className="hidden items-center space-x-2 md:flex"></div>
            </div>
            <div className="flex items-center space-x-2">
              <Link
                className="text-sm font-semibold underline sm:hidden"
                href="/exercises"
              >
                Home
              </Link>
              <Link
                className="text-sm font-semibold underline sm:hidden"
                href="/instructions"
              >
                Instructions
              </Link>

              <ModeToggle />
            </div>
          </nav>
        </div>
      </header>

      <main className="w-full flex-1">{children}</main>
      <footer className="border-t">
        <div className="container flex h-14 items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            © {new Date().getFullYear()} Next Module . All rights reserved.{' '}
            <RenderTime name="exercices main layout" />
          </div>
        </div>
      </footer>
    </div>
  )
}
