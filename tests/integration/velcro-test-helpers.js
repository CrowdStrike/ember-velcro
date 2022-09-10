// Floating UI middleware
// provides data-* attributes for values in test assertions
export function addDataAttributes() {
  return {
    name: 'dataAttributes',
    fn: ({ elements, placement, strategy }) => {
      elements.floating.setAttribute('data-placement', placement);
      elements.floating.setAttribute('data-strategy', strategy);

      // https://floating-ui.com/docs/middleware#always-return-an-object
      return {};
    },
  };
}

// testing containers transforms give Floating UI's logic some challenges
export function resetTestingContainerDimensions() {
  // reset test container scale so values returned by getBoundingClientRect are accurate
  Object.assign(document.querySelector('#ember-testing').style, {
    transform: 'scale(1)',
    width: '100%',
    height: '100%',
  });
}
