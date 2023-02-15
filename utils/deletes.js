import Conf from 'conf';
import chalk from 'chalk';

export const resetAll = () => {
    const config = new Conf({projectName: 'tasker'});
    config.set('work-list', []);
    console.log(chalk.bgHex('#f54266').hex('#ffffff').bold('Everything was removed from your tasker 💀'));
}

export const deleteTask = (id) => {
    const config = new Conf({projectName: 'tasker'});
    const workList = config.get('work-list');
    if (!id) {
        console.log(chalk.bgHex('#f54266').hex('#ffffff').bold('Please verify if "ID" was correct!'));
    } else {
        const newWorkList = workList.filter(work => work.id != id);
        const deletedTask = workList.filter(work => work.id == id)[0] || undefined;

        if (!deletedTask) {
            console.log(chalk.bgHex('#f54266').hex('#ffffff').bold('Are you sure, that this task exist? Please check it one more time.'));
        } else {
            console.log(chalk.bgHex('#f54266').hex('#ffffff').bold('"' + deletedTask.title + '" was removed correctly'));
            config.set('work-list', newWorkList);
        }
    }

}