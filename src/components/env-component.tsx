import {cn} from '@/lib/utils'

const EnvComponent = ({
  name,
  disabled = false,
}: {
  name?: string
  disabled?: boolean
}) => {
  const isClient = typeof window !== 'undefined'
  const environment = process.env.NODE_ENV
  if (disabled) {
    return <></>
  }
  return (
    <span className="text-sm" suppressHydrationWarning>
      {isClient ? `Client component ` : `Server component `}
      {name ? `(${name}) ` : ``}
      <span
        suppressHydrationWarning
        className={cn({
          'text-red-300': environment === 'development',
          'text-green-600': environment === 'production',
        })}
      >
        (Env: {environment})&nbsp;
      </span>
    </span>
  )
}

export default EnvComponent
