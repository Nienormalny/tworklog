import Conf from 'conf';
import chalk from 'chalk';

const resetAll = () => {
    const config = new Conf({projectName: 'tasker'});
    config.set('work-list', []);
    console.log(chalk.bgRedBright.hex('#ffffff').bold('Everything was removed from your tasker 💀'));
}

export default resetAll;