import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [logs, setLogs] = useState<{ timestamp: string, message: string }[]>([])
  const maxLogs = 10; // Set a limit for the number of logs to keep

  useEffect(() => {
    const unsubscribe = window.electron.subscribeLogs((log) => {
      const timestamp = new Date().toLocaleString();
      setLogs((prevLogs) => {
        const newLogs = [...prevLogs, { timestamp, message: log }];
        return newLogs.length > maxLogs ? newLogs.slice(-maxLogs) : newLogs;
      });
    });
    return unsubscribe;
  }, []);

  return (
    <div className="App" style={{ height: '100%', overflowY: 'auto', padding: '0'}}>
        {logs.length > 0 ? (
          logs.map((log, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'flex-start', padding: '10px', width: '100%' }}>
              <span style={{ color: '#00ff00', marginRight: '10px', flexShrink: 0 }}>{log.timestamp}:</span>
              <span style={{ color: '#ffffff', textAlign: 'left', whiteSpace: 'pre-wrap', wordWrap: 'break-word', flexGrow: 1, overflowX: 'hidden' }}>{log.message}</span>
            </div>
          ))
        ) : (
          <div style={{ color: '#ff0000', textAlign: 'center', padding: '10px 0' }}>
            No logs available
          </div>
        )}
    </div>
  )
}

export default App
