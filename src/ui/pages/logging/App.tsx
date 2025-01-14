import { useState, useEffect } from 'react'
import { LogList } from '../../components/LogList'
import { Button } from '../../components/button'
import './App.css'

export default function LogsPage() {
  const [logs, setLogs] = useState<Log[]>([])

  useEffect(() => {
    const unsubscribe = window.electron.subscribeLogs((log: Log) => {
      setLogs((prevLogs) => {
        const newLogs = [log, ...prevLogs]
        return newLogs.slice(0, 10)
      })
    })
    return unsubscribe
  }, [])

  const clearLogs = () => {
    setLogs([])
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Kevlar Logs</h1>
        {logs.length > 0 && (
          <div className="mb-4 flex justify-end">
            <Button onClick={clearLogs} variant="destructive">Clear Logs</Button>
          </div>
        )}
        <LogList logs={logs}/>
      </div>
    </div>
  )
}
