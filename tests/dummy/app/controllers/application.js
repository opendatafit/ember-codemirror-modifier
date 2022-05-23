import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  content = 'This is a string';
  path = '/some/path';

  @action onUpdate(value) {
    console.log('onUpdate', value);
  }
}
