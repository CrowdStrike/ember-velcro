import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { findElement, resetTestingContainerDimensions, styleFor } from '../velcro-test-helpers';

import { Velcro } from 'ember-velcro';

module('Integration | Component | velcro', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    resetTestingContainerDimensions();
  });

  test('it renders', async function (assert) {
    await render(<template>
      <Velcro as |velcro|>
        <div id="hook" {{velcro.hook}} style="width: 200px; height: 40px">
          {{velcro.data.rects.reference.width}}
          {{velcro.data.rects.reference.height}}
        </div>
        <div id="loop" {{velcro.loop}} style="width: 200px; height: 400px">
          {{velcro.data.rects.floating.width}}
          {{velcro.data.rects.floating.height}}
        </div>
      </Velcro>
    </template>);

    assert.dom('#hook').hasText('200 40', 'reference element has expected dimensions');
    assert.dom('#loop').hasText('200 400', 'floating element has expected dimensions');
    assert.dom('#loop').hasAttribute('style');
    assert.dom('#loop').hasStyle({
      position: 'fixed',
      top: '40px',
      left: '0px',
    });
  });

  module('@middleware', function () {
    test('it yields the MiddlewareArguments', async function (assert) {
      await render(<template>
          <Velcro as |velcro|>
            <div id="hook" {{velcro.hook}}>
              {{#each-in velcro.data as |key|}}
                {{key}}
              {{/each-in}}
            </div>
            <div id="loop" {{velcro.loop}}>VelcroElement</div>
          </Velcro>
      </template>);

      assert
        .dom('#hook')
        .hasText(
          'x y initialPlacement placement strategy middlewareData rects platform elements',
          'has expected metadata'
        );
    });

    test('it has expected included middleware defined', async function (assert) {
      await render(<template>
        <Velcro as |velcro|>
          <div id="hook" {{velcro.hook}}>
            {{#each-in velcro.data.middlewareData as |key|}}
              {{key}}
            {{/each-in}}
          </div>
          <div id="loop" {{velcro.loop}}>VelcroElement</div>
        </Velcro>
      </template>);

      assert.dom('#hook').hasText('offset flip shift hide', 'has expected middleware');
    });
  });

  module('@placement', function () {
    test('has default value', async function (assert) {
      await render(<template>
        <Velcro as |velcro|>
          <div {{velcro.hook}}>velcroReference</div>
          <div id="loop" {{velcro.loop}}>{{velcro.data.placement}}</div>
        </Velcro>
      </template>);

      assert.dom('#loop').hasText('bottom');
    });

    test('has argument value', async function (assert) {
      await render(<template>
        <Velcro @placement="bottom-start" as |velcro|>
          <div {{velcro.hook}}>velcroReference</div>
          <div id="loop" {{velcro.loop}}>{{velcro.data.placement}}</div>
        </Velcro>
      </template>);

      assert.dom('#loop').hasText('bottom-start');
    });
  });

  module('@strategy', function () {
    test('has default value', async function (assert) {
      await render(<template>
        <Velcro as |velcro|>
          <div {{velcro.hook}}>velcroReference</div>
          <div id="loop" {{velcro.loop}}>{{velcro.data.strategy}}</div>
        </Velcro>
      </template>);

      assert.dom('#loop').hasText('fixed');
      assert.dom('#loop').hasStyle({ position: 'fixed' });
    });

    test('has argument value', async function (assert) {
      await render(<template>
        <Velcro @strategy="absolute" as |velcro|>
          <div {{velcro.hook}}>velcroReference</div>
          <div id="loop" {{velcro.loop}}>{{velcro.data.strategy}}</div>
        </Velcro>
      </template>);

      assert.dom('#loop').hasText('absolute');
      assert.dom('#loop').hasStyle({ position: 'absolute' });
    });
  });

  module('@offsetOptions', function () {
    test('can pass in distance', async function (assert) {
      let offsetDistance = 10;

      await render(<template>
        {{!-- render 2 Velcro's side by side, pass one a distance offset and compare the top values --}}
        {{!-- template-lint-disable no-inline-styles --}}
        <div style="display: flex">
          <Velcro @placement="bottom-start" as |velcro|>
            <div {{velcro.hook}}>velcroReference</div>
            <div id="velcro1" {{velcro.loop}}>Velcro</div>
          </Velcro>
          <Velcro @offsetOptions={{offsetDistance}} @placement="bottom-start" as |velcro|>
            <div {{velcro.hook}}>velcroReference</div>
            <div id="velcro2" {{velcro.loop}}>Velcro</div>
          </Velcro>
        </div>
      </template>);

      let velcro1 = findElement('#velcro1');
      let velcro2 = findElement('#velcro2');

      assert.strictEqual(
        velcro1.getBoundingClientRect().top + offsetDistance,
        velcro2.getBoundingClientRect().top
      );
    });

    test('can pass in skidding', async function (assert) {
      let offsetSkidding = 10;

      let offsetOptions = { crossAxis: offsetSkidding };

      await render(<template>
        {{!-- render 2 Velcro's atop the other, pass one a skidding offset and compare the left values --}}
        <Velcro as |velcro|>
          <div {{velcro.hook}}>velcroReference</div>
          <div id="velcro1" {{velcro.loop}}>Velcro</div>
        </Velcro>
        <Velcro @offsetOptions={{offsetOptions}} as |velcro|>
          <div {{velcro.hook}}>velcroReference</div>
          <div id="velcro2" {{velcro.loop}}>Velcro</div>
        </Velcro>
      </template>);

      let velcro1 = findElement('#velcro1');
      let velcro2 = findElement('#velcro2');

      assert.strictEqual(
        velcro1.getBoundingClientRect().left + offsetSkidding,
        velcro2.getBoundingClientRect().left
      );
    });
  });
});
