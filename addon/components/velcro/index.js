import Component from '@glimmer/component';
import { action } from '@ember/object';
import { createPopper } from '@popperjs/core';
import { inject as service } from '@ember/service';
import { modifier } from 'ember-modifier';

export default class VelcroComponent extends Component {
  @service resizeObserver;

  _targetElement = undefined;
  _popoverElement = undefined;
  _popper = undefined;

  velcroTarget = modifier((element) => {
    this._targetElement = element;
    this.resizeObserver.observe(element, this._updatePopper);

    return () => {
      this.resizeObserver.unobserve(element, this._updatePopper);
    };
  });

  velcro = modifier((element) => {
    this._popoverElement = element;

    this._createPopper();
    this.resizeObserver.observe(element, this._updatePopper);

    return () => {
      this.resizeObserver.unobserve(element, this._updatePopper);
    };
  });

  @action
  _createPopper() {
    this._popper = createPopper(this._targetElement, this._popoverElement);
  }

  @action
  _updatePopper() {
    this._popper.update();
  }
}
