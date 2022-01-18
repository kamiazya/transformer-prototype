import { injectable, inject, container } from 'tsyringe';
import { Digraph } from '../algorithms/dijkstra.js';
import { getModuleOptions } from '../common/module.js';
import { getPluginOptions } from '../common/plugins.js';
import { TranslatorModule, constructor } from '../types.js';

@injectable()
export class Translator {
  public static from(module: constructor<TranslatorModule>): Translator {
    const c = container.createChildContainer();
    c.register('MODULE', {
      useValue: module,
    });
    return c.resolve(Translator);
  }
  constructor(
    @inject('MODULE')
    private module: constructor<TranslatorModule>,
  ) {}

  public translate(input: string, output: string) {
    const moduleOptions = getModuleOptions(this.module);
    const paths: [from: string, to: string][] = [];
    for (const plugin of moduleOptions.plugins) {
      const pluginOptions = getPluginOptions(plugin);
      for (const destination of pluginOptions.yields) {
        paths.push([pluginOptions.on, destination]);
      }
    }
    const path = Digraph.fromPaths(...paths).findPath(input, output);
    return path;
  }
}
