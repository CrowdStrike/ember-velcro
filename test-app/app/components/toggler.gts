import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
// @ts-ignore
import { hash } from '@ember/helper';

export default class Toggler extends Component<{
  Blocks: {
    default: [
      {
        isActive: boolean,
        current: boolean,
        toggle: () => void,
      }
    ]
  }
}> {
 @tracked isActive = false;

  toggle = () => this.isActive = !this.isActive;

  <template>
    {{yield (hash
      isActive=this.isActive
      current=this.isActive
      toggle=this.toggle
    )}}

  </template>
}
