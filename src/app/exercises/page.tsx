import ImageTheme from '@/components/image-theme'

export default function Page() {
  return (
    <div className="grid h-full items-center justify-center p-4 text-center">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Welcome to the App
        </h1>
        <ImageTheme
          className="relative z-10 mt-4"
          src="/NEXT-MASTERY-dark.png"
          srcInverse="/NEXT-MASTERY-light.png"
          alt="App Logo"
          width={400}
          height={37}
          priority
        />
      </div>
    </div>
  )
}
