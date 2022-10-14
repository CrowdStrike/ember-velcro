import '@glint/environment-ember-loose';

import type VelcroComponent from './dist/components/velcro';
import type VelcroModifier from './dist/modifiers/velcro';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Velcro: typeof VelcroComponent;
    velcro: typeof VelcroModifier;
  }
}
