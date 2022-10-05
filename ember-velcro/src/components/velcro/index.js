import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { modifier } from 'ember-modifier';

import VelcroModifier from '../../modifiers/velcro';

export default class VelcroComponent extends Component {
  @tracked hook = undefined;

  // set by VelcroModifier
  @tracked velcroData = undefined;

  setVelcroData = (data) => (this.velcroData = data);

  velcroHook = modifier(
    (element) => {
      this.hook = element;
    },
    { eager: false }
  );

  velcroLoop = VelcroModifier;
}
