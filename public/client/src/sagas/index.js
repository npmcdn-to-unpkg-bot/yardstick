import ExperienceSaga from './experience';
import Messages from './messages';
import AuthSaga from './auth';

export default function* rootSaga() {
  yield [
    //call them here like so:
    AuthSaga(),
    ExperienceSaga(),
    Messages()
  ];
}
