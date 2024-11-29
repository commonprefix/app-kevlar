type Logs = string

type EventPayloadMapping = {
  logs: Logs;
}

type UnsubscribeFunction = () => void;

interface Window {
  electron: {
    subscribeLogs: (callback: (logs: Logs) => void) => UnsubscribeFunction;
  }
  ethereum: {
    request: any;
  }
}
