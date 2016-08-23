import ExperienceSaga from './experience';
import Messages from './messages';

export default function* rootSaga() {
  yield [
    //call them here like so:
    ExperienceSaga(),
    Messages()
  ];
}
