import { action } from '@ember/object';
import { bind } from '@ember/runloop';
import Modifier from 'ember-modifier';

import CodeMirror from 'codemirror';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/selection/active-line';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';


interface Args {
  named: {
    content: string;
    mode: string;
    readOnly: boolean;
    onUpdate: (content: string) => void;
    [key: string]: unknown;
  };
  positional: never;
}


export default class CodeMirrorModifier extends Modifier<Args> {
  private _editor!: CodeMirror.Editor;

  didInstall() {
    this._setup();
  }

  didUpdateArguments() {
    if (this._editor.getValue() !== this.args.named.content) {
      this._editor.setValue(this.args.named.content);
    }

    this._editor.setOption('readOnly', this.args.named.readOnly);
    this._editor.setOption('mode', this.args.named.mode);
  }

  @action
  private _onChange(editor: CodeMirror.Editor, _changeObject: CodeMirror.EditorChange) {
    this.args.named.onUpdate(editor.getValue());
  }

  private _setup() {
    if (!this.element) {
      throw new Error('CodeMirror modifier has no element');
    }

    console.log('Mode:', this.args.named.mode)

    const editor: CodeMirror.Editor = CodeMirror(this.element as HTMLElement, {
      value: this.args.named.content || '',
      readOnly: this.args.named.readOnly,
      mode: this.args.named.mode,
      theme: 'neat',
      lineNumbers: true,
      matchBrackets: true,
      styleActiveLine: true,
      viewportMargin: Infinity,
    });

    editor.on('change', bind(this, this._onChange));

    this._editor = editor;
  }
}
