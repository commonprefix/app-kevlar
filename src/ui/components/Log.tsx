import { Card, CardContent } from "./card"
import { Badge } from "./badge"

export function Log({ log }: { log: Log }) {
  return (
    <Card className="mb-2">
      <CardContent className="p-4 flex items-center justify-between">
        <span className="text-sm text-gray-500" style={{ minWidth: '9rem' }}>
          {log.timestamp}
        </span>
        <span className="flex-grow mx-4" style={{ wordBreak: 'break-word', marginRight: '15px' }}>
          {log.message}
        </span>
        <Badge variant={log.level === 'info' ? 'default' : 'destructive'}>
          {log.level}
        </Badge>
      </CardContent>
    </Card>
  )
}
