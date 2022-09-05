Ember Velcro
==============================================================================

Ember Velcro sticks, or anchors, one element to another with [Floating UI](https://floating-ui.com/). Several of Floating UI's functions and [middleware](https://floating-ui.com/docs/middleware) are used to create an experience out of the box that is useful and expected. See Floating UI's [documentation](https://floating-ui.com/docs/getting-started) for more information on any of the following included functionality.

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

Any of the included middleware can be overridden by simply passing them in again with your desired values. It's recommended to keep offset at the beginning of the middleware array so any calculations by further middleware are accurate, with that in mind the following API is provided.

API
------------------------------------------------------------------------------

* `@middleware` - an array of any [middleware](https://floating-ui.com/docs/middleware) you want to pass in.
* `@offset` - offsets the floating element from it's `placement` along the specified axes - [offset docs](https://floating-ui.com/docs/offset)
* `@placement` - where to place the floating element relative to its reference element - [available values](https://floating-ui.com/docs/computeposition#placement)
* `@strategy` - CSS positon property, either 'fixed' or 'absolute'. Pros and cons of each strategy is [here](https://floating-ui.com/docs/computePosition#strategy)

Default values
------------------------------------------------------------------------------

* `@middleware`: [];
* `@offset`: 0
* `@placement`: 'bottom'
* `@strategy`: 'fixed'

Usage
------------------------------------------------------------------------------

Ember Velcro provides a `Velcro` component that yields 3 values; 2 modifiers and 'velcro data':

```hbs
<Velcro as |velcroReference velcroElement velcroData|>
  <div {{velcroReference}}>Velcro reference</div>
  <div {{velcroElement}}>I'm stuck to Velcro reference!</div>
</Velcro>
```

`velcroData` is the `MiddlewareArguments` object, it contains the following values:

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
* Node.js v12 or above


Installation
------------------------------------------------------------------------------

```
ember install github:camskene/ember-velcro
```

Contributing
------------------------------------------------------------------------------

Ember Velcro is currently written primarily for my own fun and education. I plan to publish to NPM once a half-decent demo site is up.

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
