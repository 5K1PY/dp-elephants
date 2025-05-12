import {makeProject} from '@motion-canvas/core';

import statement from './scenes/statement?scene';
import dp_heading from './scenes/dp_heading?scene';
import lis from './scenes/lis?scene';
import dp from './scenes/dp?scene';

export default makeProject({
  scenes: [statement, dp_heading, lis, dp],
});
