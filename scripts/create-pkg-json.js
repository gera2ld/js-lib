import { pick } from 'es-toolkit';
import { writeFile } from 'fs/promises';
import pkg from '../package.json' with { type: 'json' };

await writeFile(
  'dist/package.json',
  JSON.stringify(
    pick(pkg, [
      'name',
      'version',
      'dependencies',
      'type',
      'author',
      'license',
      'dependencies',
    ]),
  ),
);
