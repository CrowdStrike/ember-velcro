'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function (defaults) {
  let app = new EmberAddon(defaults, {
    // Add options here
    postcssOptions: {
      compile: {
        // track changes in template, css, scss, and tailwind config files
        cacheInclude: [/.*\.(css|scss|hbs)$/, /.tailwind\.config\.js$/],
        plugins: [
          {
            module: require('tailwindcss'),
            options: {
              config: './tailwind.config.js',
            },
          },
        ],
      },
    },
  });

  const { maybeEmbroider } = require('@embroider/test-setup');

  return maybeEmbroider(app, {
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
  });
};
