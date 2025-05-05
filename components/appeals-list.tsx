import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import type { JSX } from "react"

interface Appeal {
  id: string
  type: string
  title: string
  department: string
  createdAt: string
  status: string
  description: string
  user?: {
    id: string
    name: string
    email: string
  }
}

interface AppealsListProps {
  appeals: Appeal[]
  getStatusColor: (status: string) => string
  getStatusIcon: (status: string) => JSX.Element
  getStatusText: (status: string) => string
  showUser?: boolean
}

export default function AppealsList({
  appeals,
  getStatusColor,
  getStatusIcon,
  getStatusText,
  showUser = false,
}: AppealsListProps) {
  const getAppealTypeText = (type: string) => {
    switch (type) {
      case "complaint":
        return "Скарга"
      case "suggestion":
        return "Пропозиція"
      case "service":
        return "Запит на послугу"
      default:
        return type
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getViewLink = (appeal: Appeal) => {
    const userRole = typeof window !== "undefined" ? localStorage.getItem("userRole") : null

    if (userRole === "admin") {
      return `/admin/appeal/${appeal.id}`
    } else if (userRole === "manager") {
      return `/manager/appeal/${appeal.id}`
    } else {
      return `/dashboard/appeal/${appeal.id}`
    }
  }

  return (
    <div className="rounded-md border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="py-3 px-4 text-left font-medium">Заголовок</th>
            <th className="py-3 px-4 text-left font-medium">Тип</th>
            <th className="py-3 px-4 text-left font-medium">Відділ</th>
            {showUser && <th className="py-3 px-4 text-left font-medium">Користувач</th>}
            <th className="py-3 px-4 text-left font-medium">Дата</th>
            <th className="py-3 px-4 text-left font-medium">Статус</th>
            <th className="py-3 px-4 text-right font-medium">Дії</th>
          </tr>
        </thead>
        <tbody>
          {appeals.length > 0 ? (
            appeals.map((appeal) => (
              <tr key={appeal.id} className="border-b">
                <td className="py-3 px-4 font-medium">{appeal.title}</td>
                <td className="py-3 px-4">
                  <Badge variant="outline">{getAppealTypeText(appeal.type)}</Badge>
                </td>
                <td className="py-3 px-4">{appeal.department}</td>
                {showUser && <td className="py-3 px-4">{appeal.user?.name}</td>}
                <td className="py-3 px-4">{formatDate(appeal.createdAt)}</td>
                <td className="py-3 px-4">
                  <Badge className={`${getStatusColor(appeal.status)} border-none`}>
                    {getStatusIcon(appeal.status)}
                    <span className="ml-1">{getStatusText(appeal.status)}</span>
                  </Badge>
                </td>
                <td className="py-3 px-4 text-right">
                  <Link href={getViewLink(appeal)}>
                    <Button variant="ghost" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      Переглянути
                    </Button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={showUser ? 7 : 6} className="py-6 text-center text-muted-foreground">
                Немає звернень для відображення
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

