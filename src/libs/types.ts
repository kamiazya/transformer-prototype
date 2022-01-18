/* eslint-disable @typescript-eslint/no-explicit-any */

export interface TranslatorPlugin {
  onData(data: any): AsyncGenerator<State>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TranslatorModule {}

export interface constructor<T> {
  new (...args: any[]): T;
}

export interface State {
  type: string;
  data: any;
}
