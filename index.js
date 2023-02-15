#! /usr/bin/env node

import {program} from 'commander';
import resetAll from './commadns/resetAll.js';
import startWork from './commadns/startWork.js';
import stopWork from './commadns/stopWork.js';
import { getAll, getToday } from './commadns/workList.js';

program
    .command('start <title>')
    .description('Start your work.')
    .action(startWork);

program
    .command('show-all')
    .description('Display table with all tasks, that you logged.')
    .action(getAll);

program
    .command('show-today')
    .description('Display table with tasks, that you logged today.')
    .action(getToday);

program
    .command('reset-all')
    .description('Clear all work logs')
    .action(resetAll);

program
    .command('stop')
    .description('Stop your current job.')
    .action(stopWork);

program.parse();