Ember Velcro
==============================================================================

Ember Velcro sticks one element to another with [Floating UI](https://floating-ui.com/), it can be used as a modifier or a component.

Several of Floating UI's functions and [middleware](https://floating-ui.com/docs/middleware) are used to create an experience out of the box that is useful and expected.

See Floating UI's [documentation](https://floating-ui.com/docs/getting-started) for more information on any of the following included functionality.

Functions:

[computePosition](https://floating-ui.com/docs/computePosition) - computes the x and y coordinates needed to anchor a floating element to a reference element.

[autoUpdate](https://floating-ui.com/docs/autoUpdate) - updates the x and y coordinates of the floating element so it remains anchored to the reference element when the page scrolls or when either the reference or floating elements are resized.

Middleware:

[offset](https://floating-ui.com/docs/offset) - the first of the middleware included; allows you to offset the floating element from the reference element by a given amount.

[flip](https://floating-ui.com/docs/flip) - flips the floating element to the opposite side of the reference element to keep it in view.

[shift](https://floating-ui.com/docs/shift) - shifts the floating element along the x or y axis to keep it in view
* x-axis for 'top' and 'bottom' placements
* y-axis for 'left' and 'right' placements

[hide](https://floating-ui.com/docs/hide) - hides the floating element when the reference element is no longer visible or when the floating element has escaped the reference element's clipping context.


API
------------------------------------------------------------------------------

* `@flipOptions` - see [flip docs](https://floating-ui.com/docs/flip) for option values
* `@middleware` - array of one or more objects to add to the [middleware](https://floating-ui.com/docs/middleware) array
* `@offsetOptions` - see [offset docs](https://floating-ui.com/docs/offset) for option values
* `@placement` - list of [expected values](https://floating-ui.com/docs/computeposition#placement)
* `@shiftOptions` - see [shift docs](https://floating-ui.com/docs/shift) for option values
* `@strategy` - CSS position property, either 'fixed' or 'absolute'. Pros and cons of each strategy is [here](https://floating-ui.com/docs/computePosition#strategy)


Default values
------------------------------------------------------------------------------

* `@placement`: 'bottom'
* `@strategy`: 'fixed'
* `offset`, `flip`, and `shift` middleware all use their defaults.
* `hide` middleware uses both `referenceHidden` and `escaped` [options](https://floating-ui.com/docs/hide#options).

Usage as Modifier
------------------------------------------------------------------------------

```hbs
<div id="hook">The `reference` element (the hook)</div>
<div {{velcro "#hook"}}>The `floating` element (the loop)</div>
```

Usage as Component
------------------------------------------------------------------------------

The `Velcro` component yields a single hash - 2 modifiers and 'velcro data':

```hbs
<Velcro as |velcro|>
  <div {{velcro.hook}}>Velcro hook</div>
  <div {{velcro.loop}}>Velcro loop stuck to Velcro hook!</div>
  {{log "velcro data" velcro.data}}
</Velcro>
```

`velcro.data` is the `MiddlewareArguments` object, it contains the following values:

* x
* y
* initialPlacement
* placement
* strategy
* middlewareData
* rects
* platform
* elements

See [MiddlewareArguments](https://floating-ui.com/docs/middleware#middlewarearguments) for a description of each.

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* Node.js v14 or above


Installation
------------------------------------------------------------------------------

```
npm install ember-velcro
# or
yarn add ember-velcro
# or
pnpm install ember-velcro
# or
ember install ember-velcro
```

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
