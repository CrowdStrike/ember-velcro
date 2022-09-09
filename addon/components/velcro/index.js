import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';
import { tracked } from '@glimmer/tracking';

import VelcroModifier from '@camskene/ember-velcro/modifiers/velcro';

export default class VelcroComponent extends Component {
  _referenceElement = undefined;

  @tracked
  // set by VelcroModifier
  velcroData = undefined;

  velcroReference = modifier(
    (element) => {
      this._referenceElement = element;
    },
    { eager: false }
  );

  velcroElement = modifier(
    (element) => {
      new VelcroModifier().modify.call(
        this,
        element,
        [this._referenceElement],
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
