import { useState, useEffect } from 'react'
import LogViewer from '../../components/LogViewer'
import './App.css'

const MAX_LOGS = 1000

export default function LogsPage() {
  const [logs, setLogs] = useState<Log[]>([])

  useEffect(() => {
    const unsubscribe = window.electron.subscribeLogs((log: Log) => {
      setLogs((prevLogs) => {
        const newLogs = [...prevLogs, log]
        return newLogs.slice(-MAX_LOGS)
      })
    })
    return unsubscribe
  }, [])

  const clearLogs = () => {
    setLogs([])
  }

  return (
      <div className="flex flex-col w-full h-full">
        <div className="flex-grow overflow-hidden">
          <LogViewer logs={logs} />
        </div>
      </div>
  )
}
