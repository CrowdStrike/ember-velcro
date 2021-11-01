ember-velcro
==============================================================================

Ember Velcro sticks one element to another with [PopperJS](https://popper.js.org/).

The popover is repositioned if the target element resizes and the popover itself is resized if it's contents change.

The Velcro component accepts the same options as PopperJS. For convenience, Velcro also accepts `@offsetX` and `@offsetY` arguments.

API
------------------------------------------------------------------------------

* `@offsetX` - offset popper along the x axis. Default is `0`.
* `@offsetY` - offset popper along the y axis. Default is `0`.
* `@placement` - one of `bottom-start`, `bottom-end`, `top` etc. Default is `bottom`.
* `@modifiers` - an array of any custom modifiers you want to pass in. The `offset` modifier is included by default but you can pass in a custom `offset` modifier to Velcro and PopperJS will use that instead.
* `@onFirstUpdate` - function called on the poppers first update.


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* Node.js v12 or above


Installation
------------------------------------------------------------------------------

```
ember install github:camskene/ember-velcro
```

Usage
------------------------------------------------------------------------------

Ember Velcro yields 2 modifiers:

```hbs
<Velcro as |velcroTarget velcro|>
  <div {{velcroTarget}}>Velcro target</div>
  <div {{velcro}}>I'm stuck to 'Velcro target'</div>
</Velcro>
```

Contributing
------------------------------------------------------------------------------

Ember-velcro is written primarily for my own fun and education. To that end, it's probably best to ask before going to the effort of submitting a PR.

There's a few things I'd like to tackle myself in the immediate future:

* Convert to TypeScript
* Update version based on commits. I've been using conventional commits.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
