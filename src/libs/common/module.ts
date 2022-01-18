import type { TranslatorPlugin, TranslatorModule, constructor } from '../types.js';

const moduleOptionsKey = Symbol('moduleOptions');

export interface ModuleOptions {
  name: string;
  plugins: constructor<TranslatorPlugin>[];
}

export function Module(options: ModuleOptions) {
  return (cls: constructor<TranslatorModule>): constructor<TranslatorModule> => {
    Reflect.set(cls, moduleOptionsKey, options);
    return cls;
  };
}

export function getModuleOptions(module: constructor<TranslatorModule>): ModuleOptions {
  return Reflect.get(module, moduleOptionsKey);
}
