import {Metadata} from 'next'
import Link from 'next/link'
import {PropsWithChildren} from 'react'
import {ModeToggle} from '@/components/theme-toggle'
import RenderTime from '@/components/render-time'
import {Lock} from 'lucide-react'
import withAuth from '@/components/features/auth/withAuth'
import {moduleName} from '@/lib/constante'
import {getConnectedUserLabel} from '@/services/authentification/auth-service'

export const metadata: Metadata = {
  title: 'Adminitration Shop',
  description: 'Adminitration Shop',
}

async function DashboardLayout({children}: PropsWithChildren) {
  const label = await getConnectedUserLabel()
  return (
    <div className="flex h-screen flex-col">
      <header className="border-b">
        <div className="container px-4 sm:px-6 lg:px-8">
          <nav className="flex h-14 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Lock className="icon-class" />
              <Link className="flex items-center space-x-2 font-bold" href="/">
                <span>Home</span>
              </Link>
              <Link
                className="flex items-center space-x-2 font-bold"
                href="/dashboard"
              >
                <span>Dashboard</span>
              </Link>
              <Link
                className="flex items-center space-x-2 font-bold"
                href="/bank"
              >
                <span>Bank</span>
              </Link>
              <Link
                className="flex items-center space-x-2 font-bold"
                href="/shop-admin/1"
              >
                <span>Admin</span>
              </Link>
              <Link
                className="flex items-center space-x-2 font-bold"
                href="/redactor"
              >
                <span>Redactor</span>
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

              {label}
              <ModeToggle />
            </div>
          </nav>
        </div>
      </header>

      <main className="w-full flex-1">{children}</main>
      <footer className="border-t">
        <div className="container flex h-14 items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            © {new Date().getFullYear()} {moduleName} . All rights reserved.{' '}
            <RenderTime name="exercices main layout" />
          </div>
        </div>
      </footer>
    </div>
  )
}
export default withAuth(DashboardLayout)
