import 'reflect-metadata';
import { Module } from './libs/common/module.js';
import { TranslatorModule, constructor } from './libs/types.js';
import { Glob } from './plugins/glob.js';
import { Path } from './plugins/path.js';
import { Translator } from './libs/models/transporter.js';

@Module({
  name: 'my-module',
  plugins: [Glob, Path],
})
class MyModule implements TranslatorModule {}

function translate(module: constructor<TranslatorModule>, input: { type: string; data: any }, outputType: string) {
  const translator = Translator.from(module);
  return translator.translate(input.type, outputType);
}

console.log(
  translate(
    MyModule,
    {
      type: 'glob',
      data: 'test/*',
    },
    'file',
  ),
);
