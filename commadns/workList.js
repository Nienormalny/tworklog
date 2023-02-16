import Conf from 'conf';
import chalk from 'chalk';
import Table from 'cli-table3';
import { hmsToSeconds, secondsToHms } from '../utils/converters.js';

export const getAll = () => {
    const config = new Conf({projectName: 'tasker'});
    const workList = config.get('work-list');
    const table = new Table({
        head: ['Id', 'Title', 'Started at', 'Stopped at', 'Difference'],
        colWidths: ['50', '100', '100', '100', '100']
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
            const currDate = new Date(curr.createdAt).toLocaleDateString('de-DE');
            (prev[currDate] = prev[currDate] || []).push(curr);
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
                if (new Date(works[0].createdAt).toLocaleDateString('de-DE') !== new Date(works[0].endedAt).toLocaleDateString('de-DE')) {
                    table.push([{colSpan: 5, content: `${new Date(works[0].createdAt).toLocaleDateString('de-DE')} / ${new Date(works[0].endedAt).toLocaleDateString('de-DE')}`, hAlign: "center"}]);
                } else {
                    table.push([{colSpan: 5, content: date, hAlign: "center"}]);
                }
                let summary = 0; // in seconds
                works.forEach((task, i) => {
                    if (task.done) {
                        summary += parseInt(hmsToSeconds(task.difference));
                    }
                    table.push([task.id, task.title, task.started, task.stopped, task.difference]);
                    if (i === (works.length - 1)) {
                        const summatyObj = secondsToHms(summary);
                        table.push([{colSpan: 4, content: 'Summary', hAlign: 'center'}, `${summatyObj.hours}:${summatyObj.minutes}:${summatyObj.seconds}`]);
                    };
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
        head: ['Id', 'Title', 'Started at', 'Stopped at', 'Difference'],
        colWidths: ['50', '100', '100', '100', '100']
    });

    if (workList && workList.length) {
        let summary = 0;
        workList.forEach((task, index) => {
            const taskDate = new Date(task.createdAt).toLocaleDateString("de-DE");
            const currentDate = new Date().toLocaleDateString("de-DE");
            if (index === 0) {
                table.push([{colSpan: 5, content: new Date().toLocaleDateString("de-DE"), hAlign: "center"}])
            }
            if ( taskDate === currentDate) {
                if (task.done) {
                    summary += parseInt(hmsToSeconds(task.difference));
                }
                table.push([task.id, task.title, task.started, task.stopped, task.difference]);
                if (index === (workList.length - 1)) {
                    const summatyObj = secondsToHms(summary);
                    table.push([{colSpan: 4, content: 'Summary', hAlign: 'center'}, `${summatyObj.hours}:${summatyObj.minutes}:${summatyObj.seconds}`]);
                };
            }
        });
        console.log(table.toString());
    } else {
        console.log(chalk.red.bold('You have not any logged work here. 🤨'));
    }
}