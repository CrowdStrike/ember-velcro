import '@glint/environment-ember-loose';
import '@glint/environment-ember-template-imports';

/**
  * NOTE: the '@glint/environment-ember-loose' this library's scope is different
  *       from the app -- consider reporting a bug (somewhere) after further investigation
  */
import 'ember-velcro/glint';

import type Toggler from 'test-app/components/toggler';

import type { HelperLike } from '@glint/template';
import type { Velcro, velcro } from 'ember-velcro';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    /* local stuff for the app here */
    Toggler: typeof Toggler;
    Velcro: typeof Velcro;
    velcro: typeof velcro;

    'object-keys': HelperLike<{
      Args: {
        Positional: [Record<string, unknown>]
      },
      Return: string
    }>
    'page-title': HelperLike<{
      Args: {
        Positional: [string]
      };
      Return: string;
    }>
  }
}
