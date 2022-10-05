import { assert } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';

import { autoUpdate, computePosition, flip, hide, offset, shift } from '@floating-ui/dom';
import Modifier from 'ember-modifier';
import { velcroData } from 'ember-velcro/middleware/velcro-data';

export default class VelcroModifier extends Modifier {
  modify(
    floatingElement,
    [referenceElement],
    {
      strategy = 'fixed',
      offsetOptions = 0,
      placement = 'bottom',
      flipOptions,
      shiftOptions,
      middleware = [],
      setVelcroData,
    }
  ) {
    if (typeof referenceElement === 'string') {
      referenceElement = document.querySelector(referenceElement);
    }

    assert(
      'no reference element defined',
      referenceElement instanceof HTMLElement || referenceElement instanceof SVGElement
    );

    assert(
      'no floating element defined',
      floatingElement instanceof HTMLElement || referenceElement instanceof SVGElement
    );

    assert(
      'reference and floating elements cannot be the same element',
      floatingElement !== referenceElement
    );

    assert('@middleware must be an array of one or more objects', Array.isArray(middleware));

    Object.assign(floatingElement.style, {
      position: strategy,
      top: '0',
      left: '0',
    });

    let update = async () => {
      let { x, y, middlewareData } = await computePosition(referenceElement, floatingElement, {
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
        strategy,
        transform: `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`,
        visibility: middlewareData.hide.referenceHidden ? 'hidden' : 'visible',
      });

      setVelcroData?.(middlewareData.metadata);
    };

    let cleanup = autoUpdate(referenceElement, floatingElement, update);

    registerDestructor(this, cleanup);
  }
}
