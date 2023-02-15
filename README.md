# tworklog

This is your terminal work time logger.
I decided to write something simple to log my time.
Every time i start a Ticket in Jira i wrote on the paper date, start time, ticket number and end time.
Then at the end of the day i must calculate everything and log my time to Jira to specific ticket etc.
It was time consuming. But i found an idea to write something for terminal.

Simple small app that will start my task and end my task with possiblity to print all my tasks in terminal.

## How to install

##### Via npm

`npm i tworklogger -g`

##### Via git clone

1. `git clone` this project
2. Go to cloned repo and -> `npm i -g` - install it globaly to use wherever you are in terminal.

## How to use

1. `twork start "Your task title or ticket number"` - this will start your "work", at this moment your work will be logged.
2. `twork stop` - this command will stop your work and save it to the table with more details.
3. `twork show-all` - this command will print table with all tasks, that you started.
4. `twork show-today` - this command will print table with tasks logged today.

5. `twork reset-all` - this will remove all data from tables.

## Feature updates

- Show summary of logged times.
- Export table to excel file
- Remove only defined task

and more ...
