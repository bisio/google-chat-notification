import * as core from '@actions/core';
import * as JobStatus from './status';
import * as GoogleChat from './chat';

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

async function run() {
  try {
    const name = core.getInput('name', { required: true });
    const url = core.getInput('url', { required: true });
    const extra = core.getInput('extra', {required: false});
    const status = JobStatus.parse(core.getInput('status', { required: true }));

    core.debug(`input params: name=${name}, status=${status}, url=${url} extra=${extra}`);

    await GoogleChat.notify(name, url, status, extra);
    console.info('Sent message.')
  } catch (error) {
    core.setFailed(getErrorMessage(error));
  }
}

run();
