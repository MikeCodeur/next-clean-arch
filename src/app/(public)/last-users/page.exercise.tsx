import {getPublicLastUsers} from '@/services/user-service'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {User} from '@/types/user-types'

export default async function Page() {
  const lastUsers = await getPublicLastUsers()
  return (
    <div className="mx-auto max-w-2xl p-6 text-lg">
      <RecentUsersList users={lastUsers} />
    </div>
  )
}

function RecentUsersList({users}: {users: User[]}) {
  return (
    <Card className="mx-auto w-full max-w-xs">
      <CardHeader>
        <CardTitle>Recent Users</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex items-center space-x-4 rounded-lg p-2 transition-colors hover:bg-muted"
            >
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={user.image ?? ''}
                  alt={`Avatar for ${user.email}`}
                />
                <AvatarFallback>
                  {user?.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {user.email}
                      </p>
                      <p
                        className="text-xs text-muted-foreground"
                        suppressHydrationWarning
                      >
                        Joined:{' '}
                        {new Date(user.createdAt ?? '').toLocaleDateString()}
                      </p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>{`Avatar for ${user.password}`}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
