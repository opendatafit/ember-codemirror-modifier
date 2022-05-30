import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  content = 'This is a string';
  path = '/some/path';

  @action onUpdate(value) {
    console.log('onUpdate', value);
  }
}
