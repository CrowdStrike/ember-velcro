---
"ember-velcro": minor
---

A `template-registry` is now exported from `ember-velcro` to use with [Glint](https://typed-ember.gitbook.io/glint/). To use it in your apps and addons, add the following to your existing registry:

```ts
import type EmberVelcroRegistry from "ember-velcro/template-registry";

declare module "@glint/environment-ember-loose/registry" {
  export default interface Registry extends EmberVelcroRegistry {
    // Other items here
  }
}
```
