'use client'

import { useEffect, useRef } from 'react'

interface LogEntry {
  timestamp: string
  level: string
  message: string
}

const levelColors = {
  INFO: 'text-[#69db7c]',
  ERROR: 'text-[#ff6b6b]',
  EXIT: 'text-[#ffa94d]'
}

export default function LogViewer({ logs }: { logs: LogEntry[] }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [logs])

  const cleanLogMessage = (message: string) => {
    return message.replace(/\[\x1b\[\d+m(\w+)\x1b\[\d+m\]:\s*/, '')
  }

  return (
    <div 
      ref={containerRef}
      className="h-full overflow-auto text-white font-mono text-sm p-4"
    >
      {logs.map((log, index) => (
        <div key={index} style={{ marginBottom: '2px' }}>
          <span className="text-[#69db7c]">{log.timestamp}</span>
          <span className="mx-2">|</span>
          <span className={`${levelColors[log.level as keyof typeof levelColors]}
              px-1 inline-block w-[50px] text-center`}>{log.level}</span>
          <span className="mx-2">|</span>
          <span className="text-white break-words">{cleanLogMessage(log.message)}</span>
        </div>
      ))}
    </div>
  )
} 