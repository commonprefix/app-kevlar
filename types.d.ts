type Log = {
  message: string;
  level: string;
  timestamp: string;
}

type EventPayloadMapping = {
  logs: Log;
}

type UnsubscribeFunction = () => void;

interface Window {
  electron: {
    subscribeLogs: (callback: (logs: Log) => void) => UnsubscribeFunction;
  }
  ethereum: {
    request: any;
  }
}
