import Conf from 'conf';
import chalk from 'chalk';
// import * as xl from 'excel4node';

const startWork = (title) => {
    const config = new Conf({projectName: 'tasker'});

    let workList = config.get('work-list');
    let anyWorkIsNotDone = false;
    let currentTaskTitle = '';

    if (!workList) {
        workList = [];
    }

    workList.forEach(work => {
        if (!work.done) {
            anyWorkIsNotDone = true;
            currentTaskTitle = work.title;
        }
    });

    if (anyWorkIsNotDone) {
        console.log(chalk.bgHex('#e87420').hex('#ffffff').bold('Please finish your current task: ' + currentTaskTitle));
    } else {
        console.log(chalk.bgHex('#2084e8').hex('#ffffff').bold('Starting work on: ' + title));

        workList.push({
            id: workList.length,
            title,
            done: false,
            started: new Date().toLocaleTimeString('de-DE', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }),
            stopped: '-:-',
            difference: '-:-'
        });
        config.set('work-list', workList);
        console.log(chalk.blue.bold('Work started. Be happy and stay motivated 😊'));
    }
    

}

export default startWork;