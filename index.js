#! /usr/bin/env node

import {program} from 'commander';
import startWork from './commadns/startWork.js';
import stopWork from './commadns/stopWork.js';
import { getAll, getToday } from './commadns/workList.js';
import { deleteTask, resetAll } from './utils/deletes.js';

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
    .command('delete <id>')
    .description('Remove task, that you was working on. Due to his ID.')
    .action(deleteTask);

program
    .command('stop')
    .description('Stop your current job.')
    .action(stopWork);

program.parse();