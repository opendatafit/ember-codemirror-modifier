import { action } from '@ember/object';
import { bind } from '@ember/runloop';
import Modifier, { ArgsFor, PositionalArgs, NamedArgs } from 'ember-modifier';

import CodeMirror from 'codemirror';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/selection/active-line';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';


interface CodeMirrorArgs {
  Args: {
    Named: {
      content: string;
      mode: string;
      readOnly: boolean;
      onUpdate: (content: string) => void;
    };
    Positional: never;
  };
}


export default class CodeMirrorModifier extends Modifier<CodeMirrorArgs> {
  private _editor!: CodeMirror.Editor;
  private _onUpdate!: (content: string) => void;

  constructor(
    owner: unknown,
    args: ArgsFor<CodeMirrorArgs>
  ) {
    super(owner, args);
    this._onUpdate = args.named.onUpdate;
  }

  modify(
    element: Element,
    positionalArgs: PositionalArgs<CodeMirrorArgs>,
    args: NamedArgs<CodeMirrorArgs>
  ) {
    if (!element) {
      throw new Error('CodeMirror modifier has no element');
    }

    if (!this._editor) {
      this._createEditor(element, args);
    } else {
      this._updateEditor(args);
    }
  }

  private _createEditor(
    element: Element,
    args: NamedArgs<CodeMirrorArgs>
  ) {
    const editor: CodeMirror.Editor = CodeMirror(element as HTMLElement, {
      value: args.content || '',
      readOnly: args.readOnly,
      mode: args.mode,
      theme: 'neat',
      lineNumbers: true,
      matchBrackets: true,
      styleActiveLine: true,
      viewportMargin: Infinity,
    });

    editor.on('change', bind(this, this._onEditorChange));

    this._editor = editor;
  }

  private _updateEditor(
    args: NamedArgs<CodeMirrorArgs>
  ) {
    if (this._editor.getValue() !== args.content) {
      this._editor.setValue(args.content);
    }

    this._editor.setOption('readOnly', args.readOnly);
    this._editor.setOption('mode', args.mode);
  }

  @action
  private _onEditorChange(
    editor: CodeMirror.Editor,
    _changeObject: CodeMirror.EditorChange
  ) {
    this._onUpdate(editor.getValue());
  }
}
