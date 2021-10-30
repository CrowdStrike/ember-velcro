import Component from '@glimmer/component';
import { action } from '@ember/object';
import { createPopper } from '@popperjs/core';
import { modifier } from 'ember-modifier';

export default class VelcroComponent extends Component {
  _targetElement = undefined;
  _popoverElement = undefined;

  velcroTarget = modifier((element) => {
    this._targetElement = element;
  });

  velcro = modifier((element) => {
    this._popoverElement = element;

    this._createPopper();
  });

  @action
  _createPopper() {
    createPopper(this._targetElement, this._popoverElement);
  }
}
