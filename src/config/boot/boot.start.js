const { startJobCron } = require('../../modules/pipedrive/pipedrive-worker');

async function startSystem() {
  try {
    startJobCron();
  } catch (error) {
    console.log(error);
  }
}

export { startSystem };
