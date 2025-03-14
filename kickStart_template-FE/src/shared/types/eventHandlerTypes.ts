export interface CustomCallbacks {
  [key: string]: (...args: any[]) => void;
}

export interface ExtensibleEventHandler {
  beforeCallback?: (param?: any) => void;
  afterCallback?: (param?: any) => void;
  customCallback?: CustomCallbacks;
  handler?: (param?: any) => void;
}
