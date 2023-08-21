import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class Toggler extends Component {
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
