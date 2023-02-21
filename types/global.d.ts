// Types for compiled templates
declare module '@opendatafit/ember-codemirror-modifier/templates/*' {
  import { TemplateFactory } from 'htmlbars-inline-precompile';
  const tmpl: TemplateFactory;
  export default tmpl;
}
