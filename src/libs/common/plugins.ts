import type { TranslatorPlugin, constructor } from '../types.js';

const pluginOptionsKey = Symbol('pluginOptions');

interface PluginOptions {
  on: string;
  yields: string[];
}

export function Plugin(options: PluginOptions) {
  return (cls: constructor<TranslatorPlugin>): constructor<TranslatorPlugin> => {
    Reflect.set(cls, pluginOptionsKey, options);
    return cls;
  };
}

export function getPluginOptions(plugin: constructor<TranslatorPlugin>): PluginOptions {
  return Reflect.get(plugin, pluginOptionsKey);
}
