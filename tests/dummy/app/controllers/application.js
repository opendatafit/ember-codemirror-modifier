import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  content = `\
def hello_world(*args, **kwargs):
    print("Hello world!", args, kwargs)\
`;

  path = '/some/path';

  @action onUpdate(value) {
    console.log('onUpdate', value);
  }
}
