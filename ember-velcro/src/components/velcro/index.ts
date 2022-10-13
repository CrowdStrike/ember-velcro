import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { modifier } from 'ember-modifier';

import VelcroModifier from '../../modifiers/velcro';

import type { Signature as ModifierSignature } from '../../modifiers/velcro';
import type { MiddlewareArguments } from '@floating-ui/dom';
import type { ModifierLike } from '@glint/template';

type ModifierArgs = ModifierSignature['Args']['Named'];

interface Signature {
  Args: {
    middleware?: ModifierArgs['middleware'];
    placement?: ModifierArgs['placement'];
    strategy?: ModifierArgs['strategy'];
    flipOptions?: ModifierArgs['flipOptions'];
    hideOptions?: ModifierArgs['hideOptions'];
    shiftOptions?: ModifierArgs['shiftOptions'];
    offsetOptions?: ModifierArgs['offsetOptions'];
  };
  Blocks: {
    default: [
      modifiers: {
        hook: ModifierLike<HookSignature>;
        loop: ModifierLike<{
          Element: HTMLElement;
        }>;
      };
      data: MiddlewareArguments;
    ];
  };
}

interface HookSignature {
  Element: HTMLElement | SVGElement;
}

export default class VelcroComponent extends Component<Signature> {
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
