import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';

import VelcroModifier from '@camskene/ember-velcro/modifiers/velcro';

export default class VelcroComponent extends Component {
  _hook = undefined;
  guid = guidFor(this);

  @tracked
  // set by VelcroModifier
  velcroData = undefined;

  velcroHook = modifier(
    (element) => {
      this._hook = element;
    },
    { eager: false }
  );

  velcroLoop = modifier(
    (element) => {
      new VelcroModifier().modify.call(
        this,
        element,
        [this._hook],
        {
          flipOptions: this.args.flipOptions,
          hideOptions: this.args.hideOptions,
          middleware: this.args.middleware,
          offsetOptions: this.args.offsetOptions,
          placement: this.args.placement,
          shiftOptions: this.args.shiftOptions,
          strategy: this.args.strategy,
        }
      );
    },
    { eager: false }
  );
}
