import {makeProject} from '@motion-canvas/core';

import lis from './scenes/lis?scene';
import statement from './scenes/statement?scene';

export default makeProject({
  scenes: [statement, lis],
});
