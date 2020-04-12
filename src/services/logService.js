import * as Sentry from '@sentry/browser';

function init() {
  Sentry.init({
    dsn: 'https://856c5a4bf79945d8abfe551ab990025b@sentry.io/5188790'
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default { init, log };
