import type { TranslatorPlugin, Type } from '../types.js';

// export const plugins = new Map<string, Type<TranslatorPlugin>>();

export const paths: [from: string, to: string, plugin: Type<TranslatorPlugin>][] = [];

interface PluginOptions {
  on: string;
  yields: string[];
}

export function Plugin(options: PluginOptions) {
  return (cls: Type<TranslatorPlugin>): Type<TranslatorPlugin> => {
    for (const to of options.yields) {
      paths.push([options.on, to, cls]);
    }
    return cls;
  };
}
