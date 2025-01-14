import { ScrollArea } from "./scroll-area"
import { Log } from "./Log"

export function LogList({ logs }: { logs: Log[] }) {
  return (
    <ScrollArea className="flex-grow">
      {logs.length > 0 ? (
        logs.map((log, index) => (
          <Log key={index} log={log} />
        ))
      ) : (
        <div className="text-center text-gray-500">No logs to display</div>
      )}
    </ScrollArea>
  )
}
