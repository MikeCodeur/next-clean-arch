'use client'

import {useEffect} from 'react'
import {Button} from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {AlertCircle, RefreshCcw, Home} from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & {digest?: string}
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-center text-3xl font-bold">
            Oops! Something went wrong
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground">
            We apologize for the inconvenience. An unexpected error has
            occurred.
          </p>
          <div className="rounded-md bg-muted p-4">
            <p className="font-mono text-sm text-muted-foreground">
              {error.message || 'Unknown error'}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button
            onClick={reset}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <RefreshCcw className="h-4 w-4" />
            <span>Try Again</span>
          </Button>
          <Button asChild className="flex items-center space-x-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              <span>Go Home</span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
