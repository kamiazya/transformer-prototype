import { VFile } from 'vfile';

import { Plugin } from '../libs/common/plugins.js';
import type { State, TranslatorPlugin } from '../libs/types.js';

@Plugin({
  on: 'path',
  yields: ['file'],
})
export class Path implements TranslatorPlugin {
  async *onData(path: string): AsyncGenerator<State> {
    yield {
      type: 'file',
      data: new VFile({ path }),
    };
  }
}
