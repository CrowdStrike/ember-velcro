import type Velcro from './dist/components/velcro';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Velcro: typeof Velcro;
  }
}
