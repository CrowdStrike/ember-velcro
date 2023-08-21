import { assert } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';

import { autoUpdate, computePosition, flip, hide, offset, shift } from '@floating-ui/dom';
import Modifier from 'ember-modifier';

import { velcroData } from '../middleware/velcro-data';

import type { Middleware, Placement, Strategy } from '@floating-ui/dom';

/**
 * TODO: figure out how to get the real types out of @floating-ui/dom
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TODO = any;

export interface Signature {
  Element: HTMLElement;
  Args: {
    Positional: [referenceElement: string | HTMLElement | SVGElement];
    Named: {
      strategy?: Strategy;
      offsetOptions?: TODO;
      placement?: Placement;
      flipOptions?: TODO;
      shiftOptions?: TODO;
      hideOptions?: TODO;
      middleware?: Middleware[];
      setVelcroData?: Middleware['fn'];
    };
  };
}

export default class VelcroModifier extends Modifier<Signature> {
  modify(
    floatingElement: Signature['Element'],
    [_referenceElement]: Signature['Args']['Positional'],
    {
      strategy = 'fixed',
      offsetOptions = 0,
      placement = 'bottom',
      flipOptions,
      shiftOptions,
      middleware = [],
      setVelcroData,
    }: Signature['Args']['Named']
  ) {
    const referenceElement: null | HTMLElement | SVGElement =
      typeof _referenceElement === 'string'
        ? document.querySelector(_referenceElement)
        : _referenceElement;

    assert(
      'no reference element defined',
      referenceElement instanceof HTMLElement || referenceElement instanceof SVGElement
    );

    assert(
      'no floating element defined',
      floatingElement instanceof HTMLElement || _referenceElement instanceof SVGElement
    );

    assert(
      'reference and floating elements cannot be the same element',
      floatingElement !== _referenceElement
    );

    assert('@middleware must be an array of one or more objects', Array.isArray(middleware));

    Object.assign(floatingElement.style, {
      position: strategy,
      top: '0',
      left: '0',
    });

    let update = async () => {
      let { middlewareData, x, y } = await computePosition(referenceElement, floatingElement, {
        middleware: [
          offset(offsetOptions),
          flip(flipOptions),
          shift(shiftOptions),
          ...middleware,
          hide({ strategy: 'referenceHidden' }),
          hide({ strategy: 'escaped' }),
          velcroData(),
        ],
        placement,
        strategy,
      });

      Object.assign(floatingElement.style, {
        top: `${y}px`,
        left: `${x}px`,
        margin: 0,
      });
      setVelcroData?.(middlewareData.metadata);
    };

    update();

    let cleanup = autoUpdate(referenceElement, floatingElement, update);

    registerDestructor(this, cleanup);
  }
}
