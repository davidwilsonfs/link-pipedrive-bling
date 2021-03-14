const shell = require('shelljs');
const { chalkSuccess, chalkProcessing } = require('./chalk.tools');

switch (process.env.NODE_ENV) {
  case 'dev':
    console.log(chalkProcessing('generating .env file...'));
    shell.cp('.env-dev', '.env');
    console.log(chalkSuccess('.env file created.\n'));
    break;
  case 'test':
    console.log(chalkProcessing('generating .env file...'));
    shell.cp('.env-test', '.env');
    console.log(chalkSuccess('.env file created.\n'));
    break;
  default:
    console.log(chalkProcessing('generating .env file...'));
    shell.cp('.env-prod', '.env');
    console.log(chalkSuccess('.env file created.\n'));
    break;
}
