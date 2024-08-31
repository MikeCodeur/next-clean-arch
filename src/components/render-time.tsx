import EnvComponent from './env-component'

export default function RenderTime({
  name,
  disabled = false,
}: {
  name?: string
  disabled?: boolean
}) {
  return (
    <div className="flex flex-auto items-center justify-center ">
      <p className="text-sm">
        <EnvComponent name={name} disabled={disabled} />
        Rendu à&nbsp;
        <span className="animate-color-cycle" suppressHydrationWarning>
          {new Date().toLocaleTimeString()}
        </span>
      </p>
    </div>
  )
}
