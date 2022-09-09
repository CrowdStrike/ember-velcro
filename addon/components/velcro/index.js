import Component from '@glimmer/component';
import {
  autoUpdate,
  computePosition,
  flip,
  hide,
  offset,
  shift,
} from '@floating-ui/dom';
import { modifier } from 'ember-modifier';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';

export default class VelcroComponent extends Component {
  _referenceElement = undefined;

  @tracked
  velcroData = undefined;

  velcroReference = modifier(
    (element) => {
      this._referenceElement = element;
    },
    { eager: false }
  );

  velcroElement = modifier(
    (floatingElement) => {
      let { _referenceElement } = this;

      assert(
        'no reference element defined',
        _referenceElement instanceof HTMLElement
      );

      assert(
        'no floating element defined',
        floatingElement instanceof HTMLElement
      );

      assert(
        'reference and floating elements cannot be the same element',
        floatingElement !== _referenceElement
      );

      // `update` is passed to `autoUpdate` and is called when necessary so that the floating element
      // remains "anchored" to the reference element in a variety of scenarios without detaching.
      let update = async () => {
        // https://floating-ui.com/docs/computeposition#strategy
        let strategy = this.args.strategy ?? 'fixed';

        // The layout of the floating element prior to being positioned matters:
        // * The CSS position must be `absolute` or `fixed` prior to `computePosition()` being called.
        //   This sets the correct initial dimensions (instead of being `block` layout).
        // * Setting `top` and `left` to `0` initially minimizes layout interference with the dimensions
        //   of the element, so that its final dimensions are ready before being positioned.
        Object.assign(floatingElement.style, {
          position: strategy,
          top: '0',
          left: '0',
        });

        // https://floating-ui.com/docs/offset#options
        let offsetOptions = this.args.offset ?? 0;

        // https://floating-ui.com/docs/flip#options
        let flipMiddleware = this.args.flip ? flip(this.args.flip) : flip();

        // https://floating-ui.com/docs/shift#options
        let shiftMiddleware = this.args.shift
          ? shift(this.args.shift)
          : shift();

        // https://floating-ui.com/docs/middleware
        // Middleware behavior is dependent on order. Each middleware returns
        // new coordinates and data which middleware later in the array can use.
        // In general, `offset()` should always go at the beginning of the middleware
        // array, while `arrow()` and `hide()` at the end. The other core middleware can
        // be shifted around depending on the desired behavior.
        let customMiddleware = this.args.middleware ?? [];

        assert('@middleware must be an array', Array.isArray(customMiddleware));

        let middleware = [
          offset(offsetOptions),
          flipMiddleware,
          shiftMiddleware,
          ...customMiddleware,
          hide({ strategy: 'referenceHidden' }),
          hide({ strategy: 'escaped' }),
          velcroData(),
        ];

        // https://floating-ui.com/docs/computePosition#placement
        let placement = this.args.placement ?? 'bottom';

        let options = {
          middleware,
          placement,
          strategy,
        };

        // https://floating-ui.com/docs/computePosition
        let { x, y, middlewareData } = await computePosition(
          _referenceElement,
          floatingElement,
          options
        );

        x = Math.round(x);
        y = Math.round(y);
        let { referenceHidden } = middlewareData.hide;

        Object.assign(floatingElement.style, {
          transform: `translate3d(${x}px, ${y}px, 0)`,
          visibility: referenceHidden ? 'hidden' : 'visible',
        });

        this.velcroData = middlewareData.metadata;
      };

      // https://floating-ui.com/docs/autoUpdate
      // `autoUpdate` returns a "cleanup" function that should be invoked when
      // the floating element is no longer mounted on the DOM.
      let cleanup = autoUpdate(_referenceElement, floatingElement, update);

      return () => {
        cleanup();
      };
    },
    { eager: false }
  );
}

function velcroData() {
  return {
    name: 'metadata',
    fn: (data) => {
      // https://floating-ui.com/docs/middleware#always-return-an-object
      return {
        data,
      };
    },
  };
}
