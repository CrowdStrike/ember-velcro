import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { findElement, resetTestingContainerDimensions, styleFor } from '../velcro-test-helpers';

module('Integration | Component | velcro', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    resetTestingContainerDimensions();
  });

  test('it renders', async function (assert) {
    await render(hbs`
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
    `);

    assert.dom('#hook').hasText('200 40', 'reference element has expected dimensions');
    assert.dom('#loop').hasText('200 400', 'floating element has expected dimensions');
    assert.dom('#loop').hasAttribute('style');
    assert.dom('#loop').hasStyle({
      position: 'fixed',
      top: '0px',
      left: '0px',
    });
    assert.ok(
      styleFor('#loop').transform.includes('translate3d'),
      'floating element is positioned with translate3d'
    );
  });

  module('@middleware', function () {
    test('it yields the MiddlewareArguments', async function (assert) {
      await render(hbs`
          <Velcro as |velcro|>
            <div id="hook" {{velcro.hook}}>
              {{object-keys velcro.data}}
            </div>
            <div id="loop" {{velcro.loop}}>VelcroElement</div>
          </Velcro>
        `);

      assert
        .dom('#hook')
        .hasText(
          'x,y,initialPlacement,placement,strategy,middlewareData,rects,platform,elements',
          'has expected metadata'
        );
    });

    test('it has expected included middleware defined', async function (assert) {
      await render(hbs`
        <Velcro as |velcro|>
          <div id="hook" {{velcro.hook}}>
            {{object-keys velcro.data.middlewareData}}
          </div>
          <div id="loop" {{velcro.loop}}>VelcroElement</div>
        </Velcro>
      `);

      assert.dom('#hook').hasText('offset,flip,shift,hide', 'has expected middleware');
    });
  });

  module('@placement', function () {
    test('has default value', async function (assert) {
      await render(hbs`
        <Velcro as |velcro|>
          <div {{velcro.hook}}>velcroReference</div>
          <div id="loop" {{velcro.loop}}>{{velcro.data.placement}}</div>
        </Velcro>
      `);

      assert.dom('#loop').hasText('bottom');
    });

    test('has argument value', async function (assert) {
      await render(hbs`
        <Velcro @placement="bottom-start" as |velcro|>
          <div {{velcro.hook}}>velcroReference</div>
          <div id="loop" {{velcro.loop}}>{{velcro.data.placement}}</div>
        </Velcro>
      `);

      assert.dom('#loop').hasText('bottom-start');
    });
  });

  module('@strategy', function () {
    test('has default value', async function (assert) {
      await render(hbs`
        <Velcro as |velcro|>
          <div {{velcro.hook}}>velcroReference</div>
          <div id="loop" {{velcro.loop}}>{{velcro.data.strategy}}</div>
        </Velcro>
      `);

      assert.dom('#loop').hasText('fixed');
      assert.dom('#loop').hasStyle({ position: 'fixed' });
    });

    test('has argument value', async function (assert) {
      await render(hbs`
        <Velcro @strategy="absolute" as |velcro|>
          <div {{velcro.hook}}>velcroReference</div>
          <div id="loop" {{velcro.loop}}>{{velcro.data.strategy}}</div>
        </Velcro>
      `);

      assert.dom('#loop').hasText('absolute');
      assert.dom('#loop').hasStyle({ position: 'absolute' });
    });
  });

  module('@offsetOptions', function () {
    test('can pass in distance', async function (assert) {
      let offsetDistance = 10;

      this.set('offsetDistance', offsetDistance);

      await render(hbs`
        {{!-- render 2 Velcro's side by side, pass one a distance offset and compare the top values --}}
        {{!-- template-lint-disable no-inline-styles --}}
        <div style="display: flex">
          <Velcro @placement="bottom-start" as |velcro|>
            <div {{velcro.hook}}>velcroReference</div>
            <div id="velcro1" {{velcro.loop}}>Velcro</div>
          </Velcro>
          <Velcro @offsetOptions={{this.offsetDistance}} @placement="bottom-start" as |velcro|>
            <div {{velcro.hook}}>velcroReference</div>
            <div id="velcro2" {{velcro.loop}}>Velcro</div>
          </Velcro>
        </div>
      `);

      let velcro1 = findElement('#velcro1');
      let velcro2 = findElement('#velcro2');

      assert.strictEqual(
        velcro1.getBoundingClientRect().top + offsetDistance,
        velcro2.getBoundingClientRect().top
      );
    });

    test('can pass in skidding', async function (assert) {
      let offsetSkidding = 10;

      this.set('offsetSkidding', { crossAxis: offsetSkidding });

      await render(hbs`
        {{!-- render 2 Velcro's atop the other, pass one a skidding offset and compare the left values --}}
        <Velcro as |velcro|>
          <div {{velcro.hook}}>velcroReference</div>
          <div id="velcro1" {{velcro.loop}}>Velcro</div>
        </Velcro>
        <Velcro @offsetOptions={{this.offsetSkidding}} as |velcro|>
          <div {{velcro.hook}}>velcroReference</div>
          <div id="velcro2" {{velcro.loop}}>Velcro</div>
        </Velcro>
      `);

      let velcro1 = findElement('#velcro1');
      let velcro2 = findElement('#velcro2');

      assert.strictEqual(
        velcro1.getBoundingClientRect().left + offsetSkidding,
        velcro2.getBoundingClientRect().left
      );
    });
  });
});
