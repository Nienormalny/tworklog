import Conf from 'conf';
import chalk from 'chalk';

const hmsToSeconds = (time) => {
    const b = time.split(':');

    return b[0]*3600 + b[1]*60 + (+b[2] || 0);
}

const secondsToHms = (seconds) => {
    function z(n) {
        return (n < 10 ? '0' : '' ) + n;
    }

    // const sign = seconds < 0 ? '-' : '';
    seconds = Math.abs(seconds);
    const timeObj = {
        hours: z(seconds/3600 |0),
        minutes: z((seconds%3600) / 60 |0),
        seconds: z(seconds%60)
    }
    return timeObj;
}

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