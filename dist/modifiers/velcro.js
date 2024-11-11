import { assert } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';
import { autoUpdate, computePosition, offset, flip, shift, hide } from '@floating-ui/dom';
import Modifier from 'ember-modifier';

function velcroData() {
  return {
    name: 'metadata',
    fn: data => {
      // https://floating-ui.com/docs/middleware#always-return-an-object
      return {
        data
      };
    }
  };
}

class VelcroModifier extends Modifier {
  modify(floatingElement, [_referenceElement], {
    strategy = 'fixed',
    offsetOptions = 0,
    placement = 'bottom',
    flipOptions,
    shiftOptions,
    middleware = [],
    setVelcroData
  }) {
    const referenceElement = typeof _referenceElement === 'string' ? document.querySelector(_referenceElement) : _referenceElement;
    assert('no reference element defined', referenceElement instanceof HTMLElement || referenceElement instanceof SVGElement);
    assert('no floating element defined', floatingElement instanceof HTMLElement || _referenceElement instanceof SVGElement);
    assert('reference and floating elements cannot be the same element', floatingElement !== _referenceElement);
    assert('@middleware must be an array of one or more objects', Array.isArray(middleware));
    Object.assign(floatingElement.style, {
      position: strategy,
      top: '0',
      left: '0'
    });
    let update = async () => {
      let {
        middlewareData,
        x,
        y
      } = await computePosition(referenceElement, floatingElement, {
        middleware: [offset(offsetOptions), flip(flipOptions), shift(shiftOptions), ...middleware, hide({
          strategy: 'referenceHidden'
        }), hide({
          strategy: 'escaped'
        }), velcroData()],
        placement,
        strategy
      });
      const {
        referenceHidden
      } = middlewareData.hide;
      Object.assign(floatingElement.style, {
        top: `${y}px`,
        left: `${x}px`,
        margin: 0,
        visibility: referenceHidden ? 'hidden' : 'visible'
      });
      setVelcroData?.(middlewareData.metadata);
    };
    update();
    let cleanup = autoUpdate(referenceElement, floatingElement, update);
    registerDestructor(this, cleanup);
  }
}

export { VelcroModifier as default };
//# sourceMappingURL=velcro.js.map
