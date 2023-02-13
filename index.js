#! /usr/bin/env node

import {program} from 'commander';
import resetAll from './commadns/resetAll.js';
import startWork from './commadns/startWork.js';
import stopWork from './commadns/stopWork.js';
import getList from './commadns/workList.js';

program
    .command('start <title>')
    .description('Start your work.')
    .action(startWork);

program
    .command('show-work-log')
    .description('Display table of your logged work.')
    .action(getList);

program
    .command('reset-all')
    .description('Clear all work logs')
    .action(resetAll);

program
    .command('stop')
    .description('Stop your current job.')
    .action(stopWork);

program.parse();