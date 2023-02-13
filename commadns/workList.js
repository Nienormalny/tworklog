import Conf from 'conf';
import chalk from 'chalk';
import Table from 'cli-table3';

const getList = () => {
    const config = new Conf({projectName: 'tasker'});
    const workList = config.get('work-list');
    const table = new Table({
        head: ['Title', 'Started at', 'Stopped at', 'Difference'],
        colWidths: ['100', '100', '100', '100']
    });
    
    if (workList && workList.length) {
        workList.forEach(work => {
            table.push([work.title, work.started, work.stopped, work.difference])
        });
        console.log(table.toString());
    } else {
        console.log(chalk.red.bold('You have not any logged work here. 🤨'));
    }
}

export default getList;
