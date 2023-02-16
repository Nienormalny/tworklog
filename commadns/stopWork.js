import Conf from 'conf';
import chalk from 'chalk';
import { hmsToSeconds, secondsToHms } from '../utils/converters.js';

const stopWork = () => {
    const config = new Conf({projectName: 'tasker'});
    const workList = config.get('work-list');
    let diff = '';

    workList.map(task => {
        if (!task.done) {
            task.done = true;
            task.stopped = new Date().toLocaleTimeString('de-DE', {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });
            task.endedAt = new Date();
            let totalSeconds = secondsToHms(hmsToSeconds(task.stopped) - hmsToSeconds(task.started));

            task.difference = totalSeconds.hours + ':' + totalSeconds.minutes + ':' + totalSeconds.seconds;
            diff = totalSeconds.hours + ' hours and ' + totalSeconds.minutes + ' minutes';
            return task;
        } else {
            return task;
        }
    });

    config.set('work-list', workList);
    console.log(chalk.bgHex('#38f574').hex('#ffffff')('Your work is stopped. Well DONE 😍 You finished this task in: ' + diff));
}

export default stopWork;