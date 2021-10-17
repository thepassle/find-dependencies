import { globby } from 'globby';
import { findDependencies } from './src/find-dependencies.js';

const globs = await globby(['fixture/packages/my-package/*.js']);
const dependencies = await findDependencies(globs, { basePath: 'fixture/packages/my-package' });

console.log(dependencies);