import {getPublicLastUsers} from '@/services/user-service'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {getPublicLastUsersDal} from '@/app/dal/user-dal.bonus-1'
import {UserDTO} from '@/services/authentification/type'

export default async function Page() {
  const lastUsers = await getPublicLastUsersDal()
  return (
    <div className="mx-auto max-w-2xl p-6 text-lg">
      <RecentUsersList users={lastUsers} />
    </div>
  )
}

function RecentUsersList({users}: {users?: UserDTO[]}) {
  return (
    <Card className="mx-auto w-full max-w-xs">
      <CardHeader>
        <CardTitle>Recent Users</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {users?.map((user) => (
            <li
              key={user?.email}
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
                  <TooltipContent>{`Avatar for ${user.role ?? 'not autorized'}`}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
