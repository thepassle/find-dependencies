import { describe } from '@asdgf/cli';
import { globby } from 'globby';
import assert from 'assert';

import { findDependencies } from '../src/find-dependencies.js';

describe('find-dependencies', ({it}) => {
  it('finds dependencies for monorepo setup', async () => {
    const globs = await globby(['fixtures/monorepo/packages/my-package/*.js']);
    let dependencies = await findDependencies(globs, { basePath: 'fixtures/monorepo/packages/my-package' });
    dependencies = dependencies.map(d => d.split('find-dependencies')[1]);

    assert.deepEqual(dependencies,
      [
        '/fixtures/monorepo/packages/my-package/node_modules/@scoped/package/index.js',
        '/fixtures/monorepo/packages/my-package/node_modules/@scoped/package/baz/index.js',
        '/fixtures/monorepo/packages/my-package/node_modules/export-map/long/path/index.js',
        '/fixtures/monorepo/packages/my-package/node_modules/nested/index.js',
        '/fixtures/monorepo/packages/my-package/node_modules/regular/index.js',
        '/fixtures/monorepo/node_modules/monorepo-dep/index.js',
        '/fixtures/monorepo/packages/my-package/node_modules/internal-shared/index.js',
        '/fixtures/monorepo/packages/my-package/node_modules/dynamic-import/index.js',
        '/fixtures/monorepo/packages/my-package/node_modules/nested/node_modules/regular/index.js',
        '/fixtures/monorepo/packages/my-package/node_modules/internal-shared/a.js',
        '/fixtures/monorepo/packages/my-package/node_modules/internal-shared/b.js',
        '/fixtures/monorepo/packages/my-package/node_modules/internal-shared/c.js'
      ]
    )
  });

  it('finds dependencies for regular setup', async () => {
    const globs = await globby(['fixtures/regular/*.js']);
    let dependencies = await findDependencies(globs, { basePath: 'fixtures/regular' });
    dependencies = dependencies.map(d => d.split('find-dependencies')[1]);

    assert.deepEqual(dependencies,
      [ 
        '/fixtures/regular/node_modules/bar/index.js',
        '/fixtures/regular/node_modules/foo/index.js'
      ]
    )
  });
});