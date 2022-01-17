import glob from 'fast-glob';

import type { State, TranslatorPlugin } from '../libs/types.js';
import { Plugin } from '../libs/common/plugins.js';

@Plugin({
  on: 'glob',
  yields: ['path'],
})
export class Glob implements TranslatorPlugin {
  async *onData(pattern: string | string[]): AsyncGenerator<State> {
    for (const path of await glob(pattern)) {
      yield {
        type: 'path',
        data: path,
      };
    }
  }
}
