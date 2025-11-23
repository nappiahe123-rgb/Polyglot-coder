export interface Language {
  id: string;
  name: string;
  extension: string;
}

export interface GeneratedResult {
  code: string;
  explanation: string;
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}