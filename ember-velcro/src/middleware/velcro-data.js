export function velcroData() {
  return {
    name: 'metadata',
    fn: (data) => {
      // https://floating-ui.com/docs/middleware#always-return-an-object
      return {
        data,
      };
    },
  };
}
