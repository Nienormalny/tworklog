import Conf from 'conf';
import chalk from 'chalk';
import Table from 'cli-table3';

export const getAll = () => {
    const config = new Conf({projectName: 'tasker'});
    const workList = config.get('work-list');
    const table = new Table({
        head: ['Title', 'Started at', 'Stopped at', 'Difference'],
        colWidths: ['100', '100', '100', '100']
    });
    
    if (workList && workList.length) {
        /**
         * @param sortedArr
         * @description sortedArr will drop an Object with tasks that are separated
         * with the date. It will looks like:
         * {
         *  "some-date-1": [
         *      {...task data},
         *      {...task data}
         *  ],
         *  "some-date-2": [
         *      {...task data},
         *      {...task data}
         *  ],
         *  etc...
         * }
         */
        const sortedArr = workList.reduce((prev, curr) => {
            (prev[curr.createdAt] = prev[curr.createdAt] || []).push(curr);
            return prev;
        }, {});

        /**
         * @description here we are checking if sortedArr has any data.
         * If there are some data we will print it to the terminal table.
         */
        if (Object.keys(sortedArr).length) {
            Object.keys(sortedArr).map((date, index) => {
                const works = sortedArr[date];
                /**
                 * @description first let us add row with date to the table - when was all tasks created.
                 * Then under date row, let us add all tasks regarding to above mentioned date to the table as well.
                 */
                if (index === 0) {
                    table.push([{colSpan: 4, content: new Date(date).toLocaleDateString("de-DE"), hAlign: "center"}]);
                }
                works.forEach((task, index) => {
                    table.push([task.title, task.started, task.stopped, task.difference]);
                })
            });
        }
        console.log(table.toString());
    } else {
        console.log(chalk.red.bold('You have not any logged work here. 🤨'));
    }
}
export const getToday = () => {
    const config = new Conf({projectName: 'tasker'});
    const workList = config.get('work-list');
    const table = new Table({
        head: ['Title', 'Started at', 'Stopped at', 'Difference'],
        colWidths: ['100', '100', '100', '100']
    });

    if (workList && workList.length) {
        workList.forEach((task, index) => {
            const taskDate = new Date(task.createdAt).toLocaleDateString("de-DE");
            const currentDate = new Date().toLocaleDateString("de-DE");
            
            if (index === 0) {
                table.push([{colSpan: 4, content: new Date().toLocaleDateString("de-DE"), hAlign: "center"}])
            }
            if ( taskDate === currentDate) {
                table.push([task.title, task.started, task.stopped, task.difference]);
            }
        });
        console.log(table.toString());
    } else {
        console.log(chalk.red.bold('You have not any logged work here. 🤨'));
    }
}