import '@glint/environment-ember-loose';
import '@glint/environment-ember-template-imports';

import 'ember-velcro/glint';

import type { Velcro, velcro } from 'ember-velcro';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    /* local stuff for the app here */
    Velcro: typeof Velcro;
    velcro: typeof velcro;
  }
}
