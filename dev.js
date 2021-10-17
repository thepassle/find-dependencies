import { globby } from 'globby';
import { findDependencies } from './src/find-dependencies.js';

const globs = await globby(['fixtures/*.js']);
const dependencies = await findDependencies(globs);

console.log(dependencies);