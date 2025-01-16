import { useState, useEffect, useRef } from 'react'
import { LogList } from '../../components/LogList'
import { Button } from '../../components/button'
import kevlarLogo from '../../../assets/kevlar.png'
import './App.css'

export default function LogsPage() {
  const [logs, setLogs] = useState<Log[]>([])

  useEffect(() => {
    const unsubscribe = window.electron.subscribeLogs((log: Log) => {
      setLogs((prevLogs) => {
        const newLogs = [...prevLogs, log]
        return newLogs.slice(-10)
      })
    })
    return unsubscribe
  }, [])


  const clearLogs = () => {
    setLogs([])
  }

  return (
    <div className="flex flex-col items-center justify-center" style={{ height: '100%' }}>
      <div className="p-8 flex flex-col items-center" style={{ width: '80%', height: '100%' }}>
        <img src={kevlarLogo} alt="Kevlar Logo" style={{ height: '95px', marginBottom: '20px' }} />
        <h1 className="text-3xl font-bold mb-6 text-center">Kevlar Logs</h1>
        <LogList logs={logs}/>
        <div className="mt-4 mb-4 self-end">
          <Button onClick={clearLogs} variant="destructive">Clear Logs</Button>
        </div>
      </div>
    </div>
  )
}
