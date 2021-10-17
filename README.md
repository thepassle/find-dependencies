# find-dependencies

Given an array of paths, scans all modules and returns all depending paths
To be used on frontend facing, ESM code.

```js
const inputPaths = ['fixtures/default/bar.js'];
```

Where `fixtures/default/bar.js` contains:

```js
import { bla } from '@foo/bar';
import { bla2 } from '@foo/bar/baz/asd.js';
import { foo } from 'foo';
import bla3 from './bla.js';
```

```js
const inputPaths = ['fixtures/default/bar.js'];

const dependencies = await findDependencies(inputPaths);
```

Will output:

```js
[
  '/Users/blank/my-project/node_modules/@foo/bar/index.js',
  '/Users/blank/my-project/node_modules/@foo/bar/baz/asd.js',
  '/Users/blank/my-project/node_modules/foo/index.js',
  '/Users/blank/my-project/node_modules/bar/index.js',
]
```
