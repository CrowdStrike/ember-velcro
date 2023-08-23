## 2.1.0

## 2.1.2

### Patch Changes

- [#117](https://github.com/CrowdStrike/ember-velcro/pull/117) [`52bc809`](https://github.com/CrowdStrike/ember-velcro/commit/52bc809d6bdf154daa3e8fe7aed0b78992a7739a) Thanks [@NullVoxPopuli](https://github.com/NullVoxPopuli)! - Removed redundant suffix to optimize devtool appearance.

- [#124](https://github.com/CrowdStrike/ember-velcro/pull/124) [`d3efa09`](https://github.com/CrowdStrike/ember-velcro/commit/d3efa09289fcb86b8819986f8a5c854313cb79e2) Thanks [@NullVoxPopuli](https://github.com/NullVoxPopuli)! - Removed CSS transform in favor of top+left positioning.

## 2.1.1

### Patch Changes

- [#110](https://github.com/CrowdStrike/ember-velcro/pull/110) [`39b6069`](https://github.com/CrowdStrike/ember-velcro/commit/39b60690d6b130180166bd67891ed6d7617c4074) Thanks [@NullVoxPopuli](https://github.com/NullVoxPopuli)! - Added emberv5 peer dependency support.

### Minor Changes

- [#85](https://github.com/CrowdStrike/ember-velcro/pull/85) [`f53b03f`](https://github.com/CrowdStrike/ember-velcro/commit/f53b03fa16b2e33a7fb4e02fcf2368587df678ae) Thanks [@ynotdraw](https://github.com/ynotdraw)! - A `template-registry` is now exported from `ember-velcro` to use with [Glint](https://typed-ember.gitbook.io/glint/). To use it in your apps and addons, add the following to your existing registry:

  ```ts
  import type EmberVelcroRegistry from "ember-velcro/template-registry";

  declare module "@glint/environment-ember-loose/registry" {
    export default interface Registry extends EmberVelcroRegistry {
      // Other items here
    }
  }
  ```

### Patch Changes

- [#84](https://github.com/CrowdStrike/ember-velcro/pull/84) [`5b49970`](https://github.com/CrowdStrike/ember-velcro/commit/5b499701a013c62f2d3636d1e34506595beeb3f2) Thanks [@ynotdraw](https://github.com/ynotdraw)! - (internal): swap semantic-release for Changesets so that we can have more granular control over releases, and batch breaking changes together without massive PRs

## [2.0.1](https://github.com/CrowdStrike/ember-velcro/compare/v2.0.0...v2.0.1) (2023-05-28)

### Bug Fixes

- Update README command and link ([#81](https://github.com/CrowdStrike/ember-velcro/issues/81)) ([3f896a9](https://github.com/CrowdStrike/ember-velcro/commit/3f896a9c3c41c1e2d5c63a8ad0e747e46150fd46))

# [2.0.0](https://github.com/CrowdStrike/ember-velcro/compare/v1.1.0...v2.0.0) (2023-05-25)

- breaking-change: Fix main branch typescript errors (#83) ([a732f56](https://github.com/CrowdStrike/ember-velcro/commit/a732f563e2893e9822bc3c03edfea7ecb5fd364f)), closes [#83](https://github.com/CrowdStrike/ember-velcro/issues/83)

### BREAKING CHANGES

- Removing types and updating TypeScript version to support Glint properly. The main branch build is currently red due to the Glint dependency updates. This gets things back on track. We are making a breaking change as updating underlying TypeScript changes is considered as such (https://github.com/CrowdStrike/ember-headless-table/pull/176).

- chore: Upgrade glint dependencies

- chore: Allow any ember-source + typescript

- chore: Glint only supports TSv4.8+

- chore: Upgrade ember-source + resolver

Started getting type errors with resolver:

"Module '"@ember/owner"' has no exported member 'Resolver'. Did you mean to use 'import Resolver from "@ember/owner"' instead?"

ember-resolver now ships with their own types rather than the types namespace

- chore: Remove commitlint

- chore: Update babel/core + qunit deps

- chore: Add @types/ember\_\_owner dependency

- chore: Add ember/string as a dependency for tests

- chore: Ignore glint errors for now

- chore: Convert tests to gts

- fix: Remove unneeded peerDependencies

- fix: Remove unneeded types/ember packages

These libraries now ship with their own types, so we no longer need the ones coming from the types namespace anymore.

# [1.1.0](https://github.com/CrowdStrike/ember-velcro/compare/v1.0.1...v1.1.0) (2022-10-14)

### Bug Fixes

- **ts, glint:** address the majority of the glint issues ([9d2a494](https://github.com/CrowdStrike/ember-velcro/commit/9d2a49445787e5aa3e6ad4f405c4e78f11fd32ce))
- **ts, glint:** remaining glint errors are resolved ([ef24cfd](https://github.com/CrowdStrike/ember-velcro/commit/ef24cfd5132b9f231502a6e1639c0f2659653f79))

### Features

- add types to addon and add glint registry augmentation for loose mode ([ad33ab9](https://github.com/CrowdStrike/ember-velcro/commit/ad33ab9b4ac799c12cc83a4d65c1c6c69c704164))

## [1.0.1](https://github.com/camskene/ember-velcro/compare/v1.0.0...v1.0.1) (2022-10-02)

### Bug Fixes

- **modifier:** support SVGElement ([abab33b](https://github.com/camskene/ember-velcro/commit/abab33be4b70bacec9823ecc0ee93531a6d65331))

# 1.0.0 (2022-09-27)

### Bug Fixes

- cleanup popper ([da193d9](https://github.com/camskene/ember-velcro/commit/da193d97e696d12a2c5ba44f63d1c7a1d09e926c))
- cleanup ResizeObserver ([5a05ff2](https://github.com/camskene/ember-velcro/commit/5a05ff26fb8981a1ba28401dc66cb80508ffb834))
- **release:** add semantic release config to package.json ([e3f9ccb](https://github.com/camskene/ember-velcro/commit/e3f9ccbb412d37c095e654fa3857b9b648227709))
- remove unused dependency ([3fa4854](https://github.com/camskene/ember-velcro/commit/3fa4854505d7309d4f9615eb8281cf05299a5f21))
- rename offset args ([8fdf4e1](https://github.com/camskene/ember-velcro/commit/8fdf4e18a5737f44211b4ee9a6f09f73678f4dca))
- update readme and package details ([21dd7f6](https://github.com/camskene/ember-velcro/commit/21dd7f6744be5efa5708c8e476e9266b1eb1f5d6))
- update to Ember v4.6.0 ([a529ef0](https://github.com/camskene/ember-velcro/commit/a529ef09a9370f974304b8e9debf1880eb5ffe7b))

- feat!: add velcro modifier ([4724a30](https://github.com/camskene/ember-velcro/commit/4724a30e4f3326a3909efede31124cc3cced2862))

### Features

- add modifiers, strategy, and onFirstUpdate to args ([0a12c39](https://github.com/camskene/ember-velcro/commit/0a12c3948fdebe59388d1c25b129a1b199efc465))
- add offsetX, offsetY, and placement to args ([0dfa444](https://github.com/camskene/ember-velcro/commit/0dfa4440063a0e2d6ee74fd0ceb42879c92630ce))
- add options for flip and shift middleware ([2229496](https://github.com/camskene/ember-velcro/commit/2229496be892572a0953ab113541f0eda490787d))
- add velcro component ([b5e6f31](https://github.com/camskene/ember-velcro/commit/b5e6f313a38b0eb359bdc7d5d6ce96d38295c6f1))
- basic demo ([1484983](https://github.com/camskene/ember-velcro/commit/148498338e5eac273eb2f16da0f7a72e68152a1e))
- create popper and yield modifiers ([50cc8bc](https://github.com/camskene/ember-velcro/commit/50cc8bc2118ea1202ad24f200b957d728fab2b51))
- handle targetElement or popoverElement resize ([1398f89](https://github.com/camskene/ember-velcro/commit/1398f89a9586b901248e85490a6427df67a4e50c))
- migrate from popperjs to floating-ui ([06d6e90](https://github.com/camskene/ember-velcro/commit/06d6e90cd706159b6b189d644d0bc8a65229c5c4))

### BREAKING CHANGES

- arguments to middleware are now composed of the
  middleware name + 'Options'.

eg `@offset` -> `@offsetOptions`

- https://floating-ui.com/docs/migration
