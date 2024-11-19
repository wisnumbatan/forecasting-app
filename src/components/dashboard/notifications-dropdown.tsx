import { Bell } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { NotificationService } from "../../lib/service/notification.service"

export function NotificationsDropdown() {
  const { data: notifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: NotificationService.getAll,
  })

  interface Notification {
    id: string;
    title: string;
    message: string;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          {notifications?.length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        $SELECTION_PLACEHOLDER$ code is:
      </DropdownMenuContent>
    </DropdownMenu>
  )
}