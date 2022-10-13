import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { modifier } from 'ember-modifier';

import VelcroModifier from '../../modifiers/velcro';

import type { MiddlewareArguments } from '@floating-ui/dom';
import type { ModifierLike } from '@glint/template';

interface HookSignature {
  Element: HTMLElement | SVGElement;
  Blocks: {
    default: [
      hook: ModifierLike<HookSignature>,
      loop: ModifierLike<{
        Element: HTMLElement;
      }>,
      data: MiddlewareArguments
    ];
  };
}

export default class VelcroComponent extends Component {
  @tracked hook?: HTMLElement | SVGElement = undefined;

  // set by VelcroModifier
  @tracked velcroData?: MiddlewareArguments = undefined;

  setVelcroData = (data: MiddlewareArguments) => (this.velcroData = data);

  velcroHook = modifier<HookSignature>(
    (element) => {
      this.hook = element;
    },
    { eager: false }
  );

  velcroLoop = VelcroModifier;
}
