/* eslint-disable @typescript-eslint/no-explicit-any */

export interface TranslatorPlugin {
  onData(data: any): AsyncGenerator<State>;
}

export interface Type<T> {
  new (...args: any[]): T;
}

export interface State {
  type: string;
  data: any;
}
