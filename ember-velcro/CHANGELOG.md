# [1.1.0](https://github.com/CrowdStrike/ember-velcro/compare/v1.0.1...v1.1.0) (2022-10-14)


### Bug Fixes

* **ts, glint:** address the majority of the glint issues ([9d2a494](https://github.com/CrowdStrike/ember-velcro/commit/9d2a49445787e5aa3e6ad4f405c4e78f11fd32ce))
* **ts, glint:** remaining glint errors are resolved ([ef24cfd](https://github.com/CrowdStrike/ember-velcro/commit/ef24cfd5132b9f231502a6e1639c0f2659653f79))


### Features

* add types to addon and add glint registry augmentation for loose mode ([ad33ab9](https://github.com/CrowdStrike/ember-velcro/commit/ad33ab9b4ac799c12cc83a4d65c1c6c69c704164))

## [1.0.1](https://github.com/camskene/ember-velcro/compare/v1.0.0...v1.0.1) (2022-10-02)


### Bug Fixes

* **modifier:** support SVGElement ([abab33b](https://github.com/camskene/ember-velcro/commit/abab33be4b70bacec9823ecc0ee93531a6d65331))

# 1.0.0 (2022-09-27)


### Bug Fixes

* cleanup popper ([da193d9](https://github.com/camskene/ember-velcro/commit/da193d97e696d12a2c5ba44f63d1c7a1d09e926c))
* cleanup ResizeObserver ([5a05ff2](https://github.com/camskene/ember-velcro/commit/5a05ff26fb8981a1ba28401dc66cb80508ffb834))
* **release:** add semantic release config to package.json ([e3f9ccb](https://github.com/camskene/ember-velcro/commit/e3f9ccbb412d37c095e654fa3857b9b648227709))
* remove unused dependency ([3fa4854](https://github.com/camskene/ember-velcro/commit/3fa4854505d7309d4f9615eb8281cf05299a5f21))
* rename offset args ([8fdf4e1](https://github.com/camskene/ember-velcro/commit/8fdf4e18a5737f44211b4ee9a6f09f73678f4dca))
* update readme and package details ([21dd7f6](https://github.com/camskene/ember-velcro/commit/21dd7f6744be5efa5708c8e476e9266b1eb1f5d6))
* update to Ember v4.6.0 ([a529ef0](https://github.com/camskene/ember-velcro/commit/a529ef09a9370f974304b8e9debf1880eb5ffe7b))


* feat!: add velcro modifier ([4724a30](https://github.com/camskene/ember-velcro/commit/4724a30e4f3326a3909efede31124cc3cced2862))


### Features

* add modifiers, strategy, and onFirstUpdate to args ([0a12c39](https://github.com/camskene/ember-velcro/commit/0a12c3948fdebe59388d1c25b129a1b199efc465))
* add offsetX, offsetY, and placement to args ([0dfa444](https://github.com/camskene/ember-velcro/commit/0dfa4440063a0e2d6ee74fd0ceb42879c92630ce))
* add options for flip and shift middleware ([2229496](https://github.com/camskene/ember-velcro/commit/2229496be892572a0953ab113541f0eda490787d))
* add velcro component ([b5e6f31](https://github.com/camskene/ember-velcro/commit/b5e6f313a38b0eb359bdc7d5d6ce96d38295c6f1))
* basic demo ([1484983](https://github.com/camskene/ember-velcro/commit/148498338e5eac273eb2f16da0f7a72e68152a1e))
* create popper and yield modifiers ([50cc8bc](https://github.com/camskene/ember-velcro/commit/50cc8bc2118ea1202ad24f200b957d728fab2b51))
* handle targetElement or popoverElement resize ([1398f89](https://github.com/camskene/ember-velcro/commit/1398f89a9586b901248e85490a6427df67a4e50c))
* migrate from popperjs to floating-ui ([06d6e90](https://github.com/camskene/ember-velcro/commit/06d6e90cd706159b6b189d644d0bc8a65229c5c4))


### BREAKING CHANGES

* arguments to middleware are now composed of the
middleware name + 'Options'.

eg `@offset` -> `@offsetOptions`
* https://floating-ui.com/docs/migration
