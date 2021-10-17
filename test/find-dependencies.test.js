import { describe } from '@asdgf/cli';
import { globby } from 'globby';
import assert from 'assert';

import { findDependencies } from '../src/find-dependencies.js';

describe('find-dependencies', ({it}) => {
  it('finds dependencies', async () => {
    const globs = await globby(['fixture/packages/my-package/*.js']);
    let dependencies = await findDependencies(globs, { basePath: 'fixture/packages/my-package' });
    dependencies = dependencies.map(d => d.split('find-dependencies')[1]);

    assert.deepEqual(dependencies,
      [
        '/fixture/packages/my-package/node_modules/@scoped/package/index.js',
        '/fixture/packages/my-package/node_modules/@scoped/package/baz/index.js',
        '/fixture/packages/my-package/node_modules/export-map/long/path/index.js',
        '/fixture/packages/my-package/node_modules/nested/index.js',
        '/fixture/packages/my-package/node_modules/regular/index.js',
        '/fixture/node_modules/monorepo/index.js',
        '/fixture/packages/my-package/node_modules/dynamic-import/index.js',
        '/fixture/packages/my-package/node_modules/nested/node_modules/regular/index.js'
      ]
    )
  });
});